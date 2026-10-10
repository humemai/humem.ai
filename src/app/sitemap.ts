import type { MetadataRoute } from "next";
import { getAllNewsPosts } from "@/lib/news-posts";
import { DBBENCH_INDEXABLE } from "@/lib/dbbench/config";
import { dbbenchLanes } from "@/lib/dbbench/lanes";
import { projects } from "@/lib/projects";

const SITE = "https://humem.ai";

// Every public page, so search engines find the pages (and their link cards)
// without having to crawl for them. Paginated listings and the ArcadeDB
// benchmark preview are left out on purpose.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/news", "/contact", "/privacy-policy"];
  return [
    ...pages.map((path) => ({ url: `${SITE}${path}` })),
    ...projects.map((project) => ({ url: `${SITE}/projects/${project.slug}` })),
    // The lane pages go with the project page (DBBENCH_INDEXABLE).
    ...(DBBENCH_INDEXABLE ? dbbenchLanes.map((lane) => ({ url: `${SITE}/projects/dbbench/${lane.slug}` })) : []),
    ...getAllNewsPosts().map((post) => ({ url: `${SITE}/news/${post.slug}` })),
  ];
}
