---
titulo: "LoRA — Low-Rank Adaptation"
tags: [lora, peft, fine-tuning, parameter-efficient, ml, deep-learning]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: paradigmas
status: explored
wikilinks:
  - peft
  - qlora
  - fine-tuning
  - transformers
  - llms
  - deep-learning
---

# LoRA — Low-Rank Adaptation

> LoRA é a técnica de fine-tuning eficiente que decompõe a atualização de pesos em duas matrizes de baixo-rango, treinando apenas ~0.1% dos parâmetros enquanto mantém ~95-98% da qualidade do fine-tuning completo.

## O Problema que LoRA Resolve

### O Custo do Fine-Tuning Completo

```
MODELO: Llama 3 8B (8 bilhões de parâmetros)

FULL FINE-TUNING:
  → Atualiza matriz W (d × d = 8B parâmetros)
  → VRAM: ~80 GB (múltiplas GPUs)
  → Armazenamento: 8 GB por tarefa
  → Tempo: dias

PROBLEMA:
  → Inviável para maioria das empresas
  → 10 tarefas = 80 GB só de armazenamento
```

### A Solução LoRA

```
LoRA:
  → Congela W (8B parâmetros)
  → Treina A (d × r) e B (r × d) onde r << d
  → r=16 → ~7M parâmetros (0.1%)
  → VRAM: ~16 GB (uma GPU)
  → Armazenamento: ~100 MB por tarefa
  → Resultado: ~95-98% da qualidade
```

---

## Como LoRA Funciona

### A Intuição Matemática

Em vez de atualizar a matriz de pesos completa `W` (dimensões d × d), LoRA decompõe a atualização em duas matrizes menores:

```
MODELO ORIGINAL:
  Input → [W: d × d] → Output
  (bilhões de parâmetros, congelado)

COM LoRA:
  Input → [W: d × d (congelado)] → Output
       \→ [A: d × r] → [B: r × d] →/
            (treinável)

Onde:
  d = dimensão do modelo (ex: 4096)
  r = rank (baixo, ex: 16)
  r << d → poucos parâmetros
```

### Exemplo Numérico

| Componente | Dimensão | Parâmetros |
|------------|----------|:----------:|
| W (original) | 4096 × 4096 | ~16.7M |
| A (LoRA) | 4096 × 16 | ~65K |
| B (LoRA) | 16 × 4096 | ~65K |
| **Total LoRA** | — | **~130K** |
| **% do original** | — | **~0.8%** |

### Por Que Funciona?

A pesquisa descobriu que **atualizações de fine-tuning têm rank baixo** — ou seja, as mudanças necessárias para adaptar o modelo a uma nova tarefa podem ser representadas por matrizes pequenas.

**Intuição:**
- O modelo já "sabe" quase tudo (pré-treinado em trilhões de tokens)
- Para personalizar, basta ajustar **poucos padrões específicos**
- Esses ajustes são de baixa dimensão (rank baixo)

---

## Arquitetura LoRA

```
┌─────────────────────────────────────────┐
│           MODELO BASE (congelado)        │
│                                          │
│  Input ──→ [W: d × d] ──→ Output        │
│             (frozen)                      │
│                                          │
│  Input ──→ [A: d × r] ──→ [B: r × d] ──→ Output (soma)
│             (trainable)    (trainable)    │
│                                          │
│  = Output final                          │
└─────────────────────────────────────────┘

Após treino:
  Final Model = Base Model + (alpha/r) × A × B
  → Mesma latência de inferência do original
```

---

## Hiperparâmetros LoRA

| Parâmetro | Descrição | Valores Típicos |
|-----------|-----------|:---------------:|
| **r (rank)** | Dimensão da decomposição | 4, 8, 16, 32, 64 |
| **alpha** | Fator de escala (alpha/r) | 16, 32 (geralmente 2× r) |
| **target_modules** | Camadas a adaptar | q_proj, v_proj, k_proj |
| **dropout** | Regularização | 0.05-0.1 |

### Trade-offs do Rank

| Rank | Parâmetros | Qualidade | Uso Recomendado |
|:----:|:----------:|:---------:|-----------------|
| r=4 | Mínimo | ~90% | Tarefas simples |
| r=16 | Balanceado | ~95% | **Default recomendado** |
| r=32 | Maior | ~97% | Tarefas complexas |
| r=64 | Próximo ao full FT | ~98% | Qualidade máxima |

---

## LoRA na Prática

