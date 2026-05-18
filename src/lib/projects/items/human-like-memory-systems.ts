import type { Project } from "../types";

export const humanLikeMemorySystems: Project = {
  slug: "human-like-memory-systems",
  title: "Human-Like Memory Systems",
  subprojectPage: {
    layout: "standalone",
    linksHeading: "Paper and code.",
    sections: [
      {
        id: "heuristic-agents",
        navLabel: "Heuristic agents",
        eyebrow: "Heuristic agents",
        title: "Start with explicit memory systems before learned policies.",
        body: [
          "This project studies whether human-inspired memory structure helps in a simple partially observable setting before introducing reinforcement learning. The agents are hand-built so episodic and semantic memory behavior stays visible and debuggable.",
          "That makes the repository a clean first step in the wider research line: memory is explicit, decisions can be inspected, and the architecture can be compared directly.",
        ],
        figure: {
          label: "Figure 1",
          title: "Early explicit memory agents",
          caption: "The repository isolates memory-system design with heuristic policies rather than end-to-end training.",
          points: [
            "Handcrafted agent behavior",
            "Explicit episodic memory",
            "Explicit semantic memory",
            "Inspectable decision logic",
          ],
        },
      },
      {
        id: "roomenv-v0",
        navLabel: "RoomEnv-v0",
        eyebrow: "RoomEnv-v0",
        title: "Test memory retrieval in a controlled partially observable environment.",
        body: [
          "The implementation is built around RoomEnv-v0, where the agent has to navigate, retain observations, and answer questions later without privileged access to the full world state.",
          "That setup lets the paper ask a narrower question: what do explicit episodic and semantic memory systems contribute when the task genuinely requires remembering.",
        ],
        figure: {
          label: "Figure 2",
          title: "Evaluation setting",
          caption: "RoomEnv-v0 provides a simple benchmark where memory quality affects downstream question answering.",
          points: [
            "Partially observable rooms",
            "Delayed questions",
            "Stored observations as memory",
            "Direct comparison of memory variants",
          ],
        },
      },
      {
        id: "starting-point",
        navLabel: "Starting point",
        eyebrow: "Starting point",
        title: "Use this repository as the opening move of the whole project line.",
        body: [
          "Human-Like Memory Systems is the earliest implementation step in Machines With Human-Like Memory. It establishes the architectural framing before the work moves on to reinforcement learning and temporal knowledge-graph memory.",
          "That is why the repository still matters on its own: it makes the initial claims concrete and gives the later systems a clear point of comparison.",
        ],
        figure: {
          label: "Figure 3",
          title: "Research sequence",
          caption: "The project establishes the first explicit-memory implementation in the broader research sequence.",
          points: [
            "Initial architectural framing",
            "Baseline for later learned systems",
            "Directly tied to the first paper",
            "Clear comparison point for later work",
          ],
        },
      },
    ],
  },
  summary:
    "Heuristic agents for A Machine With Human-Like Memory Systems, focused on explicit episodic and semantic memory in RoomEnv-v0.",
  status: "Heuristic agent implementation",
  problem:
    "Many agent benchmarks assume short-lived state or opaque recurrent memory, which makes it hard to study what explicit episodic and semantic memory structures contribute on their own. This project isolates that question in a simple partially observable room environment.",
  solution:
    "The repository implements handcrafted agents for RoomEnv-v0 with different combinations of episodic and semantic memory. Instead of relying on end-to-end RL, it uses explicit memory policies to test whether human-inspired memory structure improves question answering in partially observable settings.",
  impact:
    "This work forms the starting point of the broader Machines With Human-Like Memory line by making the memory systems themselves inspectable, debuggable, and comparable before moving on to learned policies.",
  links: [
    {
      label: "View GitHub",
      href: "https://github.com/humemai/human-like-memory-systems",
    },
    {
      label: "Read paper",
      href: "https://arxiv.org/abs/2204.01611",
    },
    {
      label: "Parent project",
      href: "/projects/machines-with-human-like-memory",
    },
  ],
};