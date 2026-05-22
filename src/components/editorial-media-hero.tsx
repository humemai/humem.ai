import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./editorial-media-hero.module.css";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type EditorialMediaHeroProps = {
  context?: ReactNode;
  eyebrow: string;
  title: string;
  intro: string;
  meta?: ReactNode;
  titleVariant?: "editorial" | "feature";
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageSizes?: string;
  actions?: HeroAction[];
  showFallbackMedia?: boolean;
  children?: ReactNode;
};

function joinClassNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function ActionLink({ href, label, variant }: HeroAction) {
  const className = variant === "secondary" ? styles.secondaryAction : styles.primaryAction;

  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {label}
      </Link>
    );
  }

  return (
    <a className={className} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
      {label}
    </a>
  );
}

export function EditorialMediaHero({
  context,
  eyebrow,
  title,
  intro,
  meta,
  titleVariant = "editorial",
  imageSrc,
  imageAlt,
  imageCaption,
  imageSizes = "(min-width: 1024px) 42vw, 100vw",
  actions,
  showFallbackMedia = false,
  children,
}: EditorialMediaHeroProps) {
  return (
    <section className={styles.root}>
      <div className={styles.copy}>
        {context ? <div className={styles.context}>{context}</div> : null}
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={joinClassNames(styles.title, titleVariant === "feature" ? styles.titleFeature : styles.titleEditorial)}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
        {children || actions?.length || meta ? (
          <div className={styles.supporting}>
            {children}
            {meta ? <div className={styles.meta}>{meta}</div> : null}
            {actions?.length ? (
              <div className={styles.actions}>
                {actions.map((action) => (
                  <ActionLink key={`${action.href}-${action.label}`} {...action} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {imageSrc && imageAlt ? (
        <figure className={styles.figure}>
          <div className={styles.mediaWrap}>
            <Image src={imageSrc} alt={imageAlt} fill className={styles.mediaImage} sizes={imageSizes} />
          </div>
          {imageCaption ? <figcaption className={styles.caption}>{imageCaption}</figcaption> : null}
        </figure>
      ) : showFallbackMedia ? (
        <figure className={styles.figure}>
          <div className={styles.mediaFallback} />
        </figure>
      ) : null}
    </section>
  );
}