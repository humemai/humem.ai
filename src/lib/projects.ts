export type Project = {
  slug: string;
  title: string;
  summary: string;
  funding?: string;
  sponsor?: {
    name: string;
    href: string;
    logoSrc: string;
    logoAlt: string;
  };
  status: string;
  problem: string;
  solution: string;
  impact?: string;
  acknowledgements?: string;
  links: { label: string; href: string }[];
};

const sidnProjectUrl =
  "https://www.sidnfonds.nl/projecten/audit-ready-local-ai-memory-for-public-interest-use";
const cypherglotRepoUrl = "https://github.com/humemai/cypherglot";
const cypherglotDocsUrl = "https://docs.humem.ai/cypherglot/";
const arcadeDbRepoUrl = "https://github.com/humemai/arcadedb-embedded-python";
const arcadeDbDocsUrl = "https://docs.humem.ai/arcadedb";
const humemDbRepoUrl = "https://github.com/humemai/humemdb";
const humemDbDocsUrl = "https://docs.humem.ai/humemdb/";

export const projects: Project[] = [
  {
    slug: "audit-ready-memory",
    title: "Audit-Ready Memory",
    summary:
      "Open-source, local-first memory for AI agents with transparent logs, deterministic replay, and explicit deletion workflows for public-interest use.",
    funding: "Funded by SIDN Fund",
    sponsor: {
      name: "SIDN Fund",
      href: sidnProjectUrl,
      logoSrc: "/partners/sidn-fund-wordmark.png",
      logoAlt: "SIDN Fund wordmark",
    },
    status: "Pioneer project · 2026",
    problem:
      "Many AI systems keep memory in opaque model state or external cloud tooling, which makes it hard to inspect, search, correct, replay, or safely delete information when public-interest deployments need accountability.",
    solution:
      "Audit-Ready Memory turns agent memory into a structured, timestamped log that supports deterministic replay, transparent audit trails, explicit deletion workflows, and a small demo with benchmarks and documentation others can reuse.",
    impact:
      "The project is aimed at civic-tech teams, researchers, NGOs, and public-interest pilots that need more explainable and sovereign AI behavior. By keeping the memory layer local-first and openly documented, it reduces dependence on opaque third-party services and creates a reusable building block for trustworthy Dutch AI infrastructure.",
    links: [
      {
        label: "View SIDN Fund project",
        href: sidnProjectUrl,
      },
      {
        label: "View audit-ready-memory on GitHub",
        href: "https://github.com/humemai/audit-ready-memory",
      },
      { label: "Contact HumemAI", href: "/contact" },
      { label: "View HumemAI on GitHub", href: "https://github.com/humemai" },
    ],
  },
  {
    slug: "cypherglot",
    title: "CypherGLOT",
    summary:
      "A compiler-first Cypher frontend that validates a disciplined Neo4j-style subset and lowers it into backend-aware SQL output for embedded runtimes.",
    status: "Core open-source compiler",
    problem:
      "Cypher is useful, but most teams either depend on one graph database runtime or end up mixing parser logic, compatibility hacks, and execution details in the same layer. That makes portability, testing, and embedded use much harder than it should be.",
    solution:
      "CypherGLOT creates a stable compiler boundary for the HumemAI stack: it parses Cypher, validates an admitted subset, normalizes it, and lowers it through a graph-relational IR into SQLGlot-backed output that host runtimes can execute cleanly.",
    impact:
      "That separation makes Cypher support more reusable across runtimes such as HumemDB and other embedded graph-relational systems. Instead of promising vague compatibility, it offers an explicit contract, predictable behavior, and a path toward multi-backend support with real tests behind it.",
    links: [
      { label: "Read CypherGLOT docs", href: cypherglotDocsUrl },
      { label: "View CypherGLOT on GitHub", href: cypherglotRepoUrl },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
  {
    slug: "arcadedb-embedded-python",
    title: "ArcadeDB Embedded Python",
    summary:
      "Native Python bindings for ArcadeDB with bundled runtime packaging, embedded execution, and a cleaner path to graph, vector, and multi-model workloads from Python.",
    status: "Open-source Python integration",
    problem:
      "Using powerful multi-model databases from Python often means extra server setup, Java installation friction, or a weak local developer story. That slows down experimentation for graph, vector, and agent tooling that should run close to the application.",
    solution:
      "ArcadeDB Embedded Python packages native Python bindings for ArcadeDB with a bundled JRE, platform-specific wheels, embedded in-process usage, optional server mode, and CI-validated examples so developers can use ArcadeDB from Python with much less operational friction.",
    impact:
      "The project gives Python developers a more practical way to adopt a high-performance multi-model database locally, whether for testing, embedded analytics, graph exploration, or vector-heavy AI tooling. It turns ArcadeDB into something that feels far more accessible inside the Python ecosystem.",
    links: [
      { label: "Read ArcadeDB Embedded Python docs", href: arcadeDbDocsUrl },
      { label: "View ArcadeDB Embedded Python on GitHub", href: arcadeDbRepoUrl },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
  {
    slug: "humemdb",
    title: "HumemDB",
    summary:
      "A Python-first embedded runtime that orchestrates SQL, Cypher, and vector search across the engines that already do each job well.",
    status: "Core open-source runtime",
    problem:
      "Most data stacks force SQL, graph, and vector workloads through one engine or one marketing story, even when the tradeoffs are weak. That creates confusion around routing, performance, and what is actually happening under the hood.",
    solution:
      "HumemDB takes the opposite approach: it keeps SQLite for OLTP, DuckDB for analytics, Cypher over SQL-backed graph storage, and an explicit vector layer, all behind a thin Python orchestration runtime with clear routing and explicit public APIs.",
    impact:
      "The result is a more honest and practical embedded stack for AI systems that need relational queries, graph patterns, and vector search in one local runtime. It is a foundation piece for building memory-heavy agent systems without pretending one engine should do everything.",
    links: [
      { label: "Read HumemDB docs", href: humemDbDocsUrl },
      { label: "View HumemDB on GitHub", href: humemDbRepoUrl },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
  {
    slug: "machines-with-human-like-memory",
    title: "Machines With Human-Like Memory",
    summary:
      "A foundational PhD project exploring how AI systems can move beyond stateless prompting toward richer, more human-like memory that stays structured, inspectable, and useful over time.",
    status: "Foundational PhD project",
    problem:
      "Most AI systems still treat memory as an afterthought: short-lived context windows, opaque hidden state, or brittle retrieval layers that struggle to represent what should persist, what should fade, and how past experience should shape future behavior.",
    solution:
      "Machines With Human-Like Memory investigates memory architectures for AI that draw more directly from human memory concepts such as persistence, structure, replay, and selective recall. It serves as a research base for later systems work across long-term agent memory, memory-aware reasoning, and practical implementations in the HumemAI stack.",
    impact:
      "This project forms the deeper research foundation behind several later HumemAI efforts. It connects the broader research thread around memory architectures to the more practical systems and products that followed.",
    acknowledgements:
      "This research was partially funded by the Hybrid Intelligence Center, a 10-year program funded by the Dutch Ministry of Education, Culture and Science through the Netherlands Organisation for Scientific Research (NWO). Learn more at https://www.hybrid-intelligence-centre.nl/.",
    links: [{ label: "Contact HumemAI", href: "/contact" }],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}