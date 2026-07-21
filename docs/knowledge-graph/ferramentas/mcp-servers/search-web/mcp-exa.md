---
titulo: "MCP Exa — AI-Native Semantic Search"
tags: [mcp, exa, search, semantic, ai-native, neural]
fonte: Pesquisa consolidada
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - rag
  - embeddings
---
# MCP Exa — AI-Native Semantic Search

## O que é

Exa é um search engine construído para IA — busca **semântica** (por significado, não keywords). Diferente do Brave/Google que usam keywords + ranking, Exa usa embeddings para encontrar resultados mais relevantes para queries naturais.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `search` | Busca semântica na web |
| `find_similar` | Encontrar páginas similares a uma URL |
| `get_contents` | Extrair conteúdo limpo de resultados |

## Instalação

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "<your-key>"
      }
    }
  }
}
```

### Preço

| Plano | Queries/mês | Preço |
|-------|:-----------:|:-----:|
| Free | 1.000 | $0 |
| Basic | 10.000 | $20/mês |
| Pro | 100.000 | $100/mês |

## Quando Usar Exa vs Brave

| Query | Brave (keywords) | Exa (semântico) |
|-------|:-----------------:|:----------------:|
| "react server components" | ✅ Bom | ✅ Bom |
| "frameworks que permitem renderizar no server" | 🟡 OK | ✅ Excelente |
| "alternativa ao Redux que seja mais simples" | 🟡 Mediocre | ✅ Excelente |
| "papers sobre atenção em transformers" | 🟡 OK | ✅ Excelente |

**Regra**: Queries naturais/descritivas → Exa. Keywords exatas → Brave.

## Casos de Uso

- **Research**: Buscar papers, artigos por tema conceitual
- **Discovery**: "Encontre projetos similares a este"
- **RAG web**: Busca mais precisa para augmentar contexto
- **Competitive intel**: Encontrar empresas/produtos similares

## Conexões

- [[mcp-overview]] — Protocolo
- [[embeddings]] — Usa embeddings para busca semântica
- [[rag]] — Complementa como fonte de retrieval
- [[mcp-brave-search]] — Alternativa keyword-based
