"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { NewsPost } from "@/lib/news-posts";
import styles from "./news.module.css";

type NewsIndexSectionProps = {
  posts: NewsPost[];
  currentPage: number;
  totalPages: number;
};

function getNewsPageHref(page: number) {
  return page === 1 ? "/news" : `/news/page/${page}`;
}

export function NewsIndexSection({ posts, currentPage, totalPages }: NewsIndexSectionProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const amount = Math.max(rail.clientWidth * 0.85, 320);
    rail.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      {posts.length > 1 ? (
        <div className={styles.mobileRailControls}>
          <button aria-label="Scroll news left" className={styles.mobileRailControl} onClick={() => scrollRail("left")} type="button">
            <span aria-hidden="true">←</span>
          </button>
          <button aria-label="Scroll news right" className={styles.mobileRailControl} onClick={() => scrollRail("right")} type="button">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}

      <div className={styles.articleList} ref={railRef}>
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
              <p className={styles.meta}>
                {post.author} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <Link className={styles.action} href={`/news/${post.slug}`}>
                Learn more
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav aria-label="News pagination" className={styles.pagination}>
          <div className={styles.paginationPages}>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <Link
                  aria-current={page === currentPage ? "page" : undefined}
                  className={page === currentPage ? styles.paginationPageActive : styles.paginationPage}
                  href={getNewsPageHref(page)}
                  key={page}
                >
                  {page}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </section>
  );
}