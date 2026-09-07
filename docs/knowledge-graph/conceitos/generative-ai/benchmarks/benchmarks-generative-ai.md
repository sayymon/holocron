---
titulo: "Benchmarks de Generative AI"
tags: [benchmarks, mmlu, humaneval, swe-bench, gpqa, arc-agi, evaluations]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: generative-ai
status: explored
wikilinks:
  - generative-ai
  - llms
  - geracao-texto
  - geracao-codigo
  - openai-gpt
  - anthropic-claude
  - google-gemini
---

# Benchmarks de Generative AI

> Benchmarks são métricas padronizadas para avaliar capacidades de modelos de IA. Cada benchmark testa uma dimensão diferente: conhecimento, código, raciocínio, matemática, agentes.

## Por que Benchmarks Importam

```
MODELO DIZ: "Sou o melhor"

PERGUNTA: "Melhor em quê?"

BENCHMARKS RESPONDEM:
  → Coding: SWE-Bench, HumanEval, Terminal-Bench
  → Conhecimento: MMLU, GPQA Diamond
  → Raciocínio: ARC-AGI, FrontierMath
  → Agentes: Agents' Last Exam, OSWorld
  → Segurança: ExploitBench, alignment benchmarks
```

## Principais Benchmarks (2026)

### Coding

| Benchmark | O que testa | SOTA 2026 |
|-----------|-------------|:---------:|
| **SWE-Bench Verified** | Resolver bugs reais em repositórios | GPT-6 Astra (78.2%) |
| **Terminal-Bench 4.0** | Tarefas complexas no terminal | GPT-6 Astra (57.9%) |
| **HumanEval** | Completar funções Python | GPT-5.3 Codex (96.8%) |
| **DeepSWE v1.1** | Software engineering profundo | GPT-6 Astra (74.1%) |
| **FrontierCode 1.1** | Coding avançado | GPT-6 Astra (64.5%) |

### Conhecimento

| Benchmark | O que testa | SOTA 2026 |
|-----------|-------------|:---------:|
| **MMLU** | 57 disciplinas acadêmicas | ~93% (saturado) |
| **MMLU-Pro** | MMLU mais difícil (10 opções) | Qwen3.7 Max (89.6%) |
| **GPQA Diamond** | Pós-graduação em biologia, química, física | GPT-6 Astra (96.0%) |

### Raciocínio

| Benchmark | O que testa | SOTA 2026 |
|-----------|-------------|:---------:|
| **ARC-AGI-3** | Raciocínio abstrato (AGI) | GPT-6 Astra (99.9%) |
| **ARC-AGI-2** | Raciocínio abstrato (versão anterior) | GPT-6 Astra (95.0%) |
| **FrontierMath Tier 4** | Matemática extrema | GPT-6 Astra (97.6%) |
| **AIME 2026** | Olimpíada de matemática | Modelos frontier >80% |

### Agentes

| Benchmark | O que testa | SOTA 2026 |
|-----------|-------------|:---------:|
| **Agents' Last Exam** | Tarefas profissionais complexas | GPT-6 Astra (59.3%) |
| **OSWorld 2.0** | Operar computador | GPT-6 Astra (72.6%) |
| **BrowseComp** | Navegação web | GPT-6 Astra (91.5%) |

### Segurança

| Benchmark | O que testa | SOTA 2026 |
|-----------|-------------|:---------:|
| **ExploitBench** | Encontrar e explorar vulnerabilidades | GPT-6 Astra (100%) |
| **SRE-Bench** | Reverse engineering de binários | GPT-6 Astra (88.0%) |
| **Humanity's Last Exam** | Conhecimento humano total | Claude Fable 5.1 (65.0%) |

## Leaderboard Geral (Setembro 2026)

### Top 10 por Índice Geral

| Rank | Modelo | Empresa | Índice |
|:----:|--------|---------|:------:|
| 1 | **GPT-6 Astra** | OpenAI | **60.7** |
| 2 | Claude Fable 5.1 | Anthropic | 56.8 |
| 3 | Claude Opus 5 | Anthropic | 55.4 |
| 4 | GPT-5.6 Sol | OpenAI | 55.3 |
| 5 | Muse Spark 1.3 | Meta | 55.3 |
| 6 | Claude Mythos Preview | Anthropic | 55.1 |
| 7 | Claude Fable 5 | Anthropic | 54.8 |
| 8 | Kimi K3 | Moonshot AI | 53.8 |
| 9 | GLM-5.3 | Zhipu AI | 53.6 |
| 10 | DeepSeek-V4-Pro | DeepSeek | 52.5 |

### Top por Categoria

#### Coding
| Rank | Modelo | Score |
|:----:|--------|:-----:|
| 1 | GPT-6 Astra | 67.0 |
| 2 | Claude Fable 5.1 | 65.1 |
| 3 | Claude Opus 5 | 68.1 |

#### Reasoning
| Rank | Modelo | Score |
|:----:|--------|:-----:|
| 1 | GPT-6 Astra | 60.7 |
| 2 | Claude Fable 5.1 | 56.8 |
| 3 | Claude Opus 5 | 55.4 |

## Como Interpretar Benchmarks

### Regras de Ouro

```
1. BENCHMARKS NÃO SÃO TUDO
   → Modelo que ganha em MMLU pode perder no seu caso de uso

2. USE MÚLTIPLOS BENCHMARKS
   → Nenhum benchmark sozinho prevê performance em produção

3. BENCHMARKS SATURAM
   → MMLU está saturado (>90% para frontier models)
   → Use versões mais difíceis (MMLU-Pro, GPQA Diamond)

4. CUSTOMIZE SEUS BENCHMARKS
   → O melhor teste é com seus dados reais
   → Crie eval set do seu domínio

5. CONSIDERE CUSTO
   → Modelo 1% melhor pode custar 10x mais
   → Calcule custo/benefício
```

### Quando Usar Cada Benchmark

| Necessidade | Benchmark Recomendado |
|-------------|----------------------|
| Selecionar 3 modelos de 20 candidatos | MMLU, HumanEval, Arena Elo |
| Escolher para RAG | MT-Bench (instruction following) |
| Escolher para coding | HumanEval + SWE-Bench |
| Escolher para pesquisa | GPQA + MATH |
| Prever satisfação do usuário | Arena Elo |

## Métricas Importantes

### Definições

| Métrica | O que mede |
|---------|------------|
| **Accuracy** | % de acertos |
| **Pass@1** | % de vezes que acerta na primeira tentativa |
| **Elo Rating** | Ranking baseado em vitórias contra outros modelos |
| **Latency** | Tempo de resposta |
| **Cost/Task** | Custo por tarefa |
| **Tokens/Task** | Quantidade de tokens consumidos |

## Benchmarks que NÃO Existem

| Capacidade | Por que falta |
|------------|---------------|
| **Custo real** | Varia por uso, cache, batch |
| **Velocidade real** | Depende de infra |
| **Satisfação humana** | Subjetivo |
| **Produção** | Diferente de laboratório |

## Conexões

- [[generative-ai]] — Categoria
- [[llms]] — Modelos avaliados
- [[openai-gpt]] — GPT-6 Astra benchmarks
- [[anthropic-claude]] — Claude benchmarks
- [[google-gemini]] — Gemini benchmarks
- [[geracao-texto]] — Capacidade textual
- [[geracao-codigo]] — Capacidade de código

---

**Status:** Documento explorado — guia completo de benchmarks
**Última atualização:** Setembro 2026
