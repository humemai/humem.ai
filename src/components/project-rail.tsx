"use client";

import Image from "next/image";
import Link from "next/link";
import { HorizontalRail } from "@/components/horizontal-rail";
import type { SectionEntry } from "@/lib/projects";
import styles from "./project-rail.module.css";

type ProjectRailProps = {
  entries: SectionEntry[];
  /** Plural noun for the labels, e.g. "software" or "research". */
  noun: string;
  action: { href: string; label: string };
};

export function ProjectRail({ entries, noun, action }: ProjectRailProps) {
  return (
    <HorizontalRail action={action} className={styles.root} leftLabel={`Scroll ${noun} left`} rightLabel={`Scroll ${noun} right`}>
        {entries.map(({ project, summary, href }) => (
          <Link className={styles.card} href={href} key={`${project.slug}-${href}`}>
            {project.image ? (
              <div className={styles.imageWrap}>
                <Image
                  alt={project.image.alt}
                  className={styles.image}
                  fill
                  sizes="(min-width: 1280px) 44rem, (min-width: 720px) 72vw, 88vw"
                  src={project.image.src}
                />
              </div>
            ) : (
              <div className={styles.fallback} />
            )}
            <div className={styles.content}>
              <h3>{project.title}</h3>
              <p className={styles.summary}>{summary}</p>
              <div className={styles.cardFooter}>
                <span className={styles.action}>Learn more</span>
                {project.venue ? <span className={styles.venue}>{project.venue}</span> : null}
              </div>
            </div>
          </Link>
        ))}
    </HorizontalRail>
  );
}