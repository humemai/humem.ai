import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { getAllBlogPosts, getBlogTagHref } from "@/lib/blog-posts";
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
      title="Writing from HumemAI"
      intro="Writing from HumemAI on memory systems, research updates, infrastructure work, videos, and product direction."
      aside={
        <figure className="heroFigure">
          <div className="heroFigureImageWrap">
            <Image
              src="/illustrations/blog-writing-and-research.png"
              alt="Illustration representing technical writing, research updates, and structured knowledge"
              fill
              className="heroFigureImage"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <figcaption className="heroFigureCaption">
            HumemAI uses the blog to publish technical notes, research progress, infrastructure work, and product thinking in public.
          </figcaption>
        </figure>
      }
    >
      <div className={styles.list}>
        {posts.map((post) => (
          <article className={`${styles.card} ${styles.cardLink}`} key={post.slug}>
            {post.image ? (
              <Link className={styles.cardImageLink} href={`/blog/${post.slug}`}>
                <div className={styles.cardImageWrap}>
                  <Image src={post.image} alt={post.title} fill className={styles.cardImage} sizes="(min-width: 900px) 50vw, 100vw" />
                </div>
              </Link>
            ) : null}
            <p className={styles.meta}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.author}</p>
            <h2>
              <Link className={styles.cardTitleLink} href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <Link className={`${styles.tag} ${styles.tagLink}`} href={getBlogTagHref(tag)} key={tag}>
                  {tag}
                </Link>
              ))}
            </div>
            <Link className={styles.action} href={`/blog/${post.slug}`}>
              Learn more
            </Link>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}