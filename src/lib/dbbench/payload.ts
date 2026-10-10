import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { BenchmarkDataset } from "@/components/editorial-sections";

// The DBBench pages and the October preview at /projects/arcadedb/next read the
// same payload, written by export_web.py in the benchmark tooling. Nothing on a
// DBBench page types a number; every figure comes from this file.
const PAYLOAD_PATH = join(process.cwd(), "src", "data", "arcadedb-benchmarks-next.json");

export type DbbenchDataset = BenchmarkDataset & {
  arcadedb_commits?: string[];
};

export function loadDbbenchDataset(): DbbenchDataset {
  if (!existsSync(PAYLOAD_PATH)) {
    return { conditions: [], tables: [] } as unknown as DbbenchDataset;
  }
  return JSON.parse(readFileSync(PAYLOAD_PATH, "utf8")) as DbbenchDataset;
}
