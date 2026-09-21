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
//
// The rule matters more on this page than on the live one. Every cell under it
// today is a one-repetition laptop placeholder, so a sentence that quoted one
// would be quoting noise, and a sentence that compared two would be inventing
// a result. The prose therefore says what each table MEASURES and why those
// queries, and leaves every quantity to the cells.
//
// The two strings page_check DOES require are in the setup section: the host
// CPU it reads out of the payload, and the cpuset the rows recorded. Both come
// from the rows, and both change when the campaign moves from the laptop to
// the bench host, which is the point of checking them.
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
          "ArcadeDB is a Java engine. It runs embedded inside a Java process or as a server behind HTTP, Bolt, Postgres, and Redis protocols. HumemAI wraps the same engine for Python through JPype, so it also runs inside a Python process, which is the Python section further down. It answers SQL, in its own dialect, and Cypher, so the two query languages most people already know carry over. Every table on this page measures both deployments of one build, which is what the Mode column means.",
          "Most databases that call themselves multi-model are several engines behind one API. ArcadeDB is not. Documents, vertices, edges, vector entries, and time-stamped rows sit on the same pages, go through the same write-ahead log, and commit in the same transaction, so a write that touches a document, an edge, and a vector index is one ACID transaction rather than three that have to be coordinated. The indexes follow: LSM trees, full-text, geo, hash, and both dense and sparse vector indexes commit with the records they index, and Raft replication ships page changes from the shared log, so every model replicates without replication code per model.",
          "Vectors are the exception, and it is worth stating before any table below is read. The vector records are transactional, logged, and replicated like everything else; the nearest-neighbour graph used to search them is not. It is built in the background and can be rebuilt. The data is the source of truth and the search structure catches up to it. That is more than a standalone vector store offers, and less than a fully transactional index would be.",
          "This page is the October campaign, and it is a rebuild rather than a refresh. The query set is wider, every timed write runs at two durability settings instead of one, every table reports what the first query of a session costs beside what the hundredth costs, the vector tables separate loading the data from building the index, and every engine's answer to every deterministic query is now hashed and compared across engines before a single latency is published. Each section below says what that changed for the table under it.",
        ],
      },
      {
        id: "setup",
        navLabel: "Setup",
        eyebrow: "Benchmarks",
        // The live page's heading is "One machine, fixed limits, one job at a
        // time", which is the campaign's protocol and is not what produced the
        // cells under it today. A heading that claims the protocol over
        // placeholder numbers is the first thing a reader believes.
        title: "The protocol, and why this page does not follow it yet.",
        body: [
          "Read this section as a description of the machine these numbers were NOT measured on. The campaign runs on one dedicated machine, one cell at a time, each cell given the same cores and the same memory ceiling as the cell beside it. Nothing on this page was measured that way. It was measured on a development laptop, an Intel Core Ultra X9 388H, which was running a browser, an editor, and everything else it normally runs while each cell was timed. The containers were handed `cpuset` 0-11, which on a machine that is doing other things is a share of the cores rather than sole use of them, and each cell ran once instead of five times, on the smallest data set each benchmark has.",
          "So the timings here are not comparable: not between two engines in the same table, and not against the same table on the live page. What is worth reading is everything around them, which is the October instrument exactly as it will run: the tables, the columns, the conditions generated from the rows, and the prose. The two checks that describe the bench machine, the pinning of each cell to its own cores and the per-size memory envelope, are waived for this page and named just below; every other check, including the answer comparison and the durability class, runs here exactly as it will in October.",
          { type: "skeletonNotes" },
          "The conditions below hold for every table. A table adds its own beneath its caption where they differ, and those per-table conditions are generated from the rows rather than written by hand, so a condition cannot describe a setting a cell did not run under. Each comparator is pinned by image digest, each engine's version is read out of the running engine rather than assumed, and both are printed under the table that used them.",
          "Two conditions are new in October and worth reading before the tables. The first is durability: every engine that has the setting is put in the same class, where a commit returns without waiting for the disk and the log is flushed by the engine's own background policy, and the engines with no such setting are named on the tables they appear on instead of being quietly compared against it. The second is answer checking: every timed query whose answer is deterministic records a hash of that answer, and a gate refuses to publish a table whose engines disagree. A benchmark that never checks the answer measures how fast an engine can be wrong.",
          { type: "benchmarkConditions" },
        ],
      },
      {
        id: "documents",
        navLabel: "Documents",
        eyebrow: "Benchmarks",
        title: "Document OLTP and OLAP on TPC.",
        body: [
          "Most people arrive with tables. ArcadeDB stores them as documents and answers the same SQL, so documents come first. The benchmarks are TPC-C and TPC-H, the standard transaction and analytics workloads: TPC-C is many small reads and writes, TPC-H is a few large scanning queries. Every engine answers the same question in its own language, SQL where it has one, the aggregation pipeline for MongoDB, SurrealQL for SurrealDB, AQL for ArangoDB, and the answers are hashed and compared before the times are published.",
          "The transactional table is wider than September's. It ran one transaction, new-order, and that left out both the other half of the TPC-C mix and the simplest thing anyone does to a database. It now runs new-order and payment, which together are most of the TPC-C mix, and beside them the four single-record operations: insert one order line, read it back by key, update one column, delete it. Those four are the most comparable operations on the page, because every engine here expresses them without dialect argument, and they are the first numbers most readers look for.",
          {
            type: "benchmarkTable",
            tableId: "docs_oltp",
            caption:
              "TPC-C's new-order and payment transactions on the TPC-H tables, and the single-record insert, read, update, and delete beside them. Each column is a warm median; the ninety-ninth percentile is printed for new-order, the transaction this table leads with. There is no cold column here because every operation runs against an already-open, already-warm database by construction, which the rows say in their own words below the table.",
          },
          "The analytical table gained three queries for a reason the old one made obvious: two queries cannot separate a planner that is good at grouping from one that is good at scanning. Q1 and Q6 stay, and beside them run the top ten parts by revenue, a count by ship mode, and revenue by month. All three are line-item queries that every engine here can express without a join, so no engine is being measured on a join it does not have. Count by ship mode sits next to Q1 on purpose: it isolates grouping from aggregation.",
          "Two of the five return money and nothing else, the revenue total and revenue by month, which turned out to be a hole in the answer check rather than a detail of the query. Sums that large are compared to a fixed number of significant digits, so a row lost in the middle of a scan falls inside the rounding and nothing catches it. Both queries now count the rows they aggregate as well as summing them, and the count is compared exactly. It costs nothing, because the count rides the scan the sum already makes, and it closes the case the hash could not see: an engine that quietly drops a row to an index bound.",
          {
            type: "benchmarkTable",
            tableId: "docs_olap",
            caption:
              "Five analytical queries over the same documents. The cold column is the first query of a session on a database that has just been opened, and every other latency column is the warm median of the iterations that follow it.",
          },
        ],
      },
      {
        id: "graph",
        navLabel: "Graph",
        eyebrow: "Benchmarks",
        title: "Graph OLTP and OLAP on LDBC.",
        body: [
          "Graph is what most people use ArcadeDB for. The benchmark is LDBC-SNB, the Linked Data Benchmark Council's Social Network Benchmark. ArcadeDB, Neo4j, and LadybugDB answer in Cypher, SurrealDB in SurrealQL, and ArangoDB in AQL. Neo4j is the comparator most readers will want; LadybugDB is here because it is embedded and columnar, which is the closest thing to running ArcadeDB inside your own process.",
          "The transactional table reads at three depths rather than two. A point lookup, one hop, and two hops were already there; a three-hop read with a property filter is new, and it sits beside the unfiltered two-hop on purpose, because the pair is what shows whether an engine pushes a filter into the traversal or walks the neighbourhood first and filters afterwards. The write side is no longer a single insert: inserting a person with an edge, updating a property, and deleting the record are three columns, so the table carries a delete per engine. Nothing on the September page ever deleted anything.",
          {
            type: "benchmarkTable",
            tableId: "l2",
            caption:
              "Point lookup, one hop, two hops, and a three-hop read with a property filter, with insert, update, and delete beside them. Warm medians, with the ninety-ninth percentile on the point lookup.",
          },
          "The analytics table gained two queries so it is as thorough as the document one. Both are chosen from what the loaded subset actually holds, people with properties and the edges between them, and both are expressible by every engine on the table without a plugin. A degree distribution counts people by how many friends they have, which is a whole-graph aggregation over every edge and the cheapest honest way to make a planner touch everything. A triangle count counts mutual-friend triples once each, which is the canonical graph analytic and the one query here that punishes a bad join or traversal plan rather than a slow scan. Both return small deterministic answers, a histogram and a single integer, which makes them the strongest answer checks on the page: if two engines disagree about how many triangles the same graph holds, one of them is wrong, and the gate says so before anybody reads a latency.",
          "The triangle count was written off as beyond SurrealDB's query language, and that was wrong: it was untried rather than impossible. It is written now for both of that engine's deployments and checked against the same count every other engine returns, and where a row is missing from the table below, the table says which cell ran out of time rather than leaving the gap to be guessed at. The two deployments run different text for it, because they are two different versions of the engine and each plans one spelling better than the other, by a factor large enough that a single shared text would be measuring our phrasing rather than either version. Both spellings are kept in the harness so the choice can be checked, and the answer check is what proves they ask the same question.",
          {
            type: "benchmarkTable",
            tableId: "l2olap",
            caption:
              "Average friend age, friendships within a city, most friends, the degree distribution, and the triangle count. A query that exceeds its time budget is published as censored, with its budget and the iterations it reached, rather than dropped.",
          },
        ],
      },
      {
        id: "vectors",
        navLabel: "Vectors",
        eyebrow: "Benchmarks",
        title: "Vector search, dense and sparse.",
        body: [
          "Two vector tables, because sparse and dense vectors are different problems with different engines behind them. Both report recall beside every latency, which is not decoration: an approximate index can be made arbitrarily fast by returning worse answers, so a latency without the share of true neighbours it found is not a comparable number. Recall is measured against an exact brute-force answer over the same corpus, which is also why these two lanes keep recall as their answer check rather than a hash: for an approximate index, agreeing with the exact answer is the stronger test.",
          "Sparse search runs the Big-ANN sparse track, real learned sparse vectors over a real document collection. The engines are stores that offer a sparse index at all, and ArcadeDB appears at both the precision it uses by default and at full precision, because quantizing the posting weights is a choice that trades recall for speed and the table should show the cost rather than hide it.",
          {
            type: "benchmarkTable",
            tableId: "l3s",
            caption:
              "Sparse search with recall beside every latency. Loading and indexing are one timer on this table: the engines here build the index while ingesting, so the boundary the dense table splits does not exist.",
          },
          "Dense search is where October changed most. September timed one thing, a search over a built index, and reported loading and index building as a single number, which hid the question anybody sizing a system asks first, namely how much of the wait is the data going in and how much is the structure being built. Those are now two timers wherever the engine has that boundary. The table also times two operations it never had: a search after inserting into an already-built index, and a search after deleting from one. An index that is fast only when nothing has changed since it was built is a different product from one that stays fast under writes.",
          {
            type: "benchmarkTable",
            tableId: "l3d",
            caption:
              "Dense search, and search after an insert and after a delete into the same built index, with recall beside each. Every row states what it stores, full precision or quantized, because a quantized index and a full-precision one are not the same measurement.",
          },
        ],
      },
      {
        id: "timeseries",
        navLabel: "Time series",
        eyebrow: "Benchmarks",
        title: "Time series on TSBS.",
        body: [
          "The benchmark is TSBS, the Time Series Benchmark Suite, on its CPU data set, against the engines built for this shape of data. ArcadeDB appears twice, once through ordinary SQL over documents and once through its native time-series path, because those are two genuinely different ways to use the engine and publishing only the faster one would be reporting a feature as a property of the engine.",
          "September asked two questions of the ingested data. October asks the ones a monitoring stack actually asks. The newest reading per sensor and a twelve-hour aggregate stay. Added: a double group-by over host and hour, which is the query that separates an engine with a real grouping plan from one that sorts everything first; a high-usage filter, which selects a small fraction of a large scan and shows whether the filter is pushed down; and a grouped, ordered, limited query, which is the shape a dashboard actually issues. The ingest rate is reported as its own column, separately from every query, because the two say nothing about each other.",
          {
            type: "benchmarkTable",
            tableId: "l4",
            caption:
              "Every query the section describes, with the ingest rate beside them. The cold column is the first query after the database is opened; the rest are warm medians.",
          },
        ],
      },
      {
        id: "crossmodel",
        navLabel: "Cross-model",
        eyebrow: "Benchmarks",
        title: "One operation across a vector, a graph edge, and a document.",
        body: [
          "This is the section the whole page exists for. Everything above compares ArcadeDB against engines that do one thing; here the question is what a single engine buys you when one operation touches more than one model. The comparators are the other single-stack multi-model engines and, beside them, a composed stack of a vector store and a graph database with application code between them, which is what most people build when they do not have one engine.",
          "September measured one write path and its interruption, which argues atomicity well and says nothing about the shape most applications actually run, which is retrieval. Two read paths are new. The first is the ordinary multi-model read: a vector search, then a one-hop expansion from what it found, then a projection of the documents behind those. The second is a vector search restricted to the neighbourhood of a starting node, which is the case that separates a single engine from a composed stack, because the engine can push the filter into the index while the stack has to move a candidate set between two systems and choose between filtering before or after searching. An engine that filters after the search rather than before shows it in recall rather than in latency, which is why both read paths report recall against a brute-force answer over the same filtered candidate set.",
          {
            type: "benchmarkTable",
            tableId: "e2",
            caption:
              "The composed write, the retrieval path, and the graph-filtered vector search, with recall for the two read paths. The write is a transaction on the engines that have one and a sequence of calls on the stack that does not.",
          },
          "The second table is the one that cannot be argued with a latency. The same operation is interrupted part-way through, many times, and afterwards the store is asked what it holds. An engine with one transaction across the three models either did all of it or none of it. A stack of two systems has no such boundary, so some fraction of its interrupted operations leave a vector entry with no document behind it, or an edge to a record that was never written.",
          {
            type: "benchmarkTable",
            tableId: "e2atom",
            caption:
              "Interrupted composed operations, and how many of them left the store holding half of one. This table has no latency column on purpose: it is a correctness result, not a speed one.",
          },
        ],
      },
      {
        id: "durability",
        navLabel: "Durability",
        eyebrow: "Benchmarks",
        title: "What waiting for the disk costs.",
        body: [
          "Every table above reports writes at the same durability setting: a commit returns without waiting for the disk, and the log is flushed by the engine's own background policy. A power loss can then lose the last committed transactions but cannot corrupt the store. That is ArcadeDB's engine default, and it is a documented production mode for each of the other engines here, which is why it is the matched class and why the main tables print it.",
          "Matching at that end raises the obvious question, so October answers it instead of arguing about it. Every timed write runs twice, once at the matched setting and once with the commit waiting for the log to be flushed and synced, and the table below prints both with the ratio between them. The setting is a property of the cell rather than a second measurement inside one, because on most of these engines it lives on the database or on the server, so each pair of numbers is two runs of the same cell.",
          "The table carries every timed write rather than one representative each, and read down one engine it says something the single row could not. The ratio column is what the strict setting costs on that engine for that operation, and it is read down one engine rather than across the row. What the ratios say about the engines is written when the campaign's rows are in, not before.",
          "Some engines have no such setting at all. They were traced rather than assumed, and each one that turns out to sync at every commit with no way to relax it prints a single number, in the column for a commit that waits, and the table names it. That is also what puts those engines on an even footing: comparing their one setting against everyone else's relaxed one, which is what a single-class page does, reads as a speed difference when it is a durability difference.",
          {
            type: "benchmarkTable",
            tableId: "durability",
            caption:
              "Every timed write at both settings, with the ratio, and the single-record read beneath the document writes as a control. The Size column names the operation rather than a corpus size, because the three lanes that time a write do not write the same thing, and each engine is compared only against the engines running its own operation.",
            showDigests: false,
          },
        ],
      },
      {
        id: "summary",
        navLabel: "Summary",
        eyebrow: "Benchmarks",
        title: "Every metric on this page in one figure.",
        body: [
          "The summary is one figure over every row above, each metric as a ratio against the strongest comparator on that row, with the first pass and the repeat pass side by side. It is the only place on the page where the tables are read against each other, and it is deliberately the only one: an average across queries whose times span orders of magnitude is the slowest query wearing a disguise, so each table keeps one column per query and the cross-table view lives here as ratios.",
          "It is drawn from the campaign's own rows and therefore is not on this page yet. A skeleton has one repetition of each cell at a size chosen to run on a laptop, and a ratio built from that would look exactly like a result while being noise. The figure lands with the stage that measures the rows under it.",
        ],
      },
      {
        id: "embedded",
        navLabel: "Python",
        eyebrow: "Embedded",
        title: "The engine as a Python package.",
        body: [
          "ArcadeDB is a Java engine, which is friction for Python work: another runtime to install, a service to start, and a network hop between your code and your data. The Python package removes all three. It ships the upstream engine unmodified, with a bundled Java runtime and platform wheels, so installing it is the whole setup and the database runs inside your process. It is a full API rather than a launcher: transactions and lifecycle, schema and graph helpers, bulk ingest, import and export, and the vector features are all exposed and tested, with the example suite run in CI on every change.",
          "The engine and the package are maintained together, and findings from the tables above are filed upstream and, where possible, fixed there. Both are Apache-2.0, and both maintainers have said they will keep it that way.",
          "Opening a database is the cost nobody benchmarks and everybody pays. The table below is one session at a time: open, do one thing, close, for each kind of data the engine can hold, embedded and against the server. It is also the page's cold measurement in its purest form, which is why it carries no cold column of its own: the whole table is the first thing a process does.",
          {
            type: "benchmarkTable",
            tableId: "lifecycle",
            caption:
              "A session for each kind of data, embedded and served. The embedded rows also carry what starting the process costs before the first database call, because an open measured inside an already-running process is not what someone launching a script pays.",
            showDigests: false,
          },
          "Running the database in another process costs two things at once, and one number cannot tell them apart: the answer has to be turned into a wire format, and it has to cross a process boundary. The table below separates them by measuring a third deployment in between, an HTTP server running inside the same process. Going from embedded to that middle deployment buys the wire format and nothing else. Going from the middle deployment to a separate container buys the second process and nothing else, because the wire format is already paid for.",
          {
            type: "benchmarkTable",
            tableId: "e4",
            caption:
              "One projection answered at six result sizes by three deployments: in process, an HTTP server inside the same process, and a separate container. Read a row across to see which of the two costs grows with the answer.",
            showDigests: false,
          },
          "The remaining table of this section, what the Python boundary costs against the same engine called from Java, is built from an artifact of the campaign host rather than from a lane of its own. The setup section above names it while it is absent, and stops naming it once it lands.",
          "Embedded or server stays a deployment decision rather than a performance one. The engine is the same build in both, which is what the Mode column on every table above is there to show, and the difference you will feel is the boundary you put around it. Use embedded when one process serves the data: notebooks, tests, single-node services, and agent tooling, where a network hop per query is pure cost. Use the server when more than one process or machine needs the same data, when you want the Postgres, Redis, Bolt, or HTTP wire protocols, or when you need replication and failover. The Python package can start a server inside your process, so the choice is reversible.",
        ],
      },
      {
        id: "licenses",
        navLabel: "Licenses",
        eyebrow: "Licenses",
        title: "What each engine's license allows.",
        body: [
          "Not every engine measured here is open source in the sense the Open Source Initiative defines, and the phrase has been stretched far enough that the page asks two narrower questions instead. May anyone run it for any purpose for free, including selling a product or a service built on it, without paying the vendor? And may you modify it and ship or serve a product on it without publishing your own code? Each answer is read from the license text at the version actually pinned in the tables above, because a license is a property of a release: several of the comparators move to newer versions for this campaign, and each row is re-read at the version that ran.",
          "| Engine | License | Any use, free | Your code stays yours |\n| --- | --- | --- | --- |\n| ArcadeDB engine | Apache-2.0 | **yes** | **yes** |\n| arcadedb-embedded (the Python package) | Apache-2.0 | **yes** | **yes** |\n| PostgreSQL and pgvector | PostgreSQL License | **yes** | **yes** |\n| Apache AGE | Apache-2.0 | **yes** | **yes** |\n| DuckDB | MIT | **yes** | **yes** |\n| SQLite | public domain | **yes** | **yes** |\n| sqlite-vec | Apache-2.0 | **yes** | **yes** |\n| MongoDB Community | SSPL-1.0 | no | no |\n| Neo4j Community | GPL-3.0 (Enterprise is commercial) | yes | no |\n| LadybugDB | MIT | **yes** | **yes** |\n| Qdrant | Apache-2.0 | **yes** | **yes** |\n| Milvus | Apache-2.0 | **yes** | **yes** |\n| Elasticsearch | AGPL-3.0 (also SSPL and ELv2) | yes | no |\n| Chroma | Apache-2.0 | **yes** | **yes** |\n| LanceDB | Apache-2.0 | **yes** | **yes** |\n| QuestDB | Apache-2.0 | **yes** | **yes** |\n| TimescaleDB | Timescale License (the image used here); the core alone is Apache-2.0 | no | no |\n| SurrealDB | Business Source License 1.1 | no | no |\n| ArangoDB | Business Source License 1.1 | no | no |",
          "Rows in bold pass both tests. Permissive licenses and the public domain answer yes to both; copyleft answers yes to the first and no to the second, because the GPL and the AGPL require sharing what you distribute or serve; source-available licenses answer no to both, because the SSPL, the Business Source License, and the Timescale License each reserve some uses to the vendor. The Open Source Initiative approves every license in the first two groups and none in the third.",
          "That matters most among the engines that compete with ArcadeDB directly. Four engines on this page are single-stack multi-model databases, one process serving documents, graph, and vectors: ArcadeDB, ArangoDB, MongoDB, and SurrealDB. Among those four, ArcadeDB is the only one that passes both tests, Apache-2.0 since its first commit, and the only one whose engine and Python bindings ship together in monthly releases. ArcadeDB's founder has written that the project will never change its license; this page reports that as his published statement rather than as a guarantee, and HumemAI makes the same commitment for the Python package. PostgreSQL with pgvector and AGE reaches the same one-transaction result by loading extensions into one process and is open source under both tests; it is not counted among the four because three projects maintain its three models.",
          "The four are not the same engine with four names, and the tables above do not compare them on every workload. Where one of them is missing from a table there is a reason, and the reason is written under that table; what the reader could not do until now is see all of those reasons at once. The table below does that. It is not measured: it is read off the tables above on every publish, one column per table, so it cannot say an engine was compared somewhere it was not.",
          {
            type: "benchmarkTable",
            tableId: "multimodel",
            caption:
              "Which of the four multi-model engines has rows on which table, derived from the tables above. The cell says whether the engine was measured there, was left off with a reason the table itself prints, or was not run on that workload at all.",
          },
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
