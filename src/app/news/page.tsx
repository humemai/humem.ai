import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllNewsPosts } from "@/lib/news-posts";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: "News",
  description: "News from HumemAI across engineering, research, product, tutorials, and benchmarks.",
};

export default function NewsPage() {
  const posts = getAllNewsPosts();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>News</p>
          <h1>News and updates.</h1>
          <p className={styles.intro}>
            Recent writing, releases, research, and product updates from HumemAI.
          </p>
        </div>

        <figure className={styles.heroFigure}>
          <div className={styles.heroImageWrap}>
            <Image
              src="/illustrations/news-writing-and-research.png"
              alt="Illustration representing HumemAI news, research updates, and structured knowledge"
              fill
              className={styles.heroImage}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </figure>
      </section>

      <section className={styles.section}>
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