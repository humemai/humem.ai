import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free open source, hosted deployments, and custom HumemAI engagements.",
};

export default function PricingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Pricing</p>
          <h1>Start with open source, or move faster with hosted and custom work.</h1>
          <p className={styles.intro}>
            HumemAI offers a free developer path, a hosted path for teams that want faster outcomes, and custom engagements for deployments that need integration-heavy support.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/contact">
              Contact HumemAI
            </Link>
            <Link className={styles.secondaryAction} href="/projects">
              View open source projects
            </Link>
          </div>
        </div>

        <figure className={styles.heroFigure}>
          <div className={styles.heroImageWrap}>
            <Image
              src="/illustrations/pricing-deployment-paths.png"
              alt="Illustration showing HumemAI deployment paths"
              fill
              className={styles.heroImage}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </figure>
      </section>

      <section className={styles.editorialSection}>
        <div className={styles.editorialLead}>
          <p className={styles.eyebrow}>Three paths</p>
          <h2>Choose the level of control, speed, and support that fits your team.</h2>
        </div>
        <div className={styles.editorialBody}>
          <p>
            The pricing model is straightforward. You can start by running the public components yourself, use the hosted HumemAI experience when you want a managed environment, or work directly with us on a deployment shaped around your data and workflows.
          </p>
          <p>
            These are not three different products. They are three ways of adopting the same memory-first approach depending on how much infrastructure and integration work you want to own.
          </p>
        </div>
      </section>

      <section className={styles.pathSection}>
        <article className={styles.pathItem}>
          <p className={styles.pathLabel}>Free</p>
          <h3>Self-host the open source stack</h3>
          <p>
            Explore the repositories, run the components yourself, and build memory-enabled systems with full control over your environment.
          </p>
          <ul>
            <li>Open source projects</li>
            <li>Developer-first experimentation</li>
            <li>Bring your own infrastructure</li>
          </ul>
          <a className={styles.pathAction} href="https://github.com/humemai" target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
        </article>

        <article className={styles.pathItem}>
          <p className={styles.pathLabel}>Hosted</p>
          <h3>Use the managed HumemAI workspace</h3>
          <p>
            Get the integrated memory environment with ingestion, natural-language interaction, and operations handled for your team.
          </p>
          <ul>
            <li>Hosted workspace</li>
            <li>Managed deployment and operations</li>
            <li>Designed for teams that want outcomes fast</li>
          </ul>
          <Link className={styles.pathAction} href="/contact">
            Learn more
          </Link>
        </article>

        <article className={styles.pathItem}>
          <p className={styles.pathLabel}>Custom</p>
          <h3>Shape a deployment around your use case</h3>
          <p>
            Combine the relevant repositories, data connectors, workflows, and support into a setup tailored to your environment.
          </p>
          <ul>
            <li>Custom integrations</li>
            <li>Deployment design around your workflow</li>
            <li>Direct collaboration with HumemAI</li>
          </ul>
          <Link className={styles.pathAction} href="/contact">
            Learn more
          </Link>
        </article>
      </section>

      <section className={styles.mediaSection}>
        <div className={styles.mediaCopy}>
          <p className={styles.eyebrow}>Hosted</p>
          <h2>Move from components to an integrated workspace when you want less operational overhead.</h2>
          <p>
            Hosted HumemAI is for teams that want the memory layer without spending their first phase assembling infrastructure and interfaces around it.
          </p>
          <p>
            You still get the same underlying orientation toward structured, inspectable memory. The difference is that HumemAI operates the environment with you instead of leaving every operational choice on your side.
          </p>
        </div>

        <figure className={styles.mediaFigure}>
          <div className={styles.mediaImageWrap}>
            <Image
              src="/illustrations/hosted-workspace-mockup.png"
              alt="Illustration of the HumemAI hosted workspace"
              fill
              className={styles.mediaImage}
              quality={90}
              sizes="(min-width: 1180px) 46vw, 100vw"
            />
          </div>
        </figure>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow}>Next step</p>
          <h2>Pick a path, then go deeper.</h2>
          <p>
            If you want to evaluate the public work first, start with the projects. If you want hosted access or a custom deployment, reach out directly.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link className={styles.primaryAction} href="/projects">
            View open source projects
          </Link>
          <Link className={styles.secondaryAction} href="/contact">
            Contact HumemAI
          </Link>
        </div>
      </section>
    </main>
  );
}