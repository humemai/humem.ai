import type { Metadata } from "next";
import { DetailSection } from "@/components/detail-section";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
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

      <SectionIntro eyebrow="Overview" title="Strong people across research, systems, and product engineering.">
          <p>
            The team is interested in people who want to build agents with memory. That can mean research, engineering, product work, design, infrastructure, or something harder to label but clearly relevant.
          </p>
          <p>
            If you are drawn to persistent memory, knowledge systems, retrieval, databases, or the user experience around intelligent systems, HumemAI would be glad to hear from you.
          </p>
      </SectionIntro>

      <DetailSection eyebrow="Fit" title="Research, engineering, or something in between." divider>
          <p>
            That can mean explicit memory architectures, evaluation and benchmarks, databases and graph-query systems, product engineering, or design around memory-heavy AI workflows.
          </p>
          <p>
            Strong projects, writing, prototypes, or research are all useful signals. The team cares about how you think, not just which title you have held.
          </p>
      </DetailSection>

      <SectionCta
        eyebrow="Reach out"
        title="Interested in working with HumemAI?"
        actions={[
          { href: "mailto:info@humem.ai?subject=HumemAI%20careers", label: "Email careers" },
          { href: "/about", label: "About HumemAI", variant: "secondary" },
        ]}
      >
        <p>
          Send a note to <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> with your background and any projects, writing, or research that show how you think.
        </p>
      </SectionCta>
    </main>
  );
}