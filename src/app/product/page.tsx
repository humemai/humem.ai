import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import styles from "./product.module.css";

export const metadata: Metadata = {
  title: "Product",
  description: "HumemAI gives agentic systems persistent, explainable memory across conversations and data.",
};

export default function ProductPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Product"
        title="A memory layer for agentic AI."
        intro="Users interact through natural language, upload documents and data, and let HumemAI organize knowledge into the right memory structures across text, tables, graphs, and vectors."
        imageSrc="/illustrations/product-hero-interface.png"
        imageAlt="Illustration of the HumemAI product across memory graph, conversation, and retrieval panels"
        actions={[
          { href: "/pricing", label: "Explore pricing" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
        titleVariant="feature"
      />

      <section className={styles.editorialSection}>
        <div className={styles.editorialLead}>
          <p className={styles.eyebrow}>What it does</p>
          <h2>HumemAI helps agents remember in structures that stay useful over time.</h2>
        </div>
        <div className={styles.editorialBody}>
          <p>
            Instead of forcing everything into one rolling chat log, HumemAI separates what happened, what is known, and how that knowledge should be retrieved later. That makes the system easier to inspect, easier to update, and more useful across sessions.
          </p>
          <p>
            The goal is not to simulate memory abstractly. It is to make memory a real product layer that can support ongoing agent workflows across conversations, documents, tables, graphs, and connected data.
          </p>
        </div>
      </section>

      <section className={styles.capabilitySection}>
        <div className={styles.capabilityItem}>
          <p className={styles.capabilityLabel}>Episodic memory</p>
          <p>Capture conversations, actions, and interaction history with enough structure to replay what happened over time.</p>
        </div>
        <div className={styles.capabilityItem}>
          <p className={styles.capabilityLabel}>Semantic memory</p>
          <p>Keep documents, tables, entities, and relationships in the format that best preserves meaning and retrieval quality.</p>
        </div>
        <div className={styles.capabilityItem}>
          <p className={styles.capabilityLabel}>Hybrid retrieval</p>
          <p>Let agents query vectors, relationships, and structured knowledge together instead of choosing one memory style for everything.</p>
        </div>
      </section>

      <section className={styles.mediaSection}>
        <div className={styles.mediaCopy}>
          <p className={styles.eyebrow}>Workspace</p>
          <h2>A workspace shaped around ingestion, retrieval, and long-term memory.</h2>
          <p>
            Teams can use HumemAI as an integrated environment for getting information into memory, exploring it in the right structure, and retrieving it later in ways that remain legible to both people and agents.
          </p>
          <p>
            If you want the operational breakdown between self-hosted, hosted, and custom options, the next stop is <Link href="/pricing">Pricing</Link>.
          </p>
        </div>

        <figure className={styles.mediaFigure}>
          <div className={styles.mediaImageWrap}>
            <Image
              src="/illustrations/hosted-workspace-mockup.png"
              alt="Illustration of a hosted HumemAI workspace"
              fill
              className={styles.mediaImage}
              quality={90}
              sizes="(min-width: 1180px) 46vw, 100vw"
            />
          </div>
        </figure>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow}>Next step</p>
          <h2>Choose how you want to use HumemAI.</h2>
          <p>
            Some teams start with the open source components and self-host. Others want a hosted setup or a deployment shaped around their workflow.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link className={styles.primaryAction} href="/pricing">
            Explore pricing
          </Link>
          <Link className={styles.secondaryAction} href="/projects">
            View open source projects
          </Link>
        </div>
      </section>
    </main>
  );
}