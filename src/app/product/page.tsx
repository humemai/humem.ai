import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import styles from "./product.module.css";

export const metadata: Metadata = {
  title: "Product",
  description: "HumemAI gives agentic systems persistent, explainable memory across conversations and data.",
};

export default function ProductPage() {
  return (
    <ContentPage
      eyebrow="Product"
      title="A memory layer for agentic AI."
      intro="Users interact through natural language, upload documents and data, and let HumemAI organize knowledge into the right memory structures across text, tables, graphs, and vectors."
      aside={
        <figure className="heroFigure">
          <div className="heroFigureImageWrap">
            <Image
              src="/illustrations/product-hero-interface.png"
              alt="Illustration of the HumemAI product across memory graph, conversation, and retrieval panels"
              fill
              className="heroFigureImage"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <figcaption className="heroFigureCaption">
            HumemAI combines conversational memory, structured knowledge, and hybrid retrieval so agents can work across sessions without collapsing everything into a single context window.
          </figcaption>
        </figure>
      }
    >
      <section>
        <h2>What HumemAI does</h2>
        <p>
          HumemAI helps agents remember across sessions. It combines conversational memory with connected knowledge so the system can retrieve context, reason across formats, and remain inspectable instead of acting like a stateless chat wrapper.
        </p>
      </section>

      <section>
        <h2>How it works</h2>
        <ul>
          <li>Episodic memory captures conversations and interactions over time.</li>
          <li>Semantic memory keeps documents, tables, graphs, and data in useful structures.</li>
          <li>Hybrid retrieval lets agents query relationships, vectors, and structured knowledge together.</li>
        </ul>
      </section>

      <section>
        <h2>Product paths</h2>
        <p>
          HumemAI can be explored in different ways depending on how hands-on you want to be. Some teams start by working directly with the open-source components, while others want a hosted setup or a more tailored deployment around their workflow.
        </p>
        <p>
          For a clearer breakdown of self-hosted, hosted, and custom options, see <Link href="/pricing">Pricing</Link>.
        </p>
        <figure className={styles.sectionFigure}>
          <div className={styles.sectionImageWrap}>
            <Image
              src="/illustrations/hosted-workspace-mockup.png"
              alt="Illustration of a hosted HumemAI workspace"
              fill
              className={styles.sectionImage}
              quality={90}
              sizes="(min-width: 1180px) 1080px, (min-width: 720px) calc(100vw - 6rem), calc(100vw - 4rem)"
            />
          </div>
          <figcaption className={styles.sectionCaption}>
            Teams that want the integrated hosted experience can use a workspace shaped around ingestion, retrieval, and long-term memory workflows.
          </figcaption>
        </figure>
      </section>
    </ContentPage>
  );
}