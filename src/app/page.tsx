import Image from "next/image";
import Link from "next/link";
import { SectionIntro, SectionPromo } from "@/components/section-blocks";
import { NewsRail } from "@/components/news-rail";
import { ProjectRail } from "@/components/project-rail";
import { getAllNewsPosts } from "@/lib/news-posts";
import { getProjectsIndexProjects } from "@/lib/projects";
import { HOME_PAGE_RAIL_ITEM_COUNT } from "@/lib/site-data";
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
            <p className={styles.eyebrow}>Persistent memory for agentic AI</p>
          </div>
          <h1 className={styles.title}>
            Give AI systems memory that lasts.
          </h1>
          <p className={styles.lead}>
            HumemAI gives AI systems a memory layer that stays persistent across sessions,
            adapts to mixed data types, and remains inspectable instead of turning into a
            black box.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/product">
              See the product
            </Link>
            <Link className={styles.secondaryAction} href="/pricing">
              Explore pricing
            </Link>
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
        <SectionPromo eyebrow="Product" title="Built for real agent workflows." href="/product" actionLabel="See the product">
          <p>
            See how HumemAI handles conversational history, structured knowledge, and hybrid retrieval in one system.
          </p>
        </SectionPromo>
      </div>

      <div className={styles.sectionShell}>
        <SectionPromo eyebrow="Pricing" title="Open source or hosted." href="/pricing" actionLabel="Explore pricing">
          <p>
            Self-host from GitHub when you want full control, or use a managed deployment when you want outcomes faster.
          </p>
        </SectionPromo>
      </div>

      <div className={`${styles.sectionShell} ${styles.railSection}`}>
          <SectionIntro
            eyebrow="Open source projects"
            title="Open source projects shape the work."
            aside="Explore the main open source threads behind HumemAI, then move into dedicated project pages for the systems, papers, and implementations inside each one."
          />
          <ProjectRail projects={featuredProjects} />
      </div>

      <div className={`${styles.sectionShell} ${styles.newsSection}`}>
        <SectionIntro
          eyebrow="News"
          title="Latest news from the company."
          aside="Recent writing, releases, research, and product updates from HumemAI."
        />
        <NewsRail posts={latestNews} />
      </div>
    </main>
  );
}
