import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
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
        imageSrc="/illustrations/privacy-policy-trust-and-choice.png"
        imageAlt="Illustration representing privacy, transparency, and user control."
        caption="HumemAI keeps analytics optional and makes cookie choices available from the footer."
      />

      <section className={styles.editorialSection}>
        <div className={styles.editorialLead}>
          <p className={styles.eyebrow}>Overview</p>
          <h2>Minimal collection, optional analytics, and clear user choice.</h2>
        </div>
        <div className={styles.editorialBody}>
          <p>
            HumemAI keeps this website simple. We use analytics only when you explicitly accept analytics cookies, and we use contact information only when you choose to send it to us.
          </p>
          <p>
            This page explains what is collected, when it is collected, and how you can revisit those choices later.
          </p>
        </div>
      </section>

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

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow}>Questions</p>
          <h2>Need clarification about privacy or cookies?</h2>
          <p>
            If anything here is unclear, contact HumemAI directly. For broader company and product updates, you can also browse the latest news.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link className={styles.primaryAction} href="/contact">
            Contact HumemAI
          </Link>
          <Link className={styles.secondaryAction} href="/news">
            View latest news
          </Link>
        </div>
      </section>

    </main>
  );
}