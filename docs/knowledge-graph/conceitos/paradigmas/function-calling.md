---
titulo: Function Calling — O Modelo Chamando Ferramentas
tags:
  - function-calling
  - tool-use
  - llm
  - api
  - structured-output
  - agents
fonte: Sessão socrática — Holocron AI Engineer
confiabilidade: alta
data: '2026-10-17'
ring: 1
area: patterns
status: explored
prerequisitos: []
connections:
  - mcp-overview
  - mcp-elicitation
  - agentes-ia
  - llms
  - prompt-engineering
---
# Function Calling — O Modelo Chamando Ferramentas

## O que é

Function calling (ou tool use) é a capacidade da API do modelo LLM de emitir chamadas estruturadas (JSON com schema definido pelo dev) que a aplicação executa — ex: consultar o clima, rodar uma query, chamar um endpoint. OpenAI lançou Functions API em jun/2023; hoje é padrão em todos os providers (Anthropic Tool Use, Google Function Calling). Fluxo: dev descreve tools com JSON Schema → modelo decide quando chamar e preenche os argumentos → app valida, executa e devolve o resultado → modelo gera a resposta final. É capacidade do MODELO, não protocolo de integração.

## Por que importa

É a base de toda capacidade agentic: sem function calling, o LLM só gera texto. Entender essa camada é essencial para distinguir do MCP (que é o contrato host↔server de descoberta/conexão de tools — complementar, não sucessor) e para projetar schemas de tool bem definidos.

## Conceitos-chave

- [[function-calling]]
- [[tool-use]]
- [[json-schema]]
- [[structured-output]]
- [[agents]]
- [[mcp]]

## Conexões com o Mundo Real

ChatGPT browsing/weather (2023) foi o primeiro uso massivo; hoje: agentes que consultam banco, enviam emails, controlam IDEs — todo tool call em Claude Code/Cursor é function calling por baixo, com o host (client MCP) fazendo a ponte até o MCP server que de fato executa.

## Meus Insights

Function calling e MCP são camadas complementares: FC = capacidade do modelo (decide a chamada, gera argumentos); MCP = protocolo de integração (de onde vêm os schemas, onde a tool roda, descoberta dinâmica, transporte). MCP depende de tool calling para funcionar — não é sucessor. Antes do MCP cada provider tinha sua forma de expor tools; o MCP unifica a camada de acesso (N×M → N+M).

## Fontes para Aprofundamento

- [OpenAI — Function Calling](https://platform.openai.com/docs/guides/function-calling) — confiabilidade: alta
- [Anthropic — Tool Use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) — confiabilidade: alta
- [MCP Specification](https://spec.modelcontextprotocol.io) — confiabilidade: alta

## Conexões

- Pai: [[ia]]
- [[mcp-overview]]
- [[mcp-elicitation]]
- [[agentes-ia]]
- [[llms]]
- [[prompt-engineering]]

