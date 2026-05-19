import Image from "next/image";
import Link from "next/link";
import { NewsRail } from "@/components/news-rail";
import { ProjectRail } from "@/components/project-rail";
import { getAllNewsPosts } from "@/lib/news-posts";
import { getFeaturedProjects } from "@/lib/projects";
import styles from "./page.module.css";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const latestNews = getAllNewsPosts().slice(0, 3);

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
              src="/illustrations/home-hero-memory-layer.png"
              alt="HumemAI landing illustration"
              fill
              className={styles.heroVisual}
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.editorialSection}>
        <div className={styles.editorialCopy}>
          <p className={styles.cardEyebrow}>Why memory</p>
          <h2>Most agents still behave like stateless interfaces with better wording.</h2>
        </div>
        <div className={styles.editorialBody}>
          <p>
            HumemAI focuses on what should persist beyond a prompt: what happened, what matters now, and how structured knowledge should stay available over time. That means treating memory as a real system layer instead of a side effect hidden in context windows.
          </p>
          <p>
            The result is a stack that can hold documents, tables, graphs, and traces in forms that remain inspectable, replayable, and useful to both people and agents.
          </p>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.cardEyebrow}>Product</p>
          <h2>Built for real agent workflows.</h2>
          <p>
            See how HumemAI handles conversational history, structured knowledge, and hybrid retrieval in one system.
          </p>
        </div>
        <Link className={styles.ctaLink} href="/product">
          <span className={styles.cardAction}>See the product</span>
        </Link>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.cardEyebrow}>Pricing</p>
          <h2>Open source or hosted.</h2>
          <p>
            Self-host from GitHub when you want full control, or use a managed deployment when you want outcomes faster.
          </p>
        </div>
        <Link className={styles.ctaLink} href="/pricing">
          <span className={styles.cardAction}>Explore pricing</span>
        </Link>
      </section>

      <section className={styles.railSection}>
        <div className={styles.railShell}>
          <div className={styles.railIntro}>
            <div>
              <p className={styles.cardEyebrow}>Open source projects</p>
              <h2>Open source projects shape the work.</h2>
            </div>
            <p>
              Explore the main open source threads behind HumemAI, then move into dedicated project pages for the systems, papers, and implementations inside each one.
            </p>
          </div>
          <ProjectRail projects={featuredProjects} />
        </div>
      </section>

      <section className={styles.newsSection}>
        <div className={styles.newsIntro}>
          <div>
            <p className={styles.cardEyebrow}>News</p>
            <h2>Latest news from the company.</h2>
          </div>
          <Link className={styles.newsLink} href="/news">
            View all news
          </Link>
        </div>
        <NewsRail posts={latestNews} />
      </section>
    </main>
  );
}
