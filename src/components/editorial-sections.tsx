import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./editorial-sections.module.css";

type EditorialSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  figure?: ReactNode;
  bodyVariant?: "copy" | "acknowledgements";
};

type EditorialSectionFigureProps = {
  label: string;
  title: string;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
  points?: string[];
};

type EditorialFigureGridProps = {
  items: Array<{
    label?: string;
    imageSrc: string;
    imageAlt: string;
  }>;
  caption: string;
  columns?: 1 | 2 | 3 | 4;
};

type EditorialLinkItem = {
  href: string;
  content: ReactNode;
  actionLabel?: string;
};

type EditorialLinkSectionProps = {
  eyebrow: string;
  title: string;
  links: EditorialLinkItem[];
};

function joinClassNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function EditorialSection({ id, eyebrow, title, children, figure, bodyVariant = "copy" }: EditorialSectionProps) {
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

export function EditorialSectionFigure({ label, title, caption, imageSrc, imageAlt, points }: EditorialSectionFigureProps) {
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

export function EditorialFigureGrid({ items, caption, columns = 2 }: EditorialFigureGridProps) {
  const gridStyle = {
    ["--editorial-figure-grid-columns" as string]: columns,
  } as CSSProperties;

  return (
    <figure className={styles.figureGrid}>
      <div className={styles.figureGridItems} style={gridStyle}>
        {items.map((item) => (
          <div className={styles.figureGridItem} key={`${item.imageSrc}-${item.label ?? item.imageAlt}`}>
            {item.label ? <p className={styles.figureGridItemLabel}>{item.label}</p> : null}
            {/* Charts in editorial grids must preserve their full intrinsic aspect ratio. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageSrc} alt={item.imageAlt} className={styles.figureGridImage} loading="lazy" />
          </div>
        ))}
      </div>
      <figcaption className={styles.figureGridCaption}>{caption}</figcaption>
    </figure>
  );
}

export function EditorialLinkSection({ eyebrow, title, links }: EditorialLinkSectionProps) {
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