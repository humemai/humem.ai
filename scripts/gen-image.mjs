#!/usr/bin/env node
// gen-image.mjs <id> [--n 2] [--model google/gemini-3-pro-image] [--dry]
// Generates a house-theme illustration through OpenRouter, audits the pixels, finishes it and writes it to the spec's `out` path.
// Specs live in docs/design/image-specs.json: { id, out, aspect, purpose, show, alt }. The prompt is built from the house template
// (docs/design/image-prompts.md, "House theme"), and the exact prompt that produced each shipped image is stored in
// docs/design/generated-prompts/<id>.txt, so a stored prompt is always the one that made the image.
// The key is read from OPENROUTER_API_KEY, or from the file named by OPENROUTER_KEY_FILE (never printed, never written).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith("--"));
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const N = Number(opt("n", 2));
const MODEL = opt("model", "google/gemini-3-pro-image");
const DRY = args.includes("--dry");

// The palette (house theme 2026-09-27): ground, ink, accent. Charcoal only where a spec asks for a rejected element.
const GROUND = [0xfa, 0xf8, 0xf5], INK = [0x89, 0x21, 0x22], ACCENT = [0xe8, 0x8e, 0x8b], CHARCOAL = [0x2e, 0x28, 0x27];
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
// Distance from a pixel to the ground-to-T segment: an anti-aliased edge between the ground and a palette colour lies on it, a drifting hue does not.
const segDist = (p, T) => {
  const v = [T[0] - GROUND[0], T[1] - GROUND[1], T[2] - GROUND[2]], w = [p[0] - GROUND[0], p[1] - GROUND[1], p[2] - GROUND[2]];
  const t = Math.max(0, Math.min(1, (w[0] * v[0] + w[1] * v[1] + w[2] * v[2]) / (v[0] * v[0] + v[1] * v[1] + v[2] * v[2])));
  return Math.hypot(w[0] - t * v[0], w[1] - t * v[1], w[2] - t * v[2]);
};

function prompt(spec) {
  const ratio = spec.aspect === "1:1" ? "1:1 square" : `${spec.aspect} landscape`;
  const charcoal = spec.charcoal ? `\n- the single rejected or discarded element only: soft charcoal #2e2827` : "";
  return `Generate a ${ratio} illustration for the HumemAI website.

Purpose:
${spec.purpose}

What to show:
${spec.show}

Style:
Flat minimal diagram, like bold clean vector art someone drew with intent. Thick even strokes, generous negative space, chunky and confident rather than thin and wiry. If it could not be redrawn by hand in two minutes, it is too detailed.

Fills:
Every small shape is filled solid with flat color: circles, dots, capsules, pills, squares and diamonds are solid, never hollow rings or empty outlines. Only a large container, meaning a shape whose purpose is to enclose other shapes, may be drawn as a thick outline with the background showing through it.

Palette, exactly these ${spec.charcoal ? "four" : "three"} colors and nothing else:
- background: warm off-white #faf8f5
- every shape and every stroke: deep oxblood #892122
- the single most important element only: soft rose #e88e8b${charcoal}
Do not use black, grey, white, or any other color anywhere. No gradients, no lighting effects, no shadows, no texture.

Content discipline:
Draw only the elements listed under "What to show" and nothing else. Do not add decorative marks, stray dots, crosses, sparkles, arrows, badges, or any extra shape that was not requested. Empty background is correct and desirable.

Composition:
Center-weighted and balanced, with equal quiet margin on all four sides. Nothing important near any edge.

Absolutely no text, letters, numbers, or letter-like glyph rows anywhere in the image. Shapes that suggest documents or tables must be plain empty outlines, never filled with writing-like lines.

Aspect ratio: ${spec.aspect === "1:1" ? "1:1 square" : spec.aspect + " landscape"}.`;
}

function key() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY.trim();
  if (process.env.OPENROUTER_KEY_FILE) return fs.readFileSync(process.env.OPENROUTER_KEY_FILE.replace(/^~/, os.homedir()), "utf8").trim();
  throw new Error("set OPENROUTER_API_KEY, or OPENROUTER_KEY_FILE to a local file that holds the key");
}

