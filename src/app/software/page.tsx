import type { Metadata } from "next";
import { SectionPage, sectionCopy } from "../_projects/section-page";

export const metadata: Metadata = {
  title: sectionCopy.software.label,
  description: sectionCopy.software.metaDescription,
};

export default function SoftwarePage() {
  return <SectionPage section="software" />;
}
