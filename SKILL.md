---
name: design-system
description: Applies Lilieon's personal design system (DTCG tokens, Angular + Tailwind CSS v4 copy-in components) when building or reviewing UI in any project. Use for any UI task — creating pages or components, styling, theming, dark mode, or reviewing visual consistency and accessibility.
---

# Design System

Lilian's design system unifies the UX/UI of all his websites and web
applications. Stack: Angular (standalone components) + Tailwind CSS v4.
Everything is driven by DTCG design tokens.

## When to apply

Apply whenever you create, modify or review UI in one of Lilian's projects —
new pages, new components, styling changes, theming, dark mode, or UI reviews.

## Process

### 1. Read the rules

Read `DESIGN.md` from the design system repository
(https://github.com/Lilieon/design-system — also served at
https://lilieon.github.io/design-system/DESIGN.md). It defines principles,
semantic tokens, component conventions and AI rules. Follow it exactly:
never hardcode a color, spacing, radius, shadow or duration — use the semantic
tokens / Tailwind utilities (`bg-primary`, `text-muted-foreground`,
`border-border`, `rounded-lg`, …).

### 2. Set up the theme (once per project)

1. Download the generated token files and put them next to your global styles:
   - https://lilieon.github.io/design-system/tokens.css (CSS variables,
     `:root` light + `.dark` dark)
   - https://lilieon.github.io/design-system/tailwind-theme.css (Tailwind v4
     `@theme inline` mapping)
2. In the app global stylesheet:

```css
@import "tailwindcss";
@import "./tokens.css";
@import "./tailwind-theme.css";

@custom-variant dark (&:where(.dark, .dark *));
```

3. Dark mode toggles the `dark` class on `<html>`.

### 3. Install components

Prefer the existing component set before building anything new:

```sh
npx shadcn add https://lilieon.github.io/design-system/registry/button.json
```

Registry index: https://lilieon.github.io/design-system/registry/index.json
Available: alert, badge, button, card, input, label. Components are copy-in
sources — you own them; do not patch them with ad-hoc overrides, extend the
system instead (via the design system repository).

### 4. Build UI with the components

- Angular standalone components with signal inputs (`input()`) and
  `class-variance-authority` for variants; attribute selectors on native
  elements for interactive primitives (`button[dsButton]`, `input[dsInput]`).
- Exactly one primary action per view; destructive actions use the
  `destructive` variant.
- Visible focus on every interactive element (`focus-visible:ring-*`); WCAG AA
  contrast; labels bound to inputs (`for` / `id`); 4px spacing rhythm.
- Verify dark mode for everything you build.

### 5. Review before delivery

Check: contrast, focus visibility, hierarchy (one primary action), spacing
rhythm (4px), dark mode, empty/error/loading states. Fix issues before
reporting done.

## References

- Repository: https://github.com/Lilieon/design-system
- DESIGN.md: https://lilieon.github.io/design-system/DESIGN.md
- Registry: https://lilieon.github.io/design-system/registry/index.json
- Tokens: https://lilieon.github.io/design-system/tokens.css
