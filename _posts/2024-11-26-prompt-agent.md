---
layout: post
title: "PromptAgent: An Agent Leveraging LLM Prompting for Text-to-Graph and Graph-to-Text"
subtitle: "Generating a Knowledge Graph from the Harry Potter Book"
cover-img: /assets/img/posts/2024-11-26/thumbnail.png
thumbnail-img: /assets/img/posts/2024-11-26/thumbnail.png
tags: [humemai, youtube, prompting, llm, PromptAgent]
author: Taewoon Kim
mathjax: true
---

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
  <iframe src="https://www.youtube.com/embed/NU1JZE8kQeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

## PromptAgent

[The Jupyter
Notebook](https://github.com/humemai/humemai/blob/main/examples/janus-graph-parse-text/example-janus-agent.ipynb)
showcases the code of PromptAgent, where the agent uses LLM prompting to achieve
text-to-graph (text2graph) and graph-to-text (graph2text) transformations.

PromptAgent comprises several components. In this blog post, we'll explore them one by
one to understand how everything works.

### The HumemAI Python Package

PromptAgent is built using the [HumemAI Python
package](https://github.com/humemai/humemai). While it may appear that everything
operates at the Python level, there's a lot happening behind the scenes—graph databases,
Gremlin (a graph query language), LLMs, and more. Many of these complexities are
abstracted away, so users don't have to manage low-level details; the HumemAI Python
package handles them seamlessly.

Interacting with a database typically involves using a database-specific query language.
In our case, we use Gremlin. Fortunately, there's a Python wrapper for Gremlin, which
makes it straightforward to use without needing to operate a database-specific console.
The HumemAI Python package provides an even higher level of abstraction over the Gremlin
APIs, so you don't have to worry about them at all. For example, it includes intuitive
functions like "write a short-term memory."

### Apache JanusGraph and Cassandra

When it comes to representing knowledge as a graph, two popular methods are RDF
(Resource Description Framework) and property graphs. For PromptAgent, I chose property
graphs over RDF due to their larger community support and faster graph traversal
capabilities. Property graphs allow us to store complex relationships with attributes
directly attached to nodes and edges, making them highly efficient for this application.

JanusGraph, an open-source graph database, serves as the backbone for the property graph
implementation in PromptAgent. However, JanusGraph itself does not include built-in
storage. To address this, we pair it with Cassandra, a NoSQL database, to handle data
storage. While Cassandra isn't a graph database per se, it integrates seamlessly with
JanusGraph, providing a scalable and reliable solution for our knowledge graph.

Both JanusGraph and Cassandra are licensed under the Apache License, making them fully
open-source and free to use. This openness contrasts with proprietary solutions like
Neo4j, giving developers greater freedom and flexibility to adapt the tools to their
specific requirements.

Moreover, both JanusGraph and Cassandra offer Docker containers, and the HumemAI Python
package manages these containers using the Docker Python library.

### LLM (Large Language Model)

Large Language Models (LLMs) are powerful tools capable of performing complex tasks when
provided with effective prompts. However, LLMs like GPT or Llama are inherently designed
to process sequential data and cannot directly interpret or manipulate a graph's
structure, as graphs are non-linear and lack a defined starting or ending point. This
makes tasks such as graph-to-text (graph2text) and text-to-graph (text2graph)
challenging.

To overcome this limitation, I "serialize" the graph into a linear format, such as JSON,
which the LLM can understand and process. Once serialized, I prompt the LLM to perform
the necessary operations, like extracting relationships or generating descriptions. The
resulting JSON output is then parsed using regular expressions (regex) to reconstruct or
query the graph structure.

### Human-like Memory

HumemAI draws significant inspiration from the human brain, and PromptAgent follows this
design philosophy closely. When new text—such as a paragraph—is converted into a graph,
it is initially stored as short-term memory. In this phase, the graph's vertices and
edges are assigned a `current_time` property to mark their recency. Short-term memory
serves as the basis for retrieving relevant long-term memories, forming what cognitive
science refers to as **working memory**—a combination of short-term memory and selected
long-term memory. This mirrors how humans handle tasks by focusing on only a subset of
relevant information rather than recalling everything at once.

The process of finding "relevant" long-term memories relies on graph distance. Only
vertices and edges within a specified number of hops (`num_hops`) from the short-term
memory vertices are retrieved. This selective retrieval is a unique advantage of
representing memories as a graph. When a long-term memory is accessed, its
`num_retrieved` property is incremented, providing a way to track usage frequency.

PromptAgent optimizes memory usage by keeping only the vertices and edges of the working
memory in the machine's RAM. All other memories are stored persistently in the graph
database. Similarly, the working memory is the only part used as "in-context" tokens for
the LLM. By maintaining this lean working memory, PromptAgent can potentially handle
texts of infinite length—overcoming the context window limitations of LLMs. Instead of
loading the entire memory, PromptAgent focuses on what is immediately relevant.

Currently, every short-term memory is saved as (episodic) long-term memory, thanks to
the low cost of modern persistent storage. However, this approach might evolve, as not
all short-term memories need to transition into long-term storage. Just as humans
naturally forget information that isn't useful, PromptAgent could introduce a forgetting
mechanism to manage memory more efficiently in the future.

## Future Work

- **Enhanced Prompting**: I plan to refine the prompts further to improve the
  performance of the LLM interactions.
- **Integration with Larger LLMs**: Enabling the use of OpenAI or other large LLM APIs
  could significantly enhance performance compared to the Llama 3.2 3B model currently
  in use. This could also help reduce hallucinations that occur with smaller models.
- **Interactive Chat Capability**: Developing a chat interface with PromptAgent could
  make it more accessible and beneficial, especially for individuals with memory
  impairments.
