import type { NextConfig } from "next";

// THE DBBENCH REDIRECT. The October results are served at
// /projects/arcadedb/next until the page switch, so this is OFF and the
// preview keeps working. It is turned on at the page switch, in the same
// change that sets DBBENCH_INDEXABLE (src/lib/dbbench/config.ts) and removes
// the preview route. The redirect stays for good: the preview URL was sent to
// vendors and maintainers. Next.js answers a permanent redirect with 308, and
// it matches the path with or without a trailing slash, so one source covers
// /projects/arcadedb/next and /projects/arcadedb/next/.
const DBBENCH_REDIRECTS_ON = false;

const dbbenchRedirects = DBBENCH_REDIRECTS_ON
  ? [{ source: "/projects/arcadedb/next", destination: "/projects/dbbench", permanent: true }]
  : [];

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
      {
        // The ArcadeDB project page widened from the Python bindings alone to
        // ArcadeDB as a whole (engine plus embedded distribution), so the slug
        // moved to /projects/arcadedb. The old path is linked from the
        // 2026-01-28 release post, the PyPI page, the GitHub README and the
        // announcement video description, so it has to keep resolving.
        // Permanent: the new URL is canonical and should inherit the ranking.
        source: "/projects/arcadedb-embedded-python",
        destination: "/projects/arcadedb",
        permanent: true,
      },
      // 2026-09-16: HumemAI is an open source organization, not a company,
      // so the Product, Pricing and Careers pages are gone. Old links
      // (search results, the PyPI support thread) land on the closest
      // live page; contributing is covered on the Projects page.
      { source: "/product", destination: "/projects", permanent: true },
      { source: "/pricing", destination: "/about", permanent: true },
      { source: "/careers", destination: "/projects", permanent: true },
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
      { source: "/ourtechnologies.html", destination: "/projects", permanent: true },
      { source: "/research", destination: "/projects", permanent: true },
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
