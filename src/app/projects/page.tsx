import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionCta } from "@/components/section-blocks";
import { getProjectsIndexProjects } from "@/lib/projects";
import { githubOrgUrl } from "@/lib/site-data";
import { ProjectsIndexSection } from "./projects-index";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open source HumemAI projects: memory systems, databases, and research, all open to contributors.",
};

export default function ProjectsPage() {
  const indexProjects = getProjectsIndexProjects();

  return (
    <main className={styles.indexPage}>
      <PageHero
        eyebrow="Projects"
        title="Open source projects behind HumemAI."
        intro="Every project is open source. Browse the major project lines first, then open each dedicated project page to explore the subprojects, systems, and research inside it. Contributions are welcome on all of them."
        imageSrc="/images/projects/projects-overview-portfolio.png"
        imageAlt="Illustration representing research, systems work, and applied AI memory projects"
        actions={[
          { href: githubOrgUrl, label: "View HumemAI on GitHub" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      />

      <ProjectsIndexSection projects={indexProjects} />

      <SectionCta
        eyebrow="Contribute"
        title="Everything here is open source. Come build it with us."
        actions={[
          { href: githubOrgUrl, label: "View HumemAI on GitHub" },
          { href: "/contact", label: "Contact HumemAI", variant: "secondary" },
        ]}
      >
        <p>
          The code, benchmarks, and papers behind every project are published under open licenses. Open an issue when something is wrong or missing, send a pull request when you have a fix, or reproduce a benchmark on your own hardware and report what you measured.
        </p>
        <p>
          If you work on memory for agents, knowledge graphs, or multi-model databases and want to build on one of these projects, get in touch. Research collaborations are welcome too.
        </p>
      </SectionCta>
    </main>
  );
}