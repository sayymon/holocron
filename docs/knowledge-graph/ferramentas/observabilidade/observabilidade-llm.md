---
titulo: "Observabilidade LLM — Monitorar IA em Produção"
tags: [observabilidade, langfuse, langsmith, traces, custos, latencia, eval]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: infrastructure
status: explored
connections:
  - llms
  - agentes-ia
  - langfuse
  - langsmith
  - rag
---
# Observabilidade LLM — Monitorar IA em Produção

## O que é

Observabilidade de LLM é a capacidade de **ver, medir e debugar** o que seus modelos de IA estão fazendo em produção. Inclui traces de cada chamada, custos por usuário/feature, latência, qualidade de respostas e detecção de problemas.

Diferente de APM tradicional (NewRelic, Datadog), observabilidade LLM precisa entender:
- **Traces multi-step** (uma query pode gerar 10+ chamadas LLM)
- **Token economics** (custo real por request)
- **Qualidade semântica** (hallucination, relevância, faithfulness)
- **Prompt versioning** (qual versão do prompt performa melhor)

## Por que importa

> "Impossível otimizar o que não mede" — Mantra 7

Sem observabilidade LLM você:
- Não sabe quanto está gastando por feature
- Não sabe se mudanças de prompt melhoraram ou pioraram
- Não detecta hallucinations até o cliente reclamar
- Não consegue debugar agents que falham silenciosamente

## Ferramentas Principais

| Ferramenta | Tipo | Preço | Best For |
|------------|------|-------|----------|
| **[[langfuse]]** | Open-source, self-host | Grátis (self) / Cloud free tier | GDPR, data sovereignty, framework-agnostic |
| **[[langsmith]]** | Managed (LangChain) | Free: 5K traces / Plus: $39/seat | Stack LangChain/LangGraph |
| **Arize Phoenix** | Open-source | Grátis | RAG evaluation, hallucination |
| **Helicone** | Managed proxy | Free: 100K req/mês | Zero config, logging simples |
| **Braintrust** | Managed | Free tier + usage | Eval programático, A/B prompts |
| **Latitude** | Agent-native | Paid | Multi-turn agents, issue discovery |
| **W&B (Weights & Biases)** | MLOps + LLM | Free personal | Experiments, fine-tuning |

## O que Monitorar

| Camada | Métricas | Ferramentas |
|--------|----------|-------------|
| **Custo** | $/request, $/user, $/feature | LangFuse, Helicone |
| **Latência** | TTFB, total time, streaming speed | LangFuse, NewRelic |
| **Qualidade** | Faithfulness, relevance, correctness | RAGAS, DeepEval, Phoenix |
| **Errors** | Rate limits, timeouts, parsing failures | LangFuse, Sentry |
| **Usage** | Tokens in/out, cache hit rate, model distribution | LangFuse, Helicone |
| **Traces** | Full chain: query → retrieval → generation | LangSmith, LangFuse |

## Distinção Importante

| Observabilidade LLM | Observabilidade de Agentes |
|---------------------|---------------------------|
| Cada LLM call independente | Causal dependencies entre steps |
| Input → Output por call | Multi-turn, branching, tool loops |
| Simples de correlacionar | Requer trace tree completo |
| LangFuse/LangSmith resolvem | Latitude, Arize são mais agent-native |

## Na Hotmart

- **LangFuse** para IA (traces LLM, custos, prompts)
- **NewRelic** para APM geral (latência de serviços)
- **Sentry** para error tracking
- **Kibana/ELK** para logs

## Conceitos Relacionados

- [[langfuse]] — Principal ferramenta open-source
- [[langsmith]] — Para stack LangChain
- [[llms]] — O que monitora
- [[agentes-ia]] — Complexidade extra
- [[rag]] — Pipeline para avaliar

## Conexões

- [[langfuse]] — Ferramenta recomendada
- [[langsmith]] — Alternativa managed
- [[langchain]] — Integração nativa (Smith)
- [[langgraph]] — Traces de grafos
