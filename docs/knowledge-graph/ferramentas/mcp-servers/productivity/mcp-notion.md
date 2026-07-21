---
titulo: "MCP Notion — Páginas, DBs e Wiki no IDE"
tags: [mcp, notion, pages, databases, wiki, search, knowledge-base]
fonte: Pesquisa consolidada
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - rag
---
# MCP Notion — Páginas, DBs e Wiki no IDE

## O que é

MCP server para Notion. Acesso a **páginas, databases, blocks e search** — ideal para times que documentam no Notion.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `search` | Buscar pages e databases por texto |
| `get_page` | Ler conteúdo de uma página |
| `create_page` | Criar nova página |
| `update_page` | Atualizar propriedades |
| `query_database` | Filtrar/ordenar items em um DB |
| `get_block_children` | Ler blocks de uma página |
| `append_block` | Adicionar conteúdo a uma página |

## Instalação

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "ntn_..."
      }
    }
  }
}
```

Requer Integration Token com acesso às páginas desejadas.

## Casos de Uso

- **Knowledge base**: Buscar docs técnicos no Notion do time
- **Meeting notes**: "O que foi decidido na última planning?"
- **Project tracking**: Query no database de tasks/projetos
- **Documentar**: Criar page com ADR ou resultado de análise
- **RAG source**: Usar Notion como fonte para pipeline RAG

## Alternativas (Hotmart)

Na Hotmart, o equivalente é o **Confluence** (via Hotmart Atlassian MCP). Notion MCP é útil para projetos pessoais ou times que usam Notion.

## Conexões

- [[mcp-overview]] — Protocolo
- [[rag]] — Pode ser fonte de dados
- [[mcp-slack]] — Complementa (decisões em chat vs docs)
