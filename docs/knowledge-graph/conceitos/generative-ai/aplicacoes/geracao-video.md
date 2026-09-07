---
titulo: "Geração de Vídeo"
tags: [geracao-video, sora, runway, kling, video-generation]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: generative-ai
status: explored
wikilinks:
  - generative-ai
  - diffusion-models
  - geracao-imagem
  - geracao-audio
  - llms
---

# Geração de Vídeo

> Geração de vídeo é a fronteira mais recente de IA Generativa. Modelos criam vídeos a partir de texto (text-to-video), editam vídeos existentes, ou geram dublagens com lip-sync.

## O que é

```
INPUT: Prompt textual ou imagem
OUTPUT: Vídeo gerado (2-60 segundos)

ARQUITETURA: Diffusion + Transformer + Temporal
MODELOS: Sora, Runway, Kling, Pika
```

## Modelos de Geração de Vídeo (2026)

### Comparativo

| Modelo | Empresa | Preço | Resolução | Duração | Diferencial |
|--------|---------|:-----:|:---------:|:-------:|-------------|
| **Sora** | OpenAI | $20/mês | 1080p | 20s | Qualidade, física |
| **Runway Gen-3** | Runway | $12/mês | 1080p | 10s | Editor + geração |
| **Kling 2.0** | Kuaishou | $8/mês | 1080p | 10s | Custo-benefício |
| **Pika 2.0** | Pika | $10/mês | 1080p | 5s | Efeitos especiais |
| **Veo 2** | Google | Variável | 4K | 60s | Integrado Gemini |
| **Luma Dream** | Luma | $30/mês | 1080p | 5s | 3D consistency |

### Arquiteturas

| Arquitetura | Modelo | Mecanismo |
|-------------|--------|-----------|
| **Latent Video Diffusion** | Sora, Runway | Diffusion em frames |
| **Causal Video VAE** | Veo | Compressão temporal |
| **DiT (Diffusion Transformer)** | Sora | Transformer + Diffusion |

## Aplicações

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Text-to-Video** | Prompt → vídeo | Sora, Runway, Kling |
| **Image-to-Video** | Foto → vídeo animado | Runway, Pika |
| **Edição com IA** | Editar com linguagem | Runway, CapCut |
| **Dublagem automática** | Traduzir com lip-sync | HeyGen, Rask |
| **Avatar falante** | Texto → avatar animado | HeyGen, Synthesia |
| **Animação** | Transformar foto em vídeo | Runway, Luma |
| **Vídeo-cursor** | Screencast explicativo | Sora, Runway |
| **B-Roll** | Gerar cenas auxiliares | Sora, Runway |

## Pipeline de Geração de Vídeo

```
PROMPT: "Um gato andando na praia ao pôr do sol"
    │
    ▼
┌─────────────────────────┐
│  TEXT ENCODING          │  Prompt → embeddings
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  LATENT GENERATION      │  Gera frames latentes
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  TEMPORAL ATTENTION     │  Consistência entre frames
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  VAE DECODER            │  Latente → pixels
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  UPSCALER               │  Aumenta resolução
└────────────┬────────────┘
             │
             ▼
SAÍDA: Vídeo MP4
```

## Desafios Atuais

| Desafio | Status | Exemplo |
|---------|--------|---------|
| **Física** | Parcial | Água, roupas, queda |
| **Consistência** | Bom | Personagem coerente |
| **Texto no vídeo** | Regular | Letras distorcidas |
| **Mãos** | Melhorando | Ainda falha às vezes |
| **Duração** | Limitada | 5-60 segundos |
| **Controle** | Médio | Prompt ≠ resultado exato |

## Conexões

- [[generative-ai]] — Categoria
- [[diffusion-models]] — Arquitetura base
- [[geracao-imagem]] — Frames individuais
- [[geracao-audio]] — Trilha sonora

---

**Status:** Documento explorado — geração de vídeo completa
