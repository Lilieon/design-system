#!/usr/bin/env node
// Smoke test for the design system MCP server: spawns it over stdio, lists
// tools and calls each one. Run with: pnpm test:mcp
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import assert from "node:assert/strict";

const transport = new StdioClientTransport({ command: process.execPath, args: ["mcp/server.mjs"] });
const client = new Client({ name: "smoke", version: "0.0.0" });
await client.connect(transport);

const tools = await client.listTools();
const names = tools.tools.map((t) => t.name).sort();
assert.deepEqual(names, ["get-brand", "get-component", "get-tokens", "list-tokens", "review-ui"]);

const brand = await client.callTool({ name: "get-brand", arguments: {} });
assert.match(brand.content[0].text, /^# DESIGN.md/);
assert.match(brand.content[0].text, /---\nname:/);
assert.match(brand.content[1].text, /\$description/);

const catalog = await client.callTool({ name: "list-tokens", arguments: {} });
assert.match(catalog.content[0].text, /charte/);

const dark = await client.callTool({ name: "get-tokens", arguments: { category: "semantic-dark" } });
assert.match(dark.content[0].text, /--ds-bg/);

const button = await client.callTool({ name: "get-component", arguments: { name: "button" } });
assert.match(button.content[0].text, /class-variance-authority/);

const unknown = await client.callTool({ name: "get-component", arguments: { name: "nope" } });
assert.equal(unknown.isError, true);

const review = await client.callTool({ name: "review-ui", arguments: {} });
assert.match(review.content[0].text, /Accessibility/);

console.log("MCP smoke test passed: 5 tools listed, all calls OK");
await client.close();
