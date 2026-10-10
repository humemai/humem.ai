// DBBench: the benchmark as its own project line, standalone (not a subproject
// of Multi-Model Databases). Rendered at /projects/dbbench from the same
// payload the October preview uses. Lane pages live under it
// (/projects/dbbench/<lane>, see src/lib/dbbench/lanes.ts).
//
// The methodology points below summarise docs.humem.ai/dbbench/latest/methodology/.
// When that page changes, change this list in the same pull request.
//
// NO NUMBER IS TYPED INTO A SENTENCE HERE. Every figure comes from a table cell
// or from the payload, so this file cannot disagree with the data.
import type { Project, ProjectEditorialBodyBlock } from "../types";
import { dbbenchLanes } from "../../dbbench/lanes";
import {
  dbbenchDocsUrl,
  dbbenchEnginesUrl,
  dbbenchIssuesUrl,
  dbbenchMethodologyUrl,
  dbbenchRepoUrl,
} from "../shared";

const laneList = dbbenchLanes
  .map((lane) => `- [${lane.title}](/projects/dbbench/${lane.slug}): ${lane.blurb}`)
  .join("\n");

// One section per lane: what it measures, its headline table, and a link to
// the lane page. The headline is the lane's first table; a lane whose first
// table is still being measured shows the payload's own line saying so.
const laneSections = dbbenchLanes.map((lane) => {
  const headline = lane.tables[0];
  const body: ProjectEditorialBodyBlock[] = [
    lane.lead[0],
    {
      type: "benchmarkTable",
      tableId: headline.tableId,
      caption: headline.caption,
      showDigests: headline.showDigests,
    },
    `[Every ${lane.title.toLowerCase()} table](/projects/dbbench/${lane.slug}), with the rest of the tasks in this lane.`,
  ];
  return {
    id: lane.slug,
    navLabel: lane.navLabel,
    eyebrow: "Lane",
    title: `${lane.title}.`,
    body,
  };
});

export const dbbench: Project = {
  slug: "dbbench",
  title: "DBBench",
  showOnProjectsIndex: true,
  subprojectPage: {
    layout: "editorial",
    linksHeading: "Rules and code.",
    sections: [
      {
        id: "about",
        navLabel: "About",
        eyebrow: "DBBench",
        title: "The same tasks, on the same machine, for every engine.",
        body: [
          "DBBench is an independent, open benchmark of database engines. Every engine in a lane answers the same tasks over the same data on the same machine. The settings are published, and every result is tied to the exact version of the engine that produced it.",
          "Results are kept. When an engine ships a new version, new rows are added next to the old ones. When a setting is corrected, the corrected run is added and the earlier result stays visible.",
          "DBBench does not rank databases in general. It measures the tasks listed in each lane, on the stated machine and settings. A different workload, scale or tuning can change the order. That is why the settings are published, and why anyone can tell us when one is wrong.",
          "There are six lanes. An engine appears only in the lanes it is built for.",
          laneList,
        ],
      },
      {
        id: "method",
        navLabel: "Method",
        eyebrow: "Method",
        title: "How a result is produced.",
        body: [
          "These points summarise the rules every published result follows. A result that breaks one is published as a declared exception, or not at all.",
          "1. **Same task, same data, same machine.** Every engine in a lane answers the same queries over the same corpus on the same dedicated machine.\n2. **Answers are checked.** Each query's answer is reduced to a digest and compared between engines. A fast wrong answer is a failure, not a result.\n3. **Settings are published.** Each engine runs at its documented defaults unless the task needs a change. Every change is listed with its reason, and an index added for one engine is added in its equivalent form for every engine that has one.\n4. **Equal resources.** Every engine gets the same memory cap and processor allotment inside a lane, and the same durability settings are measured for every engine that offers them.\n5. **Repeated runs.** Each cell is run several times and the page prints the median with its spread, never a single run. Whether a timing includes the first run, a warm-up or an index build is stated in the table.\n6. **Limits and failures are results.** A query that cannot finish within its time budget is recorded as censored, with the budget. An engine that runs out of memory, times out or refuses a task has that recorded for the cell, with the error it gave.\n7. **Versions are exact.** Every row records the engine version and, for containers, the image digest. A cell never mixes rows from different versions.\n8. **History is kept.** A correction or a new version adds rows. The earlier rows stay visible.",
          "The full rules are in the [methodology](" + dbbenchMethodologyUrl + "). The exact settings for each engine, and the reason for each one, are on the [engines page](" + dbbenchEnginesUrl + "). The code is at [github.com/humemai/dbbench](" + dbbenchRepoUrl + ").",
          "Every table was measured on the machine below. A table lists its own conditions beneath its caption.",
          { type: "benchmarkMachine" },
        ],
      },
      ...laneSections,
      {
        id: "corrections",
        navLabel: "Corrections",
        eyebrow: "Corrections",
        title: "Tell us a setting is wrong.",
        body: [
          "If a setting we use for your engine differs from what you recommend, open an issue. Say which engine and version, what we use, what you recommend, and where your documentation says so.",
          "We re-run the affected cells with your configuration on the same machine, and publish them beside the earlier result with the reason. The earlier result stays in the history.",
          "[Open an issue on GitHub](" + dbbenchIssuesUrl + "). The [contribution guide](" + dbbenchDocsUrl + "contribute/) also covers adding an engine, a query or a lane, and reporting a problem with a result.",
        ],
      },
      {
        id: "independence",
        navLabel: "Independence",
        eyebrow: "Independence",
        title: "Who runs DBBench.",
        body: [
          "DBBench is run by HumemAI. HumemAI also builds [HumemDB](/projects/humemdb), [CypherGLOT](/projects/cypherglot) and the [ArcadeDB Python package](/projects/arcadedb). Those projects are measured by the same rules as every other engine: the same tasks, the same machine, published settings, and a result for every failure.",
          "The code and the settings are public, so anyone can check a result or reproduce it. When a result is wrong, the fix is a new row, not an edit.",
        ],
      },
    ],
  },
  summary:
    "An independent, open benchmark of database engines. The same tasks on the same machine, with published settings and every result tied to the exact engine version.",
  image: {
    src: "/images/projects/project-dbbench.png",
    alt: "Illustration for DBBench, an open benchmark of database engines",
  },
  problem: "",
  solution: "",
  impact: "",
  links: [
    { label: "Documentation", href: dbbenchDocsUrl },
    { label: "GitHub", href: dbbenchRepoUrl },
    { label: "Report a wrong setting", href: dbbenchIssuesUrl },
  ],
};
