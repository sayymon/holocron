---
titulo: "Generative AI — Visão Geral"
tags: [generative-ai, ia-generativa, visao-geral]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: fundamentos
status: explored
wikilinks:
  - ia
  - deep-learning
  - transformers
  - llms
  - nlp
---

# Generative AI — Visão Geral

> Generative AI é a categoria de IA que **cria conteúdo novo** — texto, imagem, código, áudio, vídeo. Diferente de IA discriminativa (que classifica), IA generativa **gera dados**.

## Definição

```
IA DISCRIMINATIVA: Dados → Resposta (classificação, predição)
IA GENERATIVA: Prompt → Conteúdo Novo (texto, imagem, código)
```

## Posição no Ecossistema

```
INTELIGÊNCIA ARTIFICIAL
  └─→ MACHINE LEARNING
       └─→ DEEP LEARNING
            └─→ TRANSFORMERS
                 └─→ GENERATIVE AI ← Você está aqui
                       ├─→ Texto/Código (LLMs)
                       ├─→ Imagem (Diffusion)
                       ├─→ Áudio (TTS/STT)
                       └─→ Vídeo (Sora, Runway)
```

## Arquiteturas

| Arquitetura | Saída | Exemplo |
|-------------|-------|---------|
| **Decoder Transformer** | Texto/Código | GPT, Claude, Gemini |
| **Diffusion Model** | Imagem/Vídeo | DALL-E, Midjourney |
| **VAE** | Imagem/Dados | VQ-VAE |
| **GAN** | Imagem (obsoleto) | StyleGAN |
| **Encoder Transformer** | Embeddings | BERT, embeddings |

## Para Profundar

- [[historia-generative-ai]] — Linha do tempo completa
- [[tipos-modelos-generativos]] — Detalhe de cada arquitetura
- [[geracao-texto]] — LLMs e geração textual
- [[geracao-codigo]] — Copilot, Kiro, agentes de código
- [[geracao-imagem]] — Diffusion, DALL-E, Midjourney
- [[geracao-audio]] — TTS, STT, música
- [[geracao-video]] — Sora, Runway, Kling
- [[multimodal]] — Modelos que processam tudo junto
- [[benchmarks-generative-ai]] — Métricas de avaliação

---

**Status:** Visão geral — explore os links acima para aprofundar
