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
      {/* data-prose-column opts this container into the contract in
          globals.css: the gap is the only vertical spacing, children carry no
          margins. New block types added here inherit the rhythm instead of
          each picking a number. */}
      <div
        data-prose-column
        className={joinClassNames(bodyVariant === "acknowledgements" ? styles.acknowledgementsBody : styles.body)}
      >
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
  source_paths?: string[];
  source_urls?: string[];
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
  /**
   * Corpus size for the Scale column. `scale` is the harness's tier name
   * ("small", "deep10m"), which is a grouping key and means different sizes in
   * different lanes; this is what a reader should see. Tables whose tier names
   * are already sizes omit it.
   */
  scale_label?: string | null;
  workload: string;
  n_docs: string | null;
  deployment: string;
  precision?: string | null;
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
  sourcePaths?: string[] | null;
  sourceUrls?: string[] | null;
};

function formatStat(stat: BenchmarkStat | undefined) {
  if (!stat) return "—";
  const v = stat.median;
  // Medians only. The min-max spread made every cell three numbers wide, which
  // is unreadable on a phone and was the main reason the table forced the page
  // to scroll sideways. If you change this, change the caption in
  // EditorialBenchmarkTable with it: when the spread was dropped here the
  // caption was left claiming "the full range in brackets", so the page spent
  // two days describing a column it no longer had.
  // Read as a quantity, not as an accounting figure. "1,861,236" and "40,071"
  // are precise to a digit nobody uses and take a second each to parse; a
  // throughput column of them takes a while to compare. The k/M threshold sits
  // at ten thousand because that is where the comma grouping starts costing
  // more than it gives. Full precision stays in the JSON, which is what the
  // gates read.
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e4) return `${Math.round(v / 1000).toLocaleString()}k`;
  if (v >= 1000) return Math.round(v).toLocaleString();
  if (v >= 10) return v.toFixed(1);
  return v.toFixed(2);
}

/**
 * Drop the deployment from a label when the table already has a Mode column.
 *
 * "ArcadeDB (embedded)" next to a Mode column reading "embedded" says the same
 * thing twice, on every ArcadeDB row of five tables. Stripped here rather than
 * in the exporter because it is a presentation decision that depends on
 * whether Mode is rendered, and because the JSON label is what page_check pins
 * to the paper: changing the data would move a gate's key for a cosmetic
 * reason.
 *
 *   "ArcadeDB (embedded)"        -> "ArcadeDB"
 *   "ArcadeDB (embedded, fp32)"  -> "ArcadeDB (fp32)"
 *   "ArcadeDB (server, int8)"    -> "ArcadeDB (int8)"
 */
