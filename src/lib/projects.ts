export type Project = {
  slug: string;
  title: string;
  summary: string;
  funding?: string;
  status: string;
  problem: string;
  solution: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "audit-ready-memory",
    title: "Audit-Ready Memory",
    summary:
      "Local-first, auditable memory for AI agents with transparent logs, deterministic replay, and explicit deletion workflows.",
    funding: "Funded by SIDN Fund",
    status: "Active project",
    problem:
      "Most agent memory systems are hard to inspect, difficult to replay, and weak at deletion and compliance workflows.",
    solution:
      "Audit-Ready Memory focuses on traceable memory operations, transparent logs, and local-first controls so teams can trust what their agents remember.",
    links: [
      { label: "Contact HumemAI", href: "/contact" },
      { label: "View GitHub", href: "https://github.com/humemai" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}