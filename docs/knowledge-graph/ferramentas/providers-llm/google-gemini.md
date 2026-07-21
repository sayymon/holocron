---
titulo: "Google Gemini — Custo-Líder e Multimodal"
tags: [google, gemini, flash, pro, multimodal, contexto-longo]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-providers
status: explored
connections:
  - llms
  - ai-gateway
  - embeddings
  - multimodal
---
# Google Gemini — Custo-Líder e Multimodal

## O que é

Gemini é a família de modelos da Google DeepMind. Nasceu multimodal (texto, imagem, vídeo, áudio nativamente). Em 2026, é o custo-líder absoluto com 1M+ tokens de contexto e o Gemini 2.5 Flash sendo ~10x mais barato que competidores.

## Modelos (Junho 2026)

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso |
|--------|:------------:|:-------------:|:--------:|-----|
| **Gemini 2.5 Pro** | $1.25 | $10.00 | 1M | Análise profunda, multimodal, raciocínio |
| **Gemini 2.5 Flash** | $0.15 | $0.60 | 1M | **Custo-líder com reasoning** |
| **Gemini 2.5 Flash-Lite** | $0.10 | $0.40 | 1M | Ultra-budget |
| **Gemini Embedding 2** | free tier | — | — | Embeddings grátis |

## Diferenciais

| Feature | Descrição |
|---------|-----------|
| **1M+ contexto** | Maior janela de contexto do mercado |
| **Multimodal nativo** | Texto + imagem + vídeo + áudio na mesma chamada |
| **Preço imbatível** | Flash é 10x mais barato que GPT/Claude equivalente |
| **Grounding** | Pode conectar com Google Search em tempo real |
| **Context Caching** | Cache de contexto longo (desconto expressivo) |
| **Google ADK** | Framework de agentes nativo |
| **AI Studio** | Playground gratuito para experimentar |
| **Vertex AI** | Enterprise managed no GCP |

## Modelo de Cobrança

- **Pay-per-token** via API (AI Studio ou Vertex AI)
- **Free tier generoso**: 15 req/min no AI Studio, embeddings grátis
- **Vertex AI**: Enterprise com SLAs, VPC, compliance
- Sem mínimo mensal

## Quando Usar

✅ **Use Gemini quando:**
- **Alto volume** com budget limitado (Flash é imbatível)
- Precisa processar **documentos longos** (1M tokens)
- Tarefa é **multimodal** (analisar imagens, vídeos, áudio)
- Quer **embeddings gratuitos** (Gemini Embedding 2)
- Prototipação rápida (AI Studio é free)

❌ **Evite quando:**
- Coding complexo (Claude Sonnet é superior)
- Precisa de ecosystem de tools maduro (OpenAI é mais amplo)
- Soberania de dados fora do Google Cloud
- Latência ultra-baixa (Groq/Cerebras são mais rápidos)

## Conceitos Relacionados

- [[llms]] — Categoria
- [[embeddings]] — Gemini Embedding 2 (grátis)
- [[multimodal]] — Nativo desde a concepção
- [[ai-gateway]] — Acesso via Vertex ou direto
- [[rag]] — Contexto longo como alternativa a RAG

## Conexões

- [[openai-gpt]] — Competidor (ecosystem maior)
- [[anthropic-claude]] — Competidor (melhor coding)
- [[openrouter]] — Acesso via gateway
- [[langchain]] — Framework que integra
