---
layout: post
title: "A Machine with Short-Term, Episodic, and Semantic Memory Systems"
subtitle: Second HumemAI research paper on creating a conscious AI
cover-img: /assets/img/posts/2022-12-05/q-network-diagram.png
thumbnail-img: /assets/img/posts/2022-12-05/q-network-diagram.png
tags: [humemai, episodic, semantic, memory, research, rl, reinforcement learning]
author: Taewoon Kim
mathjax: true
---

The first HumemAI research paper [A machine with human-like memory
systems](http://humem.ai/2022-04-04-first-paper/), didn't use any machine learning.
Machine learning reinforcement learning (RL). All the memory management policies used
there were handcrafted. They might be fine, as long as they work fine. But handcrafted
functions are rigid and won't be able to adapt to a new environment. And that's why in
this paper, we used RL to learn these policies. RL, one of the three pillars of machine
learning, where the other two are supervised learning and unsupervised learning, is a
bit different from the other two. It's learning objective is reward maximization, not a
simple maximum likelihood, meaning that it'll do whatever it takes to maximize its
rewards. This can lead to superhuman behaviors such as
[AlphaGo](https://youtu.be/WXuK6gekU1Y?si=yIVkkPF4L3WHV6V0)!

We introduced another toy environment called
[RoomEnv-v1](https://github.com/humemai/room-env), which is a bit more complicated than
its predecessor RoomEnv-v0.

**_Abstract_**: Inspired by the cognitive science theory of the explicit human memory
systems, we have modeled an agent with short-term, episodic, and semantic memory
systems, each of which is modeled with a knowledge graph. To evaluate this system and
analyze the behavior of this agent, we designed and released our own reinforcement
learning agent environment, "the Room", where an agent has to learn how to encode,
store, and retrieve memories to maximize its return by answering questions. We show that
our deep Q-learning based agent successfully learns whether a short-term memory should
be forgotten, or rather be stored in the episodic or semantic memory systems. Our
experiments indicate that an agent with human-like memory systems can outperform an
agent without this memory structure in the environment.

Check out the paper
[https://arxiv.org/abs/2212.02098](https://arxiv.org/abs/2212.02098).
