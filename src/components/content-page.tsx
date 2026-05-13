import type { ReactNode } from "react";
import styles from "./content-page.module.css";

type ContentPageProps = {
  context?: ReactNode;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  aside?: ReactNode;
};

export function ContentPage({ context, eyebrow, title, intro, children, aside }: ContentPageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          {context ? <div className={styles.context}>{context}</div> : null}
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
        </div>
        {aside ? <aside className={styles.aside}>{aside}</aside> : null}
      </section>
      <section className={styles.content}>{children}</section>
    </main>
  );
}