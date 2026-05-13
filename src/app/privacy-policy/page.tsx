import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="HumemAI explains here how website analytics, direct contact requests, and other information shared through the site are handled."
    >
      <section>
        <h2>Website analytics</h2>
        <p>
          HumemAI uses Google Analytics to understand aggregate website usage, such as which pages are visited and how people navigate the site. We do not use the website to provide user accounts or product access yet.
        </p>
      </section>

      <section>
        <h2>Contact information</h2>
        <p>
          If you contact us directly by email or through the contact page, we use the information you provide only to respond to your request and continue the conversation you initiated.
        </p>
      </section>

      <section>
        <h2>Updates</h2>
        <p>
          HumemAI is still early stage. This policy may be updated as the hosted product, account system, and customer workflows become more defined.
        </p>
      </section>
    </ContentPage>
  );
}