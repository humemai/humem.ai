import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import styles from "./privacy-policy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HumemAI handles analytics, cookie choices, and contact information shared through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        intro="How HumemAI handles analytics, cookie choices, and information shared through this website."
        imageSrc="/images/site/privacy-policy-trust-and-choice.png"
        imageAlt="Illustration representing privacy, transparency, and user control."
        caption="HumemAI keeps analytics optional and makes cookie choices available from the footer."
      />

      <SectionIntro eyebrow="Overview" title="Minimal collection, optional analytics, and clear user choice.">
          <p>
            HumemAI keeps this website simple. We use analytics only when you explicitly accept analytics cookies, and we use contact information only when you choose to send it to us.
          </p>
          <p>
            This page explains what is collected, when it is collected, and how you can revisit those choices later.
          </p>
      </SectionIntro>

      <section className={styles.policySection}>
        <article className={styles.policyItem}>
          <p className={styles.policyLabel}>Analytics</p>
          <h3>Website analytics</h3>
          <p>
            HumemAI uses Google Analytics only if you accept analytics cookies. If you accept, analytics is used only to understand aggregate website usage, such as which pages are visited and how people move through the site.
          </p>
        </article>

        <article className={styles.policyItem}>
          <p className={styles.policyLabel}>Cookies</p>
          <h3>Cookie choices</h3>
          <p>
            You can accept or decline analytics cookies from the banner shown on first visit. You can also reopen those choices later through the cookie settings link in the footer.
          </p>
        </article>

        <article className={styles.policyItem}>
          <p className={styles.policyLabel}>Contact</p>
          <h3>Contact information</h3>
          <p>
            If you contact HumemAI by email or through the contact page, the information you provide is used only to respond to your message and continue the conversation you started.
          </p>
        </article>

        <article className={styles.policyItem}>
          <p className={styles.policyLabel}>Changes</p>
          <h3>Updates</h3>
          <p>
            This policy may be updated as the site, analytics setup, or contact workflows change.
          </p>
        </article>
      </section>

      <SectionCta
        eyebrow="Questions"
        title="Need clarification about privacy or cookies?"
        actions={[
          { href: "/contact", label: "Contact HumemAI" },
          { href: "/news", label: "View latest news", variant: "secondary" },
        ]}
      >
        <p>
          If anything here is unclear, contact HumemAI directly. For broader company and product updates, you can also browse the latest news.
        </p>
      </SectionCta>

    </main>
  );
}