import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { ReactNode } from "react";
import type { BenchmarkDataset } from "@/components/editorial-sections";
import { EditorialBenchmarkTable, EditorialConditions, EditorialFigureGrid, EditorialLinkSection, EditorialSection, EditorialSectionFigure, EditorialSkeletonNotes } from "@/components/editorial-sections";
import { EditorialMediaHero } from "@/components/editorial-media-hero";
import { EditorialSectionNav } from "@/components/editorial-section-nav";
import { projects } from "@/lib/projects";
import type { Project, ProjectEditorialBodyBlock } from "@/lib/projects/types";
import styles from "./projects.module.css";

// One renderer for every editorial project page. The live ArcadeDB page and
// its October preview (/projects/arcadedb/next) differ only in the prose file
// and the payload they are fed, so the renderer is parameterized by both
// rather than forked (DECISIONS #83).

export function buildAcknowledgements(project: Project): ReactNode {
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
  return sponsorBadge || acknowledgementsContent ? (
    <>
      {sponsorBadge}
      {acknowledgementsContent}
    </>
  ) : null;
}

type EditorialProjectPageProps = {
  project: Project;
  dataset: BenchmarkDataset;
  /** Rendered above the hero; the October preview uses it for its notice. */
  banner?: ReactNode;
};

export function EditorialProjectPage({ project, dataset, banner }: EditorialProjectPageProps) {
  const parentProject = projects.find((candidate) => candidate.subprojectSlugs?.includes(project.slug));
  const projectContext = (
    <>
      <Link href="/projects">Projects</Link>
      {parentProject ? (
        <>
          {" / "}
          <Link href={`/projects/${parentProject.slug}`}>{parentProject.title}</Link>
        </>
      ) : null}
    </>
  );
  const acknowledgementsSectionContent = buildAcknowledgements(project);
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
  const heroActionLinks = projectLinks.slice(0, 2);
  const editorialLabel = project.showOnProjectsIndex ? "Project" : "Subproject";

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
                return <Link href={normalizedHref}>{children}</Link>;
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
            title: item.title,
            imageSrc: item.image.src,
            imageAlt: item.image.alt,
          }))}
        />
      );
    }

    if (block.type === "benchmarkConditions") {
      return <EditorialConditions key={`${sectionId}-${index}`} conditions={dataset.conditions} />;
    }

    if (block.type === "skeletonNotes") {
      return <EditorialSkeletonNotes key={`${sectionId}-${index}`} dataset={dataset} />;
    }

    if (block.type === "benchmarkTable") {
      const table = dataset.tables.find((candidate) => candidate.id === block.tableId);
      // A renamed lane or a re-export that drops a table would otherwise render
      // an empty shell that reads like "we measured nothing". Skip instead, and
      // let the build-time check be the thing that complains.
      if (!table) {
        return null;
      }

      const entries = block.scale
        ? table.entries.filter((entry) => entry.scale === block.scale)
        : table.entries;

      if (entries.length === 0) {
        return null;
      }

      return (
        <EditorialBenchmarkTable
          key={`${sectionId}-${index}`}
          title={table.title}
          dataset={table.dataset}
          columns={table.columns}
          entries={entries}
          conditions={table.conditions}
          caption={block.caption}
          showDigests={block.showDigests}
          withheldScales={table.withheld_scales}
          withheldReason={table.withheld_reason}
          sourcePath={table.source_path}
          sourceUrl={table.source_url}
          sourcePaths={table.source_paths}
          directions={table.directions}
          sourceUrls={table.source_urls}
        />
      );
    }

    return null;
  };

  const renderSection = (section: (typeof editorialSections)[number]) => (
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
  );

  return (
    <main className={styles.editorialPage}>
      {banner ? <div className={styles.previewBanner}>{banner}</div> : null}

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

      {mainEditorialSections.map(renderSection)}

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

      {citationSection ? renderSection(citationSection) : null}
    </main>
  );
}
