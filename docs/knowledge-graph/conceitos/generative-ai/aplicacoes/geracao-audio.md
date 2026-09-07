---
titulo: "Geração de Áudio — TTS, STT, Música"
tags: [geracao-audio, tts, stt, whisper, elevenlabs, musicgen]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: generative-ai
status: explored
wikilinks:
  - generative-ai
  - llms
  - nlp
  - geracao-texto
---

# Geração de Áudio — TTS, STT, Música

> Geração de áudio inclui Text-to-Speech (texto→fala), Speech-to-Text (fala→texto), clone de voz, geração de música e efeitos sonoros.

## O que é

```
TTS: Texto → Voz sintética
STT: Voz → Texto transcrito
MÚSICA: Prompt → Música gerada
SFX: Prompt → Efeitos sonoros
```

## Modelos de Áudio (2026)

### TTS (Text-to-Speech)

| Modelo | Empresa | Preço | Diferencial |
|--------|---------|:-----:|-------------|
| **ElevenLabs v3** | ElevenLabs | $5/mês | Clone de voz, emotional |
| **OpenAI TTS** | OpenAI | $0.015/1K chars | Integrado GPT |
| **Azure TTS** | Microsoft | Variável | Enterprise, 400+ vozes |
| **Bark** | Suno | Grátis (local) | Open-source |
| **XTTS** | Coqui | Grátis (local) | Multi-idioma |

### STT (Speech-to-Text)

| Modelo | Empresa | Preço | Diferencial |
|--------|---------|:-----:|-------------|
| **Whisper V3** | OpenAI | $0.006/min | Multilíngua, robusto |
| **Deepgram Nova-2** | Deepgram | $0.0043/min | Velocidade real-time |
| **AssemblyAI** | AssemblyAI | $0.015/min | Enterprise features |
| **Gemini** | Google | Incluído | Multimodal nativo |

### Música

| Modelo | Empresa | Preço | Diferencial |
|--------|---------|:-----:|-------------|
| **MusicGen** | Meta | Grátis (local) | Open-source |
| **Suno v4** | Suno | $10/mês | Música com vocal |
| **Udio** | Udio | $10/mês | Alta qualidade |
| **Stable Audio** | Stability | Grátis (local) | Open-source |

## Aplicações

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Audiolivros** | Livro → narração | ElevenLabs, Play.ht |
| **Locução automática** | Roteiro → voz | ElevenLabs, WellSaid |
| **Clone de voz** | Sua voz sintética | ElevenLabs, Resemble |
| **Legendas automáticas** | Vídeo → legendas | Whisper, AssemblyAI |
| **Dictation** | Fala → documento | Whisper + LLM |
| **Dublagem** | Vídeo traduzido | ElevenLabs, Rask |
| **Podcasts** | Geração de episódios | NotebookLM, Google |
| **Música** | Prompt → música | Suno, Udio |
| **SFX** | Prompt → efeitos | ElevenLabs SFX |

## Pipeline de TTS

```
TEXTO: "Olá, como vai você?"
    │
    ▼
┌─────────────────┐
│  TOKENIZAÇÃO    │  Texto → fonemas
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ACOUSTIC MODEL │  Fonemas → espectrograma
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  VOCAL SYNTH    │  Espectrograma → áudio
└────────┬────────┘
         │
         ▼
SAÍDA: Áudio com voz natural
```

## Conexões

- [[generative-ai]] — Categoria
- [[llms]] — Para processamento de linguagem
- [[nlp]] — Processamento de fala
- [[geracao-texto]] — Entrada para TTS

---

**Status:** Documento explorado — geração de áudio completa
