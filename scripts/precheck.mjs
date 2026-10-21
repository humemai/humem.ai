/* -------------------------------------------------------------------------
 * The slow checks that run on your machine before a push that touches pages,
 * links or layout. The fast ones (spacing, summary length, types, lint) are
 * already part of `npm run build`, which Vercel runs on every deploy; this adds
 * what needs a running server and a browser:
 *
 *   1. lint and a production build (in its own directory, so a running dev
 *      server is left alone)
 *   2. every URL in scripts/legacy-urls.json answers 308 to its new page in
 *      one hop, and that page answers 200
 *   3. every URL in the sitemap answers 200, and the sitemap lists no /projects
 *   4. the six test devices in docs/design/test-devices.md, light and dark: no
 *      horizontal overflow, no console errors, cards on the index pages
 *
 *     npm run precheck
 *
 * Empty output is a failure, not a pass: every step prints what it counted.
 * Needs Chromium for step 4: set PLAYWRIGHT_CHROME, or have
 * ~/.cache/ms-playwright/chromium-1248 (docs/design/test-devices.md).
 * ------------------------------------------------------------------------- */
import { spawn, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const PORT = 3199;
const BASE = `http://localhost:${PORT}`;
const DIST = ".next-precheck";
const env = { ...process.env, NEXT_DIST_DIR: DIST };
const failures = [];
const fail = (message) => {
  failures.push(message);
  console.error(`  FAIL ${message}`);
};

function run(label, command, args) {
  console.log(`\n== ${label}`);
  const result = spawnSync(command, args, { stdio: "inherit", env });
  if (result.status !== 0) {
    console.error(`precheck: ${label} failed`);
    process.exit(1);
  }
}

run("lint", "npm", ["run", "lint"]);
run("build", "npm", ["run", "build"]);

console.log("\n== server");
const server = spawn("node_modules/.bin/next", ["start", "-p", String(PORT)], { env, stdio: "ignore", detached: true });
const stop = () => {
  try {
    process.kill(-server.pid);
  } catch {}
};
process.on("exit", stop);
process.on("SIGINT", () => process.exit(130));

let up = false;
for (let i = 0; i < 60 && !up; i++) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  up = await fetch(BASE).then((r) => r.ok).catch(() => false);
}
if (!up) {
  console.error("precheck: the server did not start");
  process.exit(1);
}
console.log(`  up on ${BASE}`);

const get = (path) => fetch(BASE + path, { redirect: "manual" });
const location = (res) => (res.headers.get("location") ?? "").replace(BASE, "");

console.log("\n== old URLs (scripts/legacy-urls.json)");
const ledger = JSON.parse(readFileSync("scripts/legacy-urls.json", "utf8")).redirects;
for (const { from, to } of ledger) {
  const allowed = Array.isArray(to) ? to : [to];
  const res = await get(from);
  const target = location(res);
  if (res.status !== 308) fail(`${from}: answered ${res.status}, want 308`);
  else if (!allowed.includes(target)) fail(`${from}: went to ${target}, want ${allowed.join(" or ")}`);
  else {
    const dest = await get(target);
    if (dest.status !== 200) fail(`${from}: ${target} answered ${dest.status}, want 200 (a chain?)`);
  }
}
console.log(`  ${ledger.length} old URLs checked`);

console.log("\n== sitemap");
const sitemap = await (await get("/sitemap.xml")).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname || "/");
if (paths.length < 10) fail(`sitemap lists only ${paths.length} URLs`);
for (const path of paths) {
  if (path.startsWith("/projects")) fail(`sitemap lists ${path}`);
  const res = await get(path);
  if (res.status !== 200) fail(`${path}: answered ${res.status}, want 200`);
}
console.log(`  ${paths.length} sitemap URLs checked`);

console.log("\n== devices, light and dark");
const render = spawnSync(
  "uv",
  ["run", "--no-project", "--with", "playwright==1.55.0", "python", "scripts/precheck-render.py", BASE],
  { stdio: "inherit", env },
);
if (render.status !== 0) fail("the rendered check failed");

stop();
if (failures.length) {
  console.error(`\nprecheck: ${failures.length} problem(s)`);
  process.exit(1);
}
console.log("\nprecheck: ok. Say in the PR which steps ran.");
