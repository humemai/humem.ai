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
