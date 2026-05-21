"use client";

import Image from "next/image";
import Link from "next/link";
import { HorizontalRail } from "@/components/horizontal-rail";
import type { Project } from "@/lib/projects";
import styles from "./project-rail.module.css";

type ProjectRailProps = {
  projects: Project[];
};

export function ProjectRail({ projects }: ProjectRailProps) {
  return (
    <HorizontalRail action={{ href: "/projects", label: "View all projects" }} className={styles.root} leftLabel="Scroll projects left" rightLabel="Scroll projects right">
        {projects.map((project) => (
          <Link className={styles.card} href={`/projects/${project.slug}`} key={project.slug}>
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
              <p className={styles.summary}>{project.summary}</p>
              <span className={styles.action}>Learn more</span>
            </div>
          </Link>
        ))}
    </HorizontalRail>
  );
}