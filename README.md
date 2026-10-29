# humem.ai

Public website for HumemAI, an open source organization building memory systems for agentic AI.

## Pages

- `/` home, `/software`, `/research`, `/news`: the open source software, the research, and the writing around them. Software is what you install or run; Research is what you read and cite. Each project has one page, under `/software/<slug>` or `/research/<slug>`, and a project can also have a card in the other section (`crossListing`). The map from slug to section is `src/lib/projects/sections.ts`. The order of the keys in that file is the order of the cards.
- `/about`, `/contact`: the organization itself. Contributing is described on `/software` and `/research`, since everything there is open. HumemAI is an open source organization; the site must not suggest a product, pricing, or hosted tier.
- `/product`, `/pricing`, and `/careers` were removed on 2026-09-16 and redirect permanently (see `next.config.ts`).

## Development

```bash
npm install
npm run dev
```

Before pushing a change to pages, links or layout, run `npm run precheck`. It takes about 3.5 minutes and runs the lint and a production build, then checks every URL in `scripts/legacy-urls.json` (the ledger of published URLs: each must answer 308 to its new page in one hop), every URL in the sitemap, and every sitemap page on the six test devices (the core pages also in the dark scheme) for horizontal overflow, console errors, exactly one h1, broken images, images without an alt attribute, and cropped illustrations (an image or figure with one ground color in its corners whose content the box it is shown in cuts off). It needs Chromium (set `PLAYWRIGHT_CHROME`, have `~/.cache/ms-playwright/chromium-1248`, or run `uvx --from playwright==1.55.0 playwright install chromium`). For smaller changes, run `npm run lint` and `npm run build` (the build also runs `scripts/check-spacing-tokens.mjs`, which fails when a child of a prose column carries its own vertical margin, `scripts/check-item-tables.mjs`, which fails on a markdown table in a project page, and `scripts/check-summary-length.mjs`, which fails when a project card summary is outside 20 to 28 words or 130 to 170 characters). The same `npm run precheck` runs on every pull request that touches `src/`, `public/`, `scripts/`, the dependencies or the config (`.github/workflows/precheck.yml`), so a red check blocks the merge; run it locally first so the PR starts green, and again after any later edit. Check a layout change rendered, not only built: in light and dark mode, on the six devices in `docs/design/test-devices.md` (360 to 1920 px).

## DBBench payload

The DBBench pages (`/research/dbbench` and `/research/dbbench/<lane>`) read one file, `src/data/dbbench-benchmarks.json`, written by `refresh_web_page.py` in `humemai/arcadedb-embedded-python` (`benchmarks/experiments`), which also checks that every `tableId` in `src/lib/dbbench/lanes.ts` has rows. The reader is `src/lib/dbbench/payload.ts`. While the file is absent, or carries no row, the pages show the method and the lanes and no number. With the file, the project page shows the machine, the shared conditions and each lane's first table, and a lane page shows the lane's tables; a table the payload does not carry is left out. A served ArcadeDB row that has a `client_twin` gets a second, labelled row under it (the same cell through the benchmark's own lean HTTP client, a sensitivity that is not part of the headline). Precision `pq` rows use the Precision column like any other. The robots tag still follows `DBBENCH_INDEXABLE` in `src/lib/dbbench/config.ts`.

## Production

```bash
npm run build
npm run start
```

## Design

The brand comes from [humemai/design-system](https://github.com/humemai/design-system): oxblood `#892122` (rose `#E88E8B` in dark mode), Newsreader headlines, Schibsted Grotesk for everything else, DM Mono for code, and the tile icon. A copy is vendored into `public/brand/`; don't edit it there. `src/app/globals.css` imports its `tokens.css` and maps the site's own variable names (`--accent`, `--foreground`, ...) onto the `--hm-*` tokens, `src/app/layout.tsx` loads the three faces with `next/font`, and the header, footer and favicon use its logo files. To update, change the design system, then from its checkout run `scripts/vendor-into.sh ../humem.ai/public/brand`; `public/brand/verify.sh` checks the copy.

Website illustration prompts live in `docs/design/image-prompts.md`. The illustrations use the same palette; `scripts/recolor.py` in the design system converts an image drawn in the old teal and coral.
Chrome DevTools test devices for responsive checks live in `docs/design/test-devices.md`.
The page widths (the 1180px frame, the 736px text column, and when tables and figures leave it) are in `docs/design/layout-widths.md`.
