import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl, arcadeDbWebsiteUrl } from "../shared";

export const arcadeDb: Project = {
  slug: "arcadedb",
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
        title: "Documents, graphs, key-value, time series and vectors share one storage engine.",
        body: [
          "Most databases that call themselves multi-model are several engines behind one API. ArcadeDB is not. Everything it stores sits on the same pages, goes through the same write-ahead log, and commits in the same transaction, so a write that touches a document, an edge and a vector index is one ACID transaction, atomic and durable as a unit, instead of three that have to be coordinated.",
          "The indexes work the same way. LSM trees, full-text, geo, hash, and both dense and sparse vector indexes are all commit in the same transaction as the records they index. Replication comes along for the ride: Raft ships page changes from that shared log, so every model replicates correctly without anyone writing replication code per model.",
          "Vectors are the exception worth naming. The vector records are transactional, logged and replicated like everything else, but the nearest-neighbour graph used to search them is not: it is built in the background and can be rebuilt. The data is the source of truth and the search structure catches up to it. That is more than a standalone vector store gives you, and less than a fully transactional index.",
        ],
      },
      {
        id: "embedded",
        navLabel: "Embedded",
        eyebrow: "Embedded",
        title: "The same engine, installed as a Python package and run inside your process.",
        body: [
          "ArcadeDB is a Java engine, and that is friction for Python work: a separate runtime to install, a service to start, and a network hop between your code and your data. The embedded distribution removes all three. It ships the upstream engine unmodified, with a bundled runtime and platform wheels, so `uv add arcadedb-embedded` or `pip install arcadedb-embedded` is the entire setup and the database runs in your process.",
          "This is a real package surface rather than a launcher. Transactions and lifecycle, schema and graph helpers, bulk ingest, import and export paths, and the vector features are all exposed and tested, with the example suite run in CI on every change.",
          "Both halves of this work are maintained here. Fixes and features found through the benchmarking below are filed and, where possible, contributed upstream, so the engine and the Python distribution improve together rather than diverging.",
          "The obvious question is what the Python boundary costs. The engine runs at the same speed either way; what gets charged for is handing results back. Against an in-process Java baseline doing the same work, a vector search costs 1.28x and a 100k-row scan 1.63x.",
          "The more useful number is the one inside Python. Asking for row objects is 13.8x slower than asking for columns over the identical query, so which call you reach for matters far more than the language boundary does. That is worth knowing before blaming the engine for a slow loop.",
          {
            type: "benchmarkTable",
            tableId: "pycost",
            caption: "The same query answered from Java and from Python, and the three ways Python can ask for the results.",
            showDigests: false,
          },
        ],
      },
      {
        id: "vectors",
        navLabel: "Vectors",
        eyebrow: "Benchmarks",
        title: "Vector search, measured against the engines built only for vector search.",
        body: [
          "The sharpest test of a multi-model engine is whether its vector search survives contact with systems that do nothing else.",
          "Both cases use real vectors, never generated ones. Sparse search uses SPLADE (Sparse Lexical And Expansion model) vectors over MS MARCO, a public search-relevance corpus. A SPLADE vector holds one weight per vocabulary term and is almost all zeros, so a query touches a few terms out of thirty thousand dimensions. Which terms it touches decides the cost: a common word carries a far longer posting list than a rare one. Real text is lopsided that way and generated data is not, which flatters an approximate index. Dense search uses real image descriptors, for the same reason: DEEP-10M, ten million vectors from a public image-descriptor set, and SIFT, an older descriptor set kept for its smaller tiers. The sparse corpus comes from Big-ANN, a public benchmark challenge for approximate nearest neighbour search at scale. Latencies below are p50, the median query.",
          "Recall is reported next to every latency. A vector benchmark without a quality number is not a comparison, since any engine can be made faster by searching less thoroughly, and the engines here sit at genuinely different points on that trade.",
          "The figure below summarises every workload on this page, so its row labels are compressed. Txn is transaction. OLTP, online transaction processing, is many small reads and writes, counted in operations per second, and OLAP, online analytical processing, is its counterpart in the tables further down: a few large scanning queries, timed in milliseconds. TS is time series, where agg is an aggregation over a window and pts/s is points ingested per second. TPC-H Q1 is the first query of a long-standing analytical benchmark. Sparse and dense name the two kinds of vector above, and the number beside them is the corpus size.",
          {
            type: "figureGrid",
            // One per row at every width, like every other figure here. These
            // are 3.45in paper figures with 8pt type: at two-up on a tablet
            // each lands near its native 246pt and the axis labels are at
            // their print size on a screen, which is too small to read.
            columns: 1,
            caption:
              "The whole evaluation in one figure, not just the vector part: ArcadeDB embedded against the best specialist on each workload, log scale, anything right of the line a win. It wins the operational and cross-model rows, matches DuckDB on time-series ingest, and loses every scan-, bulk- and search-bound row, which is the honest shape for a general engine measured against specialists. It does not win vector search. Every bar is a first timed pass after the index is built, on both sides, and at ten million vectors that is 8.87 ms for ArcadeDB against Qdrant's 1.34 and Chroma's 0.70. The dense bar divides by Qdrant rather than by Chroma, which the table shows is faster, because Chroma returns 93.4% of the true neighbours where ArcadeDB returns 95.1%: the specialist a row is measured against is the fastest one that searches at least as thoroughly as we do, which is what the axis means by equal recall. The pass matters only for us: run the same query set again and ArcadeDB answers in 0.96 ms, because it pages its index off disk and the second pass finds it resident, while Qdrant moves to 1.31 and Chroma to 0.71. So the dense row shows both. The bar is the first pass and the diamond is the same comparison in steady state, a 1.4x win reached without any comparator getting faster. No other row can show both, because every other lane times a single pass. The cross-model row is measured against SurrealDB, which is the fastest engine here that also does the whole operation in one transaction, rather than against the composed stack, which is slower and has no transaction spanning its two engines at all. The rows use each engine's own idiom: tabular OLTP is SQL against PostgreSQL, the graph row is Cypher against LadybugDB, and TPC-H Q1 is SQL against DuckDB.",
            items: [
              { image: { src: "/images/projects/arcadedb/f4_one_vs_n.svg", alt: "ArcadeDB latency against the best specialist engine at each corpus size" } },
            ],
          },
          {
            type: "benchmarkTable",
            tableId: "l3s",
            caption:
              "Sparse retrieval on real SPLADE vectors. ArcadeDB appears four times and every comparator once, because ArcadeDB is the engine under test: two deployments, plus two ablations of our own defaults. A settle step is the one-off operation an engine is given after loading and before any query is timed, so that it is answering from a finished index rather than a half-built one. Every engine gets its own: Elasticsearch a refresh and force-merge to one segment, Milvus a flush and load, Qdrant a wait until the collection reports green, ArcadeDB a compaction of its LSM segments. The no-settle-step row is ArcadeDB denied that, and it is there because a settle step is a favour the benchmark grants, so the cost of skipping it should be visible rather than assumed: without it ArcadeDB goes from fourth to last, 1.4x slower at a hundred thousand documents and 3.2x at a million. Only ArcadeDB has that row, and it is the one row here that exists to show the engine at its worst. What it cannot show is whether the others depend on their settle step as heavily, because nobody has measured Elasticsearch without its force-merge or Milvus without its flush. int8 posting weights are ArcadeDB's default and fp32 is the ablation, which is why recall sits beside every latency. The comparators carry no precision label here, unlike the dense table: there each engine's index type states what it stores, and here the weight encoding is internal to engines whose sparse formats we have not audited, so a label would be a guess.",
          },
          {
            type: "benchmarkTable",
            tableId: "l3d",
            caption: "Dense retrieval at two scales, including the embedded and server deployments of the same engine. Cold is the first timed pass after the build; warm repeats the same query set. Every engine at ten million was measured both ways and every engine at the smaller scale was measured once, so the dashes are a property of the tier and not of the engine. Read latency against recall rather than on its own: Chroma is the quickest engine at both scales and also the one returning the fewest true neighbours, which is why the summary figure above compares ArcadeDB against Qdrant, the fastest engine whose recall is at least ArcadeDB's.",
          },
        ],
      },
      {
        id: "models",
        navLabel: "Other models",
        eyebrow: "Benchmarks",
        title: "Graph, tabular, and the transaction that spans both plus vectors.",
        body: [
          "The same harness runs graph traversal on LDBC-SNB, the Linked Data Benchmark Council's Social Network Benchmark, a standard synthetic social graph. It also runs tabular work in both OLTP and OLAP shapes, time series on TSBS, the Time Series Benchmark Suite, and a cross-model transaction that starts from a vector hit, traverses the graph, and updates a document.",
          "That last one is the argument for a unified engine stated as an experiment rather than a claim. Against a composed stack of a vector store plus a graph database, the interesting output is not the latency, it is what a failure part-way through leaves behind. A composed stack has no transaction spanning both engines, so it can be interrupted into a state where the two disagree, and a single engine cannot.",
          {
            type: "benchmarkTable",
            tableId: "l2",
            caption: "Graph traversal on LDBC-SNB.",
          },
          {
            type: "benchmarkTable",
            tableId: "l4",
            caption:
              "Both ArcadeDB arms are shown: the native time-series type and the general-purpose document path. The distance between them is what the specialized layout buys.",
          },
          {
            type: "figureGrid",
            columns: 1,
            caption:
              "The cross-model operation: one engine doing it in a single transaction against a composed stack that cannot.",
            items: [
              { image: { src: "/images/projects/arcadedb/f7_e2_hybrid.svg", alt: "Latency of a vector to graph to document operation, single engine against a composed stack" } },
            ],
          },
          // No E2 table here on purpose. The paper reports this experiment as
          // the figure above plus prose; it has no E2 table, and inventing one
          // for the page would mean publishing a result in a form nobody
          // reviewed.
        ],
      },
      {
        id: "choosing",
        navLabel: "Choosing",
        eyebrow: "Choosing",
        title: "Embedded or server: the deployment choice, and what it actually costs.",
        body: [
          "Both deployments appear in the tables above running the same engine version, which makes the comparison a deployment measurement rather than an engine one. The table below then splits that gap in two, by measuring a third arm: an HTTP server running inside the same process. Going from embedded to that arm isolates the wire format with the process boundary held constant, and going from it to a separate container adds the boundary with the wire format held constant.",
          "The split is lopsided, and usefully so. The wire format costs something at every size and grows with the result. The process boundary is so small that at the smaller sizes it disappears into the noise and measures slightly negative. So the cost of running client and server as separate processes on one machine is essentially the serialization, not the separation, and the lever that would actually move it is a cheaper wire format rather than co-location.",
          {
            type: "figureGrid",
            columns: 1,
            caption: "What the server deployment costs relative to embedded, by result size.",
            items: [
              { image: { src: "/images/projects/arcadedb/f8_deployment.svg", alt: "Server deployment cost relative to embedded, by result size" } },
            ],
          },
          // Same as E2: the deployment split is the figure above plus prose in
          // the paper, with no table behind it. The three-arm decomposition is
          // still being folded into the paper text; when it lands there as a
          // table, it can appear here.
          "Use the embedded distribution when the database serves one process: notebooks, tests, single-node services, agent tooling, and anything where a network hop per query is pure cost. It installs with pip, starts in milliseconds, and has no service to operate.",
          "Use the server when more than one process or machine needs the same data, when you want the Postgres, Redis, Bolt or HTTP wire protocols, or when you need Raft replication and failover. The embedded package can also start a server in-process, so this is not a one-way door.",
          "This is a deployment decision, not a performance one. The engine is the same in both, and the difference you will feel is the boundary you put around it.",
        ],
      },
      {
        id: "reproducing",
        navLabel: "Reproducing",
        eyebrow: "Reproducing",
        title: "Every number here is generated, not typed.",
        body: [
          "The tables on this page are rendered from a JSON file exported by the benchmark suite, so they change when the measurements change and a stale number cannot survive in the prose. The suite, the runner and the frozen result rows are all in the repository.",
          "The protocol is deliberately boring, and this is the one place it is stated. Every engine runs in Docker under an identical cpuset and memory cap, one job at a time on one machine. Each printed cell is the median of five repetitions; the min-max spread behind it is in the linked result files and in the papers, which is where it stays rather than tripling the width of every column here. Comparators are pinned by image digest rather than by a floating tag, which is why each row carries its digest: it is the only unambiguous answer to which build was measured.",
          "Defaults are used first. Where a default would make a comparison meaningless rather than merely different, it is equalized and the change is disclosed in the conditions under the relevant table, including the cases where the correction works against us.",
          "What is not here is as deliberate as what is. The recovery and replication work is reported as prose rather than as a table, since a kill-9 either recovers or it does not, and the dense 10M tier waits on a released build as noted under its table.",
          "Two papers covering this work are in preparation, one on the engine and one on the Python distribution. Citation details will be added here once they are available.",
        ],
      },
    ],
  },
  summary:
    "A multi-model database engine that keeps documents, graphs, key-value, time series and vectors in one transactional engine, plus the Python distribution that runs that engine in process, benchmarked against the specialist systems in each category.",
  image: {
    src: "/images/projects/project-arcadedb-embedded-python.png",
    alt: "Illustration for ArcadeDB",
  },
  problem:
    "Applications increasingly need relational queries, graph traversal and vector search over the same data, and the usual answer is to run three systems and write glue between them. That glue has no transaction boundary, so a failure part-way through a multi-store write leaves the stores disagreeing, and there is no single place to ask a question that spans them. For Python work there is a second problem: the engines worth using are rarely installable as a package and runnable in process.",
  solution:
    "ArcadeDB puts every model on the same pages and the same write-ahead log, so a write spanning documents, edges and vectors is one ACID transaction, and replication is correct for every model without per-model code. The embedded distribution ships that same engine as a Python package with a bundled runtime, so it installs with pip and runs inside the application process, with an optional in-process server when wire protocols or replication are needed.",
  impact:
    "The engine and the Python distribution are developed together and measured against the specialist systems in each category, on real corpora rather than synthetic ones, with recall reported next to latency and every comparator pinned by image digest. Findings from that benchmarking are filed and contributed upstream, so the measurements feed the engine rather than only describing it.",
  // The hero renders the first two as buttons, so those two have to represent
  // both halves of the work rather than sending everyone to the Python side.
  links: [
    { label: "Python distribution", href: arcadeDbRepoUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "Python docs", href: arcadeDbDocsUrl },
    { label: "arcadedb.com", href: arcadeDbWebsiteUrl },
  ],
};
