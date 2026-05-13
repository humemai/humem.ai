import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free open source, hosted deployments, and custom HumemAI engagements.",
};

export default function PricingPage() {
  return (
    <ContentPage
      eyebrow="Pricing"
      title="Start free, or pay for the integrated hosted experience."
      intro="The pricing story should be honest: open source for developers, hosted HumemAI for teams that want outcomes, and custom options for integration-heavy use cases."
      aside={<p>For the first pass, this page should explain the model clearly rather than pretending the product already has rigid SaaS tiers.</p>}
    >
      <div className={styles.grid}>
        <section className={styles.card}>
          <p className={styles.label}>Free</p>
          <h2>Self-host the open-source stack</h2>
          <p>
            Explore HumemAI repositories, run the components yourself, and build memory-enabled systems with full control.
          </p>
          <ul>
            <li>Open-source projects</li>
            <li>Developer-first experimentation</li>
            <li>Bring your own infrastructure</li>
          </ul>
          <p>
            <a href="https://github.com/humemai" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </p>
        </section>

        <section className={styles.card}>
          <p className={styles.label}>Cloud</p>
          <h2>Use the hosted HumemAI experience</h2>
          <p>
            Get the managed workspace with file ingestion, natural-language interaction, and the integrated memory stack operated for you.
          </p>
          <ul>
            <li>Hosted GUI</li>
            <li>Managed deployment and operations</li>
            <li>Designed for teams that want outcomes fast</li>
          </ul>
        </section>

        <section className={styles.card}>
          <p className={styles.label}>Custom</p>
          <h2>Tailored setups for specific customer needs</h2>
          <p>
            Combine the relevant knowledge, repositories, data connectors, and workflows into a deployment shaped around your use case.
          </p>
          <ul>
            <li>Custom integrations</li>
            <li>Customer-specific memory workflows</li>
            <li>Future API and enterprise support</li>
          </ul>
        </section>
      </div>
    </ContentPage>
  );
}