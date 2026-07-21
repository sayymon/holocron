---
titulo: "LangSmith — Observabilidade para LangChain"
tags: [langsmith, observabilidade, langchain, traces, eval, prompts]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-infrastructure
status: explored
connections:
  - observabilidade-llm
  - langchain
  - langgraph
---
# LangSmith — Observabilidade para LangChain

## O que é

LangSmith é a plataforma managed de observabilidade e avaliação da LangChain Inc. Integração nativa com LangChain/LangGraph para tracing, prompt versioning, evaluation datasets e debugging.

## Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **Tracing** | Trace completo de chains/graphs automaticamente |
| **Prompt Hub** | Versionar, testar, compartilhar prompts |
| **Evaluations** | Datasets + evaluators automáticos |
| **Online Evaluation** | Avaliar em produção continuamente |
| **Annotations** | Feedback humano para melhoria |
| **Playground** | Testar prompts com models diferentes |
| **Dashboards** | Métricas de produção (latência, custo, erros) |
| **Automation** | Rules para alertas e ações automáticas |

## Preço

| Plano | Preço | Traces | Inclui |
|-------|:-----:|:------:|--------|
| **Developer** | Grátis | 5K/mês | 1 user, basic features |
| **Plus** | $39/seat/mês | 50K+/mês | Team, full eval, prompts |
| **Enterprise** | Custom | Ilimitado | SSO, SLA, data isolation |

## Quando Usar

✅ **Use LangSmith quando:**
- Stack é **LangChain/LangGraph** (integração nativa é plug-and-play)
- Quer **prompt versioning** sofisticado
- Precisa de **evaluation datasets** (golden sets)
- Time usa LangGraph e quer **debug de grafos**

❌ **Evite quando:**
- Stack não é LangChain → [[langfuse]] é framework-agnostic
- Self-host obrigatório → [[langfuse]] (open-source)
- Time grande, per-seat pricing é caro → [[langfuse]] (sem per-seat)
- Budget mínimo e volume alto

## LangSmith vs LangFuse

| Dimensão | LangSmith | LangFuse |
|----------|-----------|----------|
| Pricing | Per-seat ($39) | Per-volume ou grátis (self) |
| Self-host | ❌ | ✅ |
| LangChain integration | Nativa (1 line) | Decorator (3 lines) |
| Framework-agnostic | Limitado | ✅ Total |
| Prompt Management | ✅ Avançado | ✅ Básico |
| Eval features | ✅ Líder | 🟡 Crescendo |

## Conceitos Relacionados

- [[observabilidade-llm]] — Categoria
- [[langfuse]] — Alternativa open-source
- [[langchain]] — Ecossistema
- [[langgraph]] — Traces de grafos

## Conexões

- [[langchain]] — Ecossistema
- [[langgraph]] — Debug de grafos
- [[langfuse]] — Competidor
- [[observabilidade-llm]] — Categoria
