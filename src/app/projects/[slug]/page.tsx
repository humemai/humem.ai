import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { getProject, projects } from "@/lib/projects";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <ContentPage
      context={<Link href="/projects">Projects</Link>}
      eyebrow="Project"
      title={project.title}
      intro={project.summary}
      aside={
        <>
          {project.sponsor ? (
            <a
              className="partnerLogoLink"
              href={project.sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={project.sponsor.logoSrc}
                alt={project.sponsor.logoAlt}
                width={180}
                height={52}
                className="partnerLogo"
              />
            </a>
          ) : null}
          <p className="partnerMeta">{project.funding ?? "HumemAI project"}</p>
          <p className="partnerStatus">{project.status}</p>
        </>
      }
    >
      <section>
        <h2>Why it exists</h2>
        <p>{project.problem}</p>
      </section>
      <section>
        <h2>What HumemAI is building</h2>
        <p>{project.solution}</p>
      </section>
      {project.impact ? (
        <section>
          <h2>Public-interest fit</h2>
          <p>{project.impact}</p>
        </section>
      ) : null}
      {project.acknowledgements ? (
        <section>
          <h2>Acknowledgements</h2>
          <p>{project.acknowledgements}</p>
        </section>
      ) : null}
      <section>
        <h2>Links and next steps</h2>
        <ul>
          {project.links.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link href={link.href}>{link.label}</Link>
              ) : (
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </ContentPage>
  );
}