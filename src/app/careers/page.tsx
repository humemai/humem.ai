import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionIntro } from "@/components/section-blocks";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description: "HumemAI is looking for people who can contribute across research, engineering, product, design, and systems.",
};

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Careers"
        title="Help build AI memory that lasts."
        intro="HumemAI is looking for people who care about building AI systems with memory, structure, and long-term usefulness."
        imageSrc="/images/site/careers-build-with-memory.png"
        imageAlt="Illustration representing collaborative work on AI memory systems"
      />

      <SectionIntro eyebrow="Overview" title="If you can contribute, HumemAI would like to hear from you.">
        <p>
          HumemAI is interested in people who can contribute to building agents with memory. That can mean research, engineering, product work, design, infrastructure, or something else that is clearly useful.
        </p>
        <p>
          If that sounds like you, email <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> with your background and relevant work.
        </p>
      </SectionIntro>
    </main>
  );
}