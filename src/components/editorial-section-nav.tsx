"use client";

import { useEffect, useRef, useState } from "react";

type EditorialSectionNavProps = {
  sections: { id: string; navLabel: string }[];
  navClassName: string;
  innerClassName: string;
  linkClassName: string;
  activeLinkClassName: string;
};

export function EditorialSectionNav({
  sections,
  navClassName,
  innerClassName,
  linkClassName,
  activeLinkClassName,
}: EditorialSectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const offset = 180;
      let nextActiveId = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= offset) {
          nextActiveId = section.id;
        }
      }

      setActiveId(nextActiveId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  useEffect(() => {
    if (!activeId || !navRef.current) {
      return;
    }

    const nav = navRef.current;
    const activeLink = nav.querySelector<HTMLAnchorElement>(`a[data-section-id="${activeId}"]`);

    if (!activeLink) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const targetLeft = activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2;
    const isOutOfView = linkRect.left < navRect.left || linkRect.right > navRect.right;

    if (isOutOfView) {
      nav.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "auto",
      });
    }
  }, [activeId]);

  return (
    <nav aria-label="On this page" className={navClassName} ref={navRef}>
      <div className={innerClassName}>
        {sections.map((section) => (
          <a
            className={`${linkClassName} ${activeId === section.id ? activeLinkClassName : ""}`.trim()}
            data-section-id={section.id}
            href={`#${section.id}`}
            key={section.id}
          >
            {section.navLabel}
          </a>
        ))}
      </div>
    </nav>
  );
}