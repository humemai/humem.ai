import type { Project } from "../types";

export const explicitMemory: Project = {
  slug: "explicit-memory",
  title: "Explicit Memory",
  timelineOrder: 2,
  subprojectPage: {
    layout: "editorial",
    linksHeading: "Paper and GitHub links.",
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        eyebrow: "Overview",
        title: "Learn how memory should be stored instead of hand-coding the policy.",
        body: [
          `**Authors:** [Taewoon Kim](https://taewoon.kim/), [Michael Cochez](https://www.cochez.nl/), [Vincent Francois-Lavet](http://vincent.francois-l.be/), [Mark Neerincx](https://ocw.tudelft.nl/teachers/m_a_neerincx/), and [Piek Vossen](https://vossen.info/).`,
          "Explicit Memory extends the earlier heuristic work by training an agent to decide what to retain, move, and forget across short-term, episodic, and semantic memory systems. We keep memory explicit and interpretable, but turn memory management itself into a reinforcement-learning problem.",
          "The implementation is built around RoomEnv-v1, where an agent observes object-location events under partial observability and must answer questions correctly to maximize reward. The public [RoomEnv repository](https://github.com/humemai/room-env) is part of the contribution here as well, because this project extends that benchmark from handcrafted agents to learned memory-management policies. Instead of hiding memory inside a recurrent state, we model three explicit memory systems and learn when information should stay short-term, move into long-term memory, or be dropped.",
          "Our three main contributions are to model short-term, episodic, and semantic memory as explicit knowledge-graph structures, release the RoomEnv-v1 reinforcement-learning benchmark, and show that a deep Q-learning agent can learn a useful memory-management policy. [Read the full paper on arXiv](https://arxiv.org/abs/2212.02098).",
          `<img
src="/images/papers/explicit-memory/explicit-memory-memory-systems.png"
alt="Explicit memory systems"
class="editorial-image-compact"
/>

*The agent uses short-term memory together with episodic and semantic long-term memory rather than a single opaque memory state.*`,
        ],
      },
      {
        id: "training",
        navLabel: "Training",
        eyebrow: "Deep Q-learning",
        title: "Learn a memory-routing policy over explicit knowledge-graph memories.",
        body: [
          "Every observation is first stored in short-term memory. When that short-term buffer is full, the agent must choose one of three actions: forget the oldest memory, move it to episodic memory, or move it to semantic memory. Memory retrieval remains structured: the agent answers from the most recent relevant episodic memory or the strongest relevant semantic memory.",
          `The learning problem is written directly over the three explicit memory systems rather than over one opaque latent state. The state is $s_t = (\\mathbf{M}_o, \\mathbf{M}_e, \\mathbf{M}_s)$, where $\\mathbf{M}_o$ is short-term memory, $\\mathbf{M}_e$ episodic memory, and $\\mathbf{M}_s$ semantic memory. The action $a_t$ then chooses whether the current item should be $\\texttt{forget}$, $\\texttt{episodic}$, or $\\texttt{semantic}$. That is the key modeling move in the paper: the agent learns what to do with explicit memory systems rather than learning one undifferentiated hidden state.`,
          "To make those memory systems learnable, the repository converts knowledge-graph memories into embeddings and feeds them into an LSTM-based Q-network. The learned policy predicts which storage action is most valuable in the current memory state, while still keeping the memory contents inspectable enough to analyze after training.",
          "We train two variants: one starts semantic memory from scratch, and another starts with ConceptNet-based world knowledge already loaded into semantic memory. Both are compared with simple baselines that always move short-term memories to episodic memory, always move them to semantic memory, or choose uniformly at random.",
          `Training then follows the usual deep Q-learning target,

$$
Q_{\\text{target}} = r + \\gamma \\max_{a'} Q(s', a'; \\theta^{\\text{target}}),
$$

so the memory-routing policy is rewarded only when better storage decisions lead to better future answers.`,
          `<img
src="/images/papers/explicit-memory/explicit-memory-kge-conversion.png"
alt="Memory to embedding pipeline"
class="editorial-image-compact"
/>

*Knowledge-graph-based memories are converted into embeddings so a Q-network can learn storage decisions over explicit memory state.*`,
        ],
      },
      {
        id: "results",
        navLabel: "Results",
        eyebrow: "Results",
        title: "Learned explicit memory beats fixed storage baselines.",
        body: [
          "At a memory capacity of 32, the learned agents outperform the episodic-only, semantic-only, and random baselines. The pretrained-semantic variant not only learns faster, but also reaches a better average test reward than the scratch variant, showing that explicit symbolic world knowledge can function like a useful prior for later learning.",
          `The capacity notation from the paper helps make the comparison precise. In the reported setup, short-term memory is fixed while long-term memory varies, for example

$$
|\\mathbf{M}_o| = 1,
\\qquad
|\\mathbf{M}_e| = 32,
\\qquad
|\\mathbf{M}_s| = 32.
$$

The total long-term budget is therefore $|\\mathbf{M}_e| + |\\mathbf{M}_s|$, which is the quantity varied in the main experiments.`,
          "When memory capacity changes, the tradeoffs become clearer. Semantic-only memory works surprisingly well at very small capacities because it prioritizes general knowledge, while episodic-only memory keeps improving as capacity grows and eventually has enough room to remember far more individual events. The learned agents sit on top of that design space by deciding what deserves long-term storage instead of following a fixed rule.",
          `![Performance across capacities](/images/papers/explicit-memory/explicit-memory-capacity-results.png)

*Average total test rewards show how learned explicit-memory agents compare with simpler fixed storage strategies as memory capacity changes.*`,
          `![Learned Q-values during test time](/images/papers/explicit-memory/explicit-memory-q-values-pretrained.png)

*Learned Q-values during test time show that the pretrained agent preserves useful general knowledge and routes more individual-specific memories into episodic storage.*`,
        ],
      },
      {
        id: "takeaways",
        navLabel: "Takeaways",
        eyebrow: "Takeaways",
        title: "Memory management becomes part of the learned policy.",
        body: [
          "The core contribution of Explicit Memory is not just that reinforcement learning works in RoomEnv-v1, but that it works while memory remains explicit enough to inspect. We keep short-term, episodic, and semantic memory as separate architectural objects rather than collapsing everything into a hidden neural state.",
          "This work bridges the earlier handcrafted memory agents and the later graph-memory systems work. It shows that explicit memory can remain structured, analyzable, and still be integrated into trainable agents.",
        ],
      },
      {
        id: "citation",
        navLabel: "Cite",
        eyebrow: "Cite",
        title: "Cite our paper.",
        body: [
          `~~~bibtex
@article{Kim_Cochez_Francois-Lavet_Neerincx_Vossen_2023,
  title={A Machine with Short-Term, Episodic, and Semantic Memory Systems},
  volume={37},
  url={https://ojs.aaai.org/index.php/AAAI/article/view/25075},
  DOI={10.1609/aaai.v37i1.25075},
  number={1},
  journal={Proceedings of the AAAI Conference on Artificial Intelligence},
  author={Kim, Taewoon and Cochez, Michael and Francois-Lavet, Vincent and Neerincx, Mark and Vossen, Piek},
  year={2023},
  month={Jun.},
  pages={48-56}
}
~~~`,
        ],
      },
    ],
  },
  summary:
    "A reinforcement-learning agent with explicit short-term, episodic, and semantic memory in RoomEnv-v1.",
  image: {
    src: "/images/projects/project-explicit-memory.png",
    alt: "Illustration for Explicit Memory",
  },
  problem:
    "Heuristic policies show that structured memory can help, but they do not answer whether an agent can learn when to retain, move, or forget information across short-term, episodic, and semantic memory systems.",
  solution:
    "This repository trains RoomEnv-v1 agents with deep reinforcement learning so the agent learns memory-management behavior directly. The implementation focuses on explicit memory systems with knowledge-graph structure rather than treating memory as an undifferentiated hidden state.",
  impact:
    "The project extends the earlier human-like memory work from handcrafted rules to learned policies, showing how explicit memory architectures can be integrated into trainable agents while remaining interpretable enough for analysis.",
  links: [
    {
      label: "Read paper",
      href: "https://arxiv.org/abs/2212.02098",
    },
    {
      label: "View GitHub (Agent)",
      href: "https://github.com/humemai/explicit-memory",
    },
    {
      label: "View GitHub (RoomEnv)",
      href: "https://github.com/humemai/room-env",
    },
    {
      label: "Parent project",
      href: "/projects/machines-with-human-like-memory",
    },
  ],
};