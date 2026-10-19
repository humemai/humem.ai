import { PageHero } from "@/components/page-hero";
import { SectionCta } from "@/components/section-blocks";
import { getSectionEntries, type Section } from "@/lib/projects";
import { githubOrgUrl } from "@/lib/site-data";
import { SectionIndex } from "./section-index";
import styles from "./projects.module.css";

export const sectionCopy = {
  software: {
    label: "Software",
    metaDescription: "Open source HumemAI software: databases and tools you can install and run.",
    heroTitle: "Open source software.",
    heroIntro:
      "The databases and the tools we build for AI memory. All of it is on GitHub.",
    heroImage: "/images/projects/software-overview.png",
    heroImageAlt: "Three stacked blocks with a rose block on top, standing for software built up from parts.",
    indexEyebrow: "Software",
    indexTitle: "Databases and tools.",
    noun: "software",
    actionLabel: "Learn more",
    ctaTitle: "Everything here is open source. Come build it with us.",
    ctaBody: [
      "The code is public. Open an issue when something is wrong, send a pull request with a fix, or run a benchmark on your own hardware and tell us what you got.",
      "If you work on multi-model databases, query compilers, or agent memory, get in touch.",
    ],
  },
  research: {
    label: "Research",
    metaDescription: "HumemAI research: human-like memory for machines with AI and knowledge graphs, and multi-model databases.",
    heroTitle: "Research on AI memory and databases.",
    heroIntro:
      "It started with machines that have human-like memory, built with AI and knowledge graphs. It now covers databases too, multi-model ones in particular, and the benchmarks that compare them. The papers, code, and data are all public.",
    heroImage: "/images/projects/research-overview.png",
    heroImageAlt: "An open book with a small three-node graph above it and a rose node at the top, standing for research written down.",
    indexEyebrow: "Research",
    indexTitle: "Papers and benchmarks.",
    noun: "research",
    actionLabel: "Read more",
    ctaTitle: "Reproduce it, or work on it with us.",
    ctaBody: [
      "The papers, code, and data behind each result are public. Open an issue when you find a mistake, or reproduce a result on your own hardware and tell us what you measured.",
      "Research collaborations are welcome, on memory for agents, knowledge graphs, or databases.",
    ],
  },
} as const satisfies Record<Section, unknown>;

export function SectionPage({ section }: { section: Section }) {
  const copy = sectionCopy[section];

  return (
    <main className={styles.indexPage}>
      <PageHero
        eyebrow={copy.label}
        title={copy.heroTitle}
        intro={copy.heroIntro}
        imageSrc={copy.heroImage}
        imageAlt={copy.heroImageAlt}
        actions={[
          { href: githubOrgUrl, label: "View HumemAI on GitHub" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      />

      <SectionIndex
        entries={getSectionEntries(section)}
        eyebrow={copy.indexEyebrow}
        title={copy.indexTitle}
        noun={copy.noun}
        actionLabel={copy.actionLabel}
      />

      <SectionCta
        eyebrow="Contribute"
        title={copy.ctaTitle}
        actions={[
          { href: githubOrgUrl, label: "View HumemAI on GitHub" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      >
        {copy.ctaBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </SectionCta>
    </main>
  );
}
