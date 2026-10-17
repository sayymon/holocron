---
titulo: MCP Server Instructions — Diretrizes da Sessão
tags:
  - mcp
  - instructions
  - initialize
  - context
  - system-prompt
  - protocol
fonte: Sessão socrática — Holocron AI Engineer
confiabilidade: alta
data: '2026-10-17'
ring: 2
area: padroes
status: explored
prerequisitos: []
connections:
  - mcp-overview
  - mcp-elicitation
  - mcp-building
  - mcp-transports
---
# MCP Server Instructions — Diretrizes da Sessão

## O que é

Server Instructions é um campo instructions (string) que o MCP server devolve no resultado do handshake initialize. O host/client o incorpora ao contexto do modelo — tipicamente injetado no system prompt — uma única vez por sessão. É o contrato global de uso do server: ordem dos fluxos, padrões de protocolo não-óbvios, regras de segurança e contexto de domínio. Diferencia-se do description de cada tool (granularidade: "como usar este server" vs "quando usar esta tool"). A spec não prevê atualização em runtime — não existe "update instructions" — e o host decide como expor o texto ao modelo.

## Por que importa

É a forma barata de ensinar ao modelo padrões do server que as descriptions das tools não cobrem — ex: um padrão async (search → task_id → get_task_result). Reduz uso incorreto das tools e alúcia de respostas, sem alterar nenhum schema.

## Conceitos-chave

- [[initialize]]
- [[capabilities]]
- [[server-instructions]]
- [[system-prompt]]
- [[tool-description]]
- [[async-polling]]

## Como começar (Quick Start)

No TS SDK: new McpServer({ name, version }, { instructions: '...' }) — o 2º argumento é ServerOptions, não o serverInfo. Testar com client.getInstructions() após connect.

## Conexões com o Mundo Real

Holocron usa instructions para ensinar: fluxo assíncrono de polling, busca por categoria ampla em search_curriculum, aceitação de número/slug/nome em get_disciplina, e a regra "nunca invente documentos — se não achou, diga que não achou".

## Meus Insights

Enviado uma vez no initialize, não muda em runtime; o host tem liberdade de como injetar (ou ignorar) — por isso deve ser curto e acionável, como um system prompt mínimo do server.

## Fontes para Aprofundamento

- [MCP Specification — Initialize](https://spec.modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle/) — confiabilidade: alta
- [MCP TypeScript SDK — ServerOptions.instructions](https://github.com/modelcontextprotocol/typescript-sdk) — confiabilidade: alta

## Conexões

- Pai: [[ia]]
- [[mcp-overview]]
- [[mcp-elicitation]]
- [[mcp-building]]
- [[mcp-transports]]

