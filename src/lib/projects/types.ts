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

export type ProjectEditorialFigureGridItem = {
  label?: string;
  title?: string;
  image: {
    src: string;
    alt: string;
  };
};

export type ProjectEditorialBodyBlock =
  | string
  | {
      type: "figureGrid";
      columns?: 1 | 2 | 3 | 4;
      caption: string;
      items: ProjectEditorialFigureGridItem[];
    };

export type ProjectSubprojectPage = {
  layout?: "default" | "editorial";
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
    body: ProjectEditorialBodyBlock[];
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

export type ProjectEditorialPage = ProjectSubprojectPage;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  timelineOrder?: number;
  showOnProjectsIndex?: boolean;
  subprojectSlugs?: string[];
  featuredPage?: {
    problemHeading: string;
    solutionHeading: string;
    acknowledgementsHeading?: string;
  };
  editorialPage?: ProjectEditorialPage;
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
  problem: string;
  solution: string;
  impact?: string;
  acknowledgements?: ProjectAcknowledgements;
  links: { label: string; href: string }[];
};