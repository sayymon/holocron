---
titulo: "Multimodal — Modelos que Processam Tudo"
tags: [multimodal, gpt-4o, gemini, vision, audio, texto-imagem]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: generative-ai
status: explored
wikilinks:
  - generative-ai
  - llms
  - geracao-texto
  - geracao-imagem
  - geracao-audio
  - nlp
  - computer-vision
---

# Multimodal — Modelos que Processam Tudo

> Modelos multimodais processam e geram múltiplos formatos (texto, imagem, áudio, vídeo) em uma arquitetura unificada. É a convergência de todas as modalidades de IA Generativa.

## O que é

```
UNIMODAL: Texto → Texto (GPT-3)
         Imagem → Texto (CLIP)
         Texto → Imagem (DALL-E)

MULTIMODAL: Texto + Imagem + Áudio → Texto (GPT-4o)
            Texto + Imagem → Imagem (GPT-4o)
            Texto + Áudio → Áudio (GPT-4o)
```

## Modelos Multimodais (2026)

### Comparativo

| Modelo | Empresa | Input | Output | Contexto |
|--------|---------|-------|--------|:--------:|
| **GPT-6 Astra** | OpenAI | Texto, Imagem | Texto | 1.05M |
| **GPT-4o** | OpenAI | Texto, Imagem, Áudio | Texto, Áudio | 128K |
| **Claude Opus 5** | Anthropic | Texto, Imagem | Texto | 200K |
| **Gemini 3.8 Flash** | Google | Texto, Imagem, Vídeo, Áudio | Texto | 1M |
| **Gemini 2.5 Pro** | Google | Texto, Imagem, Vídeo, Áudio | Texto, Imagem | 1M |
| **Llama 4 Maverick** | Meta | Texto, Imagem | Texto | 1M |

### Capacidades por Modalidade

| Capacidade | GPT-4o | Claude | Gemini | Llama 4 |
|------------|:------:|:------:|:------:|:-------:|
| Texto → Texto | ✅ | ✅ | ✅ | ✅ |
| Imagem → Texto | ✅ | ✅ | ✅ | ✅ |
| Texto → Imagem | ✅ | ❌ | ✅ | ❌ |
| Áudio → Texto | ✅ | ❌ | ✅ | ❌ |
| Texto → Áudio | ✅ | ❌ | ✅ | ❌ |
| Vídeo → Texto | ❌ | ❌ | ✅ | ❌ |

## Aplicações

| Aplicação | Modalidade | Ferramenta |
|-----------|------------|------------|
| **Análise de documentos** | Imagem → Texto | GPT-4o, Claude |
| **QA sobre fotos** | Imagem → Texto | GPT-4o, Gemini |
| **Tradução visual** | Imagem → Texto | GPT-4o, Google Lens |
| **Descrição de cena** | Imagem/Vídeo → Texto | Gemini |
| **Narração de imagens** | Imagem → Áudio | GPT-4o |
| **Chat com voz** | Áudio ↔ Texto | GPT-4o, Gemini Live |
| **Assistentes visuais** | Imagem → Texto | Be My Eyes |
| **OCR inteligente** | Imagem → Texto estruturado | GPT-4o |

## Arquitetura Multimodal

```
┌─────────────────────────────────────────────┐
│              MODELO MULTIMODAL               │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  TEXT    │  │  IMAGE   │  │  AUDIO   │  │
│  │ ENCODER  │  │ ENCODER  │  │ ENCODER  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │              │              │         │
│       └──────────────┼──────────────┘         │
│                      │                        │
│              ┌───────┴───────┐                │
│              │  FUSION      │                │
│              │  LAYER       │                │
│              └───────┬───────┘                │
│                      │                        │
│              ┌───────┴───────┐                │
│              │  DECODER     │                │
│              └───────┬───────┘                │
│                      │                        │
│              ┌───────┴───────┐                │
│              │  OUTPUT HEAD │                │
│              │  (texto/img/ │                │
│              │   áudio)     │                │
│              └───────────────┘                │
└─────────────────────────────────────────────┘
```

## Conexões

- [[generative-ai]] — Categoria
- [[llms]] — Base para texto
- [[geracao-texto]] — Modalidade texto
- [[geracao-imagem]] — Modalidade imagem
- [[geracao-audio]] — Modalidade áudio
- [[nlp]] — Processamento de linguagem
- [[computer-vision]] — Visão computacional

---

**Status:** Documento explorado — modelos multimodais completos
