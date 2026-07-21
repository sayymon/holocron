---
titulo: "Meta Llama — Open-Weights Líder"
tags: [meta, llama, open-source, moe, self-host, open-weights]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-providers
status: explored
connections:
  - llms
  - fine-tuning
  - ollama
  - inference-platforms
---
# Meta Llama — Open-Weights Líder

## O que é

Llama é a família de modelos open-weights da Meta. Desde Llama 1 (2023) até Llama 4 (2025), democratizou acesso a modelos de qualidade frontier. "Open-weights" significa que os pesos treinados são públicos, mas a licença (Llama License) tem restrições comerciais para empresas com >700M MAU.

## Modelos (Junho 2026)

| Modelo | Params (Ativos/Total) | Contexto | Licença | Destaque |
|--------|:---------------------:|:--------:|---------|----------|
| **Llama 4 Scout** | 17B / 109B (MoE) | **10M** | Llama License | Ultra-long context, cabe em 1 GPU |
| **Llama 4 Maverick** | 17B / 400B (MoE) | 1M | Llama License | Performance frontier open |
| **Llama 4 Behemoth** | — / 2T (MoE) | — | Llama License | Teacher model (limitado) |
| **Llama 3.3 70B** | 70B (dense) | 128K | Llama License | Workhorse estável |

## Diferenciais

| Feature | Descrição |
|---------|-----------|
| **10M tokens de contexto** | Scout processa livros inteiros de uma vez |
| **MoE eficiente** | 400B params mas só 17B ativos por token |
| **Self-host friendly** | Roda em Ollama, vLLM, TGI, Together, etc. |
| **Fine-tuning open** | LoRA/QLoRA sem restrições de provider |
| **Ecossistema massivo** | Mais fine-tunes que qualquer modelo no HuggingFace |

## Como Rodar

| Opção | Custo | Latência | Complexidade |
|-------|-------|----------|:------------:|
| **[[ollama]]** local | $0 (só hardware) | Variável | Baixa |
| **Together AI** | ~$0.88/MTok (70B) | ~150 tok/s | Zero |
| **Groq** | ~$0.59/MTok (70B) | ~319 tok/s | Zero |
| **Fireworks AI** | ~$0.90/MTok | ~150 tok/s | Zero |
| **vLLM self-host** | Custo GPU ($2-5/hr) | Controlável | Alta |
| **AWS Bedrock** | ~$1.00/MTok | ~100 tok/s | Média |

## Modelo de Cobrança

- **O modelo em si é grátis** (open-weights, download do HuggingFace)
- **Custo real** = inferência (GPU/serverless) + storage + ops
- Se usar via provider (Together, Groq): pay-per-token
- Se self-host: custo de GPU (A100 ~$2-3/hr, H100 ~$3-5/hr)

## Quando Usar

✅ **Use Llama quando:**
- Precisa de **controle total** sobre o modelo
- Quer fazer **fine-tuning** sem restrições de provider
- **Contexto ultra-longo** (10M tokens com Scout)
- **Privacidade/compliance** exige dados on-premise
- Budget para GPU mas quer evitar pay-per-token

❌ **Evite quando:**
- Não quer lidar com infra/ops de GPU
- Precisa de garantia de SLA enterprise (Bedrock resolve)
- Time pequeno sem expertise em ML infra
- Tarefa simples onde API managed resolve

## Conceitos Relacionados

- [[llms]] — Categoria
- [[fine-tuning]] — LoRA/QLoRA sobre Llama
- [[ollama]] — Runtime local
- [[inference-platforms]] — Onde rodar
- [[vllm]] — Serving engine

## Conexões

- [[deepseek]] — Competidor open-source (melhor coding)
- [[qwen]] — Competidor (licença Apache 2.0)
- [[mistral]] — Competidor europeu
- [[together-ai]] — Plataforma de inferência
