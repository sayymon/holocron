---
titulo: "Tipos de Modelos Generativos"
tags: [tipos-modelos, transformers, diffusion, gans, vae, arquiteturas]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: generative-ai
status: explored
wikilinks:
  - generative-ai
  - deep-learning
  - transformers
  - llms
  - diffusion-models
  - nlp
  - computer-vision
---

# Tipos de Modelos Generativos

> Modelos generativos são arquiteturas de deep learning projetadas para criar dados novos. Cada tipo tem mecanismos, vantagens e casos de uso específicos.

## Taxonomia

```
MODELOS GENERATIVOS
  │
  ├─→ TRANSFORMER-BASED
  │     ├─→ Decoder-Only (GPT, Claude, Gemini)
  │     ├─→ Encoder-Only (BERT — embeddings)
  │     └─→ Encoder-Decoder (T5 — tradução)
  │
  ├─→ DIFFUSION
  │     ├─→ Latent Diffusion (Stable Diffusion)
  │     ├─→ Diffusion Transformer (SD3, FLUX)
  │     └─→ Consistency Models (LCM)
  │
  ├─→ GANs (Generative Adversarial Networks)
  │     ├─→ StyleGAN (faces)
  │     ├─→ CycleGAN (tradução de estilo)
  │     └─→ Pix2Pix (pares de imagens)
  │
  ├─→ VAEs (Variational Autoencoders)
  │     ├─→ VAE padrão
  │     └─→ VQ-VAE (discreto)
  │
  └─→ HÍBRIDOS
        ├─→ Transformer + Diffusion (Sora)
        └─→ MoE + Diffusion (Gemini)
```

## 1. Transformer-Based (O Dominante)

### Decoder-Only (Geração)

```
┌─────────────────────────────────────────┐
│         DECODER TRANSFORMER              │
│                                          │
│  INPUT: "O futuro da IA é"              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Self-Attention (causal mask)     │   │
│  │ Cada token olha para ANTERIORES  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  OUTPUT: "brilhante" (próximo token)    │
│                                          │
│  EXEMPLOS: GPT, Claude, Gemini, Llama   │
│  USO: Chat, código, geração             │
└─────────────────────────────────────────┘
```

**Como funciona:**
1. Recebe tokens anteriores
2. Self-attention causal (só olha para trás)
3. Prediz próximo token
4. Repete até EOS

### Encoder-Only (Entendimento)

```
┌─────────────────────────────────────────┐
│         ENCODER TRANSFORMER              │
│                                          │
│  INPUT: "O futuro da IA é brilhante"    │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Self-Attention (bidirecional)    │   │
│  │ Cada token olha para TODOS       │   │
│  └──────────────────────────────────┘   │
│                                          │
│  OUTPUT: Embeddings por token           │
│          [0.2, 0.8, 0.1, ...]          │
│                                          │
│  EXEMPLOS: BERT, RoBERTa, BGE           │
│  USO: Embeddings, classificação         │
└─────────────────────────────────────────┘
```

### Encoder-Decoder (Tradução/Resumo)

```
┌─────────────────────────────────────────┐
│      ENCODER-DECODER TRANSFORMER        │
│                                          │
│  ENCODER: "O futuro da IA é" → vetores  │
│                                          │
│  DECODER: vetores → "brilliant"          │
│           (atende ao encoder)            │
│                                          │
│  EXEMPLOS: T5, BART, mBART              │
│  USO: Tradução, resumo, Q&A              │
└─────────────────────────────────────────┘
```

### Comparativo

| Tipo | Attention | Saída | Exemplo | Uso |
|------|-----------|-------|---------|-----|
| **Decoder** | Causal | Tokens | GPT | Geração |
| **Encoder** | Bidirecional | Vetores | BERT | Embeddings |
| **Enc-Dec** | Ambos | Tokens | T5 | Tradução |

## 2. Diffusion Models

```
┌─────────────────────────────────────────┐
│         DIFFUSION MODEL                  │
│                                          │
│  TREINO:                                 │
│    Imagem → Adiciona ruído → Ruído      │
│    Rede aprende a REMOVER ruído          │
│                                          │
│  GERAÇÃO:                                │
│    Ruído → Remove ruído → Imagem        │
│    Passo a passo até ficar limpo         │
│                                          │
│  EXEMPLOS: Stable Diffusion, DALL-E      │
│  USO: Imagem, vídeo                      │
└─────────────────────────────────────────┘
```

