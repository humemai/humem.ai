import { hybridIntelligenceUrl } from "../shared";
import type { Project } from "../types";

export const machinesWithHumanLikeMemory: Project = {
  slug: "machines-with-human-like-memory",
  title: "Machines With Human-Like Memory",
  showOnProjectsIndex: true,
  featuredPage: {
    problemHeading: "Memory should be a first-class AI architecture problem.",
    solutionHeading: "A research line from benchmark environments to explicit memory systems.",
    acknowledgementsHeading: "Research support from Hybrid Intelligence.",
  },
  subprojectSlugs: [
    "human-like-memory-systems",
    "explicit-memory",
    "roomkg-baselines",
    "kg-memory-transfer",
  ],
  summary:
    "A PhD research project on explicit memory architectures for AI, spanning benchmarks, handcrafted agents, learned policies, and temporal knowledge-graph memory.",
  image: {
    src: "/illustrations/project-human-like-memory.png",
    alt: "Illustration of human-like memory architecture for AI",
  },
  status: "PhD research project",
  problem:
    "Most AI systems still treat memory as an afterthought: short-lived context windows, opaque hidden state, or retrieval layers that struggle to represent what should persist, what should fade, and how past experience should shape later behavior. That makes it difficult to study memory itself as an architecture rather than a side effect of prompting or scale.",
  solution:
    "Machines With Human-Like Memory investigates AI memory architectures through successive concrete systems: benchmark environments, heuristic agents, reinforcement-learning agents with explicit memory systems, and later temporal knowledge-graph approaches. Together, those projects turn memory into something that can be modeled, compared, and improved directly rather than left implicit inside a model.",
  impact:
    "This project forms the research base behind several later HumemAI efforts. It connects long-term questions about memory architecture to practical systems work and product direction, and it creates a coherent line of work rather than a set of disconnected papers.",
  acknowledgements: {
    text: "This research was partially funded by the Hybrid Intelligence Center, a 10-year program funded by the Dutch Ministry of Education, Culture and Science through the Netherlands Organisation for Scientific Research (NWO). Learn more at",
    link: {
      label: "Hybrid Intelligence",
      href: hybridIntelligenceUrl,
    },
    trailingText: ".",
  },
  links: [
    { label: "Human-Like Memory Systems", href: "/projects/human-like-memory-systems" },
    { label: "Explicit Memory", href: "/projects/explicit-memory" },
    { label: "RoomKG Baselines", href: "/projects/roomkg-baselines" },
    { label: "KG Memory Transfer", href: "/projects/kg-memory-transfer" },
    { label: "Contact", href: "/contact" },
  ],
};