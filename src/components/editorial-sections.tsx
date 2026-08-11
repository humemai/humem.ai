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
    title?: string;
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
        {items.map((item) => {
          return (
          <div className={styles.figureGridItem} key={`${item.imageSrc}-${item.imageAlt}`}>
            {/* Charts in editorial grids must preserve their full intrinsic aspect ratio. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageSrc} alt={item.imageAlt} className={styles.figureGridImage} loading="lazy" />
          </div>
          );
        })}
      </div>
      <figcaption className={styles.figureGridCaption}>{caption}</figcaption>
    </figure>
  );
}

export type BenchmarkStat = { median: number; min: number; max: number; n: number };

export type BenchmarkTable = {
  id: string;
  title: string;
  dataset: string;
  conditions: string[];
  columns: string[];
  /** Scales the comparators reach but we have no publishable row for. */
  withheld_scales: string[];
  withheld_reason: string | null;
  source_path: string | null;
  source_url: string | null;
  entries: BenchmarkEntry[];
};

/**
 * Shape of src/data/arcadedb-benchmarks.json. Declared here rather than
 * inferred, because a direct JSON import narrows every null to `null` and
 * every metric key to the literals present in the first table, so the inferred
 * type stops matching as soon as a lane reports a different metric set.
 */
export type BenchmarkDataset = {
  source: string;
  generator: string;
  arcadedb_version: string;
  conditions: string[];
  provenance_note: string;
  hosts_recorded: string[];
  tables: BenchmarkTable[];
};

export type BenchmarkEntry = {
  backend: string;
  is_arcadedb: boolean;
  scale: string;
  workload: string;
  n_docs: string | null;
  deployment: string;
  image: string | null;
  version_name: string | null;
  host: string | null;
  metrics: Record<string, BenchmarkStat>;
};

export type EditorialBenchmarkTableProps = {
  title: string;
  dataset: string;
  columns: string[];
  entries: BenchmarkEntry[];
  conditions: string[];
  caption?: string;
  showDigests?: boolean;
  withheldScales?: string[];
  withheldReason?: string | null;
  sourcePath?: string | null;
  sourceUrl?: string | null;
};

function formatStat(stat: BenchmarkStat | undefined) {
  if (!stat) return "—";
  const v = stat.median;
  // Medians only. The min-max spread made every cell three numbers wide, which
  // is unreadable on a phone and was the main reason the table forced the page
  // to scroll sideways. The caption still says these are medians of repeated
  // runs, and the full spread is in the papers and the exported JSON.
  if (v >= 100000) return `${Math.round(v / 1000).toLocaleString()}k`;
  if (v >= 1000) return Math.round(v).toLocaleString();
  if (v >= 10) return v.toFixed(1);
  return v.toFixed(2);
}

function shortDigest(image: string | null) {
  if (!image) return "in-process";
  const at = image.indexOf("@sha256:");
  if (at === -1) return image;
  return `${image.slice(0, at)}@${image.slice(at + 8, at + 20)}…`;
}

export function EditorialBenchmarkTable({
  title,
  dataset,
  columns,
  entries,
  conditions,
  caption,
  showDigests = true,
  withheldScales = [],
  withheldReason,
  sourcePath,
  sourceUrl,
}: EditorialBenchmarkTableProps) {
  const showMode = new Set(entries.map((e) => e.deployment)).size > 1;
  const showScale = new Set(entries.map((e) => e.scale)).size > 1;
  const builds = entries
    .map((e) => ({ backend: e.backend, build: e.version_name, image: e.image }))
    .filter((b) => b.build || b.image);

  return (
    <figure className={styles.benchmarkTable}>
      {caption ? <p className={styles.benchmarkLead}>{caption}</p> : null}
      <div className={styles.benchmarkScroll}>
        <table className={styles.benchmarkGrid}>
          <caption className={styles.benchmarkCaption}>
            {title} <span className={styles.benchmarkDataset}>{dataset}</span>
          </caption>
          <thead>
            <tr>
              <th scope="col">Engine</th>
              {showMode ? <th scope="col">Mode</th> : null}
              {showScale ? <th scope="col">Scale</th> : null}
              {columns.map((column) => (
                <th scope="col" key={column}>
                  {column}
                </th>
              ))}

            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={`${entry.backend}-${entry.scale}-${entry.workload}`}
                className={entry.is_arcadedb ? styles.benchmarkOwnRow : undefined}
              >
                <th scope="row">{entry.backend}</th>
                {showMode ? <td data-label="Mode">{entry.deployment}</td> : null}
                {showScale ? <td data-label="Scale">{entry.scale}</td> : null}
                {columns.map((column) => (
                  <td key={column} data-label={column}>
                    {formatStat(entry.metrics[column])}
                  </td>
                ))}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className={styles.benchmarkConditions}>
        <p>
          Median of repeated runs, with the full range in brackets. Every engine ran in
          Docker under the same cpuset and memory cap, one job at a time.
        </p>
        {sourceUrl && sourcePath ? (
          <p className={styles.benchmarkSource}>
            Measured rows:{" "}
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              <code>{sourcePath}</code>
            </a>
          </p>
        ) : null}
        {showDigests && builds.length > 0 ? (
          <details className={styles.benchmarkBuilds}>
            <summary>Exact builds measured</summary>
            <ul>
              {builds.map((b) => (
                <li key={b.backend}>
                  <strong>{b.backend}</strong>{" "}
                  {b.build ? b.build : ""}
                  {b.image ? <code> {shortDigest(b.image)}</code> : null}
                </li>
              ))}
            </ul>
          </details>
        ) : null}
        {withheldScales.length > 0 && withheldReason ? (
          <p>
            <strong>Not shown:</strong> {withheldScales.join(", ")}. {withheldReason}
          </p>
        ) : null}
        {conditions.length > 0 ? (
          <ul className={styles.figurePoints}>
            {conditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        ) : null}
      </figcaption>
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