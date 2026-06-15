import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools.js';
import { registerGraphTools } from './graph-tools.js';

// Evita que erros não-capturados matem o processo MCP
process.on('unhandledRejection', (reason) => {
  process.stderr.write(`[holocron-mcp] unhandledRejection: ${reason}\n`);
});

process.on('uncaughtException', (err) => {
  process.stderr.write(`[holocron-mcp] uncaughtException: ${err.message}\n${err.stack}\n`);
});

const server = new McpServer({
  name: 'holocron',
  version: '0.2.0',
});

registerTools(server);
registerGraphTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
