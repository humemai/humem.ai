import { DBBENCH_INDEXABLE, DBBENCH_LISTED } from "../dbbench/config";
import { projectPath, projectSections, type Section } from "./sections";
import type { Project } from "./types";
import {
  arcadeDb,
  arcadeDbPython,
  auditReadyMemory,
  coLearning,
  cypherglot,
  dbbench,
  explicitMemory,
  humanLikeMemorySystems,
  humemdb,
  kgMemoryTransfer,
  machinesWithHumanLikeMemory,
  roomkgBaselines,
  roomkgMetaPolicies,
} from "./items";

const allProjects: Project[] = [
  arcadeDb,
  arcadeDbPython,
  auditReadyMemory,
  coLearning,
  cypherglot,
  dbbench,
  explicitMemory,
  humanLikeMemorySystems,
  humemdb,
  kgMemoryTransfer,
  machinesWithHumanLikeMemory,
  roomkgBaselines,
  roomkgMetaPolicies,
];

// A project with no section is a bug, not a default: it would have no URL.
for (const project of allProjects) {
  if (!(project.slug in projectSections)) {
    throw new Error(`Project "${project.slug}" has no section in src/lib/projects/sections.ts`);
  }
}

// DBBench is standalone. It joins the lists (the section indexes and the home-page rail) when it is listed or
// indexable; the sitemap takes it only when indexable (src/app/sitemap.ts). The order is the order of
// projectSections, which is the order of the cards.
export const projects: Project[] = Object.keys(projectSections)
  .map((slug) => allProjects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project))
  .filter((project) => project.slug !== "dbbench" || DBBENCH_INDEXABLE || DBBENCH_LISTED);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
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
