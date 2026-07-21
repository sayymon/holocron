---
titulo: "Kiro — IDE Spec-Driven com IA (AWS)"
tags: [kiro, ide, aws, specs, hooks, steering, mcp, coding]
fonte: Experiência direta + pesquisa
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-developers
status: explored
connections:
  - coding-assistants
  - mcp
  - anthropic-claude
  - agentes-ia
---
# Kiro — IDE Spec-Driven com IA (AWS)

## O que é

Kiro é uma IDE AI-native da AWS baseada em Code OSS. Diferencia-se pelo paradigma **Spec-driven development** — em vez de só chat com IA, você define Requirements → Design → Tasks, e o agente implementa de forma estruturada.

## Diferenciais

| Feature | Descrição |
|---------|-----------|
| **Specs** | Requirements → Design → Implementation Tasks estruturados |
| **Hooks** | Automações (lint on save, test on edit, preToolUse) |
| **Steering** | Regras persistentes para o agente (padrões do time) |
| **MCP nativo** | Integra qualquer MCP server (Jira, Figma, DB, etc.) |
| **Autopilot/Supervised** | Controle de autonomia do agente |
| **Vibe & Spec modes** | Conversational OU estruturado |
| **Powers** | Pacotes de capabilities (docs + MCP + steering) |
| **Sub-agents** | Delegação de tasks para agentes especializados |

## Preço

| Plano | Preço | Credits | Inclui |
|-------|:-----:|:-------:|--------|
| **Free** | $0 | 50/mês | Features básicas |
| **Pro** | $20/mês | 1000/mês | Full features |

## Quando Usar

✅ **Use Kiro quando:**
- Quer **governança** no uso de IA (steering, hooks)
- Features complexas que precisam de **spec** antes de código
- Time com padrões definidos (coding standards via steering)
- Integra com **ferramentas externas** via MCP
- Quer **controle** sobre o que o agente faz (supervised mode)

## Configuração MCPs

```json
// .kiro/settings/mcp.json
{
  "mcpServers": {
    "github": { "command": "...", "args": [...] },
    "jira": { "command": "...", "args": [...] },
    "figma": { "command": "...", "args": [...] }
  }
}
```

## Conceitos Relacionados

- [[coding-assistants]] — Categoria
- [[mcp]] — Extensibilidade
- [[anthropic-claude]] — Modelo default
- [[agentes-ia]] — Autopilot mode

## Conexões

- [[coding-assistants]] — Categoria
- [[mcp]] — Integração de tools
- [[anthropic-claude]] — Backend model
- [[agentes-ia]] — Agent mode
