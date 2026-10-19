import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl } from "../shared";

// The SciPy 2026 paper about the Python package. The page of the engine and its benchmarks is arcadedb.ts; how to run
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
          "Some Python work needs transactional reads and writes over documents, traversals over a graph, and similarity search over vectors. The usual answer is three systems, with the data copied between them and kept consistent by application code.",
          "ArcadeDB is one engine that holds all three. This paper describes `arcadedb-embedded`, the Python package that runs it inside your process, and shows a retrieval workflow that chains vector search, SQL filtering and graph traversal over one dataset. It benchmarks the package against SQLite, DuckDB, LadybugDB and Chroma, and reports what it costs. The paper is accepted at SciPy 2026.",
        ],
      },
      {
        id: "embedded",
        navLabel: "Python",
        eyebrow: "Embedded",
        title: "What running it inside Python costs.",
        body: [
          "ArcadeDB is a Java engine, and that is friction for Python work: a separate runtime to install, a service to start, and a network hop between your code and your data. The Python package removes all three. It ships the upstream engine unmodified, with a bundled Java runtime and platform wheels, so `uv add arcadedb-embedded` is the whole setup and the database runs inside your process.",
          "It is a full API, not a launcher. Transactions and lifecycle, schema and graph helpers, bulk ingest, import and export, and the vector features are all exposed and tested, with the example suite run in CI on every change.",
          "How to install it and use it is on the [ArcadeDB software page](/software/arcadedb) page. The engine and the Python package are maintained together. Fixes and features found through the benchmarks above are filed and, where possible, contributed upstream. Both are Apache-2.0, and both maintainers, Arcade Data for the engine and HumemAI for this package, have said they will keep it that way.",
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
          "Use embedded when the database serves one process: notebooks, tests, single-node services, agent tooling, and anything where a network hop per query is pure cost. It installs with `uv add`, starts in under half a second, and has no service to operate.",
          "Use the server when more than one process or machine needs the same data, when you want the Postgres, Redis, Bolt, or HTTP wire protocols, or when you need Raft replication and failover. The Python package can also start a server inside your process, so you can move from one to the other later.",
          "This is a deployment decision, not a performance one. The engine is the same in both, and the difference you will feel is the boundary you put around it.",
        ],
      },
      {
        id: "citation",
        navLabel: "Cite",
        eyebrow: "Cite",
        title: "Cite the paper.",
        body: [
          "The paper is accepted at SciPy 2026 and will appear in its proceedings.",
          `~~~bibtex
@inproceedings{kim2026arcadedbpython,
      title={ArcadeDB in Python: An In-Process Multi-Model Database},
      author={Taewoon Kim},
      booktitle={Proceedings of the Python in Science Conference (SciPy 2026)},
      year={2026},
      note={To appear},
}
~~~`,
        ],
      },
    ],
  },
  summary:
    "A SciPy 2026 paper on running ArcadeDB inside the Python process: documents, a graph and vectors in one embedded database, with what it costs.",
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
