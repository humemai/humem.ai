# Generating site images

Every illustration on the site is generated in the house theme (see "House theme" in `image-prompts.md`) and then finished by a script, so a new page gets an image
that matches the existing set. This page is the pipeline. The rules of the look itself (palette, solid fills, content discipline) live in `image-prompts.md`.

## The pipeline in one command

```bash
node scripts/gen-image.mjs <id> [--n 2] [--model <openrouter model id>] [--dry]
```

`<id>` is an entry in `docs/design/image-specs.json`:

| field | meaning |
|---|---|
| `id` | the name used on the command line and for the stored prompt |
| `out` | where the finished PNG goes, for example `public/images/projects/project-dbbench.png` |
| `aspect` | `1:1` for cards, or a landscape ratio such as `16:10` |
| `purpose` | one or two sentences: where the image is used and what it should communicate |
| `show` | exactly the elements to draw, five to eight, with colors and positions |
| `alt` | the alt text the page uses |
| `charcoal` | optional, `true` only when one element is a rejected or discarded thing |

The script builds the full prompt from the house template and these fields, so a spec only says what to draw. `--dry` prints the prompt without calling anything.

## What the script does

1. **Generate.** It asks the image model through OpenRouter for `--n` candidates (default 2). The default model is `google/gemini-3-pro-image`, the model that made the shipped
   set; keep it unless you want a visibly different look, because a new model changes the style of new images against old ones.
2. **Audit the raw candidates.** It counts the share of stray charcoal pixels (a charcoal element the spec did not ask for) and picks the candidate with the least.
   The raw hue drift is reported but is not the gate, because the finisher removes it.
3. **Finish.** It crops to the true content box, snaps the colors to the palette (ground exactly `#faf8f5`, ink `#892122`, accent `#e88e8b`, keeping anti-aliased edges),
   recenters, and fits the content inside a box that survives both crops the site applies (5:6 keeps 83% of the width, the 16:10 hero box keeps 62.5% of the height, so the box is 60%) on a square canvas.
4. **Audit the finished image.** Off-palette pixels are measured against the ground-to-color lines, so edges do not count; the finished image should read about 0%.
5. **Store the prompt.** The exact prompt that produced the shipped image goes to `docs/design/generated-prompts/<id>.txt`, with the model, the candidate count, the audit
   numbers and the alt text. A stored prompt is always the one that made the image.

## Adding an image

1. Add a spec to `docs/design/image-specs.json`. Keep to five to eight elements, name only the colors the image needs, and say what to draw and nothing else.
2. Run `node scripts/gen-image.mjs <id>` and look at the result at card size.
3. If a stray element appears, tighten `show` (never add more words about what to avoid; list only what to draw) and run again.
4. Commit the PNG, the spec and the stored prompt together.

## Paper figures as covers

A paper figure is rarely a good cover: it is the wrong shape (the ArcadeDB in Python architecture figure is 2.9:1), its type is unreadable at card size, and it is cut to about half its width on a phone. Generate the cover instead, with the idea of the paper drawn in the house theme (the spec `arcadedb-python-scipy-cover` is the example: one database inside a container, with a page, a small graph and arrows under it). A figure that has to be the cover is refit as described under "News covers".

## News covers

Every news cover has to show whole at every width, because the site crops it three ways (5:6 on phones, 16:10 on cards and desktop heroes). Put a cover on a square canvas with the content at most 83% of the width and 60% of the height, centered on the ground color of the image (`#faf8f5` for an illustration, the white of a figure for a figure). A landscape figure or screenshot used as a cover is cut to about half its width on a phone, so it is refit the same way. A paper figure that is also shown on a research page needs its own cover file under `public/news/`, so the figure on the page keeps its shape. `npm run precheck` fails on a cover whose content is cut off. Photos with uneven corners are not checked, because cropping a photo is fine.

## Keys and secrets

The script reads the OpenRouter key from the `OPENROUTER_API_KEY` environment variable, or from the local file named by `OPENROUTER_KEY_FILE`, which must live outside every repository. It never prints the key, never
writes it to a file, and never sends it anywhere except the OpenRouter API. Nothing in this repository contains a key, and none should: do not paste a key into a spec,
a prompt, a commit message or an issue.

## Cost and limits

A candidate costs a few US cents. Two candidates per image are enough. The finisher needs `sharp`, which is already installed with the site's dependencies.
