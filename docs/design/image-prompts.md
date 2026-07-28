Use these as fully self-contained prompts. Copy one whole block at a time into ChatGPT or your image generator.

The set is intentionally redundant so you do not need to remember shared style rules between prompts.

Important overall direction:
Bias strongly toward simplified editorial illustration, not screenshot realism. Use a small number of large visual elements, clear shapes, and calm negative space. Suggest systems and structure without rendering tiny UI chrome, tiny text, dense dashboards, or photoreal software screens.

## House theme (2026-07 revision)

Derived from the HumemAI icon (a single-color head silhouette holding a small
knowledge graph) and the site's existing accents. Every prompt below should be read
with, and every new prompt should include, these constraints:

- Palette, exactly four roles: warm off-white background (#faf8f5), deep brand teal
  (#1a5f7a) as the one structural ink for shapes and strokes, soft charcoal
  (#2a2a2a) for the one element being rejected, discarded, or contrasted, and warm
  coral (#ff8f70) for the single element that matters most. Nothing else. No
  gradients, no lighting, no texture.
- **Solid fills, not hollow outlines.** This is the strongest single rule. Small
  shapes (capsules, pills, nodes, dots) are filled solid in their color. Only large
  containers, the shapes that enclose something, are drawn as thick outlines. A
  composition made entirely of hollow outlined shapes reads thin and generic; the
  house look is chunky and confident.
- **Name only three colors in a prompt unless a fourth is genuinely needed.** Listing
  charcoal as an available color makes the generator insert a stray charcoal element
  (a cross, a rogue block, a floating capsule) even when nothing in the brief calls
  for one. Mention charcoal only in prompts that actually depict something rejected
  or discarded.
- **State content discipline explicitly.** Add a line telling the generator to draw
  only the listed elements and nothing else: no decorative marks, stray dots,
  sparkles, or badges. Without it, empty space gets filled with noise.
- Flat diagram language: thick even strokes, five to eight visual elements total. If
  it could not be redrawn by hand in two minutes, it is too detailed.
- Composition must be center-weighted with at least 15 percent quiet margin on every
  side, because the site crops the same source to both 5:6 portrait and 16:11
  landscape. Nothing important near any edge.
- Absolutely no text, letters, numbers, or letter-like glyph rows baked into the
  image.
- Motif kinship with the icon is welcome: small knowledge graphs of a few round
  nodes and plain edges are the house symbol for memory.

## 1. Homepage Hero

```text
Generate a 16:10 landscape illustration for the HumemAI website.

Purpose:
This image will be used on the homepage above the fold. It should represent HumemAI as the memory layer for agentic AI systems across conversations, documents, tables, and graphs.

What to show:
Down the left side, three solid filled teal shapes stacked with space between them: a speech bubble, a plain page rectangle, and a small three-by-three grid of solid squares. From each, one thick teal line runs rightward and converges into a large rounded-rectangle container drawn as a thick teal outline. Inside the container sits a small knowledge graph of five solid filled circles joined by thick edges; four circles are teal and one is coral. Eight elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 16:10 landscape.
```

Filename: `home-hero-memory-layer.png`
Alt text: `Illustration of conversations, documents, tables, and graph data flowing into a structured memory system.`

## 2. Product Hero

```text
Generate a 16:9 landscape illustration for the HumemAI website.

Purpose:
This image will be used on the product page. It should imply what the HumemAI product feels like in use.

What to show:
On the left, three solid filled teal rounded bars stacked vertically, of slightly different widths. In the centre, a large rounded-rectangle container drawn as a thick teal outline holding a small knowledge graph of five solid filled teal circles with thick edges. One circle is coral. From that coral circle, a single thick coral line exits to the right and ends in a solid coral dot. Seven elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 16:9 landscape.
```

Filename: `product-hero-interface.png`
Alt text: `Mock product interface showing chat, memory graph, and structured retrieval panels.`

## 3. About Page Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the About page. It should connect human-like memory ideas to practical AI systems.

What to show:
Two wide rounded-rectangle containers drawn as thick teal outlines, stacked one above the other with a clear gap between them. Each container is a wide horizontal rectangle, roughly three times as wide as it is tall, and each spans almost the entire width of the square frame. The upper container holds three solid filled teal dots spaced out in a horizontal row. The lower container holds four solid filled teal circles joined by thick teal edges into a small graph, also spread out horizontally. A short thick coral line runs vertically through the gap connecting the two containers at their centres. Together the two containers must fill the square frame from left edge to right edge and from top to bottom. Six elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `about-memory-architecture.png`
Alt text: `Conceptual illustration of structured memory systems for AI.`

## 4. Pricing Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the Pricing page. It should show different ways of using HumemAI without looking like a literal pricing table.

What to show:
One solid filled teal rounded square at the top centre. From its bottom edge, three thick lines fan downward to three separate rounded-square shapes along the bottom. The left and right bottom shapes are solid teal; the middle bottom shape and the middle line connecting to it are coral. Seven elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `pricing-deployment-paths.png`
Alt text: `Illustration showing self-hosted, hosted, and custom deployment paths.`

## 5. Contact / Early Access Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the Contact page. It should communicate collaboration, onboarding, and working together without feeling like generic customer support imagery.

What to show:
Four solid filled circles arranged along a gently rising path from lower left to upper right, joined by thick straight connecting lines. The first three circles are teal and increase slightly in size; the final upper-right circle is coral and largest. Seven elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `contact-collaboration-onboarding.png`
Alt text: `Illustration representing collaboration and onboarding around an AI memory system.`

## 6. Projects Overview Visual

```text
Generate a 16:9 landscape illustration for the HumemAI website.

Purpose:
This image will be used on the Projects overview page or section. It should represent public work, research, prototypes, and funded efforts.

What to show:
Five rounded-square tiles of varied sizes arranged in a loose balanced cluster with clear gaps between them. Four tiles are solid filled teal; one tile, slightly larger and near the centre, is coral. Thin teal lines connect a few of the tiles to each other. Six elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 16:9 landscape.
```

Filename: `projects-overview-portfolio.png`
Alt text: `Structured illustration representing research, systems work, and applied AI memory projects.`

## 7. Social / Open Graph Image

```text
Generate a 2:1 wide landscape illustration for the HumemAI website.

Purpose:
This image will be used as the site-wide Open Graph / social share image. It needs to be immediately readable on X, LinkedIn, Slack, and Discord.

What to show:
One large rounded-rectangle container drawn as a thick teal outline, centred. Inside it, a small knowledge graph of six solid filled circles joined by thick teal edges; five circles are teal and the central one is coral. Nothing else at all. Very simple and legible at small sizes.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 2:1 wide landscape.
```

Filename: `og-memory-for-agentic-ai.png`
Alt text: `Branded social preview image for HumemAI.`

## 8. Hosted Workspace Mockup

```text
Generate a 16:9 landscape illustration for the HumemAI website.

Purpose:
This image will be used lower on the product page, pricing page, or a future hosted page. It should show a somewhat more concrete workspace than the product hero image, but still as an illustration rather than a screenshot.

What to show:
One very large rounded-rectangle container drawn as a thick teal outline filling most of the frame. Inside it, on the left, three solid filled teal bars stacked vertically; on the right, a small knowledge graph of four solid filled teal circles with thick edges. One of the left bars is coral. Six elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 16:9 landscape.
```

Filename: `hosted-workspace-mockup.png`
Alt text: `Conceptual hosted workspace for an AI memory platform.`

## 9. Audit-Ready Memory Project Visual

```text
Generate a 16:9 landscape illustration for the HumemAI website.

Purpose:
This image will be used on the Audit-Ready Memory project page. It should communicate traceability, explainability, records, and evidence.

What to show:
Six solid filled teal rounded rectangles arranged in two rows of three, evenly spaced, filling the frame. A single thick coral line threads through all six: it enters at the left of the top row, runs right through those three, drops down at the right, then runs left through the bottom three and ends in a solid filled coral dot at the lower left. Eight elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 16:9 landscape.
```

Filename: `project-audit-ready-memory.png`
Alt text: `Illustration of traceable and explainable AI memory records.`

## 10. Machines With Human-Like Memory Project Visual

```text
Generate a 16:9 landscape illustration for the HumemAI website.

Purpose:
This image will be used on the Machines With Human-Like Memory project page. It should communicate the deeper research thread behind HumemAI.

What to show:
One large rounded-rectangle container drawn as a thick teal outline. Inside, a knowledge graph of six solid filled teal circles joined by thick teal edges. Outside the container to the left, three small solid filled teal dots feed in via one thick teal line. One circle inside the graph is coral. Six elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 16:9 landscape.
```

Filename: `project-human-like-memory.png`
Alt text: `Illustration of human-like memory architecture for AI.`

## 11. CypherGLOT Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the CypherGLOT project page. It should communicate that CypherGLOT is a compiler-first Cypher frontend that parses, validates, normalizes, and lowers admitted Cypher into backend-aware SQL-backed output for embedded runtimes.

What to show:
Four groups arranged in a square block, one near each corner. Top left: a solid filled coral capsule. Top right and bottom right: two solid filled teal rounded squares. Bottom left: a small knowledge graph of three solid filled teal circles joined by thick teal edges. Thick teal lines connect them in a clockwise loop starting from the coral capsule and ending at the graph. The arrangement must fill the square frame rather than form a single horizontal row. Eight elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-cypherglot-compiler.png`
Alt text: `Illustration of Cypher query compilation into normalized graph-relational output.`

## 12. ArcadeDB Embedded Python Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the ArcadeDB Embedded Python project page. It should communicate native Python bindings for a powerful embedded multi-model database with graph, vector, document, and local in-process usage.

What to show:
One large rounded-square container drawn as a thick teal outline. Inside it, four small solid filled teal shapes arranged in a two-by-two block: a circle, a diamond, a square and a short capsule, representing different data modes. Attached to the top-left of the container by a short thick coral line is a solid filled coral capsule. Seven elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-arcadedb-embedded-python.png`
Alt text: `Illustration of Python connected to an embedded multi-model database runtime.`

## 13. HumemDB Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the HumemDB project page. It should communicate a Python-first embedded orchestration runtime that routes SQL, Cypher, and vector workloads across the engines best suited for each job.

What to show:
One solid filled teal rounded square at the centre. Four thick teal lines radiate from it to four smaller shapes placed up, down, left and right: a circle, a square, a diamond and a capsule. Three of the four outer shapes are solid teal; the one on the right is coral. Nine elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-humemdb-runtime.png`
Alt text: `Illustration of an embedded runtime coordinating SQL, graph, and vector workloads.`

## 14. Careers Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the Careers page. It should communicate that HumemAI is building serious AI memory systems and is looking for people who want to build that future together.

What to show:
Three solid filled teal circles arranged in a triangle around a central rounded-square container drawn as a thick teal outline. Each circle connects to the container by a thick teal line. Inside the container is a small graph of three solid filled circles, one of which is coral. Eight elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `careers-build-with-memory.png`
Alt text: `Illustration representing collaborative work on AI memory systems.`

## 15. News Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the main News page. It should communicate writing, research updates, technical notes, and product thinking around AI memory systems without looking like a literal article thumbnail grid.

What to show:
Three plain page rectangles drawn as thick teal outlines, overlapping in a loose stack, slightly rotated from each other. The topmost page is coral. Beside the stack on the right, a small knowledge graph of three solid filled teal circles joined by thick edges. Six elements total. The pages must be completely empty outlines with no lines or marks inside them.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `news-writing-and-research.png`
Alt text: `Illustration representing technical writing, research updates, and structured knowledge.`

## 16. Privacy Policy Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the Privacy Policy page. It should communicate trust, clarity, visitor choice, and careful handling of information without looking legalistic, corporate, or surveillance-themed.

What to show:
Three horizontal toggle switches stacked vertically with even spacing. Each toggle is a capsule outline in thick teal with a solid filled circle inside it. The top two toggles have teal circles positioned to the left; the bottom toggle has a coral circle positioned to the right, showing it is switched on. Six elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `privacy-policy-trust-and-choice.png`
Alt text: `Illustration representing privacy, transparency, and user control.`

## 17. Human-Like Memory Systems Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the Human-Like Memory Systems project page and project card. It should communicate the first concrete benchmark-and-agent implementation in the broader Machines With Human-Like Memory research line.

What to show:
On the left, a two-by-two grid of four solid filled teal squares with visible gaps, with one solid filled coral dot sitting inside one of the squares. On the right, two rounded-rectangle containers drawn as thick teal outlines, stacked with a gap, each holding two small solid filled teal dots. One thick teal line runs from the grid rightward into the upper container. The two halves should sit side by side and together fill the square frame. Nine elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-human-like-memory-systems.png`
Alt text: `Illustration of RoomEnv-v0 with explicit episodic and semantic memory.`

## 18. Explicit Memory Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the Explicit Memory project page and project card. It should communicate the shift from handcrafted memory policies to a learned reinforcement-learning agent that manages short-term, episodic, and semantic memory explicitly.

What to show:
Three rounded-rectangle containers drawn as thick teal outlines, stacked vertically with even gaps, each one slightly wider than the one above it. The top container holds one solid coral dot; the middle holds two solid teal dots; the bottom holds three solid teal dots joined by thick teal edges into a small graph. Seven elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-explicit-memory.png`
Alt text: `Illustration of a reinforcement-learning agent managing short-term, episodic, and semantic memory in RoomEnv-v1.`

## 19. RoomKG Baselines Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the RoomKG Baselines project page and project card. It should communicate a benchmark for temporal knowledge-graph memory in a partially observable room environment, together with symbolic and neural baseline comparisons.

What to show:
In the upper left, a two-by-two grid of four solid filled teal squares. To its right, a small knowledge graph of four solid filled teal circles joined by thick teal edges. Centred below both, a rounded-square container drawn as a thick teal outline holding two solid filled dots side by side, the left one teal and the right one coral. One thick teal arrow points from the grid rightward to the graph, and a second thick teal arrow points from the graph downward to the container. The three groups should form a broad triangle that fills the frame rather than a single left-to-right row. Nine elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-roomkg-baselines.png`
Alt text: `Illustration of a partially observable room benchmark connected to temporal knowledge-graph memory and baseline comparisons.`

## 20. Co-Learning Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the Co-Learning project page and project card. It should communicate reusing prior human-robot collaboration experience as knowledge-graph episodic memory, so a robot enters a new urban search-and-rescue team interaction already holding a useful prior memory instead of starting empty.

What to show:
Two solid filled teal circles of equal size sit side by side at the right, suggesting two partners. To their left, a small knowledge graph of three solid filled coral circles joined by thick coral edges. One thick coral line carries that small graph rightward into a rounded-square container drawn as a thick teal outline that encloses the two teal circles. Seven elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-co-learning.png`
Alt text: `Illustration of reusing a prior human-robot collaboration pattern as knowledge-graph episodic memory in a search-and-rescue task.`

## 21. KG Memory Transfer Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the KG Memory Transfer project page and project card. It should communicate short-term-to-long-term memory transfer for knowledge graphs under partial observability, with the transfer decision itself treated as the core research problem.

What to show:
On the left, three solid filled capsule shapes stacked vertically, representing newly observed facts: the top one teal, the middle one coral, the bottom one charcoal. In the middle, a simple gate drawn as two short thick vertical teal strokes. To the right, a rounded-square container drawn as a thick teal outline holding a small knowledge graph of four solid filled teal circles joined by thick edges. The coral capsule passes through the gate into the container; the charcoal capsule falls away below the gate. Nine elements total. This is the one prompt that legitimately needs charcoal, because it depicts a discarded fact.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-kg-memory-transfer.png`
Alt text: `Illustration of selective transfer from short-term observations into long-term temporal knowledge-graph memory under partial observability.`

## 22. RoomKG Meta-Policies Project Visual

```text
Generate a 1:1 square illustration for the HumemAI website.

Purpose:
This image will be used on the RoomKG Meta-Policies project page and project card. It should communicate one idea: a learned controller choosing which named symbolic memory rule to apply, while the rules themselves stay explicit and inspectable.

What to show:
A row of three solid filled capsule shapes across the top representing candidate rules: left capsule teal, middle capsule coral, right capsule teal. Below them, a small knowledge graph of five solid filled teal circles joined by thick teal edges. One short straight vertical coral line drops from the bottom of the coral capsule and ends at the topmost circle of the graph. The coral line must be perfectly vertical, short, and must not bend, wrap, or touch anything except the coral capsule above it and the single circle below it. No container or enclosing box anywhere. Nine elements total.

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these three colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep teal #1a5f7a
- the single most important element only: warm coral #ff8f70
Do not use black, grey, charcoal, white, or any fourth color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: 1:1 square.
```

Filename: `project-roomkg-meta-policies.png`
Alt text: `Illustration of a controller selecting one of three named symbolic rules to apply to a small knowledge-graph memory.`
