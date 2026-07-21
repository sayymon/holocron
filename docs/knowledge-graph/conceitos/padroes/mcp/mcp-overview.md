---
titulo: "MCP — Model Context Protocol"
tags: [mcp, protocol, tools, resources, prompts, integration, standard]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: patterns
status: explored
connections:
  - agentes-ia
  - anthropic-claude
  - llms
  - coding-assistants
---
# MCP — Model Context Protocol

## O que é

MCP (Model Context Protocol) é um **padrão aberto** que define uma interface universal para conectar modelos de IA a ferramentas, dados e serviços externos. Pense como o "USB-C para IA" — build once, use everywhere.

Criado pela [[anthropic-claude|Anthropic]] em Nov 2024, foi rapidamente adotado por OpenAI, Google, Microsoft, AWS, e doado para a Linux Foundation (Agentic AI Foundation).

## Números em 2026

- **97M+ downloads/mês** dos SDKs
- **2.300+ servidores** públicos
- Suportado por: Claude, Cursor, Windsurf, VS Code, Kiro, Copilot, 200+ tools
- Especificação: [spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io)

## Primitivas MCP

| Primitiva | Direção | O que faz | Exemplo |
|-----------|---------|-----------|---------|
| **Tools** | Model → Server | Ações executáveis | Criar issue Jira, query DB |
| **Resources** | Server → Model | Dados legíveis | Schema de tabela, conteúdo arquivo |
| **Prompts** | Server → Model | Templates reutilizáveis | Prompt de code review |

## Transporte

| Tipo | Quando | Exemplo |
|------|--------|---------|
| **stdio** | Processos locais (CLI, IDE) | Kiro ↔ MCP server local |
| **Streamable HTTP** | Servidores remotos | App → MCP server na cloud |

## Arquitetura

```
┌──────────┐    MCP Protocol    ┌──────────────┐    APIs     ┌──────────┐
│ MCP Host │ ◄─────────────────► │  MCP Server  │ ◄──────────► │ External │
│ (Claude, │    stdio / HTTP     │  (seu código)│    REST/    │ Services │
│ Kiro,    │                     │              │    gRPC/    │ (Jira,   │
│ Cursor)  │                     │              │    DB       │ GitHub)  │
└──────────┘                     └──────────────┘             └──────────┘
```

## Como Construir um MCP Server

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// Registrar uma tool
server.tool("search_docs", { query: z.string() }, async ({ query }) => {
  const results = await searchDatabase(query);
  return { content: [{ type: "text", text: JSON.stringify(results) }] };
});
```

## MCPs Disponíveis (Kiro/Holocron)

| MCP | Status | Função |
|-----|--------|--------|
| Hotmart Atlassian | ✅ Ativo | Jira + Confluence |
| Golden Path | ✅ Ativo | Documentação de padrões |
| GitHub | ✅ Ativo | Repos, PRs, issues |
| Holocron | ✅ Ativo | Busca no curso, tutor socrático |
| Chrome DevTools | ✅ Ativo | Automação browser |
| Figma | ✅ Ativo | Design-to-code |

## Quando Usar

✅ **Use MCP quando:**
- Quer que um LLM **acesse dados/ferramentas externas**
- Quer **padronizar** integração para múltiplos clientes (Claude, Kiro, Cursor)
- Está construindo um **agente** que precisa de tools
- Quer **composabilidade** (um server atende vários hosts)

❌ **Evite quando:**
- Integração é one-shot script (REST direto é mais simples)
- Não precisa de interação bidirecional
- Performance ultra-baixa latência (overhead do protocolo)

## Ecossistema de Servidores Populares

| Categoria | Servidores |
|-----------|-----------|
| Databases | PostgreSQL, SQLite, MongoDB, Supabase |
| Version Control | GitHub, GitLab |
| Cloud | AWS, GCP, Azure |
| Productivity | Jira, Confluence, Notion, Linear |
| Browser | Playwright, Puppeteer, Chrome DevTools |
| Search | Brave, Tavily, SearXNG |
| Files | Filesystem, Google Drive, S3 |
| AI Tools | LangChain, LlamaIndex |

## 🗂️ Aprofundamentos (Sub-documentos)

| Documento | Conteúdo |
|-----------|----------|
| [[mcp-architecture]] | Primitivas em detalhe, lifecycle, capabilities, sampling, auth |
| [[mcp-transports]] | stdio vs Streamable HTTP vs SSE — quando usar cada |
| [[mcp-building]] | SDKs (TypeScript, FastMCP Python), padrões, deploy, testing |
| [[mcp-servers-discovery]] | Top servers por categoria, registries, starter kit |

---

## Conceitos Relacionados

- [[agentes-ia]] — MCP dá tools aos agentes
- [[anthropic-claude]] — Criador do protocolo
- [[coding-assistants]] — Todos suportam MCP
- [[langchain]] — Pode usar MCP tools

## Conexões

- [[anthropic-claude]] — Criador
- [[kiro]] — IDE que usa MCP
- [[agentes-ia]] — Consumidor principal
- [[langchain]] — Framework compatível
- [[mcp-architecture]] — Aprofundamento: arquitetura
- [[mcp-transports]] — Aprofundamento: transports
- [[mcp-building]] — Aprofundamento: como construir
- [[mcp-servers-discovery]] — Aprofundamento: servers disponíveis
