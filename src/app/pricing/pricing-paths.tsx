"use client";

import Link from "next/link";
import { useRef } from "react";
import styles from "./pricing.module.css";

export function PricingPaths() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const amount = Math.max(rail.clientWidth * 0.85, 320);
    rail.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.pathSectionWrap}>
      <div className={styles.pathRailControls}>
        <button aria-label="Scroll pricing paths left" className={styles.pathRailControl} onClick={() => scrollRail("left")} type="button">
          <span aria-hidden="true">←</span>
        </button>
        <button aria-label="Scroll pricing paths right" className={styles.pathRailControl} onClick={() => scrollRail("right")} type="button">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.pathSection} ref={railRef}>
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
          <a className={styles.pathAction} href="https://github.com/humemai" rel="noopener noreferrer" target="_blank">
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
      </div>
    </section>
  );
}