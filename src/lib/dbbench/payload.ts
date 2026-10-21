import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { BenchmarkDataset } from "@/components/editorial-sections";

// The DBBench pages read one payload, src/data/dbbench-benchmarks.json, written by refresh_web_page.py in the
// benchmark tooling (humemai/arcadedb-embedded-python, benchmarks/experiments) from export_web.py's web_benchmarks.json.
// It holds 2026-11 rows only. Nothing on a DBBench page types a number; every figure comes from this file.
//
// While the file does not exist, loadDbbenchDataset() returns undefined and every DBBench page renders its method and its
// lanes with no number. A payload that carries no row is treated the same way.
const PAYLOAD_PATH = join(process.cwd(), "src", "data", "dbbench-benchmarks.json");

export type DbbenchDataset = BenchmarkDataset & {
  instrument?: string;
  arcadedb_commits?: string[];
};

export function loadDbbenchDataset(): DbbenchDataset | undefined {
  if (!existsSync(PAYLOAD_PATH)) {
    return undefined;
  }
  const dataset = JSON.parse(readFileSync(PAYLOAD_PATH, "utf8")) as DbbenchDataset;
  const hasRows = dataset.tables?.some((table) => table.entries.length > 0);
  return hasRows ? dataset : undefined;
}

/** A table the payload carries with rows, or names as still being measured. */
export function datasetHasTable(dataset: BenchmarkDataset | undefined, tableId: string): boolean {
  if (!dataset) return false;
  return (
    dataset.tables.some((table) => table.id === tableId && table.entries.length > 0) ||
    Boolean(dataset.pending_tables?.[tableId])
  );
}
