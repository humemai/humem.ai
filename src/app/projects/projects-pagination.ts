import type { Project } from "@/lib/projects";
import { LISTING_ITEMS_PER_PAGE } from "@/lib/listing-pagination";

export const PROJECTS_PER_PAGE = LISTING_ITEMS_PER_PAGE;

export function getProjectPageCount(totalProjects: number) {
  return Math.max(1, Math.ceil(totalProjects / PROJECTS_PER_PAGE));
}

export function getProjectPageItems(projects: Project[], page: number) {
  const start = (page - 1) * PROJECTS_PER_PAGE;
  return projects.slice(start, start + PROJECTS_PER_PAGE);
}