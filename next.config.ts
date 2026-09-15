import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A gate build run by the benchmark publish scripts writes to its own
  // directory, so it never replaces the .next a running `next dev` or
  // `next start` in this checkout is serving from (2026-09-16: repeated
  // gate builds left the local dev server answering 500 on every route).
  // Vercel and a plain `npm run build` keep the default.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
