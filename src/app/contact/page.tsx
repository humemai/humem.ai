import type { Metadata } from "next";
import { DetailSection } from "@/components/detail-section";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to HumemAI about early access, partnerships, and custom deployments.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Contact"
        title="Early access, partnerships, and custom work."
        intro="Get in touch about early access, hosted deployment, custom work, or collaboration."
        imageSrc="/illustrations/contact-collaboration-onboarding.png"
        imageAlt="Illustration representing collaboration, onboarding, and hosted deployment conversations"
      />

      <SectionIntro eyebrow="Overview" title="Use one contact point for product, research, and partnerships.">
          <p>
            HumemAI keeps contact simple. The same inbox can be used for early access, hosted deployments, custom memory workflows, project collaborations, and hiring conversations.
          </p>
          <p>
            If you already know what you need, include your use case, data types, current stack, and whether you are looking for open source, hosted deployment, or custom work.
          </p>
      </SectionIntro>

      <DetailSection eyebrow="Email" title="Contact HumemAI directly." divider id="early-access">
          <p>
            Email <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> for hosted HumemAI, early access, custom memory workflows, research collaborations, partnerships, or hiring conversations.
          </p>
          <p>
            If you want a hosted setup instead of self-hosting the open-source projects, include your use case, data types, and whether you need a GUI, hosted deployment, or future API access.
          </p>
      </DetailSection>

      <SectionCta
        eyebrow="Next"
        title="Want more context before reaching out?"
        actions={[
          { href: "/product", label: "See the product" },
          { href: "/pricing", label: "Explore pricing", variant: "secondary" },
        ]}
      >
        <p>Browse the product and pricing pages first if you want more context.</p>
      </SectionCta>
    </main>
  );
}