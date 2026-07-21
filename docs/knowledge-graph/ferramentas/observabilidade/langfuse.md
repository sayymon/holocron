---
titulo: "LangFuse — Observabilidade Open-Source para LLMs"
tags: [langfuse, observabilidade, open-source, traces, custos, eval]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-infrastructure
status: explored
connections:
  - observabilidade-llm
  - langchain
  - llms
---
# LangFuse — Observabilidade Open-Source para LLMs

## O que é

LangFuse é a plataforma open-source de observabilidade para aplicações LLM. Oferece tracing, avaliação, prompt management e analytics. Foi adquirida pela ClickHouse em Jan 2026, mantendo o produto open-source.

**Default para a maioria dos times em 2026** — framework-agnostic, sem per-seat pricing, data sovereignty.

## Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **Traces** | Visualizar cadeia completa de chamadas LLM |
| **Cost tracking** | Custo real por trace, user, feature |
| **Prompt Management** | Versionar e gerenciar prompts |
| **Evaluations** | Scores manuais e automáticos de qualidade |
| **Datasets** | Golden sets para testes de regressão |
| **Dashboards** | Métricas agregadas (latência, custo, volume) |
| **Annotations** | Feedback humano em outputs |
| **Sessions** | Agrupar traces por sessão/conversa |

## Preço

| Plano | Preço | Inclui |
|-------|:-----:|--------|
| **Self-hosted** | Grátis | Tudo, sem limites, seus dados |
| **Cloud Free** | $0 | 50K observations/mês |
| **Cloud Pro** | $59/mês | 200K observations/mês |
| **Cloud Team** | Custom | Ilimitado, SSO, SLA |

**Sem per-seat pricing** — diferencial vs LangSmith.

## Integrações

- ✅ LangChain / LangGraph (decorators nativos)
- ✅ LlamaIndex
- ✅ OpenAI SDK (wrapper automático)
- ✅ Vercel AI SDK
- ✅ Qualquer LLM (SDK genérico Python/JS)
- ✅ Flowise, Langflow

## Quando Usar

✅ **Use LangFuse quando:**
- **Self-host obrigatório** (GDPR, LGPD, compliance)
- Time usa **múltiplos frameworks** (não só LangChain)
- Não quer **per-seat pricing** (times grandes)
- Quer **prompt management** centralizado
- Budget limitado (free tier generoso)

❌ **Evite quando:**
- Stack é 100% LangChain e quer integração nativa máxima → [[langsmith]]
- Precisa de evaluation agent-native avançada → Latitude ou Arize

## Na Hotmart

LangFuse é o padrão de observabilidade LLM:
- Tracking de SARA, CAIO, Sales Assistant
- Custo por agente/feature
- Avaliação de qualidade de respostas
- Self-hosted para compliance

## Conceitos Relacionados

- [[observabilidade-llm]] — Categoria
- [[langsmith]] — Alternativa managed
- [[langchain]] — Framework integrado
- [[rag]] — Pipeline para monitorar

## Conexões

- [[observabilidade-llm]] — Categoria pai
- [[langsmith]] — Competidor
- [[langchain]] — Integração
- [[llms]] — O que monitora
