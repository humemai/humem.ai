import type { Metadata } from "next";
import { dbbenchRobots } from "@/lib/dbbench/config";
import { loadDbbenchDataset } from "@/lib/dbbench/payload";
import { dbbench } from "@/lib/projects/items/dbbench";
import { EditorialProjectPage } from "../../_projects/editorial-project-page";

// The DBBench project page. Robots follow DBBENCH_INDEXABLE.

export const metadata: Metadata = {
  title: "DBBench",
  description: dbbench.summary,
  robots: dbbenchRobots,
  openGraph: dbbench.image ? { images: [{ url: dbbench.image.src, alt: dbbench.image.alt }] } : undefined,
  twitter: dbbench.image ? { card: "summary_large_image", images: [dbbench.image.src] } : undefined,
};

export default function DbbenchPage() {
  const dataset = loadDbbenchDataset();
  // A skeleton payload carries placeholder numbers; say so before anything else.
  const banner = dataset.skeleton ? (
    <p>
      <strong>Placeholder numbers from a laptop that was busy with other work.</strong> {dataset.skeleton_banner}
    </p>
  ) : (
    <p>
      Measurements are added as each run completes. A table that is not finished says so where its numbers will go.
    </p>
  );
  return <EditorialProjectPage project={dbbench} dataset={dataset} banner={banner} />;
}
