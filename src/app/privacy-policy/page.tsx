import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy policy placeholder"
      intro="Add the production privacy policy here once the legal copy is ready."
    >
      <section>
        <h2>Current status</h2>
        <p>This placeholder exists so navigation and footer links stay valid during the redesign.</p>
      </section>
    </ContentPage>
  );
}