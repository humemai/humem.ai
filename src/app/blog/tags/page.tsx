import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { getAllBlogTags, getBlogPostsByTag, getBlogTagHref } from "@/lib/blog-posts";
import styles from "../blog.module.css";

export const metadata: Metadata = {
  title: "Blog Tags",
  description: "Browse HumemAI blog posts by tag.",
};

export default function BlogTagsPage() {
  const tags = getAllBlogTags();

  return (
    <ContentPage
      context={<Link href="/blog">Blog</Link>}
      eyebrow="Blog"
      title="Browse by tag"
      intro="Explore HumemAI posts by topic instead of date."
    >
      <div className={styles.list}>
        {tags.map((tag) => {
          const preview = getBlogPostsByTag(tag.name)
            .slice(0, 2)
            .map((post) => post.title)
            .join(" · ");

          return (
            <article className={styles.card} key={tag.slug}>
              <p className={styles.meta}>{tag.count} post{tag.count === 1 ? "" : "s"}</p>
              <h2>
                <Link className={styles.cardTitleLink} href={getBlogTagHref(tag.name)}>
                  {tag.name}
                </Link>
              </h2>
              <p className={styles.excerpt}>
                {preview || `Read HumemAI posts tagged ${tag.name}.`}
              </p>
              <Link className={styles.action} href={getBlogTagHref(tag.name)}>
                View posts
              </Link>
            </article>
          );
        })}
      </div>
    </ContentPage>
  );
}