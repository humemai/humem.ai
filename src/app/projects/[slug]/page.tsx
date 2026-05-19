import type { Metadata } from "next";
import Image from "next/image";
import { DetailSection } from "@/components/detail-section";
import { EditorialMediaHero } from "@/components/editorial-media-hero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StandaloneLinkSection, StandaloneSection, StandaloneSectionFigure } from "@/components/standalone-sections";
import { StandaloneSectionNav } from "@/components/standalone-section-nav";
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
  const projectLinks = project.links.map((link) => ({
    ...link,
    isInternal: link.href.startsWith("/"),
  }));
  const standalonePage = project.standalonePage ?? project.subprojectPage;
  const standaloneSections = standalonePage?.sections ?? [];
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
          imageCaption={project.image?.alt}
          actions={heroActionLinks.map((link, index) => ({
            href: link.href,
            label: link.label,
            variant: index === 0 ? "primary" : "secondary",
          }))}
          showFallbackMedia={!project.image}
        >
          {project.sponsor ? (
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
          ) : null}
        </EditorialMediaHero>

        <StandaloneSectionNav
          sections={standaloneSections.map((section) => ({ id: section.id, navLabel: section.navLabel }))}
          navClassName={styles.standaloneNav}
          innerClassName={styles.standaloneNavInner}
          linkClassName={styles.standaloneNavLink}
          activeLinkClassName={styles.standaloneNavLinkActive}
        />

        {standaloneSections.map((section) => (
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
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
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

        {project.acknowledgements ? (
          <StandaloneSection eyebrow="Acknowledgements" title="Project support." bodyVariant="acknowledgements">
            {acknowledgementsContent}
          </StandaloneSection>
        ) : null}
      </main>
    );
  }

  if (project.showOnProjectsIndex) {
    return (
      <main className={styles.detailPage}>
        <section className={styles.detailHero}>
          <div className={styles.detailHeroCopy}>
            <p className={styles.detailContext}>
              <Link href="/projects">Projects</Link>
            </p>
            <p className={styles.sectionEyebrow}>Project</p>
            <h1>{project.title}</h1>
            <p className={styles.detailIntro}>{project.summary}</p>
            {project.sponsor ? (
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
            ) : null}
          </div>

          <figure className={styles.detailHeroFigure}>
            {project.image ? (
              <div className={styles.detailHeroImageWrap}>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  className={styles.detailHeroImage}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
            ) : (
              <div className={styles.detailHeroFallback} />
            )}
          </figure>
        </section>

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
          <section className={styles.detailSubprojects}>
            <div className={styles.subprojectsHeading}>
              <div>
                <p className={styles.sectionEyebrow}>Project structure</p>
                <h3>Subprojects.</h3>
              </div>
            </div>

            <div className={styles.subprojectGrid}>
              {subprojects.map((subproject) => {
                const image = subproject.image ?? project.image;

                return (
                  <Link className={styles.subprojectCard} href={`/projects/${subproject.slug}`} key={subproject.slug}>
                    {image ? (
                      <div className={styles.subprojectImageWrap}>
                        <Image
                          alt={image.alt}
                          className={styles.subprojectImage}
                          fill
                          sizes="(min-width: 1280px) 24rem, (min-width: 720px) 42vw, 100vw"
                          src={image.src}
                        />
                      </div>
                    ) : (
                      <div className={styles.subprojectFallback} />
                    )}
                    <div className={styles.subprojectContent}>
                      <p className={styles.subprojectEyebrow}>{subproject.status}</p>
                      <h4>{subproject.title}</h4>
                      <p className={styles.subprojectSummary}>{subproject.summary}</p>
                      <span className={styles.subprojectAction}>Learn more</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {project.acknowledgements ? (
          <DetailSection
            eyebrow="Acknowledgements"
            title={project.featuredPage?.acknowledgementsHeading ?? "Project support."}
          >
            {acknowledgementsContent}
          </DetailSection>
        ) : null}
      </main>
    );
  }

  return (
    <main className={styles.subprojectPage}>
      <section className={styles.subprojectHero}>
        <div className={styles.subprojectHeroCopy}>
          <p className={styles.detailContext}>{projectContext}</p>
          <p className={styles.sectionEyebrow}>Subproject</p>
          <h1>{project.title}</h1>
          <p className={styles.detailIntro}>{project.summary}</p>
          {project.sponsor ? (
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
          ) : null}
        </div>

        <figure className={styles.subprojectHeroFigure}>
          {project.image ? (
            <div className={styles.subprojectHeroImageWrap}>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className={styles.subprojectHeroImage}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
          ) : (
            <div className={styles.subprojectHeroFallback} />
          )}
        </figure>
      </section>

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

      {project.acknowledgements ? (
        <DetailSection eyebrow="Acknowledgements" title="Project support.">
          {acknowledgementsContent}
        </DetailSection>
      ) : null}
    </main>
  );
}