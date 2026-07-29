import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionCta, SectionIntro } from "@/components/section-blocks";
import { PricingPaths } from "./pricing-paths";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free open source, hosted deployments, and custom HumemAI engagements.",
};

export default function PricingPage() {
  return (
    <main className={styles.page}>
      <PageHero
        eyebrow="Pricing"
        title="Open source, hosted, or custom."
        intro="HumemAI offers a free developer path, a hosted path for teams that want faster outcomes, and custom engagements for deployments that need integration-heavy support."
        imageSrc="/images/site/pricing-deployment-paths.png"
        imageAlt="Illustration showing HumemAI deployment paths"
        actions={[
          { href: "/contact", label: "Contact HumemAI" },
          { href: "/projects", label: "View open source projects", variant: "secondary" },
        ]}
      />

      <SectionIntro eyebrow="Three paths" title="Choose the level of control, speed, and support that fits your team.">
          <p>
            The pricing model is straightforward. You can start by running the public components yourself, use the hosted HumemAI experience when you want a managed environment, or work directly with us on a deployment shaped around your data and workflows.
          </p>
          <p>
            These are not three different products. They are three ways of adopting the same memory-first approach depending on how much infrastructure and integration work you want to own.
          </p>
      </SectionIntro>

      <PricingPaths />

      <SectionIntro eyebrow="Hosted" title="Move from components to an integrated workspace when you want less operational overhead.">
          <p>
            Hosted HumemAI is for teams that want the memory layer without spending their first phase assembling infrastructure and interfaces around it.
          </p>
          <p>
            You still get the same underlying orientation toward structured, inspectable memory. The difference is that HumemAI operates the environment with you instead of leaving every operational choice on your side.
          </p>
      </SectionIntro>

      <SectionCta
        eyebrow="Next step"
        title="Pick a path, then go deeper."
        actions={[
          { href: "/projects", label: "View open source projects" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      >
        <p>
          If you want to evaluate the public work first, start with the projects. If you want hosted access or a custom deployment, reach out directly.
        </p>
      </SectionCta>
    </main>
  );
}