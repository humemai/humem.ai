import type { Metadata } from "next";
import { ProjectDetail, projectMetadata, sectionStaticParams } from "../../_projects/project-detail";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return sectionStaticParams("research");
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata(slug, "research");
}

export default async function ResearchProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} section="research" />;
}