async function generate(text) {
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages: [{ role: "user", content: text }], modalities: ["image", "text"] }),
  });
  if (!r.ok) throw new Error(`OpenRouter ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const url = j.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!url) throw new Error(`no image in the response: ${JSON.stringify(j).slice(0, 300)}`);
  return Buffer.from(url.split(",")[1], "base64");
}

// Pixel audit: share of non-ground pixels that are off-palette, and of charcoal pixels (the stray-charcoal check).
async function audit(buf, allowCharcoal) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let content = 0, off = 0, charcoal = 0;
  for (let i = 0; i < data.length; i += 3) {
    const p = [data[i], data[i + 1], data[i + 2]];
    if (dist(p, GROUND) < 24) continue;
    content++;
    const dInk = segDist(p, INK), dAcc = segDist(p, ACCENT), dCh = segDist(p, CHARCOAL);
    if (dCh < 25 && dCh < dInk && dCh < dAcc && dist(p, CHARCOAL) < 60) charcoal++;
    else if (Math.min(dInk, dAcc) > 30) off++;   // anti-aliased edges lie on the ground-to-colour segments; a drifted hue does not
  }
  return { content, offPct: (100 * off) / Math.max(content, 1), charcoalPct: allowCharcoal ? 0 : (100 * charcoal) / Math.max(content, 1), width: info.width, height: info.height };
}


// Snap the generator's colours to the house palette. The model's ink and accent drift (its oxblood came out as about 104,16,8 against #892122), so the two
// dominant non-ground colours of the image are found, every pixel is projected onto the ground-to-dominant line of the nearer one, and rebuilt on the same
// line towards the exact palette colour. Anti-aliased edges keep their blend; hues and flat fills land on #892122 and #e88e8b exactly.
function snapPalette(data) {
  const bins = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const p = [data[i], data[i + 1], data[i + 2]];
    if (dist(p, GROUND) < 40) continue;
    const k = `${p[0] >> 3},${p[1] >> 3},${p[2] >> 3}`;
    bins.set(k, (bins.get(k) || 0) + 1);
  }
  const top = [...bins.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => [k.split(",").map((x) => (Number(x) << 3) + 4), v]);
  if (!top.length) return data;
  const total = top.reduce((a, b) => a + b[1], 0);
  const D = top[0][0];
  const A = (top.find(([c, v]) => dist(c, D) > 80 && v > 0.001 * total) || [ACCENT])[0];
  const proj = (p, T) => { const v = [T[0] - GROUND[0], T[1] - GROUND[1], T[2] - GROUND[2]]; const w = [p[0] - GROUND[0], p[1] - GROUND[1], p[2] - GROUND[2]];
    const t = Math.max(0, Math.min(1, (w[0] * v[0] + w[1] * v[1] + w[2] * v[2]) / (v[0] * v[0] + v[1] * v[1] + v[2] * v[2])));
    return [t, Math.hypot(w[0] - t * v[0], w[1] - t * v[1], w[2] - t * v[2])]; };
  for (let i = 0; i < data.length; i += 3) {
    const p = [data[i], data[i + 1], data[i + 2]];
    if (dist(p, GROUND) < 24) { data[i] = GROUND[0]; data[i + 1] = GROUND[1]; data[i + 2] = GROUND[2]; continue; }
    const [tD, rD] = proj(p, D), [tA, rA] = proj(p, A);
    const [t, T] = rD <= rA ? [tD, INK] : [tA, ACCENT];
    for (let c = 0; c < 3; c++) data[i + c] = Math.round(GROUND[c] + t * (T[c] - GROUND[c]));
  }
  return data;
}

// Finisher: crop to the true content bounding box, set the ground to exactly #faf8f5, recentre, and fit the content inside a box that
// survives both crops the site applies (5:6 keeps 83% of the width, 16:11 keeps 69% of the height) on a square canvas of `size`.
async function finish(buf, size = 1254) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width, y0 = info.height, x1 = -1, y1 = -1;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 3;
    if (dist([data[i], data[i + 1], data[i + 2]], GROUND) >= 24) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  }
  if (x1 < 0) throw new Error("the image has no content");
  const crop = await sharp(buf).extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).toBuffer();
  const boxW = Math.floor(size * 0.83), boxH = Math.floor(size * 0.69);
  const fitted = await sharp(crop).resize({ width: boxW, height: boxH, fit: "inside" }).toBuffer({ resolveWithObject: true });
  // snap the colours to the palette (ground exactly #faf8f5, ink #892122, accent #e88e8b)
  const raw = await sharp(fitted.data).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  snapPalette(raw.data);
  const content = await sharp(raw.data, { raw: { width: raw.info.width, height: raw.info.height, channels: 3 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 3, background: { r: GROUND[0], g: GROUND[1], b: GROUND[2] } } })
    .composite([{ input: content, left: Math.floor((size - raw.info.width) / 2), top: Math.floor((size - raw.info.height) / 2) }]).png({ compressionLevel: 9 }).toBuffer();
}

const specs = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/design/image-specs.json"), "utf8"));
const spec = specs.find((s) => s.id === id);
if (!spec) { console.error(`unknown id ${id}; known: ${specs.map((s) => s.id).join(", ")}`); process.exit(2); }
const text = prompt(spec);
if (DRY) { console.log(text); process.exit(0); }
const out = path.join(ROOT, spec.out);
fs.mkdirSync(path.dirname(out), { recursive: true });
let best = null;
for (let k = 1; k <= N; k++) {
  const raw = await generate(text);
  const a = await audit(raw, !!spec.charcoal);
  console.log(`candidate ${k}: ${a.width}x${a.height}, off-palette ${a.offPct.toFixed(2)}%, stray charcoal ${a.charcoalPct.toFixed(2)}%`);
  const score = a.charcoalPct;   // the raw hue drift is the same for every candidate and the finisher removes it; stray elements are what differs
  if (!best || score < best.score) best = { raw, score, a };
}
const finished = await finish(best.raw);
const after = await audit(finished, !!spec.charcoal);
console.log(`finished: off-palette ${after.offPct.toFixed(2)}%, stray charcoal ${after.charcoalPct.toFixed(2)}%`);
fs.writeFileSync(out, finished);
fs.mkdirSync(path.join(ROOT, "docs/design/generated-prompts"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "docs/design/generated-prompts", `${id}.txt`), `${text}\n\n[model ${MODEL}, ${N} candidates, best audit: off-palette ${best.a.offPct.toFixed(2)}%, stray charcoal ${best.a.charcoalPct.toFixed(2)}%]\nAlt text: ${spec.alt}\n`);
console.log(`wrote ${spec.out}`);
