// October campaign preview prose. Built from nothing as the campaign fills it
// in, first from the laptop skeleton at micro scale and then from mini's real
// stages, so that what appears here is October's own work rather than
// September's carried over (user, 2026-09-14: "better to start from scratch").
// Rendered at /projects/arcadedb/next, never registered in the project index,
// and the live page at /projects/arcadedb is never touched by a preview
// publish (DECISIONS #83, #86).
//
// NO NUMBER IS TYPED INTO A SENTENCE HERE. Every figure on this page lives in
// a table cell, generated from the frozen rows, so nothing in this file can
// disagree with the data. page_check.PREVIEW_PROSE is empty for exactly that
// reason; the first sentence that types a number adds its pin there in the
// same commit.
import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl } from "../shared";

export const arcadeDbNext: Project = {
  slug: "arcadedb-next",
  title: "ArcadeDB",
  timelineOrder: 1,
  subprojectPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "engine",
        navLabel: "Engine",
        eyebrow: "Engine",
        title: "One storage engine for documents, graphs, vectors, and time series.",
        body: [
          "What the engine is, and which query languages it answers. Carried over once the campaign's own numbers exist to stand beside it.",
        ],
      },
      {
        id: "setup",
        navLabel: "Setup",
        eyebrow: "Benchmarks",
        title: "One machine, fixed limits, one job at a time.",
        body: [
          "The machine, the limits, and the protocol every cell obeys: one job at a time on a fixed set of cores, five repetitions per cell, the median printed with its spread. New in October: every engine commits without waiting for the disk, except Neo4j, which has no setting for it, and every row records which setting it ran under.",
        ],
      },
      {
        id: "documents",
        navLabel: "Documents",
        eyebrow: "Benchmarks",
        title: "Document OLTP and OLAP on TPC.",
        body: [
          "TPC-C and TPC-H at scale factor 1. New in October: payment joins new-order on the transactional table, so the rate covers both, and three line-item queries every engine can express without a join join Q1 and Q6 on the analytical table.",
        ],
      },
      {
        id: "graph",
        navLabel: "Graph",
        eyebrow: "Benchmarks",
        title: "Graph OLTP and OLAP on LDBC.",
        body: [
          "LDBC-SNB at two scale factors, both workloads. New in October: a three-hop read with a property filter, and the write becomes a create-then-delete pair, so the table carries a delete per engine as well as a write.",
        ],
      },
      {
        id: "vectors",
        navLabel: "Vectors",
        eyebrow: "Benchmarks",
        title: "Vector search, dense and sparse.",
        body: [
          "Dense search at one million and ten million vectors and sparse search at three sizes, recall beside every latency. New in October: ingest and index build are two columns wherever the engine has that boundary, instead of one total.",
        ],
      },
      {
        id: "timeseries",
        navLabel: "Time series",
        eyebrow: "Benchmarks",
        title: "Time series on TSBS.",
        body: [
          "The Time Series Benchmark Suite on its CPU data set. New in October: a double group-by over host and hour, and a high-usage filter, beside the newest-reading and twelve-hour aggregate queries.",
        ],
      },
      {
        id: "crossmodel",
        navLabel: "Cross-model",
        eyebrow: "Benchmarks",
        title: "One transaction across a vector, a graph edge, and a document.",
        body: [
          "One operation that touches three models, and what an interruption part-way through leaves behind, against the single engines and the composed stack.",
        ],
      },
      {
        id: "summary",
        navLabel: "Summary",
        eyebrow: "Benchmarks",
        title: "Every metric on this page in one figure.",
        body: [
          "One figure over every row above: where ArcadeDB leads, where it does not, and by how much, on the first pass and on the repeat.",
        ],
      },
      {
        id: "embedded",
        navLabel: "Python",
        eyebrow: "Embedded",
        title: "The engine as a Python package.",
        body: [
          "The same engine build inside a Python process: what the boundary costs, what a session costs to open and close, and when to choose embedded over a server.",
        ],
      },
      {
        id: "licenses",
        navLabel: "Licenses",
        eyebrow: "Licenses",
        title: "What each engine's license allows.",
        body: [
          "Two questions per engine, answered from its license text at the pinned version: may anyone run it for any purpose for free, and may you ship a product on it without publishing your own code.",
        ],
      },
    ],
  },
  summary:
    "The October campaign's page, built from nothing as the campaign runs: the October query set, the matched durability settings, and the ingest and index split, on every lane.",
  image: {
    src: "/images/projects/project-arcadedb-embedded-python.png",
    alt: "Illustration for ArcadeDB",
  },
  problem: "",
  solution: "",
  impact: "",
  links: [
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "Python docs", href: arcadeDbDocsUrl },
  ],
};
