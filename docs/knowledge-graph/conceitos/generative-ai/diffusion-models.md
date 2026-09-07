---
titulo: "Diffusion Models — Modelos de Difusao"
tags: [diffusion, stable-diffusion, dall-e, midjourney, generative-ai, imagem]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: generative-ai
status: explored
wikilinks:
  - generative-ai
  - geracao-imagem
  - tipos-modelos-generativos
  - deep-learning
  - computer-vision
---

# Diffusion Models

> Diffusion Models sao modelos generativos que aprendem a gerar dados (imagens, videos) adicionando e depois REMOVENDO ruido gradualmente. Sao a base da maioria dos geradores de imagem modernos.

## O Problema que Resolve

```
PROBLEMA: Como gerar imagens realistas?

GANs (obsoleto):
  - Treino instavel (mode collapse)
  - Dificil controlar

SOLUCAO: Diffusion Models
  - Treino estavel
  - Controle via prompt
  - Alta qualidade
```

## Como Funciona

### Fase 1: Treino (Forward Diffusion)

```
IMAGEM LIMPA (x0)
    |
    v  + ruido (eta)
    |
IMAGEM COM RUIDO (x1)
    |
    v  + mais ruido
    |
IMAGEM COM MAIS RUIDO (x2)
    |
    v  + mais ruido
    ...
    |
    v
RUIDO PURO (xT) ~ N(0,1)

PROCESSO:
x0 -> x1 -> x2 -> ... -> xT

Cada passo: x_t = sqrt(1-beta_t) * x_{t-1} + sqrt(beta_t) * noise
```

### Fase 2: Treino (Learned Reverse)

```
RUIDO PURO (xT)
    |
    v  rede neural aprende a REMOVER ruido
    |
MENOS RUIDO (xT-1)
    |
    v  remove mais ruido
    |
MENOS RUIDO AINDA (xT-2)
    |
    v
    ...
    |
    v
IMAGEM LIMPA (x0)

REDE NEURAL:
- Entrada: x_t (imagem ruidosa) + t (timestamp)
- Saida: ruido predito
- Loss: Diferenca entre ruido real e predito
```

### Fase 3: Geracao (Inference)

```
RUIDO ALEATORIO ~ N(0,1)
    |
    v  modelo remove ruido (1000 passos -> 20 passos)
    |
IMAGEM GERADA

PROCESSO:
1. Gerar ruido aleatorio
2. Iterativamente remover ruido
3. Resultado: imagem realista
```

## Componentes Principais

### 1. U-Net (Denosing Network)

```
ENTRADA: Imagem ruidosa (x_t) + timestep (t)
    |
    v
ENCODER:
  Conv1 -> 64 channels
  Conv2 -> 128 channels
  Conv3 -> 256 channels
  Conv4 -> 512 channels
    |
    v
BOTTLENECK: 512 channels
    |
    v
DECODER:
  UpConv1 -> 256 channels
  UpConv2 -> 128 channels
  UpConv3 -> 64 channels
    |
    v
SAIDA: Ruido predito
```

### 2. Variational Autoencoder (VAE)

```
PROBLEMA: Trabalhar em espaco de pixels e caro

SOLUCAO: Comprimir para espaco latente

ENCODER:
  Imagem (512x512x3) -> Latente (64x64x4)

DIFFUSION NO LATENTE:
  Latente ruidoso -> Latente limpo

DECODER:
  Latente (64x64x4) -> Imagem (512x512x3)

VANTAGEM: 64x mais rapido
```

### 3. Text Encoder (CLIP/T5)

```
PROBLEMA: Como controlar a geracao?

SOLUCAO: Prompt de texto

"Um gato sentado no sofa"
    |
    v
CLIP/T5 Encoder
    |
    v
Embedding textual [77 tokens x 768 dims]
    |
    v
Condiciona a geracao
```

### 4. Scheduler

```
CONTROLE: Como remover ruido

OPCOES:
- DDPM: 1000 passos (lento, qualidade)
- DDIM: 50 passos (medio)
- DPM-Solver: 20 passos (rapido)
- LCM: 4 passos (ultra rapido)
- SDXL Turbo: 1 passo (tempo real)
```

## Arquitetura Completa

