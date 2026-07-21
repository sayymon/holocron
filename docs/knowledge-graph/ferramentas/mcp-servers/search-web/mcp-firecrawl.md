---
titulo: "MCP Firecrawl — Web Scraping e Crawling"
tags: [mcp, firecrawl, scraping, crawling, web, extraction, markdown]
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
# MCP Firecrawl — Web Scraping e Crawling

## O que é

Firecrawl é uma plataforma de web scraping otimizada para IA. O MCP server permite ao LLM **extrair conteúdo de páginas web**, crawlear sites inteiros, e obter dados limpos (Markdown) prontos para processamento.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `scrape_url` | Extrair conteúdo de uma URL (retorna Markdown limpo) |
| `crawl_site` | Crawlear site inteiro (múltiplas páginas) |
| `search` | Buscar na web + extrair conteúdo dos resultados |
| `extract` | Extrair dados estruturados (schema-based) |
| `map_site` | Mapear URLs de um site |

## Instalação

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "<your-key>"
      }
    }
  }
}
```

### Preço

| Plano | Preço | Créditos |
|-------|:-----:|:--------:|
| Free | $0 | 500 pages/mês |
| Hobby | $16/mês | 3.000 pages |
| Standard | $83/mês | 50.000 pages |
| Growth | $333/mês | 500.000 pages |

## Casos de Uso

- **RAG dinâmico**: Scrape site → embed → buscar (docs que mudam)
- **Research**: Extrair artigos, papers, docs técnicas
- **Competitive analysis**: Crawlear produto concorrente
- **Data extraction**: Pegar preços, reviews, specs de sites
- **Knowledge base**: Transformar site inteiro em Markdown indexável

## Diferencial vs Playwright

| Aspecto | Firecrawl | [[mcp-playwright]] |
|---------|-----------|-------------------|
| Foco | Extração de conteúdo limpo | Automação de browser |
| Output | Markdown estruturado | DOM, screenshots |
| JS rendering | ✅ (server-side) | ✅ (headless) |
| Crawl multi-page | ✅ Nativo | Manual (script) |
| Preço | Pay-per-page | Grátis (self-host) |
| Setup | Zero (API) | Requer Chromium |

## Conexões

- [[mcp-overview]] — Protocolo
- [[rag]] — Alimentar pipeline de RAG
- [[mcp-brave-search]] — Complementa (search → scrape)
