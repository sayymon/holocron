---
titulo: "Fine-Tuning — Customização de Modelos"
tags: [fine-tuning, lora, qlora, rlhf, dpo, customizacao]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: patterns
status: explored
connections:
  - llms
  - meta-llama
  - deepseek
  - rag
---
# Fine-Tuning — Customização de Modelos

## O que é

Fine-tuning é o processo de **retreinar** (parte de) um LLM com dados específicos do seu domínio para alterar seu comportamento, estilo ou conhecimento. Diferente de [[prompt-engineering]] (instruir no momento) e [[rag]] (buscar informação), fine-tuning muda os pesos do modelo permanentemente.

## Quando Usar (Regra de Ouro)

```
1. Prompt Engineering → resolve 80% dos casos
2. RAG → resolve 15% (conhecimento dinâmico)
3. Fine-tuning → resolve 4% (estilo/formato/domain)
4. Full retrain → resolve 1% (caso extremo)
```

**Use fine-tuning quando:**
- Quer estilo/formato MUITO específico (ex: sempre responde como JSON com campos X, Y, Z)
- Domain expertise que não se captura bem em prompt
- Reduzir custos de prompts longos (internalizar instruções)
- Modelo precisa saber algo que não é "buscável" (ex: jargão interno)

**NÃO use fine-tuning quando:**
- Quer adicionar conhecimento factual (use RAG)
- Pode resolver com bom prompt engineering
- Dados mudam frequentemente (RAG é melhor)

## Métodos

| Método | VRAM | Custo | Qualidade | Complexidade |
|--------|:----:|:-----:|:---------:|:------------:|
| **LoRA** | ~16GB (7B) | Médio | Alta | Média |
| **QLoRA** | ~6GB (7B) | Baixo | Boa | Média |
| **Full Fine-Tuning** | ~80GB+ (7B) | Alto | Máxima | Alta |
| **DPO** (Direct Preference Optimization) | ~32GB | Alto | Alta (alinhamento) | Alta |
| **RLHF** | Muito alto | Muito alto | Máxima (alinhamento) | Muito alta |
| **GRPO** | Alto | Alto | Alta | Alta |

### LoRA (Low-Rank Adaptation)
- Treina apenas **adaptadores de baixo rank** (0.1-1% dos parâmetros)
- Modelo base fica congelado
- Adaptadores podem ser swapados em runtime
- **80% menos custo** que full fine-tuning

### QLoRA
- LoRA + quantização 4-bit do modelo base
- Permite fine-tuning de modelos 70B em **single GPU** (24GB)
- Qualidade ligeiramente inferior ao LoRA completo

## Plataformas

| Plataforma | Modelos Suportados | Preço | Diferencial |
|------------|-------------------|:-----:|-------------|
| **OpenAI Fine-Tuning** | GPT-4o, GPT-4.1 mini | ~$25/MTok training | Mais simples, zero infra |
| **Together AI** | Llama, Mistral, Qwen | ~$5-20/MTok | Open-source, LoRA rápido |
| **Fireworks AI** | Llama, Mistral | Variável | 100 LoRA adapters simultâneos |
| **Unsloth** | Qualquer HuggingFace | Grátis (OSS) | 2x mais rápido, 60% menos VRAM |
| **Axolotl** | Qualquer HuggingFace | Grátis (OSS) | Multi-GPU, configurável |
| **HuggingFace AutoTrain** | Qualquer HF | $0 (seu hardware) | UI simples |

## Pipeline de Fine-Tuning

```
1. Coletar dados de treinamento (formato: instruction/input/output)
2. Limpar e formatar (JSONL com schema do provider)
3. Dividir train/eval (80/20)
4. Treinar (LoRA: ~1-4 horas para 7B)
5. Avaliar (perplexity, task-specific metrics)
6. Deploy (merge LoRA weights ou serve adapter)
7. Monitorar em produção
```

## Anti-padrões

- ❌ Fine-tunar antes de tentar RAG
- ❌ Dados de treinamento < 100 exemplos (insuficiente)
- ❌ Não ter eval set separado (overfitting invisível)
- ❌ Full fine-tuning quando LoRA resolve
- ❌ Ignorar data quality (garbage in = garbage out)
- ❌ Fine-tunar para adicionar conhecimento factual (RAG é melhor)

## Conceitos Relacionados

- [[llms]] — O que customiza
- [[rag]] — Alternativa/complemento
- [[meta-llama]] — Base popular para FT
- [[deepseek]] — Modelo open para FT
- [[prompt-engineering]] — Primeira opção antes de FT

## Conexões

- [[llms]] — Modelos base
- [[rag]] — Alternativa para knowledge
- [[meta-llama]] — Target popular
- [[inference-platforms]] — Onde rodar o resultado
- [[observabilidade-llm]] — Monitorar performance
