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
import { StandaloneLinkSection, StandaloneSection, StandaloneSectionFigure } from "@/components/standalone-sections";
import { StandaloneSectionNav } from "@/components/standalone-section-nav";
import { getProject, getSubprojects, projects } from "@/lib/projects";
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
      <Link href="/projects">Projects</Link>
      {parentProject ? (
        <>
          {" / "}
          <Link href={`/projects/${parentProject.slug}`}>{parentProject.title}</Link>
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
  const standalonePage = project.standalonePage ?? project.subprojectPage;
  const standaloneSections = standalonePage?.sections ?? [];
  const citationSection = standaloneSections.find((section) => section.id === "citation");
  const mainStandaloneSections = citationSection
    ? standaloneSections.filter((section) => section.id !== "citation")
    : standaloneSections;
  const isStandalonePage = standalonePage?.layout === "standalone" && standaloneSections.length > 0;
  const heroActionLinks = projectLinks.slice(0, 2);

  if (isStandalonePage) {
    const standaloneLabel = project.showOnProjectsIndex ? "Project" : "Subproject";

    return (
      <main className={styles.standalonePage}>
        <EditorialMediaHero
          context={projectContext}
          eyebrow={standaloneLabel}
          title={project.title}
          intro={project.summary}
          titleVariant="feature"
          imageSrc={project.image?.src}
          imageAlt={project.image?.alt}
          actions={heroActionLinks.map((link, index) => ({
            href: link.href,
            label: link.label,
            variant: index === 0 ? "primary" : "secondary",
          }))}
          showFallbackMedia={!project.image}
        />

        <StandaloneSectionNav
          sections={mainStandaloneSections.map((section) => ({ id: section.id, navLabel: section.navLabel }))}
          navClassName={styles.standaloneNav}
          innerClassName={styles.standaloneNavInner}
          linkClassName={styles.standaloneNavLink}
          activeLinkClassName={styles.standaloneNavLinkActive}
        />

        {mainStandaloneSections.map((section) => (
          <StandaloneSection
            id={section.id}
            key={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            figure={section.figure ? (
              <StandaloneSectionFigure
                label={section.figure.label}
                title={section.figure.title}
                caption={section.figure.caption}
                imageSrc={section.figure.image?.src}
                imageAlt={section.figure.image?.alt}
                points={section.figure.points}
              />
            ) : undefined}
          >
              {section.body.map((block, index) => (
                <ReactMarkdown
                  key={`${section.id}-${index}`}
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
              ))}
          </StandaloneSection>
        ))}

        {projectLinks.length > 0 ? (
          <StandaloneLinkSection
            eyebrow="Resources"
            title={standalonePage?.linksHeading ?? "Resources."}
            links={projectLinks.map((link) => ({ href: link.href, content: link.label }))}
          />
        ) : null}

        {acknowledgementsSectionContent ? (
          <StandaloneSection eyebrow="Acknowledgements" title="Project support." bodyVariant="acknowledgements">
            {acknowledgementsSectionContent}
          </StandaloneSection>
        ) : null}

        {citationSection ? (
          <StandaloneSection
            id={citationSection.id}
            eyebrow={citationSection.eyebrow}
            title={citationSection.title}
            figure={citationSection.figure ? (
              <StandaloneSectionFigure
                label={citationSection.figure.label}
                title={citationSection.figure.title}
                caption={citationSection.figure.caption}
                imageSrc={citationSection.figure.image?.src}
                imageAlt={citationSection.figure.image?.alt}
                points={citationSection.figure.points}
              />
            ) : undefined}
          >
              {citationSection.body.map((block, index) => (
                <ReactMarkdown
                  key={`${citationSection.id}-${index}`}
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
              ))}
          </StandaloneSection>
        ) : null}
      </main>
    );
  }

  if (project.showOnProjectsIndex) {
    return (
      <main className={styles.detailPage}>
        <EditorialMediaHero
          context={<Link href="/projects">Projects</Link>}
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
                <Link className={styles.subprojectLinkRow} href={link.href} key={link.href}>
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
              <Link className={styles.subprojectLinkRow} href={`/projects/${subproject.slug}`} key={subproject.slug}>
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