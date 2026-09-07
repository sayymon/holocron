---
titulo: "Qwen — Open-Source Apache 2.0 (Alibaba)"
tags: [qwen, alibaba, open-source, apache, multilingual, moe, 3.5, 3.6, 3.7, 3.8]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: tools-providers
status: explored
wikilinks:
  - llms
  - fine-tuning
  - inference-platforms
  - generative-ai
  - multimodal
  - qwen-3.5
---

# Qwen — Open-Source Apache 2.0 (Alibaba)

> Qwen e a familia de modelos da Alibaba Cloud. Principal destaque: licenca Apache 2.0 (a mais permissiva entre frontiers open-source). Forte em multilingue e coding.

## Modelos Atomicos

| Modelo | Doc | Status |
|--------|-----|:------:|
| **Qwen 3.5 397B** | [[qwen-3.5]] | ✅ Explorado |

## Arquitetura Interna

```
┌─────────────────────────────────────────────────────┐
│                QWEN 3.5 397B                         │
│                                                      │
│  ARQUITETURA: MoE (Mixture of Experts)               │
│  PARAMS: 17B ativos / 397B total (512 experts)       │
│  CONTEXT WINDOW: 262K tokens (extensivel a 1M)       │
│                                                      │
│  ATENCAO: Hibrida                                    │
│    → 75% Gated DeltaNet (linear, rapido)             │
│    → 25% Full Attention (qualidade)                  │
│                                                      │
│  DIFERENCIAIS:                                       │
│    → Apache 2.0 (comercial livre)                    │
│    → 200+ idiomas                                    │
│    → Multimodal nativo                               │
│    → Melhor custo-beneficio                          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Modelos (Setembro 2026)

### Qwen 3.8 Series (Mais Recente)

| Modelo | Tipo | Params | Contexto | Destaque |
|--------|------|:------:|:--------:|----------|
| **Qwen 3.8 Flash Next** | MoE | - | 262K | Preview Qwen4 |
| **Qwen 3.8 Flash** | MoE | - | 1M | Ultra-barato |

### Qwen 3.7 Series

| Modelo | Tipo | Params | Contexto | Destaque |
|--------|------|:------:|:--------:|----------|
| **Qwen 3.7 Max** | MoE | - | 1M | Frontier |
| **Qwen 3.7 Plus** | MoE | - | 1M | Custo-beneficio |
| **Qwen 3.7 Flash** | MoE | - | 1M | Rapido |

### Qwen 3.6 Series

| Modelo | Tipo | Params | Contexto | Destaque |
|--------|------|:------:|:--------:|----------|
| **Qwen 3.6 Plus** | MoE | - | 1M | Custo-beneficio |
| **Qwen 3.6 Flash** | MoE | - | 1M | Rapido |
| **Qwen 3.6 Coder** | MoE | - | 1M | Coding |

### Qwen 3.5 Series (Open-Source)

| Modelo | Tipo | Ativos/Total | Contexto | Licenca |
|--------|------|:------------:|:--------:|---------|
| **Qwen 3.5 397B** | MoE | 17B / 397B | 262K | Apache 2.0 |
| **Qwen 3.5 122B** | MoE | 10B / 122B | 256K | Apache 2.0 |
| **Qwen 3.5 35B** | MoE | 3B / 35B | 256K | Apache 2.0 |
| **Qwen 3.5 27B** | Dense | 27B | 256K | Apache 2.0 |
| **Qwen 3.5 7B** | Dense | 7B | 256K | Apache 2.0 |

### Qwen 3.5 Omni (Multimodal)

| Modelo | Modalidade | Destaque |
|--------|------------|----------|
| **Qwen 3.5 Omni** | Texto + Imagem + Video + Audio | Multimodal completo |

## Qwen 3.5 397B — Detalhes

| Caracteristica | Valor |
|----------------|-------|
| **Arquitetura** | MoE Hibrida |
| **Params Ativos** | 17B por token |
| **Params Totais** | 397B |
| **Experts** | 512 (10 routed + 1 shared) |
| **Camadas** | 60 |
| **Context Window** | 262K (extensivel a 1M) |
| **Licenca** | Apache 2.0 |
| **Idiomas** | 200+ |

### Benchmarks

| Benchmark | Qwen 3.5 | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:--------:|:-----------:|:-----------------:|
| **SWE-Bench** | 76.4% | 78.2% | **78.5%** |
| **MMLU-Pro** | 87.8% | **89.1%** | 88.5% |
| **GPQA Diamond** | 88.4% | **96.0%** | 93.7% |
| **HumanEval** | 95.0% | **97.1%** | 95.2% |

## Preco via API

| Modelo | Input $/MTok | Output $/MTok | Contexto |
|--------|:------------:|:-------------:|:--------:|
| **Qwen 3.7 Flash** | $0.03 | $0.13 | 1M |
| **Qwen 3.5 Flash** | $0.10 | $0.40 | 1M |
| **Qwen 3.5 Plus** | $0.40 | $2.40 | 1M |
| **Qwen 3.5 397B** | $0.60 | $3.60 | 262K |

### Custo vs Concorrentes

| Modelo | Input+Output | Custo relativo |
|--------|:------------:|:--------------:|
| **Qwen 3.7 Flash** | $0.16 | **1x** |
| **Qwen 3.5 Flash** | $0.50 | 3x |
| Gemini 3.8 Flash | $0.50 | 3x |
| Claude Haiku 3.5 | $4.80 | 30x |
| GPT-6 Astra | $60.00 | 375x |

## Quando Usar

### Use Qwen quando

| Caso | Por que |
|------|---------|
| Apache 2.0 | Comercial livre |
| Multilingue | 200+ idiomas |
| Budget | Flash e ultrabarato |
| Self-hosting | Open-source |
| Coding | Coder series |
| Multimodal | Omni models |

### Evite quando

| Caso | Por que |
|------|---------|
| Coding maximo | Claude lidera |
| Contexto > 262K | Gemini tem 1M+ |
| Enterprise managed | OpenAI mais maduro |
| EU compliance | Mistral e europeu |

## Conexoes

- [[llms]] — Categoria
- [[fine-tuning]] — Apache 2.0 permite
- [[inference-platforms]] — Onde rodar
- [[generative-ai]] — Aplicacoes
- [[multimodal]] — Omni models
- [[deepseek]] — Competidor
- [[meta-llama]] — Competidor

---

**Status:** Documento explorado — Qwen completo com 3.5-3.8
**Ultima atualizacao:** Setembro 2026
