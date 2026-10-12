#!/usr/bin/env node
// Builds a shadcn-style registry from components/ui/ into dist/registry/:
//   dist/registry/index.json       — catalog of all components
//   dist/registry/<name>.json      — one installable item per component
// Served by GitHub Pages; install with the shadcn CLI or by copying the files.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const UI_DIR = join(ROOT, "components", "ui");
const OUT_DIR = join(ROOT, "dist", "registry");

const DESCRIPTIONS = {
  alert: "Callout for user attention with semantic variants (info, success, warning, destructive).",
  badge: "Small status descriptor with semantic variants.",
  button: "Attribute component styling native <button> and <a> elements (variants, sizes).",
  card: "Card container with header, title, description, content and footer parts.",
  input: "Attribute component styling native <input> elements with focus and invalid states.",
  label: "Form label bound to inputs through the native for attribute.",
};

function listComponents() {
  return readdirSync(UI_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export function buildRegistryItem(name) {
  const dir = join(UI_DIR, name);
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".stories.ts"))
    .sort()
    .map((f) => ({
      path: `components/ui/${name}/${f}`,
      type: "registry:component",
      content: readFileSync(join(dir, f), "utf8"),
    }));

  if (files.length === 0) throw new Error(`No component sources found for "${name}"`);

  const source = files.map((f) => f.content).join("\n");
  const dependencies = [];
  if (source.includes("class-variance-authority")) dependencies.push("class-variance-authority");

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:component",
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: DESCRIPTIONS[name] ?? "",
    files,
    dependencies,
  };
}

export function buildRegistryIndex(items) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "design-system",
    homepage: "https://lilieon.github.io/design-system/",
    items: items.map(({ name, title, description, type }) => ({ name, title, description, type })),
  };
}

function main() {
  const names = listComponents();
  mkdirSync(OUT_DIR, { recursive: true });

  const items = [];
  for (const name of names) {
    const item = buildRegistryItem(name);
    items.push(item);
    writeFileSync(join(OUT_DIR, `${name}.json`), JSON.stringify(item, null, 2) + "\n");
  }
  writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify(buildRegistryIndex(items), null, 2) + "\n");
  console.log(`Built dist/registry with ${items.length} items: ${names.join(", ")}`);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main();
}
