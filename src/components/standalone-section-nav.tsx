"use client";

import { useEffect, useState } from "react";

type StandaloneSectionNavProps = {
  sections: { id: string; navLabel: string }[];
  navClassName: string;
  innerClassName: string;
  linkClassName: string;
  activeLinkClassName: string;
};

export function StandaloneSectionNav({
  sections,
  navClassName,
  innerClassName,
  linkClassName,
  activeLinkClassName,
}: StandaloneSectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

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

  return (
    <nav aria-label="On this page" className={navClassName}>
      <div className={innerClassName}>
        {sections.map((section) => (
          <a
            className={`${linkClassName} ${activeId === section.id ? activeLinkClassName : ""}`.trim()}
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