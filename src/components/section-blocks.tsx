import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./section-blocks.module.css";

type SectionAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

type SectionCtaProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  actions: SectionAction[];
};

function ActionLink({ href, label, variant }: SectionAction) {
  const className = variant === "secondary" ? styles.secondaryAction : styles.primaryAction;

  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {label}
      </Link>
    );
  }

  return (
    <a className={className} href={href}>
      {label}
    </a>
  );
}

export function SectionIntro({ eyebrow, title, children }: SectionIntroProps) {
  return (
    <section className={styles.sectionRoot}>
      <div className={styles.lead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

export function SectionCta({ eyebrow, title, children, actions }: SectionCtaProps) {
  return (
    <section className={styles.ctaRoot}>
      <div className={styles.ctaCopy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{children}</div>
      </div>
      <div className={styles.actions}>
        {actions.map((action) => (
          <ActionLink key={`${action.href}-${action.label}`} {...action} />
        ))}
      </div>
    </section>
  );
}