```
TEXTO: "Um gato no sofa"
    |
    v
[TXT ENCODER] -> Embedding
    |
    v
[VAE ENCODER] -> Latente (64x64x4)
    |
    v
[DIFFUSION PROCESS]
  |
  +-- [U-Net] recebe: latente + timestep + embedding
  |
  +-- Prediz ruido
  |
  +-- Remove ruido (scheduler)
  |
  v (repete N vezes)
    |
    v
[VAE DECODER] -> Imagem (512x512x3)
```

## Modelos Populares

### Stable Diffusion

| Versao | Ano | Resolucao | Qualidade |
|--------|:---:|:---------:|:---------:|
| SD 1.5 | 2022 | 512x512 | Boa |
| SDXL | 2023 | 1024x1024 | Muito boa |
| SD3 | 2024 | 1024x1024 | Excelente |
| FLUX | 2024 | 1024x1024+ | Top |

### DALL-E

| Versao | Ano | Diferencial |
|--------|:---:|-------------|
| DALL-E 1 | 2021 | Primeiro da OpenAI |
| DALL-E 2 | 2022 | CLIP + Diffusion |
| DALL-E 3 | 2023 | Integrado ao ChatGPT |
| GPT-6 Imagen | 2026 | Nativo no GPT-6 |

### Midjourney

| Versao | Ano | Estilo |
|--------|:---:|--------|
| V5 | 2023 | Mais realista |
| V6 | 2023 | Melhor texto |
| V7 | 2024 | Mais detalhes |

### FLUX

| Tipo | Descricao |
|------|-----------|
| FLUX.1 [schnell] | Rapido (4 passos) |
| FLUX.1 [dev] | Desenvolvimento |
| FLUX.1 [pro] | Profissional |

## Diferenca: Diffusion vs GANs

| Aspecto | GANs | Diffusion |
|---------|------|-----------|
| **Treino** | Instavel | Estavel |
| **Controle** | Baixo | Alto (prompt) |
| **Diversidade** | Media | Alta |
| **Qualidade** | Boa | Excelente |
| **Velocidade** | Rapido | Lento (melhorando) |
| **Status** | Obsoleto | Padrao |

## Text-to-Image Pipeline

```
1. ENTRADA: Prompt de texto
   "Um gato sentado no sofa, estilo aquarela"

2. TEXT ENCODING:
   CLIP/T5 -> Embedding

3. LATENT NOISE:
   Z ~ N(0, 1) -> (64, 64, 4)

4. DENOISING (N passos):
   Para cada passo t = T, T-1, ..., 1:
     ruido_predito = UNet(z_t, t, embedding)
     z_{t-1} = scheduler(z_t, ruido_predito)

5. VAE DECODE:
   z_0 -> Imagem (512, 512, 3)

6. SAIDA: Imagem gerada
```

## Controle Avancado

### ControlNet

```
OBJETIVO: Controlar pose, bordas, profundidade

ENTRADAS:
- Prompt: "Um gato"
- Imagem de controle: Pose esqueletica

RESULTADO: Gato na pose especificada
```

### img2img

```
PROCESSO:
1. Pegar imagem existente
2. Adicionar ruido (50%)
3. Remover ruido com novo prompt
4. Resultado: Versao modificada
```

### Inpainting

```
PROCESSO:
1. Imagem com area mascarada
2. Modelo preenche area mascarada
3. Resultado: Imagem completa

APLICACAO:
- Remover objetos
- Corrigir defeitos
- Adicionar elementos
```

## Otimizacao de Velocidade

| Tecnica | Speedup | Qualidade |
|---------|:-------:|:---------:|
| DDIM | 20x | 95% |
| DPM-Solver | 50x | 92% |
| LCM | 250x | 88% |
| SDXL Turbo | 1000x | 85% |
| Consistency Models | 1000x | 80% |

## Aplicacoes

| Aplicacao | Ferramenta | Uso |
|-----------|------------|-----|
| Arte digital | Midjourney | Criacao |
| Design | Stable Diffusion | Prototipagem |
| Fotografia | DALL-E | Edicao |
| Arquitetura | ControlNet | Visualizacao |
| Games | FLUX | Assets |
| Moda | SD + LoRA | Virtual try-on |

## Conexoes

- [[generative-ai]] — Categoria
- [[geracao-imagem]] — Aplicacao
- [[tipos-modelos-generativos]] — Arquiteturas
- [[deep-learning]] — Fundamento
- [[computer-vision]] — Visao computacional

---

**Status:** Documento explorado — diffusion models completo
**Ultima atualizacao:** Setembro 2026
