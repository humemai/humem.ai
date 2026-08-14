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
          "Vectors are the exception worth naming. The vector records are transactional, logged and replicated like everything else, but the nearest-neighbour graph used to search them is not: it is built in the background and can be rebuilt. The data is the source of truth and the search structure catches up to it. A transactional record with an eventually consistent index over it is more than a standalone vector store offers, and less than a fully transactional index would be.",
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
          "The more useful number is the one inside Python. Asking for row objects is 13.8x slower than asking for columns over the identical query, so which call you reach for matters far more than the language boundary does. Which call you reach for is worth checking before blaming the engine for a slow loop.",
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
          "The sharpest test of a multi-model engine is whether its vector search survives contact with systems that do nothing else. Every corpus below is real and published, never generated, which matters most for the sparse case.",
          "A SPLADE (Sparse Lexical And Expansion model) vector stores one weight per word in the vocabulary, and nearly every weight is zero, so a search only has to look at the few words a query actually uses. Those words cost wildly different amounts. A common word has to be checked against a huge number of documents; a rare one against almost none.",
          "Real writing has a few words that appear everywhere and a very long tail that appear almost nowhere, so some queries are far more expensive than others. Generated data spreads words out evenly, which quietly removes the expensive case and makes any approximate index look better than it is. Dense search uses published image descriptors for the same reason.",
          "| Corpus | Vectors | Dimensions | Used for |\n| --- | --- | --- | --- |\n| SPLADE over MS MARCO | 100k, 1M, 8.84M | 30,109 | every sparse row |\n| SIFT | 1M | 128 | the smaller dense tier |\n| DEEP | 9.99M | 96 | the ten-million dense tier |",
          "MS MARCO is a public search-relevance corpus, and the sparse vectors come from Big-ANN, a benchmark challenge for approximate nearest-neighbour search at scale. SIFT and DEEP are standard image-descriptor sets. Latencies below are p50, the median query.",
          "Two of those sizes are ceilings rather than choices. 8.84 million is the entire Big-ANN sparse base set, so no larger sparse tier exists to run, and DEEP's 9.99 million is the ten-million slice that ships with exact ground truth. The dense corpora are also narrow beside a modern text embedding, which runs 768 to 3072 numbers wide against SIFT's 128 and DEEP's 96. That width is fixed by how the descriptors were produced, and these sets earn their place anyway by publishing exact nearest neighbours at ten-million scale, which is what makes recall comparable across engines at all. It does mean the dense rows describe index behaviour at 96 and 128 dimensions, and a 1536-dimension embedding is a different question.",
          "The index settings are matched rather than left to each vendor's defaults. Dense search builds HNSW at ef_construction 100 and queries at ef_search 100 everywhere, with a graph degree of 16 neighbours per node. ArcadeDB spells that maxConnections 32, because its bound is per layer while hnswlib-style engines double theirs at the base layer, so matching the numeral instead of the degree would have handed ArcadeDB twice the graph. Sparse search has no equivalent knob, so every engine runs its own defaults there and each table states what precision the index stores. Every query asks for the top 10.",
          "Recall is reported next to every latency. A vector benchmark without a quality number is not a comparison, since any engine can be made faster by searching less thoroughly, and the engines here sit at genuinely different points on that trade.",
          "Every engine in every table below runs in the same container envelope, one at a time on one machine, and each cell is the median of five repetitions rather than a single sample. The exact build measured sits under each table.",
          {
            type: "benchmarkTable",
            tableId: "l3s",
            caption:
              "Sparse retrieval on real SPLADE vectors. ArcadeDB appears three times and every comparator once, because ArcadeDB is the engine under test: it runs in both deployments, and the fp32 row ablates our own default. Every engine gets a settle step before any query is timed, the one-off operation that leaves it answering from a finished index rather than a half-built one. Elasticsearch refreshes and force-merges to a single segment, Milvus flushes and loads, Qdrant waits until the collection reports green, and ArcadeDB compacts its LSM segments. int8 posting weights are ArcadeDB's default and fp32 is the ablation, which is why recall sits beside every latency. The comparators carry no precision label here, unlike the dense table: there each engine's index type states what it stores, and here the weight encoding is internal to engines whose sparse formats we have not audited, so a label would be a guess.",
          },
          {
            type: "benchmarkTable",
            tableId: "l3d",
            caption: "Dense retrieval at two scales, including the embedded and server deployments of the same engine. Cold is the first timed pass after the build; warm repeats the same query set. Every engine at ten million was measured both ways and every engine at the smaller scale was measured once, so the dashes are a property of the tier and not of the engine. Read latency against recall rather than on its own: Chroma is the quickest engine at both scales and also the one returning the fewest true neighbours, which is why the summary figure at the end of the next section compares ArcadeDB against Qdrant, the fastest engine whose recall is at least ArcadeDB's.",
          },
        ],
      },
      {
        id: "models",
        navLabel: "Beyond vectors",
        eyebrow: "Benchmarks",
        title: "Graph, tabular, and the transaction that spans both plus vectors.",
        body: [
          "The same harness runs graph traversal on LDBC-SNB, the Linked Data Benchmark Council's Social Network Benchmark, a standard synthetic social graph. It also runs tabular work in both OLTP and OLAP shapes, time series on TSBS, the Time Series Benchmark Suite, and a cross-model transaction that starts from a vector hit, traverses the graph, and updates a document. The tables below and the summary figure at the end all use compressed labels, which are worth having to hand:",
          "| Label | What it means |\n| --- | --- |\n| Txn | Transaction. |\n| OLTP | Online transaction processing: many small reads and writes, counted in operations per second. |\n| OLAP | Online analytical processing: a few large scanning queries, timed in milliseconds. Its rows are in the tables further down. |\n| TS | Time series. Agg is an aggregation over a window; pts/s is points ingested per second. |\n| TPC-H Q1 | The first query of a long-standing analytical benchmark. |\n| Sparse, Dense | The two kinds of vector above. The number beside each is the corpus size. |",
          {
            type: "benchmarkTable",
            tableId: "l2",
            caption: "Graph traversal against Neo4j and LadybugDB on LDBC-SNB. Point is a single vertex lookup, 1-hop and 2-hop walk that many edges out from a starting person, and write inserts an edge.",
          },
          "Analytical queries over the whole graph are a different job from those single traversals, and ArcadeDB has a separate mechanism for them. A Graph Analytical View is an in-core projection of the graph, built once, that the planner uses for queries touching most of the vertices instead of a handful. Because it is optional, it can be switched off, so the table below carries the same engine twice and the cost of the mechanism is visible rather than assumed.",
          {
            type: "benchmarkTable",
            tableId: "l2olap",
            caption: "The view is worth 6.5x on top degree and about 2.4x on the other two, which is enough to move ArcadeDB from behind Neo4j to ahead of it on all three. LadybugDB wins all three regardless: it stores the graph in columns, which is the same reason DuckDB wins the analytical tabular queries further down. This is the honest shape of the multi-model tradeoff, one engine covering every model competently rather than beating a specialist at its own workload.",
          },
          {
            type: "benchmarkTable",
            tableId: "l1",
            caption: "Tabular transactional and analytical work against PostgreSQL and DuckDB.",
          },
          {
            type: "benchmarkTable",
            tableId: "l1tpc",
            caption: "The same two shapes on TPC-H and TPC-C, the long-standing analytical and transactional benchmarks.",
          },
          {
            type: "benchmarkTable",
            tableId: "l4",
            caption: "Time series against QuestDB and DuckDB on TSBS. ArcadeDB appears twice because it offers two ways to store this data. The native TIMESERIES type is a dedicated layout that keeps points for one series together in time order, and the document path stores each reading as an ordinary document, which is what you get if you model the data without knowing the specialised type exists. Both are supported and both are real choices, so the gap between them is what the specialised layout is worth: 46 times the ingest rate and a twelve-hour aggregate 68 times quicker, against a slightly slower lookup of the newest reading.",
          },
          "The cross-model transaction is the argument for a unified engine stated as an experiment rather than a claim. Against a composed stack of a vector store plus a graph database, the interesting output is not the latency, it is what a failure part-way through leaves behind. A composed stack has no transaction spanning both engines, so it can be interrupted into a state where the two disagree, and a single engine cannot.",
          {
            type: "benchmarkTable",
            tableId: "e2",
            caption: "The cross-model operation: a vector hit expands over graph edges and updates a document. ArcadeDB and SurrealDB do it in one transaction; the composed stack has no transaction spanning its two engines.",
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
          "One figure for all of it. Every row above appears here as a ratio against the strongest comparator for that workload.",
          {
            type: "figureGrid",
            // One per row at every width, like every other figure here. These
            // are 3.45in paper figures with 8pt type: at two-up on a tablet
            // each lands near its native 246pt and the axis labels are at
            // their print size on a screen, which is too small to read.
            columns: 1,
            caption:
              "The whole evaluation in one figure, not just the vector part: ArcadeDB embedded against the best specialist on each workload, log scale, anything right of the line a win. It wins the operational and cross-model rows, matches DuckDB on time-series ingest, and loses every scan-, bulk- and search-bound row, which is the honest shape for a general engine measured against specialists. It does not win vector search. Every bar is a first timed pass after the index is built, on both sides, and at ten million vectors that is 8.87 ms for ArcadeDB against Qdrant's 1.34 and Chroma's 0.70. The dense bar divides by Qdrant rather than by Chroma, which the table shows is faster, because Chroma returns 93.4% of the true neighbours where ArcadeDB returns 95.1%: each row compares us against one specialist, chosen this way: of the engines that find at least as many of the true nearest neighbours as we do, the fastest. Comparing against a quicker engine that finds fewer would not be a fair race. The pass matters only for us: run the same query set again and ArcadeDB answers in 0.96 ms, because it pages its index off disk and the second pass finds it resident, while Qdrant moves to 1.31 and Chroma to 0.71. So the dense row shows both. The bar is the first pass and the diamond is the same comparison in steady state, a 1.4x win reached without any comparator getting faster. No other row can show both, because every other lane times a single pass. The cross-model row is measured against SurrealDB, which is the fastest engine here that also does the whole operation in one transaction, rather than against the composed stack, which is slower and has no transaction spanning its two engines at all. The rows use each engine's own idiom: tabular OLTP is SQL against PostgreSQL, the graph row is Cypher against LadybugDB, and TPC-H Q1 is SQL against DuckDB.",
            items: [
              { image: { src: "/images/projects/arcadedb/f4_one_vs_n.svg", alt: "ArcadeDB latency against the best specialist engine at each corpus size" } },
            ],
          },
        ],
      },
      {
        id: "choosing",
        navLabel: "Choosing",
        eyebrow: "Choosing",
        title: "Embedded or server: the deployment choice, and what it actually costs.",
        body: [
          "The tables above run the same engine version in both deployments, so the difference between them is deployment and not the engine. Running the database in a separate process costs something, and that cost is really two things added together: packing the answer into a format that can travel over a connection, and the connection itself. The table below separates them by measuring a third setup in between, an HTTP server running inside the same process. Embedded to that middle setup adds the packing without adding a second process. The middle setup to a separate container adds the second process without changing the packing.",
          {
            type: "benchmarkTable",
            tableId: "e4",
            caption: "The same projection answered three ways at six result sizes, which is what separates the wire format from the process boundary.",
          },
          "The two are nowhere near equal, which is the useful part. Packing the answer costs something at every size and grows with the result. The process boundary is so small that at the smaller sizes it disappears into the noise and measures slightly negative. So the cost of running client and server as separate processes on one machine is essentially the serialization, not the separation, and the lever that would actually move it is a cheaper wire format rather than co-location.",
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
