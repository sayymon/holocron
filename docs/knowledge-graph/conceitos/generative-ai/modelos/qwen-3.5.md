---
titulo: "Qwen 3.5 — Apache 2.0 Frontier"
tags: [qwen, alibaba, apache, open-source, moe, multilingual, 3.5]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 0
area: generative-ai
status: explored
wikilinks:
  - qwen
  - llms
  - geracao-texto
  - multimodal
  - benchmarks-generative-ai
  - fine-tuning
---

# Qwen 3.5 — Apache 2.0 Frontier

> Qwen 3.5 e o modelo open-source da Alibaba com licenca Apache 2.0 (a mais permissiva), 397B params MoE, e suporte a 200+ idiomas.

## O Que e

```
┌─────────────────────────────────────────────────────┐
│                QWEN 3.5 397B                         │
│                                                      │
│  EMPRESA: Alibaba Cloud                              │
│  LANCAMENTO: Fevereiro 2026                          │
│  ARQUITETURA: MoE Hibrida                            │
│  LICENCA: Apache 2.0                                 │
│                                                      │
│  CAPACIDADES:                                         │
│    → Texto (geracao, analise)                         │
│    → Imagem (input - multimodal)                      │
│    → Video (input)                                    │
│    → Audio (input/output via Omni)                    │
│    → 200+ idiomas                                     │
│    → 262K contexto (extensivel a 1M)                  │
│                                                      │
│  DIFERENCIAIS:                                        │
│    → Apache 2.0 (comercial livre)                     │
│    → 200+ idiomas (melhor multilingue)                │
│    → MoE hibrida (eficiente)                          │
│    → Custo ultra-baixo                                │
│                                                      │
│  STATUS: #1 APACHE 2.0 (Set 2026)                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Especificacoes Tecnicas

| Caracteristica | Valor |
|----------------|-------|
| **Params Ativos** | 17B por token |
| **Params Totais** | 397B |
| **Experts** | 512 (10 routed + 1 shared) |
| **Camadas** | 60 |
| **Context Window** | 262K (extensivel a 1M) |
| **Input** | Texto, Imagem, Video, Audio |
| **Output** | Texto |
| **Licenca** | Apache 2.0 |
| **Idiomas** | 200+ |

## Preco

| Tipo | Preco |
|------|:-----:|
| **Input** | $0.60/MTok |
| **Output** | $3.60/MTok |
| **Self-hosting** | Gratuito |

### Comparativo de Custo

| Modelo | Input | Output | Custo relativo |
|--------|:-----:|:------:|:--------------:|
| **Qwen 3.5 397B** | $0.60 | $3.60 | **1x** |
| Qwen 3.7 Flash | $0.03 | $0.13 | 0.05x |
| DeepSeek V4 Pro | $0.27 | $1.10 | 0.35x |
| Claude Fable 5.1 | $3.00 | $15.00 | 4.7x |
| GPT-6 Astra | $10.00 | $50.00 | 15.6x |

## Benchmarks (Setembro 2026)

### Geral

| Benchmark | Qwen 3.5 | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:--------:|:-----------:|:----------------:|
| **MMLU-Pro** | 87.8% | **89.1%** | 88.5% |
| **GPQA Diamond** | 88.4% | **96.0%** | 93.7% |
| **HumanEval** | 95.0% | **97.1%** | 95.2% |
| **SWE-Bench** | 76.4% | 78.2% | **78.5%** |

### Multilingue

| Benchmark | Qwen 3.5 | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:--------:|:-----------:|:----------------:|
| **C-Eval** | **93.0%** | 90.5% | 88.0% |
| **CMMLU** | **95.0%** | 92.0% | 89.0% |

### Coding

| Benchmark | Qwen 3.5 | DeepSeek V4 | Claude Fable 5.1 |
|-----------|:--------:|:-----------:|:----------------:|
| **SWE-Bench** | 76.4% | 76.2% | **78.5%** |
| **LiveCodeBench** | 82.0% | **88.0%** | 82.0% |

## Capacidades Principais

### 1. Apache 2.0

```
APACHE 2.0:
  → Comercial livre
  → Modificacao livre
  → Distribuicao livre
  → Sem restricoes

COMPARACAO:
  → Qwen: Apache 2.0 (mais permissiva)
  → DeepSeek: MIT (permissiva)
  → Llama: Llama License (restricoes)
```

### 2. Multilingue #1

```
QWEN SUPORTA 200+ IDIOMAS:
  → Portugues, Ingles, Espanhol
  → Chines, Japones, Coreano
  → Arabe, Hindi, Alemao
  → E muitos mais

MELHOR PARA:
  → Empresas globais
  → Conteudo multilingue
  → Traducao
  → Localizacao
```

### 3. MoE Hibrida

```
ARQUITETURA HIBRIDA:
  → 75% Gated DeltaNet (linear, rapido)
  → 25% Full Attention (qualidade)

VANTAGEM:
  → 262K contexto barato de servir
  → Qualidade mantida
  → Eficiencia computacional
```

### 4. Omni (Multimodal)

```
QWEN 3.5 OMNI:
  → Texto (input/output)
  → Imagem (input/output)
  → Video (input)
  → Audio (input/output)

EXEMPLO:
  "O que tem nesta foto?"
  → Qwen descreve

  "Resuma este video"
  → Qwen resume
```

## Familia Qwen 3.5

| Modelo | Params | Contexto | Licenca | Uso |
|--------|:------:|:--------:|---------|-----|
| **Qwen 3.5 397B** | 17B/397B | 262K | Apache 2.0 | **Frontier** |
| **Qwen 3.5 122B** | 10B/122B | 256K | Apache 2.0 | Medio |
| **Qwen 3.5 35B** | 3B/35B | 256K | Apache 2.0 | Leve |
| **Qwen 3.5 27B** | 27B | 256K | Apache 2.0 | Dense |
| **Qwen 3.5 7B** | 7B | 256K | Apache 2.0 | Edge |

### Series Mais Recentes

| Serie | Destaque |
|-------|----------|
| **Qwen 3.8** | Preview Qwen4, hibrido |
| **Qwen 3.7** | Max, Plus, Flash |
| **Qwen 3.6** | Plus, Flash, Coder |

## Quando Usar

### Use Qwen quando

| Caso | Por que |
|------|---------|
| **Apache 2.0** | Comercial livre |
| **Multilingue** | 200+ idiomas |
| **Budget** | Custo baixo |
| **Self-hosting** | Open-source |
| **Multimodal** | Omni models |
| **China/Asia** | Melhor para CJK |

### Evite quando

| Caso | Por que |
|------|---------|
| **Coding maximo** | Claude lidera |
| **Contexto > 262K** | Gemini tem 1M+ |
| **Enterprise managed** | OpenAI mais maduro |
| **EU compliance** | Mistral e europeu |
| **USA** | Latencia menor com providers locais |

## Conexoes

- [[qwen]] — Provider e ecossistema
- [[llms]] — Categoria
- [[geracao-texto]] — Aplicacao principal
- [[multimodal]] — Capacidade principal
- [[benchmarks-generative-ai]] — Metricas
- [[fine-tuning]] — Apache 2.0 permite
- [[gpt-6-astra]] — Concorrente proprietario
- [[claude-fable-5]] — Concorrente coding
- [[deepseek-v4]] — Concorrente open-source
- [[llama-4]] — Concorrente open-weights

---

**Status:** Documento explorado — Qwen 3.5 completo
**Ultima atualizacao:** Setembro 2026
