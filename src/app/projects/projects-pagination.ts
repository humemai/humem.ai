import type { Project } from "@/lib/projects";
import { getListingPageCount, getListingPageItems, LISTING_ITEMS_PER_PAGE } from "@/lib/listing-pagination";

export const PROJECTS_PER_PAGE = LISTING_ITEMS_PER_PAGE;

export function getProjectPageCount(totalProjects: number) {
  return getListingPageCount(totalProjects, PROJECTS_PER_PAGE);
}

export function getProjectPageItems(projects: Project[], page: number) {
  return getListingPageItems(projects, page, PROJECTS_PER_PAGE);
}