import { hybridIntelligenceUrl } from "../shared";
import type { Project } from "../types";

export const humanLikeMemorySystems: Project = {
  slug: "human-like-memory-systems",
  title: "Human-Like Memory Systems",
  timelineOrder: 1,
  subprojectPage: {
    layout: "standalone",
    linksHeading: "Paper, code, and project links.",
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        eyebrow: "Overview",
        title: "Why explicit episodic and semantic memory matter for AI agents.",
        body: [
          `**Authors:** [Taewoon Kim](https://taewoon.kim/), [Michael Cochez](https://www.cochez.nl/), [Vincent Francois-Lavet](http://vincent.francois-l.be/), [Mark Neerincx](https://ocw.tudelft.nl/teachers/m_a_neerincx/), and [Piek Vossen](https://vossen.info/).`,
          `Inspired by cognitive science theory, this paper explicitly models an agent with both semantic and episodic memory systems and asks whether that combination is better than relying on only one of the two. To make the question concrete, it introduces **RoomEnv-v0**, a challenging OpenAI Gym compatible environment where an agent must encode, store, retrieve, and use memories to answer object-location questions over time.`,
          `The benchmark also allows multiple agents to collaborate, so the paper studies hybrid intelligence in addition to single-agent memory. The main findings are that mixed episodic-plus-semantic memory outperforms simpler baselines, pretrained commonsense helps further, and two agents collaborating can outperform one agent acting alone with the same total memory budget.`,
          `In cognitive science, explicit human memory is commonly discussed as a combination of **semantic memory** and **episodic memory**. This project turns that distinction into an AI design problem: if an agent stores both kinds of memory explicitly, does it answer questions better under partial observability? The paper's three main contributions are to model mixed memory explicitly, introduce RoomEnv-v0 as the benchmark, and show that collaborative settings can improve results too.

**Keywords:** explicit memory, episodic memory, semantic memory, hybrid intelligence.

[Read the full paper on arXiv](https://arxiv.org/abs/2204.01611).`,
        ],
      },
      {
        id: "benchmark",
        navLabel: "Benchmark",
        eyebrow: "Benchmark",
        title: "RoomEnv-v0 tests memory under partial observability.",
        body: [
          `The OpenAI-Gym-compatible Room environment is one large room with $N_{people}$ people, $N_{objects}$ objects, $N_{locations}$ locations, and $N_{agents}$ agents. A human places an object at some location, but each agent can observe only one such placement event at a time. At the same step, the environment asks a question about an object's location, so the agent must answer from memory rather than from privileged access to the full room state.`,
          `Observations are represented as RDF-like quadruples and questions as structured relation queries:

$$
\\mathbf{x}^{(t)} = (\\mathbf{h}^{(t)}, \\mathbf{r}^{(t)}, \\mathbf{t}^{(t)}, t),
\\qquad
\\mathbf{q}^{(t)} = (\\mathbf{h}, \\mathbf{r}).
$$

For example, \`<James's laptop, AtLocation, James's desk, 42>\` records a specific observation, while \`<Karen's cat, AtLocation>\` asks where Karen's cat is. A correct answer yields a reward of $+1$ and an incorrect answer yields $0$.`,
          `The environment remains intentionally dynamic. At every step, several Bernoulli-controlled changes can happen:

- with probability $p_{commonsense}$, an object is placed in a commonsense location sourced from [ConceptNet](https://conceptnet.io/)
- with probability $p_{new\\_location}$, a human changes an object's location
- with probability $p_{new\\_object}$, a human changes which object they carry
- with probability $p_{switch\\_person}$, two people swap locations to mimic movement through the room

With one agent, the setup can be summarized as

$$
S_t = (\\mathbf{x}^{(t)}, \\mathbf{q}^{(t)}), \\qquad
A_t = (\\text{memory operation}, \\text{answer}), \\qquad
R_t \\in \\{0, 1\\}.
$$

Each agent maintains bounded **episodic** and **semantic** memory stores. Episodic memory keeps person-specific events with timestamps, while semantic memory compresses repeated experience into generalized world knowledge with strengths instead of timestamps. The paper compares four handcrafted policies under equal memory budgets: episodic only, semantic only, both episodic and semantic, and both with pretrained ConceptNet commonsense knowledge. It also evaluates a multi-agent setting where memories can be combined across agents.`,
          `To simplify the benchmark, the experiments use a restricted subset of ConceptNet. The setup fixes **10 objects**, **10 random human names**, a single relation \`AtLocation\`, and a maximum episode length of **1,000** steps. The main environment probabilities are:

- $p_{commonsense} = 0.7$
- $p_{new\\_location} = 0.1$
- $p_{new\\_object} = 0.1$
- $p_{switch\\_person} = 0.5$`,
        ],
      },
      {
        id: "results",
        navLabel: "Results",
        eyebrow: "Results",
        title: "Mixed memory and collaboration deliver the strongest results.",
        body: [
          `The first result is simple but important: structured forgetting and retrieval policies beat random baselines. If the agent both forgets memories and answers questions uniformly at random, performance collapses. Once the memory system becomes explicit and retrieval policies become coherent, even heuristic agents become much stronger baselines than random memory behavior.`,
          `| Handcrafted 1 | Handcrafted 2 |
| --- | --- |
| ![Handcrafted 1 episodic result](/illustrations/human-like-memory-systems-episodic-1.png) | ![Handcrafted 2 semantic result](/illustrations/human-like-memory-systems-semantic-1.png) |`,
          `| Handcrafted 3 | Handcrafted 4 |
| --- | --- |
| ![Handcrafted 3 episodic semantic result](/illustrations/human-like-memory-systems-episodic-semantic-1.png) | ![Handcrafted 4 episodic semantic pretrain result](/illustrations/human-like-memory-systems-episodic-semantic-pretrain-1.png) |

*Figure: handcrafted vs. random policies for the four explicit-memory baselines.*`,
          `When memory capacity is small, episodic-only memory can perform better because there is not enough space to learn stable general world knowledge. As capacity increases, semantic memory becomes increasingly useful because the agent can generalize across many observations instead of treating every event as isolated.`,
          `The most interesting case is the agent with pretrained semantic memory. Because the general world knowledge is already present, the agent can focus more of its finite capacity on episodic recall, which yields the strongest overall results in the paper's setup. The collaboration result is similarly important: two agents sharing memories can outperform a single agent with the same total budget because they cover different parts of the room and contribute complementary recall.`,
          `![Best strategies across memory capacities](/illustrations/human-like-memory-systems-best-strategies.png)

*Total rewards with respect to different handcrafted policies and memory capacities.*`,
          `![Single-agent versus two-agent performance](/illustrations/human-like-memory-systems-single-and-double-agents.png)

*Total rewards with respect to the number of agents. Collaboration improves recall and answer quality even under a fixed total memory budget.*`,
        ],
      },
      {
        id: "takeaways",
        navLabel: "Takeaways",
        eyebrow: "Takeaways",
        title: "This paper lays the foundation for the broader research line.",
        body: [
          `Theoretically, the paper is closest to cognitive-science work on human memory, including traditions such as ACT-R and Soar. Those systems provide strong conceptual motivation, but they do not provide the same kind of computational benchmark surface used here. Human-Like Memory Systems tries to turn the theory into something experimentally comparable.`,
          `On the machine-learning side, some work studies memory and question answering computationally, but often focuses on episodic memory alone or stores memory in opaque numeric embeddings rather than structured symbolic records. The paper's contribution is to keep the memory systems explicit, interpretable, and directly comparable while still evaluating them in a nontrivial partially observable task.`,
          `The main takeaway is that explicit episodic and semantic memory systems are useful architectural primitives for AI agents operating under partial observability. Mixed memory outperforms single-memory baselines, commonsense pretraining helps, and collaboration between agents can further improve question answering. That makes this paper the benchmark-and-agents starting point for the later explicit-memory and RoomKG work.`,
        ],
      },
      {
        id: "citation",
        navLabel: "Cite",
        eyebrow: "Cite",
        title: "Cite our paper.",
        body: [
          `~~~bibtex
@misc{kim2026machinehumanlikememorysystems,
      title={A Machine With Human-Like Memory Systems}, 
      author={Taewoon Kim and Michael Cochez and Vincent Francois-Lavet and Mark Neerincx and Piek Vossen},
      year={2026},
      eprint={2204.01611},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2204.01611}, 
}
~~~`,
        ],
      },
    ],
  },
  summary:
    "A paper and codebase introducing RoomEnv-v0 and heuristic agents with explicit episodic and semantic memory.",
  image: {
    src: "/illustrations/project-human-like-memory-systems.png",
    alt: "Illustration for Human-Like Memory Systems",
  },
  problem:
    "Most agent systems collapse memory into opaque hidden state or short-lived context, which makes it hard to study the difference between general world knowledge and personally observed events. Without a benchmark that forces remembering under partial observability, it is difficult to test whether explicit semantic and episodic memory are architecturally useful.",
  solution:
    "Human-Like Memory Systems introduces RoomEnv-v0 and compares handcrafted agents with bounded episodic and semantic memory stores. By making storage, forgetting, retrieval, and collaboration explicit, the paper turns memory from an implicit model side effect into something that can be inspected and compared directly.",
  impact:
    "This work established the benchmark, the first explicit-memory agents, and the initial empirical claim behind the broader research line: mixed episodic-plus-semantic memory helps, commonsense pretraining helps further, and collaboration can improve question answering under partial observability.",
  acknowledgements: {
    text: "This research was partially funded by the Hybrid Intelligence Center, a 10-year program funded by the Dutch Ministry of Education, Culture and Science through the Netherlands Organisation for Scientific Research (NWO). Learn more at",
    link: {
      label: "Hybrid Intelligence",
      href: hybridIntelligenceUrl,
    },
    trailingText: ".",
  },
  links: [
    {
      label: "Read paper",
      href: "https://arxiv.org/abs/2204.01611",
    },
    {
      label: "View GitHub",
      href: "https://github.com/humemai/human-like-memory-systems",
    },
    {
      label: "Parent project",
      href: "/projects/machines-with-human-like-memory",
    },
  ],
};