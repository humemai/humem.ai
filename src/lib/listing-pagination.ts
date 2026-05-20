export const LISTING_ITEMS_PER_PAGE = 9;

export function getListingPageCount(totalItems: number, itemsPerPage = LISTING_ITEMS_PER_PAGE) {
	return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}

export function getListingPageItems<T>(items: readonly T[], page: number, itemsPerPage = LISTING_ITEMS_PER_PAGE) {
	const start = (page - 1) * itemsPerPage;
	return items.slice(start, start + itemsPerPage);
}