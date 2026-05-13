import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.heroShell}>
        <div className={styles.heroCopy}>
          <div className={styles.heroEyebrowRow}>
            <Image src="/favicon.png" alt="HumemAI icon" width={24} height={24} />
            <p className={styles.eyebrow}>Persistent memory for agentic AI</p>
          </div>
          <h1 className={styles.title}>
            Turn conversations, documents, tables, and graphs into usable long-term memory.
          </h1>
          <p className={styles.lead}>
            HumemAI gives AI systems a memory layer that stays persistent across sessions,
            adapts to mixed data types, and remains inspectable instead of turning into a
            black box.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/pricing">
              Explore pricing
            </Link>
            <Link className={styles.secondaryAction} href="/product">
              See the product
            </Link>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelLabel}>How HumemAI works</span>
            <span className={styles.panelMeta}>GUI + hosted + API-ready</span>
          </div>
          <div className={styles.memoryList}>
            <article>
              <h2>Episodic memory</h2>
              <p>Capture what happened, when it happened, and why it matters across interactions.</p>
            </article>
            <article>
              <h2>Semantic memory</h2>
              <p>Keep documents, tables, graphs, and connected systems in the most useful structure.</p>
            </article>
            <article>
              <h2>Hybrid retrieval</h2>
              <p>Let agents query relationships, vectors, and structured knowledge in one memory layer.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionGrid}>
        <article className={styles.featureCard}>
          <p className={styles.cardEyebrow}>Product</p>
          <h2>One page that explains the product clearly</h2>
          <p>
            Explain HumemAI as the memory layer for agentic systems, not as a loose bundle of repositories.
          </p>
          <Link href="/product">Read the product story</Link>
        </article>
        <article className={styles.featureCard}>
          <p className={styles.cardEyebrow}>Pricing</p>
          <h2>Free open source and paid hosted options</h2>
          <p>
            Developers can self-host from GitHub. Teams that want outcomes can use a managed deployment.
          </p>
          <Link href="/pricing">View pricing options</Link>
        </article>
        <article className={styles.featureCard}>
          <p className={styles.cardEyebrow}>Projects</p>
          <h2>Overview first, then dedicated pages</h2>
          <p>
            Showcase flagship work like Audit-Ready Memory with a hub page and one page per project.
          </p>
          <Link href="/projects">Browse projects</Link>
        </article>
      </section>

      <section className={styles.sectionSplit}>
        <div className={styles.copyBlock}>
          <p className={styles.cardEyebrow}>Why now</p>
          <h2>Agents can act, but they still forget.</h2>
          <p>
            The world is getting more agentic, but most systems remain stateless chat wrappers.
            HumemAI focuses on the missing layer: persistent, explainable memory that agents can use over time.
          </p>
        </div>
        <div className={styles.bulletPanel}>
          <ul className={styles.bullets}>
            <li>Browser-default dark and light mode</li>
            <li>Desktop dropdown nav and mobile-first tap navigation</li>
            <li>Future-ready space for app.humem.ai and api.humem.ai</li>
            <li>Blog, projects, and careers as real startup signals</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
