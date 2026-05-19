"use client";

import Image from "next/image";
import Link from "next/link";
import { PagedCardGrid } from "@/components/paged-card-grid";
import { SectionIntro } from "@/components/section-blocks";
import type { Project } from "@/lib/projects";
import styles from "./projects.module.css";

type SubprojectsSectionProps = {
  projectSlug: string;
  subprojects: Project[];
  currentPage: number;
  totalPages: number;
};

function getSubprojectsPageHref(projectSlug: string, page: number) {
  return page === 1 ? `/projects/${projectSlug}` : `/projects/${projectSlug}?subprojectsPage=${page}`;
}

export function SubprojectsSection({ projectSlug, subprojects, currentPage, totalPages }: SubprojectsSectionProps) {
  return (
    <>
      <SectionIntro eyebrow="Project structure" title="Subprojects.">
        <p>
          Browse the systems, papers, and implementations that make up this project line.
        </p>
      </SectionIntro>

      <section className={styles.subprojectsSection}>
        <PagedCardGrid
          controlsClassName={styles.mobileOverviewControls}
          controlClassName={styles.mobileOverviewControl}
          currentPage={currentPage}
          getPageHref={(page) => getSubprojectsPageHref(projectSlug, page)}
          items={subprojects}
          leftLabel="Scroll subprojects left"
          listClassName={styles.subprojectGrid}
          paginationClassName={styles.overviewPagination}
          paginationLabel="Subprojects pagination"
          paginationPageActiveClassName={styles.overviewPaginationPageActive}
          paginationPageClassName={styles.overviewPaginationPage}
          paginationPagesClassName={styles.overviewPaginationPages}
          renderItem={(subproject) => {
          const image = subproject.image;

          return (
            <Link className={styles.subprojectCard} href={`/projects/${subproject.slug}`} key={subproject.slug}>
              {image ? (
                <div className={styles.subprojectImageWrap}>
                  <Image
                    alt={image.alt}
                    className={styles.subprojectImage}
                    fill
                    sizes="(min-width: 1280px) 24rem, (min-width: 720px) 42vw, 100vw"
                    src={image.src}
                  />
                </div>
              ) : (
                <div className={styles.subprojectFallback} />
              )}
              <div className={styles.subprojectContent}>
                <p className={styles.subprojectEyebrow}>{subproject.status}</p>
                <h4>{subproject.title}</h4>
                <p className={styles.subprojectSummary}>{subproject.summary}</p>
                <span className={styles.subprojectAction}>Learn more</span>
              </div>
            </Link>
          );
        }}
          rightLabel="Scroll subprojects right"
          totalPages={totalPages}
        />
      </section>
    </>
  );
}