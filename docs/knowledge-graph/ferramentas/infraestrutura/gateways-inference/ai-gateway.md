---
titulo: "AI Gateway — Proxy Inteligente para LLMs"
tags: [gateway, proxy, routing, litellm, portkey, openrouter, failover]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: infrastructure
status: explored
connections:
  - llms
  - openrouter
  - inference-platforms
  - observabilidade-llm
---
# AI Gateway — Proxy Inteligente para LLMs

## O que é

Um AI Gateway é uma camada entre sua aplicação e os provedores de modelos (OpenAI, Anthropic, Google, etc). Unifica APIs, gerencia failover, faz caching, rate limiting, logging e routing inteligente.

**Analogia:** É o Kong/NGINX do mundo de IA — um reverse proxy especializado.

## Por que importa

Sem gateway:
- Um provider cai → sua app cai
- Trocar de modelo = reescrever código
- Sem visibility de custos por route
- Sem cache = pagar 2x pela mesma resposta
- Sem retry/fallback automático

## Soluções de Gateway

| Ferramenta | Tipo | Preço | Providers | Destaque |
|------------|------|-------|:---------:|----------|
| **[[openrouter]]** | Router managed | Markup 0-30% | 250+ | Diversidade de modelos, free models |
| **LiteLLM** | Open-source proxy | Grátis (self-host) | 100+ | Controle total, sem vendor lock |
| **Portkey** | Gateway managed | Free tier + usage | 30+ | Enterprise, guardrails, analytics |
| **Cloudflare AI Gateway** | CDN + gateway | Free tier (100K/dia) | 10+ | Caching global, já usa CF |
| **Helicone** | Proxy + observ. | Free: 100K req | 20+ | Logging + analytics zero-config |
| **AWS Bedrock** | Plataforma managed | Pay-per-token | 10+ | Enterprise AWS, compliance |
| **Vercel AI Gateway** | Gateway + SDK | Incluso no Pro | 10+ | Next.js, edge, streaming |
| **Requesty** | Router inteligente | Usage-based | 20+ | 8ms overhead, routing por custo |

## Funcionalidades de um Gateway

| Feature | O que faz | Economia |
|---------|-----------|:--------:|
| **Unified API** | Uma API, todos os providers | Dev time |
| **Failover** | Provider A falha → tenta B | Uptime |
| **Caching semântico** | Resposta similar = cache hit | 40-60% custo |
| **Rate limiting** | Controlar burst por user/key | Estabilidade |
| **Retry + backoff** | Retry automático em 429/500 | Reliability |
| **Cost tracking** | Custo por route/user/model | Visibility |
| **Model routing** | Modelo X para task Y | Otimização |
| **Guardrails** | Bloquear PII, temas proibidos | Compliance |
| **Load balancing** | Distribuir entre API keys | Throughput |

## Decisão: Self-host vs Managed

| Critério | Self-host (LiteLLM) | Managed (Portkey/OpenRouter) |
|----------|:-------------------:|:---------------------------:|
| Custo mensal | $0 + infra | $0-500+ por volume |
| Setup | Horas | Minutos |
| Manutenção | Sua equipe | Zero |
| Customização | Total | Limitada |
| Compliance | Total controle | Depende do provider |
| SLA | Seu | Provider garante |

## Na Hotmart

**Hotmart AI Gateway v2** é o gateway proprietário:
- Backend: AWS Bedrock
- Multi-provider: Gemini, GPT, Claude via Bedrock
- Controle de custos por squad
- Compliance enterprise
- Observabilidade via LangFuse

## Conceitos Relacionados

- [[llms]] — O que roteia
- [[openrouter]] — Provider-agnostic router
- [[inference-platforms]] — Backends de inferência
- [[observabilidade-llm]] — Monitorar o gateway

## Conexões

- [[openrouter]] — Implementação managed
- [[llms]] — Modelos acessados
- [[observabilidade-llm]] — Monitoring
- [[langchain]] — Framework que usa gateways
