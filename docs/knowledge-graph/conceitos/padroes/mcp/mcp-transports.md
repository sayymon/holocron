---
titulo: "MCP Transports — stdio, Streamable HTTP e SSE"
tags: [mcp, transport, stdio, http, sse, json-rpc, comunicacao]
fonte: Spec oficial + pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: patterns
status: explored
connections:
  - mcp-overview
  - mcp-building
  - mcp-servers-discovery
---
# MCP Transports — stdio, Streamable HTTP e SSE

## O que é

Transports são a **camada de comunicação** entre MCP Client (host, IDE, agent) e MCP Server. Todos carregam as mesmas mensagens JSON-RPC 2.0 — a diferença é onde o server vive e como a conexão é gerenciada.

## Transports Disponíveis

### 1. stdio (Standard Input/Output)

```
┌──────────┐     stdin/stdout    ┌──────────────┐
│ MCP Host │ ◄──────────────────► │  MCP Server  │
│ (Kiro)   │   (subprocess)       │  (local)     │
└──────────┘                      └──────────────┘
```

| Aspecto | Detalhe |
|---------|---------|
| **Como funciona** | Host spawna server como subprocess, comunica via stdin/stdout |
| **Protocolo** | JSON-RPC 2.0 newline-delimited |
| **Quando usar** | CLIs locais, IDEs (Kiro, Cursor, Claude Desktop) |
| **Vantagens** | Simples, rápido, sem network, zero config |
| **Limitações** | 1 client por server, local only, não escala |
| **Performance** | Ultra-baixa latência (~1ms overhead) |

**Exemplo de config (Kiro):**
```json
{
  "mcpServers": {
    "my-tool": {
      "command": "node",
      "args": ["./dist/server.js"],
      "env": { "API_KEY": "..." }
    }
  }
}
```

**Quando usar stdio:**
- ✅ IDE local (Kiro, Cursor, Claude Desktop)
- ✅ CLIs e ferramentas de dev
- ✅ MCP servers que acessam filesystem local
- ✅ Prototipação rápida

---

### 2. Streamable HTTP (Recomendado para remoto)

```
┌──────────┐      HTTPS POST      ┌──────────────┐
│ MCP      │ ───────────────────► │  MCP Server  │
│ Client   │ ◄─────────────────── │  (remoto)    │
└──────────┘   SSE stream back    └──────────────┘
```

| Aspecto | Detalhe |
|---------|---------|
| **Como funciona** | Client faz POST com JSON-RPC, server responde com SSE stream |
| **Protocolo** | HTTP POST + Server-Sent Events para streaming |
| **Quando usar** | Servers remotos, multi-tenant, produção |
| **Vantagens** | Stateless-friendly, load balanceable, multi-client |
| **Limitações** | Mais complexo, requer HTTPS em produção |
| **Performance** | Boa (~10-50ms overhead network) |

**Quando usar Streamable HTTP:**
- ✅ Server em cloud/container
- ✅ Múltiplos clients conectando ao mesmo server
- ✅ Produção com autenticação (OAuth 2.1)
- ✅ Integração com infra existente (load balancer, CDN)

---

### 3. SSE (Server-Sent Events) — DEPRECATED

| Aspecto | Detalhe |
|---------|---------|
| **Status** | ⚠️ **Deprecated** — use Streamable HTTP |
| **Como funciona** | Client abre conexão SSE para receber, POST para enviar |
| **Por que deprecated** | Substituído por Streamable HTTP (mais simples, mesmo resultado) |
| **Backward compat** | SDKs ainda suportam para servers antigos |

---

### 4. In-Memory (para testes)

| Aspecto | Detalhe |
|---------|---------|
| **Como funciona** | Client e server no mesmo processo |
| **Quando usar** | Testes unitários, dev interno |
| **Vantagens** | Zero overhead, deterministico |

---

## Decisão: Qual Transport Usar?

```
Onde roda o server?
├─ Mesmo computador que o host (IDE)? → stdio
├─ Container/cloud acessado por 1 client? → Streamable HTTP
├─ Container/cloud acessado por N clients? → Streamable HTTP
└─ Teste unitário? → In-Memory
```

## Detalhes Técnicos do JSON-RPC 2.0

Todos os transports usam o mesmo formato de mensagem:

```json
// Request (client → server)
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_docs",
    "arguments": { "query": "RAG pipeline" }
  }
}

// Response (server → client)
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{ "type": "text", "text": "..." }]
  }
}

// Notification (sem id, sem resposta esperada)
{
  "jsonrpc": "2.0",
  "method": "notifications/progress",
  "params": { "progressToken": "abc", "progress": 50 }
}
```

## Segurança por Transport

| Transport | Autenticação | Criptografia |
|-----------|-------------|:------------:|
| stdio | Implícita (mesmo user/process) | N/A (local) |
| Streamable HTTP | OAuth 2.1, API keys, mTLS | HTTPS obrigatório |
| SSE (deprecated) | Custom headers | HTTPS recomendado |

## No Holocron

O Holocron MCP server usa **stdio** porque:
- Roda local dentro do Kiro
- Não precisa de multi-client
- Simplicidade máxima
- Acesso direto ao filesystem e PostgreSQL local

## Conceitos Relacionados

- [[mcp-overview]] — Visão geral do protocolo
- [[mcp-building]] — Como construir servers
- [[mcp-servers-discovery]] — Servers disponíveis

## Conexões

- [[mcp-overview]] — Pai
- [[mcp-building]] — Implementação
- [[kiro]] — Host que usa stdio
