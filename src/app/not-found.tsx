import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.title}>This page isn&apos;t here.</h1>
        <p className={styles.lead}>
          The link may be old or mistyped. The projects and the news cover everything HumemAI
          publishes.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/projects">
            Browse the projects
          </Link>
          <Link className={styles.secondaryAction} href="/news">
            Read the news
          </Link>
        </div>
      </div>
    </main>
  );
}
