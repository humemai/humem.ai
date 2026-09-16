import type { Metadata } from "next";
import Image from "next/image";
import { DetailSection } from "@/components/detail-section";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import { githubOrgUrl, pypiOrgUrl } from "@/lib/site-data";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "HumemAI is an open source organization building memory systems for agentic AI.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="About"
        title="An open source organization for AI memory."
        intro="HumemAI grew out of research into human-like memory systems for AI. Today it is an open source organization that publishes that research, the code behind it, and the benchmarks that test it."
        imageSrc="/images/site/about-memory-architecture.png"
        imageAlt="Illustration of connected memory structures and stored knowledge"
      />

      <SectionIntro eyebrow="Overview" title="Memory should be a real system layer, not a prompt trick.">
          <p>
            HumemAI is built around a straightforward idea: conversations and data are not the same thing.
          </p>
          <p>
            Agentic systems need memory structures that stay structured, inspectable, and durable over time.
          </p>
      </SectionIntro>

      <SectionIntro eyebrow="How it works" title="Open licenses, public repositories, no product.">
          <p>
            Every HumemAI project is published under an open license on <a className={styles.textLink} href={githubOrgUrl} target="_blank" rel="noopener noreferrer">GitHub</a>, and the Python packages are released through the HumemAI organization on <a className={styles.textLink} href={pypiOrgUrl} target="_blank" rel="noopener noreferrer">PyPI</a>. Anyone can run, modify, and redistribute the code.
          </p>
          <p>
            HumemAI does not sell software or services. There is no hosted offering, no pricing, and no paid tier. The work is done by the people who contribute to it.
          </p>
      </SectionIntro>

      <DetailSection eyebrow="Origin" title="From research into usable systems." divider bodyClassName={styles.detailLayout}>
          <div data-prose data-prose-column className={styles.detailContent}>
            <a className={styles.inlineImageLink} href="https://taewoon.kim/" target="_blank" rel="noopener noreferrer">
              <div className={styles.inlineImageWrap}>
                <Image
                  src="/images/site/taewoon-kim.png"
                  alt="Portrait of Taewoon Kim, who started HumemAI"
                  fill
                  className={styles.heroImage}
                  sizes="(max-width: 1024px) 176px, 208px"
                />
              </div>
            </a>
            <p>
              HumemAI was started by <a className={styles.textLink} href="https://taewoon.kim/" target="_blank" rel="noopener noreferrer">Taewoon Kim</a>, an AI researcher and engineer working on agentic memory, and is maintained together with the contributors to each project.
            </p>
            <p>
              The organization grows out of research on human-like memory systems and explicit memory architectures for AI, with a practical goal: turn those ideas into software that anyone can use to build reliable agents.
            </p>
          </div>
      </DetailSection>

      <SectionCta
        eyebrow="Next"
        title="Explore the projects behind the work."
        actions={[
          { href: "/projects", label: "View projects" },
          { href: githubOrgUrl, label: "View GitHub", variant: "secondary" },
        ]}
      />
    </main>
  );
}
