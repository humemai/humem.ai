import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { getAllBlogPosts } from "@/lib/blog-posts";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing from HumemAI on AI memory, infrastructure, and product progress.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <ContentPage
      eyebrow="Blog"
      title="The Latest News From HumemAI"
      intro="Posts brought over from the earlier site, kept as a real writing surface for research updates, videos, and product infrastructure work."
    >
      <div className={styles.list}>
        {posts.map((post) => (
          <article className={styles.card} key={post.slug}>
            {post.image ? (
              <div className={styles.cardImageWrap}>
                <Image src={post.image} alt={post.title} fill className={styles.cardImage} sizes="(min-width: 900px) 50vw, 100vw" />
              </div>
            ) : null}
            <p className={styles.meta}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.author}</p>
            <h2>{post.title}</h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span className={styles.tag} key={tag}>{tag}</span>
              ))}
            </div>
            <Link className={styles.action} href={`/blog/${post.slug}`}>Read post</Link>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}