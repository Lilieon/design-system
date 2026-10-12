#!/usr/bin/env node
// Design system MCP server (stdio).
// Gives AI coding agents dynamic access to the design system: token catalog,
// resolved token values, component registry items and a UI review checklist.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { flattenTokens, resolveValue, renderValue, toKebab } from "../scripts/build-tokens.mjs";
import { buildRegistryItem } from "../scripts/build-registry.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS_DIR = join(ROOT, "tokens");
const UI_DIR = join(ROOT, "components", "ui");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function primitivesFlat() {
  return flattenTokens(readJson(join(TOKENS_DIR, "primitives.json")));
}

function resolvedSemantic(file) {
  const primitives = primitivesFlat();
  const flat = flattenTokens(readJson(join(TOKENS_DIR, "semantic", `${file}.json`)));
  const out = {};
  for (const [key, entry] of Object.entries(flat)) {
    const value = resolveValue(primitives, entry.$value.slice(1, -1));
    out[`--ds-${toKebab(key)}`] = renderValue(entry.$type, value);
  }
  return out;
}

function listComponents() {
  return readdirSync(UI_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

const server = new McpServer({
  name: "design-system",
  version: "0.1.0",
});

server.registerTool(
  "list-tokens",
  {
    title: "List token categories",
    description:
      "List the design system token categories (primitives and semantic themes) with their value counts. Use this first to discover what get-tokens can return.",
    inputSchema: {},
  },
  async () => {
    const primitives = primitivesFlat();
    const groups = {};
    for (const path of Object.keys(primitives)) {
      const group = path.split(".")[0];
      groups[group] = (groups[group] ?? 0) + 1;
    }
    const light = Object.keys(flattenTokens(readJson(join(TOKENS_DIR, "semantic", "light.json")))).length;
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              primitives: groups,
              semantic: {
                light: { variables: light, description: "applied on :root" },
                dark: { variables: light, description: "applied under the .dark class" },
              },
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.registerTool(
  "get-tokens",
  {
    title: "Get token values",
    description:
      "Get resolved token values. category: 'primitives' (raw scales), 'semantic-light' or 'semantic-dark' (resolved CSS variables --ds-*). Semantic tokens are also exposed as Tailwind utilities (bg-primary, text-muted-foreground, …).",
    inputSchema: {
      category: z.enum(["primitives", "semantic-light", "semantic-dark"]),
    },
  },
  async ({ category }) => {
    let values;
    if (category === "primitives") {
      const flat = primitivesFlat();
      values = Object.fromEntries(
        Object.entries(flat).map(([path, entry]) => [
          `--ds-${toKebab(path)}`,
          renderValue(entry.$type, resolveValue(flat, path)),
        ]),
      );
    } else {
      values = resolvedSemantic(category === "semantic-light" ? "light" : "dark");
    }
    return { content: [{ type: "text", text: JSON.stringify(values, null, 2) }] };
  },
);

server.registerTool(
  "get-component",
  {
    title: "Get component registry item",
    description:
      "Get the shadcn-style registry item for one component (embedded source files + dependencies). Components: alert, badge, button, card, input, label. Install with: npx shadcn add <registry-url>/<name>.json",
    inputSchema: {
      name: z.string().describe("Component name, e.g. 'button'"),
    },
  },
  async ({ name }) => {
    const available = listComponents();
    if (!available.includes(name)) {
      return {
        content: [{ type: "text", text: `Unknown component "${name}". Available: ${available.join(", ")}` }],
        isError: true,
      };
    }
    const item = buildRegistryItem(name);
    return { content: [{ type: "text", text: JSON.stringify(item, null, 2) }] };
  },
);

const REVIEW_CHECKLIST = [
  {
    area: "Accessibility (WCAG AA)",
    checks: [
      "Contrast: text meets 4.5:1 (3:1 for large text) in BOTH light and dark themes",
      "Every interactive element has a visible focus state (focus-visible:ring-*, never a removed outline)",
      "Full keyboard support: logical tab order, Enter/Space activation, Escape closes overlays",
      "Labels bound to inputs (for/id or aria-label); icon-only buttons have aria-label",
      "Touch targets are at least 40px tall",
      "prefers-reduced-motion respected for non-essential animation",
    ],
  },
  {
    area: "Visual hierarchy",
    checks: [
      "Exactly ONE primary action per view; others are secondary/outline/ghost",
      "Destructive actions use the destructive variant, never red text alone",
      "Text hierarchy: text-foreground for body, text-muted-foreground for secondary; never below 12px",
      "Headings use semibold and the type scale (16/18/20/24/30/36px)",
    ],
  },
  {
    area: "Tokens and consistency",
    checks: [
      "No hardcoded colors, spacing, radii, shadows or durations — only semantic tokens / utilities",
      "4px spacing rhythm (--ds-space-*); page gutters at least 24px",
      "Cards use rounded-lg, border-border, bg-card",
      "Motion: 120-280ms, standard easing, opacity/transform only",
    ],
  },
  {
    area: "States and robustness",
    checks: [
      "Empty, loading and error states are designed, not an afterthought",
      "Dark mode verified (component works under the .dark class)",
      "Disabled state is visually distinct and non-interactive",
    ],
  },
];

server.registerTool(
  "review-ui",
  {
    title: "UI review checklist",
    description:
      "Get the design system review checklist (WCAG accessibility, visual hierarchy, token consistency, states) to critique and fix generated UI before delivery. Optionally pass the component or page code to review.",
    inputSchema: {
      code: z.string().optional().describe("Optional code or description of the UI to review"),
    },
  },
  async ({ code }) => {
    const text =
      (code ? `Review target:\n${code}\n\n` : "") +
      REVIEW_CHECKLIST.map(
        (section) => `## ${section.area}\n` + section.checks.map((c) => `- [ ] ${c}`).join("\n"),
      ).join("\n\n") +
      "\n\nFix every failing check, then re-verify before delivering.";
    return { content: [{ type: "text", text }] };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
