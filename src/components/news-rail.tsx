"use client";

import Image from "next/image";
import Link from "next/link";
import { HorizontalRail } from "@/components/horizontal-rail";
import type { NewsPost } from "@/lib/news-posts";
import styles from "./news-rail.module.css";

type NewsRailProps = {
  posts: NewsPost[];
};

export function NewsRail({ posts }: NewsRailProps) {
  return (
    <HorizontalRail action={{ href: "/news", label: "View all news" }} className={styles.root} leftLabel="Scroll news left" rightLabel="Scroll news right">
        {posts.map((post) => (
          <article className={styles.card} key={post.slug}>
            {post.image ? (
              <Link className={styles.mediaLink} href={`/news/${post.slug}`}>
                <div className={styles.imageWrap}>
                  <Image
                    alt={post.title}
                    className={styles.image}
                    fill
                    sizes="(min-width: 1280px) 26rem, (min-width: 768px) 56vw, 88vw"
                    src={post.image}
                  />
                </div>
              </Link>
            ) : null}

            <div className={styles.copy}>
              <h3>
                <Link className={styles.titleLink} href={`/news/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className={styles.meta}>
                {post.author} · {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <Link className={styles.action} href={`/news/${post.slug}`}>
                Learn more
              </Link>
            </div>
          </article>
        ))}
    </HorizontalRail>
  );
}