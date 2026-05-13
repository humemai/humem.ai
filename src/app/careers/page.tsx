import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "HumemAI is looking for strong people across AI, data systems, and product engineering.",
};

export default function CareersPage() {
  return (
    <ContentPage
      eyebrow="Careers"
      title="Help build memory systems that stay useful over time."
      intro="HumemAI is looking for people who care about building AI systems with memory, structure, and long-term usefulness. If that mission fits your interests, we would be glad to hear from you."
    >
      <section>
        <h2>Who we want to meet</h2>
        <p>
          We are interested in people who want to build agents with memory together. That can mean research, engineering, product work, design, infrastructure, or something harder to label but clearly relevant to the problem.
        </p>
        <p>
          If you are drawn to persistent memory, knowledge systems, retrieval, databases, or the user experience around intelligent systems, HumemAI would be glad to hear from you.
        </p>
      </section>

      <section>
        <h2>How to reach us</h2>
        <p>
          Send a note to <a href="mailto:info@humem.ai?subject=HumemAI%20careers">info@humem.ai</a> with your background, the kind of work you want to do, and any projects or writing that show how you think.
        </p>
      </section>
    </ContentPage>
  );
}