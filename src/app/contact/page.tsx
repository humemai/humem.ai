import type { Metadata } from "next";
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

      <SectionIntro eyebrow="Overview" title="Get in touch.">
          <p>
            Questions about the product, hosted deployment, research, partnerships, or working together are all welcome.
          </p>
          <p>
            Email <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> with a short note about what you are looking for.
          </p>
      </SectionIntro>

      <SectionCta
        eyebrow="Next"
        title="Want more context before reaching out?"
        actions={[
          { href: "/product", label: "See the product" },
          { href: "/pricing", label: "Explore pricing", variant: "secondary" },
        ]}
      />
    </main>
  );
}