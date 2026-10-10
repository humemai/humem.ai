# AGENTS.md: humem.ai

The public website of HumemAI, an open source organization building memory systems for agentic AI (Next.js on Vercel). Start with `README.md`; the design notes are in `docs/design/`.

## Read first, by task

| You are | Read |
|---|---|
| running, building or checking the site | `README.md` (Development, and the checks before pushing) |
| adding or changing an illustration | `docs/design/image-generation.md` (the pipeline), then `docs/design/image-prompts.md` (the look) |
| changing layout or page widths | `docs/design/layout-widths.md`, `docs/design/test-devices.md` |
| changing colours, type or any brand asset | `humemai/design-system` first, then vendor it here |
| adding or changing a project page | `src/lib/projects/items/` and `src/lib/projects/registry.ts`; numbers on a page come from a generated payload |

## Rules for agents

- Every illustration comes from `scripts/gen-image.mjs`. Do not draw, recolor or hand-edit one. Commit the PNG, the spec and the stored prompt together.
- The OpenRouter key comes only from `OPENROUTER_API_KEY`, or from the file named by `OPENROUTER_KEY_FILE` outside every repository. Never print, commit, paste or send it, and never write where it is kept into a file, commit message, issue or comment.
- Never type a number into a page; generate it, or check it with a script. Math in the items is KaTeX and follows ISO 80000-2 (backslashes doubled inside template literals).
- Update `README.md` and `docs/design/` in the same change as the code, and remove the old text in that change. A temporary file or switch says when it goes (`REMOVE WHEN:`).
- Open an issue, work on a branch, open a PR that references it, merge when your checks are green, delete the branch on merge. Stage files by explicit path. Always pass `-R owner/repo` to `gh`. Issue, PR and comment bodies have no hard wraps and no em dashes.
- This repository is public: no secrets, token locations or private notes.
