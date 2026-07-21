---
titulo: "DeepSeek — O Coding Champion Open-Source"
tags: [deepseek, open-source, moe, coding, reasoning, china]
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
# DeepSeek — O Coding Champion Open-Source

## O que é

DeepSeek é um lab chinês que surpreendeu o mercado com modelos MoE de altíssima qualidade a custo muito baixo. DeepSeek V3 (Dez 2024) e R1 (reasoning) mostraram que treinar modelos frontier com budget limitado é possível. Em 2026, DeepSeek V4 bate modelos closed-source em SWE-Bench.

## Modelos (Junho 2026)

| Modelo | Params (Ativos/Total) | Contexto | Destaque |
|--------|:---------------------:|:--------:|----------|
| **DeepSeek V4 Pro** | 37B / 671B (MoE) | 128K | Coding líder, agentic |
| **DeepSeek V3** | 37B / 671B (MoE) | 128K | Workhouse, custo baixo |
| **DeepSeek R1** | 37B / 671B (MoE) | 128K | Reasoning (thinking model) |
| **DeepSeek Coder V2** | — | 128K | Especialista em código |

## Preço via API (DeepSeek direto)

| Modelo | Input $/MTok | Output $/MTok |
|--------|:------------:|:-------------:|
| V3 | $0.27 | $1.10 |
| R1 | $0.55 | $2.19 |

**Nota:** Preços ~5-10x mais baratos que GPT/Claude equivalente em qualidade.

## Diferenciais

- **Preço/qualidade imbatível** — Frontier quality a budget prices
- **SWE-Bench líder** — V4 empata com closed-source em coding
- **MoE eficiente** — 671B params, só 37B ativos (custo baixo de inferência)
- **Reasoning explícito** (R1) — Chain-of-thought visível
- **Open-weights** — Pesos disponíveis para self-host/fine-tune

## Riscos e Considerações

| Risco | Mitigação |
|-------|-----------|
| Empresa chinesa (geopolítica) | Self-host os weights, não dependa da API |
| Licença restritiva vs Apache | Verificar DeepSeek License para uso comercial |
| Latência API (servidores China) | Usar via Together AI, Fireworks, ou self-host |
| Censura em temas sensíveis | Fine-tune remove, ou use via provider que destrava |

## Quando Usar

✅ **Use DeepSeek quando:**
- Quer **qualidade frontier por preço budget**
- Foco em **coding e reasoning**
- Pode self-hostar (evita dependência da API chinesa)
- Fine-tuning de modelos MoE

❌ **Evite quando:**
- Compliance exige origem de dados certificada
- Precisa de API com SLA enterprise
- Real-time voice/multimodal (não é o foco)

## Conceitos Relacionados

- [[llms]] — Categoria
- [[fine-tuning]] — LoRA sobre DeepSeek
- [[inference-platforms]] — Onde rodar
- [[reasoning-models]] — DeepSeek R1

## Conexões

- [[meta-llama]] — Competidor open-source
- [[qwen]] — Competidor chinês (Apache 2.0)
- [[openai-gpt]] — Benchmark de referência
- [[together-ai]] — Provider que hospeda
