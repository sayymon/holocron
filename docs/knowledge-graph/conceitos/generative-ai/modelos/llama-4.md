---
titulo: "Llama 4 — Open-Weights MoE"
tags: [llama, meta, open-weights, moe, scout, maverick, 10m-contexto]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 0
area: generative-ai
status: explored
wikilinks:
  - meta-llama
  - llms
  - geracao-texto
  - fine-tuning
  - ollama
  - inference-platforms
---

# Llama 4 — Open-Weights MoE

> Llama 4 e a familia de modelos open-weights da Meta, com arquitetura MoE e contexto de ate 10M tokens. Llama 4 Scout tem o maior contexto do mundo (10M).

## O Que e

```
┌─────────────────────────────────────────────────────┐
│                LLAMA 4 MAVERICK                      │
│                                                      │
│  EMPRESA: Meta                                       │
│  LANCAMENTO: Abril 2025                              │
│  ARQUITETURA: MoE (Mixture of Experts)               │
│  LICENCA: Llama License (restricoes para >700M MAU)  │
│                                                      │
│  CAPACIDADES:                                         │
│    → Texto (geracao, analise)                         │
│    → Imagem (input - multimodal nativo)               │
│    → Multilingue (200+ idiomas)                       │
│    → Coding                                           │
│    → Tool calling                                     │
│                                                      │
│  DIFERENCIAIS:                                        │
│    → Open-weights (download gratuito)                 │
│    → MoE eficiente (17B ativos por token)             │
│    → Maior contexto do mundo (Scout: 10M)             │
│    → Self-hosting gratuito                            │
│                                                      │
│  STATUS: #1 OPEN-WEIGHTS (Set 2026)                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Especificacoes Tecnicas

| Caracteristica | Maverick | Scout |
|----------------|:--------:|:-----:|
| **Params Ativos** | 17B | 17B |
| **Params Totais** | 400B | 109B |
| **Experts** | 128 | 16 |
| **Context Window** | 1M | **10M** |
| **Input** | Texto + Imagem | Texto + Imagem |
| **Output** | Texto | Texto |
| **Idiomas** | 200+ | 200+ |

## Preco

| Cenario | Custo |
|---------|:-----:|
| **Self-hosting** | Gratuito |
| **AWS Bedrock** | $0.24/MTok input, $0.97/MTok output |
| **OpenRouter** | Variavel |

### Comparativo de Custo

| Modelo | Custo | Contexto |
|--------|:-----:|:--------:|
| **Llama 4 (self-host)** | **Gratuito** | 1M-10M |
| Llama 4 (Bedrock) | $1.21/MTok | 1M-10M |
| GPT-6 Astra | $60.00/MTok | 1.05M |
| Claude Fable 5.1 | $18.00/MTok | 200K |

## Benchmarks (Setembro 2026)

### Geral

| Benchmark | Llama 4 Maverick | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:----------------:|:-----------:|:----------------:|
| **AA Intelligence Index** | 22.9 | **60.7** | 56.8 |

### Coding

| Benchmark | Llama 4 Maverick | DeepSeek V4 | Claude Fable 5.1 |
|-----------|:----------------:|:-----------:|:----------------:|
| **SWE-Bench** | ~65% | 76.2% | **78.5%** |

### Contexto

| Benchmark | Llama 4 Scout | Gemini 3.1 Pro | GPT-6 Astra |
|-----------|:-------------:|:--------------:|:-----------:|
| **Max Context** | **10M** | 2M | 1.05M |

## Capacidades Principais

### 1. Maior Contexto do Mundo (Scout)

```
LLAMA 4 SCOUT: 10M tokens

COMPARACAO:
  → Scout: 10M
  → Gemini 3.1 Pro: 2M
  → GPT-6 Astra: 1.05M
  → Claude Opus: 200K

USE PARA:
  → Documentos inteiros (livros, papers)
  → Codebases completos
  → Analise de video longo
  → Conversas extensas
```

### 2. Open-Weights

```
OPEN-WEIGHTS SIGNIFICA:
  → Download gratuito dos pesos
  → Self-hosting livre
  → Fine-tuning permitido
  → Personalizacao total

VANTAGENS:
  → Sem custo de API
  → Privacidade (roda local)
  → Customizacao completa
  → Sem rate limits
```

### 3. MoE Eficiente

```
MOE (MIXTURE OF EXPERTS):
  → 400B params totais
  → Apenas 17B ativos por token
  → Mais rapido e barato que dense

COMPARACAO:
  → Llama 4: 17B ativos / 400B total
  → GPT-6: ~1T dense
  → Claude: ~500B dense
```

### 4. Multimodal Nativo

```
LLAMA 4 ENTENDE:
  → Texto
  → Imagens (input)
  → 200+ idiomas

NAO GERA:
  → Imagens
  → Audio
  → Video
```

## Familia Llama

| Modelo | Params | Contexto | Licenca | Uso |
|--------|:------:|:--------:|---------|-----|
| **Llama 4 Maverick** | 17B/400B | 1M | Llama | Performance |
| **Llama 4 Scout** | 17B/109B | **10M** | Llama | Long context |
| **Llama 3.3 70B** | 70B | 128K | Llama | Workhorse |
| **Llama 3.1 405B** | 405B | 128K | Llama | Maior dense |

## Quando Usar

### Use Llama 4 quando

| Caso | Por que |
|------|---------|
| **Self-hosting** | Gratuito |
| **Budget apertado** | Sem custo de API |
| **Long context** | Scout: 10M |
| **Privacidade** | Roda local |
| **Customizacao** | Fine-tuning livre |

### Evite quando

| Caso | Por que |
|------|---------|
| **API managed** | OpenAI/Anthropic mais faceis |
| **Coding maximo** | Claude lidera |
| **Computer use** | GPT-6 lidera |
| **Production sem infra** | Requer GPU proprio |

## Conexoes

- [[meta-llama]] — Provider e ecossistema
- [[llms]] — Categoria
- [[geracao-texto]] — Aplicacao principal
- [[fine-tuning]] — Open-weights permite
- [[ollama]] — Self-hosting local
- [[inference-platforms]] — Onde rodar
- [[gpt-6-astra]] — Concorrente proprietario
- [[deepseek-v4]] — Concorrente open-source
- [[qwen-3.5]] — Concorrente open-source

---

**Status:** Documento explorado — Llama 4 completo
**Ultima atualizacao:** Setembro 2026
