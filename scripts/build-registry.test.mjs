import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_DIR = join(ROOT, "dist", "registry");
const UI_DIR = join(ROOT, "components", "ui");

function runBuild() {
  rmSync(REGISTRY_DIR, { recursive: true, force: true });
  const run = spawnSync(process.execPath, [join(ROOT, "scripts", "build-registry.mjs")], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
}

test("end-to-end: build writes one JSON per component plus index", () => {
  runBuild();
  const names = readdirSync(UI_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  for (const name of names) {
    assert.ok(existsSync(join(REGISTRY_DIR, `${name}.json`)), `${name}.json missing`);
  }
  assert.ok(existsSync(join(REGISTRY_DIR, "index.json")));
});

test("registry items embed component sources and dependencies", () => {
  const button = JSON.parse(readFileSync(join(REGISTRY_DIR, "button.json"), "utf8"));
  assert.equal(button.name, "button");
  assert.equal(button.type, "registry:component");
  assert.ok(button.files.length >= 1);
  for (const file of button.files) {
    assert.ok(file.content.length > 0, `${file.path} has empty content`);
    assert.ok(existsSync(join(ROOT, file.path)), `${file.path} does not exist on disk`);
  }
  assert.deepEqual(button.dependencies, ["class-variance-authority"]);

  const label = JSON.parse(readFileSync(join(REGISTRY_DIR, "label.json"), "utf8"));
  assert.deepEqual(label.dependencies, []);
});

test("stories are excluded from registry files", () => {
  const card = JSON.parse(readFileSync(join(REGISTRY_DIR, "card.json"), "utf8"));
  for (const file of card.files) {
    assert.ok(!file.path.includes(".stories."), "stories must not ship in the registry");
  }
});

test("index.json lists every component", () => {
  const index = JSON.parse(readFileSync(join(REGISTRY_DIR, "index.json"), "utf8"));
  const names = readdirSync(UI_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  assert.deepEqual(
    index.items.map((i) => i.name).sort(),
    names,
  );
});
