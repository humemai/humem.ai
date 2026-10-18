import { DBBENCH_INDEXABLE, DBBENCH_LISTED } from "../dbbench/config";
import { PAUSED_DB_PROJECTS_SHOWN } from "./shared";
import type { Project } from "./types";
import {
  arcadeDb,
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

const featuredProjectSlugs = [
  "audit-ready-memory",
  "arcadedb",
  "machines-with-human-like-memory",
] as const;

export const projects: Project[] = [
  humanLikeMemorySystems,
  explicitMemory,
  roomkgBaselines,
  kgMemoryTransfer,
  roomkgMetaPolicies,
  coLearning,
  auditReadyMemory,
  // DBBench is standalone: a project line of its own. It joins the registry (the projects index and the home-page
  // rail) when it is listed or indexable; the sitemap takes it only when indexable (src/app/sitemap.ts).
  ...(DBBENCH_INDEXABLE || DBBENCH_LISTED ? [dbbench] : []),
  // CypherGLOT and HumemDB are paused: listed only when PAUSED_DB_PROJECTS_SHOWN is on (shared.ts).
  ...(PAUSED_DB_PROJECTS_SHOWN ? [cypherglot] : []),
  arcadeDb,
  ...(PAUSED_DB_PROJECTS_SHOWN ? [humemdb] : []),
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