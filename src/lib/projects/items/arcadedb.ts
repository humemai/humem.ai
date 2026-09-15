import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl } from "../shared";

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
        title: "One storage engine for documents, graphs, vectors, and time series.",
        body: [
          "ArcadeDB is a Java engine. It runs embedded inside a Java process or as a server behind HTTP, Bolt, Postgres, and Redis protocols, and almost everyone runs the server. HumemAI wraps the same engine for Python through JPype, so it also runs inside a Python process; that package is the Python section further down. It answers SQL, in its own dialect, and Cypher, so the two industry-standard query languages and the skills and tools around them carry over; the other single-stack multi-model engines on this page each have a language of their own, SurrealQL, AQL, and MongoDB's query language. Every benchmark table on this page measures both deployments of the same build, which is what the Mode column means. Upstream also lists key-value and full-text search among its models; this page does not measure them.",
          "Most databases that call themselves multi-model are several engines behind one API. ArcadeDB is not. Everything it stores sits on the same pages, goes through the same write-ahead log (WAL), and commits in the same transaction, so a write that touches a document, an edge, and a vector index is one ACID transaction (atomic, consistent, isolated, and durable) instead of three that have to be coordinated.",
          "The indexes work the same way. LSM trees (log-structured merge trees), full-text, geo, hash, and both dense and sparse vector indexes all commit in the same transaction as the records they index. Replication follows from that: Raft ships page changes from the shared log, so every model replicates without replication code per model.",
          "Vectors are the one exception. The vector records are transactional, logged, and replicated like everything else, but the nearest-neighbour graph used to search them is not: it is built in the background and can be rebuilt. The data is the source of truth and the search structure catches up to it. That is more than a standalone vector store offers, and less than a fully transactional index would be.",
        ],
      },
      {
        id: "setup",
        navLabel: "Setup",
        eyebrow: "Benchmarks",
        title: "One machine, fixed limits, one job at a time.",
        body: [
          "Every number on this page was measured on one machine: an Intel Core i9-12900HK (14 cores, 6 performance and 8 efficient, 20 threads, 24 MiB L3), 64 GiB of memory, a Samsung 980 PRO 2 TB NVMe drive, Ubuntu 26.04 with Docker. Each run is pinned to the twelve hardware threads of the six performance cores (`cpuset` 0-11) and to a memory cap that depends on the size: 8 GiB up to 100k documents, 16 GiB at 1M, 32 GiB at 20M rows, 36 GiB at ten million vectors, with a JVM (Java virtual machine) heap of half the cap for the Java engines, except at ten million vectors, where every Java engine runs 24 of the 36 GiB because the vector build fills it. One job runs at a time; a served engine and its client share the same cap. Every comparator is pinned by image digest, and the build measured is listed under each table.",
          "The method behind these numbers is documented in full at [docs.humem.ai/arcadedb](https://docs.humem.ai/arcadedb/benchmarks/), which covers the protocol, the answer checking that compares every engine's result rather than only its speed, how to run a lane yourself, and how this page is generated and gated. The conditions below hold for every table on this page. A table adds its own beneath its caption where they differ. Latency columns are p50 and p99, the median and the 99th percentile of the query times, in milliseconds.",
          { type: "benchmarkConditions" },
        ],
      },
      {
        id: "documents",
        navLabel: "Documents",
        eyebrow: "Benchmarks",
        title: "Document OLTP and OLAP on TPC.",
        body: [
          "Most people arrive with tables. ArcadeDB stores them as documents and answers the same SQL, so documents come first. Every engine below answers the same questions in its own language: SQL where it has one, MongoDB's aggregation pipeline, SurrealQL for SurrealDB. The benchmarks are TPC-C and TPC-H, the long-standing transaction and analytics benchmarks. TPC-C is OLTP, online transaction processing: many small reads and writes. TPC-H is OLAP, online analytical processing: a few large scanning queries. Both run at SF1, where SF is the scale factor, the size of the generated data set.",
          {
            type: "benchmarkTable",
            tableId: "docs_oltp",
            caption: "TPC-C's new-order transaction (read a part, insert an order line, update stock) on the TPC-H tables, against DuckDB and PostgreSQL. PostgreSQL appears twice, at its image defaults and tuned with its buffer and work memory fitted to the container.",
          },
          {
            type: "benchmarkTable",
            tableId: "docs_olap",
            caption: "TPC-H Q1 (scan every line item, group, and sum) and Q6 (filter a date range, sum one column) on the same documents. This is the workload ArcadeDB loses by the widest margin on the page.",
          },
        ],
      },
      {
        id: "graph",
        navLabel: "Graph",
        eyebrow: "Benchmarks",
        title: "Graph OLTP and OLAP on LDBC.",
        body: [
          "Graph is what most people use ArcadeDB for. The benchmark is LDBC-SNB, the Linked Data Benchmark Council's Social Network Benchmark, a synthetic social network at two scale factors, SF1 and SF10. ArcadeDB, Neo4j, and LadybugDB answer the queries in Cypher, the most common graph query language; SurrealDB answers the same queries in SurrealQL. Neo4j is the most widely used graph database, so it is the comparator. LadybugDB is here because it is embedded and columnar, the closest comparator to running ArcadeDB inside your own process.",
          "ArcadeDB embedded answers all four queries faster than Neo4j at both sizes. That is the strongest head-to-head result on this page.",
          {
            type: "benchmarkTable",
            tableId: "l2",
            caption: "Graph OLTP against Neo4j and LadybugDB on LDBC-SNB. Point is a single vertex lookup, 1-hop and 2-hop walk that many edges out from a starting person, and write inserts one edge.",
          },
          "Graph OLAP, queries over the whole graph, is a different job from single traversals, and ArcadeDB has a separate mechanism for it. A Graph Analytical View (GAV) is an in-memory copy of the graph, built once, that the planner uses for queries touching most of the vertices. It is optional, so the table below carries the same engine twice, with the view and without it, and the cost of building the view is measured rather than assumed.",
          {
            type: "benchmarkTable",
            tableId: "l2olap",
            caption: "At SF10 the view is worth 6.9x on top degree and about 2.6x on the other two, which is enough to move ArcadeDB from behind Neo4j to ahead of it on all three. LadybugDB wins all three regardless, because it stores the graph in columns, the same reason DuckDB wins the analytical queries above.",
          },
        ],
      },
      {
        id: "vectors",
        navLabel: "Vectors",
        eyebrow: "Benchmarks",
        title: "Vector search, dense and sparse.",
        body: [
          "Vector search is the newest of these models and the one with the most comparators, so it gets the most detail: three corpora, two kinds of vector, and recall reported beside every latency. It is also a workload ArcadeDB does not win, and the tables show that. Every engine on the dense table today indexes with HNSW (Hierarchical Navigable Small World), a graph of near neighbours that a query walks; an engine with a different index says so in the table's notes. Every corpus below is real and published, not generated, which matters most for sparse search.",
          "A SPLADE (Sparse Lexical And Expansion model) vector stores one weight per word in the vocabulary, and nearly every weight is zero, so a search only has to look at the few words a query uses. Those words cost very different amounts. A common word has to be checked against a huge number of documents; a rare one against almost none.",
          "Real writing has a few words that appear everywhere and a long tail that appear almost nowhere, so some queries are far more expensive than others. Generated data spreads words out evenly, which removes the expensive case and makes any approximate index look better than it is. Dense search uses published image descriptors for the same reason.",
          "| Corpus | Vectors | Dimensions | Used for |\n| --- | --- | --- | --- |\n| SPLADE over MS MARCO | 100k, 1M, 8.84M | 30,109 | every sparse row |\n| SIFT | 1M | 128 | the smaller dense size |\n| DEEP | 9.99M | 96 | the ten-million dense size |",
          "MS MARCO is a public search-relevance corpus, and the sparse vectors come from Big-ANN, a benchmark challenge for approximate nearest-neighbour search. SIFT and DEEP are standard image-descriptor sets.",
          "Two of those sizes are ceilings, not choices. 8.84 million is the entire Big-ANN sparse base set, so no larger sparse size exists, and DEEP's 9.99 million is the ten-million slice that ships with exact ground truth. The dense corpora are also narrow beside a modern text embedding, which runs 768 to 3072 numbers wide against SIFT's 128 and DEEP's 96. That width is fixed by how the descriptors were produced, and these sets are used anyway because they publish exact nearest neighbours at ten million vectors, which is what makes recall comparable across engines. It does mean the dense rows describe index behaviour at 96 and 128 dimensions, and a 1536-dimension embedding is a different question.",
          "The index settings are matched rather than left to each vendor's defaults. Dense search builds HNSW at `ef_construction` 100 and queries at `ef_search` 100 everywhere, with a graph degree of 16 neighbours per node. ArcadeDB spells that `maxConnections` 32, because its bound is per layer while hnswlib-style engines double theirs at the base layer, so matching the number instead of the degree would have given ArcadeDB twice the graph. Sparse search has no equivalent setting, so every engine runs its own defaults there and each table states what precision the index stores. Every query asks for the top 10, and recall@10 is the share of those 10 that are true nearest neighbours; the 10 is the k in recall@k.",
          "Recall is reported next to every latency. A vector benchmark without a quality number is not a comparison, since any engine can be made faster by searching less thoroughly, and the engines here sit at different points on that trade.",
          "Every engine in every table below runs under the same limits, one at a time on one machine, and each cell is the median of five repetitions. The exact build measured sits under each table. Two words recur: cold is the first timed pass after the index is built, and warm is a second pass over the same queries.",
          "Every engine gets a settle step before any query is timed, the one-off operation that leaves it answering from a finished index rather than a half-built one: Elasticsearch refreshes and force-merges to a single segment, Milvus flushes and loads, Qdrant waits until the collection reports green, and ArcadeDB compacts its LSM segments.",
          "Each comparator's sparse precision is read from its own documentation and source at the version measured. Qdrant and Milvus keep sparse weights at full 32-bit precision. Elasticsearch keeps about 9 significant bits, which its documentation puts at roughly 0.4% relative error, the lossiest of the engines here. ArcadeDB stores int8 posting weights by default and can store fp32; both are measured.",
          {
            type: "benchmarkTable",
            tableId: "l3s",
            caption:
              "Sparse search on real SPLADE vectors against Elasticsearch, Milvus, and Qdrant. ArcadeDB appears four times, in both deployments and at both precisions: int8 posting weights are its default and fp32 is the ablation.",
          },
          "Warm is the same pair measured again on a separate one-build run. The largest gain by any engine is 1.15x at a million and 1.83x at 8.84 million, and at the larger size no engine gains more than 83%, and that gain is pgvector's. Compare the dense table below, where ArcadeDB alone gains about 8x on a second pass: that comes from how the two index structures reach their data, not from how the runs were made.",
          {
            type: "benchmarkTable",
            tableId: "l3d",
            caption: "Dense search at two sizes, with both deployments of ArcadeDB: one build, then five passes, cold the first and warm the rest. Read latency against recall: Chroma is the fastest engine at both sizes and also returns the fewest true neighbours, so the summary figure below compares ArcadeDB against Qdrant, the fastest engine whose recall is at least ArcadeDB's.",
          },
        ],
      },
      {
        id: "timeseries",
        navLabel: "Time series",
        eyebrow: "Benchmarks",
        title: "Time series on TSBS.",
        body: [
          "Time series on TSBS, the Time Series Benchmark Suite: ingest, the newest reading of one host, and a twelve-hour aggregate across all hosts.",
          {
            type: "benchmarkTable",
            tableId: "l4",
            caption: "Time series against QuestDB and DuckDB on TSBS. ArcadeDB appears twice per deployment because it has two ways to store this data: the native `TIMESERIES` type keeps the points of one series together in time order, and the document path stores each reading as an ordinary document, which is what you get if you do not know the native type exists. The gap between them is what the native type is worth: 46 times the ingest rate and a twelve-hour aggregate 68 times faster, against a slightly slower lookup of the newest reading.",
          },
        ],
      },
      {
        id: "crossmodel",
        navLabel: "Cross-model",
        eyebrow: "Benchmarks",
        title: "One transaction across a vector, a graph edge, and a document.",
        body: [
          "One operation touches three models: a vector search finds a record, a graph hop expands it, and a document update records the result. ArcadeDB does that in one transaction, and so do the other single engines on the table: SurrealDB, embedded and served, Neo4j with its vector index, and PostgreSQL + pgvector + AGE. The comparator is a composed stack, Qdrant for the vectors and Neo4j for the graph, and against it the number that matters is not the latency but what a failure part-way through leaves behind.",
          "One operation writes both stores in turn: the graph database takes the update first, and the vector store gets its copy second. We raise an error in the gap between the two, a gap that exists in any design where two systems acknowledge separately. The composed stack is left half-updated. The graph database has kept a write the vector store never received, the two disagree about the same records from then on, and neither knows anything is wrong.",
          "That damage stays. Nothing goes back to look for it, so the only records that recover are the ones a later write happens to touch. The corruption is partial and silent: you cannot find it by spot-checking a few records. One engine wrapping the same work in one transaction undoes all of it, leaving the counters where the completed operations left them.",
          "We interrupted 200 trials against each system. The composed stack was left half-updated in all 200. Every single engine on the table, each wrapping the work in one transaction, was left half-updated in none. The count matters: with five trials and no failures you cannot rule out a failure rate near one in two, and two hundred puts it under two in a hundred. Before each interruption the two stores are checked and agree exactly, which is what makes a disagreement afterwards mean something.",
          "This is not a criticism of Qdrant or Neo4j. Both do what they are asked, correctly, every time. The gap is between them, and it belongs to any design in which two systems acknowledge separately; the single engines on the table close it by holding all three models under one transaction. Nor does it mean two stores cannot be made to work: a team would add machinery to repair the divergence afterwards, replaying the missing write until both sides agree. The experiment measures what that machinery buys you, because one engine with one transaction does not need it.",
          {
            type: "benchmarkTable",
            tableId: "e2",
            caption: "The cross-model operation: a vector hit expands over graph edges and updates a document. ArcadeDB, SurrealDB, Neo4j, and PostgreSQL + pgvector + AGE each do it in one transaction; the composed stack has no transaction spanning its two engines.",
          },
          {
            type: "benchmarkTable",
            tableId: "e2atom",
            caption: "The same operation interrupted mid-way, 40 trials per run over five runs. The composed stack is left torn in 40 of 40 trials; every single engine, ArcadeDB embedded and server, SurrealDB embedded and server, Neo4j with its vector index, and PostgreSQL + pgvector + AGE, in 0 of 40, because the whole operation is one transaction that commits or does not.",
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
        ],
      },
      {
        id: "summary",
        navLabel: "Summary",
        eyebrow: "Benchmarks",
        title: "Every metric on this page in one figure.",
        body: [
          "Every metric above appears here as a ratio against the strongest comparator on that row, first pass and repeat pass side by side. Rows follow this page: documents, graph, vectors, time series, and the cross-model transaction, each table in the order shown above and its columns in order, ingest included.",
          "A row marked first pass only has no bar on the right because it is measured once: ingest, writes, transactions, and the 100k sparse tier have no repeat over a warm index, which is defined only for reads. A row marked comparator below resolution has a comparator latency recorded to too few decimals for a ratio.",
          "Each row picks its comparator on the first pass, the fastest engine or the highest throughput, and on the vector rows the fastest engine whose recall is at least ArcadeDB's; the same engine is then read on the repeat pass. At ten million vectors that is 8.75 ms for ArcadeDB against Qdrant's 1.26 and Chroma's 0.70. The dense bar divides by Qdrant rather than Chroma, which the table shows is faster, because Chroma returns 93.4% of the true neighbours where ArcadeDB returns 95.3%.",
          "The repeat pass matters most for ArcadeDB: run the same queries again and ArcadeDB answers in 1.04 ms, because it pages its index off disk and the second pass finds it resident, while Qdrant moves to 1.25 and Chroma to 0.72. So the dense rows flip between the panels, a 1.2x win, with the comparators where they were. The graph rows move too, in both directions, because Neo4j and LadybugDB gain on a repeat pass as well.",
          "On the first pass ArcadeDB wins the OLTP, write, and cross-model rows, matches DuckDB on time-series ingest, and loses every scan-, bulk-, and search-bound row, vector search included. The cross-model row is measured against SurrealDB embedded, the fastest of the single engines here that also do the whole operation in one transaction, rather than the composed stack, which is slower and has no transaction spanning its two engines. Each row uses the comparator's own language: document OLTP is SQL against PostgreSQL, the graph rows are Cypher against LadybugDB or Neo4j, and TPC-H is SQL against DuckDB.",
          {
            type: "figureGrid",
            // One per row at every width, like every other figure here. These
            // are 3.45in figures with 8pt type: at two-up on a tablet each
            // lands near its native 246pt and the axis labels are at their
            // print size on a screen, which is too small to read.
            columns: 1,
            caption:
              "ArcadeDB embedded against the best comparator on every metric, log scale, with anything right of the line a win. The left panel is the first timed pass after the index is built, and the right panel is the same pair measured again.",
            items: [
              { image: { src: "/images/projects/arcadedb/f4_one_vs_n.svg", alt: "ArcadeDB latency against the best specialist engine at each corpus size" } },
            ],
          },
        ],
      },
      {
        id: "embedded",
        navLabel: "Python",
        eyebrow: "Embedded",
        title: "The engine as a Python package.",
        body: [
          "ArcadeDB is a Java engine, and that is friction for Python work: a separate runtime to install, a service to start, and a network hop between your code and your data. The Python package removes all three. It ships the upstream engine unmodified, with a bundled Java runtime and platform wheels, so `uv add arcadedb-embedded` or `pip install arcadedb-embedded` is the whole setup and the database runs inside your process.",
          "It is a full API, not a launcher. Transactions and lifecycle, schema and graph helpers, bulk ingest, import and export, and the vector features are all exposed and tested, with the example suite run in CI on every change.",
          "The engine and the Python package are maintained together. Fixes and features found through the benchmarks above are filed and, where possible, contributed upstream. Both are Apache-2.0, and both maintainers, Arcade Data for the engine and HumemAI for this package, have said they will keep it that way.",
          "What does the Python boundary cost? The engine runs at the same speed either way; what you pay for is handing results back. Against Java in the same process doing the same work, a vector search costs 1.04x and a 100k-document scan 1.75x.",
          "The bigger number is inside Python. Asking for record objects is 15.1x slower than asking for columns over the same query, so which call you use, `to_list` or `to_columns`, matters more than the language boundary does. Check that before blaming the engine for a slow loop.",
          {
            type: "benchmarkTable",
            tableId: "pycost",
            caption: "The same query answered from Java and from Python, and the three ways Python can ask for the results: `to_columns`, `to_json_list`, and `to_list`.",
            showDigests: false,
          },
          "Starting the engine is the other cost, and it is paid once per process, not per query. A cold process reaches its first database call in about 0.45 s, most of it the Java runtime starting; after that, opening and closing an empty database costs about 4.4 ms. The table below is one session each, open, do one thing, close, for every kind of data at four sizes, embedded and against the server.",
          {
            type: "benchmarkTable",
            tableId: "lifecycle",
            caption: "Session cost by kind of data and size, embedded and against the server. The dense-vector rows at 1M and 10M show an engine defect, the first query after a write waited on a full index rebuild; it is filed as #7183, fixed upstream for 26.10.1, and a later campaign re-measures it.",
            showDigests: false,
          },
          "Embedded or server is the deployment choice, and the tables above run the same engine build in both, so the difference between them is the deployment and not the engine. SurrealDB also has both modes, and its two rows above sit far apart: its Python package embeds a core a major version behind its server, on a different storage engine, so the embedded row wins only the point lookups the wire would have cost and loses or times out on every bulk cell. ArcadeDB's engine and Python package are released together from the same build, so that gap does not exist here.",
          "Running the database in a separate process costs two things added together: turning the answer into a wire format that can travel over a connection, and the connection itself. The table below separates them by measuring a third deployment in between, an HTTP server running inside the same process. Embedded to that middle deployment adds the wire format without a second process. The middle deployment to a separate container adds the second process without changing the wire format.",
          {
            type: "benchmarkTable",
            tableId: "e4",
            caption: "The same projection answered by three deployments at six result sizes. The first column to the second is the wire format; the second to the third is the process boundary.",
          },
          "The two are nowhere near equal. The wire format costs something at every size and grows with the result. The process boundary, the second column against the third, is so small that at the smaller sizes it disappears into the noise. So the cost of running client and server as separate processes on one machine is the wire format, not the separation, and the lever that would move it is a cheaper wire format, not co-location.",
          {
            type: "figureGrid",
            columns: 1,
            caption: "What the server deployment costs relative to embedded, by result size.",
            items: [
              { image: { src: "/images/projects/arcadedb/f8_deployment.svg", alt: "Server deployment cost relative to embedded, by result size" } },
            ],
          },
          "Use embedded when the database serves one process: notebooks, tests, single-node services, agent tooling, and anything where a network hop per query is pure cost. It installs with `pip install`, starts in under half a second, and has no service to operate.",
          "Use the server when more than one process or machine needs the same data, when you want the Postgres, Redis, Bolt, or HTTP wire protocols, or when you need Raft replication and failover. The Python package can also start a server inside your process, so you can move from one to the other later.",
          "This is a deployment decision, not a performance one. The engine is the same in both, and the difference you will feel is the boundary you put around it.",
        ],
      },
      {
        id: "licenses",
        navLabel: "Licenses",
        eyebrow: "Licenses",
        title: "What each engine's license allows.",
        body: [
          "Not every engine on this page is open source in the sense the Open Source Initiative (OSI) defines. ArcadeDB and the Python package are both Apache-2.0.",
          "| Engine | License | Any use, free | Your code stays yours |\n| --- | --- | --- | --- |\n| ArcadeDB engine | Apache-2.0 | **yes** | **yes** |\n| arcadedb-embedded (the Python package) | Apache-2.0 | **yes** | **yes** |\n| PostgreSQL and pgvector | PostgreSQL License | **yes** | **yes** |\n| Apache AGE | Apache-2.0 | **yes** | **yes** |\n| DuckDB | MIT | **yes** | **yes** |\n| SQLite | public domain | **yes** | **yes** |\n| sqlite-vec | Apache-2.0 | **yes** | **yes** |\n| MongoDB Community | SSPL-1.0 | no | no |\n| Neo4j Community | GPL-3.0 (Enterprise is commercial) | yes | no |\n| LadybugDB | MIT | **yes** | **yes** |\n| Qdrant | Apache-2.0 | **yes** | **yes** |\n| Milvus | Apache-2.0 | **yes** | **yes** |\n| Elasticsearch | AGPL-3.0 (also SSPL and ELv2) | yes | no |\n| Chroma | Apache-2.0 | **yes** | **yes** |\n| LanceDB | Apache-2.0 | **yes** | **yes** |\n| QuestDB | Apache-2.0 | **yes** | **yes** |\n| TimescaleDB | Timescale License (the image used here); the core alone is Apache-2.0 | no | no |\n| SurrealDB | Business Source License 1.1 | no | no |\n| ArangoDB | Business Source License 1.1 | no | no |",
          "Two tests, each answered from the license text at the pinned version in September 2026. Any use, free: anyone may run the engine for any purpose, including selling a product or a service built on it, without paying the vendor; the SSPL (MongoDB), the Business Source License (SurrealDB and ArangoDB), and the Timescale License (the TimescaleDB image used here; its core alone is Apache-2.0) all reserve some uses. Your code stays yours: you may modify the engine and ship or serve a product on it without publishing your own code; the GPL (Neo4j Community) and the AGPL (Elasticsearch, whose core is offered under a choice of three licenses since 2024 and whose sparse-vector search measured here is in that core) require sharing what you distribute or serve. Rows in bold pass both tests. Both tests are yes for permissive licenses (Apache-2.0, MIT, the PostgreSQL License) and the public domain, yes and no for copyleft, and no for source-available. The Open Source Initiative approves every license in the first two groups and none in the third. A license can change with a release.",
          "Four engines on this page are single-stack multi-model databases, one process serving documents, graph, and vectors: ArcadeDB, ArangoDB, MongoDB, and SurrealDB. Among them ArcadeDB is the only one that passes both tests above, Apache-2.0 since its first commit in 2021, and the only one whose engine and Python bindings ship together in monthly releases; MongoDB moved from the AGPL to the SSPL in 2018, ArangoDB from Apache-2.0 to the Business Source License in 2024, and SurrealDB has used the Business Source License since its public release. On staying that way, ArcadeDB's founder wrote in February 2026 that the project [will never change its license](https://arcadedb.com/blog/open-source-forever-why-arcadedb-will-never-change-its-license/); this page reports that as his published statement, not as a guarantee. HumemAI, which maintains arcadedb-embedded, makes the same commitment for the Python package: the engine and its bindings both stay Apache-2.0. PostgreSQL with pgvector and AGE reaches the same one-transaction result by loading extensions into one process, and it is open source under both tests; it is not counted among the four because three projects maintain its three models.",
        ],
      },
    ],
  },
  summary:
    "A multi-model database engine that keeps documents, graphs, vectors, and time series in one transactional engine, plus the Python package that runs that engine inside your process, benchmarked against the comparators in each category.",
  image: {
    src: "/images/projects/project-arcadedb-embedded-python.png",
    alt: "Illustration for ArcadeDB",
  },
  problem:
    "Applications increasingly need structured queries, graph traversal, and vector search over the same data, and the usual answer is to run three systems and write glue between them. That glue has no transaction boundary, so a failure part-way through a multi-store write leaves the stores disagreeing, and there is no single place to ask a question that spans them. For Python work there is a second problem: the engines worth using are rarely installable as a package and runnable inside your process.",
  solution:
    "ArcadeDB puts every model on the same pages and the same write-ahead log, so a write spanning documents, edges, and vectors is one ACID transaction, and replication is correct for every model without per-model code. The Python package ships that same engine with a bundled Java runtime, so it installs with pip and runs inside your process, and can start a server from there when wire protocols or replication are needed.",
  impact:
    "The engine and the Python package are developed together and measured against the comparators in each category, on real corpora rather than synthetic ones, with recall reported next to latency and every comparator pinned by image digest. Findings from the benchmarks are filed and contributed upstream, so the benchmarks improve the engine as well as measure it.",
  // The hero renders the first two as buttons, so those two have to represent
  // both halves of the work rather than sending everyone to the Python side.
  links: [
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "Python docs", href: arcadeDbDocsUrl },
  ],
};
