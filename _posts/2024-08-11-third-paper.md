---
layout: post
title: "Leveraging Knowledge Graph-Based Human-Like Memory Systems to Solve Partially Observable Markov Decision Processes"
subtitle: Third HumemAI research paper on creating a conscious AI
cover-img: /assets/img/posts/2024-08-11/lstm-steps.png
thumbnail-img: /assets/img/posts/2024-08-11/lstm-steps.png
tags: [humemai, episodic, semantic, memory, research, rl, reinforcement learning]
author: Taewoon Kim
mathjax: true
---

The second HumemAI research paper [A Machine with Short-Term, Episodic, and Semantic Memory Systems](http://humem.ai/2022-04-04-first-paper/), showed that a reinforcement learning (RL) agent can learn a memory management policy. We wanted more. We wanted to see if it can learn other cognitive functions too, such as maze navigation. That's what we addressed in this paper.

Now the agent has to learn two policies: memory management policy $$\pi^{\text{mm}}$$ and maze exploration policy $$\pi^{\text{explore}}$$. Learning the two at once is not so easy. Therefore, we opted for a two-phase training, where each phase learns one policy. We had to make the previous environment RoomEnv-v1, a bit bigger, so we made [RoomEnv-v2](https://github.com/humemai/room-env). Our AI is getting smarter and smarter. What's next?


**_Abstract_**: Humans observe only part of their environment at any moment but can
still make complex, long-term decisions thanks to our long-term memory. To test how an
AI can learn and utilize its long-term memory, we have developed a partially observable
Markov decision processes (POMDP) environment, where the agent has to answer questions
while navigating a maze. The environment is completely knowledge graph (KG) based, where
the hidden states are dynamic KGs. A KG is both human- and machine-readable, making it
easy to see what the agents remember and forget. We train and compare agents with
different memory systems, to shed light on how human brains work when it comes to
managing its own memory. By repurposing the given learning objective as learning a
memory management policy, we were able to capture the most likely hidden state, which is
not only interpretable but also reusable.

Check out the paper
[https://arxiv.org/abs/2408.05861](https://arxiv.org/abs/2408.05861).
