---
titulo: "Reasoning Models — Modelos de Raciocinio"
tags: [reasoning-models, chain-of-thought, o1, o3, deepseek-r1, raciocinio]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: llms
status: explored
wikilinks:
  - llms
  - deepseek
  - openai-gpt
  - anthropic-claude
  - geracao-texto
  - prompt-engineering
---

# Reasoning Models

> Reasoning models sao LLMs projetados para "pensar antes de responder", usando chain-of-thought interno para resolver problemas complexos de logica, matematica e codigo.

## O Problema que Resolve

```
LLM TRADICIONAL:
Pergunta -> Resposta imediata

PROBLEMA: 
- Erros em problemas complexos
- Pula etapas de raciocinio
- Nao verifica trabalho

REASONING MODEL:
Pergunta -> "Deixe-me pensar..." -> Raciocinio passo a passo -> Resposta
```

## Como Funcionam

### Chain-of-Thought (CoT) Interno

```
LLM TRADICIONAL:
Input: "Quanto e 23 x 47?"
Output: "1081" (pode estar errado)

REASONING MODEL:
Input: "Quanto e 23 x 47?"
Pensamento: "Vou calcular passo a passo:
  23 x 47 = 23 x (40 + 7)
  23 x 40 = 920
  23 x 7 = 161
  920 + 161 = 1081"
Output: "1081" (com raciocinio visivel)
```

### Processo Interno

```
1. RECEBE pergunta complexa
2. DECOMPON em subproblemas
3. RESOLVE cada subproblema
4. VERIFICA cada passo
5. COMBINA resultados
6. GERA resposta final
```

## Modelos de Raciocinio (2026)

### OpenAI

| Modelo | Lançamento | Context | Capacidade |
|--------|:----------:|:-------:|------------|
| **o1** | Set 2024 | 200K | Raciocinio geral |
| **o3** | Abr 2025 | 200K | Raciocinio avancado |
| **o3-pro** | Jul 2025 | 200K | Premium, mais lento |
| **o4-mini** | Jul 2025 | 200K | Rapido e barato |
| **GPT-6 Astra** | Set 2026 | 128K | Unificado (tem tudo) |

### Anthropic

| Modelo | Capacidade | Uso |
|--------|------------|-----|
| **Claude Fable 5.1** | Extended Thinking | Raciocinio profundo |
| **Claude Opus 5** | Raciocinio forte | Premium |

### DeepSeek

| Modelo | Open Source | Capacidade |
|--------|:----------:|------------|
| **DeepSeek-R1** | Sim | Raciocinio + Codigo |
| **DeepSeek-R1-0528** | Sim | Atualizado |
| **DeepSeek-V4** | Sim | Com reasoning |

### Google

| Modelo | Capacidade |
|--------|------------|
| **Gemini 3.8 Flash** | Thinking mode |
| **Gemini 3.x Pro** | Reasoning forte |

### Outros

| Modelo | Empresa | Destaque |
|--------|---------|----------|
| **Qwen3.7 Max** | Alibaba | Reasoning |
| **GLM-5.3** | Zhipu AI | Raciocinio |
| **Muse Spark 1.3** | Meta | Reasoning |

## Extended Thinking

```
PROCESSO:
1. Model recebe pergunta
2. Ativa "thinking" (tokens invisiveis)
3. Gera raciocinio interno (ate 32K tokens)
4. Gera resposta final

EXEMPLO (Claude Fable 5.1):
User: "Resolva: se x^2 + 5x + 6 = 0, x = ?"

Thinking: "Vou usar Bhaskara...
  a=1, b=5, c=6
  delta = 25 - 24 = 1
  x = (-5 +/- 1) / 2
  x1 = -2, x2 = -3"

Response: "x = -2 ou x = -3"
```

## Benchmark de Raciocinio

### Problemas Classicos

