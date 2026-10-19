export type { Project } from "./projects/types";
export { getProject, getProjectByPath, getProjectsInSection, getSectionEntries, projects } from "./projects/registry";
export type { SectionEntry } from "./projects/registry";
export { projectPath, projectPathSlug, projectSections } from "./projects/sections";
export type { Section } from "./projects/sections";
