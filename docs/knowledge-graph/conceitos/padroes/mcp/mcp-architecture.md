---
titulo: "MCP Architecture — Primitivas, Lifecycle e Capabilities"
tags: [mcp, architecture, primitivas, tools, resources, prompts, lifecycle]
fonte: Spec oficial modelcontextprotocol.io + pesquisa
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: patterns
status: explored
connections:
  - mcp-overview
  - mcp-transports
  - mcp-building
---
# MCP Architecture — Primitivas, Lifecycle e Capabilities

## Arquitetura Geral

```
┌───────────────────────────────────────────────────────────┐
│                      MCP HOST                              │
│  (Claude Desktop, Kiro, Cursor, custom app)               │
│                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ MCP      │  │ MCP      │  │ MCP      │               │
│  │ Client 1 │  │ Client 2 │  │ Client 3 │               │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘               │
└───────┼──────────────┼──────────────┼────────────────────┘
        │              │              │
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ MCP      │  │ MCP      │  │ MCP      │
  │ Server A │  │ Server B │  │ Server C │
  │ (GitHub) │  │ (Postgres)│  │ (Search) │
  └──────────┘  └──────────┘  └──────────┘
        │              │              │
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ GitHub   │  │ Database │  │ Brave    │
  │ API      │  │          │  │ API      │
  └──────────┘  └──────────┘  └──────────┘
```

**Conceitos-chave:**
- **Host**: Aplicação que contém o LLM (IDE, chatbot, etc.)
- **Client**: Instância de conexão a UM server (1:1)
- **Server**: Processo que expõe tools/resources/prompts

---

## As 3 Primitivas

### 1. Tools (Model → Server)

Ações que o LLM pode **executar**. O modelo decide quando chamar com base na descrição.

```typescript
server.tool(
  "create_jira_issue",       // nome
  "Cria uma issue no Jira",  // descrição (LLM lê isso)
  {                           // schema (Zod)
    project: z.string().describe("Key do projeto (ex: PROJ)"),
    title: z.string().describe("Título da issue"),
    description: z.string().optional(),
    priority: z.enum(["high", "medium", "low"]).default("medium"),
  },
  async ({ project, title, description, priority }) => {
    const issue = await jiraClient.createIssue({ project, title, description, priority });
    return { content: [{ type: "text", text: `Issue criada: ${issue.key}` }] };
  }
);
```

**Características:**
- LLM decide quando chamar (baseado na descrição)
- Recebe parâmetros, retorna resultado
- Pode ter side effects (criar, deletar, enviar)
- Schema validado automaticamente

---

### 2. Resources (Server → Model)

Dados que o server **expõe** para leitura. O host/client pode listar e buscar.

```typescript
server.resource(
  "jira://PROJ/board",
  "Board atual do projeto PROJ com issues em andamento",
  "application/json",
  async () => ({
    contents: [{
      uri: "jira://PROJ/board",
      mimeType: "application/json",
      text: JSON.stringify(await getBoard("PROJ")),
    }],
  })
);
```

**Características:**
- Read-only (sem side effects)
- Identificado por URI
- Pode ser estático ou dinâmico
- Host pode listar todos os resources disponíveis
- Suporta: text, blob (binário), templates

---

### 3. Prompts (Server → Model)

Templates reutilizáveis que o server disponibiliza.

```typescript
server.prompt(
  "code-review",
  "Template de code review para PR",
  { diff: z.string(), language: z.string() },
  ({ diff, language }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Faça code review deste diff ${language}:\n\n${diff}\n\nFoque em: bugs, segurança, performance, legibilidade.`
      },
    }],
  })
);
```

**Características:**
- Pré-define mensagens para o LLM
- Pode receber argumentos
- Host pode listar e apresentar ao usuário
- Útil para padronizar interações

---

## Lifecycle da Conexão

```
1. Initialize
   Client → Server: { method: "initialize", params: { capabilities, clientInfo } }
   Server → Client: { result: { capabilities, serverInfo } }

2. Initialized (notification)
   Client → Server: { method: "notifications/initialized" }

3. Normal Operation (tools, resources, prompts)
   Client → Server: { method: "tools/call", params: {...} }
   Server → Client: { result: {...} }

4. Shutdown (optional)
   Client → Server: { method: "shutdown" }
   Transport closes
```

---

## Capabilities (Negociação)

Na inicialização, client e server declaram o que suportam:

### Server Capabilities
```json
{
  "capabilities": {
    "tools": { "listChanged": true },
    "resources": { "subscribe": true, "listChanged": true },
    "prompts": { "listChanged": true },
    "logging": {}
  }
}
```

### Client Capabilities
```json
{
  "capabilities": {
    "roots": { "listChanged": true },
    "sampling": {}
  }
}
```

| Capability | Significado |
|------------|------------|
| `tools` | Server expõe tools |
| `resources` | Server expõe resources |
| `prompts` | Server expõe prompts |
| `logging` | Server pode enviar logs ao client |
| `sampling` | Client permite server pedir completions ao LLM |
| `roots` | Client informa filesystem roots ao server |

---

## Sampling (Server → LLM)

Feature avançada: server pode **pedir ao host** para gerar uma completion. Permite servers "inteligentes" que usam o LLM do host para processar dados.

```
Server → Client: { method: "sampling/createMessage", params: { messages, model } }
Client → Host LLM: Gera completion
Client → Server: { result: { content, model, role } }
```

**Caso de uso:** Server de dados faz query → pede ao LLM do host para sumarizar → retorna sumário.

---

## Notifications (Eventos)

| Notification | Direção | Significado |
|-------------|---------|-------------|
| `notifications/initialized` | Client → Server | Handshake completo |
| `notifications/progress` | Server → Client | Progresso de operação longa |
| `notifications/tools/list_changed` | Server → Client | Lista de tools mudou |
| `notifications/resources/updated` | Server → Client | Resource foi atualizado |
| `notifications/cancelled` | Bidirecional | Operação cancelada |

---

## Auth (Spec 2026)

Para Streamable HTTP em produção:

| Método | Uso |
|--------|-----|
| **OAuth 2.1** | Padrão recomendado para multi-tenant |
| **API Key (header)** | Simples, para single-tenant |
| **mTLS** | Machine-to-machine seguro |

stdio não precisa de auth (mesmo processo/user).

---

## Conceitos Relacionados

- [[mcp-overview]] — Visão geral
- [[mcp-transports]] — Camada de comunicação
- [[mcp-building]] — Implementação prática
- [[mcp-servers-discovery]] — Servers prontos

## Conexões

- [[mcp-overview]] — Contexto geral
- [[agentes-ia]] — Tools para agentes
- [[langchain]] — Pode consumir MCP
