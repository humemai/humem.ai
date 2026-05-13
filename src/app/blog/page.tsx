import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing from HumemAI on AI memory, infrastructure, and product progress.",
};

export default function BlogPage() {
  return (
    <ContentPage
      eyebrow="Blog"
      title="Keep the writing surface."
      intro="You already have posts, so the blog should remain a real top-level destination. This placeholder confirms the route, not the final editorial design."
    >
      <section>
        <h2>Why the blog stays</h2>
        <p>
          Blog content helps explain the product, show momentum, and bridge the gap between open-source work, projects, and the startup narrative.
        </p>
      </section>
    </ContentPage>
  );
}