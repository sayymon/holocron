---
titulo: "Construindo MCP Servers — SDKs, FastMCP e Padrões"
tags: [mcp, sdk, fastmcp, typescript, python, building, development]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: patterns
status: explored
connections:
  - mcp-overview
  - mcp-transports
  - mcp-servers-discovery
---
# Construindo MCP Servers — SDKs, FastMCP e Padrões

## Opções para Construir

| Abordagem | Linguagem | Complexidade | Quando usar |
|-----------|-----------|:------------:|-------------|
| **@modelcontextprotocol/sdk** | TypeScript/JS | Média | Produção, controle total, Node.js |
| **FastMCP** | Python | Baixa | Prototipação rápida, Pythonistas |
| **mcp SDK Python** | Python | Média | Oficial, mais controle que FastMCP |
| **SDK C#** | C# | Média | .NET ecosystem |
| **SDK Java** | Java/Kotlin | Média | JVM, Spring Boot |
| **SDK Go** | Go | Média | Performance, microservices |

---

## 1. TypeScript SDK Oficial (`@modelcontextprotocol/sdk`)

O SDK oficial para Node.js/TypeScript. Usado pelo Holocron.

### Setup

```bash
npm install @modelcontextprotocol/sdk zod
```

### Exemplo Completo

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Criar server
const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

// Registrar Tool
server.tool(
  "search_documents",
  "Busca documentos por query semântica",
  { query: z.string().describe("Texto de busca") },
  async ({ query }) => {
    const results = await searchDB(query);
    return {
      content: [{ type: "text", text: JSON.stringify(results) }],
    };
  }
);

// Registrar Resource
server.resource(
  "schema://database/tables",
  "Lista de tabelas do banco",
  async () => ({
    contents: [{ uri: "schema://database/tables", text: "users, docs, embeddings" }],
  })
);

// Registrar Prompt
server.prompt(
  "code-review",
  "Template de code review",
  { language: z.string() },
  ({ language }) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Review este código ${language}...` },
    }],
  })
);

// Conectar transport stdio
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Estrutura de Projeto Recomendada

```
my-mcp-server/
├── src/
│   ├── index.ts          ← Entry point + transport
│   ├── tools/            ← Uma tool por arquivo
│   │   ├── search.ts
│   │   └── create.ts
│   ├── resources/        ← Resources estáticos/dinâmicos
│   └── utils/            ← Helpers, DB connection
├── package.json
├── tsconfig.json
└── README.md
```

---

## 2. FastMCP (Python)

Framework Python que abstrai toda a complexidade em decorators (estilo Flask/FastAPI). Mantido pela Prefect (agora parte do ecossistema).

### Setup

```bash
pip install fastmcp
# ou
uv add fastmcp
```

### Exemplo Completo

```python
from fastmcp import FastMCP

mcp = FastMCP("my-server")

@mcp.tool()
def search_documents(query: str) -> str:
    """Busca documentos por query semântica."""
    results = search_db(query)
    return json.dumps(results)

@mcp.resource("schema://tables")
def list_tables() -> str:
    """Lista tabelas do banco."""
    return "users, docs, embeddings"

@mcp.prompt()
def code_review(language: str) -> str:
    """Template de code review."""
    return f"Review este código {language}..."

# Rodar (stdio por default, HTTP com flag)
if __name__ == "__main__":
    mcp.run()  # stdio
    # mcp.run(transport="http", port=8000)  # HTTP
```

### Diferenciais do FastMCP

| Feature | Descrição |
|---------|-----------|
| **Decorator-based** | `@mcp.tool()` — zero boilerplate |
| **Auto-schema** | Gera JSON Schema das type hints automaticamente |
| **Dual transport** | stdio e HTTP com uma flag |
| **Context manager** | Acessa logging, progress, request info |
| **Composição** | Montar servers a partir de sub-servers |
| **Image support** | Retornar imagens direto das tools |
| **Testing** | `mcp.test_tool("name", args)` built-in |

### FastMCP vs SDK Oficial Python

| Aspecto | FastMCP | mcp SDK Python |
|---------|---------|----------------|
| Boilerplate | Mínimo (decorators) | Moderado |
| Learning curve | 5 min | 30 min |
| Flexibilidade | Média | Alta |
| Composição | ✅ Nativo | Manual |
| Produção | ✅ (v3.x estável) | ✅ |
| Auto-discovery | ✅ | Manual |

---

## 3. Padrões e Best Practices

### Naming Conventions

```
Tools: verbo_substantivo (search_documents, create_issue, get_status)
Resources: scheme://path (file:///docs, db://users/schema)
Prompts: ação descritiva (code-review, summarize-doc)
```

### Error Handling

```typescript
server.tool("risky_operation", { id: z.string() }, async ({ id }) => {
  try {
    const result = await doThing(id);
    return { content: [{ type: "text", text: result }] };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Erro: ${error.message}` }],
      isError: true,  // Sinaliza erro ao host
    };
  }
});
```

### Async Pattern (para operações longas)

Usado no Holocron (ADR 003):

```typescript
// Tool retorna task_id imediatamente
server.tool("long_operation", { query: z.string() }, async ({ query }) => {
  const taskId = createTask(query);  // Fire
  processInBackground(taskId, query); // Forget
  return {
    content: [{ type: "text", text: JSON.stringify({ task_id: taskId, status: "processing" }) }],
  };
});

// Polling tool
server.tool("get_result", { task_id: z.string() }, async ({ task_id }) => {
  const result = getTaskResult(task_id);
  return { content: [{ type: "text", text: JSON.stringify(result) }] };
});
```

### Segurança

| Prática | Descrição |
|---------|-----------|
| **Input validation** | Zod/Pydantic para TODOS os params |
| **Sandboxing** | Não dar acesso irrestrito ao filesystem |
| **Rate limiting** | Limitar calls por período |
| **Secrets** | NUNCA hardcode — usar env vars |
| **Logging** | Logar tool calls para auditoria |
| **Permissions** | Resource-level access control |

---

## 4. Deploy

### stdio (local)
```json
// .kiro/settings/mcp.json
{
  "mcpServers": {
    "my-tool": {
      "command": "node",
      "args": ["./path/to/server.js"]
    }
  }
}
```

### Docker (para distribuição)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
ENTRYPOINT ["node", "dist/index.js"]
```

### uvx (Python, zero install)
```json
{
  "mcpServers": {
    "my-python-tool": {
      "command": "uvx",
      "args": ["my-package@latest"]
    }
  }
}
```

### npx (TypeScript, zero install)
```json
{
  "mcpServers": {
    "my-ts-tool": {
      "command": "npx",
      "args": ["-y", "@scope/my-mcp-server"]
    }
  }
}
```

---

## 5. Testing

### MCP Inspector (oficial)
```bash
npx @modelcontextprotocol/inspector ./dist/server.js
```
Abre UI web para testar tools, resources e prompts interativamente.

### Programático (TypeScript)
```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
await server.connect(serverTransport);

const client = new Client({ name: "test" });
await client.connect(clientTransport);

const result = await client.callTool("search_documents", { query: "test" });
assert(result.content[0].text.includes("expected"));
```

---

## Conceitos Relacionados

- [[mcp-overview]] — O protocolo em si
- [[mcp-transports]] — Camada de comunicação
- [[mcp-servers-discovery]] — Servers prontos para usar

## Conexões

- [[mcp-overview]] — Pai
- [[mcp-transports]] — Transport layer
- [[langchain]] — Pode consumir MCP tools
- [[kiro]] — Host que roda servers
