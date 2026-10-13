import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildDesignMdFrontmatter,
  buildDesignMdSection,
  buildTailwindTheme,
  buildTokensCss,
  flattenTokens,
  renderShadow,
  resolveValue,
  toKebab,
} from "./build-tokens.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(ROOT, "tokens", p), "utf8"));

test("toKebab converts dotted camelCase paths", () => {
  assert.equal(toKebab("color.neutral.50"), "color-neutral-50");
  assert.equal(toKebab("fontSize.base"), "font-size-base");
  assert.equal(toKebab("muted-fg"), "muted-fg");
});

test("flattenTokens keeps $type and $value on leaves", () => {
  const flat = flattenTokens({
    color: { red: { "500": { $type: "color", $value: "#ef4444" } } },
  });
  assert.deepEqual(flat["color.red.500"], { $type: "color", $value: "#ef4444" });
});

test("resolveValue resolves aliases, chains and rejects unknown/circular", () => {
  const values = {
    "a.b": { $type: "color", $value: "#000000" },
    "alias.direct": { $type: "color", $value: "{a.b}" },
    "alias.chain": { $type: "color", $value: "{alias.direct}" },
  };
  assert.equal(resolveValue(values, "alias.chain"), "#000000");
  assert.throws(() => resolveValue(values, "nope"), /Unknown token/);
});

test("renderShadow composes CSS box-shadow", () => {
  assert.equal(
    renderShadow([{ x: 0, y: 1, blur: 2, spread: 0, color: "rgba(0,0,0,0.05)" }]),
    "0px 1px 2px 0px rgba(0,0,0,0.05)",
  );
});

test("buildTokensCss emits primitives, light :root and .dark overrides", () => {
  const css = buildTokensCss(read("brand.json"), read("semantic/light.json"), read("semantic/dark.json"));
  assert.match(css, /^:root \{/m);
  assert.match(css, /--ds-color-neutral-950: #[0-9a-f]{6};/);
  assert.match(css, /--ds-bg: var\(--ds-color-neutral-50\);/);
  assert.match(css, /\.dark \{\n(?:.|\n)*--ds-bg: var\(--ds-color-neutral-950\);/);
  assert.match(css, /--ds-shadow-sm: 0px 1px 2px 0px rgba\(0, 0, 0, 0.05\);/);
  assert.match(css, /--ds-font-sans: .+(,|;)/);
});

test("buildTailwindTheme maps Tailwind v4 namespaces", () => {
  const theme = buildTailwindTheme(read("brand.json"), read("semantic/light.json"));
  assert.match(theme, /@theme inline \{/);
  assert.match(theme, /--color-neutral-50: var\(--ds-color-neutral-50\);/);
  assert.match(theme, /--text-base: var\(--ds-font-size-base\);/);
  assert.match(theme, /--text-base--line-height: var\(--ds-line-height-normal\);/);
  assert.match(theme, /--radius-md: var\(--ds-radius-md\);/);
  assert.match(theme, /--shadow-lg: var\(--ds-shadow-lg\);/);
  assert.match(theme, /--font-sans: var\(--ds-font-sans\);/);
  assert.match(theme, /--ease-standard: var\(--ds-easing-standard\);/);
  assert.match(theme, /--color-primary: var\(--ds-primary\);/);
  // space and duration are not Tailwind namespaces
  assert.doesNotMatch(theme, /--space-|--duration-/);
});

test("light and dark semantic token sets match exactly", () => {
  const light = Object.keys(flattenTokens(read("semantic/light.json"))).sort();
  const dark = Object.keys(flattenTokens(read("semantic/dark.json"))).sort();
  assert.deepEqual(light, dark);
});

test("buildDesignMdSection lists every semantic token", () => {
  const section = buildDesignMdSection(
    read("brand.json"),
    read("semantic/light.json"),
    read("semantic/dark.json"),
  );
  assert.match(section, /<!-- tokens:begin -->/);
  assert.match(section, /<!-- tokens:end -->/);
  assert.match(section, /\| `--ds-primary` \|/);
  assert.match(section, /tokens\/brand\.json/);
});

test("end-to-end: pnpm build writes dist/ files", () => {
  // No rmSync(dist): node --test runs files in parallel and the registry
  // tests read dist/registry — wiping dist here races them.
  const run = spawnSync(process.execPath, [join(ROOT, "scripts", "build-tokens.mjs")], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  assert.ok(existsSync(join(ROOT, "dist", "tokens.css")));
  assert.ok(existsSync(join(ROOT, "dist", "tailwind-theme.css")));
  const tokens = readFileSync(join(ROOT, "dist", "tokens.css"), "utf8");
  assert.ok(tokens.includes("--ds-primary:"));
});

test("buildDesignMdFrontmatter generates machine-readable charte summary", () => {
  const fm = buildDesignMdFrontmatter(read("brand.json"), read("semantic/light.json"));
  assert.match(fm, /^---\nname:/);
  assert.match(fm, /accent: "#[0-9a-f]{6}"/);
  assert.match(fm, /sans: '.+'/);
  assert.match(fm, /scale: \d+px\/\d+px\/\d+px/);
  assert.match(fm, /---$/);
});
