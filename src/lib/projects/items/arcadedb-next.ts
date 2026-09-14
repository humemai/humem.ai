// October campaign preview prose. Empty on purpose: the October page is built
// from nothing as the campaign fills it, first from the laptop skeleton at
// micro scale and then from mini's real stages, so that what appears here is
// always October's own work rather than September's carried over (user,
// 2026-09-14: "better to start from scratch"). Rendered at
// /projects/arcadedb/next, never registered in the project index, and the live
// page at /projects/arcadedb is never touched by a preview publish
// (DECISIONS #83, #86).
import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl } from "../shared";

export const arcadeDbNext: Project = {
  slug: "arcadedb-next",
  title: "ArcadeDB",
  timelineOrder: 1,
  subprojectPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "engine",
        navLabel: "October",
        eyebrow: "Campaign in progress",
        title: "The October campaign, as it is measured.",
        body: [
          "Nothing has been measured for this page yet. Tables, columns, and prose arrive as the campaign runs: first a skeleton from laptop runs at micro scale, to show the shape, and then the real stages from the bench host.",
        ],
      },
    ],
  },
  summary:
    "The October campaign's page, built from nothing as the campaign runs.",
  image: {
    src: "/images/projects/project-arcadedb-embedded-python.png",
    alt: "Illustration for ArcadeDB",
  },
  problem: "",
  solution: "",
  impact: "",
  links: [
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "Python docs", href: arcadeDbDocsUrl },
  ],
};
