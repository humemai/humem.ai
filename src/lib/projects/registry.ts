import type { Project } from "./types";
import {
  arcadeDbEmbeddedPython,
  auditReadyMemory,
  coLearning,
  cypherglot,
  explicitMemory,
  humanLikeMemorySystems,
  humemdb,
  kgMemoryTransfer,
  machinesWithHumanLikeMemory,
  multiModelDatabases,
  roomkgBaselines,
} from "./items";

const featuredProjectSlugs = [
  "audit-ready-memory",
  "multi-model-databases",
  "machines-with-human-like-memory",
] as const;

export const projects: Project[] = [
  humanLikeMemorySystems,
  explicitMemory,
  roomkgBaselines,
  kgMemoryTransfer,
  coLearning,
  auditReadyMemory,
  multiModelDatabases,
  cypherglot,
  arcadeDbEmbeddedPython,
  humemdb,
  machinesWithHumanLikeMemory,
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return featuredProjectSlugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getProjectsIndexProjects() {
  return projects.filter((project) => project.showOnProjectsIndex);
}

export function getSubprojects(project: Project) {
  return (project.subprojectSlugs ?? [])
    .map((slug, index) => ({ project: getProject(slug), index }))
    .filter((entry): entry is { project: Project; index: number } => Boolean(entry.project))
    .sort((left, right) => {
      const leftOrder = left.project.timelineOrder;
      const rightOrder = right.project.timelineOrder;

      if (leftOrder != null && rightOrder != null) {
        return rightOrder - leftOrder;
      }

      if (leftOrder != null) {
        return -1;
      }

      if (rightOrder != null) {
        return 1;
      }

      return left.index - right.index;
    })
    .map((entry) => entry.project)
}