/* -------------------------------------------------------------------------
 * Card summaries stay a similar length (AGENTS.md, "Rules for agents").
 *
 * A project's `summary` is its card text and the first line of its page:
 * 20 to 28 words, 130 to 170 characters, and no "accepted at" (the venue is
 * its own field). Runs before `next build`, so a summary that breaks the rule
 * fails the Vercel build too.
 *
 *     node scripts/check-summary-length.mjs
 * ------------------------------------------------------------------------- */
import { readdirSync, readFileSync } from "node:fs";

const DIR = "src/lib/projects/items";
const SKIP = new Set(["index.ts"]);
const WORDS = [20, 28];
const CHARS = [130, 170];

const problems = [];
for (const file of readdirSync(DIR).filter((name) => name.endsWith(".ts") && !SKIP.has(name))) {
  const source = readFileSync(`${DIR}/${file}`, "utf8");
  // The project's own summary sits one indent level in (a tab or two spaces); nested ones are deeper.
  const match = source.match(/^(?:\t| {2})summary:\s*"((?:[^"\\]|\\.)*)"/m);
  if (!match) {
    problems.push(`${file}: no summary found`);
    continue;
  }
  const text = match[1];
  const words = text.trim().split(/\s+/).length;
  if (words < WORDS[0] || words > WORDS[1]) problems.push(`${file}: ${words} words, want ${WORDS[0]} to ${WORDS[1]}`);
  if (text.length < CHARS[0] || text.length > CHARS[1]) problems.push(`${file}: ${text.length} characters, want ${CHARS[0]} to ${CHARS[1]}`);
  if (/accepted at/i.test(text)) problems.push(`${file}: names a venue; use the venue field`);
}

if (problems.length) {
  console.error("summary: card summaries out of range (see AGENTS.md)\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("summary: ok");
