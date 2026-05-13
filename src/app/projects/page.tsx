import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse flagship HumemAI projects and the dedicated page for each one.",
};

export default function ProjectsPage() {
  return (
    <ContentPage
      eyebrow="Projects"
      title="Public proof, flagship efforts, and dedicated project pages."
      intro="Use this overview as the hub. Each card should point to its own page with the background, funding context, repositories, and current status."
      aside={<p>Projects work better than Research as a startup credibility surface because they show concrete outcomes instead of only positioning.</p>}
    >
      {projects.map((project) => (
        <section key={project.slug}>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <p>{project.funding} · {project.status}</p>
          <p>
            <Link href={`/projects/${project.slug}`}>View project page</Link>
          </p>
        </section>
      ))}
    </ContentPage>
  );
}