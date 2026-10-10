# AGENTS.md: humem.ai

The public website of HumemAI, an open source organization building memory systems for agentic AI (Next.js on Vercel). Start with `README.md`; the design notes are in `docs/design/`.

## Content

- The site describes an open source organization. It must not suggest a product, pricing or a hosted tier.
- Project pages are items in `src/lib/projects/items/`, registered in `src/lib/projects/registry.ts`. Numbers on a page come from a payload file generated from result rows. Never type a number into a page; generate it, or check it with a script.
- Math in the items is KaTeX and follows ISO 80000-2: quantities italic, names (operators, word-like subscripts) upright with `\mathrm`, bold only for multi-component objects. Backslashes are doubled inside template literals.

## Images

Every illustration is generated and finished by `scripts/gen-image.mjs` from a spec in `docs/design/image-specs.json`; the pipeline, the audit and the model choice are in `docs/design/image-generation.md`, and the look in `docs/design/image-prompts.md`.

- Do not draw, recolor or hand-edit an illustration, and do not switch the model for one image: a new model changes the style against the existing set.
- Commit the PNG, the spec and the stored prompt in `docs/design/generated-prompts/` together.
- The OpenRouter key comes only from `OPENROUTER_API_KEY`, or from the file named by `OPENROUTER_KEY_FILE` outside every repository. Never print, commit, paste or send the key, and never write where it is kept in a file, commit message, issue or comment.

## Design

The brand comes from `humemai/design-system`: change the brand there and vendor it here, not the other way round. Do not reintroduce teal, blue, violet or default fonts.

- A shorthand property resets the longhands before it (`padding:` after `padding-inline`, `font:` after `font-size`). When you set one side of a box, grep the block and any more specific rule for the shorthand.
- Inside a prose column the grid gap is the only vertical spacing; `npm run build` runs `scripts/check-spacing-tokens.mjs` and fails otherwise.
- Check a layout change rendered, not only built: in light and dark mode, on the devices in `docs/design/test-devices.md`, and at a wide desktop width (1920 px) for the page frame and gutters.

## Checks, git and GitHub

- Before pushing run `npm run lint` and `npm run build`, and run them again after any later edit, even a text change. There is no CI here, so a pass you did not run is a pass nobody ran.
- Update the README and `docs/design/` in the same change as the code, and remove the old text in that change. A temporary file or switch says when it goes (`REMOVE WHEN:`).
- Open an issue, work on a branch, open a PR that references it, merge when your checks are green, and delete the branch (remote and local) on merge.
- Stage files by explicit path, never `git add -A`. Always pass `-R owner/repo` to `gh`. Issue, PR and comment bodies have no hard wraps and no em dashes.
- This repository is public: no secrets, token locations or private notes.
