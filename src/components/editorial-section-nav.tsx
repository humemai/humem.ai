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

    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(`a[data-section-id="${activeId}"]`);

    if (!activeLink) {
      return;
    }

    activeLink.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
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