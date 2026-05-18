import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { getProject, getSubprojects, projects } from "@/lib/projects";
import styles from "../projects.module.css";

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
    openGraph: project.image
      ? {
          images: [
            {
              url: project.image.src,
              alt: project.image.alt,
            },
          ],
        }
      : undefined,
    twitter: project.image
      ? {
          card: "summary_large_image",
          images: [project.image.src],
        }
      : undefined,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const subprojects = getSubprojects(project);

  return (
    <ContentPage
      context={<Link href="/projects">Projects</Link>}
      eyebrow="Project"
      title={project.title}
      intro={project.summary}
      aside={
        <>
          {project.image ? (
            <figure className="heroFigure">
              <div className="heroFigureImageWrap">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  className="heroFigureImage"
                  sizes="(min-width: 1024px) 360px, 100vw"
                />
              </div>
              <figcaption className="heroFigureCaption">{project.title}</figcaption>
            </figure>
          ) : null}
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
        <h2>The problem</h2>
        <p>{project.problem}</p>
      </section>
      <section>
        <h2>What we are building</h2>
        <p>{project.solution}</p>
      </section>
      {project.impact ? (
        <section>
          <h2>Why it matters</h2>
          <p>{project.impact}</p>
        </section>
      ) : null}
      {subprojects.length > 0 ? (
        <section>
          <h2>Subprojects</h2>
          <div className={styles.grid}>
            {subprojects.map((subproject) => (
              <Link className={styles.card} href={`/projects/${subproject.slug}`} key={subproject.slug}>
                <h3>{subproject.title}</h3>
                <p className={styles.summary}>{subproject.summary}</p>
                <p className={styles.meta}>
                  {subproject.funding ? `${subproject.funding} · ${subproject.status}` : subproject.status}
                </p>
                <span className={styles.action}>Open project page</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {project.acknowledgements ? (
        <section>
          <h2>Acknowledgements</h2>
          <p>{project.acknowledgements}</p>
        </section>
      ) : null}
    </ContentPage>
  );
}