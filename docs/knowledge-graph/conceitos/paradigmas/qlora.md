---
titulo: "QLoRA — Quantized LoRA"
tags: [qlora, lora, peft, fine-tuning, quantization, parameter-efficient]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: paradigmas
status: explored
wikilinks:
  - lora
  - peft
  - fine-tuning
  - transformers
  - llms
  - deep-learning
---

# QLoRA — Quantized LoRA

> QLoRA é a combinação de **LoRA com quantização 4-bit** do modelo base, permitindo fine-tuning de modelos de 70B parâmetros em uma **única GPU de 48GB**, com qualidade ~93-96% do fine-tuning completo.

## O Problema que QLoRA Resolve

### LoRA Ainda Precisa de Muita VRAM

```
LORA PADRÃO (FP16):
  → Modelo Llama 3 70B
  → Base model (FP16): ~140 GB
  → LoRA adapters: ~100 MB
  → VRAM total: ~140 GB (múltiplas GPUs A100)

PROBLEMA:
  → LoRA reduz parâmetros treinados
  → MAS o modelo base ainda ocupa muita memória
  → Single GPU não suporta modelos grandes
```

### A Solução QLoRA

```
QLoRA:
  → Quantiza modelo base para 4-bit (NF4)
  → Base model (4-bit): ~35 GB
  → LoRA adapters (FP16): ~100 MB
  → VRAM total: ~48 GB (uma GPU A6000 ou 4090)

RESULTADO:
  → Fine-tuning de 70B em single GPU
  → 60-70% menos VRAM que LoRA padrão
  → Qualidade ~93-96% do full FT
```

---

## Como QLoRA Funciona

### A Arquitetura

```
┌─────────────────────────────────────────┐
│         MODELO BASE (4-bit, frozen)      │
│                                          │
│  Input ──→ [W: 4-bit] ──→ Output        │
│             (frozen, quantized)          │
│                                          │
│  Input ──→ [A: d × r (FP16)] ──→ [B: r × d (FP16)] ──→ Output
│             (trainable)                  (trainable)     (soma)
│                                          │
│  = Output final                          │
└─────────────────────────────────────────┘

Onde:
  W = pesos do modelo base (4-bit, congelado)
  A, B = adapters LoRA (FP16, treináveis)
```

### As 3 Inovações do QLoRA

| Inovação | O que faz | Por que importa |
|----------|-----------|-----------------|
| **NF4 (NormalFloat 4-bit)** | Tipo de dado otimizado para pesos de LLM | Melhor que INT4 para distribuições normais |
| **Double Quantization** | Quantiza constantes de quantização | Economiza ~0.4 GB adicional |
| **Paged Optimizers** | Gerencia picos de memória com CPU offloading | Evita OOM em treinos longos |

---

## NF4 — O Segredo do QLoRA

### Por Que Não INT4?

Pesos de LLMs seguem distribuição **normal** (gaussiana). INT4 não leva isso em conta.

### O Que é NF4?

```
Distribuição Normal:
        │
    ╭───┴───╮
   ╱         ╲
  ╱           ╲
─╱─────────────╲─

NF4:
  → Pontos de quantização OTIMIZADOS para distribuição normal
  → Mais pontos onde há mais dados (centro da curva)
  → Menos pontos onde há menos dados (caudas)
  → Resultado: melhor preservação de informação
```

### Comparação

| Tipo | Precisão | Perda | Uso |
|------|:--------:|:-----:|-----|
| INT4 | Genérico | Maior | Imagens |
| **NF4** | Otimizado para LLM | Menor | **Pesos de LLM** |
| FP16 | Alta | Nenhum | Treino padrão |

---

## Double Quantization

### O Problema

A quantização requer constantes de escala (scale factors). Essas constantes também ocupam memória.

### A Solução

```
SEM Double Quantization:
  → Pesos quantizados (4-bit)
  → Scale factors (FP32) → ocupam ~0.5 GB

COM Double Quantization:
  → Pesos quantizados (4-bit)
  → Scale factors quantizados (8-bit) → ocupam ~0.1 GB
  → Economia: ~0.4 GB
```

---

## Paged Optimizers

### O Problema

Treinos longos podem ter picos de memória (gradientes, states). Se estourar a VRAM → OOM (Out of Memory).

### A Solução

```
┌─────────────────────────────────────────┐
│              GPU (VRAM)                  │
│                                          │
│  Modelo + LoRA + Gradientes              │
│                                          │
│         ↕ (pico de memória)              │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  CPU Offload (RAM)                 │  │
│  │  Optimizer states → RAM temporário │  │
│  └────────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘

→ Gerencia picos descarregando estados na RAM
→ Evita OOM sem perder dados
```

