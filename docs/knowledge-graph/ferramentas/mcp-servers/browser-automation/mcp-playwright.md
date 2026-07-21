---
titulo: "MCP Playwright — Browser Automation"
tags: [mcp, playwright, browser, automation, scraping, testing, headless]
fonte: Pesquisa consolidada
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - coding-assistants
---
# MCP Playwright — Browser Automation

## O que é

MCP server oficial da Anthropic para automação de browser via Playwright. O LLM pode **navegar páginas, clicar, preencher forms, tirar screenshots, e extrair dados** — tudo controlando um browser headless real.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `navigate` | Ir para uma URL |
| `click` | Clicar em elemento |
| `fill` | Preencher input/textarea |
| `screenshot` | Capturar screenshot da página |
| `get_text` | Extrair texto visível |
| `select` | Selecionar opção em dropdown |
| `hover` | Hover sobre elemento |
| `evaluate` | Executar JavaScript na página |
| `wait_for` | Esperar elemento/condição |

## Instalação

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

Sem API key — grátis (roda Chromium local).

## Casos de Uso

- **Web scraping**: Extrair dados de páginas com JS pesado
- **Testing**: Testar fluxos de UI end-to-end
- **Form filling**: Automatizar cadastros, submissions
- **Screenshots**: Capturar estado visual para debug/documentação
- **Monitoring**: Verificar se página está up e funcional
- **Login + scrape**: Acessar conteúdo atrás de auth

## Playwright vs Firecrawl

| Aspecto | Playwright MCP | [[mcp-firecrawl]] |
|---------|:--------------:|:-----------------:|
| Controle do browser | Total (click, scroll, etc) | Nenhum |
| Output | DOM, screenshots | Markdown limpo |
| JS rendering | ✅ Real browser | ✅ Server-side |
| Custo | Grátis | Pay-per-page |
| Multi-page crawl | Manual | Nativo |
| Complexidade | Maior (seletores) | Menor (URL → conteúdo) |

**Use Playwright quando:** Precisa de interação (clicks, forms, login).
**Use Firecrawl quando:** Só precisa extrair conteúdo limpo.

## Na Hotmart/Kiro

Chrome DevTools MCP está configurado — similar ao Playwright mas usando o DevTools Protocol diretamente. Usado para testar UIs e scraping de sites para lead generation.

## Conexões

- [[mcp-overview]] — Protocolo
- [[mcp-firecrawl]] — Alternativa para extração simples
- [[coding-assistants]] — Testing automatizado
