import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { getAllBlogTags, getBlogPostsByTag, getBlogTagBySlug, getBlogTagHref } from "@/lib/blog-posts";
import styles from "../../blog.module.css";

type Params = {
  tag: string;
};

export function generateStaticParams() {
  return getAllBlogTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  const tagInfo = getBlogTagBySlug(tag);

  if (!tagInfo) {
    return { title: "Blog Tags" };
  }

  return {
    title: `${tagInfo.name} posts`,
    description: `Browse HumemAI blog posts tagged ${tagInfo.name}.`,
  };
}

export default async function BlogTagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const tagInfo = getBlogTagBySlug(tag);

  if (!tagInfo) {
    notFound();
  }

  const posts = getBlogPostsByTag(tagInfo.name);

  return (
    <ContentPage
      context={
        <>
          <Link href="/blog">Blog</Link>
          <span> / </span>
          <Link href="/blog/tags">Tags</Link>
        </>
      }
      eyebrow="Blog tag"
      title={tagInfo.name}
      intro={`Browse HumemAI posts tagged ${tagInfo.name}.`}
      aside={<p className="partnerMeta">{posts.length} post{posts.length === 1 ? "" : "s"}</p>}
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
              {post.tags.map((postTag) => (
                <Link className={`${styles.tag} ${styles.tagLink}`} href={getBlogTagHref(postTag)} key={postTag}>
                  {postTag}
                </Link>
              ))}
            </div>
            <Link className={styles.action} href={`/blog/${post.slug}`}>
              Read article
            </Link>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}