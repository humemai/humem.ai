export const navigationItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const githubOrgUrl = "https://github.com/humemai";

// The PyPI user that owns every HumemAI package. The PyPI organization
// (pypi.org/org/HumemAI) holds no projects, so linking it showed an empty page.
export const pypiUrl = "https://pypi.org/user/humemai/";

export const googleAnalyticsId = "G-973VT90SE2";

export const HOME_PAGE_RAIL_ITEM_COUNT = 6;

export const footerColumns = [
  {
    title: "Open source",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "GitHub", href: githubOrgUrl, external: true },
      { label: "PyPI", href: pypiUrl, external: true },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News", href: "/news" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];
