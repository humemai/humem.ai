export type ProjectAcknowledgements =
  | string
  | {
      text: string;
      link?: {
        label: string;
        href: string;
      };
      trailingText?: string;
    };

export type ProjectSubprojectPage = {
  layout?: "default" | "standalone";
  problemHeading?: string;
  solutionHeading?: string;
  impactHeading?: string;
  highlightsHeading?: string;
  linksHeading?: string;
  sections?: {
    id: string;
    navLabel: string;
    eyebrow: string;
    title: string;
    body: string[];
    figure?: {
      label: string;
      title: string;
      caption: string;
      points?: string[];
      image?: {
        src: string;
        alt: string;
      };
    };
  }[];
  highlights?: {
    title: string;
    description: string;
  }[];
};

export type ProjectStandalonePage = ProjectSubprojectPage;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  showOnProjectsIndex?: boolean;
  subprojectSlugs?: string[];
  featuredPage?: {
    problemHeading: string;
    solutionHeading: string;
    acknowledgementsHeading?: string;
  };
  standalonePage?: ProjectStandalonePage;
  subprojectPage?: ProjectSubprojectPage;
  image?: {
    src: string;
    alt: string;
  };
  funding?: string;
  sponsor?: {
    name: string;
    href: string;
    logoSrc: string;
    logoAlt: string;
  };
  status: string;
  problem: string;
  solution: string;
  impact?: string;
  acknowledgements?: ProjectAcknowledgements;
  links: { label: string; href: string }[];
};