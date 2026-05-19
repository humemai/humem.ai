"use client";

import { useEffect, useRef, useState } from "react";

export function useRailOverflow<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateScrollState = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(container.scrollLeft > 4);
      setCanScrollRight(maxScrollLeft - container.scrollLeft > 4);
    };

    updateScrollState();

    const animationFrame = window.requestAnimationFrame(updateScrollState);
    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });

    resizeObserver.observe(container);
    Array.from(container.children).forEach((child) => {
      resizeObserver.observe(child);
    });

    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
  };
}