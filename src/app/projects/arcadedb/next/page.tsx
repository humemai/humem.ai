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

function loadPreview(): BenchmarkDataset & { arcadedb_commits?: string[] } {
  if (!existsSync(PREVIEW_PAYLOAD)) {
    return { conditions: [], tables: [] } as unknown as BenchmarkDataset;
  }
  return JSON.parse(readFileSync(PREVIEW_PAYLOAD, "utf8")) as BenchmarkDataset & { arcadedb_commits?: string[] };
}

export default function ArcadeDbPreviewPage() {
  const dataset = loadPreview();
  const pins = dataset.arcadedb_commits ?? [];
  const pin = pins.length > 0 ? pins.join(", ") : "(no rows yet)";
  const banner = (
    <p>
      October campaign in progress at pin {pin}. Tables land as they complete; nothing here is final. The live page is{" "}
      <Link href="/projects/arcadedb">/projects/arcadedb</Link>.
      {dataset.tables.length === 0 ? " No rows yet." : null}
    </p>
  );
  return <EditorialProjectPage project={arcadeDbNext} dataset={dataset} banner={banner} />;
}
