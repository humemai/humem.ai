import type { Project } from "../types";

export const roomkgBaselines: Project = {
  slug: "roomkg-baselines",
  title: "RoomKG Baselines",
  subprojectPage: {
    layout: "standalone",
    linksHeading: "Paper and code.",
    sections: [
      {
        id: "benchmark",
        navLabel: "Benchmark",
        eyebrow: "Benchmark",
        title: "Reframe the memory problem in temporal knowledge-graph terms.",
        body: [
          "RoomKG Baselines turns the earlier room-memory benchmark into a more explicit graph-memory setting. Observations, hidden state, and memory can now be represented and studied as temporal knowledge graphs rather than only as symbolic records or latent policy state.",
          "That gives the research line a stronger benchmark object for comparing graph-based memory approaches under partial observability.",
        ],
        figure: {
          label: "Figure 1",
          title: "Temporal knowledge-graph framing",
          caption: "The benchmark shifts the environment and memory question into a graph-native formulation.",
          points: [
            "Temporal knowledge-graph memory",
            "Partial observability retained",
            "Explicit benchmark framing",
            "Shared evaluation surface",
          ],
        },
      },
      {
        id: "baselines",
        navLabel: "Baselines",
        eyebrow: "Baselines",
        title: "Compare symbolic and neural approaches under one setup.",
        body: [
          "The repository collects baseline implementations so symbolic, neural, and hybrid approaches can be evaluated under the same benchmark conditions. That makes the work more than a paper artifact: it is the comparative layer around the benchmark itself.",
          "Instead of burying the comparison inside one system, the project makes the baseline surface explicit and reusable.",
        ],
        figure: {
          label: "Figure 2",
          title: "Baseline comparison layer",
          caption: "The repository packages multiple baseline styles around one benchmark instead of one isolated method.",
          points: [
            "Symbolic baselines",
            "Neural baselines",
            "Shared evaluation protocol",
            "Reusable benchmark artifacts",
          ],
        },
      },
      {
        id: "direction",
        navLabel: "Direction",
        eyebrow: "Direction",
        title: "Push the broader project toward graph-based long-term memory.",
        body: [
          "RoomKG Baselines marks a later phase in Machines With Human-Like Memory, where the emphasis shifts from explicit memory systems in general to temporal knowledge-graph memory in particular.",
          "It is the point where the benchmark, the implementation surface, and the research question all align around graph-structured memory.",
        ],
        figure: {
          label: "Figure 3",
          title: "Later-phase research direction",
          caption: "The project moves the research line toward graph-structured memory and stronger benchmark comparison.",
          points: [
            "Later stage in the project line",
            "Graph-structured memory focus",
            "Benchmark plus baselines",
            "Foundation for follow-on work",
          ],
        },
      },
    ],
  },
  summary:
    "The RoomKG benchmark and baseline implementations accompanying Temporal Knowledge-Graph Memory in a Partially Observable Environment.",
  status: "Benchmark and baselines",
  problem:
    "As the earlier RoomEnv work evolved, the benchmark needed a stronger symbolic and neurosymbolic framing where memory is represented as knowledge graphs and evaluated more systematically under partial observability.",
  solution:
    "RoomKG Baselines packages symbolic and neural baselines around a benchmark where observations, hidden state, and memory can all be studied in graph terms. The repository collects the baseline code, benchmark artifacts, and paper figures around temporal knowledge-graph memory.",
  impact:
    "This project turns the memory question into a benchmark object in its own right, making it easier to compare symbolic, neural, and temporal knowledge-graph approaches under shared conditions.",
  links: [
    {
      label: "View GitHub",
      href: "https://github.com/humemai/roomkg-baselines",
    },
    {
      label: "Read paper",
      href: "https://arxiv.org/abs/2408.05861",
    },
    {
      label: "Parent project",
      href: "/projects/machines-with-human-like-memory",
    },
  ],
};