import type { Metadata } from "next";
import Image from "next/image";
import { DetailSection } from "@/components/detail-section";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Background on HumemAI and the origin of its memory-oriented approach.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="About"
        title="From memory research to practical AI."
        intro="HumemAI started from research into human-like memory systems for AI and now focuses on turning that work into practical tools and products."
        imageSrc="/illustrations/about-memory-architecture.png"
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

      <DetailSection eyebrow="Origin" title="From research into usable systems." divider bodyClassName={styles.detailLayout}>
          <div className={styles.detailContent}>
            <a className={styles.inlineImageLink} href="https://taewoon.kim/" target="_blank" rel="noopener noreferrer">
              <div className={styles.inlineImageWrap}>
                <Image
                  src="/illustrations/taewoon-kim-founder.png"
                  alt="Portrait of Taewoon Kim, founder of HumemAI"
                  fill
                  className={styles.heroImage}
                  sizes="(max-width: 1024px) 176px, 208px"
                />
              </div>
            </a>
            <p>
              HumemAI was founded by <a className={styles.textLink} href="https://taewoon.kim/" target="_blank" rel="noopener noreferrer">Taewoon Kim</a>, an AI researcher and engineer working on agentic memory.
            </p>
            <p>
              The company grows out of research on human-like memory systems and explicit memory architectures for AI, with a practical goal: turn those ideas into software that teams can use to build reliable agents.
            </p>
          </div>
      </DetailSection>

      <SectionCta
        eyebrow="Next"
        title="Explore the projects behind the work."
        actions={[
          { href: "/projects", label: "View projects" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      >
        <p>Browse the main project lines behind HumemAI.</p>
      </SectionCta>
    </main>
  );
}