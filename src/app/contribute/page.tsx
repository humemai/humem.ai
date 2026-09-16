import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import { githubOrgUrl } from "@/lib/site-data";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "Contribute",
  description: "How to contribute to HumemAI: issues, pull requests, benchmarks, and research collaborations.",
};

export default function ContributePage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Contribute"
        title="Help build AI memory that lasts."
        intro="HumemAI is developed in the open. Anyone who cares about AI systems with memory, structure, and long-term usefulness can take part."
        imageSrc="/images/site/contribute-build-with-memory.png"
        imageAlt="Illustration representing collaborative work on AI memory systems"
        actions={[
          { href: githubOrgUrl, label: "View GitHub" },
          { href: "/projects", label: "View projects", variant: "secondary" },
        ]}
      />

      <SectionIntro eyebrow="Ways to help" title="Code, benchmarks, writing, and research all count.">
        <p>
          The most direct way in is a repository on <a className={styles.textLink} href={githubOrgUrl} target="_blank" rel="noopener noreferrer">GitHub</a>. Open an issue when something is wrong or missing, send a pull request when you have a fix, or reproduce a benchmark on your own hardware and report what you measured.
        </p>
        <p>
          Research collaborations are welcome too. If you work on memory for agents, knowledge graphs, or multi-model databases and want to build on one of the projects, email <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> with a short note about what you have in mind.
        </p>
      </SectionIntro>

      <SectionCta
        eyebrow="Next"
        title="Pick a project and start there."
        actions={[
          { href: "/projects", label: "View projects" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      >
        <p>
          Each project page links to its repository, its papers, and the benchmarks behind it.
        </p>
      </SectionCta>
    </main>
  );
}