### Variantes

| Variante | Mecanismo | Modelo |
|----------|-----------|--------|
| **Latent Diffusion** | Diffusion no espaço latente | SD 1.5, SDXL |
| **Diffusion Transformer** | Transformer + Diffusion | SD3, FLUX |
| **Consistency Models** | Geração em 1-4 passos | LCM |
| **Flow Matching** | ODE-based | FLUX |

### Vantagens vs GANs

| Aspecto | GANs | Diffusion |
|---------|------|-----------|
| **Estabilidade** | Instável (mode collapse) | Estável |
| **Controle** | Baixo | Alto (prompt) |
| **Diversidade** | Média | Alta |
| **Status** | Obsoleto | Padrão |

## 3. GANs (Generative Adversarial Networks)

```
┌─────────────────────────────────────────┐
│              GAN                         │
│                                          │
│  ┌──────────┐      ┌──────────────┐    │
│  │ GERADOR  │ ───→ │ DISCRIMINADOR│    │
│  │ (ruído)  │      │ (real/falso) │    │
│  └──────────┘      └──────────────┘    │
│       ↑                   │             │
│       └───────────────────┘             │
│            DUELO                         │
│                                          │
│  GERADOR: Tenta enganar                 │
│  DISCRIMINADOR: Tenta detectar          │
│  AMBOS: Melhoram juntos                 │
│                                          │
│  EXEMPLOS: StyleGAN, CycleGAN           │
│  USO: Faces, arte (obsoleto)            │
└─────────────────────────────────────────┘
```

### Por que GANs são Obsoletas

| Problema | Descrição |
|----------|-----------|
| **Mode Collapse** | Gerador produz poucos tipos de saída |
| **Instabilidade** | Treino é difícil de convergir |
| **Controle** | Difícil guiar a geração |
| **Qualidade** | Diffusion superou em 2022 |

## 4. VAEs (Variational Autoencoders)

```
┌─────────────────────────────────────────┐
│              VAE                         │
│                                          │
│  ENCODER: Dados → Espaço Latente (μ, σ) │
│                                          │
│  AMOSTRA: z ~ N(μ, σ²)                  │
│                                          │
│  DECODER: z → Dados reconstruídos       │
│                                          │
│  LOSS: Reconstrução + KL Divergence     │
│                                          │
│  EXEMPLOS: VQ-VAE, Stable Diffusion     │
│  USO: Representações, geração           │
└─────────────────────────────────────────┘
```

## 5. Mixture of Experts (MoE)

```
┌─────────────────────────────────────────┐
│         MOE TRANSFORMER                  │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Router: Seleciona experts        │   │
│  │                                  │   │
│  │ Expert 1: Especialista em código │   │
│  │ Expert 2: Especialista em texto  │   │
│  │ Expert 3: Especialista em math   │   │
│  │ ... (8-16 experts)               │   │
│  └──────────────────────────────────┘   │
│                                          │
│  POR TOKEN: Só 2-4 experts são ativos   │
│  TOTAL: 400B parâmetros                │
│  ATIVOS: 50B parâmetros por token       │
│                                          │
│  VANTAGEM: Mais parâmetros, mesmo custo │
│                                          │
│  EXEMPLOS: Llama 4, DeepSeek V4, Qwen 3 │
│  USO: Modelos grandes em 2026           │
└─────────────────────────────────────────┘
```

## Comparativo Geral

| Tipo | Saída | Treino | Controle | Status |
|------|-------|--------|----------|--------|
| **Decoder Transformer** | Texto/Código | Estável | Alto | ⭐ Dominante |
| **Encoder Transformer** | Vetores | Estável | Médio | ⭐ Embeddings |
| **Diffusion** | Imagem/Vídeo | Estável | Alto | ⭐ Imagem |
| **GAN** | Imagem | Instável | Baixo | ❌ Obsoleto |
| **VAE** | Dados | Estável | Médio | ⚠️ Nicho |
| **MoE** | Texto/Código | Estável | Alto | ⭐ Modelos grandes |

## Conexões

- [[generative-ai]] — Categoria
- [[deep-learning]] — Fundamento
- [[transformers]] — Arquitetura dominante
- [[llms]] — Modelos de linguagem
- [[diffusion-models]] — Geração de imagem
- [[nlp]] — Processamento de linguagem
- [[computer-vision]] — Visão computacional

---

**Status:** Documento explorado — tipos de modelos generativos completos
