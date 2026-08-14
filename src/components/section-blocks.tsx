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
  children?: ReactNode;
  aside?: ReactNode;
};

type SectionCtaProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  actions: SectionAction[];
};

type SectionPromoProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  href: string;
  actionLabel: string;
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

export function SectionIntro({ eyebrow, title, children, aside }: SectionIntroProps) {
  return (
    <section className={styles.sectionRoot}>
      <div className={styles.lead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {children ? <div data-prose data-prose-column className={styles.body}>{children}</div> : aside ? <div className={styles.aside}>{aside}</div> : null}
    </section>
  );
}

export function SectionCta({ eyebrow, title, children, actions }: SectionCtaProps) {
  return (
    <section className={styles.ctaRoot}>
      <div className={styles.lead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div data-prose data-prose-column className={styles.ctaBody}>
        {children ? <div data-prose-column className={styles.body}>{children}</div> : null}
        <div className={styles.actions}>
          {actions.map((action) => (
            <ActionLink key={`${action.href}-${action.label}`} {...action} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionPromo({ eyebrow, title, children, href, actionLabel }: SectionPromoProps) {
  return (
    <section className={styles.promoRoot}>
      <div className={styles.promoLead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.promoTitle}>{title}</h2>
      </div>
      <div data-prose data-prose-column className={styles.promoBody}>
        <div data-prose-column className={styles.body}>{children}</div>
        <Link className={styles.promoLink} href={href}>
          {actionLabel}
        </Link>
      </div>
    </section>
  );
}