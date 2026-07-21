---
titulo: "OpenRouter — Router Multi-Provider de LLMs"
tags: [openrouter, router, multi-provider, gateway, api]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-infrastructure
status: explored
connections:
  - ai-gateway
  - llms
  - inference-platforms
---
# OpenRouter — Router Multi-Provider de LLMs

## O que é

OpenRouter é um **router API** que dá acesso a 250+ modelos de múltiplos providers (OpenAI, Anthropic, Google, Meta, Mistral, etc.) via uma única API key. Faz roteamento, failover, e oferece modelos gratuitos para experimentação.

O Holocron usa OpenRouter como provider de embeddings e LLM.

## Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **250+ modelos** | Todos os providers via uma API |
| **Unified API** | Compatible com OpenAI SDK |
| **Free models** | 20+ modelos gratuitos (com limites) |
| **Auto-routing** | Roteia para provider mais barato/rápido |
| **Fallback** | Se provider A falha, tenta B |
| **No minimum** | Pay-per-token, sem mínimo mensal |
| **Prompt caching** | Suporta cache de providers que oferecem |

## Preço

- **Sem assinatura** — paga só tokens consumidos
- **Markup**: 0-30% sobre preço do provider (varia por modelo)
- **Free models**: ~20 modelos sem custo (rate limited)
- **Deposit mínimo**: $5 para começar

## Quando Usar

✅ **Use OpenRouter quando:**
- Quer **experimentar vários modelos** sem criar conta em cada provider
- Precisa de **fallback automático** entre providers
- Quer **modelos grátis** para dev/teste
- Projeto pessoal/estudo sem commitment enterprise
- Quer comparar modelos facilmente

❌ **Evite quando:**
- Enterprise com SLA rígido (Bedrock é melhor)
- Latência ultra-crítica (overhead de routing ~20-50ms)
- Volume massivo (direto no provider é mais barato)
- Compliance exige controle total de dados

## No Holocron

OpenRouter é o provider configurado:
- Embeddings: `text-embedding-3-small` via OpenRouter
- LLM: Modelos Anthropic/OpenAI via OpenRouter
- Permite trocar modelos sem mudar código

## Conceitos Relacionados

- [[ai-gateway]] — Categoria
- [[llms]] — O que roteia
- [[inference-platforms]] — Backends reais

## Conexões

- [[ai-gateway]] — Tipo
- [[llms]] — Modelos
- [[langchain]] — Framework que usa
- [[anthropic-claude]] — Provider acessado via
- [[openai-gpt]] — Provider acessado via
