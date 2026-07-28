import type { Project } from "../types";

export const roomkgMetaPolicies: Project = {
	slug: "roomkg-meta-policies",
	title: "RoomKG Meta-Policies",
	timelineOrder: 6,
	subprojectPage: {
		layout: "editorial",
		linksHeading: "Paper, code, and project links.",
		sections: [
			{
				id: "overview",
				navLabel: "Overview",
				eyebrow: "Overview",
				title:
					"Learn which symbolic memory heuristic to apply, while execution stays symbolic.",
				body: [
					`**Authors:** [Taewoon Kim](https://taewoon.kim/), [Vincent Francois-Lavet](http://vincent.francois-l.be/), and [Michael Cochez](https://www.cochez.nl/). Accepted at [ISWC 2026](https://iswc2026.semanticweb.org/).`,
					"RoomKG Meta-Policies closes a gap the earlier projects left open. RoomKG Baselines showed that fixed symbolic heuristics over temporal knowledge-graph memory beat end-to-end neural agents, and KG Memory Transfer learned which facts to promote into long-term memory. But the heuristics themselves stayed fixed: one predetermined rule for answering, one for exploring, one for forgetting, applied identically at every step.",
					"That is a real design tension. Fixed symbolic heuristics are explicit but inflexible across contexts, while fully neural policies are adaptive but opaque. This paper asks whether we can have both: a learned meta-policy selects among named symbolic heuristics at each decision point, and deterministic symbolic procedures execute the selected ones. Adaptation comes from heuristic selection, never from replacing symbolic control with latent actions.",
					{
						type: "figureGrid",
						columns: 2,
						caption:
							"The setting is the RoomKG benchmark: a partially observable room world whose hidden state and observations are RDF graphs, with memory bounded and temporally annotated.",
						items: [
							{
								label: "Bird's-eye state",
								image: {
									src: "/images/papers/roomkg-meta-policies/bird_eye_view_step_099.png",
									alt: "Bird's-eye view of the hidden room state at step 99.",
								},
							},
							{
								label: "Knowledge-graph state",
								image: {
									src: "/images/papers/roomkg-meta-policies/graph_view_step_099.png",
									alt: "Knowledge-graph rendering of the hidden state at step 99.",
								},
							},
						],
					},
				],
			},
			{
				id: "method",
				navLabel: "Method",
				eyebrow: "Method",
				title: "A qualifier-aware graph encoder with one value head per memory decision.",
				body: [
					"Every fact in long-term memory is an RDF triple carrying the annotations `time_added`, `last_accessed`, and `num_recalled`. Those annotations are what the named heuristics rank over: question answering can prefer the most recently added (MRA), most recently used (MRU), or most frequently used (MFU) matching fact; forgetting can evict FIFO, LRU, or LFU; exploration prioritizes frontiers by the same annotation properties. The meta-policy's job is to pick one heuristic per function at each step.",
					"A small worked example shows why the choice matters. Suppose memory holds `(book, at_location, room_3)` with annotations $(4, 11, 5)$ and `(book, at_location, room_7)` with $(10, 10, 1)$. For the query \"where is the book?\", MRA answers `room_7` because that fact was added most recently, while MRU and MFU answer `room_3`. If the book recently moved, only MRA is correct. No single fixed rule wins everywhere, which is exactly why selection should be learned.",
					`The memory graph is encoded with one of three interchangeable graph neural networks, chosen to isolate what each level of structure contributes: a GCN sees only topology, an R-GCN adds relation types, and a StarE-GNN additionally incorporates qualifier embeddings in its messages:

$$
\\mathbf{g}^{(k)}_v = \\sigma\\!\\left(\\sum_{(u,r)\\in\\mathcal{N}(v)}
W^{(k)}_{\\lambda(r)}\\,\\phi_r\\!\\big(\\mathbf{g}^{(k-1)}_u,\\,\\psi(\\mathbf{g}_r,\\mathbf{q}_{u,r,v})\\big)\\right),
$$

where $\\mathbf{q}_{u,r,v}$ embeds the temporal annotations of the fact connecting $u$ and $v$. Only the StarE-GNN can condition its representation on the very annotation values the heuristics rank over, which is what makes it qualifier-aware.`,
					`Head-specific attention pooling turns the variable-size set of fact embeddings into one fixed-size summary per decision:

$$
\\mathbf{m}^{(p)}_t = \\sum_j \\alpha^{(p)}_{t,j} W_V \\mathbf{z}_{t,j},
\\qquad p \\in \\{qa, e, f\\},
$$

so the question-answering, exploration, and forgetting heads each attend to different parts of the same memory. Each head then scores its named heuristic candidates with Q-values, the selected triple of heuristics is executed by deterministic symbolic procedures, and the heads are trained with standard temporal-difference updates. At test time selection is greedy.`,
				],
			},
			{
				id: "results",
				navLabel: "Results",
				eyebrow: "Results",
				title: "The qualifier-aware configuration achieves the best held-out performance.",
				body: [
					"At long-term memory capacity 512, the **StarE-GNN meta-policy reaches 47.28 test QA accuracy**, the best among all compared systems. The relation-aware R-GCN follows at **47.00** and the topology-only GCN at **46.04**. The ordering matches the design hypothesis: the more of the annotation structure the encoder can see, the better it selects among heuristics that rank over exactly that structure.",
					"The margins over the references are informative in both directions. The strongest fixed symbolic controls reach **45.64 to 46.28** on test, so learned selection adds roughly one to two points over the best fixed rule, and every neuro-symbolic configuration beats every fixed one. The end-to-end neural baselines collapse to **11.40** (Transformer) and **9.40** (LSTM) on the same splits, confirming that in this bounded-memory regime the symbolic memory substrate does the heavy lifting and the meta-policy refines it.",
					"Two ablations locate where the capacity should sit. Sharing one network across the three heads performs comparably (47.16 test), while replacing the three independent heads with a single learned 27-way combinatorial head drops train accuracy to 42.28, suggesting that factored per-function selection is the right structure for this decision problem.",
				],
			},
			{
				id: "traces",
				navLabel: "Traces",
				eyebrow: "Traces",
				title: "Every memory decision remains attributable to a named heuristic.",
				body: [
					"Because the meta-policy selects among named heuristics rather than emitting opaque actions, each step of an episode can be read back as a decision trace: which heuristic each head preferred, by how much, and what the symbolic executor did with it.",
					`<img
src="/images/papers/roomkg-meta-policies/q_values_qa.png"
alt="Per-step Q-value trajectories for the question-answering head"
class="editorial-image-compact"
/>

*Per-step Q-values of the QA head over a held-out episode. The controller shifts from preferring MRU early, when recently accessed facts are still relevant, toward MRA later, when the newest observations carry the decisive evidence. The switching is visible because the choices are named.*`,
					`<img
src="/images/papers/roomkg-meta-policies/memory_state_099.png"
alt="Long-term memory state at the end of the held-out test trace"
class="editorial-image-compact"
/>

*The long-term memory graph at the end of the same trace. Memory covers all 49 rooms while staying selective about object facts, and because it is an explicit RDF graph, it can be compared directly against the hidden ground-truth state.*`,
				],
			},
			{
				id: "takeaways",
				navLabel: "Takeaways",
				eyebrow: "Takeaways",
				title: "Adaptivity and inspectability need not be traded off.",
				body: [
					"The central result is that learned meta-selection improves held-out performance over strong fixed symbolic controls while preserving fully symbolic execution over explicit RDF memory. Adaptation lives in which heuristic gets applied, and the record of those applications is the explanation of the agent's behavior.",
					"The design assumes only that memory is an annotated RDF graph and that memory operations are expressible as named heuristics ranked over annotation values such as recency and frequency. Neither assumption is specific to RoomKG, so the formulation transfers in principle to other temporal-knowledge-graph and memory-management settings. Per-step cost is also bounded by design: the controller only ever encodes its bounded memory and the local observation, never the full world graph.",
				],
			},
			{
				id: "citation",
				navLabel: "Cite",
				eyebrow: "Cite",
				title: "Cite our paper.",
				body: [
					`~~~bibtex
@misc{kim2026neurosymbolicmetapoliciestemporalknowledgegraph,
      title={Neuro-Symbolic Meta-Policies for Temporal Knowledge-Graph Memory under Partial Observability}, 
      author={Taewoon Kim and Vincent François-Lavet and Michael Cochez},
      year={2026},
      eprint={2607.18368},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2607.18368}, 
}
~~~`,
				],
			},
		],
	},
	summary:
		"A neuro-symbolic meta-policy that learns which symbolic memory heuristic to apply for answering, exploring, and forgetting, while keeping execution symbolic. Accepted at ISWC 2026.",
	image: {
		src: "/images/projects/project-roomkg-meta-policies.png",
		alt: "Illustration for RoomKG Meta-Policies",
	},
	problem:
		"Fixed symbolic memory heuristics are explicit but inflexible: one predetermined rule for retrieval, exploration, and forgetting cannot adapt as memory context changes. Fully neural policies adapt, but their decisions disappear into latent actions that cannot be audited.",
	solution:
		"RoomKG Meta-Policies learns a meta-policy that selects among named symbolic heuristics at each decision point, using qualifier-aware knowledge-graph encoding of the temporally annotated RDF memory with separate value heads for question answering, exploration, and forgetting. Selection is learned; execution stays symbolic.",
	impact:
		"At memory capacity 512, the qualifier-aware StarE-GNN configuration achieves the best held-out QA accuracy among all compared symbolic, neural, and neuro-symbolic systems, while every memory decision remains attributable to a named heuristic over explicit annotations.",
	links: [
		{
			label: "Read paper",
			href: "https://arxiv.org/abs/2607.18368",
		},
		{
			label: "View GitHub",
			href: "https://github.com/humemai/roomkg-meta-policies",
		},
		{
			label: "Parent project",
			href: "/projects/machines-with-human-like-memory",
		},
	],
};
