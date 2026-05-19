import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { getProjectsIndexProjects } from "@/lib/projects";
import { ProjectsIndexSection } from "../../projects-index";
import { getProjectPageCount, getProjectPageItems } from "../../projects-pagination";
import styles from "../../projects.module.css";

type Params = {
  page: string;
};

export function generateStaticParams() {
  const totalPages = getProjectPageCount(getProjectsIndexProjects().length);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    return {
      title: "Projects",
      description: "Browse flagship HumemAI projects and the dedicated page for each one.",
    };
  }

  return {
    title: `Projects - Page ${pageNumber}`,
    description: `Page ${pageNumber} of HumemAI project overviews.`,
  };
}

export default async function ProjectsPaginationPage({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);
  const indexProjects = getProjectsIndexProjects();
  const totalPages = getProjectPageCount(indexProjects.length);

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const visibleProjects = getProjectPageItems(indexProjects, pageNumber);

  return (
    <main className={styles.indexPage}>
      <PageHero
        eyebrow="Projects"
        title="Open source projects behind HumemAI."
        intro="Browse the three major project lines first, then open each dedicated project page to explore the subprojects, systems, and research inside it."
        imageSrc="/illustrations/projects-overview-portfolio.png"
        imageAlt="Illustration representing research, systems work, and applied AI memory projects"
        actions={[
          { href: "https://github.com/humemai", label: "View HumemAI on GitHub" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      />

      <ProjectsIndexSection currentPage={pageNumber} projects={visibleProjects} totalPages={totalPages} />
    </main>
  );
}