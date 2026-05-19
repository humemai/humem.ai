"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { DirectionalControlIcon } from "./directional-control-icon";
import styles from "./horizontal-rail.module.css";
import { useRailOverflow } from "./use-rail-overflow";

type HorizontalRailProps = {
  leftLabel: string;
  rightLabel: string;
  className?: string;
  railClassName?: string;
  action?: { href: string; label: string };
  children: ReactNode;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function HorizontalRail({ leftLabel, rightLabel, className, railClassName, action, children }: HorizontalRailProps) {
  const { containerRef: railRef, canScrollLeft, canScrollRight } = useRailOverflow<HTMLDivElement>();
  const hasOverflow = canScrollLeft || canScrollRight;

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;

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
    <div className={joinClassNames(styles.wrap, className)}>
      <div className={styles.toolbar}>
        {action ? (
          <Link className={styles.action} href={action.href}>
            {action.label}
          </Link>
        ) : null}
        {hasOverflow ? (
          <div className={styles.controls}>
            <button aria-label={leftLabel} className={styles.control} onClick={() => scrollRail("left")} type="button">
              <DirectionalControlIcon direction="left" />
            </button>
            <button aria-label={rightLabel} className={styles.control} onClick={() => scrollRail("right")} type="button">
              <DirectionalControlIcon direction="right" />
            </button>
          </div>
        ) : null}
      </div>

      <div className={joinClassNames(styles.rail, railClassName)} ref={railRef}>
        {children}
      </div>
    </div>
  );
}