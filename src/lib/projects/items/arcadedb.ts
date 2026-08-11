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
        title: "One storage substrate underneath documents, graphs, key-value, time series and vectors.",
        body: [
          "Most systems that claim to be multi-model are several engines behind one API. ArcadeDB is not. Everything persistent is a paginated component over one page manager, committed through one write-ahead log by one transaction pipeline, which is why a write that touches a document, an edge and a vector index is a single ACID transaction rather than a coordinated set of them.",
          "Every index rides that same substrate. LSM trees, full-text, geo, hash, and both dense and sparse vector indexes are committed in-transaction alongside the records they index. Replication inherits this for free: Raft ships shared write-ahead log page diffs, so it is automatically correct for every model without per-model replication logic.",
          "One caveat worth stating plainly, because it is the kind of thing a careful reader checks. Vector records are transactional, logged and replicated, but the approximate-nearest-neighbour graph itself is an asynchronously built, rebuildable derived structure. The honest description is a transactional source of truth with an eventually consistent search structure, which is still a stronger guarantee than a standalone vector store offers, and it is not the same as a fully transactional index.",
        ],
        figure: {
          label: "Figure 1",
          title: "One substrate",
          caption:
            "Every model and every index sits on the same page manager and the same write-ahead log, which is what makes a cross-model write one transaction.",
          points: [
            "Documents, graph, key-value, time series, vectors",
            "One page manager and one write-ahead log",
            "Indexes committed in the same transaction",
            "Raft replicates pages, so every model replicates",
          ],
        },
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
        ],
        figure: {
          label: "Figure 2",
          title: "What the wheel contains",
          caption:
            "The engine is not reimplemented or forked in behaviour; it is repackaged so Python can use it without a separate runtime or service.",
          points: [
            "Upstream ArcadeDB engine, unmodified",
            "Bundled runtime, no separate Java install",
            "Platform wheels, installed with pip",
            "Optional in-process server for wire protocols",
          ],
        },
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
          "That last one is the argument for a unified engine stated as an experiment rather than a claim. Against a composed stack of a vector store plus a graph database, the interesting output is not the latency, it is what a failure part-way through leaves behind. A composed stack has no transaction spanning both engines, so it can be interrupted into a state where the two disagree, and the single-substrate engine cannot.",
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
        figure: {
          label: "Figure 3",
          title: "Which one to reach for",
          caption:
            "The same engine either way. Choose by how many processes need the data, not by expected speed.",
          points: [
            "One process, local data: embedded",
            "Many clients or machines: server",
            "Need Postgres, Redis, Bolt or HTTP: server",
            "Need replication and failover: server",
          ],
        },
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
    "A multi-model database engine that keeps documents, graphs, key-value, time series and vectors on one transactional substrate, plus the Python distribution that runs that engine in process, benchmarked against the specialist systems in each category.",
  image: {
    src: "/images/projects/project-arcadedb-embedded-python.png",
    alt: "Illustration for ArcadeDB",
  },
  problem:
    "Applications increasingly need relational queries, graph traversal and vector search over the same data, and the usual answer is to run three systems and write glue between them. That glue has no transaction boundary, so a failure part-way through a multi-store write leaves the stores disagreeing, and there is no single place to ask a question that spans them. For Python work there is a second problem: the engines worth using are rarely installable as a package and runnable in process.",
  solution:
    "ArcadeDB puts every model on one page manager and one write-ahead log, so a write spanning documents, edges and vectors is a single ACID transaction and replication is automatically correct for every model. The embedded distribution ships that same engine as a Python package with a bundled runtime, so it installs with pip and runs inside the application process, with an optional in-process server when wire protocols or replication are needed.",
  impact:
    "The engine and the Python distribution are developed together and measured against the specialist systems in each category, on real corpora rather than synthetic ones, with recall reported next to latency and every comparator pinned by image digest. Findings from that benchmarking are filed and contributed upstream, so the measurements feed the engine rather than only describing it.",
  links: [
    { label: "Read docs", href: arcadeDbDocsUrl },
    { label: "Python distribution", href: arcadeDbRepoUrl },
    { label: "Upstream engine", href: arcadeDbUpstreamRepoUrl },
    { label: "Visit ArcadeDB", href: arcadeDbWebsiteUrl },
  ],
};
