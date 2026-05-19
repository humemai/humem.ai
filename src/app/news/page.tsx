import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
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
      <PageHero
        eyebrow="News"
        title="News and updates."
        intro="Recent writing, releases, research, and product updates from HumemAI."
        imageSrc="/illustrations/news-writing-and-research.png"
        imageAlt="Illustration representing HumemAI news, research updates, and structured knowledge"
        titleVariant="feature"
      />

      <NewsIndexSection currentPage={1} posts={visiblePosts} totalPages={totalPages} />
    </main>
  );
}