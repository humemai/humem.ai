// Which section each project's canonical page lives in. A plain module with no imports, so next.config.ts can read it
// to generate the /projects redirects and the two can never drift apart.
//
// Software: things you install or run. Research: things you read and cite. A project has ONE canonical page, under
// the section it is mainly about; it may also have a card in the other section (Project.crossListing).
//
// The cards are sorted newest first by Project.date, so the order of the keys here does not matter, except as the
// tie-break for two projects with the same date.
export type Section = "software" | "research";

export const projectSections = {
  dbbench: "software",
  "audit-ready-memory": "software",
  cypherglot: "software",
  humemdb: "software",
  "arcadedb-software": "software",
  arcadedb: "research",
  "roomkg-meta-policies": "research",
  "co-learning": "research",
  "kg-memory-transfer": "research",
  "roomkg-baselines": "research",
  "explicit-memory": "research",
  "human-like-memory-systems": "research",
} as const satisfies Record<string, Section>;

// A project is known by its id (the key above); the URL uses the id unless it is listed here. ArcadeDB has a page in
// each section, so the Software page keeps its own id and takes the same URL slug in its own section.
const pathSlugs: Record<string, string> = { "arcadedb-software": "arcadedb" };

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
