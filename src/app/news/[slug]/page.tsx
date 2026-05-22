import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { EditorialMediaHero } from "@/components/editorial-media-hero";
import { EditorialLinkSection } from "@/components/editorial-sections";
import { getAllNewsPosts, getNewsPost } from "@/lib/news-posts";
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
      <EditorialMediaHero
        context={<Link href="/news">News</Link>}
        eyebrow="News"
        title={post.title}
        intro={post.description}
        actions={post.heroActions.map((action) => ({
          href: action.href,
          label: action.label,
          variant: action.variant,
        }))}
        meta={<>{post.author} · {publishedAt}</>}
        imageSrc={post.image}
        imageAlt={post.title}
      />

      <article className={styles.post}>
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

        {post.resources.length > 0 ? (
          <EditorialLinkSection
            eyebrow="Resources"
            title={post.resourcesHeading ?? "Links related to this announcement."}
            links={post.resources.map((resource) => ({
              href: resource.href,
              content: resource.label,
              actionLabel: resource.actionLabel,
            }))}
          />
        ) : null}
      </article>
    </main>
  );
}