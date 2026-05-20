"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DirectionalControlIcon } from "@/components/directional-control-icon";
import { getListingPageCount, getListingPageItems, LISTING_ITEMS_PER_PAGE } from "@/lib/listing-pagination";
import { useRailOverflow } from "@/components/use-rail-overflow";
import styles from "./paged-card-grid.module.css";

type PagedCardGridProps<T> = {
  items: readonly T[];
  itemsPerPage?: number;
  pageQueryParam?: string;
  paginationLabel: string;
  leftLabel: string;
  rightLabel: string;
  controlsClassName: string;
  controlClassName: string;
  listClassName: string;
  paginationClassName: string;
  paginationPagesClassName: string;
  paginationPageClassName: string;
  paginationPageActiveClassName: string;
  renderItem: (item: T, index: number) => ReactNode;
};

export function PagedCardGrid<T>({
  items,
  itemsPerPage = LISTING_ITEMS_PER_PAGE,
  pageQueryParam,
  paginationLabel,
  leftLabel,
  rightLabel,
  controlsClassName,
  controlClassName,
  listClassName,
  paginationClassName,
  paginationPagesClassName,
  paginationPageClassName,
  paginationPageActiveClassName,
  renderItem,
}: PagedCardGridProps<T>) {
  const { containerRef, canScrollLeft, canScrollRight } = useRailOverflow<HTMLDivElement>();
  const contentStartRef = useRef<HTMLDivElement>(null);
  const hasOverflow = canScrollLeft || canScrollRight;
  const joinClassNames = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");
  const totalPages = getListingPageCount(items.length, itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const visibleItems = getListingPageItems(items, currentPage, itemsPerPage);

  const scrollToContentStart = (behavior: ScrollBehavior = "smooth") => {
    contentStartRef.current?.scrollIntoView({ behavior, block: "start" });
  };

  const readPageFromUrl = () => {
    if (!pageQueryParam || typeof window === "undefined") {
      return 1;
    }

    const rawPage = new URLSearchParams(window.location.search).get(pageQueryParam);
    const parsedPage = Number.parseInt(rawPage ?? "1", 10);

    if (!Number.isInteger(parsedPage) || parsedPage < 2) {
      return 1;
    }

    return Math.min(parsedPage, totalPages);
  };

  const writePageToUrl = (page: number, mode: "push" | "replace") => {
    if (!pageQueryParam || typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);

    if (page <= 1) {
      url.searchParams.delete(pageQueryParam);
    } else {
      url.searchParams.set(pageQueryParam, String(page));
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", nextUrl);
  };

  const goToPage = (page: number, historyMode: "push" | "replace" = "push") => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    writePageToUrl(nextPage, historyMode);
    scrollToContentStart();
  };

  useEffect(() => {
    const syncedPage = pageQueryParam ? readPageFromUrl() : 1;
    setCurrentPage((previousPage) => {
      if (!pageQueryParam) {
        return Math.min(previousPage, totalPages);
      }

      return previousPage === syncedPage ? previousPage : syncedPage;
    });

    if (pageQueryParam) {
      writePageToUrl(syncedPage, "replace");

      const handlePopState = () => {
        setCurrentPage(readPageFromUrl());
        scrollToContentStart("auto");
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [pageQueryParam, totalPages]);

  const scrollRail = (direction: "left" | "right") => {
    const rail = containerRef.current;

    if (!rail) {
      return;
    }

    const amount = Math.max(rail.clientWidth * 0.85, 320);
    rail.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={styles.contentStart} ref={contentStartRef} />

      {hasOverflow ? (
        <div className={controlsClassName}>
          <button aria-label={leftLabel} className={controlClassName} onClick={() => scrollRail("left")} type="button">
            <DirectionalControlIcon direction="left" />
          </button>
          <button aria-label={rightLabel} className={controlClassName} onClick={() => scrollRail("right")} type="button">
            <DirectionalControlIcon direction="right" />
          </button>
        </div>
      ) : null}

      <div className={listClassName} ref={containerRef}>
        {visibleItems.map((item, index) => renderItem(item, index))}
      </div>

      {totalPages > 1 ? (
        <nav aria-label={paginationLabel} className={paginationClassName}>
          <div className={paginationPagesClassName}>
            {currentPage > 1 ? (
              <button
                aria-label="Previous page"
                className={joinClassNames(paginationPageClassName, styles.paginationDirectionalControl)}
                onClick={() => goToPage(currentPage - 1)}
                type="button"
              >
                <DirectionalControlIcon direction="left" />
              </button>
            ) : null}

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              if (page === currentPage) {
                return (
                  <span aria-current="page" className={paginationPageActiveClassName} key={page}>
                    {page}
                  </span>
                );
              }

              return (
                <button
                  className={paginationPageClassName}
                  key={page}
                  onClick={() => goToPage(page)}
                  type="button"
                >
                  {page}
                </button>
              );
            })}

            {currentPage < totalPages ? (
              <button
                aria-label="Next page"
                className={joinClassNames(paginationPageClassName, styles.paginationDirectionalControl)}
                onClick={() => goToPage(currentPage + 1)}
                type="button"
              >
                <DirectionalControlIcon direction="right" />
              </button>
            ) : null}
          </div>
        </nav>
      ) : null}
    </>
  );
}