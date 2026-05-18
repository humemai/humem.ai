import type { Project } from "./types";
import {
  arcadeDbEmbeddedPython,
  auditReadyMemory,
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

export function getSubprojects(project: Project) {
  return (project.subprojectSlugs ?? [])
    .map((slug) => getProject(slug))
    .filter((subproject): subproject is Project => Boolean(subproject));
}