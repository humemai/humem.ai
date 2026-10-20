import { projectIdForPath, projectPath, projectSections, type Section } from "./sections";
import type { Project } from "./types";
import {
  arcadeDb,
  arcadeDbPython,
  arcadeDbSoftware,
  auditReadyMemory,
  coLearning,
  cypherglot,
  dbbench,
  explicitMemory,
  humanLikeMemorySystems,
  humemdb,
  kgMemoryTransfer,
  roomkgBaselines,
  roomkgMetaPolicies,
} from "./items";

const allProjects: Project[] = [
  arcadeDb,
  arcadeDbPython,
  arcadeDbSoftware,
  auditReadyMemory,
  coLearning,
  cypherglot,
  dbbench,
  explicitMemory,
  humanLikeMemorySystems,
  humemdb,
  kgMemoryTransfer,
  roomkgBaselines,
  roomkgMetaPolicies,
];

// A project with no section is a bug, not a default: it would have no URL.
for (const project of allProjects) {
  if (!(project.slug in projectSections)) {
    throw new Error(`Project "${project.slug}" has no section in src/lib/projects/sections.ts`);
  }
}

// The cards are in the order of projectSections, which is a hand-picked order.
export const projects: Project[] = Object.keys(projectSections)
  .map((slug) => allProjects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** The project whose canonical page is /<section>/<pathSlug>. */
export function getProjectByPath(section: Section, pathSlug: string) {
  const id = projectIdForPath(section, pathSlug);
  return id ? getProject(id) : undefined;
}

export type SectionEntry = {
  project: Project;
  summary: string;
  href: string;
};

/** The cards of one section: its own projects first, then the cross-listed ones from the other section. */
export function getSectionEntries(section: Section): SectionEntry[] {
  const own = projects
    .filter((project) => projectSections[project.slug as keyof typeof projectSections] === section)
    .map((project) => ({ project, summary: project.summary, href: projectPath(project.slug) }));
  const crossListed = projects
    .filter((project) => project.crossListing?.section === section)
    .map((project) => ({
      project,
      summary: project.crossListing!.summary,
      href: `${projectPath(project.slug)}${project.crossListing!.anchor ? `#${project.crossListing!.anchor}` : ""}`,
    }));
  return [...own, ...crossListed];
}

export function getProjectsInSection(section: Section) {
  return projects.filter((project) => projectSections[project.slug as keyof typeof projectSections] === section);
}
