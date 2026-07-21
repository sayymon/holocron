---
titulo: "Inference Platforms — Onde Rodar LLMs"
tags: [inference, groq, cerebras, together, fireworks, serverless, gpu]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: infrastructure
status: explored
connections:
  - llms
  - meta-llama
  - ai-gateway
  - ollama
---
# Inference Platforms — Onde Rodar LLMs

## O que é

Plataformas de inferência hospedam e servem modelos de IA. Você envia tokens via API, elas processam no hardware delas e devolvem a resposta. Diferem em velocidade, preço, modelos disponíveis e tipo de hardware.

## Plataformas em 2026

### Custom Silicon (Ultra-rápidas)

| Plataforma | Hardware | Velocidade (Llama 70B) | Preço/MTok | Destaque |
|------------|----------|:----------------------:|:----------:|----------|
| **Groq** | LPU (custom chip) | ~319 tok/s | ~$0.59 | Consistentemente rápido, free tier |
| **Cerebras** | Wafer-Scale Engine | ~2000 tok/s | ~$0.60 | Mais rápido do mundo |
| **SambaNova** | RDU (custom) | ~306 tok/s | ~$0.65 | Enterprise, on-prem |

### GPU-based (Flexíveis)

| Plataforma | Modelos | Velocidade | Preço/MTok (70B) | Destaque |
|------------|---------|:----------:|:----------------:|----------|
| **Together AI** | Llama, Mistral, Qwen | ~150 tok/s | ~$0.88 | Fine-tuning + serving, bom equilíbrio |
| **Fireworks AI** | Llama, Mistral | ~150 tok/s | ~$0.90 | Function-calling otimizado, 100 LoRAs |
| **DeepInfra** | Llama, Mistral, Qwen | ~120 tok/s | ~$0.50 | Mais barato GPU-based |
| **Replicate** | Qualquer (Docker) | Variável | Pay-per-second | Flexibilidade máxima |
| **Modal** | Custom containers | Variável | Pay-per-second | Dev experience excelente |

### Self-hosted

| Ferramenta | Tipo | Custo | Quando |
|------------|------|-------|--------|
| **vLLM** | Serving engine | GPU cost ($2-5/hr A100) | Produção self-host |
| **TGI** (HuggingFace) | Serving engine | GPU cost | HuggingFace ecosystem |
| **[[ollama]]** | Local dev | $0 (seu hardware) | Dev, teste, privacidade |
| **LM Studio** | GUI desktop | $0 | Experimentação sem código |
| **NVIDIA NIM** | Containers otimizados | NVIDIA GPU | Enterprise |

## Como Escolher

| Prioridade | Plataforma |
|------------|-----------|
| **Velocidade máxima** | Cerebras > Groq > SambaNova |
| **Custo mínimo (serverless)** | DeepInfra > Together > Fireworks |
| **Fine-tuning + serving** | Together > Fireworks |
| **Function-calling** | Fireworks (otimizado) |
| **Free tier para aprender** | Groq (14 req/min) |
| **Privacidade/controle** | vLLM self-hosted |
| **Dev local** | Ollama |

## Modelo de Cobrança

| Tipo | Como funciona | Exemplos |
|------|---------------|----------|
| **Pay-per-token** | Paga input + output tokens | Together, Fireworks, Groq |
| **Pay-per-second** | Paga tempo de GPU usado | Replicate, Modal |
| **Reserved** | Aluga GPU dedicada (hora/mês) | AWS, GCP, Lambda |
| **Free tier** | Limitado mas grátis | Groq (14 req/min), Cerebras (30/min) |

## Conceitos Relacionados

- [[llms]] — O que serve
- [[meta-llama]] — Modelo mais popular para inferência
- [[ai-gateway]] — Camada acima
- [[ollama]] — Opção local

## Conexões

- [[llms]] — Modelos servidos
- [[ai-gateway]] — Roteia entre platforms
- [[openrouter]] — Agrega platforms
- [[meta-llama]] — Modelo mais rodado
- [[fine-tuning]] — Together/Fireworks fazem FT + serve
