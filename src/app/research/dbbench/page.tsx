import type { Metadata } from "next";
import { dbbenchRobots } from "@/lib/dbbench/config";
import { dbbench } from "@/lib/projects/items/dbbench";
import { EditorialProjectPage } from "../../_projects/editorial-project-page";

// The DBBench project page. It publishes no result yet; the first results come in November 2026. Hidden (noindex)
// until DBBENCH_INDEXABLE is flipped, which happens when they are published.

export const metadata: Metadata = {
  title: "DBBench",
  description: dbbench.summary,
  robots: dbbenchRobots,
  openGraph: dbbench.image ? { images: [{ url: dbbench.image.src, alt: dbbench.image.alt }] } : undefined,
  twitter: dbbench.image ? { card: "summary_large_image", images: [dbbench.image.src] } : undefined,
};

export default function DbbenchPage() {
  return <EditorialProjectPage project={dbbench} />;
}
