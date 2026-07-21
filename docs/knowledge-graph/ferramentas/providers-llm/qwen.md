---
titulo: "Qwen — Open-Source Apache 2.0 (Alibaba)"
tags: [qwen, alibaba, open-source, apache, multilingual, moe]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-providers
status: explored
connections:
  - llms
  - fine-tuning
  - inference-platforms
---
# Qwen — Open-Source Apache 2.0 (Alibaba)

## O que é

Qwen (通义千问) é a família de modelos da Alibaba Cloud. Principal destaque: **licença Apache 2.0** (a mais permissiva entre os modelos frontier open-source). Forte em multilíngue (especialmente CJK) e coding.

## Modelos (Junho 2026)

| Modelo | Params | Contexto | Licença | Destaque |
|--------|:------:|:--------:|---------|----------|
| **Qwen 3.5 72B** | 72B (dense) | 128K | Apache 2.0 | Best dense open-source |
| **Qwen 3.5 235B MoE** | 235B (MoE) | 128K | Apache 2.0 | Frontier MoE |
| **Qwen 3.5 27B** | 27B | 128K | Apache 2.0 | **Best small coder** open |
| **Qwen 3.5 7B** | 7B | 128K | Apache 2.0 | Edge, local |

## Diferenciais

- **Apache 2.0** — Use comercialmente sem restrições (vs Llama License)
- **Multilíngue** — Excelente em chinês, japonês, coreano, português
- **Coding forte** — Qwen 3.5 27B é best-in-class para tamanho
- **Ecossistema** — Quantizações, fine-tunes, extensões no HuggingFace

## Quando Usar

✅ **Use Qwen quando:**
- Precisa de **licença Apache 2.0** (uso comercial irrestrito)
- Foco **multilíngue** (especialmente asiático)
- Quer **modelo small + forte em código** (27B)
- Fine-tuning sem preocupação legal

❌ **Evite quando:**
- Quer contexto ultra-longo → [[meta-llama]] Scout (10M)
- Reasoning máximo → [[deepseek]] R1
- Precisa de SLA enterprise → Providers managed

## Conceitos Relacionados

- [[llms]] — Categoria
- [[fine-tuning]] — Target popular
- [[inference-platforms]] — Onde rodar

## Conexões

- [[meta-llama]] — Competidor (Llama License)
- [[deepseek]] — Competidor chinês
- [[mistral]] — Competidor europeu
- [[ollama]] — Disponível para local
