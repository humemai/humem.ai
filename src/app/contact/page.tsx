import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with HumemAI about the projects, research collaborations, or contributing.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Contact"
        title="Questions, research, and collaboration."
        intro="Get in touch about the projects, a paper, a benchmark, or working together on open source memory systems."
        imageSrc="/images/site/contact-collaboration-onboarding.png"
        imageAlt="Illustration representing collaboration and conversations about open source memory systems"
      />

      <SectionIntro eyebrow="Overview" title="Get in touch.">
          <p>
            Questions about the projects, research, collaborations, or contributing are all welcome. For bugs and feature requests, an issue on the relevant GitHub repository is the fastest route.
          </p>
          <p>
            For everything else, email <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> with a short note about what you are looking for.
          </p>
      </SectionIntro>

      <SectionCta
        eyebrow="Next"
        title="Want more context before reaching out?"
        actions={[
          { href: "/projects", label: "View projects" },
          { href: "/about", label: "About HumemAI", variant: "secondary" },
        ]}
      />
    </main>
  );
}
