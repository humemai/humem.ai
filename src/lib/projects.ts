export type Project = {
  slug: string;
  title: string;
  summary: string;
  showOnProjectsIndex?: boolean;
  subprojectSlugs?: string[];
  image?: {
    src: string;
    alt: string;
  };
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

const featuredProjectSlugs = [
  "audit-ready-memory",
  "multi-model-databases",
  "machines-with-human-like-memory",
] as const;

export const projects: Project[] = [
  {
    slug: "room-env",
    title: "RoomEnv",
    summary:
      "A family of partially observable room environments used across multiple papers on human-like memory, explicit memory systems, and temporal knowledge-graph memory.",
    status: "Project page draft · Open-source environment",
    problem:
      "Research on memory-aware agents needs a benchmark where memory is not incidental, but central to the task. RoomEnv provides that common experimental surface across several generations of work, from heuristic memory systems to reinforcement learning agents and neurosymbolic temporal knowledge-graph memory.",
    solution:
      "RoomEnv packages multiple environment versions under one repository so related projects can share a consistent world model while changing the memory assumptions, question structure, and benchmark difficulty. It acts as the experimental substrate for several papers in the broader Machines With Human-Like Memory research line.",
    impact:
      "By consolidating the environment into one reusable codebase, RoomEnv makes it easier to compare agent architectures across papers, reproduce older setups, and extend the benchmark without rebuilding the world model from scratch.",
    links: [
      {
        label: "View room-env on GitHub",
        href: "https://github.com/humemai/room-env",
      },
      {
        label: "Read A Machine With Human-Like Memory Systems",
        href: "https://arxiv.org/abs/2204.01611",
      },
      {
        label: "Read A Machine with Short-Term, Episodic, and Semantic Memory Systems",
        href: "https://arxiv.org/abs/2212.02098",
      },
      {
        label: "Read Temporal Knowledge-Graph Memory in a Partially Observable Environment",
        href: "https://arxiv.org/abs/2408.05861",
      },
      {
        label: "View Machines With Human-Like Memory",
        href: "/projects/machines-with-human-like-memory",
      },
    ],
  },
  {
    slug: "human-like-memory-systems",
    title: "Human-Like Memory Systems",
    summary:
      "A project page draft for the heuristic agents behind A Machine With Human-Like Memory Systems, focused on explicit episodic and semantic memory in RoomEnv-v0.",
    status: "Project page draft · Heuristic agent implementation",
    problem:
      "Many agent benchmarks assume short-lived state or opaque recurrent memory, which makes it hard to study what explicit episodic and semantic memory structures contribute on their own. This project isolates that question in a simple partially observable room environment.",
    solution:
      "The repository implements handcrafted agents for RoomEnv-v0 with different combinations of episodic and semantic memory. Instead of relying on end-to-end RL, it uses explicit memory policies to test whether human-inspired memory structure improves question answering in partially observable settings.",
    impact:
      "This work forms the starting point of the broader Machines With Human-Like Memory line by making the memory systems themselves inspectable, debuggable, and comparable before moving on to learned policies.",
    links: [
      {
        label: "View human-like-memory-systems on GitHub",
        href: "https://github.com/humemai/human-like-memory-systems",
      },
      {
        label: "Read A Machine With Human-Like Memory Systems",
        href: "https://arxiv.org/abs/2204.01611",
      },
      {
        label: "View Machines With Human-Like Memory",
        href: "/projects/machines-with-human-like-memory",
      },
      {
        label: "View RoomEnv",
        href: "/projects/room-env",
      },
    ],
  },
  {
    slug: "explicit-memory",
    title: "Explicit Memory",
    summary:
      "A project page draft for the reinforcement-learning implementation behind A Machine with Short-Term, Episodic, and Semantic Memory Systems.",
    status: "Project page draft · RL agent implementation",
    problem:
      "Heuristic policies show that structured memory can help, but they do not answer whether an agent can learn when to retain, move, or forget information across short-term, episodic, and semantic memory systems.",
    solution:
      "This repository trains RoomEnv-v1 agents with deep reinforcement learning so the agent learns memory-management behavior directly. The implementation focuses on explicit memory systems with knowledge-graph structure rather than treating memory as an undifferentiated hidden state.",
    impact:
      "The project extends the earlier human-like memory work from handcrafted rules to learned policies, showing how explicit memory architectures can be integrated into trainable agents while remaining interpretable enough for analysis.",
    links: [
      {
        label: "View explicit-memory on GitHub",
        href: "https://github.com/humemai/explicit-memory",
      },
      {
        label: "Read A Machine with Short-Term, Episodic, and Semantic Memory Systems",
        href: "https://arxiv.org/abs/2212.02098",
      },
      {
        label: "View Machines With Human-Like Memory",
        href: "/projects/machines-with-human-like-memory",
      },
      { label: "View RoomEnv", href: "/projects/room-env" },
    ],
  },
  {
    slug: "roomkg-baselines",
    title: "RoomKG Baselines",
    summary:
      "A project page draft for the RoomKG benchmark and baseline implementations accompanying Temporal Knowledge-Graph Memory in a Partially Observable Environment.",
    status: "Project page draft · Benchmark and baselines",
    problem:
      "As the earlier RoomEnv work evolved, the benchmark needed a stronger symbolic and neurosymbolic framing where memory is represented as knowledge graphs and evaluated more systematically under partial observability.",
    solution:
      "RoomKG Baselines packages symbolic and neural baselines around a benchmark where observations, hidden state, and memory can all be studied in graph terms. The repository collects the baseline code, benchmark artifacts, and paper figures around temporal knowledge-graph memory.",
    impact:
      "This project turns the memory question into a benchmark object in its own right, making it easier to compare symbolic, neural, and temporal knowledge-graph approaches under shared conditions.",
    links: [
      {
        label: "View roomkg-baselines on GitHub",
        href: "https://github.com/humemai/roomkg-baselines",
      },
      {
        label: "Read Temporal Knowledge-Graph Memory in a Partially Observable Environment",
        href: "https://arxiv.org/abs/2408.05861",
      },
      {
        label: "View Machines With Human-Like Memory",
        href: "/projects/machines-with-human-like-memory",
      },
      { label: "View RoomEnv", href: "/projects/room-env" },
    ],
  },
  {
    slug: "kg-memory-transfer",
    title: "KG Memory Transfer",
    summary:
      "A project page draft for Short-Term-to-Long-Term Memory Transfer for Knowledge Graphs under Partial Observability.",
    status: "Project page draft · Research repository",
    problem:
      "Temporal knowledge-graph memory improves performance in partially observable environments, but the next question is how an agent should move information from transient observations into longer-term graph memory without storing everything indiscriminately.",
    solution:
      "This repository is the public anchor for work on short-term-to-long-term memory transfer for knowledge graphs under partial observability. The current page is intentionally lightweight and will expand as the public paper page and implementation are completed.",
    impact:
      "The project extends the broader memory research line toward mechanisms for memory consolidation and transfer, which is a natural next step after explicit memory systems and temporal knowledge-graph baselines.",
    links: [
      {
        label: "View kg-memory-transfer on GitHub",
        href: "https://github.com/humemai/kg-memory-transfer",
      },
      {
        label: "View Machines With Human-Like Memory",
        href: "/projects/machines-with-human-like-memory",
      },
      { label: "View RoomEnv", href: "/projects/room-env" },
    ],
  },
  {
    slug: "audit-ready-memory",
    title: "Audit-Ready Memory",
    showOnProjectsIndex: true,
    summary:
      "Open-source, local-first memory for AI agents with transparent logs, deterministic replay, and explicit deletion workflows for public-interest use.",
    image: {
      src: "/illustrations/project-audit-ready-memory.png",
      alt: "Illustration of traceable and explainable AI memory records",
    },
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
    slug: "multi-model-databases",
    title: "Multi-Model Databases",
    showOnProjectsIndex: true,
    subprojectSlugs: ["arcadedb-embedded-python", "cypherglot", "humemdb"],
    summary:
      "A public project line around embedded runtimes, graph-relational query layers, and database tooling that combine multiple data models without hiding which engine does what.",
    status: "Umbrella project · Open-source systems work",
    problem:
      "Teams building AI systems often need SQL, graph, and vector capabilities together, but many products blur those boundaries behind one vague platform story. That makes routing, debugging, portability, and local development harder than they should be.",
    solution:
      "Multi-Model Databases groups HumemAI's systems work on embedded runtimes and database integrations that keep engine responsibilities explicit. Instead of forcing everything through one abstraction, the projects in this line focus on practical orchestration, portable query compilation, and local-first developer workflows.",
    impact:
      "This umbrella connects the infrastructure pieces that underpin HumemAI's database direction, from Python bindings for ArcadeDB to Cypher compilation and the HumemDB runtime itself.",
    links: [
      { label: "View ArcadeDB Embedded Python", href: "/projects/arcadedb-embedded-python" },
      { label: "View CypherGLOT", href: "/projects/cypherglot" },
      { label: "View HumemDB", href: "/projects/humemdb" },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
  {
    slug: "cypherglot",
    title: "CypherGLOT",
    summary:
      "A compiler-first Cypher frontend that validates a disciplined Neo4j-style subset and lowers it into backend-aware SQL output for embedded runtimes.",
    image: {
      src: "/illustrations/project-cypherglot-compiler.png",
      alt: "Illustration of Cypher query compilation into normalized graph-relational output",
    },
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
      { label: "View Multi-Model Databases", href: "/projects/multi-model-databases" },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
  {
    slug: "arcadedb-embedded-python",
    title: "ArcadeDB Embedded Python",
    summary:
      "Native Python bindings for ArcadeDB with bundled runtime packaging, embedded execution, and a cleaner path to graph, vector, and multi-model workloads from Python.",
    image: {
      src: "/illustrations/project-arcadedb-embedded-python.png",
      alt: "Illustration of Python connected to an embedded multi-model database runtime",
    },
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
      { label: "View Multi-Model Databases", href: "/projects/multi-model-databases" },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
  {
    slug: "humemdb",
    title: "HumemDB",
    summary:
      "A Python-first embedded runtime that orchestrates SQL, Cypher, and vector search across the engines that already do each job well.",
    image: {
      src: "/illustrations/project-humemdb-runtime.png",
      alt: "Illustration of an embedded runtime coordinating SQL, graph, and vector workloads",
    },
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
      { label: "View Multi-Model Databases", href: "/projects/multi-model-databases" },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
  {
    slug: "machines-with-human-like-memory",
    title: "Machines With Human-Like Memory",
    showOnProjectsIndex: true,
    subprojectSlugs: [
      "room-env",
      "human-like-memory-systems",
      "explicit-memory",
      "roomkg-baselines",
      "kg-memory-transfer",
    ],
    summary:
      "A foundational PhD project exploring how AI systems can move beyond stateless prompting toward richer, more human-like memory that stays structured, inspectable, and useful over time.",
    image: {
      src: "/illustrations/project-human-like-memory.png",
      alt: "Illustration of human-like memory architecture for AI",
    },
    status: "Foundational PhD project",
    problem:
      "Most AI systems still treat memory as an afterthought: short-lived context windows, opaque hidden state, or brittle retrieval layers that struggle to represent what should persist, what should fade, and how past experience should shape future behavior.",
    solution:
      "Machines With Human-Like Memory investigates memory architectures for AI that draw more directly from human memory concepts such as persistence, structure, replay, and selective recall. It serves as a research base for later systems work across long-term agent memory, memory-aware reasoning, and practical implementations in the HumemAI stack.",
    impact:
      "This project forms the deeper research foundation behind several later HumemAI efforts. It connects the broader research thread around memory architectures to the more practical systems and products that followed.",
    acknowledgements:
      "This research was partially funded by the Hybrid Intelligence Center, a 10-year program funded by the Dutch Ministry of Education, Culture and Science through the Netherlands Organisation for Scientific Research (NWO). Learn more at https://www.hybrid-intelligence-centre.nl/.",
    links: [
      { label: "View RoomEnv", href: "/projects/room-env" },
      { label: "View Human-Like Memory Systems", href: "/projects/human-like-memory-systems" },
      { label: "View Explicit Memory", href: "/projects/explicit-memory" },
      { label: "View RoomKG Baselines", href: "/projects/roomkg-baselines" },
      { label: "View KG Memory Transfer", href: "/projects/kg-memory-transfer" },
      { label: "Contact HumemAI", href: "/contact" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return featuredProjectSlugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getSubprojects(project: Project) {
  return (project.subprojectSlugs ?? [])
    .map((slug) => getProject(slug))
    .filter((subproject): subproject is Project => Boolean(subproject));
}