### Pipeline de Treino

```
1. Coletar dados (formato: instruction/input/output)
2. Limpar e formatar (JSONL)
3. Dividir train/eval (80/20)
4. Treinar LoRA (~1-4 horas para 7B)
5. Avaliar (perplexity, métricas específicas)
6. Deploy (merge LoRA weights ou servir adapter)
7. Monitorar em produção
```

### Exemplo de Configuração (HuggingFace PEFT)

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,                    # rank
    lora_alpha=32,           # scaling factor
    target_modules=[         # camadas a adaptar
        "q_proj", "k_proj", 
        "v_proj", "o_proj"
    ],
    lora_dropout=0.05,       # regularização
    bias="none",
    task_type="CAUSAL_LM"
)

model = get_peft_model(base_model, config)
# Treina apenas 0.1% dos parâmetros
```

---

## Comparação: LoRA vs Outras Técnicas

| Aspecto | Full FT | LoRA | QLoRA | Prefix Tuning |
|---------|:-------:|:----:|:-----:|:-------------:|
| **VRAM (7B)** | ~80 GB | ~16 GB | ~6 GB | ~16 GB |
| **Parâmetros** | 100% | ~0.1% | ~0.1% | ~0.1% |
| **Qualidade** | 100% | ~95-98% | ~93-96% | ~90-95% |
| **Armazenamento** | 8 GB | ~100 MB | ~100 MB | ~100 MB |
| **Tempo** | Dias | Horas | Horas | Horas |
| **Complexidade** | Alta | Média | Média | Baixa |

---

## Quando Usar LoRA

### ✅ Use LoRA Quando

| Caso | Exemplo |
|------|---------|
| Estilo/formato específico | Bot que sempre responde em JSON |
| Domínio especializado | Modelo para advogados |
| Redução de custo | Internalizar instruções de prompt |
| Multi-tenant | 10 clientes, mesmos adapters |
| GPU limitada | Treinar em GPU única |

### ❌ NÃO Use LoRA Quando

| Caso | Alternativa |
|------|-------------|
| Conhecimento factual | RAG |
| Prompt engineering resolve | Few-shot + CoT |
| Dados mudam frequentemente | RAG |
| Mudança radical de comportamento | Full Fine-Tuning |

---

## Onde LoRA é Aplicado

### 1. Customização de Estilo/Formatação

```
CASO: Bot que sempre responde em JSON com campos específicos

SEM LoRA: Prompt gigante com exemplos a cada interação
COM LoRA: Modelo aprende o formato → respostas mais baratas
```

### 2. Domínio Específico

```
CASO: Modelo para médicos usa terminologia médica

SEM LoRA: RAG com documentos médicos
COM LoRA: Modelo internaliza vocabulário e estilo
```

### 3. Redução de Custo

```
CASO: Prompt de sistema com 2000 tokens

SEM LoRA: Paga 2000 tokens a cada requisição
COM LoRA: Modelo internalizou → prompt menor
```

### 4. Multi-Tenant

```
CASO: Mesmo modelo serve 10 clientes diferentes

COM LoRA:
  Base model (1 cópia) + 10 adapters (10 MB cada)
  → Hot-swap em runtime
```

---

## Ferramentas e Plataformas

| Ferramenta | Tipo | Diferencial |
|------------|------|-------------|
| **HuggingFace PEFT** | Biblioteca OSS | Padrão da indústria |
| **Unsloth** | CLI/Treino | 2x mais rápido, 60% menos VRAM |
| **Together AI** | Managed | Zero infra, LoRA rápido |
| **Fireworks AI** | Managed | 100 adapters simultâneos |
| **OpenAI Fine-Tuning** | API | GPT com LoRA, zero infra |

---

## Conexões

### Conceitos Relacionados
- [[peft]] — Família que LoRA pertence
- [[qlora]] — LoRA + quantização 4-bit
- [[fine-tuning]] — Categoria maior
- [[transformers]] — LoRA funciona com Transformers
- [[llms]] — LoRA adapta LLMs
- [[deep-learning]] — Fundamento

### Hiperparâmetros
- **r (rank):** 4-64 (16 default)
- **alpha:** 16-32 (2× r)
- **target_modules:** q_proj, k_proj, v_proj
- **dropout:** 0.05-0.1

---

**Status:** Documento explorado — técnica principal de PEFT
**Próximo:** [[qlora]] (variação para GPU limitada) ou [[fine-tuning]] (visão geral)
