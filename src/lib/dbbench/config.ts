import type { Metadata } from "next";

// THE DBBENCH SWITCH. One constant gates everything that makes DBBench public:
// the robots tag on /research/dbbench and its lane pages, the card on
// /research, the home-page rail, and the sitemap entries. It is false while the
// pages are drafted. It is flipped to true at the page switch, in the same
// change that enables the redirect in next.config.ts (DBBENCH_REDIRECTS_ON) and
// removes the /research/arcadedb/next preview.
export const DBBENCH_INDEXABLE = false;

// Listed before the switch (issue #28, 2026-10-19): the DBBench preview has a card on /software while the page stays
// noindex and out of the sitemap (both still follow DBBENCH_INDEXABLE). REMOVE WHEN: the page switch sets
// DBBENCH_INDEXABLE, which lists it too.
export const DBBENCH_LISTED = true;

export const dbbenchRobots: NonNullable<Metadata["robots"]> = DBBENCH_INDEXABLE
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true };
