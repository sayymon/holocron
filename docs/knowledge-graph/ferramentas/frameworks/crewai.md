---
titulo: "CrewAI — Multi-Agentes com Papéis"
tags: [crewai, multi-agent, roles, crew, tasks, orchestration]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-frameworks
status: explored
connections:
  - agentes-ia
  - langchain
  - llms
---
# CrewAI — Multi-Agentes com Papéis

## O que é

CrewAI é um framework para orquestrar **múltiplos agentes com papéis definidos** (role, goal, backstory) que colaboram em tasks sequenciais ou paralelas. É o caminho mais rápido para montar um "time de IA" — pesquisador, escritor, revisor trabalhando juntos.

Cruzou **2 bilhões de execuções agentic** em 2026.

## Conceitos Fundamentais

| Conceito | Descrição |
|----------|-----------|
| **Agent** | Personagem com role, goal, backstory, tools |
| **Task** | Unidade de trabalho com description e expected_output |
| **Crew** | Grupo de agentes + tasks + estratégia de execução |
| **Process** | Sequential ou Hierarchical (com manager) |
| **Tools** | Ações que agentes podem tomar |
| **Memory** | Short-term, long-term, entity memory |

## Preço

| Plano | Preço | Inclui |
|-------|:-----:|--------|
| **Open-source** | Grátis | Framework Python, self-host |
| **Free Cloud** | $0 | ≤1,000 agents/mês |
| **Pro (AMP)** | $99/mês | 10K agents, Studio visual, tracing |
| **Enterprise** | Custom | Ilimitado, SSO, SLA, dedicated |

**Atenção:** O custo REAL são os LLM API calls. CrewAI chains inflam tokens 3-5x por retries e system prompts.

## Quando Usar

✅ **Use CrewAI quando:**
- Quer **setup rápido** (minutos, não horas)
- Tem papéis claros (pesquisador → escritor → revisor)
- Workflows **sequenciais definidos**
- Prototipação de multi-agente
- Quer visual Studio (AMP) para não-devs

❌ **Evite quando:**
- Workflow precisa de **loops/cycles complexos** (use [[langgraph]])
- Precisa de **human-in-the-loop** granular (LangGraph é melhor)
- Enterprise regulated (menos maduro que LangGraph)
- Budget apertado (overhead de tokens é alto)

## Diferença CrewAI vs LangGraph

| Dimensão | CrewAI | LangGraph |
|----------|--------|-----------|
| Abstração | Alta (role/task/crew) | Baixa (nodes/edges/state) |
| Setup | Minutos | Horas |
| Flexibilidade | Média | Alta (qualquer topologia) |
| Human-in-the-loop | Básico | Nativo com checkpoints |
| Produção | Crescendo | Padrão estabelecido |
| Controle fino | Limitado | Total |

## Exemplos de Crews

- **Research Crew**: Researcher → Analyst → Writer
- **Content Crew**: SEO Analyst → Writer → Editor → Publisher
- **Code Crew**: Architect → Developer → Reviewer → Tester
- **Sales Crew**: Lead Researcher → Email Writer → Follow-up Agent

## Conceitos Relacionados

- [[agentes-ia]] — Categoria geral
- [[langgraph]] — Alternativa mais flexível
- [[openai-agents-sdk]] — Alternativa managed
- [[llms]] — Modelos que os agentes usam

## Conexões

- [[langgraph]] — Competidor (mais controle)
- [[langchain]] — Pode usar tools do LangChain
- [[observabilidade-llm]] — Integra com LangFuse/Smith
