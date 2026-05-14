import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  image?: string;
  content: string;
};

export type BlogTag = {
  name: string;
  slug: string;
  count: number;
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

function filenameToSlug(fileName: string) {
  return fileName.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function coerceString(value: unknown) {
  return typeof value === "string" ? value : String(value ?? "");
}

function parseDateValue(value: string) {
  return new Date(value).getTime();
}

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBlogTagHref(tag: string) {
  return `/blog/tags/${slugifyTag(tag)}`;
}

export const getAllBlogPosts = cache((): BlogPost[] => {
  const entries = fs.readdirSync(BLOG_CONTENT_DIR).filter((entry) => entry.endsWith(".mdx"));

  return entries
    .map((entry) => {
      const filePath = path.join(BLOG_CONTENT_DIR, entry);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: filenameToSlug(entry),
        title: coerceString(data.title),
        description: coerceString(data.description),
        date: coerceString(data.date),
        excerpt: coerceString(data.excerpt),
        author: coerceString(data.author),
        tags: Array.isArray(data.tags) ? data.tags.map((tag) => coerceString(tag)) : [],
        image: data.image ? coerceString(data.image) : undefined,
        content,
      };
    })
    .sort((left, right) => parseDateValue(right.date) - parseDateValue(left.date));
});

export const getAllBlogTags = cache((): BlogTag[] => {
  const counts = new Map<string, number>();

  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      slug: slugifyTag(name),
      count,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
});

export function getBlogTagBySlug(tagSlug: string) {
  return getAllBlogTags().find((tag) => tag.slug === tagSlug);
}

export function getBlogPostsByTag(tagName: string) {
  return getAllBlogPosts().filter((post) => post.tags.includes(tagName));
}

export function getBlogPost(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}