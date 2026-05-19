import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description: "HumemAI is looking for strong people across AI, data systems, and product engineering.",
};

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Careers"
        title="Help build AI memory that lasts."
        intro="HumemAI is looking for people who care about building AI systems with memory, structure, and long-term usefulness."
        imageSrc="/illustrations/careers-build-with-memory.png"
        imageAlt="Illustration representing collaborative work on AI memory systems"
      />

      <section className={styles.editorialSection}>
        <div className={styles.editorialLead}>
          <p className={styles.eyebrow}>Overview</p>
          <h2>Strong people across research, systems, and product engineering.</h2>
        </div>
        <div className={styles.editorialBody}>
          <p>
            The team is interested in people who want to build agents with memory. That can mean research, engineering, product work, design, infrastructure, or something harder to label but clearly relevant.
          </p>
          <p>
            If you are drawn to persistent memory, knowledge systems, retrieval, databases, or the user experience around intelligent systems, HumemAI would be glad to hear from you.
          </p>
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>Fit</p>
          <h2>Research, engineering, or something in between.</h2>
        </div>
        <div className={styles.sectionBody}>
          <p>
            That can mean explicit memory architectures, evaluation and benchmarks, databases and graph-query systems, product engineering, or design around memory-heavy AI workflows.
          </p>
          <p>
            Strong projects, writing, prototypes, or research are all useful signals. The team cares about how you think, not just which title you have held.
          </p>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow}>Reach out</p>
          <h2>Interested in working with HumemAI?</h2>
          <p>
            Send a note to <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> with your background and any projects, writing, or research that show how you think.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <a className={styles.primaryAction} href="mailto:info@humem.ai?subject=HumemAI%20careers">
            Email careers
          </a>
          <Link className={styles.secondaryAction} href="/about">
            About HumemAI
          </Link>
        </div>
      </section>
    </main>
  );
}