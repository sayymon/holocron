---
titulo: "Ollama — LLMs Locais Sem Complicação"
tags: [ollama, local, self-host, privacidade, gpu, inference]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-infrastructure
status: explored
connections:
  - llms
  - meta-llama
  - inference-platforms
---
# Ollama — LLMs Locais Sem Complicação

## O que é

Ollama é uma ferramenta para **rodar LLMs localmente** no seu computador. Abstrai toda a complexidade de download, quantização e serving de modelos em comandos simples como `ollama run llama4`.

**Analogia:** Docker para LLMs — pull e run.

## Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **One-line install** | `curl -fsSL https://ollama.com/install.sh | sh` |
| **Catálogo de modelos** | Llama, Mistral, Gemma, Phi, Qwen, DeepSeek |
| **API OpenAI-compatible** | Drop-in replacement (localhost:11434) |
| **Quantização automática** | Modelos em Q4, Q5, Q8 para caber em RAM |
| **GPU acceleration** | NVIDIA, Apple Silicon (Metal), AMD |
| **Modelfile** | Customizar system prompt, temperature, etc. |
| **Multi-model** | Rodar vários modelos simultaneamente |

## Preço

- **100% Grátis** — open-source, MIT license
- **Custo real**: Seu hardware (GPU) + eletricidade
- Sem API calls, sem tokens, sem limites

## Requisitos de Hardware

| Modelo | RAM Mínima | GPU Recomendada | Performance |
|--------|:----------:|:---------------:|:-----------:|
| 7B (Llama 3.3, Mistral) | 8GB | Apple M1+ / RTX 3060 | ~30 tok/s |
| 13B (Qwen 2.5) | 16GB | M2 Pro / RTX 3080 | ~20 tok/s |
| 70B (Llama 3.3) | 48GB+ | M3 Max / RTX 4090 | ~10 tok/s |
| 109B (Llama 4 Scout) | 64GB+ | M3 Ultra / 2x 4090 | ~5 tok/s |

## Quando Usar

✅ **Use Ollama quando:**
- **Privacidade** — dados nunca saem do seu computador
- **Experimentação** — testar modelos sem custo
- **Offline** — trabalhar sem internet
- **Desenvolvimento** — API local para testes (não paga tokens)
- **Aprendizado** — entender como modelos funcionam

❌ **Evite quando:**
- Precisa de qualidade frontier (GPT-5.2/Opus são melhores)
- Produção com SLA (self-host exige ops)
- Hardware limitado (< 8GB RAM)
- Latência importa e não tem GPU boa

## Comandos Essenciais

```bash
ollama pull llama3.3          # Baixar modelo
ollama run llama3.3           # Chat interativo
ollama list                   # Listar modelos locais
ollama serve                  # Iniciar API server
ollama rm modelo              # Remover modelo
```

## Conceitos Relacionados

- [[llms]] — O que roda
- [[meta-llama]] — Modelo mais popular no Ollama
- [[inference-platforms]] — Categoria
- [[ai-gateway]] — LiteLLM pode rotear para Ollama

## Conexões

- [[meta-llama]] — Modelos mais baixados
- [[deepseek]] — Disponível no catálogo
- [[langchain]] — Integra via ChatOllama
- [[ai-gateway]] — Backend possível
