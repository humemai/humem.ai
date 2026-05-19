import type { Project } from "../types";
import { cypherglotDocsUrl, cypherglotRepoUrl } from "../shared";

export const cypherglot: Project = {
  slug: "cypherglot",
  title: "CypherGLOT",
  timelineOrder: 2,
  subprojectPage: {
    layout: "standalone",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "cypher",
        navLabel: "Cypher",
        eyebrow: "Cypher",
        title: "Think in graph queries instead of hand-writing graph-shaped SQL.",
        body: [
          "Developers often want to think in graph terms, but implementing graph queries on top of SQL backends usually means hand-writing complex SQL with joins, traversal patterns, and storage-specific tricks. That is hard to maintain, hard to port, and easy to get wrong.",
          "CypherGLOT exists so developers can write Cypher instead, then let the compiler carry that graph intent forward into backend SQL output for the target runtime.",
        ],
        figure: {
          label: "Figure 1",
          title: "From Cypher intent to SQL output",
          caption:
            "The project starts from graph-native query intent, then turns that into a backend-aware SQL representation instead of asking developers to write those SQL shapes by hand.",
          points: [
            "Cypher query input",
            "Admitted-subset validation",
            "Normalization of accepted shapes",
            "Backend-aware SQL output",
          ],
        },
      },
      {
        id: "compilation",
        navLabel: "Compilation",
        eyebrow: "Compilation",
        title: "Use a compiler boundary between graph intent and SQL execution.",
        body: [
          "CypherGLOT is intentionally compiler-only. It parses Cypher, validates an admitted Neo4j-like subset, normalizes the accepted shape into internal structures, lowers it through a graph-relational IR, and hands SQLGlot-backed output to the target runtime.",
          "That keeps parsing, validation, normalization, and lowering separate from storage and execution, so host runtimes stay simpler and more testable.",
        ],
        figure: {
          label: "Figure 2",
          title: "Compiler path",
          caption:
            "CypherGLOT creates an explicit translation path from graph-oriented query syntax to SQL-backed execution plans.",
          points: [
            "Parse Cypher",
            "Validate admitted subset",
            "Normalize internal AST",
            "Lower through graph-relational IR",
            "Emit SQLGlot-backed output",
          ],
        },
      },
      {
        id: "targets",
        navLabel: "Targets",
        eyebrow: "Targets",
        title: "Target multiple SQL backends through one Cypher surface.",
        body: [
          "That compiler path makes Cypher support reusable across runtimes such as HumemDB and creates a path toward targets like SQLite, DuckDB, PostgreSQL, and other SQL-backed systems.",
          "Instead of burying graph logic inside custom SQL for each backend, the project offers an explicit translation contract with clearer guarantees and a much better developer story.",
        ],
        figure: {
          label: "Figure 3",
          title: "Backend direction",
          caption:
            "One Cypher-facing frontend can target multiple SQL backends when the lowering path and support claims stay explicit.",
          points: [
            "SQLite",
            "DuckDB",
            "PostgreSQL",
            "Other SQL-backed runtimes",
          ],
        },
      },
    ],
  },
  summary:
    "A Cypher-to-SQL compiler that lets developers think in graph terms, then lowers admitted Cypher through an internal AST and IR into backend-aware SQL for host runtimes.",
  image: {
    src: "/illustrations/project-cypherglot-compiler.png",
    alt: "Illustration for CypherGLOT",
  },
  status: "Core open-source compiler",
  problem:
    "Developers often want to think in graph terms, but implementing graph queries on top of SQL backends usually means hand-writing complex SQL with joins, traversal patterns, and storage-specific tricks. That is hard to maintain, hard to port, and easy to get wrong when the real intent started as a Cypher query in the first place.",
  solution:
    "CypherGLOT creates that compiler boundary. It parses Cypher, validates an admitted Neo4j-like subset, normalizes it into internal structures, lowers it through a graph-relational IR, and uses SQLGlot-backed output so host runtimes can target SQL engines without developers having to write those graph-shaped SQL queries themselves.",
  impact:
    "That makes Cypher support reusable across runtimes such as HumemDB and creates a path toward targets like SQLite, DuckDB, PostgreSQL, and other SQL-backed systems. Instead of burying graph logic inside custom SQL for each backend, the project offers an explicit compiler path with clearer guarantees and a much better developer story.",
  links: [
    { label: "Read docs", href: cypherglotDocsUrl },
    { label: "View GitHub", href: cypherglotRepoUrl },
  ],
};