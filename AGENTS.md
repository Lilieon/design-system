# AGENTS.md

Instructions for AI coding agents working in this repository.

## What this repository is

A personal design system: DTCG design tokens, Angular + Tailwind CSS v4
components, a shadcn-style registry, and AI agent integrations (DESIGN.md,
skill, MCP). Everything is in English.

## Commands

| Command | What it does |
| ------- | ------------ |
| `pnpm build` | Build tokens to `dist/` (CSS variables + Tailwind theme), then the Angular playground |
| `pnpm build:tokens` | Build tokens only (`dist/tokens.css`, `dist/tailwind-theme.css`, DESIGN.md section) |
| `pnpm build:playground` | Build the Angular playground app |
| `pnpm build:storybook` | Build Storybook to `dist/storybook` |
| `pnpm test` | Run all tests (token scripts + Angular components) |
| `pnpm test:scripts` | Run token script tests only (`node --test`) |
| `pnpm test:components` | Run Angular component tests only (vitest) |
| `pnpm test:mcp` | Smoke-test the MCP server (lists tools, calls each) |
| `pnpm start` | Serve the playground on localhost |
| `pnpm storybook` | Serve Storybook on port 6006 |
| `pnpm mcp` | Run the design system MCP server (stdio) |

`pnpm build:tokens` must run before the playground or Storybook — their CSS
imports the generated files from `dist/`.

## Conventions

- Conventional, granular commits (`feat:`, `fix:`, `docs:`, `chore:`,
  `test:`, `ci:`), one logical change per commit.
- Tokens are the only source of visual values: components never hardcode
  colors, spacing, radii, shadows or durations — they use semantic CSS
  variables generated from `tokens/`.
- Components are copy-in Angular standalone components (no npm package).
- Record significant decisions as MADR-style ADRs in `docs/adr/`.
- Validate (build + tests) before every commit.
