import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const NEWS_CATEGORY_INFO = [
  {
    name: "Engineering",
    description: "Implementation details, architecture, and systems work.",
  },
  {
    name: "Research",
    description: "Memory systems, agents, machine learning ideas, and papers.",
  },
  {
    name: "Product",
    description: "Releases, features, and product-facing updates.",
  },
  {
    name: "Tutorials",
    description: "How-to guides, integrations, and examples.",
  },
  {
    name: "Benchmarks",
    description: "Performance analysis, evaluation, and comparisons.",
  },
] as const;

type NewsCategoryName = (typeof NEWS_CATEGORY_INFO)[number]["name"];

const NEWS_CATEGORY_DESCRIPTION = new Map<string, string>(
  NEWS_CATEGORY_INFO.map((category) => [category.name, category.description]),
);

const NEWS_CATEGORY_ORDER = new Map<string, number>(
  NEWS_CATEGORY_INFO.map((category, index) => [category.name, index]),
);

const NEWS_POST_CATEGORY_OVERRIDES: Record<string, NewsCategoryName[]> = {
  "arcadedb-embedded-python-bindings": ["Engineering", "Product"],
  "prompt-agent": ["Research", "Product"],
  youtube: ["Product"],
  "second-paper": ["Research", "Benchmarks"],
  "first-paper": ["Research", "Benchmarks"],
};

const RAW_TAG_CATEGORY_MAP: Record<string, NewsCategoryName[]> = {
  arcadedb: ["Engineering"],
  python: ["Engineering", "Tutorials"],
  "open-source": ["Engineering", "Product"],
  databases: ["Engineering"],
  graphs: ["Engineering", "Research"],
  vectors: ["Engineering"],
  embeddings: ["Engineering"],
  jvm: ["Engineering"],
  llm: ["Research"],
  prompting: ["Research"],
  promptagent: ["Research", "Product"],
  youtube: ["Product"],
  introduction: ["Product"],
  "long-term-memory": ["Research"],
  "episodic-memory": ["Research"],
  "semantic-memory": ["Research"],
  "reinforcement-learning": ["Research", "Benchmarks"],
  "ai-research": ["Research"],
  "knowledge-graphs": ["Research", "Engineering"],
};

export type NewsPost = {
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

export type NewsTopic = {
  name: string;
  slug: string;
  count: number;
  description: string;
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

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getNewsTopicHref(topic: string) {
  return `/news/tags/${slugifyTag(topic)}`;
}

function normalizeNewsCategories(slug: string, rawTags: string[]) {
  const overrideCategories = NEWS_POST_CATEGORY_OVERRIDES[slug];

  if (overrideCategories) {
    return [...overrideCategories];
  }

  const inferredCategories = new Set<NewsCategoryName>();

  for (const rawTag of rawTags) {
    const normalizedTag = slugifyTag(rawTag);
    const mappedCategories = RAW_TAG_CATEGORY_MAP[normalizedTag] ?? [];

    for (const category of mappedCategories) {
      inferredCategories.add(category);
    }
  }

  if (inferredCategories.size === 0) {
    inferredCategories.add("Product");
  }

  return [...inferredCategories]
    .sort((left, right) => (NEWS_CATEGORY_ORDER.get(left) ?? 99) - (NEWS_CATEGORY_ORDER.get(right) ?? 99))
    .slice(0, 5);
}

export const getAllNewsPosts = cache((): NewsPost[] => {
  const entries = fs.readdirSync(NEWS_CONTENT_DIR).filter((entry) => entry.endsWith(".mdx"));

  return entries
    .map((entry) => {
      const filePath = path.join(NEWS_CONTENT_DIR, entry);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = filenameToSlug(entry);
      const rawTags = Array.isArray(data.tags) ? data.tags.map((tag) => coerceString(tag)) : [];

      return {
        slug,
        title: coerceString(data.title),
        description: coerceString(data.description),
        date: coerceString(data.date),
        excerpt: coerceString(data.excerpt),
        author: coerceString(data.author),
        tags: normalizeNewsCategories(slug, rawTags),
        image: data.image ? coerceString(data.image) : undefined,
        content,
      };
    })
    .sort((left, right) => parseDateValue(right.date) - parseDateValue(left.date));
});

export const getAllNewsTopics = cache((): NewsTopic[] => {
  const counts = new Map<string, number>();

  for (const post of getAllNewsPosts()) {
    for (const topic of post.tags) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      slug: slugifyTag(name),
      count,
      description: NEWS_CATEGORY_DESCRIPTION.get(name) ?? "Browse posts in this category.",
    }))
    .sort((left, right) => (NEWS_CATEGORY_ORDER.get(left.name) ?? 99) - (NEWS_CATEGORY_ORDER.get(right.name) ?? 99));
});

export function getNewsTopicBySlug(topicSlug: string) {
  return getAllNewsTopics().find((topic) => topic.slug === topicSlug);
}

export function getNewsPostsByTopic(topicName: string) {
  return getAllNewsPosts().filter((post) => post.tags.includes(topicName));
}

export function getNewsPost(slug: string) {
  return getAllNewsPosts().find((post) => post.slug === slug);
}