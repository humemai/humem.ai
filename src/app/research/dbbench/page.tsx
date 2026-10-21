import type { Metadata } from "next";
import { dbbenchRobots } from "@/lib/dbbench/config";
import { loadDbbenchDataset } from "@/lib/dbbench/payload";
import { dbbenchProjectWithResults } from "@/lib/dbbench/results";
import { dbbench } from "@/lib/projects/items/dbbench";
import { EditorialProjectPage } from "../../_projects/editorial-project-page";

// The DBBench project page. It reads src/data/dbbench-benchmarks.json (src/lib/dbbench/payload.ts); while that file is
// absent it publishes no result and renders its method and lanes only. Hidden (noindex) until DBBENCH_INDEXABLE is
// flipped, which happens when the first results are published (November 2026).

export const metadata: Metadata = {
  title: "DBBench",
  description: dbbench.summary,
  robots: dbbenchRobots,
  openGraph: dbbench.image ? { images: [{ url: dbbench.image.src, alt: dbbench.image.alt }] } : undefined,
  twitter: dbbench.image ? { card: "summary_large_image", images: [dbbench.image.src] } : undefined,
};

export default function DbbenchPage() {
  const dataset = loadDbbenchDataset();
  return <EditorialProjectPage project={dbbenchProjectWithResults(dbbench, dataset)} dataset={dataset} />;
}
