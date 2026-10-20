import type { Metadata } from "next";

// THE DBBENCH SWITCH. One constant gates the robots tag on /research/dbbench and its lane pages and the sitemap
// entries. It was flipped to true at the page switch, in the same change that enabled the redirect in next.config.ts
// (next.config.ts) and removed the /research/arcadedb/next preview. The project card is always listed.
export const DBBENCH_INDEXABLE = true;

export const dbbenchRobots: NonNullable<Metadata["robots"]> = DBBENCH_INDEXABLE
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true };
