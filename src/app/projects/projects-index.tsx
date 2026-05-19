"use client";

import Image from "next/image";
import Link from "next/link";
import { PagedCardGrid } from "@/components/paged-card-grid";
import type { Project } from "@/lib/projects";
import styles from "./projects.module.css";

type ProjectsIndexSectionProps = {
  projects: Project[];
  currentPage: number;
  totalPages: number;
};

function getProjectsPageHref(page: number) {
  return page === 1 ? "/projects" : `/projects/page/${page}`;
}

export function ProjectsIndexSection({ projects, currentPage, totalPages }: ProjectsIndexSectionProps) {
  return (
    <section className={styles.projectOverview}>
      <div className={styles.projectOverviewIntro}>
        <div>
          <p className={styles.sectionEyebrow}>Project overview</p>
          <h2>Featured projects.</h2>
        </div>
      </div>

      <PagedCardGrid
        controlsClassName={styles.mobileOverviewControls}
        controlClassName={styles.mobileOverviewControl}
        currentPage={currentPage}
        getPageHref={getProjectsPageHref}
        items={projects}
        leftLabel="Scroll projects left"
        listClassName={styles.overviewGrid}
        paginationClassName={styles.overviewPagination}
        paginationLabel="Projects pagination"
        paginationPageActiveClassName={styles.overviewPaginationPageActive}
        paginationPageClassName={styles.overviewPaginationPage}
        paginationPagesClassName={styles.overviewPaginationPages}
        renderItem={(project) => (
          <Link className={styles.overviewCard} href={`/projects/${project.slug}`} key={project.slug}>
            {project.image ? (
              <div className={styles.overviewImageWrap}>
                <Image
                  alt={project.image.alt}
                  className={styles.overviewImage}
                  fill
                  sizes="(min-width: 1280px) 24rem, (min-width: 720px) 42vw, 100vw"
                  src={project.image.src}
                />
              </div>
            ) : (
              <div className={styles.overviewFallback} />
            )}
            <div className={styles.overviewCardBody}>
              <p className={styles.overviewEyebrow}>{project.status}</p>
              <h2>{project.title}</h2>
              <p className={styles.overviewSummary}>{project.summary}</p>
              <span className={styles.overviewAction}>Learn more</span>
            </div>
          </Link>
        )}
        rightLabel="Scroll projects right"
        totalPages={totalPages}
      />
    </section>
  );
}