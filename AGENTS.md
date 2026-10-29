# AGENTS.md: humem.ai

The public website of HumemAI, an open source organization building memory systems for agentic AI (Next.js on Vercel). Start with `README.md`; the design notes are in `docs/design/`.

## Read first, by task

| You are | Read |
|---|---|
| running, building or checking the site | `README.md` (Development, and the checks before pushing: `npm run precheck`) |
| adding or changing an illustration | `docs/design/image-generation.md` (the pipeline), then `docs/design/image-prompts.md` (the look) |
| changing layout or page widths | `docs/design/layout-widths.md`, `docs/design/test-devices.md` |
| changing colours, type or any brand asset | `humemai/design-system` first, then vendor it here |
| adding or changing a project page | `src/lib/projects/items/`, `src/lib/projects/sections.ts` (which section the page goes in: Software for what you install or run, Research for what you read and cite) and `src/lib/projects/registry.ts`; numbers on a page come from a generated payload |

## Rules for agents

- A project's `summary` is its card text and the first line of its page. Write one or two plain sentences of 20 to 28 words (about 130 to 170 characters) that say what it is and the one thing that matters. No venue, no "accepted at" and no results; the venue is its own field. Cards in a row should read about the same length. `scripts/check-summary-length.mjs` runs in `npm run build` and enforces the word and character range.
- The order of the cards on `/software`, `/research` and the home page is the order of the keys in `src/lib/projects/sections.ts`, picked by hand. A new project goes where you want its card.
- Before a push that touches pages, links or layout, run `npm run precheck` (about 3.5 minutes: lint, build, every old and new URL, every page on six devices, images checked for cropping) and say in the PR which steps ran. The fast checks are already in `npm run build`, so Vercel enforces them.
- A moved URL always ships with a permanent redirect in `next.config.ts`, straight to the final page (no chains), and with a line in `scripts/legacy-urls.json`, the ledger of published URLs that `npm run precheck` checks. The old `/projects/...` redirects are generated from `sections.ts`; a new project needs no redirect, but a project that changes section does.
- Every illustration comes from `scripts/gen-image.mjs`. Do not draw, recolor or hand-edit one. Commit the PNG, the spec and the stored prompt together. Refitting an existing image onto a square canvas (crop to the content, scale, recenter) so the site's crops show it whole is not editing it: see "News covers" in `docs/design/image-generation.md`, and `npm run precheck` fails on a cropped one.
- The OpenRouter key comes only from `OPENROUTER_API_KEY`, or from the file named by `OPENROUTER_KEY_FILE` outside every repository. Never print, commit, paste or send it, and never write where it is kept into a file, commit message, issue or comment.
- A table on a project page is a `benchmarkTable` or `paperTable` block, never a markdown table in a text block: blocks leave the 736px text column on wide screens and stack on a phone (`docs/design/layout-widths.md`). The build fails on a markdown table (`scripts/check-item-tables.mjs`).
- Never type a number into a page; generate it, or check it with a script. Math in the items is KaTeX and follows ISO 80000-2 (backslashes doubled inside template literals).
- Update `README.md` and `docs/design/` in the same change as the code, and remove the old text in that change. A temporary file or switch says when it goes (`REMOVE WHEN:`).
- Open an issue, work on a branch, open a PR that references it, merge when your checks are green, delete the branch on merge. Stage files by explicit path. Issue, PR and comment bodies have no hard wraps and no em dashes.
- This repository is public: no secrets, token locations or private notes.
