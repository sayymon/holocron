---
titulo: "MCP Context7 — Documentação Atualizada de Libs"
tags: [mcp, context7, docs, npm, pypi, libraries, documentation]
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
# MCP Context7 — Documentação Atualizada de Libs

## O que é

Context7 é um MCP server que fornece **documentação atualizada de bibliotecas** (npm, PyPI, etc.) diretamente ao LLM. Resolve o problema de LLMs terem knowledge cutoff — em vez de respostas com APIs desatualizadas, o LLM consulta a doc real.

## Por que é Útil

Sem Context7: LLM responde com API de LangChain 0.1 quando você usa 0.3.
Com Context7: LLM consulta docs atuais e responde com API correta.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `resolve_library` | Buscar library por nome fuzzy |
| `get_library_docs` | Obter documentação de uma lib específica |

## Instalação

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "context7-mcp"]
    }
  }
}
```

Sem API key — grátis.

## Casos de Uso

- LLM precisa usar **API de lib que mudou** recentemente
- Gerar código com **versão correta** de uma biblioteca
- Comparar APIs entre versões
- Onboarding em libs novas sem ler docs manualmente

## Conexões

- [[mcp-overview]] — Protocolo
- [[coding-assistants]] — Evita code com APIs desatualizadas
