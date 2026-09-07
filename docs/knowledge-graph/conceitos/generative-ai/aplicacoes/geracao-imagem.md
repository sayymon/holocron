---
titulo: "Geração de Imagem — Diffusion Models"
tags: [geracao-imagem, diffusion, dall-e, midjourney, stable-diffusion]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: generative-ai
status: explored
wikilinks:
  - generative-ai
  - diffusion-models
  - computer-vision
  - llms
---

# Geração de Imagem — Diffusion Models

> Geração de imagem é a capacidade de criar imagens a partir de texto (text-to-image), editar imagens existentes, ou gerar variações. Dominada por Diffusion Models desde 2022.

## O que é

```
INPUT: Prompt textual ("Um gato astronauta em Marte, fotorrealista")
OUTPUT: Imagem gerada

ARQUITETURA: Diffusion + Transformer
MODELOS: DALL-E 3, Stable Diffusion 3, Midjourney, Imagen
```

## Como Funciona (Diffusion)

```
PROCESSO DE TREINO:
  1. Pega imagem real
  2. Adiciona ruído progressivamente (forward diffusion)
  3. Rede neural aprende a REMOVER ruído (denoising)
  4. Aprede a mapear ruído → imagem

PROCESSO DE GERAÇÃO:
  1. Começa com ruído aleatório
  2. Rede neural remove ruído passo a passo
  3. Cada passo: ruído → menos ruído → imagem limpa
  4. Resultado: imagem que nunca existiu
```

## Modelos de Geração de Imagem (2026)

### Comparativo

| Modelo | Empresa | Preço | Resolução | Diferencial |
|--------|---------|:-----:|:---------:|-------------|
| **DALL-E 3** | OpenAI | $0.04/img | 1024×1024 | Integração ChatGPT |
| **Stable Diffusion 3** | Stability | Grátis (local) | 1024×1024 | Open-source |
| **Midjourney v7** | Midjourney | $10/mês | 2048×2048 | Estética superior |
| **Imagen 3** | Google | $0.03/img | 1024×1024 | Multimodal Gemini |
| **Firefly 3** | Adobe | Incluído | 2048×2048 | Commercially safe |
| **FLUX** | Black Forest | Grátis (local) | 1024×1024 | Open-source, rápido |

### Arquiteturas

| Arquitetura | Modelo | Mecanismo |
|-------------|--------|-----------|
| **Latent Diffusion** | SD 1.5, SDXL | Diffusion no espaço latente |
| **Diffusion Transformer** | SD3, FLUX | Transformer + Diffusion |
| **Consistency Models** | LCM | Geração em 1-4 passos |
| **Flow Matching** | FLUX | ODE-based, mais rápido |

## Aplicações

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Text-to-Image** | Prompt → imagem | DALL-E, Midjourney |
| **Image-to-Image** | Imagem + prompt → editada | Stable Diffusion |
| **Inpainting** | Preencher áreas específicas | Photoshop AI |
| **Outpainting** | Expandir além da borda | DALL-E |
| **Super-resolução** | Aumentar qualidade | Real-ESRGAN |
| **Style Transfer** | Aplicar estilo artístico | Prisma, neural style |
| **Design Gráfico** | Logos, banners, social media | Canva AI, Ideogram |

## Prompt Engineering para Imagem

```
ESTRUTURA:
  [Sujeito] + [Estilo] + [Detalhes] + [Iluminação] + [Câmera]

EXEMPLO:
  "Um astronauta cavalgando um cavalo em Marte,
   fotorrealista, iluminação cinematográfica,
   lente 35mm, 8K"

PALAVRAS-CHAVE:
  → fotorrealista, 8K, detailed
  → cinematic lighting, golden hour
  → wide angle, macro, portrait
  → oil painting, watercolor, anime
```

## Conexões

- [[generative-ai]] — Categoria
- [[diffusion-models]] — Arquitetura base
- [[computer-vision]] — Domínio relacionado
- [[llms]] — Para prompts de imagem

---

**Status:** Documento explorado — geração de imagem completa
