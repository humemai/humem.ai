import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl } from "../shared";

// The paper about the Python package. The page of the engine is arcadedb.ts and the benchmarks are dbbench.ts; how to run
// it is arcadedb-software.ts.
export const arcadeDbPython: Project = {
  slug: "arcadedb-python",
  venue: "SciPy 2026",
  title: "ArcadeDB in Python",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Paper, code, and project links.",
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        eyebrow: "Overview",
        title: "One embedded database for documents, a graph and vectors.",
        body: [
          "Some Python work needs transactional reads and writes over documents, traversals over a graph, and similarity search over vectors. The usual answer is a stack of specialists, such as SQLite or DuckDB for documents, NetworkX or LadybugDB for the graph, and FAISS, hnswlib or Chroma for vectors. Each one holds its own copy of the data, with its own consistency model, so every write has to reach all of them.",
          "The paper describes the alternative: ArcadeDB, one multi-model engine for documents, a property graph and vector indexes, running inside the Python process. Documents are queried in SQL, the graph in openCypher, and vectors through an HNSW-family graph index. Transactional and analytical queries run over the same data, and the engine is ACID.",
          "It has three contributions. The first is the package itself. The second is a hybrid workflow that chains vector search, SQL filtering and graph traversal over one dataset. The third is a benchmark against embedded specialists, with what the unified engine costs. [Read the paper in the SciPy Proceedings](https://proceedings.scipy.org/articles/fwvt2525).",
          "The paper measures the build with a bundled Java runtime, now published as `arcadedb-jvm`. The native build, `arcadedb`, needs no Java.",
        ],
      },
      {
        id: "method",
        navLabel: "Method",
        eyebrow: "Method",
        title: "Run the engine inside the interpreter, then chain all three models in one query.",
        body: [
          "The package starts an embedded JVM inside the Python process with JPype, using a Java runtime bundled in the wheel, so nobody installs Java. CPython and the JVM share one address space, so data moves without network calls or serialization between processes. Opening a database is a function call, and queries are method calls that return Python objects. The binding covers the JVM lifecycle, transactions, and interop with NumPy, pandas and Arrow.",
          "<img\nsrc=\"/images/papers/arcadedb-python/architecture.png\"\nalt=\"Architecture of the package: one Python process hosting a JVM that runs the ArcadeDB engine over one local database\"\nclass=\"editorial-image-compact\"\n/>\n\n*One Python process hosts the JVM that runs the engine over one local, file-backed database. Documents, the property graph and vector search are all reached through one `db` object.*",
          "The hybrid workflow answers one question over a Q&A corpus: find questions similar to a seed question, keep the well-scored ones, and return their best answers with the reputation of the people who wrote them. That is a vector search, then a SQL filter, then a Cypher traversal, all against one database, with identifiers passing straight from one step to the next. The first two steps can also be one statement, because `vectorNeighbors()` returns whole documents.",
          "<img\nsrc=\"/images/papers/arcadedb-python/hybrid_workflow.png\"\nalt=\"The hybrid retrieval workflow: a vector search, a SQL filter, and a graph traversal over one database\"\nclass=\"editorial-image-compact\"\n/>\n\n*A seed question's embedding drives a vector search, the resulting ids flow into a SQL filter, and the surviving ids flow into a graph traversal that reaches answers and their authors.*",
          "A capability matrix in the paper shows that no single Python-embeddable alternative expresses this whole composition.",
          {
            type: "paperTable",
            caption: "Which of the five data stores covers what. ✓ native, ~ partial or through an official extension, ✗ absent.",
            columns: ["Capability", "SQLite", "DuckDB", "LadybugDB", "Chroma", "ArcadeDB"],
            rows: [["Documents", "✓", "✓", "~", "~", "✓"], ["Transactional SQL (OLTP)", "✓", "~", "✗", "✗", "✓"], ["Analytical SQL (OLAP)", "~", "✓", "✗", "✗", "~"], ["Property graph + traversal", "✗", "✗", "✓", "✗", "✓"], ["Cypher", "✗", "✗", "✓", "✗", "✓"], ["Graph approximate-nearest-neighbor index (HNSW family)", "✗", "~", "✓", "✓", "✓"], ["All three in one engine", "✗", "✗", "✗", "✗", "✓"]],
          },
        ],
      },
      {
        id: "results",
        navLabel: "Results",
        eyebrow: "Results",
        title: "Each specialist wins on its own model, and the one engine holds its own on all three.",
        body: [
          "The benchmark compares the package with SQLite and DuckDB for documents, LadybugDB for the graph, and Chroma for vectors. The data is the Cross Validated public data dump, a statistics and machine-learning Q&A corpus of about 426k posts, 346k users and 1.2M embeddings. Every measurement runs in its own Docker container with the same cores and memory for every engine, and is repeated 5 times in fresh containers. The tables report the median with the full range.",
          "Each specialist is faster on its own model: DuckDB by two orders of magnitude on analytical SQL, LadybugDB by an order of magnitude on graph analytics, SQLite on point reads and writes of documents, and Chroma on building and querying a vector index. The package holds its own while covering all three. It beats LadybugDB on transactional graph work, beats DuckDB on point reads, and matches Chroma's recall with less memory. The price of being a generalist is mainly memory and loading time.",
          {
            type: "paperTable",
            caption: "Documents on the Cross Validated corpus. OLTP in operations per second, OLAP in milliseconds, ingest in seconds, peak memory and database size in MiB. Median with the [min–max] range over 5 repetitions; the best value is in bold.",
            columns: ["Backend", "OLTP ops/s", "OLAP ms", "Ingest s", "Peak MiB", "DB MiB"],
            rows: [["SQLite", "**87,150** [59,138–88,591]", "292.8 [284.4–293.9]", "**0.33** [0.32–0.36]", "**299** [277–304]", "20.1"], ["DuckDB", "219 [199–226]", "**9.3** [9.3–9.6]", "0.38 [0.37–0.39]", "301 [296–308]", "**17.3**"], ["ArcadeDB", "6,416 [6,091–6,826]", "1,406.6 [1,382.1–1,432.4]", "17.52 [17.15–17.95]", "803 [763–846]", "38.5"]],
          },
          {
            type: "paperTable",
            caption: "Graph on the same corpus. OLTP in operations per second, OLAP in milliseconds, ingest in seconds, peak memory and database size in MiB. Median with the [min–max] range over 5 repetitions; the best value is in bold.",
            columns: ["Backend", "OLTP ops/s", "OLAP ms", "GAV build s", "Ingest s", "Peak MiB", "DB MiB"],
            rows: [["LadybugDB", "525 [467–532]", "**65.7** [64.9–66.9]", "n/a", "**0.63** [0.61–0.64]", "**684** [675–688]", "**41.4**"], ["ArcadeDB", "**3,212** [3,034–3,629]", "839.6 [794.7–875.1]", "1.49 [1.39–1.77]", "26.67 [26.21–26.92]", "11,037 [10,561–11,190]", "1,840.8"]],
          },
          {
            type: "paperTable",
            caption: "Vectors, 1.2M of them, at a matched index degree. Build is insert plus index time in seconds, Query is the mean latency per query in milliseconds, and recall@10 is against an exact ground truth. Median with the [min–max] range over 5 repetitions; the best value is in bold.",
            columns: ["Backend", "Build s", "Query ms", "recall@10", "Peak MiB", "DB MiB"],
            rows: [["Chroma", "**319.1** [315.7–320.6]", "**1.17** [1.15–1.17]", "0.972 [0.970–0.972]", "25,212 [25,173–27,002]", "**2,208**"], ["ArcadeDB", "546.1 [541.3–550.6]", "4.15 [3.86–4.17]", "**0.980** [0.978–0.981]", "**21,650** [19,680–21,791]", "2,856"]],
          },
          "On the transactional reads and the vector queries, ArcadeDB's median and p99 latencies beat DuckDB and LadybugDB and trail SQLite and Chroma. Its worst single operation is slower, 35 to 146 ms across the three models against 0.05 to 11 ms for the specialists. For most applications that rare slow request does not matter. It does if every request has a strict deadline.",
          {
            type: "paperTable",
            caption: "Latency in milliseconds of the read operations in the transactional workloads and of the vector queries: the median operation, the p99 tail, and the single worst operation, each the median over 5 repetitions. The best value per group is in bold.",
            columns: ["Operation, backend", "median", "p99", "max"],
            rows: [["document read, SQLite", "**0.004**", "**0.007**", "**0.05**"], ["document read, DuckDB", "0.92", "1.89", "2.9"], ["document read, ArcadeDB", "0.06", "0.17", "34.9"], ["graph point, LadybugDB", "0.41", "1.24", "1.8"], ["graph point, ArcadeDB", "**0.18**", "**0.74**", "**1.5**"], ["graph hop, LadybugDB", "1.44", "4.34", "**11.0**"], ["graph hop, ArcadeDB", "**0.21**", "**0.81**", "90.3"], ["vector query, Chroma", "**1.18**", "**1.36**", "**1.4**"], ["vector query, ArcadeDB", "3.86", "7.11", "145.9"]],
          },
          "The paper also measures how results cross into Python: row by row, as one JSON string per batch, as a packed columnar buffer read with NumPy, and as an Arrow table. At 100k rows, row by row is 18 times slower than Arrow, and the whole difference is on the Python side. At 10 rows every method finishes in under 2.1 ms.",
          {
            type: "paperTable",
            caption: "Result transport into Python for a 200k-row document type with four columns, in milliseconds. Median of 7 timed passes after 2 warmups. The engine runs the same query for every method.",
            columns: ["Rows", "iter_dicts()", "to_json_list()", "to_columns()", "to_arrow()"],
            rows: [["10", "2.04", "1.70", "0.82", "0.59"], ["100", "2.66", "1.10", "0.93", "0.79"], ["1,000", "20.12", "2.97", "2.28", "1.49"], ["10,000", "197.29", "25.87", "15.87", "14.20"], ["100,000", "1,978.27", "278.22", "135.51", "109.03"]],
          },
          "The numbers describe release 26.8.1.",
        ],
      },
      {
        id: "takeaways",
        navLabel: "Takeaways",
        eyebrow: "Takeaways",
        title: "When it fits.",
        body: [
          "It fits when an application needs two or more of documents, a graph and vector search over the same data, on one machine. Point reads and graph traversals answer in well under a millisecond, and vector queries in single-digit milliseconds at the same recall as a dedicated index, and everything is ACID.",
          "For a workload that lives entirely in one model, the specialist is the natural choice.",
        ],
      },
      {
        id: "citation",
        navLabel: "Cite",
        eyebrow: "Cite",
        title: "Cite our paper.",
        body: [
          "~~~bibtex\n@article{kim2026,\n  author = {Kim, Taewoon},\n  title = {ArcadeDB in Python: An In-Process Multi-Model Database},\n  journal = {Python in Science Conference},\n  year = {2026},\n  doi = {10.25080/fwvt2525},\n  url = {https://doi.org/10.25080/fwvt2525}\n}\n~~~",
          "The package is Apache-2.0. The benchmark suite and the results behind every table are public in [`benchmarks/python-bindings`](https://github.com/humemai/arcadedb-embedded-python/tree/6463877445125f745f317356f32fb6ba086ebe17/benchmarks/python-bindings) of the HumemAI repository.",
        ],
      },
    ],
  },
  summary:
    "One embedded database for documents, a graph and vectors, running inside the Python process. How it works, how it compares with the specialists, and what it costs.",
  image: {
    src: "/images/projects/project-arcadedb-python.png",
    alt: "Illustration of three stacked slabs with the middle one in rose, inside a larger outlined square, standing for a database running inside a process.",
  },
  problem: "",
  solution: "",
  links: [
    { label: "Read paper", href: "https://proceedings.scipy.org/articles/fwvt2525" },
    { label: "View GitHub", href: arcadeDbRepoUrl },
    { label: "Python docs", href: arcadeDbDocsUrl },
    { label: "ArcadeDB software page", href: "/software/arcadedb" },
    { label: "DBBench research page", href: "/research/dbbench" },
  ],
};
