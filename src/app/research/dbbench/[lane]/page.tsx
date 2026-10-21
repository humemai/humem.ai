import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dbbenchRobots } from "@/lib/dbbench/config";
import { dbbenchFirstResults, dbbenchLanes, getDbbenchLane } from "@/lib/dbbench/lanes";
import { datasetHasTable, loadDbbenchDataset } from "@/lib/dbbench/payload";
import type { Project, ProjectEditorialBodyBlock } from "@/lib/projects/types";
import {
  dbbenchEnginesUrl,
  dbbenchIssuesUrl,
  dbbenchMethodologyUrl,
} from "@/lib/projects/shared";
import { dbbench } from "@/lib/projects/items/dbbench";
import { EditorialProjectPage } from "../../../_projects/editorial-project-page";

// One page per DBBench lane, from one dynamic route. Hidden (noindex) until DBBENCH_INDEXABLE is flipped, which happens
// when the first results are published (November 2026). While src/data/dbbench-benchmarks.json is absent, a lane page says
// what the lane measures and lists the tables it will carry. With the payload it renders the lane's tables; a table the
// payload does not carry (or name as pending) is left out.

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

export default async function DbbenchLanePage({ params }: { params: Promise<Params> }) {
  const { lane: slug } = await params;
  const lane = getDbbenchLane(slug);
  if (!lane) {
    notFound();
  }

  const dataset = loadDbbenchDataset();
  const methodNote =
    "The rules every result follows are in the [methodology](" + dbbenchMethodologyUrl + "). The settings for each engine are on the [engines page](" + dbbenchEnginesUrl + "). If one is wrong, [tell us](" + dbbenchIssuesUrl + ").";
  const laneTables = lane.tables.filter((table) => datasetHasTable(dataset, table.tableId));

  let resultBody: ProjectEditorialBodyBlock[];
  let resultEyebrow = "Lane";
  let resultTitle = "Not published yet.";
  if (!dataset) {
    const plannedTables = lane.tables.map((table) => `- ${table.caption}`).join("\n");
    resultBody = [dbbenchFirstResults, ...lane.lead, "The lane will carry these tables:", plannedTables, methodNote];
  } else if (laneTables.length > 0) {
    resultEyebrow = "Results";
    resultTitle = "Tasks and results.";
    resultBody = [
      ...lane.lead,
      ...laneTables.map(
        (table): ProjectEditorialBodyBlock => ({
          type: "benchmarkTable",
          tableId: table.tableId,
          caption: table.caption,
          showDigests: table.showDigests,
        }),
      ),
      methodNote,
    ];
  } else {
    resultBody = [
      `The ${lane.title.toLowerCase()} lane has no published results yet. They appear here when its first measurement is complete.`,
      ...lane.lead,
      methodNote,
    ];
  }

  const otherLanes = dbbenchLanes
    .filter((candidate) => candidate.slug !== lane.slug)
    .map((candidate) => `- [${candidate.title}](/research/dbbench/${candidate.slug}): ${candidate.blurb}`)
    .join("\n");

  const project: Project = {
    slug: `dbbench-${lane.slug}`,
    title: lane.title,
    summary: lane.blurb,
    image: dbbench.image,
    problem: "",
    solution: "",
    links: [
      { label: "All DBBench lanes", href: "/research/dbbench" },
      { label: "Methodology", href: dbbenchMethodologyUrl },
      { label: "Engine settings", href: dbbenchEnginesUrl },
      { label: "Report a wrong setting", href: dbbenchIssuesUrl },
    ],
    editorialPage: {
      layout: "editorial",
      linksHeading: "Rules and code.",
      sections: [
        {
          id: "results",
          navLabel: "Results",
          eyebrow: resultEyebrow,
          title: resultTitle,
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
      parent={{ href: "/research/dbbench", label: "DBBench" }}
      section="research"
      eyebrow="Lane"
    />
  );
}