| Benchmark | Tipo | SOTA |
|-----------|------|:----:|
| **AIME 2026** | Olimpiada Matematica | o3-pro |
| **FrontierMath Tier 4** | Matematica extrema | o3-pro |
| **ARC-AGI-3** | Raciocinio abstrato | o3 |
| **GPQA Diamond** | Posh-graduacao | GPT-6 Astra |

### Comparativo

| Modelo | AIME | GPQA | Custo |
|--------|:----:|:----:|:-----:|
| o3 | 96.7% | 92.0% | Alto |
| o3-pro | 99.9% | 96.0% | Muito alto |
| o4-mini | 92.0% | 85.0% | Baixo |
| Claude Fable 5.1 | 88.0% | 90.0% | Alto |
| DeepSeek-R1 | 85.0% | 78.0% | Gratis (open) |

## Quando Usar Reasoning Models

### Use Quando

| Caso | Por que |
|------|---------|
| Matematica complexa | Precisa de passos |
| Programacao (bugs dificeis) | Raciocinio logico |
| Ciencia de dados | Analise complexa |
| Problemas logicos | Decomposicao |
| Multi-hop reasoning | Conectar informacoes |

### Nao Use Quando

| Caso | Por que |
|------|---------|
| Pergunta simples | Mais lento e caro |
| Chat casual | Nao precisa raciocinar |
| Classificacao simples | Tradicional resolve |
| Custo e prioridade | Reasoning e 10x mais caro |

## Custo vs Beneficio

```
PRECO POR TOKEN (OpenAI o-series):
- Input: $15/MTok (10x mais que GPT-4o)
- Output: $60/MTok (10x mais que GPT-4o)
- Thinking tokens: Cobrados

EXEMPLO:
- Pergunta simples: 100 tokens -> $0.0015
- Problema complexo: 10K tokens thinking + 1K output -> $0.21

QUANDO VALE:
- Problema vale > $0.21 de resolver
- Precisa de alta precisao
- Erro custa caro
```

## Chain-of-Thought (Prompting)

### Zero-Shot CoT

```
PROMPT: "Vamos pensar passo a passo."

EXEMPLO:
P: "Se eu tenho 3 camisas e 4 calcas, quantos looks posso montar?"
CoT: "Vou combinar cada camisa com cada calca:
  Camisa 1 + 4 calcas = 4 looks
  Camisa 2 + 4 calcas = 4 looks
  Camisa 3 + 4 calcas = 4 looks
  Total = 12 looks"
```

### Few-Shot CoT

```
PROMPT COM EXEMPLOS:
"P: 2 + 3 = ? R: 5 (somar direto)
 P: 12 x 15 = ? R: 180 (12x15 = 12x10 + 12x5 = 120 + 60 = 180)
 P: 23 x 47 = ? R: "
```

## Arquiteturas de Raciocinio

### 1. Model Interno (o-series)

```
Vantagem: Raciocinio oculto (usuario nao ve)
Desvantagem: Caro, lento
```

### 2. Model + Thinking Mode (Claude)

```
Vantagem: Thinking visivel (opcional)
Desvantagem: thinking tokens cobrados
```

### 3. Prompting (Qualquer LLM)

```
Vantagem: Gratis, funciona em qualquer modelo
Desvantagem: Menos eficiente que model nativo
```

## Evolucao

```
2023: Chain-of-Thought (prompting)
  |
2024: o1 (primeiro reasoning model)
  |
2025: o3, o4-mini, DeepSeek-R1
  |
2026: Unificado (GPT-6 Astra tem tudo)
```

## Conexoes

- [[llms]] — Modelos de linguagem
- [[deepseek]] — DeepSeek-R1 e V4
- [[openai-gpt]] — o3, o4-mini, GPT-6 Astra
- [[anthropic-claude]] — Extended Thinking
- [[geracao-texto]] — Geracao de texto
- [[prompt-engineering]] — CoT prompting

---

**Status:** Documento explorado — reasoning models completo
**Ultima atualizacao:** Setembro 2026
