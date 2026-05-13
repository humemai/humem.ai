import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms of service"
      intro="These terms explain how the HumemAI website, public materials, and open-source links are made available to visitors."
    >
      <section>
        <h2>Website use</h2>
        <p>
          The HumemAI website is provided for information about the company, product direction, research, projects, and contact. Use of the public website does not create a customer relationship or grant access to any hosted service unless agreed separately.
        </p>
      </section>

      <section>
        <h2>Open-source materials</h2>
        <p>
          Links to repositories, documentation, and other public materials are provided as-is. Any separate open-source projects remain governed by their own repository licenses and terms.
        </p>
      </section>

      <section>
        <h2>Updates</h2>
        <p>
          These terms may change as HumemAI introduces hosted offerings, APIs, and customer-specific services. Any material updates will be posted here.
        </p>
      </section>
    </ContentPage>
  );
}