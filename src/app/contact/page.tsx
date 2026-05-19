import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
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

      <section className={styles.editorialSection}>
        <div className={styles.editorialLead}>
          <p className={styles.eyebrow}>Overview</p>
          <h2>Use one contact point for product, research, and partnerships.</h2>
        </div>
        <div className={styles.editorialBody}>
          <p>
            HumemAI keeps contact simple. The same inbox can be used for early access, hosted deployments, custom memory workflows, project collaborations, and hiring conversations.
          </p>
          <p>
            If you already know what you need, include your use case, data types, current stack, and whether you are looking for open source, hosted deployment, or custom work.
          </p>
        </div>
      </section>

      <section className={styles.detailSection} id="early-access">
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>Email</p>
          <h2>Contact HumemAI directly.</h2>
        </div>
        <div className={styles.sectionBody}>
          <p>
            Email <a className={styles.textLink} href="mailto:info@humem.ai">info@humem.ai</a> for hosted HumemAI, early access, custom memory workflows, research collaborations, partnerships, or hiring conversations.
          </p>
          <p>
            If you want a hosted setup instead of self-hosting the open-source projects, include your use case, data types, and whether you need a GUI, hosted deployment, or future API access.
          </p>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow}>Next</p>
          <h2>Want more context before reaching out?</h2>
          <p>
            Browse the product and pricing pages first if you want more context.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link className={styles.primaryAction} href="/product">
            See the product
          </Link>
          <Link className={styles.secondaryAction} href="/pricing">
            Explore pricing
          </Link>
        </div>
      </section>
    </main>
  );
}