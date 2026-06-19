import type { Project } from "../types";

export const coLearning: Project = {
	slug: "co-learning",
	title: "Co-Learning",
	timelineOrder: 5,
	subprojectPage: {
		layout: "editorial",
		linksHeading: "Paper, code, and project links.",
		sections: [
			{
				id: "overview",
				navLabel: "Overview",
				eyebrow: "Overview",
				title:
					"Let a robot enter a new collaboration with prior team experience instead of an empty memory.",
				body: [
					`**Authors:** [Taewoon Kim](https://taewoon.kim/), [Emma van Zoelen](https://www.linkedin.com/in/emma-van-zoelen-822a6296/), and [Mark Neerincx](https://www.tno.nl/en/about-tno/our-people/mark-neerincx/).`,
					"Co-Learning studies human-robot teamwork in the MATRX Urban Search and Rescue (USAR) environment, where a human and a collaborative robot work together to free a buried victim. In earlier studies, people could externalize the collaboration patterns (CPs) they discovered during teamwork through a chat and reflection interface. The question here is whether a robot can reuse that prior team experience to become a better teammate from the very start of a new interaction.",
					"Instead of starting each episode with an empty memory, we treat previously observed CPs as explicit episodic long-term memories and preload one of them before a new collaboration begins. Because the reused experience stays an inspectable situation-action structure rather than opaque policy parameters, later robot behavior can still be reviewed and revised.",
					{
						type: "figureGrid",
						columns: 2,
						caption:
							"The MATRX USAR simulation (left) and the interface participants use to document the collaboration patterns they observe with the robot (right).",
						items: [
							{
								label: "USAR simulation",
								image: {
									src: "/images/papers/co-learning/usar-simulation.png",
									alt: "Screenshot of the MATRX USAR simulation with a human and a robot rescuing a victim.",
								},
							},
							{
								label: "Collaboration-pattern interface",
								image: {
									src: "/images/papers/co-learning/cp-interface.png",
									alt: "The drag-and-drop interface for documenting collaboration patterns.",
								},
							},
						],
					},
					`<div style="position:relative;width:100%;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;">
<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" src="https://www.youtube.com/embed/ZLSien-nNtY" title="Co-Learning: human-robot teamwork in MATRX USAR" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

*Video walkthrough of the MATRX USAR simulation and the human-robot collaboration task.*`,
				],
			},
			{
				id: "method",
				navLabel: "Method",
				eyebrow: "Method",
				title: "Represent collaboration patterns as knowledge graphs and learn to organize them.",
				body: [
					"We collected 209 collaboration patterns from previous MATRX USAR studies and represent each one as a knowledge graph rather than a fixed-length vector, so that situational context, action order, and task outcomes are preserved. Each CP graph uses six entity types (robot, participant, cp, situation, robot_action, human_action) connected by typed, sequence-indexed edges.",
					"Because the graphs carry typed relations, we encode them with a Relational Graph Convolutional Network (RGCN). The encoder is trained with a node-classification objective: a single linear classifier on top of the final RGCN layer predicts each node's type across ten classes (one cp, one situation, three human-action stages, and five robot-action stages). String attributes are embedded with Sentence-BERT, while numeric cp features are linearly projected into the same space.",
					{
						type: "figureGrid",
						columns: 2,
						caption:
							"All 209 collaboration patterns as knowledge graphs (left) and one example CP showing its situation, action, and outcome structure (right).",
						items: [
							{
								label: "209 CPs",
								image: {
									src: "/images/papers/co-learning/all-209-cps.png",
									alt: "Visualization of 209 collaboration patterns as knowledge graphs.",
								},
							},
							{
								label: "Example CP",
								image: {
									src: "/images/papers/co-learning/example-cp-graph.png",
									alt: "A single collaboration pattern rendered as a seven-node knowledge graph.",
								},
							},
						],
					},
					"After training, we obtain a graph-level embedding for each CP by mean-pooling its final node embeddings, then cluster these embeddings with K-means. From the chosen cluster we pick the CP closest to the centroid as a representative exemplar, and preload that single CP as the robot's episodic memory before a new trial begins.",
					`<img
src="/images/papers/co-learning/rgcn-architecture.png"
alt="A forward pass of the RGCN-based neural network"
class="editorial-image-compact"
/>

*One forward pass of the RGCN encoder: low-dimensional cp features are projected to the common space, and a linear classifier with softmax over the final node embeddings drives the cross-entropy loss.*`,
				],
			},
			{
				id: "results",
				navLabel: "Results",
				eyebrow: "Results",
				title: "A single preloaded memory improves early teamwork the most.",
				body: [
					"Training the two-layer RGCN for 2,000 epochs drives node-classification accuracy to 95.5% (loss 0.0948), and the learned representations produce noticeably more interpretable K-means clusters than raw cp features. We select a structurally simple, high-success cluster and draw its centroid-nearest CP, which turns out to direct the robot to move large rocks near the victim autonomously.",
					{
						type: "figureGrid",
						columns: 2,
						caption:
							"Training loss and accuracy (left), and K-means clusters of CP embeddings after RGCN training visualized with t-SNE (right).",
						items: [
							{
								label: "Training",
								image: {
									src: "/images/papers/co-learning/training-loss-accuracy.png",
									alt: "Cross-entropy loss decreasing and accuracy increasing over 2,000 epochs.",
								},
							},
							{
								label: "Clusters after training",
								image: {
									src: "/images/papers/co-learning/tsne-clusters-after.png",
									alt: "t-SNE visualization of five K-means clusters of CP embeddings after training.",
								},
							},
						],
					},
					"In a human-subject evaluation with 20 participants (160 round-level observations), initializing the robot with this single prior CP raised rescue success from **25.7% to 41.3%** and reduced average task time by **283 seconds**. The strongest gains appear in the very first round, before participants have adapted to the task, suggesting that reusable episodic memory gives the team a more coordinated starting point.",
					"The benefit is not uniform: victim harm rises on average and performance drops in the hardest later rounds, consistent with a mismatch between the reused CP and scenarios where a brown rock changes the local risk of debris removal. We report the round-level difference as observed rather than as a formal participant-level test, since each participant contributes multiple, non-independent rounds.",
				],
			},
			{
				id: "takeaways",
				navLabel: "Takeaways",
				eyebrow: "Takeaways",
				title: "Inspectable prior team memory can shape how a robot enters collaboration.",
				body: [
					"Co-Learning is a concrete mechanism rather than a general theory of memory transfer: it shows one feasible way to turn previously observed collaboration patterns into reusable, knowledge-graph episodic memories and to select one for reuse before a new human-robot episode begins.",
					"Because the transferred prior stays a human-readable situation-action structure, it could in principle be reviewed, revised, or disabled by operators before use. The work remains limited by its simulation setting, small sample, heuristic single-CP selection, and the absence of random, expert-selected, or multi-CP baselines, all of which point to clear next steps.",
				],
			},
			{
				id: "citation",
				navLabel: "Cite",
				eyebrow: "Cite",
				title: "Cite our paper.",
				body: [
					`~~~bibtex
@misc{kim2026improvinghumanrobotteamworkurban,
      title={Improving Human-Robot Teamwork in Urban Search and Rescue Through Episodic Memory of Prior Collaboration},
      author={Taewoon Kim and Emma van Zoelen and Mark Neerincx},
      year={2026},
      eprint={2606.18836},
      archivePrefix={arXiv},
      primaryClass={cs.HC},
      url={https://arxiv.org/abs/2606.18836},
}
~~~`,
				],
			},
		],
	},
	summary:
		"Reusing prior human-robot collaboration patterns as knowledge-graph episodic memory to improve early teamwork in USAR.",
	image: {
		src: "/images/projects/project-co-learning.png",
		alt: "Illustration for Co-Learning",
	},
	problem:
		"Robots usually enter each new collaboration with an empty memory, so teams must rediscover effective coordination from scratch, exactly when early coordination failures matter most in domains like disaster response.",
	solution:
		"Co-Learning represents previously observed collaboration patterns as knowledge-graph episodic memories, uses RGCN representation learning and clustering to select a representative prior pattern, and preloads it into the robot before a new MATRX USAR episode begins.",
	impact:
		"A human-subject study shows that initializing the robot with one inspectable prior collaboration pattern raises rescue success and lowers task time, with the largest gains at the start of interaction, while keeping the transferred experience auditable rather than hidden in policy weights.",
	links: [
		{
			label: "Read paper",
			href: "https://arxiv.org/abs/2606.18836",
		},
		{
			label: "View GitHub",
			href: "https://github.com/humemai/co-learning",
		},
		{
			label: "Parent project",
			href: "/projects/machines-with-human-like-memory",
		},
	],
};
