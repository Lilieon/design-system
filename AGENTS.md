# AGENTS.md

Instructions for AI coding agents working in this repository.

## What this repository is

A personal design system: DTCG design tokens, Angular + Tailwind CSS v4
components, a shadcn-style registry, and AI agent integrations (DESIGN.md,
skill, MCP). Everything is in English.

## Commands

| Command | What it does |
| ------- | ------------ |
| `pnpm build` | Build tokens to `dist/` (CSS variables + Tailwind theme) |
| `pnpm test` | Run script unit tests (`node --test`) |

This table grows as phases land (Angular playground, Storybook, registry, MCP).

## Conventions

- Conventional, granular commits (`feat:`, `fix:`, `docs:`, `chore:`,
  `test:`, `ci:`), one logical change per commit.
- Tokens are the only source of visual values: components never hardcode
  colors, spacing, radii, shadows or durations — they use semantic CSS
  variables generated from `tokens/`.
- Components are copy-in Angular standalone components (no npm package).
- Record significant decisions as MADR-style ADRs in `docs/adr/`.
- Validate (build + tests) before every commit.
