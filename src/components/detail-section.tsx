import type { ReactNode } from "react";
import styles from "./detail-section.module.css";

type DetailSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  id?: string;
  divider?: boolean;
  bodyVariant?: "stack" | "plain";
  className?: string;
  leadClassName?: string;
  bodyClassName?: string;
};

function joinClassNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function DetailSection({
  eyebrow,
  title,
  children,
  id,
  divider = false,
  bodyVariant = "stack",
  className,
  leadClassName,
  bodyClassName,
}: DetailSectionProps) {
  return (
    <section className={joinClassNames(styles.root, divider && styles.withDivider, className)} id={id}>
      <div className={joinClassNames(styles.lead, leadClassName)}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div
        data-prose-column
        className={joinClassNames(styles.body, bodyVariant === "stack" && styles.bodyStack, bodyClassName)}
      >
        {children}
      </div>
    </section>
  );
}