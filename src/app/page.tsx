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
            Give AI systems memory that lasts.
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
          <div className={styles.heroVisualWrap}>
            <Image
              src="/illustrations/home-hero-memory-layer.png"
              alt="HumemAI landing illustration"
              fill
              className={styles.heroVisual}
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
          </div>
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
        <Link className={styles.featureCard} href="/product">
          <p className={styles.cardEyebrow}>Product</p>
          <h2>Built for real agent workflows</h2>
          <p>
            See how HumemAI handles conversational history, structured knowledge, and hybrid retrieval in one system.
          </p>
          <span className={styles.cardAction}>Learn more</span>
        </Link>
        <Link className={styles.featureCard} href="/pricing">
          <p className={styles.cardEyebrow}>Pricing</p>
          <h2>Open source or hosted</h2>
          <p>
            Developers can self-host from GitHub. Teams that want outcomes can use a managed deployment.
          </p>
          <span className={styles.cardAction}>Learn more</span>
        </Link>
        <Link className={styles.featureCard} href="/projects">
          <p className={styles.cardEyebrow}>Projects</p>
          <h2>Research and projects in public</h2>
          <p>
            Follow the projects that shaped HumemAI so far, from audit-ready memory systems to embedded database work.
          </p>
          <span className={styles.cardAction}>Learn more</span>
        </Link>
      </section>

      <section className={styles.sectionSplit}>
        <div className={styles.copyBlock}>
          <p className={styles.cardEyebrow}>Why now</p>
          <h2>Agents still forget.</h2>
          <p>
            The world is getting more agentic, but most systems remain stateless chat wrappers.
            HumemAI focuses on the missing layer: persistent, explainable memory that agents can use over time.
          </p>
        </div>
        <div className={styles.bulletPanel}>
          <ul className={styles.bullets}>
            <li>Persistent memory across sessions instead of stateless chat</li>
            <li>Support for documents, tables, graphs, and connected data</li>
            <li>Open-source foundations with a hosted product path</li>
            <li>Explainable memory structures that teams can inspect and control</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
