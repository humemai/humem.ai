import type { Project } from "../types";
import { sidnProjectUrl } from "../shared";

export const auditReadyMemory: Project = {
  slug: "audit-ready-memory",
  title: "Audit-Ready Memory",
  showOnProjectsIndex: true,
  editorialPage: {
    layout: "editorial",
    linksHeading: "Links and code.",
    sections: [
      {
        id: "auditability",
        navLabel: "Auditability",
        eyebrow: "Auditability",
        title: "AI memory needs explicit audit trails instead of opaque retention.",
        body: [
          "Many AI systems still handle memory in opaque model state or hosted tooling that was not designed for public-interest accountability. That makes it difficult to inspect what the system retained, understand why it behaved a certain way, or explain how a past decision was produced.",
          "Audit-Ready Memory starts from the idea that memory should be treated as infrastructure rather than a vague capability claim. If teams need governance, inspection, and operational trust, the memory layer itself has to expose those properties directly.",
        ],
        figure: {
          label: "Figure 1",
          title: "Audit-first memory model",
          caption:
            "The project treats retained memory as inspectable infrastructure with explicit traces, not hidden application residue.",
          points: [
            "Inspectable retained memory records",
            "Traceable system behavior over time",
            "Explicit operational governance surface",
            "Local-first visibility instead of opaque hosted state",
          ],
        },
      },
      {
        id: "replay",
        navLabel: "Replay",
        eyebrow: "Replay",
        title: "Deterministic replay should make past behavior reconstructable.",
        body: [
          "One of the practical problems in accountable AI systems is that teams often cannot reconstruct why the system behaved a certain way after the fact. Logs may be partial, state may be implicit, and the memory path may be impossible to replay cleanly.",
          "This project treats deterministic replay as a first-class requirement. In the implementation, replay is a pure fold over an append-only log, so the same history always produces the same state and any earlier point can be reconstructed exactly. Every read is recorded as its own event alongside the writes, which means the log can answer what a model was shown rather than only what was stored.",
        ],
        figure: {
          label: "Figure 2",
          title: "Replay path",
          caption:
            "The same retained memory history should support investigation, reconstruction, and verification of past system behavior.",
          points: [
            "Recorded memory events",
            "Deterministic reconstruction path",
            "Inspection of system decisions",
            "Verification beyond best-effort logging",
          ],
        },
      },
      {
        id: "deletion",
        navLabel: "Deletion",
        eyebrow: "Deletion",
        title: "Deletion must be explicit, meaningful, and operationally real.",
        body: [
          "Public-interest deployments cannot treat deletion as a weak promise while memory is spread across hidden stores, opaque agent state, or hard-to-audit infrastructure. If a system claims to remember, it also has to support explicit deletion and verifiable removal workflows.",
          "Audit-Ready Memory therefore pairs traceability with deletion. Deleting appends a tombstone that names its targets and requires a reason, and deleted content is excluded from every read path, so it cannot re-enter a model's context. The removal is itself part of the record, which is what makes it possible to show that something was taken out and why. The documentation states plainly where this stops: content is hidden from reads but retained in the log, so hard erasure needs a deployment-level strategy.",
        ],
        figure: {
          label: "Figure 3",
          title: "Retention and removal controls",
          caption:
            "Accountable memory systems need explicit lifecycle controls, not just richer storage surfaces.",
          points: [
            "Retention that can be inspected",
            "Deletion workflows that can be triggered",
            "Reviewable lifecycle controls",
            "Operational governance over memory state",
          ],
        },
      },
      {
        id: "public-interest",
        navLabel: "Public interest",
        eyebrow: "Public interest",
        title: "Build accountable memory infrastructure for civic and public-interest use.",
        body: [
          "The project is aimed at civic-tech teams, NGOs, researchers, and public-interest pilots that need more sovereign and explainable AI behavior. By keeping the memory layer local-first and openly documented, the work becomes reusable infrastructure rather than a closed operational dependency.",
          "That is the broader reason this stands alone as a focused project. Auditability, replay, and deletion are not side features around agent memory. They are the point of the system design.",
        ],
        figure: {
          label: "Figure 4",
          title: "Deployment orientation",
          caption:
            "The project is oriented toward accountable deployments where governance matters as much as capability.",
          points: [
            "Civic-tech and NGO deployments",
            "Research and public-interest pilots",
            "Local-first inspectable infrastructure",
            "Reusable building block for trustworthy AI memory",
          ],
        },
      },
    ],
  },
  featuredPage: {
    problemHeading: "AI memory needs audit trails, replay, and deletion.",
    solutionHeading: "Building local-first memory infrastructure for accountable AI.",
    acknowledgementsHeading: "Public-interest support from SIDN Fund.",
  },
  summary:
    "A public-interest project building local-first, inspectable memory infrastructure for AI systems that need audit trails, deterministic replay, and explicit deletion.",
  image: {
    src: "/images/projects/project-audit-ready-memory.png",
    alt: "Illustration for Audit-Ready Memory",
  },
  funding: "Funded by SIDN Fund",
  sponsor: {
    name: "SIDN Fund",
    href: sidnProjectUrl,
    logoSrc: "/partners/sidn-fund-wordmark.png",
    logoAlt: "SIDN Fund wordmark",
  },
  problem:
    "Many AI systems still handle memory in opaque model state or hosted tooling that was not designed for public-interest accountability. That makes it difficult to inspect what the system retained, understand why it behaved a certain way, replay past decisions, or carry out meaningful deletion when the deployment context requires governance rather than vague trust.",
  solution:
    "Audit-Ready Memory treats memory as infrastructure. It stores memory as an append-only log of time-stamped events in an embedded local database, rebuilds any past state by replaying that log, records reads as well as writes so you can see what a model was actually shown, and handles deletion as an explicit tombstone carrying a reason. An open-source Python library and a working demo are available now, with benchmarks and a versioned release in progress.",
  impact:
    "The project is aimed at civic-tech teams, NGOs, researchers, and public-interest pilots that need more sovereign and explainable AI behavior. By keeping the memory layer local-first and openly documented, it creates a reusable building block for trustworthy AI infrastructure and makes auditability something teams can implement directly rather than outsource.",
  acknowledgements: {
    text: "Audit-Ready Memory is funded by",
    link: {
      label: "SIDN Fund",
      href: sidnProjectUrl,
    },
    trailingText:
      "as a public-interest effort to make AI memory infrastructure more inspectable, accountable, and practical to govern.",
  },
  links: [
    {
      label: "SIDN Fund project",
      href: sidnProjectUrl,
    },
    {
      label: "View GitHub",
      href: "https://github.com/humemai/audit-ready-memory",
    },
    {
      label: "Documentation",
      href: "https://docs.humem.ai/audit-ready-memory/latest/",
    },
    { label: "Contact", href: "/contact" },
    { label: "HumemAI GitHub", href: "https://github.com/humemai" },
  ],
};