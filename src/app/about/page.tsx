import type { Metadata } from "next";
import Image from "next/image";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "About",
  description: "Background on HumemAI and the origin of its memory-oriented approach.",
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="About"
      title="From memory research to practical AI."
      intro="HumemAI started from research into human-like memory systems for AI, then shifted toward building tools and products that make persistent, inspectable memory usable in real workflows."
      aside={
        <figure className="heroFigure">
          <div className="heroFigureImageWrap">
            <Image
              src="/illustrations/about-memory-architecture.png"
              alt="Illustration of connected memory structures and stored knowledge"
              fill
              className="heroFigureImage"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <figcaption className="heroFigureCaption">
            HumemAI focuses on memory structures that stay inspectable, persistent, and useful over time.
          </figcaption>
        </figure>
      }
    >
      <section>
        <h2>Origin</h2>
        <div className="inlineFounderImageWrap">
          <Image
            src="/illustrations/taewoon-kim-founder.png"
            alt="Portrait of Taewoon Kim, founder of HumemAI"
            fill
            className="inlineFounderImage"
            sizes="(max-width: 560px) 112px, 128px"
          />
        </div>
        <p>
          The central idea is simple: conversations and data should not be treated as the same thing, and agentic systems need better memory structures than a single flat context window.
        </p>
        <p>
          HumemAI was founded by <a href="https://taewoon.kim/" target="_blank" rel="noopener noreferrer">Taewoon Kim</a>, an AI researcher and engineer working on agentic memory: systems that help agents remember, organize, and reuse knowledge over time in ways that stay structured, inspectable, and practically useful.
        </p>
      </section>

      <section>
        <h2>Direction</h2>
        <p>
          Today, HumemAI sits between open-source infrastructure, applied research, and a hosted product direction. The goal is not to publish memory ideas in isolation, but to turn them into software that teams can actually use to build reliable agents.
        </p>
      </section>
    </ContentPage>
  );
}