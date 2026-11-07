// MMDBBench: the benchmark as its own project, standalone. Rendered at /research/mmdbbench. Lane pages live under it
// (/research/mmdbbench/<lane>, see src/lib/dbbench/lanes.ts).
//
// The methodology points below summarise docs.humem.ai/mmdbbench/latest/methodology/.
// When that page changes, change this list in the same pull request.
//
// NO RESULT IS PUBLISHED YET, and no number is typed into a sentence here. The first results come in November 2026.
// When they land, the result tables are added back to the lane sections and the lane pages in the same change that
// flips DBBENCH_INDEXABLE.
import type { Project } from "../types";
import { dbbenchFirstResults, dbbenchLanes } from "../../dbbench/lanes";
import {
  dbbenchDocsUrl,
  dbbenchEnginesUrl,
  dbbenchIssuesUrl,
  dbbenchMethodologyUrl,
  dbbenchRepoUrl,
} from "../shared";

const laneList = dbbenchLanes
  .map((lane) => `- [${lane.title}](/research/mmdbbench/${lane.slug}): ${lane.blurb}`)
  .join("\n");

// One section per lane: what it measures and a link to the lane page.
const laneSections = dbbenchLanes.map((lane) => ({
  id: lane.slug,
  navLabel: lane.navLabel,
  eyebrow: "Lane",
  title: `${lane.title}.`,
  body: [lane.lead[0], `[The ${lane.title.toLowerCase()} lane](/research/mmdbbench/${lane.slug}), with the tables it will publish.`],
}));

export const dbbench: Project = {
  slug: "mmdbbench",
  title: "MMDBBench",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Rules and code.",
    sections: [
      {
        id: "about",
        navLabel: "About",
        eyebrow: "MMDBBench",
        title: "The same tasks, on the same machine, for every engine.",
        body: [
          "Agent memory is becoming an important workload. An agent keeps what it learns as facts and events (documents and tables), the relations between them (a graph), their meaning (vectors), their words (text), and their time. It asks one database to serve all of these at once, usually in many small collections that change on every turn: a few inserts, then a query right away, with other agents writing next to it. Most benchmarks measure one data model at a time, so the cost of putting them in one engine is not visible.",
          "MMDBBench is an open benchmark of multi-model databases: databases that serve tables, time series, documents, graphs, key-values, and vectors from one storage engine. Specialist databases built for a single model run the same tasks as per-model baselines, so a reader can see what one engine gives up or gains against the engine built for that job.",
          "Every engine in a lane answers the same tasks over the same data on the same x86 Linux machine, in SQL, Cypher, or its native language. The settings are published, and every result is tied to the exact version of the engine that produced it. The raw result rows are open.",
          "Results are kept. When an engine ships a new version, new rows are added next to the old ones. When a setting is corrected, the corrected run is added and the earlier result stays visible.",
          "MMDBBench does not rank databases in general. It measures the tasks listed in each lane, on the stated machine and settings. A different workload, scale or tuning can change the order. That is why the settings are published, and why anyone can tell us when one is wrong.",
          "There are six lanes. An engine appears only in the lanes it is built for.",
          laneList,
        ],
      },
      {
        id: "status",
        navLabel: "Results",
        eyebrow: "Results",
        title: "No results yet.",
        body: [
          dbbenchFirstResults,
          "Each lane below says what it measures and which tables it will carry. The method above is what every result will follow.",
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
          "The full rules are in the [methodology](" + dbbenchMethodologyUrl + "). The exact settings for each engine, and the reason for each one, are on the [engines page](" + dbbenchEnginesUrl + "). The code is at [github.com/humemai/mmdbbench](" + dbbenchRepoUrl + ").",
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
        id: "related",
        navLabel: "Related work",
        eyebrow: "Related work",
        title: "Other multi-model benchmarks.",
        body: [
          "Four academic benchmarks already address multi-model databases.",
          "- [UniBench](https://www.helsinki.fi/en/researchgroups/unified-database-management-systems-udbms/research/unibench-towards-benchmarking-multi-model-dbms), from the University of Helsinki: relational, JSON, XML, key-value, and graph data in one social commerce scenario, with multi-model queries and transactions.\n- [M2Bench](https://www.vldb.org/pvldb/vol16/p747-moon.pdf), from Seoul National University: analytic tasks over relational, document, property graph, and array data, run on polyglot persistence (MySQL, MongoDB, Neo4j, and SciDB), ArangoDB, and AgensGraph.\n- [MMSBench-Net](https://ceur-ws.org/Vol-3714/paper6.pdf), from the University of Basel: a scenario-based benchmark over relational, document, and graph data, used to compare Polypheny and SurrealDB.\n- [GRBench](https://arxiv.org/abs/2608.31027), by Liu and colleagues: relational and graph data together, evaluated on relational extensions, multi-model databases, and dedicated graph-relational systems.",
          "None of the four lists vectors or time series among its data models. MMDBBench adds both, and it runs a specialist database for each model as a baseline, so the question is what one engine gains or gives up against a specialist, not only how two multi-model systems compare. Tasks are written in SQL, Cypher, and native languages, on one x86 Linux platform with pinned versions, and the result rows are open.",
        ],
      },
      {
        id: "independence",
        navLabel: "Independence",
        eyebrow: "Independence",
        title: "Who runs MMDBBench.",
        body: [
          `MMDBBench is run by HumemAI. HumemAI also builds the [ArcadeDB Python package](/software/arcadedb-python). It is measured by the same rules as every other engine: the same tasks, the same machine, published settings, and a result for every failure.`,
          "The code and the settings are public, so anyone can check a result or reproduce it. When a result is wrong, the fix is a new row, not an edit.",
        ],
      },
      {
        id: "citation",
        navLabel: "Cite",
        eyebrow: "Cite",
        title: "Cite MMDBBench.",
        body: [
          "~~~bibtex\n@misc{kim2026mmdbbench,\n      title={{MMDBBench}: an open benchmark of multi-model databases},\n      author={Taewoon Kim},\n      year={2026},\n      publisher={Zenodo},\n      doi={10.5281/zenodo.23481288},\n      url={https://github.com/humemai/mmdbbench},\n}\n~~~",
          "Cite a release of the repository rather than this page, because the page changes with every measurement. The DOI above covers every release; the [Zenodo record](https://doi.org/10.5281/zenodo.23481288) lists the DOI of each release, for when the exact numbers matter.",
        ],
      },
    ],
  },
  summary:
    "An open benchmark of multi-model databases: one engine for tables, time series, documents, graphs, key-values, and vectors, with specialist databases as baselines.",
  image: {
    src: "/images/projects/project-dbbench.png",
    alt: "Illustration for MMDBBench, an open benchmark of multi-model databases",
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
