# ADR 0002 — Component distribution: shadcn registry, skill and MCP

- Status: accepted
- Date: 2026-10-12
- Deciders: Lilian

## Context

Components are copy-in (ADR 0001). Consumers (my Angular apps and AI coding
agents) need a reliable way to install them together with the generated token
CSS. The 2025-2026 ecosystem standard is the shadcn registry format, consumed
by the official shadcn CLI and understood by AI agents.

## Options considered

1. **shadcn-style registry served by GitHub Pages** — static JSON files built
   from `components/ui/`; install via `npx shadcn add <url>` or by copying.
2. **npm package** — rejected in ADR 0001 (version lock, no code ownership).
3. **Manual copy only** — works, but error-prone and invisible to agents.

## Decision

1. **Registry** (`scripts/build-registry.mjs` → `dist/registry/*.json`): one
   item per component with embedded file contents and declared dependencies;
   `index.json` catalogs everything. Served by GitHub Pages alongside the docs.
2. **Tokens**: consumers copy `dist/tokens.css` + `dist/tailwind-theme.css`
   (or the DTCG source) into their styles; documented in README and SKILL.md.
3. **Agent skill** (SKILL.md, later phase): when to apply the system and how
   to install it, for AI coding agents.
4. **MCP server** (final phase): dynamic access — `list-tokens`,
   `get-tokens`, `get-component`, `review-ui`.

## Spike result (validated 2026-10-12)

Installed `dist/registry/button.json` into a scratch project with the official
CLI (`npx shadcn@4.21.4 add <local-registry-json>`):

- the item schema (files with embedded `content`, `dependencies`) is accepted,
- the component file is written byte-identical to the source,
- `class-variance-authority` is installed automatically.

Angular is not a first-class target of the CLI (React-oriented aliases), but
since the registry item ships plain source files, installation into an Angular
project is a verbatim copy — which is the point of copy-in distribution.

## Consequences

- Publishing = pushing to GitHub; the Pages workflow serves the registry.
- Component updates propagate by re-running the install (with `--overwrite`)
  or re-copying; no semver contract.
- Stories and specs are excluded from registry items.
