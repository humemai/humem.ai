import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Product",
  description: "HumemAI gives agentic systems persistent, explainable memory across conversations and data.",
};

export default function ProductPage() {
  return (
    <ContentPage
      eyebrow="Product"
      title="HumemAI is a memory layer for agentic AI systems."
      intro="Users interact through natural language, upload documents and data, and let HumemAI organize knowledge into the right memory structures across text, tables, graphs, and vectors."
      aside={<p>HumemAI combines conversational memory, structured knowledge, and hybrid retrieval so agents can work across sessions without collapsing everything into a single context window.</p>}
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
          Teams can start with the open-source components for free or use a hosted HumemAI deployment when they want the integrated memory workspace managed for them.
        </p>
        <p>
          <Link href="/pricing">Learn more</Link>
        </p>
      </section>
    </ContentPage>
  );
}