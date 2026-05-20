import type { NewsPost } from "@/lib/news-posts";
import { LISTING_ITEMS_PER_PAGE } from "@/lib/listing-pagination";

export const NEWS_POSTS_PER_PAGE = LISTING_ITEMS_PER_PAGE;

export function getNewsPageCount(totalPosts: number) {
  return Math.max(1, Math.ceil(totalPosts / NEWS_POSTS_PER_PAGE));
}

export function getNewsPagePosts(posts: NewsPost[], page: number) {
  const start = (page - 1) * NEWS_POSTS_PER_PAGE;
  return posts.slice(start, start + NEWS_POSTS_PER_PAGE);
}