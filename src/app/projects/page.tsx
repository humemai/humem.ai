import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse flagship HumemAI projects and the dedicated page for each one.",
};

export default function ProjectsPage() {
  const featuredProjects = getFeaturedProjects();

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

      <section className={styles.projectOverview}>
        <div className={styles.projectOverviewIntro}>
          <div>
            <p className={styles.sectionEyebrow}>Project overview</p>
            <h2>Featured projects.</h2>
          </div>
        </div>

        <div className={styles.overviewGrid}>
          {featuredProjects.map((project) => (
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
      </section>
    </main>
  );
}