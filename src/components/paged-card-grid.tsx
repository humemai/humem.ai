"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRailOverflow } from "@/components/use-rail-overflow";

type PagedCardGridProps<T> = {
  items: readonly T[];
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
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
  currentPage,
  totalPages,
  getPageHref,
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
  const hasOverflow = canScrollLeft || canScrollRight;

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
      {hasOverflow ? (
        <div className={controlsClassName}>
          <button aria-label={leftLabel} className={controlClassName} onClick={() => scrollRail("left")} type="button">
            <span aria-hidden="true">←</span>
          </button>
          <button aria-label={rightLabel} className={controlClassName} onClick={() => scrollRail("right")} type="button">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}

      <div className={listClassName} ref={containerRef}>
        {items.map((item, index) => renderItem(item, index))}
      </div>

      {totalPages > 1 ? (
        <nav aria-label={paginationLabel} className={paginationClassName}>
          <div className={paginationPagesClassName}>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <Link
                  aria-current={page === currentPage ? "page" : undefined}
                  className={page === currentPage ? paginationPageActiveClassName : paginationPageClassName}
                  href={getPageHref(page)}
                  key={page}
                >
                  {page}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </>
  );
}