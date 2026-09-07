---
titulo: "DeepSeek — O Coding Champion Open-Source"
tags: [deepseek, open-source, moe, coding, reasoning, china, v4, r1]
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
  - geracao-codigo
  - reasoning-models
  - generative-ai
  - deepseek-v4
---

# DeepSeek — O Coding Champion Open-Source

> DeepSeek e um lab chines que surpreendeu o mercado com modelos MoE de altissima qualidade a custo muito baixo. DeepSeek V4 lidera SWE-Bench entre open-source.

## Modelos Atomicos

| Modelo | Doc | Status |
|--------|-----|:------:|
| **DeepSeek V4 Pro** | [[deepseek-v4]] | ✅ Explorado |> DeepSeek e um lab chinês que surpreendeu o mercado com modelos MoE de altissima qualidade a custo muito baixo. DeepSeek V4 lidera SWE-Bench entre open-source.

## Arquitetura Interna

```
┌─────────────────────────────────────────────────────┐
│                DEEPSEEK V4 PRO                       │
│                                                      │
│  ARQUITETURA: MoE (Mixture of Experts)               │
│  PARAMS: 37B ativos / 671B total                     │
│  CONTEXT WINDOW: 128K tokens                         │
│                                                      │
│  DIFERENCIAIS:                                       │
│    → Coding #1 open-source (SWE-Bench)               │
│    → Reasoning com thinking tokens                   │
│    → Custo muito baixo                               │
│    → MIT License (mais permissiva)                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Modelos (Setembro 2026)

### Tier Frontier

| Modelo | Params (Ativos/Total) | Contexto | Destaque |
|--------|:---------------------:|:--------:|----------|
| **DeepSeek V4 Pro** | 37B / 671B (MoE) | 128K | **#1 Open Coding** |
| **DeepSeek R1** | 37B / 671B (MoE) | 128K | Reasoning (thinking) |
| **DeepSeek V3** | 37B / 671B (MoE) | 128K | Workhorse |

### Tier Especializado

| Modelo | Contexto | Destaque |
|--------|:--------:|----------|
| **DeepSeek Coder V2** | 128K | Coding otimizado |
| **DeepSeek V4 Flash** | 128K | Ultrabarato |

## DeepSeek V4 Pro — Detalhes

| Caracteristica | Valor |
|----------------|-------|
| **Arquitetura** | MoE |
| **Params Ativos** | 37B por token |
| **Params Totais** | 671B |
| **Context Window** | 128K tokens |
| **Licenca** | MIT (comercial livre) |
| **Treino** | Multi-stage, RLHF |

### Benchmarks

| Benchmark | V4 Pro | GPT-6 Astra | Claude Fable 5.1 |
|-----------|:------:|:-----------:|:-----------------:|
| **SWE-Bench Verified** | 76.2% | 78.2% | **78.5%** |
| **HumanEval** | 95.8% | **97.1%** | 95.2% |
| **GPQA Diamond** | 82.4% | **96.0%** | 93.7% |
| **MMLU-Pro** | 84.2% | **89.1%** | 88.5% |

## DeepSeek R1 — Reasoning

```
DEEPSEEK R1: Modelo de raciocinio

COMO FUNCIONA:
1. Recebe pergunta complexa
2. Ativa "thinking tokens" (ocultos)
3. Resolve passo a passo
4. Gera resposta final

EXEMPLO:
P: "Quanto e 23 x 47?"
Thinking: "Vou calcular... 23x40=920, 23x7=161, 920+161=1081"
Response: "1081"
```

## Preco via API

| Modelo | Input $/MTok | Output $/MTok | Contexto |
|--------|:------------:|:-------------:|:--------:|
| **DeepSeek V4 Pro** | $0.27 | $1.10 | 128K |
| **DeepSeek R1** | $0.55 | $2.19 | 128K |
| **DeepSeek V3** | $0.14 | $0.28 | 128K |
| **DeepSeek V4 Flash** | $0.07 | $0.28 | 128K |

### Custo vs Concorrentes

| Modelo | Input+Output | SWE-Bench | Custo/Ponto |
|--------|:------------:|:---------:|:-----------:|
| **DeepSeek V4 Pro** | $1.37 | 76.2% | $0.018 |
| GPT-6 Astra | $60.00 | 78.2% | $0.767 |
| Claude Fable 5.1 | $18.00 | 78.5% | $0.229 |

**DeepSeek e 42x mais barato que GPT-6 por ponto de coding!**

## Quando Usar

### Use DeepSeek quando

| Caso | Por que |
|------|---------|
| Coding open-source | #1 SWE-Bench open |
| Budget apertado | Custo muito baixo |
| Reasoning | R1resolve problemas complexos |
| Self-hosting | MIT license |
| China/Asia | Latencia menor |

### Evite quando

| Caso | Por que |
|------|---------|
| Coding maximo | Claude Fable 5.1 lidera |
| Contexto > 128K | Gemini/Llama tem mais |
| Seguranca critica | Anthropic tem Constitutional AI |
| Enterprise managed | OpenAI/Anthropic mais maduros |

## Conexoes

- [[llms]] — Categoria
- [[fine-tuning]] — MIT license permite
- [[geracao-codigo]] — Codigo #1 open
- [[reasoning-models]] — R1 e reasoning
- [[inference-platforms]] — Onde rodar
- [[generative-ai]] — Aplicacoes
- [[meta-llama]] — Competidor
- [[qwen]] — Competidor

---

**Status:** Documento explorado — DeepSeek completo
**Ultima atualizacao:** Setembro 2026
