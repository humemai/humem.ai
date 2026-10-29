import type { NextConfig } from "next";

import { projectPath, projectSections } from "./src/lib/projects/sections";

// A URL that has been published never breaks: a moved page ships with a permanent redirect (Next.js answers 308),
// and it points straight at the final page, never at another redirect.
//
// THE DBBENCH REDIRECT. The October preview was served at /research/arcadedb/next. The route is gone and both preview
// URLs answer 308 straight to /research/dbbench. The redirect stays for good: the preview URL was sent to vendors and
// maintainers. It matches with or without a trailing slash. The old /projects/arcadedb/next preview URL goes straight to
// DBBench too, so it never chains through /research.
const dbbenchRedirects = [
  { source: "/research/arcadedb/next", destination: "/research/dbbench", permanent: true },
  { source: "/projects/arcadedb/next", destination: "/research/dbbench", permanent: true },
];

// Every page of the old /projects section, generated from the section map so the redirects cannot drift from the
// pages. The DBBench lane pages moved with their project.
const projectsRedirects = [
  ...Object.keys(projectSections).filter((slug) => slug !== "arcadedb-software").map((slug) => ({
    source: `/projects/${slug}`,
    destination: projectPath(slug),
    permanent: true,
  })),
  { source: "/projects/dbbench/:lane", destination: "/research/dbbench/:lane", permanent: true },
  // DBBench was on /software for a day. It is a page you read and cite, so it lives in Research.
  { source: "/software/dbbench", destination: "/research/dbbench", permanent: true },
  { source: "/software/dbbench/:lane", destination: "/research/dbbench/:lane", permanent: true },
  // Slugs retired before the sections existed. Each points straight at the final page.
  { source: "/projects/arcadedb-embedded-python", destination: projectPath("arcadedb-python-software"), permanent: true },
  { source: "/projects/multi-model-databases", destination: projectPath("arcadedb"), permanent: true },
  // The Software page was published for a day as ArcadeDB for Python.
  // The Machines With Human-Like Memory overview page was removed: the papers are listed on /research.
  { source: "/projects/machines-with-human-like-memory", destination: "/research", permanent: true },
  { source: "/research/machines-with-human-like-memory", destination: "/research", permanent: true },
  // The old paginated index. The sections hold fewer cards than one page.
  { source: "/projects/page/:page", destination: "/software", permanent: true },
  { source: "/projects", destination: "/software", permanent: true },
];

const nextConfig: NextConfig = {
  // A gate build run by the benchmark publish scripts writes to its own
  // directory, so it never replaces the .next a running `next dev` or
  // `next start` in this checkout is serving from (2026-09-16: repeated
  // gate builds left the local dev server answering 500 on every route).
  // Vercel and a plain `npm run build` keep the default.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  async redirects() {
    return [
      ...dbbenchRedirects,
      ...projectsRedirects,
      // 2026-09-16: HumemAI is an open source organization, not a company,
      // so the Product, Pricing and Careers pages are gone. Old links
      // (search results, the PyPI support thread) land on the closest
      // live page; contributing is covered on the Software and Research pages.
      { source: "/product", destination: "/software", permanent: true },
      { source: "/pricing", destination: "/about", permanent: true },
      { source: "/careers", destination: "/software", permanent: true },
      // 2026-09-27: URLs from the site's earlier versions that search engines
      // and the Wayback Machine still hold, found by testing every humem.ai URL
      // the Wayback CDX API lists. Each went to a 404; each now lands on the
      // page that replaced it.
      { source: "/blog/posts/2022-04-04-first-paper", destination: "/news/human-like-memory-systems", permanent: true },
      { source: "/blog/posts/2024-10-24-youtube", destination: "/news/youtube", permanent: true },
      { source: "/blog/posts/2026-01-28-arcadedb-embedded-python-bindings", destination: "/news/arcadedb-embedded-python-bindings", permanent: true },
      { source: "/blog/:path*", destination: "/news", permanent: true },
      { source: "/blog.html", destination: "/news", permanent: true },
      { source: "/2024-03-01-design-humemai", destination: "/news", permanent: true },
      { source: "/humemaiandyou.html", destination: "/about", permanent: true },
      { source: "/whoweare.html", destination: "/about", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/ourtechnologies.html", destination: "/software", permanent: true },
      { source: "/terms-of-service", destination: "/privacy-policy", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // The favicon lives in the vendored design system (public/brand).
      // Browsers and crawlers that ignore the <link> tags still ask for
      // /favicon.ico, so it answers from the same file.
      { source: "/favicon.ico", destination: "/brand/export/favicon.ico" },
    ];
  },
};

export default nextConfig;
