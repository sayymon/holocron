---
titulo: "MCP Sentry — Error Tracking no IDE"
tags: [mcp, sentry, errors, debugging, stacktrace, monitoring]
fonte: Pesquisa consolidada
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - observabilidade-llm
---
# MCP Sentry — Error Tracking no IDE

## O que é

MCP server do Sentry que permite ao LLM **buscar erros, stacktraces e issues** diretamente no IDE. Em vez de abrir o Sentry no browser, pergunte "quais erros estão ocorrendo no serviço X?" e receba a resposta com contexto.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `list_issues` | Listar issues por projeto/status |
| `get_issue_details` | Detalhes de uma issue (stacktrace, breadcrumbs) |
| `search_issues` | Buscar por query |
| `get_event` | Evento específico com full context |

## Instalação

```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_AUTH_TOKEN": "<your-token>",
        "SENTRY_ORG": "hotmart"
      }
    }
  }
}
```

## Casos de Uso

- **Debugging**: "Quais erros estão ocorrendo neste endpoint?"
- **Fix rápido**: LLM vê stacktrace → sugere fix no código
- **Monitoring**: "Quantos erros novos essa semana?"
- **Post-mortem**: Investigar incidente com contexto completo

## Relevância Hotmart

Sentry é padrão de error tracking na Hotmart. Ter o MCP permite debugar sem sair do Kiro — ver erros de SARA, CAIO, ou qualquer serviço diretamente.

## Conexões

- [[mcp-overview]] — Protocolo
- [[observabilidade-llm]] — Categoria
- [[kiro]] — Onde usar
