import type { Metadata } from "next";
import { DetailSection } from "@/components/detail-section";
import { EditorialMediaHero } from "@/components/editorial-media-hero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectByPath, getProjectsInSection, projectPathSlug, type Section } from "@/lib/projects";
import { sectionCopy } from "./section-page";
import { EditorialProjectPage, buildAcknowledgements } from "./editorial-project-page";
import styles from "./projects.module.css";

export function sectionStaticParams(section: Section) {
  return getProjectsInSection(section).map((project) => ({ slug: projectPathSlug(project.slug) }));
}

export function projectMetadata(slug: string, section: Section): Metadata {
  const project = getProjectByPath(section, slug);

  if (!project) {
    return { title: sectionCopy[section].label };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: project.image ? { images: [{ url: project.image.src, alt: project.image.alt }] } : undefined,
    twitter: project.image ? { card: "summary_large_image", images: [project.image.src] } : undefined,
  };
}

/** The canonical page of a project. A slug that belongs to the other section is a 404: one page, one URL. */
export function ProjectDetail({ slug, section }: { slug: string; section: Section }) {
  const project = getProjectByPath(section, slug);

  if (!project) {
    notFound();
  }

  const copy = sectionCopy[section];
  const acknowledgementsSectionContent = buildAcknowledgements(project);
  const editorialSections = project.editorialPage?.sections ?? [];

  if (project.editorialPage?.layout === "editorial" && editorialSections.length > 0) {
    return <EditorialProjectPage project={project} />;
  }

  const relatedLinks = project.links.filter((link) => link.href.startsWith("/") && link.href !== "/contact");

  return (
    <main className={styles.detailPage}>
      <EditorialMediaHero
        context={<Link href={`/${section}`}>{copy.label}</Link>}
        eyebrow={copy.label}
        title={project.title}
        intro={project.summary}
        titleVariant="feature"
        imageSrc={project.image?.src}
        imageAlt={project.image?.alt}
        showFallbackMedia={!project.image}
      />

      <DetailSection
        eyebrow="Why it exists"
        title={project.featuredPage?.problemHeading ?? "The problem this work is trying to solve."}
      >
        <p>{project.problem}</p>
      </DetailSection>

      <DetailSection
        eyebrow="What it is building"
        title={project.featuredPage?.solutionHeading ?? "What we are building."}
      >
        <p>{project.solution}</p>
        {project.impact ? <p>{project.impact}</p> : null}
      </DetailSection>

      {relatedLinks.length > 0 ? (
        <DetailSection
          eyebrow="Related research"
          title="The papers and systems in this line."
          bodyVariant="plain"
          bodyClassName={styles.subprojectLinksList}
        >
          {relatedLinks.map((link) => (
            <Link className={styles.subprojectLinkRow} href={link.href} key={link.href}>
              <span>{link.label}</span>
              <span className={styles.subprojectLinkAction}>Open</span>
            </Link>
          ))}
        </DetailSection>
      ) : null}

      {acknowledgementsSectionContent ? (
        <DetailSection
          eyebrow="Acknowledgements"
          title={project.featuredPage?.acknowledgementsHeading ?? "Project support."}
        >
          {acknowledgementsSectionContent}
        </DetailSection>
      ) : null}
    </main>
  );
}
