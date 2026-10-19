import { PageHero } from "@/components/page-hero";
import { SectionCta } from "@/components/section-blocks";
import { getSectionEntries, type Section } from "@/lib/projects";
import { githubOrgUrl } from "@/lib/site-data";
import { SectionIndex } from "./section-index";
import styles from "./projects.module.css";

export const sectionCopy = {
  software: {
    label: "Software",
    metaDescription: "Open source HumemAI software: databases, a benchmark, and tools you can install and run.",
    heroTitle: "Open source software.",
    heroIntro:
      "Databases, a benchmark, and tools for AI memory. The code is public. Try it, read it, and tell us what breaks.",
    heroImage: "/images/projects/software-overview.png",
    heroImageAlt: "Three stacked blocks with a rose block on top, standing for software built up from parts.",
    indexEyebrow: "Software",
    indexTitle: "What you can run.",
    noun: "software",
    actionLabel: "Learn more",
    ctaTitle: "Everything here is open source. Come build it with us.",
    ctaBody: [
      "The code and the benchmark settings are public. Open an issue when something is wrong, send a pull request with a fix, or run a benchmark on your own hardware and tell us what you got.",
      "If you work on multi-model databases, query compilers, or agent memory, get in touch.",
    ],
  },
  research: {
    label: "Research",
    metaDescription: "HumemAI research: the thesis on human-like memory for machines, and the papers and benchmarks behind it.",
    heroTitle: "Research on AI memory.",
    heroIntro:
      "The thesis on machines with human-like memory, the papers that came out of it, and the benchmark papers on databases. The papers, code, and data are public.",
    heroImage: "/images/projects/research-overview.png",
    heroImageAlt: "An open book with a small three-node graph above it and a rose node at the top, standing for research written down.",
    indexEyebrow: "Research",
    indexTitle: "What we have published.",
    noun: "research",
    actionLabel: "Read more",
    ctaTitle: "Reproduce it, cite it, or work on it with us.",
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