function stripQualifiers(label: string, ...tokens: Array<string | null | undefined>) {
  let out = label;
  for (const t of tokens) {
    if (!t) continue;
    out = out.replace(new RegExp(`\\(${t}(,\\s*)?`, "i"), "(");
    out = out.replace(new RegExp(`,\\s*${t}(?=\\))`, "i"), "");
  }
  return out.replace(/\s*\(\s*\)\s*$/, "").trim();
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
  sourcePaths,
  sourceUrls,
}: EditorialBenchmarkTableProps) {
  const showMode = new Set(entries.map((e) => e.deployment)).size > 1;
  const showScale = new Set(entries.map((e) => e.scale)).size > 1;
  // Precision earns a column wherever any row states one. Dense states it for
  // every engine; sparse states it for ours only, and the comparators render a
  // dash because their weight encoding has not been audited, which is a true
  // thing to show rather than a blank that reads as "same as above".
  const showPrecision = entries.some((e) => e.precision);
  // One line per DISTINCT build. The key is the build itself, NOT the row that
  // used it: keying on the row label made the time-series table list one
  // ArcadeDB build twice, because two arms of the same engine spell their
  // version differently, and made the deployment table list one build six
  // times, once per result size. If a table genuinely does mix two builds of
  // one engine they differ in the key and both lines still show, which is the
  // fairness problem this block exists to expose.
  //
  const buildsByIdentity = new Map<
    string,
    { key: string; backends: string[]; build: string | null; image: string | null }
  >();
  for (const entry of entries) {
    if (!entry.version_name && !entry.image) continue;
    const key = [entry.version_name ?? "", entry.image ?? ""].join("|");
    const seen = buildsByIdentity.get(key);
    if (seen) {
      if (!seen.backends.includes(entry.backend)) seen.backends.push(entry.backend);
    } else {
      buildsByIdentity.set(key, {
        key,
        backends: [entry.backend],
        build: entry.version_name,
        image: entry.image,
      });
    }
  }
  const builds = [...buildsByIdentity.values()];

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
              {showPrecision ? <th scope="col">Precision</th> : null}
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
                // deployment is part of the key. It was not, and it did not
                // need to be while every label carried "(embedded)" or
                // "(server)"; stripping those makes l1's two ArcadeDB rows
                // share a backend, scale and workload, which is the same
                // duplicate-key collision Elasticsearch hit on l3s.
                key={`${entry.backend}-${entry.deployment}-${entry.precision ?? ""}-${entry.scale}-${entry.workload}`}
                className={entry.is_arcadedb ? styles.benchmarkOwnRow : undefined}
              >
                <th scope="row">
                  {stripQualifiers(
                    entry.backend,
                    showMode ? entry.deployment : null,
                    showPrecision ? entry.precision : null)}
                </th>
                {showMode ? <td data-label="Mode">{entry.deployment}</td> : null}
                {showPrecision ? (
                  <td data-label="Precision">{entry.precision ?? "—"}</td>
                ) : null}
                {showScale ? (
                  <td data-label="Scale">{entry.scale_label ?? entry.scale}</td>
                ) : null}
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
      {/* NO shared protocol sentence here. It is stated ONCE in the
          Reproducing section. Rendered per table it appeared 8 times on one
          page, which is what a reader notices before they notice the
          numbers. Only per-table facts belong below: the source file, and
          conditions that differ table to table. */}
      <figcaption className={styles.benchmarkConditions}>
        {/* A table can draw on more than one artifact. l3d does: the small
            tier from the frozen campaign rows, DEEP-10M from the matched
            multipass overlay. When this rendered a single path it printed
            "runs_paper.csv" beneath nine rows that are not in that file.
            Falls back to the single-path fields so an older data file still
            renders. */}
        {(sourcePaths?.length ? sourcePaths : sourcePath ? [sourcePath] : []).length > 0 ? (
          <p className={styles.benchmarkSource}>
            Measured rows:{" "}
            {(sourcePaths?.length ? sourcePaths : [sourcePath as string]).map((p, i) => {
              const href = sourceUrls?.[i] ?? sourceUrl ?? undefined;
              return (
                <span key={p}>
                  {i > 0 ? ", " : ""}
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <code>{p}</code>
                    </a>
                  ) : (
                    <code>{p}</code>
                  )}
                </span>
              );
            })}
          </p>
        ) : null}
        {showDigests && builds.length > 0 ? (
          <details className={styles.benchmarkBuilds}>
            <summary>Exact builds measured</summary>
            <ul>
              {builds.map((b) => (
                <li key={b.key}>
                  {/* The build string already starts with the engine name
                      ("arcadedb 26.8.1"), so naming the rows that used it just
                      repeats the table's first column: "arcadedb (native
                      TIMESERIES), arcadedb (document path) arcadedb 26.8.1".
                      The row labels appear only when there is no version to
                      print, where they are the sole identification. */}
                  {b.build ? b.build : <strong>{b.backends.join(", ")}</strong>}
                  {b.image ? (
                    <code> {shortDigest(b.image)}</code>
                  ) : builds.some((o) => o !== b && o.build === b.build) ? (
                    /* Same version, two artifacts: the in-process wheel and the
                       pinned server image. The image line identifies itself by
                       its digest; without this the wheel line is a bare repeat
                       of it. Only added where the collision exists, so tables
                       of purely in-process engines stay clean. */
                    <> (in-process)</>
                  ) : null}
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