import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "HumemAI is looking for strong people across AI, data systems, and product engineering.",
};

export default function CareersPage() {
  return (
    <ContentPage
      eyebrow="Careers"
      title="Careers is the right label."
      intro="Even before formal job listings exist, this page can show that HumemAI is actively looking for talent across memory systems, databases, AI product engineering, and design."
    >
      <section>
        <h2>Who we want to meet</h2>
        <ul>
          <li>AI and retrieval engineers</li>
          <li>Database and systems engineers</li>
          <li>Product-minded frontend and platform builders</li>
        </ul>
      </section>
    </ContentPage>
  );
}