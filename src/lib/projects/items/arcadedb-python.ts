import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl } from "../shared";

// The paper about the Python package. The page of the engine and its benchmarks is arcadedb.ts; how to run
// it is arcadedb-software.ts.
export const arcadeDbPython: Project = {
  slug: "arcadedb-python",
  date: "2026-10-07",
  title: "ArcadeDB in Python",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "paper",
        navLabel: "Paper",
        eyebrow: "Paper",
        title: "One database inside the Python process.",
        body: [
          "Some Python work needs transactional reads and writes over documents, traversals over a graph, and similarity search over vectors. The usual answer is a stack of specialists, such as SQLite or DuckDB for documents, NetworkX or LadybugDB for the graph, and FAISS, hnswlib or Chroma for vectors. Each one holds its own copy of the data, with its own consistency model, so every write has to reach all of them.",
          "The paper describes the alternative: ArcadeDB, one multi-model engine for documents, a property graph and vector indexes, running inside the Python process. Documents are queried in SQL, the graph in openCypher, and vectors through an HNSW-family graph index. Transactional and analytical queries run over the same data, and the engine is ACID.",
          "It has three contributions. The first is the package itself, `arcadedb-embedded`. The second is a hybrid workflow that chains vector search, SQL filtering and graph traversal over one dataset. The third is a benchmark against embedded specialists, with what the unified engine costs.",
        ],
      },
      {
        id: "architecture",
        navLabel: "Architecture",
        eyebrow: "Architecture",
        title: "The engine runs inside the interpreter.",
        body: [
          "`arcadedb-embedded` starts an embedded JVM inside the Python process with JPype, using a Java runtime bundled in the wheel, so nobody installs Java. CPython and the JVM share one address space, so data moves without network calls or serialization between processes. Opening a database is a function call, and queries are method calls that return Python objects.",
          "The binding covers the JVM lifecycle, transactions, and interop with NumPy, pandas and Arrow. Wheels exist for four platforms and five Python versions.",
          "~~~bash\nuv add arcadedb-embedded\n~~~",
        ],
      },
      {
        id: "hybrid",
        navLabel: "Hybrid workflow",
        eyebrow: "Hybrid workflow",
        title: "Vectors, then SQL, then the graph.",
        body: [
          "The paper answers one question over a Q&A corpus: find questions similar to a seed question, keep the well-scored ones, and return their best answers with the reputation of the people who wrote them. That is a vector search, then a SQL filter, then a Cypher traversal, all against one database, with identifiers passing straight from one step to the next.",
          "A capability matrix in the paper shows that no single Python-embeddable alternative expresses this whole composition. The first two steps can also be one statement, because `vectorNeighbors()` returns whole documents, so only the graph traversal needs a second call.",
        ],
      },
      {
        id: "benchmarks",
        navLabel: "Benchmarks",
        eyebrow: "Benchmarks",
        title: "Against the specialists, from Python.",
        body: [
          "The benchmark compares `arcadedb-embedded` with SQLite and DuckDB for documents, LadybugDB for the graph, and Chroma for vectors. The data is the Cross Validated public data dump, a statistics and machine-learning Q&A corpus of about 426k posts, 346k users and 1.2M embeddings. Every measurement runs in its own Docker container with the same cores and memory for every engine, and is repeated 5 times in fresh containers. The tables report the median with the full range.",
          "Each specialist is faster on its own model: DuckDB by two orders of magnitude on analytical SQL, LadybugDB by an order of magnitude on graph analytics, SQLite on point reads and writes of documents, and Chroma on building and querying a vector index. `arcadedb-embedded` holds its own while covering all three. It beats LadybugDB on transactional graph work, beats DuckDB on point reads, and matches Chroma's recall with less memory. The price of being a generalist is mainly memory and loading time.",
          "The paper also measures how results cross into Python: row by row, as one JSON string per batch, as a packed columnar buffer read with NumPy, and as an Arrow table. The numbers describe release 26.8.1.",
        ],
      },
      {
        id: "when",
        navLabel: "When to use it",
        eyebrow: "When to use it",
        title: "One process, more than one kind of data.",
        body: [
          "It fits when an application needs two or more of documents, a graph and vector search over the same data, on one machine, with one set of identifiers and one transaction scope. Point reads and graph traversals answer in well under a millisecond, and vector queries in single-digit milliseconds at the same recall as a dedicated index.",
          "For a workload that lives entirely in one model, the specialist is the natural choice.",
        ],
      },
      {
        id: "citation",
        navLabel: "Cite",
        eyebrow: "Cite",
        title: "Cite the paper.",
        body: [
          "~~~bibtex\n@misc{kim2026arcadedbpython,\n      title={ArcadeDB in Python: An In-Process Multi-Model Database},\n      author={Taewoon Kim},\n      year={2026},\n}\n~~~",
          "The package is Apache-2.0. The benchmark suite and the results behind every table are public in the repository.",
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
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "Python docs", href: arcadeDbDocsUrl },
    { label: "How to run ArcadeDB", href: "/software/arcadedb" },
    { label: "ArcadeDB benchmarks", href: "/research/arcadedb" },
  ],
};
