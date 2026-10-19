"""Rendered check for scripts/precheck.mjs: the devices in docs/design/test-devices.md, light and dark.

Fails on horizontal overflow, console errors, or an index page with no cards. Run through
`npm run precheck`, not by hand."""
import os
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

base = sys.argv[1]
chrome = os.environ.get("PLAYWRIGHT_CHROME") or str(
    Path.home() / ".cache/ms-playwright/chromium-1248/chrome-linux64/chrome"
)
if not Path(chrome).exists():
    sys.exit(f"no Chromium at {chrome}; set PLAYWRIGHT_CHROME")

doc = Path("docs/design/test-devices.md").read_text()
devices = [
    (int(w), int(h), int(d))
    for w, h, d in re.findall(r"^\|[^|]+\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|", doc, re.M)
]
if len(devices) != 6:
    sys.exit(f"expected 6 devices in docs/design/test-devices.md, found {len(devices)}")

# One page of each kind: home, both indexes, a page of each layout, a news post, and the plain pages.
pages = [
    "/", "/software", "/research", "/about", "/contact", "/news", "/privacy-policy",
    "/software/arcadedb", "/research/arcadedb", "/research/arcadedb-python",
    "/research/dbbench", "/research/dbbench/tables", "/research/explicit-memory",
]
cards_expected = {"/", "/software", "/research"}

bad = 0
loads = 0
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=chrome)
    for width, height, dpr in devices:
        for scheme in ("light", "dark"):
            context = browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=dpr, color_scheme=scheme)
            for path in pages:
                page = context.new_page()
                errors = []
                page.on("console", lambda m, e=errors: e.append(m.text) if m.type == "error" else None)
                page.on("pageerror", lambda x, e=errors: e.append(str(x)))
                page.goto(base + path, wait_until="networkidle")
                scroll_width = page.evaluate("document.documentElement.scrollWidth")
                cards = page.evaluate(
                    "document.querySelectorAll('main a[href^=\"/software/\"], main a[href^=\"/research/\"]').length"
                )
                loads += 1
                problems = []
                if scroll_width != width:
                    problems.append(f"scrollWidth {scroll_width}")
                if errors:
                    problems.append(f"console {errors[:2]}")
                if path in cards_expected and cards == 0:
                    problems.append("no cards")
                if problems:
                    bad += 1
                    print(f"  FAIL {width}px {scheme} {path}: {', '.join(problems)}")
                page.close()
            context.close()
    browser.close()
print(f"  {loads} page loads on {len(devices)} devices, {bad} bad")
sys.exit(1 if bad else 0)
