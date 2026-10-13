#!/usr/bin/env node
// Checks WCAG AA contrast (>= 4.5:1) on every semantic fg/bg token pair,
// in both light and dark themes. Fails the build (exit 1) on any violation.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { flattenTokens, resolveValue } from "./build-tokens.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AA = 4.5;

export function relativeLuminance(hex) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA, hexB) {
  const [a, b] = [relativeLuminance(hexA), relativeLuminance(hexB)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// A semantic key pairs with "<key without -fg>" (fg/bg, muted-fg/muted, …).
export function checkTokens(brand, light, dark) {
  const brandFlat = flattenTokens(brand);
  const results = [];
  for (const [mode, semantic] of [["light", light], ["dark", dark]]) {
    const flat = flattenTokens(semantic);
    const resolved = Object.fromEntries(
      Object.entries(flat).map(([key, entry]) => [key, resolveValue(brandFlat, entry.$value.slice(1, -1))]),
    );
    for (const key of Object.keys(resolved)) {
      const base = key === "fg" ? "bg" : key.endsWith("-fg") ? key.slice(0, -3) : null;
      if (!base || !(base in resolved)) continue;
      const fg = resolved[key];
      const bg = resolved[base];
      results.push({
        pair: `${key}/${base}`,
        mode,
        ratio: Math.round(contrastRatio(fg, bg) * 100) / 100,
        pass: contrastRatio(fg, bg) >= AA,
      });
    }
  }
  return results;
}

function main() {
  const read = (p) => JSON.parse(readFileSync(join(ROOT, "tokens", p), "utf8"));
  const results = checkTokens(read("brand.json"), read("semantic/light.json"), read("semantic/dark.json"));
  const failures = results.filter((r) => !r.pass);
  for (const r of failures) {
    console.error(`FAIL ${r.mode} ${r.pair}: ${r.ratio}:1 (needs ${AA}:1)`);
  }
  console.log(`Contrast: ${results.length - failures.length}/${results.length} pairs pass AA (${AA}:1)`);
  process.exit(failures.length ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
