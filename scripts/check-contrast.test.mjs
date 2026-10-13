import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { checkTokens, contrastRatio, relativeLuminance } from "./check-contrast.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(ROOT, "tokens", p), "utf8"));

test("relativeLuminance and contrastRatio match WCAG reference values", () => {
  assert.equal(Math.round(relativeLuminance("#ffffff") * 1e6), 1e6);
  assert.equal(relativeLuminance("#000000"), 0);
  assert.equal(Math.round(contrastRatio("#ffffff", "#000000")), 21);
  assert.equal(Math.round(contrastRatio("#767676", "#ffffff") * 100) / 100, 4.54);
});

test("checkTokens reports every -fg pair in both themes", () => {
  const results = checkTokens(read("brand.json"), read("semantic/light.json"), read("semantic/dark.json"));
  const keys = results.map((r) => `${r.mode}:${r.pair}`).sort();
  for (const mode of ["light", "dark"]) {
    for (const pair of ["fg/bg", "muted-fg/muted", "accent-fg/accent", "primary-fg/primary"]) {
      assert.ok(keys.includes(`${mode}:${pair}`), `missing ${mode}:${pair}`);
    }
  }
});

test("charte semantic tokens all pass WCAG AA", () => {
  const results = checkTokens(read("brand.json"), read("semantic/light.json"), read("semantic/dark.json"));
  const failures = results.filter((r) => !r.pass);
  assert.deepEqual(failures.map((f) => `${f.mode} ${f.pair}: ${f.ratio}`), []);
});
