---
layout: post
title: "A machine with human-like memory systems"
subtitle: My first research paper on creating a conscious AI 
cover-img: /assets/img/posts/2022-04-04/episodic-semantic.png
thumbnail-img: /assets/img/posts/2022-04-04/episodic-semantic.png
tags: [humemai, episodic, semantic, memory, research]
author: Taewoon Kim
mathjax: true
---

This paper was my first attempt to create a conscious AI. I got pretty interested in
human memory after reading the works of [Endel
Tulving](https://scholar.google.com/citations?user=OxmLLMEAAAAJ&hl=en). He argued that
what makes us human conscious is that we have episodic memory, which is one of the two
pillars of explicit memory (the other is semantic memory). The more I read his work, the
more convinced I've become. It made sense to me that we humans can go back in time and
location using our memory. By understanding the past, we can understand present, and
perhaps the future as well. Without episodic memory system, this might not be possible.

And this has led me to start my PhD research in computationally modeling an AI with such
human-like memory systems. There are various ways to store the memories, and I opted for
[knowledge graphs](https://arxiv.org/abs/2003.02320), which is both human- and
machine-readable. The next step was to confirm if having this kind of memory system
makes sense at all. So I made a small toy environment, called
[RoomEnv-v0](https://github.com/humemai/room-env), and tried out some handcrafted memory
management functions to see if they make sense. My conclusion? I think it makes sense.

***Abstract***: Inspired by the cognitive science theory, we explicitly model an agent with both semantic and episodic memory systems, and show that it is better than having just one of the two memory systems. In order to show this, we have designed and released our own challenging environment, "the Room", compatible with OpenAI Gym, where an agent has to properly learn how to encode, store, and retrieve memories to maximize its rewards. The Room environment allows for a hybrid intelligence setup where machines and humans can collaborate. We show that two agents collaborating with each other results in better performance than one agent acting alone.

Check out the paper
[https://arxiv.org/abs/2204.01611](https://arxiv.org/abs/2204.01611).
