---
titulo: "MCP Brave Search — Web Search para LLMs"
tags: [mcp, brave, search, web, api, grounding]
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
# MCP Brave Search — Web Search para LLMs

## O que é

MCP server oficial para Brave Search API. Permite ao LLM **buscar na web** em tempo real — essencial para perguntas sobre eventos recentes, preços, ou qualquer informação que muda.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `brave_web_search` | Busca web geral (até 20 resultados) |
| `brave_local_search` | Busca local (negócios, endereços) |

## Instalação

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-brave-search"],
      "env": {
        "BRAVE_API_KEY": "<your-key>"
      }
    }
  }
}
```

### Obter API Key

1. Acesse [brave.com/search/api](https://brave.com/search/api/)
2. Free tier: 2.000 queries/mês
3. Paid: $5/1000 queries

## Casos de Uso

- **Grounding**: Verificar informação antes de responder
- **Research**: Pesquisar tópico e sumarizar resultados
- **Atualização**: "Qual a versão mais recente do React?"
- **Comparação**: "Quanto custa o Pinecone em 2026?"

## Alternativas

| Server | Diferença |
|--------|-----------|
| [[mcp-exa]] | Search semântico (AI-native, mais preciso) |
| [[mcp-firecrawl]] | Search + scraping (extrai conteúdo completo) |
| **Tavily** | Otimizado para RAG |
| **SearXNG** | Meta-search self-hosted (grátis) |

## Conexões

- [[mcp-overview]] — Protocolo
- [[rag]] — Alternativa a RAG estático (web live)
