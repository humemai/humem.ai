#!/usr/bin/env node
/*
 * Fail when a child of a prose column carries its own vertical margin.
 *
 * WHY THIS EXISTS. A prose column is a CSS GRID, and grid does not collapse
 * child margins. So a margin set on a child is ADDED to the container's gap,
 * silently, and only on the pages where that component is used. The number in
 * the stylesheet is not the number on the screen, which makes the defect
 * invisible in review: every component looks considered read on its own.
 *
 * Measured on the arcadedb project page, 2026-08-14, before the fix:
 *
 *     .body            grid, gap 1rem                            = 16px
 *     <p>              browser default 1em, not collapsed        -> 48px
 *     .benchmarkTable  margin 2.25rem                            -> 88px
 *     .figureGrid      margin 1rem                               -> 48px
 *     .bodyStack       same defect, different component           -> 48px
 *
 * Five separations on one page, from four components that each looked fine.
 * The rule now is the one in globals.css: inside a prose column the gap is the
 * only vertical spacing, and headings are the single exception.
 *
 *     node scripts/check-spacing-tokens.mjs
 *
 * SCOPE, stated because a silent cap reads as coverage. This checks the prose
 * columns listed in PROSE_SELECTORS and nothing else. A full sweep of the
 * site's spacing found 137 literal values across 25 stylesheets (2.25rem,
 * 1.3rem, 0.9rem, 0.8rem, 2rem ... for the same job), so the wider codebase has
 * no spacing scale at all. That is real debt and it is NOT enforced here,
 * because normalising it would change the layout of every page and that is a
 * design decision, not a lint. This check covers the article bodies, where the
 * defect was actually visible to readers.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src";

/* Vertical-margin properties. `gap` is deliberately NOT here: the gap is the
 * mechanism this contract relies on, and a container is allowed to set it. */
const VERTICAL_MARGIN = /^(margin|margin-top|margin-bottom|margin-block|margin-block-start|margin-block-end)$/;

const ZERO = new Set(["0", "0px", "auto", "0 auto", "inherit", "initial", "unset", "revert"]);

/* Headings and captions are allowed their own space: they are the deliberate
 * exception in the contract, and a caption belongs to its figure rather than
 * to the column. */
const EXEMPT_TARGET = /\b(h1|h2|h3|h4|h5|h6|figcaption|summary|Caption|Label|Lead|Title|Eyebrow)\b/;

function* cssFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* cssFiles(p);
    else if (name.endsWith(".css")) yield p;
  }
}

function verticalParts(prop, value) {
  const parts = value.trim().split(/\s+(?![^(]*\))/);
  if (prop === "margin" || prop === "margin-block") {
    return parts.length === 1 ? [parts[0]] : [parts[0], parts[2] ?? parts[0]];
  }
  return [parts[0]];
}

/* Which classes actually lay out their children? Read from the stylesheets
 * rather than listed by hand: a component that becomes a grid tomorrow is then
 * covered without anyone remembering to add it here. This is the whole point.
 * Margins are harmless in a BLOCK container, where they collapse; they are the
 * defect only in a grid or flex container, where they do not. */
function layoutContainers(file) {
  // PER FILE. A CSS module's class names are local to it, so `.content` is a
  // grid in content-page.module.css and a plain block in news.module.css. A
  // global name set conflated the two and reported the block one, which would
  // have taught the next reader to ignore this check.
  const set = new Set();
  const code = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = blockRe.exec(code)) !== null) {
    if (!/display:\s*(grid|flex)/.test(m[2])) continue;
    for (const cls of m[1].matchAll(/\.([A-Za-z][\w-]*)/g)) set.add(cls[1]);
  }
  return set;
}

const files = [...cssFiles(ROOT)];

