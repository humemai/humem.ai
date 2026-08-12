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
          "Most databases that call themselves multi-model are several engines behind one API. ArcadeDB is not. Everything it stores sits on the same pages, goes through the same write-ahead log, and commits in the same transaction, so a write that touches a document, an edge and a vector index is one ACID transaction instead of three that have to be coordinated.",
          "The indexes work the same way. LSM trees, full-text, geo, hash, and both dense and sparse vector indexes are all commit in the same transaction as the records they index. Replication comes along for the ride: Raft ships page changes from that shared log, so every model replicates correctly without anyone writing replication code per model.",
          "One caveat, because a careful reader will check it. The vector records themselves are transactional, logged and replicated, but the nearest-neighbour graph used to search them is built in the background and can be rebuilt. So the data is the source of truth and the search structure catches up. That is still more than a standalone vector store gives you, and it is not the same as a fully transactional index.",
        ],
      },
      {
        id: "embedded",
        navLabel: "Embedded",
        eyebrow: "Embedded",
        title: "The same engine, installed as a Python package and run inside your process.",
        body: [
          "ArcadeDB is a Java engine, and that is friction for Python work: a separate runtime to install, a service to start, and a network hop between your code and your data. The embedded distribution removes all three. It ships the upstream engine unmodified, with a bundled runtime and platform wheels, so `pip install` is the entire setup and the database runs in your process.",
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
          "Against the other engines you would embed in a Python process, on the same corpus and in the same process, the picture is mixed on purpose. Each specialist wins where it is specialized.",
          {
            type: "benchmarkTable",
            tableId: "pyb_tabular",
            caption: "Tabular work against SQLite and DuckDB.",
            showDigests: false,
          },
          {
            type: "benchmarkTable",
            tableId: "pyb_graph",
            caption: "Graph traversal and analytics against LadybugDB.",
            showDigests: false,
          },
          {
            type: "benchmarkTable",
            tableId: "pyb_vector",
            caption: "Vector search against Chroma, at matched graph degree.",
            showDigests: false,
          },
          "The point of those three tables is not that one engine wins every column, because it does not. It is that they are the same process, the same file and the same transaction. The alternative to the middle column is not a faster database, it is three databases and the code that keeps them agreeing.",
        ],
      },
      {
        id: "vectors",
        navLabel: "Vectors",
        eyebrow: "Benchmarks",
        title: "Vector search, measured against the engines built only for vector search.",
        body: [
          "The sharpest test of a multi-model engine is whether its vector search survives contact with systems that do nothing else. These runs use real SPLADE vectors over MS MARCO for the sparse case and real image descriptors for the dense case, not synthetic vectors, because synthetic distributions are unrepresentatively kind to approximate indexes.",
          "Recall is reported next to every latency. A vector benchmark without a quality number is not a comparison, since any engine can be made faster by searching less thoroughly, and the engines here sit at genuinely different points on that trade.",
          {
            type: "figureGrid",
            // One per row at every width, like every other figure here. These
            // are 3.45in paper figures with 8pt type: at two-up on a tablet
            // each lands near its native 246pt and the axis labels are at
            // their print size on a screen, which is too small to read.
            columns: 1,
            caption:
              "ArcadeDB against the best specialist at each corpus size on a log scale, and below it, how sparse search scales as the corpus grows.",
            items: [
              { image: { src: "/images/projects/arcadedb/f4_one_vs_n.svg", alt: "ArcadeDB latency against the best specialist engine at each corpus size" } },
              { image: { src: "/images/projects/arcadedb/f5_sparse_scaling.svg", alt: "Sparse vector search latency as the corpus grows" } },
            ],
          },
          {
            type: "benchmarkTable",
            tableId: "l3s",
            caption:
              "Sparse retrieval on real SPLADE vectors. ArcadeDB appears several times because quantization and the settle step are ablated separately.",
          },
          {
            type: "benchmarkTable",
            tableId: "l3d",
            caption: "Dense retrieval, including the embedded and server deployments of the same engine.",
          },
        ],
      },
      {
        id: "models",
        navLabel: "Other models",
        eyebrow: "Benchmarks",
        title: "Graph, tabular, and the transaction that spans both plus vectors.",
        body: [
          "The same harness runs graph traversal on LDBC-SNB, tabular work in both OLTP and OLAP shapes, and a cross-model transaction that starts from a vector hit, traverses the graph, and updates a document.",
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
          {
            type: "benchmarkTable",
            tableId: "e2",
            caption:
              "One transaction across vector, graph and document, against a composed stack that cannot make it one transaction.",
          },
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
          {
            type: "benchmarkTable",
            tableId: "e4",
            caption:
              "One engine, one workload, three deployments. The last two columns are the differences between the first three.",
            showDigests: false,
          },
          "Use the embedded distribution when the database serves one process: notebooks, tests, single-node services, agent tooling, and anything where a network hop per query is pure cost. It installs with pip, starts in milliseconds, and has no service to operate.",
          "Use the server when more than one process or machine needs the same data, when you want the Postgres, Redis, Bolt or HTTP wire protocols, or when you need Raft replication and failover. The embedded package can also start a server in-process, so this is not a one-way door.",
          "The honest summary is that this is a deployment decision and not a performance one. The engine is the same in both, and the difference you will feel is the boundary you put around it.",
        ],
      },
      {
        id: "reproducing",
        navLabel: "Reproducing",
        eyebrow: "Reproducing",
        title: "Every number here is generated, not typed.",
        body: [
          "The tables on this page are rendered from a JSON file exported by the benchmark suite, so they change when the measurements change and a stale number cannot survive in the prose. The suite, the runner and the frozen result rows are all in the repository.",
          "The protocol is deliberately boring. Every engine runs in Docker under an identical cpuset and memory cap, one job at a time on one machine, and each printed cell is a median of repeated runs with the full range shown beside it. Comparators are pinned by image digest rather than by a floating tag, which is why each row carries its digest: it is the only unambiguous answer to which build was measured.",
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
