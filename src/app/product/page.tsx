import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import { SplitMediaSection } from "@/components/split-media-section";
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

      <SectionIntro eyebrow="What it does" title="HumemAI helps agents remember in structures that stay useful over time.">
          <p>
            Instead of forcing everything into one rolling chat log, HumemAI separates what happened, what is known, and how that knowledge should be retrieved later. That makes the system easier to inspect, easier to update, and more useful across sessions.
          </p>
          <p>
            The goal is not to simulate memory abstractly. It is to make memory a real product layer that can support ongoing agent workflows across conversations, documents, tables, graphs, and connected data.
          </p>
      </SectionIntro>

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

      <SplitMediaSection
        eyebrow="Workspace"
        title="A workspace shaped around ingestion, retrieval, and long-term memory."
        imageSrc="/illustrations/hosted-workspace-mockup.png"
        imageAlt="Illustration of a hosted HumemAI workspace"
        imageQuality={90}
      >
          <p>
            Teams can use HumemAI as an integrated environment for getting information into memory, exploring it in the right structure, and retrieving it later in ways that remain legible to both people and agents.
          </p>
          <p>
            If you want the operational breakdown between self-hosted, hosted, and custom options, the next stop is <Link href="/pricing">Pricing</Link>.
          </p>
      </SplitMediaSection>

      <SectionCta
        eyebrow="Next step"
        title="Choose how you want to use HumemAI."
        actions={[
          { href: "/pricing", label: "Explore pricing" },
          { href: "/projects", label: "View open source projects", variant: "secondary" },
        ]}
      >
        <p>
          Some teams start with the open source components and self-host. Others want a hosted setup or a deployment shaped around their workflow.
        </p>
      </SectionCta>
    </main>
  );
}