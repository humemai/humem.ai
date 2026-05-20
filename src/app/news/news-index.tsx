"use client";

import Image from "next/image";
import Link from "next/link";
import { PagedCardGrid } from "@/components/paged-card-grid";
import type { NewsPost } from "@/lib/news-posts";
import styles from "./news.module.css";

type NewsIndexSectionProps = {
  posts: NewsPost[];
};

export function NewsIndexSection({ posts }: NewsIndexSectionProps) {
  return (
    <section className={styles.section}>
      <PagedCardGrid
        controlsClassName={styles.mobileRailControls}
        controlClassName={styles.mobileRailControl}
        items={posts}
        leftLabel="Scroll news left"
        listClassName={styles.articleList}
        paginationClassName={styles.pagination}
        paginationLabel="News pagination"
        paginationPageActiveClassName={styles.paginationPageActive}
        paginationPageClassName={styles.paginationPage}
        paginationPagesClassName={styles.paginationPages}
        renderItem={(post) => (
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
              <p className={styles.meta}>
                {post.author} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <Link className={styles.action} href={`/news/${post.slug}`}>
                Learn more
              </Link>
            </div>
          </article>
        )}
        rightLabel="Scroll news right"
      />
    </section>
  );
}