---
titulo: "OpenAI GPT — O Ecossistema Dominante"
tags: [openai, gpt, gpt-5, chatgpt, api, provider]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-providers
status: explored
connections:
  - llms
  - ai-gateway
  - fine-tuning
  - embeddings
  - openai-agents-sdk
---
# OpenAI GPT — O Ecossistema Dominante

## O que é

OpenAI é a empresa que popularizou LLMs com o ChatGPT (Nov 2022). Oferece uma família de modelos (GPT) via API, além de ferramentas como Assistants API, fine-tuning, embeddings e o Agents SDK. Em 2026, é o ecossistema mais amplo do mercado.

## Modelos (Junho 2026)

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso |
|--------|:------------:|:-------------:|:--------:|-----|
| **GPT-5.2** | $1.75 | $14.00 | 128K | Frontier: raciocínio, agentes complexos |
| **GPT-5.2 Pro** | $21.00 | $168.00 | 128K | Pesquisa, tarefas ultra-complexas |
| **GPT-5 mini** | $0.25 | $2.00 | 128K | Custo-benefício geral |
| **GPT-5 nano** | $0.05 | $0.40 | 128K | Alto volume, classificação, extração |
| **GPT-4.1** | $2.00 | $8.00 | 1M | Código, instruction-following preciso |
| **o3** | $10.00 | $40.00 | 200K | Reasoning chains (thinking models) |

## Funcionalidades do Ecossistema

| Feature | O que faz | Quando usar |
|---------|-----------|-------------|
| **Chat Completions API** | Gerar texto conversacional | Todo chat/completion |
| **Assistants API** | Agentes com memória persistente | Chatbots stateful |
| **Fine-tuning** | Treinar modelos customizados | Estilo/formato específico |
| **Embeddings** | Vetorizar texto | RAG, busca semântica |
| **Batch API** | Processar em lote (50% desconto) | Alto volume não real-time |
| **Realtime API** | Áudio/voz em tempo real | Voice assistants |
| **[[openai-agents-sdk]]** | Framework de agentes | Workflows autônomos |
| **Prompt Caching** | Cache de prefixo (até 90% desc.) | Prompts com prefix fixo |

## Modelo de Cobrança

- **Pay-per-token**: Paga por tokens de input + output consumidos
- **Sem mínimo mensal** para API
- **ChatGPT Plus**: $20/mês (acesso consumer a GPT-5)
- **ChatGPT Pro**: $200/mês (acesso ilimitado a modelos top)
- **API**: Pré-pago ou faturamento mensal

## Quando Usar

✅ **Use OpenAI quando:**
- Precisa do ecossistema mais completo (assistants, realtime, tools)
- Time familiar com a API
- Quer instruction-following preciso (GPT-4.1)
- Precisa de fine-tuning managed sem infra

❌ **Evite quando:**
- Precisa de contexto > 128K (Gemini tem 1M+)
- Budget apertado + alto volume (Gemini Flash é 10x mais barato)
- Soberania de dados/GDPR (servidores US only)
- Coding máximo (Claude Sonnet 4 ganha em SWE-Bench)

## Conceitos Relacionados

- [[llms]] — Categoria do produto
- [[ai-gateway]] — Como intermediar acesso
- [[fine-tuning]] — Customização de modelos
- [[embeddings]] — API de embeddings
- [[openai-agents-sdk]] — Framework de agentes
- [[prompt-engineering]] — Otimizar uso

## Conexões

- [[anthropic-claude]] — Competidor direto
- [[google-gemini]] — Competidor (melhor custo)
- [[openrouter]] — Acesso via gateway
- [[langchain]] — Framework que integra
