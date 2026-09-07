---
titulo: "PEFT — Parameter-Efficient Fine-Tuning"
tags: [peft, fine-tuning, parameter-efficient, ml, deep-learning]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: paradigmas
status: explored
wikilinks:
  - fine-tuning
  - lora
  - qlora
  - transformers
  - llms
  - reinforcement-learning
---

# PEFT — Parameter-Efficient Fine-Tuning

> PEFT é a **família de técnicas** que permitem adaptar modelos grandes treinando apenas uma fração mínima dos parâmetros, em vez de retreinar o modelo inteiro.

## O Problema que PEFT Resolve

### O Custo do Fine-Tuning Completo

```
MODELO: Llama 3 8B (8 bilhões de parâmetros)

FULL FINE-TUNING:
  → Precisa atualizar TODOS os 8B parâmetros
  → VRAM necessária: ~80 GB (múltiplas GPUs)
  → Tempo: dias
  → Custo: $$$$$
  → Armazenamento: cópia inteira do modelo (8 GB) por tarefa

PROBLEMA:
  → 10 tarefas = 10 cópias de 8 GB = 80 GB só de armazenamento
  → Inviável para maioria das empresas
```

### A Solução PEFT

```
PEFT:
  → Congela o modelo inteiro (8B parâmetros)
  → Treina apenas uma fração (0.1-5%)
  → Mesma qualidade com fração do custo
  → 10 tarefas = 1 modelo base + 10 adapters de ~100 MB
```

---

## A Família PEFT

```
PEFT (Parameter-Efficient Fine-Tuning)
  │
  │  ← Técnicas que eficientizam o treino
  │
  ├─→ LoRA (Low-Rank Adaptation)
  │     Matrizes de baixo-rango
  │     ~0.1-1% dos parâmetros
  │     PADRÃO DA INDÚSTRIA (2026)
  │
  ├─→ QLoRA (Quantized LoRA)
  │     LoRA + quantização 4-bit
  │     ~0.1% dos parâmetros
  │     GPU limitada (single GPU)
  │
  ├─→ Prefix Tuning
  │     Virtual tokens no início do input
  │     ~0.1% dos parâmetros
  │     Geração de texto
  │
  ├─→ Adapters
  │     Camadas extras inseridas entre camadas
  │     ~1-5% dos parâmetros
  │     Multi-tarefa
  │
  ├─→ IA3 (Infused Adapter by Inhibiting and Amplifying Inner Activations)
  │     Vetores de escala
  │     ~0.01% dos parâmetros
  │     Dados muito poucos
  │
  └─→ Prompt Tuning
        Virtual tokens contínuos
        ~0.01% dos parâmetros
        Múltiplas tarefas
```

---

## Comparativo Geral

| Técnica | Mecanismo | Parâmetros | VRAM (7B) | Qualidade | Complexidade |
|---------|-----------|:----------:|:---------:|:---------:|:------------:|
| **Full FT** | Retreino completo | 100% | ~80 GB | 100% | Alta |
| **LoRA** | Matrizes de baixo-rango | ~0.1% | ~16 GB | ~95-98% | Média |
| **QLoRA** | LoRA + quantização | ~0.1% | ~6 GB | ~93-96% | Média |
| **Prefix Tuning** | Virtual tokens | ~0.1% | ~16 GB | ~90-95% | Baixa |
| **Adapters** | Camadas extras | ~1-5% | ~20 GB | ~95-98% | Média |
| **IA3** | Vetores de escala | ~0.01% | ~16 GB | ~85-90% | Baixa |

---

## Quando Usar Cada Técnica

```
Você tem dados específicos?
  │
  ├─→ NÃO → Prompt Engineering + RAG
  │
  └─→ SIM → Quantos dados?
        │
        ├─→ <100 exemplos → Few-Shot + CoT
        │
        ├─→ 100-1000 → PEFT
        │     │
        │     ├─→ GPU limitada? → QLoRA
        │     ├─→ Multi-tarefa? → Adapters
        │     ├─→ Dados muito poucos? → IA3
        │     └─→ Default → LoRA
        │
        └─→ >1000 → Full Fine-Tuning (raro)
```

---

## A Regra de Ouro

| Abordagem | Resolve | % dos Casos |
|-----------|---------|:-----------:|
| Prompt Engineering | Comportamento, formatação | 80% |
| RAG | Conhecimento dinâmico | 15% |
| **PEFT/LoRA** | Estilo, domínio, formato | 4% |
| Full Fine-Tuning | Caso extremo | 1% |

---

## Vantagens de PEFT

| Vantagem | Descrição |
|----------|-----------|
| **Custo** | Fracionário (0.1-5% do full FT) |
| **Velocidade** | Horas vs dias |
| **Memória** | Uma GPU vs múltiplas |
| **Armazenamento** | ~100 MB por tarefa vs ~8 GB |
| **Multi-tenant** | Múltiplos adapters no mesmo base |
| **Hot-swap** | Trocar adapters em runtime |
| **Compartilhamento** | Adapter é portátil, leve |

---

## Limitações

| Limitação | Descrição |
|-----------|-----------|
| **Não substitui full FT** | Para mudanças radicais, still needed |
| **Depende do base model** | Se o base não sabe, adapter não ensina |
| **Dados de qualidade** | Garbage in = garbage out |
| **Hyperparâmetros** | Rank, alpha, dropout precisam de tuning |

---

## Conexões

### Conceitos Relacionados
- [[fine-tuning]] — Categoria maior que inclui PEFT
- [[lora]] — Técnica mais popular de PEFT
- [[qlora]] — LoRA + quantização
- [[transformers]] — PEFT funciona com qualquer Transformer
- [[llms]] — PEFT adapta LLMs
- [[reinforcement-learning]] — RLHF é uma forma de fine-tuning

### Frameworks
- HuggingFace PEFT — Biblioteca padrão
- Unsloth — 2x mais rápido
- TRL — RLHF/DPO

### Plataformas
- Together AI — LoRA managed
- Fireworks AI — 100 adapters simultâneos
- OpenAI Fine-Tuning — GPT com LoRA

---

**Status:** Documento explorado — família de técnicas PEFT
**Próximo:** [[lora]] (detalhe da técnica mais popular) ou [[qlora]] (variação para GPU limitada)
