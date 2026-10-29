// Which section each project's canonical page lives in. A plain module with no imports, so next.config.ts can read it
// to generate the /projects redirects and the two can never drift apart.
//
// Software: things you install or run. Research: things you read and cite. A project has ONE canonical page, under
// the section it is mainly about; it may also have a card in the other section (Project.crossListing).
//
// The order of the keys is the order of the cards on the index pages and the home page, picked by hand: a new
// project goes where you want its card.
export type Section = "software" | "research";

export const projectSections = {
  "arcadedb-software": "software",
  "arcadedb-python-software": "software",
  "audit-ready-memory": "software",
  cypherglot: "software",
  humemdb: "software",
  arcadedb: "research",
  dbbench: "research",
  "arcadedb-python": "research",
  "roomkg-meta-policies": "research",
  "kg-memory-transfer": "research",
  "roomkg-baselines": "research",
  "co-learning": "research",
  "explicit-memory": "research",
  "human-like-memory-systems": "research",
} as const satisfies Record<string, Section>;

// A project is known by its id (the key above); the URL uses the id unless it is listed here. ArcadeDB and ArcadeDB in
// Python each have a page in both sections, so the Software pages keep their own ids and take the same URL slugs in
// their own section.
const pathSlugs: Record<string, string> = { "arcadedb-software": "arcadedb", "arcadedb-python-software": "arcadedb-python" };

export function projectPathSlug(id: string): string {
  return pathSlugs[id] ?? id;
}

/** The project whose canonical page is /<section>/<pathSlug>, or undefined. */
export function projectIdForPath(section: Section, pathSlug: string): string | undefined {
  return Object.keys(projectSections).find(
    (id) => (projectSections as Record<string, Section>)[id] === section && projectPathSlug(id) === pathSlug,
  );
}

export type ProjectSlug = keyof typeof projectSections;

export function projectPath(slug: string): string {
  const section = (projectSections as Record<string, Section | undefined>)[slug];
  if (!section) {
    throw new Error(`Project "${slug}" has no section in src/lib/projects/sections.ts`);
  }
  return `/${section}/${projectPathSlug(slug)}`;
}
