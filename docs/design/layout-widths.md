# Layout widths

Two widths shape the long-form pages (a project, a news post). Everything else is a rule about which of them a block uses.

| Name | Value | Variable | What uses it |
|---|---|---|---|
| Frame | 1180px | `--site-shell-max` | The header pill, the section nav, the footer, and the hero and card grids |
| Text column | 46rem (736px) | `--site-editorial-copy-max` | Paragraphs, headings, figures, and the captions and notes of tables |

Both shrink with the screen. Below 720px they are the viewport less 1rem each side (`--site-shell-gutter-mobile`), from 720px up less 1.5rem each side (`--site-shell-gutter-desktop`).

## Benchmark tables leave the text column

From 720px up a benchmark table is as wide as its columns need: never narrower than the text column, never wider than the screen less the 1.5rem gutters, and centred on the column. A table that fits in 736px looks the same as the paragraphs around it. A wider one extends past the text, and on a large screen past the header pill. Its caption, notes, and build list stay in the column.

Headers wrap only when the table is out of room. They never break inside a hyphenated word ("NEW-ORDER", "1-HOP"), and the direction arrow stays with the word before it. Below 40rem (640px) each row becomes its own labelled card.

The rule lives in `.benchmarkScroll` in `src/components/editorial-sections.module.css`.

Measured on `/projects/arcadedb` on 2026-10-02 (12 tables, #8):

| Viewport | Frame | Text column | Tables that scroll, before | After |
|---|---|---|---|---|
| 360 | 328 | 328 | 0 (cards) | 0 (cards) |
| 390 | 358 | 358 | 0 (cards) | 0 (cards) |
| 768 | 720 | 720 | 10 | 9 |
| 984 | 936 | 736 | 10 | 7 |
| 1280 | 1180 | 736 | 10 | 4 |
| 1920 | 1180 | 736 | 10 | 0 |

At 768 the text column is already the screen less its gutters, so only header wrapping helps there.

**Why the limit is the screen, not the frame.** With a 1180px limit, 4 of the 12 tables still scrolled at every size from 1280 to 2560. With the screen as the limit, all of them fit from 1536 up.

## Prose stays in the text column

Line length. The design system's rule is about 70 to 85 characters with a median above 80 on desktop (its `docs/decisions.md`, "Line length", 2026-10-03; `--hm-measure` stays 68ch, which holds about 80). The text column is 736px and prose runs about 83 to 87 characters per line, inside that rule (#9). Long-form pages of other research-lab sites, measured on 2026-10-03 at a 1916px viewport, run 70 to 85 (Anthropic 71, DeepMind 70, OpenAI 81, Meta 83, World Labs 85); World Labs is the benchmark, a 720px column at 17px. Narrowing to 62ch (median 71) was tried and not kept. Body text takes `--hm-text-base` (16px, 17px from 1000px up), which is what World Labs sets; notes and captions keep their smaller sizes. The column must still not widen to make room for tables, which is why they leave it instead.

## Figures stay in the text column

An image scales to its box instead of scrolling, so a wider box only makes it bigger. The project figures are drawn at paper size (about 320px for a single-column chart) and are already scaled up to fit 736px. Give a figure more width only if it is drawn wide, and then use the same rule as the tables.

## Checking

Review at the six sizes in `test-devices.md`. On a page with tables, check that the page itself never scrolls sideways (`document.documentElement.scrollWidth` equals the viewport width) and count the tables whose `.benchmarkScroll` still scrolls.
