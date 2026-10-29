import type { Project } from "../types";
import { dbbenchFirstResults } from "../../dbbench/lanes";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl } from "../shared";

export const arcadeDb: Project = {
  slug: "arcadedb",
  title: "ArcadeDB",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "engine",
        navLabel: "Engine",
        eyebrow: "Engine",
        title: "One storage engine for documents, graphs, vectors, and time series.",
        body: [
          "ArcadeDB is a Java engine. It runs embedded inside a Java process or as a server behind HTTP, Bolt, Postgres, and Redis protocols, and almost everyone runs the server. HumemAI wraps the same engine for Python through JPype, so it also runs inside a Python process; that package is the Python section further down. It answers SQL, in its own dialect, and Cypher, so the two industry-standard query languages and the skills and tools around them carry over; the other single-stack multi-model engines each have a language of their own, SurrealQL, AQL, and MongoDB's query language. Upstream also lists key-value and full-text search among its models; this page does not cover them.",
          "Most databases that call themselves multi-model are several engines behind one API. ArcadeDB is not. Everything it stores sits on the same pages, goes through the same write-ahead log (WAL), and commits in the same transaction, so a write that touches a document, an edge, and a vector index is one ACID transaction (atomic, consistent, isolated, and durable) instead of three that have to be coordinated.",
          "The indexes work the same way. LSM trees (log-structured merge trees), full-text, geo, hash, and both dense and sparse vector indexes all commit in the same transaction as the records they index. Replication follows from that: Raft ships page changes from the shared log, so every model replicates without replication code per model.",
          "Vectors are the one exception. The vector records are transactional, logged, and replicated like everything else, but the nearest-neighbour graph used to search them is not: it is built in the background and can be rebuilt. The data is the source of truth and the search structure catches up to it. That is more than a standalone vector store offers, and less than a fully transactional index would be.",
        ],
      },
      {
        id: "benchmarks",
        navLabel: "Benchmarks",
        eyebrow: "Benchmarks",
        title: "Results are measured in DBBench.",
        body: [
          "The cross-engine benchmarks are their own project, [DBBench](/research/dbbench), so that they stay independent of any one engine. This page keeps to ArcadeDB itself.",
          dbbenchFirstResults,
        ],
      },
      {
        id: "licenses",
        navLabel: "Licenses",
        eyebrow: "Licenses",
        title: "What each engine's license allows.",
        body: [
          "Not every engine that DBBench measures is open source in the sense the Open Source Initiative (OSI) defines. ArcadeDB and the Python package are both Apache-2.0.",
          {
            type: "paperTable",
            caption: "What each engine's license allows.",
            columns: ["Engine", "License", "Any use, free", "Your code stays yours"],
            rows: [["ArcadeDB engine", "Apache-2.0", "**yes**", "**yes**"], ["arcadedb and arcadedb-jvm (the Python packages)", "Apache-2.0", "**yes**", "**yes**"], ["PostgreSQL and pgvector", "PostgreSQL License", "**yes**", "**yes**"], ["Apache AGE", "Apache-2.0", "**yes**", "**yes**"], ["DuckDB", "MIT", "**yes**", "**yes**"], ["SQLite", "public domain", "**yes**", "**yes**"], ["sqlite-vec", "Apache-2.0", "**yes**", "**yes**"], ["MongoDB Community", "SSPL-1.0", "no", "no"], ["Neo4j Community", "GPL-3.0 (Enterprise is commercial)", "yes", "no"], ["LadybugDB", "MIT", "**yes**", "**yes**"], ["Qdrant", "Apache-2.0", "**yes**", "**yes**"], ["Milvus", "Apache-2.0", "**yes**", "**yes**"], ["Elasticsearch", "AGPL-3.0 (also SSPL and ELv2)", "yes", "no"], ["Chroma", "Apache-2.0", "**yes**", "**yes**"], ["LanceDB", "Apache-2.0", "**yes**", "**yes**"], ["QuestDB", "Apache-2.0", "**yes**", "**yes**"], ["TimescaleDB", "Timescale License (the image used here); the core alone is Apache-2.0", "no", "no"], ["SurrealDB", "Business Source License 1.1", "no", "no"], ["ArangoDB", "Business Source License 1.1", "no", "no"]],
          },
          "Two tests, each answered from the license text at the pinned version in September 2026. Any use, free: anyone may run the engine for any purpose, including selling a product or a service built on it, without paying the vendor; the SSPL (MongoDB), the Business Source License (SurrealDB and ArangoDB), and the Timescale License (the TimescaleDB image used here; its core alone is Apache-2.0) all reserve some uses. Your code stays yours: you may modify the engine and ship or serve a product on it without publishing your own code; the GPL (Neo4j Community) and the AGPL (Elasticsearch, whose core is offered under a choice of three licenses since 2024 and whose sparse-vector search is in that core) require sharing what you distribute or serve. Rows in bold pass both tests. Both tests are yes for permissive licenses (Apache-2.0, MIT, the PostgreSQL License) and the public domain, yes and no for copyleft, and no for source-available. The Open Source Initiative approves every license in the first two groups and none in the third. A license can change with a release.",
          "Four of those engines are single-stack multi-model databases, one process serving documents, graph, and vectors: ArcadeDB, ArangoDB, MongoDB, and SurrealDB. Among them ArcadeDB is the only one that passes both tests above, Apache-2.0 since its first commit in 2021, and the only one whose engine and Python bindings ship together in monthly releases; MongoDB moved from the AGPL to the SSPL in 2018, ArangoDB from Apache-2.0 to the Business Source License in 2024, and SurrealDB has used the Business Source License since its public release. On staying that way, ArcadeDB's founder wrote in February 2026 that the project [will never change its license](https://arcadedb.com/blog/open-source-forever-why-arcadedb-will-never-change-its-license/); this page reports that as his published statement, not as a guarantee. HumemAI, which maintains the Python bindings (arcadedb and arcadedb-jvm), makes the same commitment for them: the engine and its bindings both stay Apache-2.0. PostgreSQL with pgvector and AGE reaches the same one-transaction result by loading extensions into one process, and it is open source under both tests; it is not counted among the four because three projects maintain its three models.",
        ],
      },
    ],
  },
  summary:
    "ArcadeDB keeps documents, graphs, vectors and time series in one engine, with one transaction across all four. Its benchmarks are in DBBench, with every setting public.",
  image: {
    src: "/images/projects/project-arcadedb.png",
    alt: "Illustration of a document, a triangle graph, vector arrows and a stepped time-series line in one frame around a rose circle at the center, standing for one engine that holds four kinds of data.",
  },
  problem:
    "Applications increasingly need structured queries, graph traversal, and vector search over the same data, and the usual answer is to run three systems and write glue between them. That glue has no transaction boundary, so a failure part-way through a multi-store write leaves the stores disagreeing, and there is no single place to ask a question that spans them. For Python work there is a second problem: the engines worth using are rarely installable as a package and runnable inside your process.",
  solution:
    "ArcadeDB puts every model on the same pages and the same write-ahead log, so a write spanning documents, edges, and vectors is one ACID transaction, and replication is correct for every model without per-model code. The Python package ships that same engine with a bundled Java runtime, so it installs with pip and runs inside your process, and can start a server from there when wire protocols or replication are needed.",
  impact:
    "The engine and the Python package are developed together. The cross-engine benchmarks, with recall reported next to latency and every comparator pinned by image digest, live in DBBench (/research/dbbench). Findings from the benchmarks are filed and contributed upstream, so the benchmarks improve the engine as well as measure it.",
  // The hero renders the first two as buttons, so those two have to represent
  // both halves of the work rather than sending everyone to the Python side.
  links: [
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "ArcadeDB in Python", href: "/research/arcadedb-python" },
    { label: "Python docs", href: arcadeDbDocsUrl },
  ],
};
