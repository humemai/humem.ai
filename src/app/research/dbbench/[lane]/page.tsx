import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dbbenchRobots } from "@/lib/dbbench/config";
import { dbbenchFirstResults, dbbenchLanes, getDbbenchLane } from "@/lib/dbbench/lanes";
import type { Project } from "@/lib/projects/types";
import {
  dbbenchEnginesUrl,
  dbbenchIssuesUrl,
  dbbenchMethodologyUrl,
} from "@/lib/projects/shared";
import { dbbench } from "@/lib/projects/items/dbbench";
import { EditorialProjectPage } from "../../../_projects/editorial-project-page";

// One page per DBBench lane, from one dynamic route. Hidden (noindex) until DBBENCH_INDEXABLE is flipped, which happens
// when the first results are published (November 2026). Until then a lane page says what the lane measures and lists the
// tables it will carry.

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

  const plannedTables = lane.tables.map((table) => `- ${table.caption}`).join("\n");
  const resultBody = [
    dbbenchFirstResults,
    ...lane.lead,
    "The lane will carry these tables:",
    plannedTables,
    "The rules every result follows are in the [methodology](" + dbbenchMethodologyUrl + "). The settings for each engine are on the [engines page](" + dbbenchEnginesUrl + "). If one is wrong, [tell us](" + dbbenchIssuesUrl + ").",
  ];

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
          eyebrow: "Lane",
          title: "Not published yet.",
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
      parent={{ href: "/research/dbbench", label: "DBBench" }}
      section="research"
      eyebrow="Lane"
    />
  );
}
