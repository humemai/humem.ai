import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BenchmarkDataset } from "@/components/editorial-sections";
import { dbbenchRobots } from "@/lib/dbbench/config";
import { dbbenchLanes, getDbbenchLane } from "@/lib/dbbench/lanes";
import type { DbbenchLane } from "@/lib/dbbench/lanes";
import { loadDbbenchDataset } from "@/lib/dbbench/payload";
import type { Project, ProjectEditorialBodyBlock } from "@/lib/projects/types";
import {
  dbbenchEnginesUrl,
  dbbenchIssuesUrl,
  dbbenchMethodologyUrl,
} from "@/lib/projects/shared";
import { dbbench } from "@/lib/projects/items/dbbench";
import { EditorialProjectPage } from "../../editorial-project-page";

// One page per DBBench lane, from one dynamic route. Hidden (noindex) until
// DBBENCH_INDEXABLE is flipped at the page switch. A lane page renders only
// that lane's tables, from the same payload as the project page.

type Params = { lane: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return dbbenchLanes.map((lane) => ({ lane: lane.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lane: slug } = await params;
  const lane = getDbbenchLane(slug);
  if (!lane) {
    return { title: "DBBench" };
  }
  return {
    title: `DBBench ${lane.title.toLowerCase()}`,
    description: lane.blurb,
    robots: dbbenchRobots,
    openGraph: dbbench.image ? { images: [{ url: dbbench.image.src, alt: dbbench.image.alt }] } : undefined,
    twitter: dbbench.image ? { card: "summary_large_image", images: [dbbench.image.src] } : undefined,
  };
}

// A lane has something to show when the payload carries one of its tables with
// rows, or names one as still being measured. Otherwise the page says the lane
// has no published results, instead of a heading with nothing under it.
function laneHasContent(lane: DbbenchLane, dataset: BenchmarkDataset) {
  return lane.tables.some(
    (table) =>
      dataset.tables.some((candidate) => candidate.id === table.tableId && candidate.entries.length > 0) ||
      Boolean(dataset.pending_tables?.[table.tableId]),
  );
}

export default async function DbbenchLanePage({ params }: { params: Promise<Params> }) {
  const { lane: slug } = await params;
  const lane = getDbbenchLane(slug);
  if (!lane) {
    notFound();
  }

  const dataset = loadDbbenchDataset();
  const hasContent = laneHasContent(lane, dataset);

  const resultBody: ProjectEditorialBodyBlock[] = hasContent
    ? [
        ...lane.lead,
        ...lane.tables.map(
          (table): ProjectEditorialBodyBlock => ({
            type: "benchmarkTable",
            tableId: table.tableId,
            caption: table.caption,
            showDigests: table.showDigests,
          }),
        ),
        "The rules every result follows are in the [methodology](" + dbbenchMethodologyUrl + "). The settings for each engine are on the [engines page](" + dbbenchEnginesUrl + "). If one is wrong, [tell us](" + dbbenchIssuesUrl + ").",
      ]
    : [
        `The ${lane.title.toLowerCase()} lane has no published results yet. They appear here when its first measurement is complete.`,
        ...lane.lead,
        "The rules this lane will follow are in the [methodology](" + dbbenchMethodologyUrl + ").",
      ];

  const otherLanes = dbbenchLanes
    .filter((candidate) => candidate.slug !== lane.slug)
    .map((candidate) => `- [${candidate.title}](/projects/dbbench/${candidate.slug}): ${candidate.blurb}`)
    .join("\n");

  const project: Project = {
    slug: `dbbench-${lane.slug}`,
    title: lane.title,
    summary: lane.blurb,
    image: dbbench.image,
    problem: "",
    solution: "",
    links: [
      { label: "All DBBench lanes", href: "/projects/dbbench" },
      { label: "Methodology", href: dbbenchMethodologyUrl },
      { label: "Engine settings", href: dbbenchEnginesUrl },
      { label: "Report a wrong setting", href: dbbenchIssuesUrl },
    ],
    subprojectPage: {
      layout: "editorial",
      linksHeading: "Rules and code.",
      sections: [
        {
          id: "results",
          navLabel: "Results",
          eyebrow: hasContent ? "Results" : "Lane",
          title: hasContent ? "Tasks and results." : "Not published yet.",
          body: resultBody,
        },
        {
          id: "lanes",
          navLabel: "Other lanes",
          eyebrow: "DBBench",
          title: "The other lanes.",
          body: [otherLanes],
        },
      ],
    },
  };

  return (
    <EditorialProjectPage
      project={project}
      dataset={dataset}
      parent={{ href: "/projects/dbbench", label: "DBBench" }}
      eyebrow="Lane"
    />
  );
}