const findings = [];
for (const file of files) {
  const CONTAINERS = layoutContainers(file);
  const raw = readFileSync(file, "utf8");
  // An escape hatch that has to state a reason: a rule preceded or followed by
  // `/* spacing-ok: ... */` is exempt. Used for elements that are not in the
  // column's normal flow (floats, the stacked-table card layout), where the
  // margin is doing a different job than column rhythm.
  const okLines = new Set();
  raw.split("\n").forEach((l, i) => { if (/spacing-ok:/.test(l)) { okLines.add(i); okLines.add(i + 1); okLines.add(i + 2); } });
  const code = raw.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = blockRe.exec(code)) !== null) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    if (selector.startsWith("@") || !selector) continue;
    if (EXEMPT_TARGET.test(selector)) continue;

    // The FIRST class must be a layout container, and the selector must reach
    // past it: a container setting its own margin is spacing from its
    // surroundings, which is a different question and not this one.
    const first = selector.match(/^\.([A-Za-z][\w-]*)/);
    if (!first || !CONTAINERS.has(first[1])) continue;
    const rest = selector.slice(first[0].length).trim();
    if (!rest || rest.startsWith(",")) continue;

    const line = code.slice(0, m.index).split("\n").length;
    if ([...okLines].some((l) => Math.abs(l - line) <= 3)) continue;
    for (const decl of m[2].split(";")) {
      const d = decl.match(/^\s*([a-z-]+)\s*:\s*(.+)$/);
      if (!d) continue;
      const [, prop, value] = d;
      if (/float:\s*(left|right)/.test(m[2])) break;   // out of flow
      if (!VERTICAL_MARGIN.test(prop)) continue;
      if (ZERO.has(value.trim())) continue;
      for (const part of verticalParts(prop, value)) {
        if (ZERO.has(part) || part === "0") continue;
        findings.push({ file, line, selector, prop, value: value.trim() });
      }
    }
  }
}

/* ---------------------------------------------------------------------------
 * SECOND PASS: the rest of the site, baselined rather than enforced.
 *
 * The prose columns above are a hard rule. Everywhere else this site has no
 * spacing scale at all: a sweep on 2026-08-14 found 137 literal vertical values
 * across 25 stylesheets, with 2.25rem, 1.3rem, 0.9rem, 0.8rem, 2rem and 1rem
 * all doing the same job. Normalising them changes the layout of every page,
 * which is a design decision and not something a lint should force.
 *
 * So the existing values are RECORDED, and only NEW ones fail. The debt stops
 * growing without anyone having to redesign anything first, and the count in
 * the baseline file is a number that can be driven down deliberately.
 *
 *     node scripts/check-spacing-tokens.mjs --update-baseline
 *
 * Keyed by file + selector + property + value, never by line number, so moving
 * a rule does not read as a new violation.
 * ------------------------------------------------------------------------- */
const BASELINE = "scripts/spacing-baseline.json";
const TOKEN = /var\(--[\w-]+\)/;

const literals = new Set();
for (const file of files) {
  const code = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = blockRe.exec(code)) !== null) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    if (selector.startsWith("@")) continue;
    for (const decl of m[2].split(";")) {
      const d = decl.match(/^\s*([a-z-]+)\s*:\s*(.+)$/);
      if (!d) continue;
      const [, prop, value] = d;
      if (!/^(margin|margin-top|margin-bottom|margin-block|gap|row-gap)$/.test(prop)) continue;
      if (ZERO.has(value.trim())) continue;
      for (const part of verticalParts(prop, value)) {
        if (ZERO.has(part) || part === "0" || TOKEN.test(part)) continue;
        literals.add(`${file} :: ${selector} :: ${prop}: ${value.trim()}`);
      }
    }
  }
}

const wantUpdate = process.argv.includes("--update-baseline");
let baseline = [];
try { baseline = JSON.parse(readFileSync(BASELINE, "utf8")).accepted; } catch { /* first run */ }

if (wantUpdate) {
  writeFileSync(BASELINE, JSON.stringify({
    note: "Literal vertical spacing values that predate the token scale. New " +
          "ones fail the build; these are recorded so the debt is visible and " +
          "countable rather than growing. Drive the count down deliberately.",
    recorded: "2026-08-14",
    count: literals.size,
    accepted: [...literals].sort(),
  }, null, 2) + "\n");
  console.log(`spacing: baseline written, ${literals.size} accepted literal(s)`);
  process.exit(0);
}

const known = new Set(baseline);
const fresh = [...literals].filter((k) => !known.has(k)).sort();

if (findings.length === 0 && fresh.length === 0) {
  console.log(`spacing: ok (prose columns clean; ${known.size} literals baselined)`);
  process.exit(0);
}

if (fresh.length) {
  console.error(`spacing: ${fresh.length} NEW literal vertical spacing value(s).`);
  console.error("Use a token from globals.css, or add one there. If the value is");
  console.error("genuinely intended, run with --update-baseline and say why in");
  console.error("the commit message.\n");
  for (const k of fresh) console.error(`  ${k}`);
  if (findings.length === 0) process.exit(1);
  console.error("");
}

console.error(`spacing: ${findings.length} vertical margin(s) inside a prose column.`);
console.error("A prose column is a grid: this margin ADDS to its gap, so the");
console.error("rendered spacing is not the number written here. Remove it and");
console.error("let the gap do the work, or change the gap.\n");
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}\n      ${f.selector} { ${f.prop}: ${f.value} }`);
}
process.exit(1);
