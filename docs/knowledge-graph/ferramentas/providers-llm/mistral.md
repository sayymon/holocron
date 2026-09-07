---
titulo: "Mistral — Open-Source Europeu"
tags: [mistral, europa, open-source, gdpr, france, mixtral, mistral-3]
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
  - mistral-large-3
---

# Mistral — Open-Source Europeu

> Mistral AI e uma startup francesa (ex-Meta, ex-DeepMind) que produz modelos open-source de alta qualidade. Principal vantagem: empresa europeia com compliance GDPR nativo.

## Modelos Atomicos

| Modelo | Doc | Status |
|--------|-----|:------:|
| **Mistral Large 3** | [[mistral-large-3]] | ✅ Explorado |

## Arquitetura Interna

```
┌─────────────────────────────────────────────────────┐
│                MISTRAL LARGE 3                       │
│                                                      │
│  ARQUITETURA: MoE (Mixture of Experts)               │
│  PARAMS: 41B ativos / 675B total                     │
│  CONTEXT WINDOW: 262K tokens                         │
│  LICENCA: Apache 2.0                                 │
│                                                      │
│  DIFERENCIAIS:                                       │
│    → Empresa europeia (GDPR nativo)                  │
│    → Apache 2.0 (comercial livre)                    │
│    → Multimodal (texto + imagem)                     │
│    → Coding forte (Codestral)                        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Modelos (Setembro 2026)

### Tier Frontier

| Modelo | Tipo | Params | Contexto | Licenca | Destaque |
|--------|------|:------:|:--------:|---------|----------|
| **Mistral Large 3** | MoE | 41B/675B | 262K | Apache 2.0 | **Frontier open** |
| **Mistral Medium 3.5** | MoE | - | 262K | Proprietario | Coding |

### Tier Mid

| Modelo | Tipo | Contexto | Licenca | Destaque |
|--------|------|:--------:|---------|----------|
| **Mistral Small 4** | Dense | 262K | Proprietario | Custo-beneficio |
| **Mixtral 8x22B** | MoE | 64K | Apache 2.0 | Eficiente |
| **Mixtral 8x7B** | MoE | 32K | Apache 2.0 | Basico |

### Tier Budget / On-Device

| Modelo | Params | Contexto | Licenca | Destaque |
|--------|:------:|:--------:|---------|----------|
| **Ministral 3 14B** | 14B | 262K | Apache 2.0 | Edge |
| **Ministral 3 8B** | 8B | 262K | Apache 2.0 | Edge |
| **Ministral 3 3B** | 3B | 262K | Apache 2.0 | Ultra-leve |

### Coding Especializado

| Modelo | Contexto | Licenca | Destaque |
|--------|:--------:|---------|----------|
| **Devstral 2** | 262K | Apache 2.0 | Coding agent |
| **Codestral** | 32K | Specific | Coding completion |

## Mistral Large 3 — Detalhes

| Caracteristica | Valor |
|----------------|-------|
| **Arquitetura** | MoE |
| **Params Ativos** | 41B por token |
| **Params Totais** | 675B |
| **Context Window** | 262K tokens |
| **Input** | Texto + Imagem |
| **Licenca** | Apache 2.0 |
| **Treinado em** | NVIDIA H200 GPUs |

### Benchmarks

| Benchmark | Large 3 | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:-------:|:-----------:|:-----------------:|
| Coding | 67 | **Alto** | **#1** |
| Reasoning | Medio | **Alto** | Alto |
| Multilingual | **Forte** | Forte | Forte |

## Mistral Medium 3.5 — Coding

```
MISTRAL MEDIUM 3.5 (Abril 2026):

FOCO: Coding profissional

BENCHMARKS:
- Coding: 72/100 (score)
- Rank: #1 entre Mistral

USE PARA:
- Desenvolvimento de software
- Code review
- Debugging
```

## Preco via API

| Modelo | Input $/MTok | Output $/MTok | Contexto |
|--------|:------------:|:-------------:|:--------:|
| **Mistral Large 3** | $0.50 | $1.50 | 262K |
| **Mistral Medium 3.5** | $1.50 | $7.50 | 262K |
| **Mistral Small 4** | $0.15 | $0.60 | 262K |
| **Ministral 3 8B** | $0.15 | $0.15 | 262K |

### Custo vs Concorrentes

| Modelo | Input+Output | Contexto |
|--------|:------------:|:--------:|
| **Mistral Large 3** | $2.00 | 262K |
| **Qwen 3.5 Flash** | $0.50 | 1M |
| **Claude Haiku 3.5** | $4.80 | 200K |
| **GPT-6 Astra** | $60.00 | 1.05M |

## Diferencial: Europeu

```
COMPLIANCE:
- GDPR nativo (dados na Europa)
- Infraestrutura EU
- Empresa regulada na Franca

PARA QUE ISSO IMPORTA:
- Empresas europeias
- Dados sensiveis
- Contratos governamentais
- LGPD (Brasil) tambem se beneficia
```

## Quando Usar

### Use Mistral quando

| Caso | Por que |
|------|---------|
| GDPR/EU compliance | Empresa europeia |
| Apache 2.0 | Comercial livre |
| Coding | Codestral/Medium |
| Budget | Small/Ministral baratos |
| Edge | Ministral 3B |

### Evite quando

| Caso | Por que |
|------|---------|
| Coding maximo | Claude lidera |
| Contexto > 262K | Gemini tem 1M+ |
| Reasoning forte | GPT-6/Claude sao melhores |
| USA/China | Latencia menor com providers locais |

## Conexoes

- [[llms]] — Categoria
- [[fine-tuning]] — Apache 2.0 permite
- [[inference-platforms]] — Onde rodar
- [[generative-ai]] — Aplicacoes
- [[meta-llama]] — Competidor
- [[qwen]] — Competidor
- [[deepseek]] — Competidor

---

**Status:** Documento explorado — Mistral completo com 3.x
**Ultima atualizacao:** Setembro 2026
