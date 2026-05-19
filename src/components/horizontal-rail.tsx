"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import styles from "./horizontal-rail.module.css";

type HorizontalRailProps = {
  leftLabel: string;
  rightLabel: string;
  className?: string;
  railClassName?: string;
  children: ReactNode;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function HorizontalRail({ leftLabel, rightLabel, className, railClassName, children }: HorizontalRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

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
      <div className={styles.controls}>
        <button aria-label={leftLabel} className={styles.control} onClick={() => scrollRail("left")} type="button">
          <span aria-hidden="true">←</span>
        </button>
        <button aria-label={rightLabel} className={styles.control} onClick={() => scrollRail("right")} type="button">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={joinClassNames(styles.rail, railClassName)} ref={railRef}>
        {children}
      </div>
    </div>
  );
}