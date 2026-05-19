import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <section className={styles.indexHero}>
        <div className={styles.indexHeroCopy}>
          <p className={styles.indexEyebrow}>Projects</p>
          <h1>Open source projects behind HumemAI.</h1>
          <p className={styles.indexIntro}>
            Browse the three major project lines first, then open each dedicated project page to explore the subprojects, systems, and research inside it.
          </p>
          <div className={styles.indexActions}>
            <Link className={styles.indexPrimaryAction} href="https://github.com/humemai" target="_blank" rel="noopener noreferrer">
              View HumemAI on GitHub
            </Link>
            <Link className={styles.indexSecondaryAction} href="/contact">
              Contact HumemAI
            </Link>
          </div>
        </div>

        <figure className={styles.indexHeroFigure}>
          <div className={styles.indexHeroImageWrap}>
            <Image
              src="/illustrations/projects-overview-portfolio.png"
              alt="Illustration representing research, systems work, and applied AI memory projects"
              fill
              className={styles.indexHeroImage}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </figure>
      </section>

      <ProjectsIndexSection currentPage={pageNumber} projects={visibleProjects} totalPages={totalPages} />
    </main>
  );
}