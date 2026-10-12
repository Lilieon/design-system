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
assert.deepEqual(names, ["get-component", "get-tokens", "list-tokens", "review-ui"]);

const catalog = await client.callTool({ name: "list-tokens", arguments: {} });
assert.match(catalog.content[0].text, /primitives/);

const dark = await client.callTool({ name: "get-tokens", arguments: { category: "semantic-dark" } });
assert.match(dark.content[0].text, /--ds-bg/);

const button = await client.callTool({ name: "get-component", arguments: { name: "button" } });
assert.match(button.content[0].text, /class-variance-authority/);

const unknown = await client.callTool({ name: "get-component", arguments: { name: "nope" } });
assert.equal(unknown.isError, true);

const review = await client.callTool({ name: "review-ui", arguments: {} });
assert.match(review.content[0].text, /Accessibility/);

console.log("MCP smoke test passed: 4 tools listed, all calls OK");
await client.close();
