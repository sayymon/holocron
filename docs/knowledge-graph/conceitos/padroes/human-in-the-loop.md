---
titulo: "Human-in-the-Loop — Supervisão Humana em Agentes"
tags: [hitl, human, supervisao, seguranca, approval, agentes]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: patterns
status: explored
connections:
  - agentes-ia
  - langgraph
  - coding-assistants
---
# Human-in-the-Loop — Supervisão Humana em Agentes

## O que é

Human-in-the-Loop (HITL) é o padrão onde um agente **pausa em pontos críticos** para obter aprovação humana antes de executar ações perigosas ou irreversíveis. É a principal estratégia de segurança para agentes autônomos.

## Por que importa

Agentes cometem erros. HITL previne:
- Deletar dados em produção
- Enviar email para cliente errado
- Deploy de código broken
- Gastar budget excessivo em API calls

## Padrões de HITL

| Padrão | Descrição | Uso |
|--------|-----------|-----|
| **Approval Gate** | Agente pausa antes de ação destrutiva | Deletes, deploys, emails |
| **Review Before Send** | Humano revisa output antes de enviar | Content, comms |
| **Escalation** | Agente escala para humano se incerto | Suporte, vendas |
| **Confidence Threshold** | Pausa se confidence < X% | Classificação |
| **Budget Cap** | Pausa se gastou > $Y | Cost control |

## Implementação em LangGraph

LangGraph é o framework com melhor suporte a HITL:
- **Checkpointing** — Persiste estado antes da pausa
- **interrupt_before** — Para antes de um nó executar
- **interrupt_after** — Para depois para revisão
- **Time travel** — Voltar e mudar decisão

## Implementação em Kiro

- **Supervised mode** — Agente pede aprovação a cada file edit
- **preToolUse hooks** — Interceptar ações antes de executar
- **Steering rules** — Definir o que precisa de supervisão

## Conceitos Relacionados

- [[agentes-ia]] — Onde HITL é aplicado
- [[langgraph]] — Framework com melhor HITL
- [[coding-assistants]] — Supervised mode
- [[kiro]] — Supervised mode nativo

## Conexões

- [[agentes-ia]] — Segurança
- [[langgraph]] — Checkpointing nativo
- [[kiro]] — Supervised mode
- [[observabilidade-llm]] — Auditar decisões
