import type { Metadata } from "next";
import { SectionPage, sectionCopy } from "../_projects/section-page";

export const metadata: Metadata = {
  title: sectionCopy.research.label,
  description: sectionCopy.research.metaDescription,
};

export default function ResearchPage() {
  return <SectionPage section="research" />;
}
