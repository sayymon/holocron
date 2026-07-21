---
titulo: "LangGraph — O Padrão de Produção para Agentes"
tags: [langgraph, agentes, state-machine, grafos, workflows, human-in-the-loop]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-frameworks
status: explored
connections:
  - agentes-ia
  - langchain
  - observabilidade-llm
  - langsmith
  - human-in-the-loop
---
# LangGraph — O Padrão de Produção para Agentes

## O que é

LangGraph é um framework para construir agentes de IA como **grafos de estado** (state machines). Cada nó é uma unidade de computação (tool call, LLM call, lógica), cada aresta define o fluxo de controle. Um objeto de estado compartilhado persiste entre execuções.

Criado pela LangChain Inc, é o padrão de facto para agentes em produção em 2026. Usado por Klarna, LinkedIn, Uber, Replit.

## Conceitos Fundamentais

| Conceito | Descrição |
|----------|-----------|
| **State** | Objeto tipado compartilhado entre todos os nós |
| **Node** | Unidade de trabalho (LLM call, tool, lógica) |
| **Edge** | Conexão entre nós (conditional ou fixo) |
| **Checkpointer** | Persiste estado (Postgres, SQLite, memory) |
| **Human-in-the-loop** | Pausa, revisão humana, e retoma |
| **Subgraphs** | Grafos aninhados (composição) |
| **Streaming** | Tokens e eventos em tempo real |

## Funcionalidades Chave

| Feature | O que resolve |
|---------|--------------|
| **Cycles & Loops** | Agente que itera até resolver |
| **Branching** | Decisões condicionais (if/else no grafo) |
| **Persistence** | Pausa e retoma, sobrevive a crashes |
| **[[human-in-the-loop]]** | Approval gates antes de ações perigosas |
| **Time travel** | Replay/debug de qualquer ponto do grafo |
| **Multi-agent** | Grafos que orquestram outros grafos |
| **Durable execution** | Long-running workflows (horas/dias) |
| **Streaming** | Tokens + state updates em real-time |

## Preço

- **Framework**: Open-source (MIT), grátis
- **LangGraph Platform** (managed): Pricing sob consulta (enterprise)
- **LangSmith** (observability): Free 5K traces → $39/seat/mês

## Quando Usar

✅ **Use LangGraph quando:**
- Workflow com **loops, branches, retries**
- Precisa de **human-in-the-loop** (approval gates)
- Agente precisa **persistir estado** entre sessões
- Workflows **long-running** (minutos/horas)
- Precisa de **observabilidade** detalhada (com LangSmith)
- Produção real (não prototipação)

❌ **Evite quando:**
- Workflow é linear sem branching (use [[langchain]] chain simples)
- Quer setup rápido sem boilerplate ([[crewai]] é mais rápido)
- Não usa Python/TypeScript
- Prototipação rápida (overhead de setup)

## Exemplo de Uso

```
[Input] → [Classify Intent] → [Route]
                                  │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              [Search DB]   [Call API]    [Ask Human]
                    │              │              │
                    └──────────────┼──────────────┘
                                  ▼
                         [Generate Response]
                                  │
                         [Quality Check] ←──┐
                                  │         │ (loop se falhar)
                                  ▼         │
                         [Return or Retry]──┘
```

## Casos de Uso na Hotmart

- **SARA**: Agent que busca na base de suporte, decide se resolve ou escala
- **Sales Assistant**: Workflow de qualificação → pesquisa → outreach
- **Code Review**: Agent que lê PR, busca padrões, gera review

## Conceitos Relacionados

- [[agentes-ia]] — Categoria geral
- [[langchain]] — Framework pai
- [[langsmith]] — Observabilidade
- [[human-in-the-loop]] — Padrão de segurança
- [[crewai]] — Alternativa (role-based)
- [[openai-agents-sdk]] — Alternativa (managed)

## Conexões

- [[langchain]] — Base do ecossistema
- [[langsmith]] — Monitora LangGraph
- [[crewai]] — Competidor (mais simples)
- [[observabilidade-llm]] — Integração nativa
