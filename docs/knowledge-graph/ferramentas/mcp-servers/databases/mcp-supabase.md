---
titulo: "MCP Supabase — BaaS Completo (DB + Auth + Storage)"
tags: [mcp, supabase, postgres, auth, storage, realtime, baas]
fonte: Pesquisa consolidada
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - mcp-postgres
---
# MCP Supabase — BaaS Completo (DB + Auth + Storage)

## O que é

MCP server para Supabase — um Backend-as-a-Service baseado em PostgreSQL. Acesso completo a Database, Auth, Storage, Edge Functions e Realtime via MCP.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `query_database` | SQL direto no Postgres do Supabase |
| `list_tables` | Tabelas e views |
| `manage_auth_users` | Listar/criar/deletar users |
| `manage_storage` | Buckets, upload, download |
| `list_edge_functions` | Functions serverless |
| `get_project_info` | Config do projeto |

## Instalação

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp-server"],
      "env": {
        "SUPABASE_URL": "https://xxx.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "<key>"
      }
    }
  }
}
```

## Casos de Uso

- **Prototipação rápida**: LLM cria tabelas, policies e queries
- **Auth debug**: "Quais users estão com email não confirmado?"
- **Storage**: "Lista arquivos no bucket uploads"
- **Full-stack**: Construir app inteira conversando com Supabase via MCP

## Quando Usar (vs Postgres MCP puro)

| Precisa | Usar |
|---------|------|
| Só queries SQL | [[mcp-postgres]] |
| DB + Auth + Storage + Functions | **mcp-supabase** |
| Supabase como backend do projeto | **mcp-supabase** |

## Conexões

- [[mcp-postgres]] — Base é Postgres
- [[mcp-overview]] — Protocolo
