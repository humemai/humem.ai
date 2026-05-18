"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import styles from "./project-rail.module.css";

type ProjectRailProps = {
  projects: Project[];
};

export function ProjectRail({ projects }: ProjectRailProps) {
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
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <button aria-label="Scroll projects left" className={styles.control} onClick={() => scrollRail("left")} type="button">
          <span aria-hidden="true">←</span>
        </button>
        <button aria-label="Scroll projects right" className={styles.control} onClick={() => scrollRail("right")} type="button">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.rail} ref={railRef}>
        {projects.map((project) => (
          <Link className={styles.card} href={`/projects/${project.slug}`} key={project.slug}>
            {project.image ? (
              <div className={styles.imageWrap}>
                <Image
                  alt={project.image.alt}
                  className={styles.image}
                  fill
                  sizes="(min-width: 1280px) 44rem, (min-width: 768px) 72vw, 88vw"
                  src={project.image.src}
                />
              </div>
            ) : null}
            <div className={styles.overlay} />
            <div className={styles.content}>
              <p className={styles.eyebrow}>{project.status}</p>
              <h3>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              <span className={styles.action}>Learn more</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}