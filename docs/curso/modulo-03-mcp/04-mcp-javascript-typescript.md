---
titulo: "MCP em JavaScript/TypeScript"
modulo: 3
unidade: 4
tags: [mcp, typescript, javascript, sdk, implementação, boas-práticas]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada + Documentação Oficial MCP SDK"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# MCP em JavaScript/TypeScript

## SDK Oficial

```bash
npm install @modelcontextprotocol/sdk zod
```

## Criando um MCP Server (stdio)

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "meu-server", version: "1.0.0" });

server.tool(
  "saudacao",
  "Gera uma saudação personalizada",
  { nome: z.string().describe("Nome da pessoa") },
  async ({ nome }) => ({
    content: [{ type: "text", text: `Olá, ${nome}!` }],
  })
);

server.resource(
  "config",
  "config://app",
  async (uri) => ({
    contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify({ version: "1.0" }) }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

## Transporte HTTP (Streamable HTTP)

```typescript
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const app = express();
app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => randomUUID() });
  await server.connect(transport);
  await transport.handleRequest(req, res);
});
app.listen(3000);
```

## Consumindo um MCP Server (Client)

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({ command: "node", args: ["./meu-server.js"] });
const client = new Client({ name: "meu-client", version: "1.0.0" });
await client.connect(transport);

const { tools } = await client.listTools();
const result = await client.callTool({ name: "saudacao", arguments: { nome: "Trooper" } });
```

## Boas Práticas

| Prática | Motivo |
|---------|--------|
| Descrições detalhadas em tools | O modelo usa para decidir qual tool chamar |
| `.describe()` em cada campo Zod | Contexto para o modelo preencher argumentos |
| Respostas JSON estruturadas | Facilita parsing pelo modelo |
| Logs via `server.sendLoggingMessage()` | Não poluir stdout (usado pelo transporte) |
| Separar lógica de negócio do server | Testabilidade e reutilização |
| Um server por domínio | Coesão e manutenibilidade |

## Estrutura de Projeto Recomendada

```
meu-mcp-server/
├── src/
│   ├── index.ts          # Entry point + transporte
│   ├── server.ts         # Definição do McpServer
│   ├── tools/            # Uma tool por arquivo
│   ├── resources/        # Resources
│   └── lib/              # Lógica de negócio
├── tests/
├── package.json
└── tsconfig.json
```

## Testando

### MCP Inspector (ferramenta oficial)

```bash
npx @modelcontextprotocol/inspector node ./dist/index.js
```

### Testes unitários com InMemoryTransport

```typescript
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
await server.connect(serverTransport);
const client = new Client({ name: "test", version: "1.0.0" });
await client.connect(clientTransport);

const result = await client.callTool({ name: "saudacao", arguments: { nome: "Test" } });
expect(result.content[0].text).toContain("Test");
```

## Configuração em IDEs

```json
// .mcp.json
{
  "mcpServers": {
    "meu-server": {
      "command": "node",
      "args": ["./dist/index.js"],
      "env": { "API_KEY": "${env:MEU_API_KEY}" }
    }
  }
}
```
