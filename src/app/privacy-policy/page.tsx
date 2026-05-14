import type { Metadata } from "next";
import Image from "next/image";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="How HumemAI handles analytics, cookie choices, and information shared through this website."
      aside={
        <figure className="heroFigure">
          <div className="heroFigureImageWrap">
            <Image
              src="/illustrations/privacy-policy-trust-and-choice.png"
              alt="Illustration representing privacy, transparency, and user control."
              fill
              className="heroFigureImage"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <figcaption className="heroFigureCaption">
            HumemAI keeps analytics optional and makes cookie choices available from the footer.
          </figcaption>
        </figure>
      }
    >
      <section>
        <h2>Website analytics</h2>
        <p>
          HumemAI uses Google Analytics only if you accept analytics cookies. If you accept, analytics is used only to understand aggregate website usage, such as which pages are visited and how people move through the site.
        </p>
      </section>

      <section>
        <h2>Cookie choices</h2>
        <p>
          You can accept or decline analytics cookies from the banner shown on first visit. You can also reopen those choices later through the cookie settings link in the footer.
        </p>
      </section>

      <section>
        <h2>Contact information</h2>
        <p>
          If you contact HumemAI by email or through the contact page, the information you provide is used only to respond to your message and continue the conversation you started.
        </p>
      </section>

      <section>
        <h2>Updates</h2>
        <p>
          This policy may be updated as the site, analytics setup, or contact workflows change.
        </p>
      </section>
    </ContentPage>
  );
}