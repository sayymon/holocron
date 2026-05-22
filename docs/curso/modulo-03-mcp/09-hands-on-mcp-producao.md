---
titulo: "Hands-on: Do Zero ao MCP em Produção"
modulo: 3
unidade: 9
tags: [mcp, hands-on, produção, deploy, testes, projeto]
dificuldade: avançado
fonte: "Curso Engenharia de IA Aplicada + Práticas DevOps"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Hands-on: Do Zero ao MCP em Produção

## Objetivo

Construir um MCP Server completo que expõe uma API de tarefas (todo list), com:
- Server MCP (stdio + HTTP)
- Client de teste
- Testes automatizados
- Deploy em produção

## Passo 1: Setup do Projeto

```bash
mkdir mcp-todo-server && cd mcp-todo-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node vitest
npx tsc --init --target ES2022 --module NodeNext --outDir dist
```

```json
// package.json (scripts)
{
  "scripts": {
    "build": "tsc",
    "dev": "node --loader ts-node/esm src/index.ts",
    "test": "vitest",
    "inspect": "npx @modelcontextprotocol/inspector node ./dist/index.js"
  }
}
```

## Passo 2: Implementar o Server

```typescript
// src/server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

interface Todo { id: string; title: string; done: boolean; createdAt: string; }

const todos: Todo[] = [];

export function createServer() {
  const server = new McpServer({ name: "todo-server", version: "1.0.0" });

  server.tool("listar_tarefas", "Lista todas as tarefas", {
    status: z.enum(["all", "done", "pending"]).default("all").describe("Filtro de status"),
  }, async ({ status }) => {
    const filtered = status === "all" ? todos
      : todos.filter(t => status === "done" ? t.done : !t.done);
    return { content: [{ type: "text", text: JSON.stringify(filtered) }] };
  });

  server.tool("criar_tarefa", "Cria uma nova tarefa", {
    title: z.string().min(1).describe("Título da tarefa"),
  }, async ({ title }) => {
    const todo: Todo = { id: crypto.randomUUID(), title, done: false, createdAt: new Date().toISOString() };
    todos.push(todo);
    return { content: [{ type: "text", text: JSON.stringify(todo) }] };
  });

  server.tool("concluir_tarefa", "Marca tarefa como concluída", {
    id: z.string().describe("ID da tarefa"),
  }, async ({ id }) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return { content: [{ type: "text", text: "Tarefa não encontrada" }], isError: true };
    todo.done = true;
    return { content: [{ type: "text", text: JSON.stringify(todo) }] };
  });

  return server;
}
```

```typescript
// src/index.ts
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Passo 3: Testes

```typescript
// tests/server.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../src/server.js";

describe("Todo MCP Server", () => {
  let client: Client;

  beforeEach(async () => {
    const server = createServer();
    const [ct, st] = InMemoryTransport.createLinkedPair();
    await server.connect(st);
    client = new Client({ name: "test", version: "1.0.0" });
    await client.connect(ct);
  });

  it("lista tools disponíveis", async () => {
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(3);
  });

  it("cria e lista tarefas", async () => {
    await client.callTool({ name: "criar_tarefa", arguments: { title: "Estudar MCP" } });
    const result = await client.callTool({ name: "listar_tarefas", arguments: { status: "all" } });
    const tarefas = JSON.parse(result.content[0].text);
    expect(tarefas).toHaveLength(1);
    expect(tarefas[0].title).toBe("Estudar MCP");
  });
});
```

## Passo 4: Transporte HTTP (para produção)

```typescript
// src/http.ts
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "./server.js";

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() });
  await server.connect(transport);
  await transport.handleRequest(req, res);
});

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(3000, () => console.log("MCP HTTP Server rodando na porta 3000"));
```

## Passo 5: Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
EXPOSE 3000
CMD ["node", "dist/http.js"]
```

## Passo 6: CI/CD (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npm run build
```

## Passo 7: Configurar na IDE

```json
// .mcp.json
{
  "mcpServers": {
    "todo": {
      "command": "node",
      "args": ["./dist/index.js"]
    }
  }
}
```

## Checklist de Produção

- [ ] Testes passando (unit + integration)
- [ ] Build sem erros
- [ ] Health check endpoint
- [ ] Dockerfile otimizado (multi-stage)
- [ ] CI/CD configurado
- [ ] Logs estruturados (JSON)
- [ ] Rate limiting (HTTP)
- [ ] Auth configurado (HTTP)
- [ ] Documentação de tools (descrições claras)
- [ ] MCP Inspector validado
- [ ] Monitoramento (métricas de chamadas)

## Evolução

Após o MVP funcionar:
1. Persistir dados em banco (Postgres)
2. Adicionar autenticação OAuth 2.0
3. Implementar rate limiting
4. Adicionar observabilidade (LangFuse)
5. Deploy em Kubernetes com ArgoCD
