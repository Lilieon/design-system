# ADR 0001 — Choice of stack

- Status: accepted
- Date: 2026-10-12
- Deciders: Lilian

## Context

I need a personal design system, published as a public GitHub repository, to
unify the UX/UI of all my websites and web applications. My applications are
built with Angular and Tailwind CSS v4. I also want AI coding agents to build
UIs that consistently follow the system (DESIGN.md, registry, skill, MCP).

## Options considered

1. **Classic npm package** — publish components as an Angular library on npm.
   - Pros: versioned installs, standard Angular distribution.
   - Cons: heavy release workflow, styling locked behind a dependency, hard to
     customize per app, the shadcn ecosystem has moved to copy-in distribution.
2. **Copy-in distribution (shadcn-style)** — components live in this repo as
   plain source files; apps copy them in via a registry (static JSON served by
   GitHub Pages) or manually.
   - Pros: full code ownership per app, no dependency to maintain, registry is
     AI-agent-friendly, matches the dominant 2025-2026 practice.
   - Cons: updates require re-copying; no strict version locking.
3. **Multi-framework (tokens only)** — ship only DTCG tokens + DESIGN.md,
   components per framework later.
   - Pros: simplest, framework-agnostic.
   - Cons: does not unify components, which is the main pain point.

## Decision

Option 2 — copy-in distribution (shadcn-style):

- Tokens as W3C DTCG JSON in `tokens/`, built by a Node script to CSS custom
  properties (`:root` / `.dark`) and a Tailwind CSS v4 `@theme` file.
- Components as Angular standalone components (v20+) using signals and
  `class-variance-authority` (plain TS, framework-agnostic) for variants,
  styled with Tailwind CSS v4 utility classes.
- Identity defined from scratch: sober baseline (inspired by Linear/Vercel
  patterns), light + dark themes, accessibility-first (visible focus rings,
  WCAG contrast).
- All repository artifacts (README, commits, docs) in English.

## Consequences

- Apps consume components by copying files (registry or manual) and importing
  the generated tokens CSS.
- Component updates propagate through the registry, not npm versions.
- A headless primitives base (spartan brain or Angular CDK) will be decided in
  a later ADR when interactive components (dialog, select…) are needed.
