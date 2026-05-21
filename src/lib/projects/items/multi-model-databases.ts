import type { Project } from "../types";

export const multiModelDatabases: Project = {
  slug: "multi-model-databases",
  title: "Multi-Model Databases",
  showOnProjectsIndex: true,
  featuredPage: {
    problemHeading: "AI applications span table, graph, and vector workloads.",
    solutionHeading: "Connecting multiple engines without pretending they are one.",
  },
  subprojectSlugs: ["arcadedb-embedded-python", "cypherglot", "humemdb"],
  summary:
    "A systems project exploring how tables (SQL), graphs (Cypher), and semantic vector search (ANN search) can coexist in one developer experience without pretending one engine should do every job.",
  image: {
    src: "/illustrations/projects-overview-portfolio.png",
    alt: "Illustration representing interconnected database and systems projects",
  },
  problem:
    "AI systems increasingly need relational queries, graph structure, and vector search in the same application, but most products collapse those differences behind one platform story. That usually hides which engine is responsible for what, makes routing and debugging harder, and turns local development into a weaker version of a hosted stack instead of a first-class environment.",
  solution:
    "Multi-Model Databases is HumemAI's broader systems project on explicit multi-engine architecture. It brings together runtime work, query compilation, embedded bindings, and orchestration so developers can combine data models while still seeing the real boundaries between table, graph, and vector execution.",
  impact:
    "This project forms the infrastructure layer behind HumemAI's database direction. It connects the pieces that make a more honest multi-model stack possible, from embedded Python bindings and Cypher compilation to a runtime that coordinates the engines instead of pretending they are all the same system.",
  links: [
    { label: "ArcadeDB Embedded Python", href: "/projects/arcadedb-embedded-python" },
    { label: "CypherGLOT", href: "/projects/cypherglot" },
    { label: "HumemDB", href: "/projects/humemdb" },
    { label: "Contact", href: "/contact" },
  ],
};