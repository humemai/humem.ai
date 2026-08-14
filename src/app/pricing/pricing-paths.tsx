"use client";

import Link from "next/link";
import { PagedCardGrid } from "@/components/paged-card-grid";
import styles from "./pricing.module.css";

const pricingPaths = [
  {
    label: "Free",
    title: "Self-host the open source stack",
    body: "Explore the repositories, run the components yourself, and build memory-enabled systems with full control over your environment.",
    bullets: [
      "Open source projects",
      "Developer-first experimentation",
      "Bring your own infrastructure",
    ],
    href: "https://github.com/humemai",
    external: true,
  },
  {
    label: "Hosted",
    title: "Use the managed HumemAI workspace",
    body: "Get the integrated memory environment with ingestion, natural-language interaction, and operations handled for your team.",
    bullets: [
      "Hosted workspace",
      "Managed deployment and operations",
      "Designed for teams that want outcomes fast",
    ],
    href: "/contact",
    external: false,
  },
  {
    label: "Custom",
    title: "Shape a deployment around your use case",
    body: "Combine the relevant repositories, data connectors, workflows, and support into a setup tailored to your environment.",
    bullets: [
      "Custom integrations",
      "Deployment design around your workflow",
      "Direct collaboration with HumemAI",
    ],
    href: "/contact",
    external: false,
  },
] as const;

export function PricingPaths() {
  return (
    <section className={styles.pathSectionWrap}>
      <PagedCardGrid
        items={pricingPaths}
        paginationLabel="Pricing paths pagination"
        leftLabel="Scroll pricing paths left"
        rightLabel="Scroll pricing paths right"
        controlsClassName={styles.pathRailControls}
        controlClassName={styles.pathRailControl}
        listClassName={styles.pathSection}
        paginationClassName={styles.pathPagination}
        paginationPagesClassName={styles.pathPaginationPages}
        paginationPageClassName={styles.pathPaginationPage}
        paginationPageActiveClassName={styles.pathPaginationPageActive}
        renderItem={(path) => (
          <article data-prose className={styles.pathItem} key={path.title}>
            <p className={styles.pathLabel}>{path.label}</p>
            <h3>{path.title}</h3>
            <p>{path.body}</p>
            <ul>
              {path.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {path.external ? (
              <a className={styles.pathAction} href={path.href} rel="noopener noreferrer" target="_blank">
                Learn more
              </a>
            ) : (
              <Link className={styles.pathAction} href={path.href}>
                Learn more
              </Link>
            )}
          </article>
        )}
      />
    </section>
  );
}