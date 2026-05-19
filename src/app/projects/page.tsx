import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getProjectsIndexProjects } from "@/lib/projects";
import { ProjectsIndexSection } from "./projects-index";
import { getProjectPageCount, getProjectPageItems } from "./projects-pagination";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse flagship HumemAI projects and the dedicated page for each one.",
};

export default function ProjectsPage() {
  const indexProjects = getProjectsIndexProjects();
  const totalPages = getProjectPageCount(indexProjects.length);
  const visibleProjects = getProjectPageItems(indexProjects, 1);

  return (
    <main className={styles.indexPage}>
      <PageHero
        eyebrow="Projects"
        title="Open source projects behind HumemAI."
        intro="Browse the three major project lines first, then open each dedicated project page to explore the subprojects, systems, and research inside it."
        imageSrc="/illustrations/projects-overview-portfolio.png"
        imageAlt="Illustration representing research, systems work, and applied AI memory projects"
        actions={[
          { href: "https://github.com/humemai", label: "View HumemAI on GitHub" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      />

      <ProjectsIndexSection currentPage={1} projects={visibleProjects} totalPages={totalPages} />
    </main>
  );
}