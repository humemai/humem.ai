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
    }
  // Renders measurements from src/data/*.json rather than from this file.
  // Benchmark numbers move every time the suite is re-run, so hard-coding them
  // into a project page guarantees the page and the data drift apart. The
  // block names a table; the numbers, the image digests and the fairness
  // conditions all travel with the data.
  | {
      type: "benchmarkTable";
      /** Table `id` in the dataset (for ArcadeDB: l3s, l3d, l2, l1, l1tpc, e2). */
      tableId: string;
      /** Optional: restrict to one scale tier, e.g. "medium". */
      scale?: string;
      /** Optional lead-in shown above the table. */
      caption?: string;
      /**
       * Show each backend's pinned sha256 image digest. On by default for
       * cross-engine tables: "which version did you benchmark" is the first
       * question a published comparison gets, and a digest answers it exactly.
       */
      showDigests?: boolean;
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