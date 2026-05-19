import type { Metadata } from "next";
import Image from "next/image";
import { getAllNewsPosts } from "@/lib/news-posts";
import { NewsIndexSection } from "./news-index";
import { getNewsPageCount, getNewsPagePosts } from "./news-pagination";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: "News",
  description: "News from HumemAI across engineering, research, product, tutorials, and benchmarks.",
};

export default function NewsPage() {
  const posts = getAllNewsPosts();
  const totalPages = getNewsPageCount(posts.length);
  const visiblePosts = getNewsPagePosts(posts, 1);

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

      <NewsIndexSection currentPage={1} posts={visiblePosts} totalPages={totalPages} />
    </main>
  );
}