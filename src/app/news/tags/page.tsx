import type { Metadata } from "next";
import Link from "next/link";
import { getAllNewsTopics, getNewsTopicHref } from "@/lib/news-posts";
import styles from "../news.module.css";

export const metadata: Metadata = {
  title: "News Categories",
  description: "Browse HumemAI news by category.",
};

export default function NewsTopicsPage() {
  const topics = getAllNewsTopics();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.context}>
            <Link href="/news">News</Link>
          </div>
          <p className={styles.eyebrow}>Categories</p>
          <h1>Browse the news archive by category.</h1>
          <p className={styles.intro}>
            The archive now uses a smaller category system so readers can move through the writing without a long list of one-off tags.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/news">
              View all news
            </Link>
          </div>
        </div>

        <aside className={styles.heroAsideCard}>
          <p className={styles.heroAsideLabel}>System</p>
          <p className={styles.heroAsideText}>Engineering, Research, Product, Tutorials, and Benchmarks.</p>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>All categories</p>
          <h2>Five broad ways to browse the archive.</h2>
        </div>
        <div className={styles.categoryGrid}>
        {topics.map((topic) => {
          return (
            <article className={styles.categoryCard} key={topic.slug}>
              <p className={styles.meta}>{topic.count} item{topic.count === 1 ? "" : "s"}</p>
              <h2>
                <Link className={styles.cardTitleLink} href={getNewsTopicHref(topic.name)}>
                  {topic.name}
                </Link>
              </h2>
              <p className={styles.excerpt}>{topic.description}</p>
              <Link className={styles.action} href={getNewsTopicHref(topic.name)}>
                View category
              </Link>
            </article>
          );
        })}
        </div>
      </section>
    </main>
  );
}