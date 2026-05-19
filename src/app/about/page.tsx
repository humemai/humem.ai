import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Background on HumemAI and the origin of its memory-oriented approach.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>About</p>
          <h1>From memory research to practical AI.</h1>
          <p className={styles.intro}>
            HumemAI started from research into human-like memory systems for AI and now focuses on turning that work into practical tools and products.
          </p>
        </div>

        <figure className={styles.heroFigure}>
          <div className={styles.heroImageWrap}>
            <Image
              src="/illustrations/about-memory-architecture.png"
              alt="Illustration of connected memory structures and stored knowledge"
              fill
              className={styles.heroImage}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </figure>
      </section>

      <section className={styles.editorialSection}>
        <div className={styles.editorialLead}>
          <p className={styles.eyebrow}>Overview</p>
          <h2>Memory should be a real system layer, not a prompt trick.</h2>
        </div>
        <div className={styles.editorialBody}>
          <p>
            HumemAI is built around a straightforward idea: conversations and data are not the same thing.
          </p>
          <p>
            Agentic systems need memory structures that stay structured, inspectable, and durable over time.
          </p>
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>Origin</p>
          <h2>From research into usable systems.</h2>
        </div>
        <div className={styles.detailLayout}>
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
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow}>Next</p>
          <h2>Explore the projects behind the work.</h2>
          <p>
            Browse the main project lines behind HumemAI.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link className={styles.primaryAction} href="/projects">
            View projects
          </Link>
          <Link className={styles.secondaryAction} href="/contact">
            Contact HumemAI
          </Link>
        </div>
      </section>
    </main>
  );
}