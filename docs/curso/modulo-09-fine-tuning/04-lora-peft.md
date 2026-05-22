---
titulo: "LoRA e PEFT"
modulo: 9
unidade: 4
tags: [lora, peft, eficiência, adaptação, quantização, trade-offs]
dificuldade: avançada
fonte: "LoRA Paper (Hu et al. 2021), Hugging Face PEFT Documentation"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# LoRA e PEFT

## Contexto

Fine-tuning completo atualiza bilhões de parâmetros — exige GPUs caras e armazena cópias inteiras do modelo. PEFT (Parameter-Efficient Fine-Tuning) resolve isso treinando apenas uma fração dos parâmetros.

## O Problema do Full Fine-Tuning

| Modelo | Parâmetros | VRAM (FP16) | Storage/versão |
|--------|-----------|-------------|----------------|
| LLaMA 7B | 7B | ~14 GB | ~14 GB |
| LLaMA 13B | 13B | ~26 GB | ~26 GB |
| LLaMA 70B | 70B | ~140 GB | ~140 GB |

10 tarefas × 70B = 1.4 TB de modelos armazenados.

## LoRA — Low-Rank Adaptation

### Intuição

Em vez de atualizar a matriz W (d×d), decompõe a atualização em duas matrizes menores:

```
ΔW = A × B
A: dimensão d×r | B: dimensão r×d
r << d (rank baixo, tipicamente 4-64)
```

### Por que funciona

- Atualizações de fine-tuning têm "rank intrínseco" baixo
- Com r=16, treina-se ~0.1% dos parâmetros com ~95% da qualidade

### Arquitetura

```
Input → [Pesos Originais (frozen)] → Output
    ↘ [A (d×r)] → [B (r×d)] ↗
         LoRA adapter (trainable)
```

### Hiperparâmetros LoRA

| Parâmetro | Descrição | Valores típicos |
|-----------|-----------|-----------------|
| r (rank) | Dimensão da decomposição | 4, 8, 16, 32, 64 |
| alpha | Fator de escala (alpha/r) | 16, 32 (geralmente 2×r) |
| target_modules | Camadas a adaptar | q_proj, v_proj, k_proj |
| dropout | Regularização | 0.05-0.1 |

### Trade-offs do rank

- **r=4:** Mínimo de parâmetros, bom para tarefas simples
- **r=16:** Equilíbrio custo/qualidade (padrão recomendado)
- **r=64:** Próximo de full fine-tuning, mais caro

## Família PEFT

| Técnica | Mecanismo | Parâmetros treináveis | Quando usar |
|---------|-----------|----------------------|-------------|
| LoRA | Matrizes low-rank | ~0.1-1% | Padrão geral |
| QLoRA | LoRA + quantização 4-bit | ~0.1% | GPU limitada |
| Prefix Tuning | Tokens virtuais no início | ~0.1% | Geração de texto |
| Adapters | Camadas extras entre layers | ~1-5% | Multi-tarefa |
| IA³ | Vetores de escala | ~0.01% | Poucos dados |

## QLoRA — Quantização + LoRA

Combina quantização 4-bit do modelo base com LoRA adapters em FP16:

```
Modelo base (4-bit, frozen) + LoRA adapters (FP16, trainable)
```

**Resultado:** Fine-tuning de 70B em uma única GPU de 48GB.

Componentes:
1. **NF4** — tipo de dado otimizado para pesos de LLM
2. **Double Quantization** — quantiza as constantes de quantização
3. **Paged Optimizers** — gerencia spikes de memória com CPU offloading

## Comparação Prática

| Aspecto | Full FT | LoRA | QLoRA | API (OpenAI) |
|---------|---------|------|-------|--------------|
| VRAM (70B) | 140 GB | 16 GB | 48 GB | 0 (cloud) |
| Qualidade | 100% | ~95-98% | ~93-96% | ~95% |
| Storage/modelo | 140 GB | ~100 MB | ~100 MB | 0 |
| Tempo | Horas-dias | Min-horas | Horas | Min-horas |
| Controle | Total | Alto | Alto | Limitado |
| Custo infra | $$$$$ | $$ | $ | $$$ |

## Quando usar cada abordagem

- **API (OpenAI):** Não quer gerenciar infra, resultado rápido
- **LoRA:** Controle total, múltiplas especializações, GPU 16+ GB
- **QLoRA:** GPU limitada, modelos grandes, custo é prioridade

## Merge de Adapters

Após treino, o adapter pode ser fundido ao modelo base:

```
Modelo final = Modelo base + (alpha/r) × A × B
```

Inference com mesma latência do modelo original.

## Conexões

- [[03-fine-tuning-openai-api]] — abordagem gerenciada (comparação)
- [[05-avaliar-modelos-fine-tunados]] — como comparar LoRA vs full FT
