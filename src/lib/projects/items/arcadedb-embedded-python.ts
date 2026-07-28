import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl, arcadeDbWebsiteUrl } from "../shared";

export const arcadeDbEmbeddedPython: Project = {
  slug: "arcadedb-embedded-python",
  title: "ArcadeDB Embedded Python",
  timelineOrder: 1,
  subprojectPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "distribution",
        navLabel: "Distribution",
        eyebrow: "Distribution",
        title: "Turn the original Java-based ArcadeDB into a Python-native distribution.",
        body: [
          "The original ArcadeDB project is powerful, but its Java-first setup creates friction for Python developers who want to install it like a package, run it locally, and embed it directly inside application workflows.",
          "ArcadeDB Embedded Python exists to remove that friction. It keeps the upstream ArcadeDB engine at the core, then repackages it for Python with native bindings, platform-specific wheels, and a bundled JRE so Python users can start from a familiar packaging model.",
        ],
        figure: {
          label: "Figure 1",
          title: "Packaging stack",
          caption:
            "The subproject keeps the upstream ArcadeDB engine intact while repackaging it as a Python-facing distribution layer.",
          points: [
            "Original Java-based ArcadeDB engine",
            "Bundled JRE per supported platform",
            "Native Python bindings",
            "Wheel-based Python distribution",
          ],
        },
      },
      {
        id: "runtime",
        navLabel: "Runtime",
        eyebrow: "Runtime",
        title: "Use ArcadeDB locally, in process, and without separate setup steps.",
        body: [
          "The main value is not just access to ArcadeDB from Python, but access in a form that fits local tooling, tests, and embedded application code. Developers should be able to install the package and start using the database without first setting up a separate Java environment or standalone service.",
          "Optional server mode is still there when it helps, but the project is intentionally optimized around in-process embedded usage from Python workflows.",
        ],
        figure: {
          label: "Figure 2",
          title: "Runtime modes",
          caption:
            "The distribution is centered on embedded Python usage while preserving access to broader ArcadeDB runtime patterns.",
          points: [
            "Embedded in-process database usage",
            "Optional server mode when needed",
            "CI-validated examples and tests",
            "Linux and macOS wheel targets",
          ],
        },
      },
      {
        id: "surface",
        navLabel: "Surface",
        eyebrow: "Surface",
        title: "Expose a real Python package surface instead of a thin wrapper.",
        body: [
          "This subproject is more than a launcher around the upstream engine. It exposes transactions, schema management, graph helpers, export paths, and vector-related capabilities as a maintained Python package surface.",
          "That is the real reason it exists as a standalone subproject: to make ArcadeDB feel like a usable Python dependency rather than a one-off interoperability experiment.",
        ],
        figure: {
          label: "Figure 3",
          title: "Python package surface",
          caption:
            "The maintained surface is meant to support real Python usage patterns rather than a demo-only integration story.",
          points: [
            "Transactions and lifecycle management",
            "Schema and graph helpers",
            "Export and import paths",
            "Vector and multi-model features",
          ],
        },
      },
    ],
  },
  summary:
    "A Python-facing distribution built on top of the original Java-based ArcadeDB, with native bindings, embedded execution, and a cleaner path to graph, vector, and multi-model workloads from Python.",
  image: {
    src: "/images/projects/project-arcadedb-embedded-python.png",
    alt: "Illustration for ArcadeDB Embedded Python",
  },
  problem:
    "The original ArcadeDB project is powerful, but its Java-first setup creates friction for Python developers who want to install it like a package, run it locally, and embed it directly inside application workflows. That slows down experimentation for graph, vector, and agent tooling that should run close to the application.",
  solution:
    "ArcadeDB Embedded Python is a derivative integration layer built on the original Java-based ArcadeDB project. It repackages that engine for Python with native bindings, a bundled JRE, platform-specific wheels, embedded in-process usage, optional server mode, and CI-validated examples so developers can use ArcadeDB from Python with much less operational friction.",
  impact:
    "The project makes clear why this subproject exists: not to replace ArcadeDB, but to make the original engine far more usable inside the Python ecosystem. That gives Python developers a more practical way to adopt ArcadeDB locally for testing, embedded analytics, graph exploration, and vector-heavy AI tooling.",
  links: [
    { label: "Read docs", href: arcadeDbDocsUrl },
    { label: "View GitHub", href: arcadeDbRepoUrl },
    { label: "Visit ArcadeDB", href: arcadeDbWebsiteUrl },
    { label: "Upstream repository", href: arcadeDbUpstreamRepoUrl },
  ],
};