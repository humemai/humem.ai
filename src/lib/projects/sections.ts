// Which section each project's canonical page lives in. A plain module with no imports, so next.config.ts can read it
// to generate the /projects redirects and the two can never drift apart.
//
// Software: things you install or run. Research: things you read and cite. A project has ONE canonical page, under
// the section it is mainly about; it may also have a card in the other section (Project.crossListing).
//
// The order of the keys is the order of the cards on the index pages and the home page: newest first (a project's
// first release or first paper). A new project goes at the top of its section.
export type Section = "software" | "research";

export const projectSections = {
  dbbench: "software",
  "audit-ready-memory": "software",
  cypherglot: "software",
  humemdb: "software",
  "arcadedb-python": "software",
  arcadedb: "research",
  "machines-with-human-like-memory": "research",
  "roomkg-meta-policies": "research",
  "co-learning": "research",
  "kg-memory-transfer": "research",
  "roomkg-baselines": "research",
  "explicit-memory": "research",
  "human-like-memory-systems": "research",
} as const satisfies Record<string, Section>;

export type ProjectSlug = keyof typeof projectSections;

export function projectPath(slug: string): string {
  const section = (projectSections as Record<string, Section | undefined>)[slug];
  if (!section) {
    throw new Error(`Project "${slug}" has no section in src/lib/projects/sections.ts`);
  }
  return `/${section}/${slug}`;
}
