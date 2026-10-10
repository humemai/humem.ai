import type { Metadata } from "next";

// THE DBBENCH SWITCH. One constant gates everything that makes DBBench public:
// the robots tag on /projects/dbbench and its lane pages, the card on
// /projects, the home-page rail, and the sitemap entries. It is false while the
// pages are drafted. It is flipped to true at the page switch, in the same
// change that enables the redirect in next.config.ts (DBBENCH_REDIRECTS_ON) and
// removes the /projects/arcadedb/next preview.
export const DBBENCH_INDEXABLE = false;

export const dbbenchRobots: NonNullable<Metadata["robots"]> = DBBENCH_INDEXABLE
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true };
