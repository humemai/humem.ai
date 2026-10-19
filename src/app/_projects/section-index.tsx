"use client";

import Image from "next/image";
import Link from "next/link";
import { PagedCardGrid } from "@/components/paged-card-grid";
import type { SectionEntry } from "@/lib/projects";
import styles from "./projects.module.css";

type SectionIndexProps = {
  entries: SectionEntry[];
  eyebrow: string;
  title: string;
  /** Plural noun for the screen-reader labels, e.g. "software" or "research". */
  noun: string;
  actionLabel: string;
};

export function SectionIndex({ entries, eyebrow, title, noun, actionLabel }: SectionIndexProps) {
  return (
    <section className={styles.projectOverview}>
      <div className={styles.projectOverviewIntro}>
        <div>
          <p className={styles.sectionEyebrow}>{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>

      <PagedCardGrid
        controlsClassName={styles.mobileOverviewControls}
        controlClassName={styles.mobileOverviewControl}
        items={entries}
        pageQueryParam="page"
        leftLabel={`Scroll ${noun} left`}
        listClassName={styles.overviewGrid}
        paginationClassName={styles.overviewPagination}
        paginationLabel={`${noun} pagination`}
        paginationPageActiveClassName={styles.overviewPaginationPageActive}
        paginationPageClassName={styles.overviewPaginationPage}
        paginationPagesClassName={styles.overviewPaginationPages}
        renderItem={({ project, summary, href }) => (
          <Link className={styles.overviewCard} href={href} key={project.slug}>
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
              <h2>{project.title}</h2>
              <p className={styles.overviewSummary}>{summary}</p>
              <div className={styles.cardFooter}>
                <span className={styles.overviewAction}>{actionLabel}</span>
                {project.venue ? <span className={styles.venue}>{project.venue}</span> : null}
              </div>
            </div>
          </Link>
        )}
        rightLabel={`Scroll ${noun} right`}
      />
    </section>
  );
}