/* -------------------------------------------------------------------------
 * A table on a project page is a block, never a markdown table in a text block.
 *
 * Blocks (benchmarkTable from the data payload, paperTable for a table copied
 * from a paper) leave the text column on wide screens and become labelled
 * cards on a phone; a markdown table stays in the 736px column and scrolls
 * (docs/design/layout-widths.md). Runs before `next build`.
 *
 *     node scripts/check-item-tables.mjs
 * ------------------------------------------------------------------------- */
import { readdirSync, readFileSync } from "node:fs";

const DIR = "src/lib/projects/items";
const problems = [];
for (const file of readdirSync(DIR).filter((name) => name.endsWith(".ts"))) {
  const source = readFileSync(`${DIR}/${file}`, "utf8");
  // A markdown table's delimiter row, inside any string: | --- | :-: | --: |
  if (/\|\s*:?-{3,}:?\s*\|/.test(source)) problems.push(`${file}: a markdown table; use a paperTable or benchmarkTable block`);
}

if (problems.length) {
  console.error("tables: " + problems.join("\n  "));
  process.exit(1);
}
console.log("tables: ok");
