import type { NewsPost } from "@/lib/news-posts";
import { getListingPageCount, getListingPageItems, LISTING_ITEMS_PER_PAGE } from "@/lib/listing-pagination";

export const NEWS_POSTS_PER_PAGE = LISTING_ITEMS_PER_PAGE;

export function getNewsPageCount(totalPosts: number) {
  return getListingPageCount(totalPosts, NEWS_POSTS_PER_PAGE);
}

export function getNewsPagePosts(posts: NewsPost[], page: number) {
  return getListingPageItems(posts, page, NEWS_POSTS_PER_PAGE);
}