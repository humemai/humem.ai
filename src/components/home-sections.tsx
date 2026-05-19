import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./home-sections.module.css";

type HomeSectionIntroProps = {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  children?: ReactNode;
  action?: { href: string; label: string };
};

type HomePromoSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  href: string;
  actionLabel: string;
};

export function HomeSectionIntro({ eyebrow, title, aside, children, action }: HomeSectionIntroProps) {
  return (
    <section className={styles.sectionIntro}>
      <div className={styles.lead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {action ? (
        <Link className={styles.actionLink} href={action.href}>
          {action.label}
        </Link>
      ) : children ? (
        <div className={styles.body}>{children}</div>
      ) : aside ? (
        <div className={styles.aside}>{aside}</div>
      ) : null}
    </section>
  );
}

export function HomePromoSection({ eyebrow, title, children, href, actionLabel }: HomePromoSectionProps) {
  return (
    <section className={styles.promoSection}>
      <div className={styles.promoLead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.promoTitle}>{title}</h2>
        <div className={styles.body}>{children}</div>
      </div>
      <Link className={styles.promoLink} href={href}>
        {actionLabel}
      </Link>
    </section>
  );
}