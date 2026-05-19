"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const amount = Math.max(rail.clientWidth * 0.85, 320);
    rail.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.projectOverview}>
      <div className={styles.projectOverviewIntro}>
        <div>
          <p className={styles.sectionEyebrow}>Project overview</p>
          <h2>Featured projects.</h2>
        </div>
      </div>

      {projects.length > 1 ? (
        <div className={styles.mobileOverviewControls}>
          <button aria-label="Scroll projects left" className={styles.mobileOverviewControl} onClick={() => scrollRail("left")} type="button">
            <span aria-hidden="true">←</span>
          </button>
          <button aria-label="Scroll projects right" className={styles.mobileOverviewControl} onClick={() => scrollRail("right")} type="button">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}

      <div className={styles.overviewGrid} ref={railRef}>
        {projects.map((project) => (
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
        ))}
      </div>

      {totalPages > 1 ? (
        <nav aria-label="Projects pagination" className={styles.overviewPagination}>
          <div className={styles.overviewPaginationPages}>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <Link
                  aria-current={page === currentPage ? "page" : undefined}
                  className={page === currentPage ? styles.overviewPaginationPageActive : styles.overviewPaginationPage}
                  href={getProjectsPageHref(page)}
                  key={page}
                >
                  {page}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </section>
  );
}