# humem.ai

Public website for HumemAI, an open source organization building memory systems for agentic AI.

## Pages

- `/` home, `/projects`, `/news`: the open source projects and the writing around them.
- `/about`, `/contact`: the organization itself. Contributing is described on `/projects`, since every project is open source. HumemAI is an open source organization; the site must not suggest a product, pricing, or hosted tier.
- `/product`, `/pricing`, and `/careers` were removed on 2026-09-16 and redirect permanently (see `next.config.ts`).

## Development

```bash
npm install
npm run dev
```

Before pushing, run `npm run lint` and `npm run build` (the build also runs `scripts/check-spacing-tokens.mjs`, which fails when a child of a prose column carries its own vertical margin). There is no CI besides the Vercel preview, so run them again after any later edit. Check a layout change rendered, not only built: in light and dark mode, on the six devices in `docs/design/test-devices.md` (360 to 1920 px).

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
