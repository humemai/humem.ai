import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type NewsPostResource = {
  label: string;
  href: string;
  actionLabel?: string;
  variant?: "primary" | "secondary";
};

export type NewsPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  author: string;
  image?: string;
  heroActions: NewsPostResource[];
  resourcesHeading?: string;
  resources: NewsPostResource[];
  content: string;
};

const NEWS_CONTENT_DIR = path.join(process.cwd(), "src/content/news");

function filenameToSlug(fileName: string) {
  return fileName.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function coerceString(value: unknown) {
  return typeof value === "string" ? value : String(value ?? "");
}

function coerceOptionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function coerceResources(value: unknown): NewsPostResource[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") {
      return [];
    }

    const resource = entry as Record<string, unknown>;
    const label = coerceOptionalString(resource.label);
    const href = coerceOptionalString(resource.href);

    if (!label || !href) {
      return [];
    }

    return [{
      label,
      href,
      actionLabel: coerceOptionalString(resource.actionLabel),
      variant: resource.variant === "secondary" ? "secondary" : resource.variant === "primary" ? "primary" : undefined,
    }];
  });
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
        heroActions: coerceResources(data.heroActions),
        resourcesHeading: coerceOptionalString(data.resourcesHeading),
        resources: coerceResources(data.resources),
        content,
      };
    })
    .sort((left, right) => parseDateValue(right.date) - parseDateValue(left.date));
});

export function getNewsPost(slug: string) {
  return getAllNewsPosts().find((post) => post.slug === slug);
}