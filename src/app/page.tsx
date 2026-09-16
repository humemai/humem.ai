import Image from "next/image";
import Link from "next/link";
import { SectionIntro, SectionPromo } from "@/components/section-blocks";
import { NewsRail } from "@/components/news-rail";
import { ProjectRail } from "@/components/project-rail";
import { getAllNewsPosts } from "@/lib/news-posts";
import { getProjectsIndexProjects } from "@/lib/projects";
import { githubOrgUrl, HOME_PAGE_RAIL_ITEM_COUNT } from "@/lib/site-data";
import styles from "./page.module.css";

export default function Home() {
  const featuredProjects = getProjectsIndexProjects().slice(0, HOME_PAGE_RAIL_ITEM_COUNT);
  const latestNews = getAllNewsPosts().slice(0, HOME_PAGE_RAIL_ITEM_COUNT);

  return (
    <main className={styles.page}>
      <section className={styles.heroShell}>
        <div className={styles.heroCopy}>
          <div className={styles.heroEyebrowRow}>
            <Image src="/favicon.png" alt="HumemAI icon" width={24} height={24} />
            <p className={styles.eyebrow}>Open source memory for agentic AI</p>
          </div>
          <h1 className={styles.title}>
            Give AI systems memory that lasts.
          </h1>
          <p className={styles.lead}>
            HumemAI is an open source organization. We publish research, code, and
            benchmarks for a memory layer that stays persistent across sessions, adapts
            to mixed data types, and remains inspectable instead of turning into a
            black box.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/projects">
              Explore the projects
            </Link>
            <a className={styles.secondaryAction} href={githubOrgUrl} target="_blank" rel="noopener noreferrer">
              View GitHub
            </a>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroVisualWrap}>
            <Image
              src="/images/site/home-hero-memory-layer.png"
              alt="HumemAI landing illustration"
              fill
              className={styles.heroVisual}
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
          </div>
        </div>
      </section>

      <div className={styles.sectionShell}>
        <SectionIntro eyebrow="Why memory" title="Most agents still behave like stateless interfaces with better wording.">
            <p>
              HumemAI focuses on what should persist beyond a prompt: what happened, what matters now, and how structured knowledge should stay available over time. That means treating memory as a real system layer instead of a side effect hidden in context windows.
            </p>
            <p>
              The result is a stack that can hold documents, tables, graphs, and traces in forms that remain inspectable, replayable, and useful to both people and agents.
            </p>
        </SectionIntro>
      </div>

      <div className={styles.sectionShell}>
        <SectionPromo eyebrow="Open source" title="Everything we make is free to use, modify, and redistribute." href="/about" actionLabel="About the organization">
          <p>
            The code, Python packages, benchmarks, and papers are published under open licenses.
          </p>
        </SectionPromo>
      </div>

      <div className={styles.sectionShell}>
        <SectionPromo eyebrow="Contribute" title="Built in the open, with anyone who wants to help." href="/projects" actionLabel="Explore the projects">
          <p>
            Issues, pull requests, benchmark reports, and research collaborations are all welcome. Pick a project and start from its repository on GitHub.
          </p>
        </SectionPromo>
      </div>

      <div className={`${styles.sectionShell} ${styles.railSection}`}>
          <SectionIntro
            eyebrow="Open source projects"
            title="Open source projects shape the work."
            aside="Explore the main open source threads behind HumemAI, then move into dedicated project pages for the systems, papers, and implementations inside each one."
          />
          <div className={styles.railShell}>
          <ProjectRail projects={featuredProjects} />
        </div>
      </div>

      <div className={`${styles.sectionShell} ${styles.newsSection}`}>
        <SectionIntro
          eyebrow="News"
          title="Latest news from the projects."
          aside="Recent writing, releases, research, and benchmark updates from HumemAI."
        />
        <div className={styles.railShell}>
          <NewsRail posts={latestNews} />
        </div>
      </div>
    </main>
  );
}
