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

## Production

```bash
npm run build
npm run start
```

## Design Assets

Website illustration prompts live in `docs/design/image-prompts.md`.
Chrome DevTools test devices for responsive checks live in `docs/design/test-devices.md`.
