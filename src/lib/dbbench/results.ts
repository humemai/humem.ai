import type { BenchmarkDataset } from "@/components/editorial-sections";
import type { Project, ProjectEditorialBodyBlock } from "@/lib/projects/types";
import { dbbenchLanes } from "./lanes";
import { datasetHasTable } from "./payload";

// The MMDBBench project page is written for the time before any result exists (src/lib/projects/items/dbbench.ts). When a
// payload exists, this swaps in what the payload adds: the machine and the shared conditions in place of the "No results yet"
// section, and every table of each lane under the lane's text. There are no lane pages: the whole benchmark is this one page.
// A lane with no table of rows (vectors, time series) keeps its first paragraph and its headline line. With no payload the
// project is returned as it came, so the page renders exactly as it did before.
export function dbbenchProjectWithResults(project: Project, dataset: BenchmarkDataset | undefined): Project {
  const page = project.editorialPage;
  if (!dataset || !page) {
    return project;
  }

  const sections = (page.sections ?? []).map((section) => {
    if (section.id === "status") {
      const body: ProjectEditorialBodyBlock[] = [
        "These are the results of the November 2026 instrument. Every table was measured on the machine below. A table lists its own conditions beneath its caption.",
        { type: "benchmarkMachine" },
        "These conditions hold for every table:",
        { type: "benchmarkConditions" },
      ];
      return { ...section, title: "Results.", body };
    }

    const lane = dbbenchLanes.find((candidate) => candidate.slug === section.id);
    if (!lane) {
      return section;
    }
    // A table with rows, or one the payload names as still being measured (it renders as that line, in place of the table).
    const laneTables = lane.tables.filter((table) => datasetHasTable(dataset, table.tableId));
    const tableBlock = (table: (typeof laneTables)[number]): ProjectEditorialBodyBlock => ({
      type: "benchmarkTable",
      tableId: table.tableId,
      caption: table.caption,
      showDigests: table.showDigests,
    });
    const hasRows = laneTables.some((table) =>
      dataset.tables.some((candidate) => candidate.id === table.tableId && candidate.entries.length > 0),
    );
    // A lane with a table of rows shows its whole text and every table. A lane with none keeps its first paragraph and its
    // headline line, as before, and says its results are not in when the payload does not even name a table for it.
    const body: ProjectEditorialBodyBlock[] = hasRows
      ? [...lane.lead, ...laneTables.map(tableBlock)]
      : laneTables.length > 0
        ? [lane.lead[0], tableBlock(laneTables[0])]
        : [
            lane.lead[0],
            `The ${lane.title.toLowerCase()} lane has no published results yet. They appear here when its first measurement is complete.`,
          ];
    return { ...section, body };
  });

  return { ...project, editorialPage: { ...page, sections } };
}
