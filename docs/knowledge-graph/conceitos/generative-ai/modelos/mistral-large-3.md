---
titulo: "Mistral Large 3 — Frontier Europeu"
tags: [mistral, large-3, europeu, gdpr, apache, moe, coding]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 0
area: generative-ai
status: explored
wikilinks:
  - mistral
  - llms
  - geracao-texto
  - geracao-codigo
  - benchmarks-generative-ai
  - fine-tuning
---

# Mistral Large 3 — Frontier Europeu

> Mistral Large 3 e o modelo frontier da Mistral AI, empresa francesa com compliance GDPR nativo. 675B params MoE, Apache 2.0, e o melhor para empresas europeias.

## O Que e

```
┌─────────────────────────────────────────────────────┐
│                MISTRAL LARGE 3                       │
│                                                      │
│  EMPRESA: Mistral AI (Franca)                        │
│  LANCAMENTO: Dezembro 2025                           │
│  ARQUITETURA: MoE (Mixture of Experts)               │
│  LICENCA: Apache 2.0                                 │
│                                                      │
│  CAPACIDADES:                                         │
│    → Texto (geracao, analise)                         │
│    → Imagem (input - multimodal)                      │
│    → Coding                                           │
│    → Reasoning                                        │
│    → Tool calling                                     │
│    → 262K contexto                                    │
│                                                      │
│  DIFERENCIAIS:                                        │
│    → Empresa europeia (GDPR nativo)                   │
│    → Apache 2.0 (comercial livre)                     │
│    → Infraestrutura EU                                │
│    → Compliance regulatório                           │
│                                                      │
│  STATUS: #1 EUROPEU (Set 2026)                       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Especificacoes Tecnicas

| Caracteristica | Valor |
|----------------|-------|
| **Params Ativos** | 41B por token |
| **Params Totais** | 675B |
| **Context Window** | 262K tokens |
| **Input** | Texto, Imagem |
| **Output** | Texto |
| **Licenca** | Apache 2.0 |
| **Treinado em** | NVIDIA H200 GPUs |

## Preco

| Tipo | Preco |
|------|:-----:|
| **Input** | $0.50/MTok |
| **Output** | $1.50/MTok |
| **Self-hosting** | Gratuito |

### Comparativo de Custo

| Modelo | Input | Output | Custo relativo |
|--------|:-----:|:------:|:--------------:|
| **Mistral Large 3** | $0.50 | $1.50 | **1x** |
| Qwen 3.5 397B | $0.60 | $3.60 | 1.9x |
| DeepSeek V4 Pro | $0.27 | $1.10 | 0.7x |
| Claude Fable 5.1 | $3.00 | $15.00 | 7.5x |
| GPT-6 Astra | $10.00 | $50.00 | 25x |

## Benchmarks (Setembro 2026)

### Geral

| Benchmark | Mistral Large 3 | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:---------------:|:-----------:|:----------------:|
| **AA Intelligence Index** | 67 | **60.7** | 56.8 |
| **GPQA Diamond** | ~85% | **96.0%** | 93.7% |
| **MMLU-Pro** | ~82% | **89.1%** | 88.5% |

### Coding

| Benchmark | Mistral Large 3 | DeepSeek V4 | Claude Fable 5.1 |
|-----------|:---------------:|:-----------:|:----------------:|
| **Coding Score** | 67 | ~75 | **78.5%** |

### Multilingue

| Benchmark | Mistral Large 3 | Qwen 3.5 | GPT-6 Astra |
|-----------|:---------------:|:--------:|:-----------:|
| **European Languages** | **Forte** | Forte | Forte |

## Capacidades Principais

### 1. GDPR Compliance

```
GDPR NATIVO:
  → Empresa europeia (Franca)
  → Infraestrutura EU
  → Dados na Europa
  → Regulacao europeia

PARA QUE ISSO IMPORTA:
  → Empresas europeias
  → Dados sensiveis
  → Contratos governamentais
  → LGPD (Brasil) tambem se beneficia
```

### 2. Apache 2.0

```
APACHE 2.0:
  → Comercial livre
  → Modificacao livre
  → Distribuicao livre
  → Sem restricoes

COMPARACAO:
  → Mistral: Apache 2.0
  → Qwen: Apache 2.0
  → DeepSeek: MIT
  → Llama: Llama License (restricoes)
```

### 3. MoE 675B

```
ARQUITETURA:
  → 41B ativos por token
  → 675B totais
  → Eficiente em inferencia

COMPARACAO:
  → Mistral: 41B ativos / 675B total
  → Qwen 3.5: 17B ativos / 397B total
  → Llama 4: 17B ativos / 400B total
```

### 4. Coding com Codestral

```
CODESTRAL:
  → Modelo especializado em coding
  → 80+ linguagens
  → Completion rapido
  → Integracao com IDEs

USE PARA:
  → Desenvolvimento de software
  → Code review
  → Debugging
```

## Familia Mistral

| Modelo | Params | Contexto | Licenca | Uso |
|--------|:------:|:--------:|---------|-----|
| **Mistral Large 3** | 41B/675B | 262K | Apache 2.0 | **Frontier** |
| **Mistral Medium 3.5** | - | 262K | Proprietario | Coding |
| **Mistral Small 4** | - | 262K | Proprietario | Custo-beneficio |
| **Ministral 3 14B** | 14B | 262K | Apache 2.0 | Edge |
| **Ministral 3 8B** | 8B | 262K | Apache 2.0 | Edge |
| **Ministral 3 3B** | 3B | 262K | Apache 2.0 | Ultra-leve |

### Coding Especializado

| Modelo | Contexto | Licenca | Uso |
|--------|:--------:|---------|-----|
| **Devstral 2** | 262K | Apache 2.0 | Coding agent |
| **Codestral** | 32K | Specific | Completion |

## Quando Usar

### Use Mistral quando

| Caso | Por que |
|------|---------|
| **GDPR/EU compliance** | Empresa europeia |
| **Apache 2.0** | Comercial livre |
| **Coding** | Codestral/Medium |
| **Budget** | Small/Ministral baratos |
| **Edge** | Ministral 3B |

### Evite quando

| Caso | Por que |
|------|---------|
| **Coding maximo** | Claude lidera |
| **Contexto > 262K** | Gemini tem 1M+ |
| **Reasoning forte** | GPT-6/Claude sao melhores |
| **USA/China** | Latencia menor com providers locais |
| **Budget minimo** | Qwen/DeepSeek sao mais baratos |

## Conexoes

- [[mistral]] — Provider e ecossistema
- [[llms]] — Categoria
- [[geracao-texto]] — Aplicacao principal
- [[geracao-codigo]] — Codestral
- [[benchmarks-generative-ai]] — Metricas
- [[fine-tuning]] — Apache 2.0 permite
- [[gpt-6-astra]] — Concorrente proprietario
- [[claude-fable-5]] — Concorrente coding
- [[deepseek-v4]] — Concorrente open-source
- [[qwen-3.5]] — Concorrente open-source
- [[llama-4]] — Concorrente open-weights

---

**Status:** Documento explorado — Mistral Large 3 completo
**Ultima atualizacao:** Setembro 2026
