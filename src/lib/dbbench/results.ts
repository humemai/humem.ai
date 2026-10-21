import type { BenchmarkDataset } from "@/components/editorial-sections";
import type { Project, ProjectEditorialBodyBlock } from "@/lib/projects/types";
import { dbbenchLanes } from "./lanes";
import { datasetHasTable } from "./payload";

// The DBBench project page is written for the time before any result exists (src/lib/projects/items/dbbench.ts). When a
// payload exists, this swaps in what the payload adds: the machine and the shared conditions in place of the "No results yet"
// section, and each lane's headline table in place of the line that says the lane will carry tables. With no payload the
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
    const headline = lane?.tables.find((table) => datasetHasTable(dataset, table.tableId));
    if (lane && headline) {
      const body: ProjectEditorialBodyBlock[] = [
        lane.lead[0],
        {
          type: "benchmarkTable",
          tableId: headline.tableId,
          caption: headline.caption,
          showDigests: headline.showDigests,
        },
        `[Every ${lane.title.toLowerCase()} table](/research/dbbench/${lane.slug}), with the rest of the tasks in this lane.`,
      ];
      return { ...section, body };
    }
    return section;
  });

  return { ...project, editorialPage: { ...page, sections } };
}
