import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "About",
  description: "Background on HumemAI and the origin of its memory-oriented approach.",
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="About"
      title="HumemAI grew out of research, but it should read like a product company."
      intro="Use this page for the founder story, the PhD roots, and the long-term vision, but keep it connected to the product and not isolated as pure research branding."
    >
      <section>
        <h2>Origin</h2>
        <p>
          The central idea is simple: conversations and data should not be treated as the same thing, and agentic systems need better memory structures than a single flat context window.
        </p>
      </section>
    </ContentPage>
  );
}