import type { Metadata } from "next";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import type { BenchmarkDataset } from "@/components/editorial-sections";
import { arcadeDbNext } from "@/lib/projects/items/arcadedb-next";
import { EditorialProjectPage } from "../../editorial-project-page";

// The October campaign page, watched while it fills in (DECISIONS #83). Fed by
// its own payload and image directory, written by refresh_web_page.py --preview
// in the arcadedb-embedded-python repo; the live page at /projects/arcadedb is
// never touched by a preview publish. Hidden: noindex, not in the project index.

const PREVIEW_PAYLOAD = join(process.cwd(), "src", "data", "arcadedb-benchmarks-next.json");

export const metadata: Metadata = {
  title: "ArcadeDB, October campaign preview",
  robots: { index: false, follow: false, nocache: true },
};

type PreviewDataset = BenchmarkDataset & {
  arcadedb_commits?: string[];
  skeleton?: boolean;
  skeleton_banner?: string | null;
  gates_waived?: string[];
  skeleton_absent_tables?: Record<string, string>;
};

function loadPreview(): PreviewDataset {
  if (!existsSync(PREVIEW_PAYLOAD)) {
    return { conditions: [], tables: [] } as unknown as BenchmarkDataset;
  }
  return JSON.parse(readFileSync(PREVIEW_PAYLOAD, "utf8")) as PreviewDataset;
}

export default function ArcadeDbPreviewPage() {
  const dataset = loadPreview();
  const pins = dataset.arcadedb_commits ?? [];
  const pin = pins.length > 0 ? pins.join(", ") : "(no rows yet)";
  // A SKELETON SAYS SO FIRST, and in the strongest words on the page
  // (DECISIONS #86). Every table repeats it in its own conditions, because a
  // reader who lands on one table, or screenshots one, never sees this block.
  const absent = Object.entries(dataset.skeleton_absent_tables ?? {});
  const banner = dataset.skeleton ? (
    <>
      <p>
        <strong>Placeholder numbers from a laptop that was busy with other work.</strong>{" "}
        {dataset.skeleton_banner}
      </p>
      <p>
        This is the October page being built, so the columns, conditions, and prose can be read and
        edited before the campaign runs. Every table below repeats this warning under its own
        caption, because a reader who lands on one table never sees this block. The live page, with
        real numbers measured on the bench machine, is{" "}
        <Link href="/projects/arcadedb">/projects/arcadedb</Link>.
      </p>
      {dataset.gates_waived && dataset.gates_waived.length > 0 ? (
        <p>Waived for this run, because they describe the bench host: {dataset.gates_waived.join(" ")}</p>
      ) : null}
      {absent.length > 0 ? (
        <p>
          Tables the October page will carry that a laptop skeleton cannot draw:{" "}
          {absent.map(([id, why]) => `${id} (${why})`).join(" ")}
        </p>
      ) : null}
    </>
  ) : (
    <p>
      October campaign in progress at pin {pin}. Tables land as they complete; nothing here is final. The live page is{" "}
      <Link href="/projects/arcadedb">/projects/arcadedb</Link>.
      {dataset.tables.length === 0 ? " No rows yet." : null}
    </p>
  );
  return <EditorialProjectPage project={arcadeDbNext} dataset={dataset} banner={banner} />;
}
