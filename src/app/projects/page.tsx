import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { projects } from "@/lib/projects";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse flagship HumemAI projects and the dedicated page for each one.",
};

export default function ProjectsPage() {
  return (
    <ContentPage
      eyebrow="Projects"
      title="Projects behind HumemAI."
      intro="Explore the projects that shaped HumemAI so far, including funded work, infrastructure experiments, and product-facing memory systems."
      aside={
        <figure className="heroFigure">
          <div className="heroFigureImageWrap">
            <Image
              src="/illustrations/projects-overview-portfolio.png"
              alt="Illustration representing research, systems work, and applied AI memory projects"
              fill
              className="heroFigureImage"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <figcaption className="heroFigureCaption">
            Each project page includes background, repositories, funding context where relevant, and the current direction of the work.
          </figcaption>
        </figure>
      }
    >
      {projects.map((project) => (
        <Link className={styles.card} href={`/projects/${project.slug}`} key={project.slug}>
          <h2>{project.title}</h2>
          <p className={styles.summary}>{project.summary}</p>
          <p className={styles.meta}>{project.funding ? `${project.funding} · ${project.status}` : project.status}</p>
          <span className={styles.action}>Learn more</span>
        </Link>
      ))}
    </ContentPage>
  );
}