import type { Project } from "../types";

export const kgMemoryTransfer: Project = {
  slug: "kg-memory-transfer",
  title: "KG Memory Transfer",
  timelineOrder: 4,
  subprojectPage: {
    layout: "standalone",
    linksHeading: "Code and project links.",
    sections: [
      {
        id: "transfer",
        navLabel: "Transfer",
        eyebrow: "Transfer",
        title: "Study how short-term graph memory should become long-term memory.",
        body: [
          "KG Memory Transfer focuses on consolidation: how an agent operating under partial observability should move information from transient observations into longer-term knowledge-graph memory without storing everything indiscriminately.",
          "That makes memory transfer itself the object of study rather than just an implementation detail inside a larger system.",
        ],
        figure: {
          label: "Figure 1",
          title: "Memory transfer problem",
          caption: "The project focuses on the boundary between transient observations and durable graph memory.",
          points: [
            "Short-term observations",
            "Selection for retention",
            "Long-term graph memory",
            "Partial observability constraints",
          ],
        },
      },
      {
        id: "continuation",
        navLabel: "Continuation",
        eyebrow: "Continuation",
        title: "Extend the temporal knowledge-graph line instead of restarting it.",
        body: [
          "This repository follows naturally from the RoomKG work. Once temporal knowledge-graph memory is in place, the next architectural question is not only how to query memory, but how memory should be consolidated over time.",
          "So the project acts as a continuation of the graph-memory research direction rather than a separate disconnected effort.",
        ],
        figure: {
          label: "Figure 2",
          title: "Follow-on research path",
          caption: "KG Memory Transfer continues the graph-memory line by focusing on consolidation and persistence.",
          points: [
            "Builds on RoomKG work",
            "Focus on consolidation",
            "Longer-term memory architecture question",
            "Next step in the same research thread",
          ],
        },
      },
      {
        id: "public-anchor",
        navLabel: "Public anchor",
        eyebrow: "Public anchor",
        title: "Keep a public implementation anchor while the work grows.",
        body: [
          "The repository is still lightweight, but it matters as the public anchor for this research direction. It gives the project line a place to attach code, notes, and later paper-facing material as the work matures.",
          "That is enough reason to treat it as a dedicated subproject page instead of leaving it as a placeholder link.",
        ],
        figure: {
          label: "Figure 3",
          title: "Early public project surface",
          caption: "Even in an early state, the repository anchors the next research step in public.",
          points: [
            "Public repository anchor",
            "Space for code and future paper material",
            "Clear place in the project sequence",
            "Not just a placeholder entry",
          ],
        },
      },
    ],
  },
  summary:
    "The public repository for Short-Term-to-Long-Term Memory Transfer for Knowledge Graphs under Partial Observability.",
  problem:
    "Temporal knowledge-graph memory improves performance in partially observable environments, but the next question is how an agent should move information from transient observations into longer-term graph memory without storing everything indiscriminately.",
  solution:
    "This repository is the public anchor for work on short-term-to-long-term memory transfer for knowledge graphs under partial observability. The current page is intentionally lightweight and will expand as the public paper page and implementation are completed.",
  impact:
    "The project extends the broader memory research line toward mechanisms for memory consolidation and transfer, which is a natural next step after explicit memory systems and temporal knowledge-graph baselines.",
  links: [
    {
      label: "View GitHub",
      href: "https://github.com/humemai/kg-memory-transfer",
    },
    {
      label: "Parent project",
      href: "/projects/machines-with-human-like-memory",
    },
  ],
};