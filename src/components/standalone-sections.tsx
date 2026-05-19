import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./standalone-sections.module.css";

type StandaloneSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  figure?: ReactNode;
  bodyVariant?: "copy" | "acknowledgements";
};

type StandaloneSectionFigureProps = {
  label: string;
  title: string;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
  points?: string[];
};

type StandaloneLinkItem = {
  href: string;
  content: ReactNode;
  actionLabel?: string;
};

type StandaloneLinkSectionProps = {
  eyebrow: string;
  title: string;
  links: StandaloneLinkItem[];
};

function joinClassNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function StandaloneSection({ id, eyebrow, title, children, figure, bodyVariant = "copy" }: StandaloneSectionProps) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.lead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {figure}
      <div className={joinClassNames(bodyVariant === "acknowledgements" ? styles.acknowledgementsBody : styles.body)}>
        {children}
      </div>
    </section>
  );
}

export function StandaloneSectionFigure({ label, title, caption, imageSrc, imageAlt, points }: StandaloneSectionFigureProps) {
  return (
    <figure className={styles.figure}>
      <p className={styles.figureLabel}>{label}</p>
      <div className={styles.figurePanel}>
        {imageSrc && imageAlt ? (
          <div className={styles.figureImageWrap}>
            <Image src={imageSrc} alt={imageAlt} fill className={styles.figureImage} sizes="(min-width: 1024px) 34vw, 100vw" />
          </div>
        ) : null}
        <p className={styles.figureTitle}>{title}</p>
        {points?.length ? (
          <ul className={styles.figurePoints}>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <figcaption className={styles.figureCaption}>{caption}</figcaption>
    </figure>
  );
}

export function StandaloneLinkSection({ eyebrow, title, links }: StandaloneLinkSectionProps) {
  return (
    <section className={styles.linkSection}>
      <div className={styles.lead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.linkList}>
        {links.map((link) => {
          const actionLabel = link.actionLabel ?? "Open";

          if (link.href.startsWith("/")) {
            return (
              <Link className={styles.linkRow} href={link.href} key={`${link.href}-${actionLabel}`}>
                <span>{link.content}</span>
                <span className={styles.linkAction}>{actionLabel}</span>
              </Link>
            );
          }

          return (
            <a className={styles.linkRow} href={link.href} key={`${link.href}-${actionLabel}`} target="_blank" rel="noopener noreferrer">
              <span>{link.content}</span>
              <span className={styles.linkAction}>{actionLabel}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}