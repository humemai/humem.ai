import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./split-media-section.module.css";

type SplitMediaSectionProps = {
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  imageQuality?: number;
  children: ReactNode;
};

export function SplitMediaSection({
  eyebrow,
  title,
  imageSrc,
  imageAlt,
  imageSizes = "(min-width: 1180px) 46vw, 100vw",
  imageQuality,
  children,
}: SplitMediaSectionProps) {
  return (
    <section className={styles.root}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        <div data-prose-column className={styles.body}>{children}</div>
      </div>

      <figure className={styles.figure}>
        <div className={styles.imageWrap}>
          <Image src={imageSrc} alt={imageAlt} fill className={styles.image} quality={imageQuality} sizes={imageSizes} />
        </div>
      </figure>
    </section>
  );
}