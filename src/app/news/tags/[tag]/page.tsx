import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNewsTopics, getNewsPostsByTopic, getNewsTopicBySlug } from "@/lib/news-posts";
import styles from "../../news.module.css";

type Params = {
  tag: string;
};

export function generateStaticParams() {
  return getAllNewsTopics().map((topic) => ({ tag: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  const topicInfo = getNewsTopicBySlug(tag);

  if (!topicInfo) {
    return { title: "News Categories" };
  }

  return {
    title: `${topicInfo.name} news`,
    description: `Browse HumemAI news in the ${topicInfo.name} category.`,
  };
}

export default async function NewsTopicPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const topicInfo = getNewsTopicBySlug(tag);

  if (!topicInfo) {
    notFound();
  }

  const posts = getNewsPostsByTopic(topicInfo.name);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.context}>
            <Link href="/news">News</Link>
            <span> / </span>
            <Link href="/news/tags">Categories</Link>
          </div>
          <p className={styles.eyebrow}>Category</p>
          <h1>{topicInfo.name}</h1>
          <p className={styles.intro}>{topicInfo.description}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/news">
              View all news
            </Link>
            <Link className={styles.secondaryAction} href="/news/tags">
              All categories
            </Link>
          </div>
        </div>

        <aside className={styles.heroAsideCard}>
          <p className={styles.heroAsideLabel}>Posts</p>
          <p className={styles.heroAsideStat}>{posts.length}</p>
          <p className={styles.heroAsideText}>{posts.length === 1 ? "One post in this category." : "Posts currently grouped in this category."}</p>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>Articles</p>
          <h2>{topicInfo.name} posts.</h2>
        </div>
        <div className={styles.articleList}>
        {posts.map((post) => (
          <article className={styles.articleCard} key={post.slug}>
            {post.image ? (
              <Link className={styles.articleMediaLink} href={`/news/${post.slug}`}>
                <div className={styles.articleImageWrap}>
                  <Image src={post.image} alt={post.title} fill className={styles.articleImage} sizes="(min-width: 1024px) 38vw, 100vw" />
                </div>
              </Link>
            ) : null}
            <div className={styles.articleCopy}>
              <h2>
                <Link className={styles.cardTitleLink} href={`/news/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className={styles.meta}>{post.author} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              <Link className={styles.action} href={`/news/${post.slug}`}>
                Learn more
              </Link>
            </div>
          </article>
        ))}
        </div>
      </section>
    </main>
  );
}