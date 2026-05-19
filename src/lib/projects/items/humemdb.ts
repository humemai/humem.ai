import type { Project } from "../types";
import { humemDbDocsUrl, humemDbRepoUrl } from "../shared";

export const humemdb: Project = {
  slug: "humemdb",
  title: "HumemDB",
  timelineOrder: 3,
  subprojectPage: {
    layout: "standalone",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "routing",
        navLabel: "Routing",
        eyebrow: "Routing",
        title: "Route each workload to the embedded engine that already does it well.",
        body: [
          "HumemDB is not trying to be one fake all-in-one database core. It is a Python orchestration layer that combines SQLite, DuckDB, CypherGLOT, and LanceDB so each workload can go to the engine that is already strong at it.",
          "SQLite handles canonical writes and OLTP table workloads, DuckDB handles broader analytical reads and OLAP workloads, CypherGLOT provides the graph-query layer over that table-backed storage, and LanceDB adds the embedded vector path for index build and search.",
        ],
        figure: {
          label: "Figure 1",
          title: "Runtime routing model",
          caption:
            "HumemDB composes specialized embedded components instead of pretending one engine should do everything.",
          points: [
            "SQLite for OLTP writes and reads",
            "DuckDB for OLAP and analytical reads",
            "CypherGLOT for graph-query compilation",
            "LanceDB for vector index build and search",
          ],
        },
      },
      {
        id: "tables",
        navLabel: "Tables",
        eyebrow: "Tables + Graphs",
        title: "Keep one table-backed foundation for both table and graph queries.",
        body: [
          "Most systems that want tables, graphs, and vectors either duplicate data across separate stores or force everything through one engine and call it multi-model. That creates unnecessary complexity and often leaves developers maintaining separate table and graph representations of the same data.",
          "HumemDB takes a table-first approach instead. SQLite and DuckDB remain the underlying table engines, while CypherGLOT lets those same table-backed layouts be understood and queried as graphs. Graphs are a view over the data, not a duplicated silo beside it.",
        ],
        figure: {
          label: "Figure 2",
          title: "Shared table-backed foundation",
          caption:
            "The same stored tables support both SQL queries and graph-style Cypher queries through the compiler layer.",
          points: [
            "One underlying table layout",
            "SQL over the stored tables",
            "Cypher views over the same data",
            "No separate duplicated graph store",
          ],
        },
      },
      {
        id: "vectors",
        navLabel: "Vectors",
        eyebrow: "Vectors",
        title: "Add vector search without leaving the embedded model.",
        body: [
          "LanceDB gives the stack an embedded vector path for index build and search, so vector workloads can live beside the SQL and graph-query paths instead of being pushed into a separate hosted service or duplicated system.",
          "That makes HumemDB useful for memory-heavy AI systems that need tables, graphs, and vectors in one local runtime, while still keeping the routing model explicit and defensible.",
        ],
        figure: {
          label: "Figure 3",
          title: "Embedded system composition",
          caption:
            "HumemDB exposes tables, graphs, and vectors as one Python-facing system while keeping the underlying components explicit.",
          points: [
            "Python orchestration layer",
            "Embedded table engines with Python bindings",
            "Graph-query layer via CypherGLOT",
            "Embedded vector indexing and search",
          ],
        },
      },
    ],
  },
  summary:
    "A Python orchestration layer that combines SQLite, DuckDB, CypherGLOT, and LanceDB so table, graph, and vector workloads can be routed across embedded engines without forcing one database to do every job.",
  image: {
    src: "/illustrations/project-humemdb-runtime.png",
    alt: "Illustration for HumemDB",
  },
  status: "Core open-source runtime",
  problem:
    "Most systems that want tables, graphs, and vectors either duplicate data across separate stores or force everything through one engine and call it multi-model. That makes routing unclear, weakens performance tradeoffs, and often leaves developers writing graph-shaped SQL by hand or maintaining separate table and graph representations of the same data.",
  solution:
    "HumemDB takes a table-first orchestration approach. SQLite handles canonical writes and OLTP table workloads, DuckDB handles OLAP and broader analytical table workloads, CypherGLOT lets those same table-backed layouts be queried as graphs, and LanceDB provides the embedded vector path for index build and search. The result is a thin Python orchestration layer that decides which embedded engine to route each workload to, without pretending tables, graphs, and vectors need separate duplicated systems.",
  impact:
    "That makes HumemDB powerful precisely because it is built on strong embedded engines with Python bindings instead of a fake all-in-one core. When routed well, the stack can handle tables, graphs, and vectors in one local runtime, while keeping OLTP, OLAP, and vector-index workloads on the components that are actually good at them.",
  links: [
    { label: "Read docs", href: humemDbDocsUrl },
    { label: "View GitHub", href: humemDbRepoUrl },
  ],
};