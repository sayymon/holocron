---
titulo: "Meta Llama — Open-Weights Lider"
tags: [meta, llama, open-source, moe, self-host, open-weights, muse-spark]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: tools-providers
status: explored
wikilinks:
  - llms
  - fine-tuning
  - ollama
  - inference-platforms
  - generative-ai
  - llama-4
---

# Meta Llama — Open-Weights Lider

> Meta e a empresa por tras do Llama, a familia de modelos open-weights mais popular do mundo. Em 2026, lancou Llama 4 (MoE) e Muse Spark (proprietario).

## Modelos Atomicos

| Modelo | Doc | Status |
|--------|-----|:------:|
| **Llama 4** | [[llama-4]] | ✅ Explorado |

## Arquitetura Interna

```
┌─────────────────────────────────────────────────────┐
│                LLAMA 4 MAVERICK                      │
│                                                      │
│  ARQUITETURA: MoE (Mixture of Experts)               │
│  PARAMS: 17B ativos / 400B total (128 experts)      │
│  CONTEXT WINDOW: 1M tokens                           │
│  MULTIMODAL: Texto + Imagem (input)                  │
│  LICENCA: Llama License (restricoes para >700M MAU)  │
│                                                      │
│  DIFERENCIAIS:                                       │
│    → Open-weights (download gratuito)                │
│    → MoE eficiente (17B ativos por token)            │
│    → Multimodal nativo                               │
│    → 10M contexto (Scout)                            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Modelos (Setembro 2026)

### Llama 4 Series (Open-Weights)

| Modelo | Params (Ativos/Total) | Experts | Contexto | Destaque |
|--------|:---------------------:|:-------:|:--------:|----------|
| **Llama 4 Scout** | 17B / 109B | 16 | **10M** | Maior contexto do mundo |
| **Llama 4 Maverick** | 17B / 400B | 128 | 1M | Performance frontier |
| **Llama 3.3 70B** | 70B (dense) | - | 128K | Workhorse estavel |
| **Llama 3.1 405B** | 405B (dense) | - | 128K | Maior dense open |

### Muse Series (Proprietario → Open em breve)

| Modelo | Tipo | Contexto | Destaque |
|--------|------|:--------:|----------|
| **Muse Spark 1.2** | Proprietario | 1M | Reasoning, #1 Meta |
| **Muse Spark 1.1** | Proprietario | 1M | Reasoning |
| **Muse Spark** | Proprietario | 262K | Primeiro proprietario |
| **Muse Glimmer** | Open (Apache 2.0) | - | 30B, preview Qwen4 |

### Modelos Anteriores

| Modelo | Params | Contexto | Destaque |
|--------|:------:|:--------:|----------|
| Llama 3.2 90B | 90B | 128K | Multimodal |
| Llama 3.2 11B | 11B | 128K | Leve |
| Llama 3.1 8B | 8B | 128K | Basico |

## Llama 4 Maverick — Detalhes

| Caracteristica | Valor |
|----------------|-------|
| **Arquitetura** | MoE (Mixture of Experts) |
| **Params Ativos** | 17B por token |
| **Params Totais** | 400B |
| **Experts** | 128 |
| **Context Window** | 1M tokens |
| **Input** | Texto + Imagem |
| **Output** | Texto |
| **Idiomas** | 200+ (fine-tuning em 12) |
| **Knowledge Cutoff** | Agosto 2024 |

### Benchmarks

| Benchmark | Maverick | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:--------:|:-----------:|:-----------------:|
| Coding | Medio | **Alto** | **#1 SWE-Bench** |
| Reasoning | Medio | **Alto** | Alto |
| Multilingual | **Forte** | Forte | Forte |

## Llama 4 Scout — O de 10M

```
LAMBDA: 10M tokens de contexto

COMPARACAO:
- GPT-6 Astra: 1.05M
- Claude Fable: 200K
- Gemini 3.1 Pro: 2M
- Llama 4 Scout: 10M <-- GANHADOR

USE PARA:
- Documentos inteiros (livros,论文)
- Codebases completos
- Analise de video longo
```

## Muse Spark — Proprietario

```
MUSE SPARK 1.2 (Agosto 2026):

DIFERENCIAL:
- Primeiro modelo proprietario da Meta
- Reasoning (chain-of-thought)
- #1 no benchmark da Meta
- Peso ser open-sourced em breve

COMPARACAO COM GPT-6:
- GPT-6: Mais dados, mais treino
- Muse Spark: Razaoabel, mas menos dados publicos
```

## Quando Usar

### Use Llama quando

| Caso | Por que |
|------|---------|
| Self-hosting | Open-weights, gratuito |
| Budget apertado | Sem custo de API |
| Customizacao | Fine-tuning livre |
| Privacidade | Roda local |
| Long context (Scout) | 10M tokens |

### Evite quando

| Caso | Por que |
|------|---------|
| API managed | OpenAI/Anthropic sao mais faceis |
| Coding maximo | Claude lidera SWE-Bench |
| Computer use | GPT-6 Astra lidera |
| Production sem infra | Requer GPU proprio |

## Preco via Providers

| Provider | Maverick Input | Maverick Output |
|----------|:--------------:|:---------------:|
| AWS Bedrock | $0.24/MTok | $0.97/MTok |
| OpenRouter | Variavel | Variavel |
| Self-host | Gratuito | Gratuito |

## Conexoes

- [[llms]] — Categoria
- [[fine-tuning]] — Open-weights permite
- [[ollama]] — Self-hosting local
- [[inference-platforms]] — Onde rodar
- [[generative-ai]] — Aplicacoes
- [[deepseek]] — Competidor open-source
- [[qwen]] — Competidor open-source

---

**Status:** Documento explorado — Meta Llama completo com Muse
**Ultima atualizacao:** Setembro 2026
