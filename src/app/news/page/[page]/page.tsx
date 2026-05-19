import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { getAllNewsPosts } from "@/lib/news-posts";
import { NewsIndexSection } from "../../news-index";
import { getNewsPageCount, getNewsPagePosts } from "../../news-pagination";
import styles from "../../news.module.css";

type Params = {
  page: string;
};

export function generateStaticParams() {
  const totalPages = getNewsPageCount(getAllNewsPosts().length);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    return {
      title: "News",
      description: "News from HumemAI across engineering, research, product, tutorials, and benchmarks.",
    };
  }

  return {
    title: `News - Page ${pageNumber}`,
    description: `Page ${pageNumber} of HumemAI news and updates.`,
  };
}

export default async function NewsPaginationPage({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);
  const posts = getAllNewsPosts();
  const totalPages = getNewsPageCount(posts.length);

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const visiblePosts = getNewsPagePosts(posts, pageNumber);

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

      <NewsIndexSection currentPage={pageNumber} posts={visiblePosts} totalPages={totalPages} />
    </main>
  );
}