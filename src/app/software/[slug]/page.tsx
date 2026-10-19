import type { Metadata } from "next";
import { ProjectDetail, projectMetadata, sectionStaticParams } from "../../_projects/project-detail";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return sectionStaticParams("software");
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata(slug, "software");
}

export default async function SoftwareProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} section="software" />;
}
