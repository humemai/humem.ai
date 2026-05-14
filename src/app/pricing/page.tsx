import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      title="Start free, or go hosted."
      intro="HumemAI offers an open-source path for developers, a hosted path for teams that want faster outcomes, and custom engagements for integration-heavy deployments."
      aside={
        <figure className="heroFigure">
          <div className="heroFigureImageWrap">
            <Image
              src="/illustrations/pricing-deployment-paths.png"
              alt="Pricing illustration"
              fill
              className="heroFigureImage"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <figcaption className="heroFigureCaption">
            Start with the open-source repositories, contact HumemAI for hosted access, or work with us directly on custom deployments.
          </figcaption>
        </figure>
      }
    >
      <div className={styles.grid}>
        <a className={`${styles.card} ${styles.cardLink}`} href="https://github.com/humemai" target="_blank" rel="noopener noreferrer">
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
          <span className={styles.action}>Learn more</span>
        </a>

        <Link className={`${styles.card} ${styles.cardLink}`} href="/contact#early-access">
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
          <span className={styles.action}>Learn more</span>
        </Link>

        <Link className={`${styles.card} ${styles.cardLink}`} href="/contact">
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
          <span className={styles.action}>Learn more</span>
        </Link>
      </div>
    </ContentPage>
  );
}