import type { Metadata } from "next";

// THE DBBENCH SWITCH. One constant gates the robots tag on /research/dbbench and its lane pages, the home-page rail and
// the sitemap entries. It stays false until the first results are published (November 2026), and is flipped to true
// in the change that publishes them. The October preview route is gone; its two URLs always redirect here
// (next.config.ts).
export const DBBENCH_INDEXABLE = false;

// Listed before the switch (issue #28, 2026-10-19): the DBBench preview has a card on /software while the page stays
// noindex and out of the sitemap (both still follow DBBENCH_INDEXABLE). REMOVE WHEN: the page switch sets
// DBBENCH_INDEXABLE, which lists it too.
export const DBBENCH_LISTED = true;

export const dbbenchRobots: NonNullable<Metadata["robots"]> = DBBENCH_INDEXABLE
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true };
