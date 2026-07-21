---
titulo: "MCP SQLite — Banco Local Leve"
tags: [mcp, sqlite, database, local, queries, lightweight]
fonte: Docs oficiais
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
---
# MCP SQLite — Banco Local Leve

## O que é

MCP server oficial para SQLite. Ideal para projetos locais, prototipação, ou quando o dado está em um arquivo `.db`.

## Instalação

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "./data/my-database.db"]
    }
  }
}
```

## Casos de Uso

- Explorar databases locais de apps
- Analisar dados em arquivos `.db` (Chrome history, iOS backups, etc.)
- Prototipação sem setup de server

## Conexões

- [[mcp-overview]] — Protocolo
- [[mcp-postgres]] — Alternativa para projetos maiores