---

## Comparação: QLoRA vs LoRA vs Full FT

| Aspecto | Full FT | LoRA | QLoRA |
|---------|:-------:|:----:|:-----:|
| **VRAM (7B)** | ~80 GB | ~16 GB | ~6 GB |
| **VRAM (70B)** | ~140 GB | ~140 GB | ~48 GB |
| **Parâmetros** | 100% | ~0.1% | ~0.1% |
| **Qualidade** | 100% | ~95-98% | ~93-96% |
| **Armazenamento** | 140 GB | ~100 MB | ~100 MB |
| **Tempo** | Dias | Horas | Horas |
| **GPU necessária** | Múltiplas A100 | A100/H100 | **Única 48GB** |

---

## Quando Usar QLoRA

### ✅ Use QLoRA Quando

| Caso | Exemplo |
|------|---------|
| GPU limitada | RTX 4090 (24GB), A6000 (48GB) |
| Modelo grande (70B+) | Llama 3 70B, Mixtral 8x7B |
| Prototipagem rápida | Testar fine-tuning antes de investir em infra |
| Custo controlado | Startup, projeto pessoal |

### ❌ NÃO Use QLoRA Quando

| Caso | Alternativa |
|------|-------------|
| Qualidade máxima necessária | LoRA padrão (FP16) |
| Infraestrutura disponível | LoRA padrão |
| Modelo pequeno (<7B) | LoRA padrão (VRAM não é bottleneck) |

---

## Exemplo de Configuração

```python
from transformers import BitsAndBytesConfig
from peft import LoraConfig, get_peft_model

# Configuração QLoRA
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,              # Quantização 4-bit
    bnb_4bit_quant_type="nf4",      # NF4 (otimizado para LLMs)
    bnb_4bit_compute_dtype="float16", # Compute em FP16
    bnb_4bit_use_double_quant=True  # Double quantization
)

# Carrega modelo quantizado
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-70B",
    quantization_config=bnb_config,
    device_map="auto"
)

# Configura LoRA
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Aplica LoRA
model = get_peft_model(model, lora_config)
# Treina em ÚNICA GPU de 48GB!
```

---

## Plataformas que Suportam QLoRA

| Plataforma | GPU Disponível | Modelos Suportados |
|------------|:--------------:|-------------------|
| **Unsloth** | Local (qualquer GPU) | HuggingFace, Llama, Mistral |
| **Together AI** | Managed | Llama, Mistral, Qwen |
| **Fireworks AI** | Managed | Llama, Mistral |
| **Google Colab** | T4/A100 | Qualquer HF model |

### Unsloth — O Mais Eficiente

```
Unsloth + QLoRA:
  → 2x mais rápido que HF padrão
  → 60% menos VRAM
  → Suporta Llama 3 70B em RTX 4090 (24GB)
  → Open-source, gratuito
```

---

## Qualidade: QLoRA vs LoRA

| Métrica | LoRA (FP16) | QLoRA (4-bit) | Diferença |
|---------|:-----------:|:-------------:|:---------:|
| **Perplexity** | ~5.2 | ~5.5 | +5.8% |
| **Human Eval** | ~72% | ~68% | -5.6% |
| **MMLU** | ~78% | ~75% | -3.8% |
| **Custo VRAM** | 140 GB | 48 GB | **-65%** |

**Trade-off:** ~3-6% de perda de qualidade por 65% de economia de VRAM.

---

## Conexões

### Conceitos Relacionados
- [[lora]] — QLoRA é LoRA + quantização
- [[peft]] — Família de técnicas
- [[fine-tuning]] — Categoria maior
- [[transformers]] — QLoRA funciona com Transformers
- [[llms]] — QLoRA adapta LLMs grandes

### Quantização
- **NF4:** Tipo de dado otimizado para LLMs
- **INT4:** Genérico (menos preciso)
- **FP16:** Padrão de treino (sem quantização)
- **GGUF:** Formato para inferência (llama.cpp)

### Ferramentas
- **Unsloth:** 2x mais rápido, 60% menos VRAM
- **HuggingFace PEFT:** Biblioteca padrão
- **BitsAndBytes:** Configuração de quantização
- **Axolotl:** Multi-GPU, configurável

---

**Status:** Documento explorado — variação de LoRA para GPU limitada
**Próximo:** [[lora]] (técnica base) ou [[fine-tuning]] (visão geral)
