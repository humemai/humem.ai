import Image from "next/image";
import Link from "next/link";
import styles from "./page-hero.module.css";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  imageQuality?: number;
  caption?: string;
  actions?: HeroAction[];
  titleVariant?: "default" | "feature";
};

function classNames(...names: Array<string | false | null | undefined>) {
  return names.filter(Boolean).join(" ");
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

export function PageHero({
  eyebrow,
  title,
  intro,
  imageSrc,
  imageAlt,
  imageSizes = "(min-width: 1024px) 42vw, 100vw",
  imageQuality,
  caption,
  actions,
  titleVariant = "default",
}: PageHeroProps) {
  return (
    <section className={styles.root}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={classNames(styles.title, titleVariant === "feature" && styles.titleFeature)}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
        {actions && actions.length > 0 ? (
          <div className={styles.actions}>
            {actions.map((action) => (
              <ActionLink key={`${action.href}-${action.label}`} {...action} />
            ))}
          </div>
        ) : null}
      </div>

      <figure className={styles.figure}>
        <div className={styles.imageWrap}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes={imageSizes}
            quality={imageQuality}
          />
        </div>
        {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
      </figure>
    </section>
  );
}
