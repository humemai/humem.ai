import type { Metadata } from "next";
import Image from "next/image";
import { DetailSection } from "@/components/detail-section";
import { EditorialMediaHero } from "@/components/editorial-media-hero";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { EditorialFigureGrid, EditorialLinkSection, EditorialSection, EditorialSectionFigure } from "@/components/editorial-sections";
import { EditorialSectionNav } from "@/components/editorial-section-nav";
import { getProject, getSubprojects, projects } from "@/lib/projects";
import type { ProjectEditorialBodyBlock } from "@/lib/projects/types";
import { ProjectScrollReset } from "../project-scroll-reset";
import { SubprojectsSection } from "../subprojects-section";
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
  const parentProject = projects.find((candidate) => candidate.subprojectSlugs?.includes(project.slug));
  const projectContext = (
    <>
      <Link href="/projects" scroll>Projects</Link>
      {parentProject ? (
        <>
          {" / "}
          <Link href={`/projects/${parentProject.slug}`} scroll>{parentProject.title}</Link>
        </>
      ) : null}
    </>
  );
  const acknowledgementsContent = project.acknowledgements ? (
    typeof project.acknowledgements === "string" ? (
      <p>{project.acknowledgements}</p>
    ) : (
      <p>
        {project.acknowledgements.text}{" "}
        {project.acknowledgements.link ? (
          <a
            className={styles.detailInlineLink}
            href={project.acknowledgements.link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.acknowledgements.link.label}
          </a>
        ) : null}
        {project.acknowledgements.trailingText ? <> {project.acknowledgements.trailingText}</> : null}
      </p>
    )
  ) : null;
  const sponsorBadge = project.sponsor ? (
    <a
      className={styles.detailSponsor}
      href={project.sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={project.sponsor.logoSrc}
        alt={project.sponsor.logoAlt}
        width={180}
        height={52}
        className={styles.detailSponsorLogo}
      />
    </a>
  ) : null;
  const acknowledgementsSectionContent = sponsorBadge || acknowledgementsContent ? (
    <>
      {sponsorBadge}
      {acknowledgementsContent}
    </>
  ) : null;
  const projectLinks = project.links.map((link) => ({
    ...link,
    isInternal: link.href.startsWith("/"),
  }));
  const editorialPage = project.editorialPage ?? project.subprojectPage;
  const editorialSections = editorialPage?.sections ?? [];
  const citationSection = editorialSections.find((section) => section.id === "citation");
  const mainEditorialSections = citationSection
    ? editorialSections.filter((section) => section.id !== "citation")
    : editorialSections;
  const isEditorialPage = editorialPage?.layout === "editorial" && editorialSections.length > 0;
  const heroActionLinks = projectLinks.slice(0, 2);
  const renderEditorialBodyBlock = (sectionId: string, block: ProjectEditorialBodyBlock, index: number) => {
    if (typeof block === "string") {
      return (
        <ReactMarkdown
          key={`${sectionId}-${index}`}
          rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeHighlight, { ignoreMissing: true }]]}
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            a: ({ href, children, ...props }) => {
              const normalizedHref = String(href ?? "");

              if (normalizedHref.startsWith("/")) {
                return <Link href={normalizedHref} scroll>{children}</Link>;
              }

              return (
                <a href={normalizedHref} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            },
          }}
        >
          {block}
        </ReactMarkdown>
      );
    }

    if (block.type === "figureGrid") {
      return (
        <EditorialFigureGrid
          key={`${sectionId}-${index}`}
          columns={block.columns}
          caption={block.caption}
          items={block.items.map((item) => ({
            label: item.label,
            imageSrc: item.image.src,
            imageAlt: item.image.alt,
          }))}
        />
      );
    }

    return null;
  };

  if (isEditorialPage) {
    const editorialLabel = project.showOnProjectsIndex ? "Project" : "Subproject";

    return (
      <main className={styles.editorialPage}>
        <ProjectScrollReset />
        <EditorialMediaHero
          context={projectContext}
          eyebrow={editorialLabel}
          title={project.title}
          intro={project.summary}
          imageSrc={project.image?.src}
          imageAlt={project.image?.alt}
          actions={heroActionLinks.map((link, index) => ({
            href: link.href,
            label: link.label,
            variant: index === 0 ? "primary" : "secondary",
          }))}
          showFallbackMedia={!project.image}
        />

        <EditorialSectionNav
          sections={mainEditorialSections.map((section) => ({ id: section.id, navLabel: section.navLabel }))}
          navClassName={styles.editorialNav}
          innerClassName={styles.editorialNavInner}
          linkClassName={styles.editorialNavLink}
          activeLinkClassName={styles.editorialNavLinkActive}
        />

        {mainEditorialSections.map((section) => (
          <EditorialSection
            id={section.id}
            key={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            figure={section.figure ? (
              <EditorialSectionFigure
                label={section.figure.label}
                title={section.figure.title}
                caption={section.figure.caption}
                imageSrc={section.figure.image?.src}
                imageAlt={section.figure.image?.alt}
                points={section.figure.points}
              />
            ) : undefined}
          >
              {section.body.map((block, index) => renderEditorialBodyBlock(section.id, block, index))}
          </EditorialSection>
        ))}

        {projectLinks.length > 0 ? (
          <EditorialLinkSection
            eyebrow="Resources"
            title={editorialPage?.linksHeading ?? "Resources."}
            links={projectLinks.map((link) => ({ href: link.href, content: link.label }))}
          />
        ) : null}

        {acknowledgementsSectionContent ? (
          <EditorialSection eyebrow="Acknowledgements" title="Project support." bodyVariant="acknowledgements">
            {acknowledgementsSectionContent}
          </EditorialSection>
        ) : null}

        {citationSection ? (
          <EditorialSection
            id={citationSection.id}
            eyebrow={citationSection.eyebrow}
            title={citationSection.title}
            figure={citationSection.figure ? (
              <EditorialSectionFigure
                label={citationSection.figure.label}
                title={citationSection.figure.title}
                caption={citationSection.figure.caption}
                imageSrc={citationSection.figure.image?.src}
                imageAlt={citationSection.figure.image?.alt}
                points={citationSection.figure.points}
              />
            ) : undefined}
          >
              {citationSection.body.map((block, index) => renderEditorialBodyBlock(citationSection.id, block, index))}
          </EditorialSection>
        ) : null}
      </main>
    );
  }

  if (project.showOnProjectsIndex) {
    return (
      <main className={styles.detailPage}>
        <ProjectScrollReset />
        <EditorialMediaHero
          context={<Link href="/projects" scroll>Projects</Link>}
          eyebrow="Project"
          title={project.title}
          intro={project.summary}
          titleVariant="feature"
          imageSrc={project.image?.src}
          imageAlt={project.image?.alt}
          showFallbackMedia={!project.image}
        />

        <DetailSection
          eyebrow="Why it exists"
          title={project.featuredPage?.problemHeading ?? "The project-level problem this work is trying to solve."}
        >
            <p>{project.problem}</p>
        </DetailSection>

        <DetailSection
          eyebrow="What it is building"
          title={project.featuredPage?.solutionHeading ?? "The work is organized as a larger project, not just a list of repositories."}
        >
            <p>{project.solution}</p>
            {project.impact ? <p>{project.impact}</p> : null}
        </DetailSection>

        {subprojects.length > 0 ? (
          <SubprojectsSection
            subprojects={subprojects}
          />
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

  return (
    <main className={styles.subprojectPage}>
      <ProjectScrollReset />
      <EditorialMediaHero
        context={projectContext}
        eyebrow="Subproject"
        title={project.title}
        intro={project.summary}
        titleVariant="feature"
        imageSrc={project.image?.src}
        imageAlt={project.image?.alt}
        showFallbackMedia={!project.image}
      />

      <DetailSection eyebrow="Why it exists" title={project.subprojectPage?.problemHeading ?? "The problem"}>
          <p>{project.problem}</p>
      </DetailSection>

      <DetailSection eyebrow="What it is building" title={project.subprojectPage?.solutionHeading ?? "What we are building"}>
          <p>{project.solution}</p>
      </DetailSection>

      {project.impact ? (
        <DetailSection eyebrow="Why it matters" title={project.subprojectPage?.impactHeading ?? "Why it matters"}>
            <p>{project.impact}</p>
        </DetailSection>
      ) : null}

      {project.subprojectPage?.highlights?.length ? (
        <DetailSection
          eyebrow="Highlights"
          title={project.subprojectPage.highlightsHeading ?? "Highlights."}
          bodyVariant="plain"
          bodyClassName={styles.subprojectHighlightList}
        >
            {project.subprojectPage.highlights.map((highlight) => (
              <article className={styles.subprojectHighlightItem} key={highlight.title}>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
        </DetailSection>
      ) : null}

      {projectLinks.length > 0 ? (
        <DetailSection
          eyebrow="Links"
          title={project.subprojectPage?.linksHeading ?? "Links."}
          bodyVariant="plain"
          bodyClassName={styles.subprojectLinksList}
        >
            {projectLinks.map((link) =>
              link.isInternal ? (
                <Link className={styles.subprojectLinkRow} href={link.href} key={link.href} scroll>
                  <span>{link.label}</span>
                  <span className={styles.subprojectLinkAction}>Open</span>
                </Link>
              ) : (
                <a
                  className={styles.subprojectLinkRow}
                  href={link.href}
                  key={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{link.label}</span>
                  <span className={styles.subprojectLinkAction}>Open</span>
                </a>
              ),
            )}
        </DetailSection>
      ) : null}

      {subprojects.length > 0 ? (
        <DetailSection
          eyebrow="Project structure"
          title="Subprojects."
          bodyVariant="plain"
          bodyClassName={styles.subprojectLinksList}
        >
            {subprojects.map((subproject) => (
              <Link className={styles.subprojectLinkRow} href={`/projects/${subproject.slug}`} key={subproject.slug} scroll>
                <span>
                  <strong>{subproject.title}</strong>
                  <small className={styles.subprojectLinkSummary}>{subproject.summary}</small>
                </span>
                <span className={styles.subprojectLinkAction}>Open</span>
              </Link>
            ))}
        </DetailSection>
      ) : null}

      {acknowledgementsSectionContent ? (
        <DetailSection eyebrow="Acknowledgements" title="Project support.">
          {acknowledgementsSectionContent}
        </DetailSection>
      ) : null}
    </main>
  );
}