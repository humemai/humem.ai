import type { Project } from "../types";

export const roomkgBaselines: Project = {
  slug: "roomkg-baselines",
  title: "RoomKG Baselines",
  timelineOrder: 3,
  subprojectPage: {
    layout: "editorial",
    linksHeading: "Paper and code.",
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        eyebrow: "Overview",
        title: "Turn partial observability into a benchmark for graph-structured long-term memory.",
        body: [
          `**Authors:** [Taewoon Kim](https://taewoon.kim/), Vincent Francois-Lavet, and [Michael Cochez](https://www.cochez.nl/).`,
          "RoomKG Baselines turns long-term memory into the main object of study rather than a side effect of policy learning. The hidden world state is an RDF knowledge graph, observations are RDF triples over locally visible structure, and agents must answer object-location questions while navigating a changing environment under partial observability.",
          "That shift makes the benchmark itself graph-native. Instead of asking whether one memory architecture happens to work inside one environment, the project aligns hidden state, observations, long-term memory, and evaluation around knowledge-graph structure so symbolic and neural approaches can be compared on the same controlled task.",
          "The paper contributes a configurable RoomKG benchmark, a set of symbolic and neural baselines, and public benchmark artifacts for reproducible comparison. [Read the full paper on arXiv](https://arxiv.org/abs/2408.05861).",
          {
            type: "figureGrid",
            columns: 2,
            caption: "Bird's-eye schematic of the hidden state at $t=99$ alongside the same hidden state expressed as an RDF knowledge graph.",
            items: [
              {
                label: "Bird's-eye view",
                image: {
                  src: "/images/papers/roomkg-baselines/bird_eye_view_step_099.png",
                  alt: "Bird's-eye view of the hidden state",
                },
              },
              {
                label: "Knowledge-graph view",
                image: {
                  src: "/images/papers/roomkg-baselines/graph_view_step_099.png",
                  alt: "Knowledge-graph view of the hidden state",
                },
              },
            ],
          },
        ],
      },
      {
        id: "agents",
        navLabel: "Agents",
        eyebrow: "Agents",
        title: "Compare explicit symbolic memory against sequence-based neural baselines.",
        body: [
          "The paper evaluates four agents. Two symbolic agents store explicit graph structure: a plain KG agent keeps unannotated RDF triples, while a TKG agent stores RDF 1.2 annotated triples with temporal metadata such as when a fact was added, when it was last accessed, and how often it was recalled. Two neural baselines instead keep tokenized observation histories and learn question answering end to end with either an LSTM or a Transformer.",
          "Those agent families face the same task but behave very differently. Symbolic agents answer questions through graph querying and graph-based exploration, while neural agents must jointly learn exploration and question answering through a single policy over longer and longer observation histories as memory capacity grows.",
          "The important design choice is that all four agents share one benchmark and one evaluation surface. That makes RoomKG Baselines more than an implementation repo for one model: it is the comparative layer that exposes what different memory representations gain or lose under the same partially observable environment.",
        ],
      },
      {
        id: "results",
        navLabel: "Results",
        eyebrow: "Results",
        title: "Temporal knowledge-graph memory outperforms the neural baselines on the same benchmark.",
        body: [
          "The main quantitative result is that symbolic agents begin to outperform neural agents once long-term memory becomes large enough to matter. At a capacity of 512, the best TKG variant reaches 45.64 test QA accuracy, while the best neural baseline reaches 11.2, a roughly four-fold difference under the same benchmark conditions.",
          "The qualitative picture is consistent with that result. Symbolic agents keep exploring until they cover all 49 rooms and accumulate nearly complete internal maps, while the neural agents plateau much earlier and stop discovering new rooms. Temporal annotations give the TKG agent an additional advantage over the plain KG agent because recency and recall statistics make exploration, answering, and eviction more informative under a fixed memory budget.",
          `<img
src="/images/papers/roomkg-baselines/agent_train_test_qa_accuracy.png"
alt="Train-test QA accuracy across long-term memory capacities"
class="editorial-image-compact"
/>

*Train and test QA accuracy across long-term memory capacities show symbolic agents overtaking neural baselines once memory becomes large enough to support persistent reasoning.*`,
          `<img
src="/images/papers/roomkg-baselines/coverage_metrics_tkg.png"
alt="Coverage metrics for the TKG agent"
class="editorial-image-compact"
/>

*Coverage metrics for the TKG agent show that temporal symbolic memory supports sustained exploration and nearly complete triple coverage over an episode.*`,
        ],
      },
      {
        id: "takeaways",
        navLabel: "Takeaways",
        eyebrow: "Takeaways",
        title: "This project makes long-term memory explicit, inspectable, and benchmarkable.",
        body: [
          "RoomKG Baselines marks the point in the broader research line where long-term memory becomes a benchmark object in its own right. The hidden state is graph-structured, the observations are graph-structured, the symbolic memories are graph-structured, and the evaluation is designed to reveal whether an agent actually remembers over time rather than merely appearing to do so.",
          "That gives the project a different role from the earlier memory papers. It is not only a new memory architecture or a stronger agent; it is the benchmark and baseline surface needed to compare future symbolic, temporal, and neurosymbolic memory systems under shared conditions.",
        ],
      },
      {
        id: "citation",
        navLabel: "Cite",
        eyebrow: "Cite",
        title: "Cite our paper.",
        body: [
          `~~~bibtex
@misc{kim2026temporalknowledgegraphmemorypartially,
      title={Temporal Knowledge-Graph Memory in a Partially Observable Environment}, 
      author={Taewoon Kim and Vincent François-Lavet and Michael Cochez},
      year={2026},
      eprint={2408.05861},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2408.05861}, 
}
~~~`,
        ],
      },
    ],
  },
  summary:
    "A neurosymbolic benchmark for temporal knowledge-graph memory under partial observability.",
  problem:
    "Earlier room-memory work showed why explicit memory matters, but it still left a gap: there was no benchmark where hidden state, observations, and long-term memory were all expressed in graph terms and evaluated systematically under partial observability.",
  solution:
    "RoomKG Baselines defines a configurable benchmark in which the hidden world state is an RDF knowledge graph, observations are RDF triples, and long-term memory can be implemented either as symbolic knowledge graphs or as neural observation histories. The repository packages the benchmark, baseline agents, figures, and public artifacts for direct comparison.",
  impact:
    "The project gives later graph-memory research a common evaluation surface, showing that temporal symbolic memory can be both more interpretable and substantially more effective than neural sequence baselines on this controlled long-horizon task.",
  image: {
    src: "/images/projects/project-roomkg-baselines.png",
    alt: "Illustration for RoomKG Baselines",
  },
  links: [
    {
      label: "Read paper",
      href: "https://arxiv.org/abs/2408.05861",
    },
    {
      label: "View GitHub",
      href: "https://github.com/humemai/roomkg-baselines",
    },
    {
      label: "Parent project",
      href: "/projects/machines-with-human-like-memory",
    },
  ],
};