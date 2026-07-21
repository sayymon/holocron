---
titulo: "Índice — MCP Servers por Categoria"
tags: [mcp, servers, index, discovery]
data: '2026-06-28'
---
# 🔌 MCP Servers — Índice por Categoria

> Servers são o ecossistema de "plugins" do [[mcp-overview|MCP]]. Cada um dá ao LLM acesso a um serviço externo.

## Estrutura

```
ferramentas/mcp-servers/
├── _index-mcp-servers.md         ← Você está aqui
├── databases/
│   ├── mcp-postgres.md
│   ├── mcp-supabase.md
│   └── mcp-sqlite.md
├── search-web/
│   ├── mcp-brave-search.md
│   ├── mcp-firecrawl.md
│   └── mcp-exa.md
├── code-dev/
│   ├── mcp-github.md
│   ├── mcp-context7.md
│   └── mcp-sentry.md
├── browser-automation/
│   └── mcp-playwright.md
├── productivity/
│   ├── mcp-slack.md
│   └── mcp-notion.md
├── cloud-infra/
│   └── mcp-kubernetes.md
└── filesystem/
    ├── mcp-filesystem.md
    └── mcp-memory.md
```

## Starter Kit (os 6 essenciais)

| Server | Categoria | Por que |
|--------|-----------|---------|
| [[mcp-filesystem]] | Filesystem | Ler/escrever arquivos locais |
| [[mcp-github]] | Code & Dev | PRs, issues, code search |
| [[mcp-postgres]] | Databases | Queries em banco |
| [[mcp-brave-search]] | Search | Busca web |
| [[mcp-memory]] | Filesystem | Knowledge graph persistente |
| [[mcp-context7]] | Code & Dev | Docs atualizadas de libs |

## Registries para Descobrir Mais

| Registry | Servers | URL |
|----------|:-------:|-----|
| PulseMCP | 15.930+ | pulsemcp.com |
| Smithery | 7.300+ | smithery.ai |
| MCP Registry (oficial) | 2.000+ | registry.modelcontextprotocol.io |
| Glama | 3.000+ | glama.ai/mcp |
| awesome-mcp-servers | curado | github.com/wong2/awesome-mcp-servers |

## Conexões

- [[mcp-overview]] — O protocolo
- [[mcp-building]] — Construir o seu
- [[kiro]] — Onde configura os servers
