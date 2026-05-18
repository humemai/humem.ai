import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getAllNewsPosts, getNewsPost, getNewsTopicHref } from "@/lib/news-posts";
import styles from "../news.module.css";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return getAllNewsPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    return { title: "News" };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function NewsPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    notFound();
  }

  const publishedAt = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className={styles.page}>
      <section className={styles.postHero}>
        <div className={styles.postHeroCopy}>
          <div className={styles.context}>
            <Link href="/news">News</Link>
          </div>
          <p className={styles.eyebrow}>News</p>
          <h1>{post.title}</h1>
          <p className={styles.intro}>{post.description}</p>
          <p className={styles.postHeroMeta}>{post.author} · {publishedAt}</p>
        </div>

        {post.image ? (
          <figure className={styles.postHeroFigure}>
            <div className={styles.postHeroImageWrap}>
              <Image src={post.image} alt={post.title} fill className={styles.postHeroImage} sizes="(min-width: 1024px) 42vw, 100vw" />
            </div>
          </figure>
        ) : null}
      </section>

      <article className={styles.post}>
        <div className={styles.postTags}>
          {post.tags.map((tag) => (
            <Link className={`${styles.tag} ${styles.tagLink}`} href={getNewsTopicHref(tag)} key={tag}>
              {tag}
            </Link>
          ))}
        </div>
        <div className={styles.content}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeHighlight, { ignoreMissing: true }]]}
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              a: ({ href, children, ...props }) => {
                const normalizedHref = String(href ?? "");

                if (normalizedHref.startsWith("/")) {
                  return <Link href={normalizedHref}>{children}</Link>;
                }

                return (
                  <a href={normalizedHref} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}