import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
        <section className={styles.standaloneHero}>
          <div className={styles.standaloneHeroCopy}>
            <p className={styles.detailContext}>{projectContext}</p>
            <p className={styles.sectionEyebrow}>{standaloneLabel}</p>
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
            {heroActionLinks.length > 0 ? (
              <div className={styles.standaloneHeroActions}>
                {heroActionLinks.map((link, index) =>
                  link.isInternal ? (
                    <Link
                      className={index === 0 ? styles.standalonePrimaryAction : styles.standaloneSecondaryAction}
                      href={link.href}
                      key={link.href}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      className={index === 0 ? styles.standalonePrimaryAction : styles.standaloneSecondaryAction}
                      href={link.href}
                      key={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            ) : null}
          </div>

          <figure className={styles.standaloneHeroFigure}>
            {project.image ? (
              <>
                <div className={styles.standaloneHeroImageWrap}>
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    className={styles.standaloneHeroImage}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>
                <figcaption className={styles.standaloneHeroCaption}>{project.image.alt}</figcaption>
              </>
            ) : (
              <div className={styles.standaloneHeroFallback} />
            )}
          </figure>
        </section>

        <StandaloneSectionNav
          sections={standaloneSections.map((section) => ({ id: section.id, navLabel: section.navLabel }))}
          navClassName={styles.standaloneNav}
          innerClassName={styles.standaloneNavInner}
          linkClassName={styles.standaloneNavLink}
          activeLinkClassName={styles.standaloneNavLinkActive}
        />

        {standaloneSections.map((section) => (
          <section className={styles.standaloneSection} id={section.id} key={section.id}>
            <div className={styles.standaloneSectionLead}>
              <p className={styles.sectionEyebrow}>{section.eyebrow}</p>
              <h2>{section.title}</h2>
            </div>

            {section.figure ? (
              <figure className={styles.standaloneFigure}>
                <p className={styles.standaloneFigureLabel}>{section.figure.label}</p>
                <div className={styles.standaloneFigurePanel}>
                  {section.figure.image ? (
                    <div className={styles.standaloneFigureImageWrap}>
                      <Image
                        src={section.figure.image.src}
                        alt={section.figure.image.alt}
                        fill
                        className={styles.standaloneFigureImage}
                        sizes="(min-width: 1024px) 34vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <p className={styles.standaloneFigureTitle}>{section.figure.title}</p>
                  {section.figure.points?.length ? (
                    <ul className={styles.standaloneFigurePoints}>
                      {section.figure.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <figcaption className={styles.standaloneFigureCaption}>{section.figure.caption}</figcaption>
              </figure>
            ) : null}

            <div className={styles.standaloneSectionBody}>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        {projectLinks.length > 0 ? (
          <section className={styles.standaloneResources}>
            <div className={styles.standaloneSectionLead}>
              <p className={styles.sectionEyebrow}>Resources</p>
              <h2>{standalonePage?.linksHeading ?? "Resources."}</h2>
            </div>
            <div className={styles.standaloneResourceList}>
              {projectLinks.map((link) =>
                link.isInternal ? (
                  <Link className={styles.standaloneResourceRow} href={link.href} key={link.href}>
                    <span>{link.label}</span>
                    <span className={styles.standaloneResourceAction}>Open</span>
                  </Link>
                ) : (
                  <a
                    className={styles.standaloneResourceRow}
                    href={link.href}
                    key={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{link.label}</span>
                    <span className={styles.standaloneResourceAction}>Open</span>
                  </a>
                ),
              )}
            </div>
          </section>
        ) : null}

        {project.acknowledgements ? (
          <section className={styles.standaloneResources}>
            <div className={styles.standaloneSectionLead}>
              <p className={styles.sectionEyebrow}>Acknowledgements</p>
              <h2>Project support.</h2>
            </div>
            <div className={styles.standaloneAcknowledgementsBody}>{acknowledgementsContent}</div>
          </section>
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

        <section className={styles.detailSection}>
          <div className={styles.detailSectionLead}>
            <p className={styles.sectionEyebrow}>Why it exists</p>
            <h2>{project.featuredPage?.problemHeading ?? "The project-level problem this work is trying to solve."}</h2>
          </div>
          <div className={styles.detailSectionBody}>
            <p>{project.problem}</p>
          </div>
        </section>

        <section className={styles.detailSection}>
          <div className={styles.detailSectionLead}>
            <p className={styles.sectionEyebrow}>What it is building</p>
            <h2>{project.featuredPage?.solutionHeading ?? "The work is organized as a larger project, not just a list of repositories."}</h2>
          </div>
          <div className={styles.detailSectionBody}>
            <p>{project.solution}</p>
            {project.impact ? <p>{project.impact}</p> : null}
          </div>
        </section>

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
          <section className={styles.detailAcknowledgements}>
            <div className={styles.detailSectionLead}>
              <p className={styles.sectionEyebrow}>Acknowledgements</p>
              <h2>{project.featuredPage?.acknowledgementsHeading ?? "Project support."}</h2>
            </div>
            <div className={styles.detailSectionBody}>{acknowledgementsContent}</div>
          </section>
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

      <section className={styles.detailSection}>
        <div className={styles.detailSectionLead}>
          <p className={styles.sectionEyebrow}>Why it exists</p>
          <h2>{project.subprojectPage?.problemHeading ?? "The problem"}</h2>
        </div>
        <div className={styles.detailSectionBody}>
          <p>{project.problem}</p>
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.detailSectionLead}>
          <p className={styles.sectionEyebrow}>What it is building</p>
          <h2>{project.subprojectPage?.solutionHeading ?? "What we are building"}</h2>
        </div>
        <div className={styles.detailSectionBody}>
          <p>{project.solution}</p>
        </div>
      </section>

      {project.impact ? (
        <section className={styles.detailSection}>
          <div className={styles.detailSectionLead}>
            <p className={styles.sectionEyebrow}>Why it matters</p>
            <h2>{project.subprojectPage?.impactHeading ?? "Why it matters"}</h2>
          </div>
          <div className={styles.detailSectionBody}>
            <p>{project.impact}</p>
          </div>
        </section>
      ) : null}

      {project.subprojectPage?.highlights?.length ? (
        <section className={styles.subprojectHighlights}>
          <div className={styles.detailSectionLead}>
            <p className={styles.sectionEyebrow}>Highlights</p>
            <h2>{project.subprojectPage.highlightsHeading ?? "Highlights."}</h2>
          </div>
          <div className={styles.subprojectHighlightList}>
            {project.subprojectPage.highlights.map((highlight) => (
              <article className={styles.subprojectHighlightItem} key={highlight.title}>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {projectLinks.length > 0 ? (
        <section className={styles.subprojectLinksSection}>
          <div className={styles.detailSectionLead}>
            <p className={styles.sectionEyebrow}>Links</p>
            <h2>{project.subprojectPage?.linksHeading ?? "Links."}</h2>
          </div>
          <div className={styles.subprojectLinksList}>
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
          </div>
        </section>
      ) : null}

      {subprojects.length > 0 ? (
        <section className={styles.subprojectLinksSection}>
          <div className={styles.detailSectionLead}>
            <p className={styles.sectionEyebrow}>Project structure</p>
            <h2>Subprojects.</h2>
          </div>
          <div className={styles.subprojectLinksList}>
            {subprojects.map((subproject) => (
              <Link className={styles.subprojectLinkRow} href={`/projects/${subproject.slug}`} key={subproject.slug}>
                <span>
                  <strong>{subproject.title}</strong>
                  <small className={styles.subprojectLinkSummary}>{subproject.summary}</small>
                </span>
                <span className={styles.subprojectLinkAction}>Open</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {project.acknowledgements ? (
        <section className={styles.detailAcknowledgements}>
          <div className={styles.detailSectionLead}>
            <p className={styles.sectionEyebrow}>Acknowledgements</p>
            <h2>Project support.</h2>
          </div>
          <div className={styles.detailSectionBody}>{acknowledgementsContent}</div>
        </section>
      ) : null}
    </main>
  );
}