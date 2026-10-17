---
titulo: MCP Elicitation — Input do Usuário em Runtime
tags:
  - mcp
  - elicitation
  - human-in-the-loop
  - hitl
  - approval
  - protocol
fonte: Sessão socrática — Holocron AI Engineer
confiabilidade: alta
data: '2026-10-17'
ring: 2
area: patterns
status: explored
prerequisitos: []
connections:
  - mcp-overview
  - mcp-transports
  - mcp-building
  - human-in-the-loop
  - mcp-server-instructions
  - function-calling
---
# MCP Elicitation — Input do Usuário em Runtime

## O que é

Elicitation é uma primitiva do MCP (spec 2025-06-18) em que o server envia uma requisição elicitation/create ao client DURANTE a execução de uma sessão — tipicamente dentro de um handler de tool — para pedir input estruturado ao usuário (JSON Schema descrevendo o form). O client mostra a interface ao usuário real e devolve { action: 'accept' | 'decline' | 'cancel', content? }. Requer que o client declare a capability elicitation: {} no initialize; sem ela, o server recebe erro e precisa de fallback. Importante: NÃO é um campo retornado na resposta da tool — é uma mensagem de protocolo server→client no meio do fluxo, e a resposta final da tool só sai depois que o usuário responde.

## Por que importa

É o mecanismo server-side de human-in-the-loop: permite programar no server confirmações contextuais ("apagar 3 arquivos?"), coleta de parâmetros faltantes e aprovação de ações destrutivas — sem depender da configuração de permissão do host. Essencial para AI Engineers que constroem MCP servers com ações reais sobre sistemas externos.

## Conceitos-chave

- [[elicitation]]
- [[human-in-the-loop]]
- [[tool-approval]]
- [[two-phase-confirmation]]
- [[sampling]]
- [[capabilities]]
- [[initialize-handshake]]

## Como começar (Quick Start)

No TS SDK: extra.elicitInput({ message, requestedSchema }) dentro do handler de server.tool(...); checar r.action === 'accept' antes de prosseguir. Alternativa sem elicitation: padrão 2 fases (tool prepare_* retorna plano + token; execute_* exige token válido).

## Conexões com o Mundo Real

Server que apaga recursos pede confirmação sim/não antes de executar; formulário de dados faltantes no meio de um tool call; aprovação contextual complementando a permission prompt do host (Claude Code/Cursor), que é client-side e guiada por tool annotations (readOnlyHint).

## Meus Insights

Elicitation pede input ao USUÁRIO, não à LLM — se quem deve "aprovar" é o modelo, é sampling ou retorno de erro/retry. Aprovação genérica (allowlist por tool) é configuração do client; aprovação contextual é programada no server via elicitation.

## Fontes para Aprofundamento

- [MCP Specification — Elicitation](https://spec.modelcontextprotocol.io/specification/2025-06-18/client/elicitation/) — confiabilidade: alta
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) — confiabilidade: alta

## Conexões

- Pai: [[ia]]
- [[mcp-overview]]
- [[mcp-transports]]
- [[mcp-building]]
- [[human-in-the-loop]]
- [[mcp-server-instructions]]
- [[function-calling]]

