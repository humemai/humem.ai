import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type NewsPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  author: string;
  image?: string;
  content: string;
};

const NEWS_CONTENT_DIR = path.join(process.cwd(), "src/content/news");

function filenameToSlug(fileName: string) {
  return fileName.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function coerceString(value: unknown) {
  return typeof value === "string" ? value : String(value ?? "");
}

function parseDateValue(value: string) {
  return new Date(value).getTime();
}

export const getAllNewsPosts = cache((): NewsPost[] => {
  const entries = fs.readdirSync(NEWS_CONTENT_DIR).filter((entry) => entry.endsWith(".mdx"));

  return entries
    .map((entry) => {
      const filePath = path.join(NEWS_CONTENT_DIR, entry);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = filenameToSlug(entry);

      return {
        slug,
        title: coerceString(data.title),
        description: coerceString(data.description),
        date: coerceString(data.date),
        excerpt: coerceString(data.excerpt),
        author: coerceString(data.author),
        image: data.image ? coerceString(data.image) : undefined,
        content,
      };
    })
    .sort((left, right) => parseDateValue(right.date) - parseDateValue(left.date));
});

export function getNewsPost(slug: string) {
  return getAllNewsPosts().find((post) => post.slug === slug);
}