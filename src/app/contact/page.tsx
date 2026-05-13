import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to HumemAI about early access, partnerships, and custom deployments.",
};

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="Contact"
      title="Early access, partnerships, and customer-specific deployments."
      intro="This page should serve both inbound customers and people who want to talk about projects, hiring, or collaboration."
    >
      <section id="early-access">
        <h2>Get early access</h2>
        <p>
          If you want a hosted HumemAI setup instead of self-hosting the open-source projects,
          email <a href="mailto:info@humem.ai?subject=HumemAI%20early%20access">info@humem.ai</a> and include your use case, data types, and whether you need a GUI, hosted deployment, or future API access.
        </p>
      </section>

      <section>
        <h2>Get in touch</h2>
        <p>
          Email <a href="mailto:info@humem.ai">info@humem.ai</a> to discuss hosted HumemAI, custom memory workflows, project collaborations, or hiring.
        </p>
      </section>
    </ContentPage>
  );
}