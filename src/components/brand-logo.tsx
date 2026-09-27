import styles from "./brand-logo.module.css";

type BrandLogoProps = {
  className?: string;
};

function classes(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

/** The HumemAI lockup: the head-and-graph mark with the wordmark. */
export function BrandLockup({ className }: BrandLogoProps) {
  return <span aria-label="HumemAI" className={classes(styles.lockup, className)} role="img" />;
}

/** The mark alone, for places where the name is already written beside it. */
export function BrandMark({ className }: BrandLogoProps) {
  return <span aria-hidden="true" className={classes(styles.mark, className)} />;
}
