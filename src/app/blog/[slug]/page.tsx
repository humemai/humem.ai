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
import { ContentPage } from "@/components/content-page";
import { getAllBlogPosts, getBlogPost, getBlogTagHref } from "@/lib/blog-posts";
import styles from "../blog.module.css";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Blog" };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <ContentPage
      context={<Link href="/blog">Blog</Link>}
      eyebrow="Blog"
      title={post.title}
      intro={post.description}
      aside={
        <>
          <p className="partnerMeta">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
          <p className="partnerStatus">{post.author}</p>
        </>
      }
    >
      <article className={styles.post}>
        {post.image ? (
          <div className={styles.postImageWrap}>
            <Image src={post.image} alt={post.title} fill className={styles.postImage} sizes="(min-width: 1024px) 960px, 100vw" />
          </div>
        ) : null}
        <div className={styles.postTags}>
          {post.tags.map((tag) => (
            <Link className={`${styles.tag} ${styles.tagLink}`} href={getBlogTagHref(tag)} key={tag}>
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
    </ContentPage>
  );
}