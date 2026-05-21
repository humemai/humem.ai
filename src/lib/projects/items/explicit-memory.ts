import type { Project } from "../types";

export const explicitMemory: Project = {
  slug: "explicit-memory",
  title: "Explicit Memory",
  timelineOrder: 2,
  subprojectPage: {
    layout: "standalone",
    linksHeading: "Paper and code.",
    sections: [
      {
        id: "rl-memory",
        navLabel: "RL memory",
        eyebrow: "RL memory",
        title: "Learn memory management instead of hand-coding it.",
        body: [
          "Explicit Memory extends the earlier heuristic work by training agents to decide what to retain, move, and forget across short-term, episodic, and semantic memory systems. The goal is not just better performance, but a learnable memory architecture that remains structurally explicit.",
          "That shifts the project from manually specified memory rules to reinforcement learning over memory operations while keeping the memory system itself visible enough to analyze.",
        ],
        figure: {
          label: "Figure 1",
          title: "Learned memory management",
          caption: "The repository trains policies over explicit memory systems rather than hiding memory inside a single recurrent state.",
          points: [
            "Short-term memory",
            "Episodic memory",
            "Semantic memory",
            "Learned memory-management behavior",
          ],
        },
      },
      {
        id: "roomenv-v1",
        navLabel: "RoomEnv-v1",
        eyebrow: "RoomEnv-v1",
        title: "Move the benchmark forward with a richer memory setting.",
        body: [
          "The implementation is built around RoomEnv-v1, where reinforcement learning agents operate with explicit memory structures rather than opaque hidden-state memory. This makes it possible to test whether the agent can learn to use structured memory well under partial observability.",
          "The environment and training setup turn memory control into part of the policy-learning problem instead of treating it as a fixed subsystem.",
        ],
        figure: {
          label: "Figure 2",
          title: "Training setting",
          caption: "RoomEnv-v1 supports learned explicit-memory agents in a benchmark where memory decisions affect downstream behavior.",
          points: [
            "Reinforcement learning in partial observability",
            "Structured memory actions",
            "Knowledge-graph-oriented memory representation",
            "Analysis of learned memory behavior",
          ],
        },
      },
      {
        id: "bridge",
        navLabel: "Bridge",
        eyebrow: "Bridge",
        title: "Bridge early heuristic memory work to later graph-memory systems.",
        body: [
          "Explicit Memory sits in the middle of the broader research line. It keeps the commitment to explicit memory systems, but moves from handcrafted agents toward learned behavior.",
          "That makes it the connective step between the first human-like memory systems paper and the later temporal knowledge-graph work.",
        ],
        figure: {
          label: "Figure 3",
          title: "Research bridge",
          caption: "The project connects the first explicit-memory agents to the later temporal knowledge-graph direction.",
          points: [
            "From heuristics to learning",
            "Keeps memory explicit",
            "Intermediate step in the research line",
            "Groundwork for later graph-memory systems",
          ],
        },
      },
    ],
  },
  summary:
    "The reinforcement-learning implementation behind A Machine with Short-Term, Episodic, and Semantic Memory Systems.",
  problem:
    "Heuristic policies show that structured memory can help, but they do not answer whether an agent can learn when to retain, move, or forget information across short-term, episodic, and semantic memory systems.",
  solution:
    "This repository trains RoomEnv-v1 agents with deep reinforcement learning so the agent learns memory-management behavior directly. The implementation focuses on explicit memory systems with knowledge-graph structure rather than treating memory as an undifferentiated hidden state.",
  impact:
    "The project extends the earlier human-like memory work from handcrafted rules to learned policies, showing how explicit memory architectures can be integrated into trainable agents while remaining interpretable enough for analysis.",
  links: [
    {
      label: "Read paper",
      href: "https://arxiv.org/abs/2212.02098",
    },
    {
      label: "View GitHub",
      href: "https://github.com/humemai/explicit-memory",
    },
    {
      label: "Parent project",
      href: "/projects/machines-with-human-like-memory",
    },
  ],
};