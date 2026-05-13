import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms of service placeholder"
      intro="Add the production terms here once the legal copy is ready."
    >
      <section>
        <h2>Current status</h2>
        <p>This placeholder exists so navigation and footer links stay valid during the redesign.</p>
      </section>
    </ContentPage>
  );
}