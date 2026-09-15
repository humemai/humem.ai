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

// The skeleton fields are on BenchmarkDataset itself, because the setup
// section renders two of them; only the pin list is preview-only.
type PreviewDataset = BenchmarkDataset & {
  arcadedb_commits?: string[];
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
  //
  // THE WARNING ONLY. Two lists used to hang off this block, the waived
  // invariants and the tables a laptop cannot draw, and four paragraphs of
  // small print is what a reader met before the first sentence of the page.
  // Both lists moved into the setup section, beside the protocol they are
  // exceptions to (EditorialSkeletonNotes); what stays here is the warning
  // itself, which is the part a reader must not be able to skip.
  const banner = dataset.skeleton ? (
    <>
      <p>
        <strong>Placeholder numbers from a laptop that was busy with other work.</strong>{" "}
        {dataset.skeleton_banner}
      </p>
      <p>
        The checks waived for this page, and the tables a laptop cannot produce, are named in{" "}
        <Link href="#setup">the setup section</Link>. The live page, with real numbers measured on
        the bench machine, is <Link href="/projects/arcadedb">/projects/arcadedb</Link>.
      </p>
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
