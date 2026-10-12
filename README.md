# Design System

Lilian's personal design system: one source of truth for the UX/UI of all my
websites and web applications.

- **Tokens** — [W3C DTCG](https://www.w3.org/community/design-tokens/) JSON
  design tokens, built to CSS custom properties and a Tailwind CSS v4 theme.
- **Components** — Angular standalone components styled with Tailwind CSS v4,
  distributed shadcn-style: the source code is copied into your project, you
  own it.
- **AI integrations** — `DESIGN.md` specification, a `shadcn`-style component
  registry, an installable agent skill, and an MCP server, so AI coding agents
  build UIs that follow the system.

## Status

Work in progress. This README is updated as phases land.

## Install a component

Components are distributed as a shadcn-style registry (validated with the
official CLI, see [ADR 0002](docs/adr/0002-distribution.md)):

```sh
npx shadcn add https://lilieon.github.io/design-system/registry/button.json
```

Then import the tokens in your global styles:

```css
@import "tailwindcss";
@import "tokens.css";        /* from https://lilieon.github.io/design-system/tokens.css */
@import "tailwind-theme.css"; /* from https://lilieon.github.io/design-system/tailwind-theme.css */
```

Components are plain Angular standalone sources — you own the code after
install; update by re-running the install with `--overwrite`.

## AI agent integrations

- **DESIGN.md** — the visual language, read by humans and AI agents.
- **Skill** — installable agent skill:
  `npx skills add Lilieon/design-system`
- **MCP server** — dynamic access to tokens, components and a UI review
  checklist. From a clone of this repository:

```json
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": ["/absolute/path/to/design-system/mcp/server.mjs"]
    }
  }
}
```

Run it with `pnpm mcp` (after `pnpm install`). Tools:
`list-tokens`, `get-tokens`, `get-component`, `review-ui`.

## Documentation

- [DESIGN.md](DESIGN.md) — visual language and rules (for humans and AI agents)
- [AGENTS.md](AGENTS.md) — repository build instructions
- [docs/adr/](docs/adr/) — architecture decision records

## License

[MIT](LICENSE)
