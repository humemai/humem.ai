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

A prose line is easiest to read at 60 to 75 characters (the design system's `--hm-measure`). At 736px and 16px the page already runs about 90, so the text column must not widen to make room for tables. Narrowing prose to the measure is tracked in #9.

## Figures stay in the text column

An image scales to its box instead of scrolling, so a wider box only makes it bigger. The project figures are drawn at paper size (about 320px for a single-column chart) and are already scaled up to fit 736px. Give a figure more width only if it is drawn wide, and then use the same rule as the tables.

## Checking

Review at the six sizes in `test-devices.md`. On a page with tables, check that the page itself never scrolls sideways (`document.documentElement.scrollWidth` equals the viewport width) and count the tables whose `.benchmarkScroll` still scrolls.
