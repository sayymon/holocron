---
titulo: "Computer Vision — Visao Computacional"
tags: [computer-vision, vision, object-detection, image-classification, segmentation]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: fundamentos
status: explored
wikilinks:
  - ia
  - deep-learning
  - generative-ai
  - geracao-imagem
  - multimodal
  - nlp
---

# Computer Vision

> Computer Vision e o campo de IA que permite a maquinas ENXER e ENTENDER imagens e videos, como humanos fazem.

## O Problema que Resolve

```
HUMANO: Ve foto e diz "tem um gato sentado no sofa"

PROBLEMA: Como ensinar maquina a ver assim?

COMPUTER VISION:
  ENTRADA: Imagem (matriz de pixels)
  SAIDA: "Gato sentado no sofa"
```

## Tarefas Principais

### 1. Classificacao de Imagens

```
OBJETIVO: Qual e o conteudo da imagem?

ENTRADA: [foto de um gato]
SAIDA: "Gato" (classe)

MODELOS:
- ResNet
- VGG
- EfficientNet
- Vision Transformer (ViT)

APLICACAO:
- Diagnostico medico
- Classificacao de produtos
- Reconhecimento facial
```

### 2. Deteccao de Objetos

```
OBJETIVO: Onde estao os objetos?

ENTRADA: [foto de rua]
SAIDA:
  - Carro [x:100, y:200, w:300, h:150]
  - Pessoa [x:500, y:100, w:50, h:180]
  - Semaforo [x:400, y:50, w:30, h:80]

MODELOS:
- YOLO (v8, v9, v10, v11)
- SSD
- Faster R-CNN
- DETR

APLICACAO:
- Carros autonomos
- Seguranca
- Contagem de pessoas
```

### 3. Segmentacao

#### Semantica

```
OBJETIVO: Cada pixel pertence a qual classe?

ENTRADA: [foto de rua]
SAIDA: Mapa de pixels
  - Asfalto: pixels 1-50000
  - Ceu: pixels 50001-100000
  - Predio: pixels 100001-150000

MODELOS:
- U-Net
- DeepLab
- SegFormer
```

#### Instancia

```
OBJETIVO: Cada objeto individual

ENTRADA: [foto com 3 gatos]
SAIDA:
  - Gato 1: pixels 1-5000
  - Gato 2: pixels 5001-10000
  - Gato 3: pixels 10001-15000

MODELOS:
- Mask R-CNN
- PointRend
```

### 4. Estimacao de Pose

```
OBJETIVO: Onde estao as articulacoes?

ENTRADA: [foto de pessoa]
SAIDA:
  - Cabeca: (100, 50)
  - Ombro esquerdo: (80, 100)
  - Ombro direito: (120, 100)
  - Mao esquerda: (60, 150)
  - Mao direita: (140, 150)

MODELOS:
- OpenPose
- MediaPipe
- MoveNet

APLICACAO:
- Danca
- Exercicios
- Realidade aumentada
```

### 5. OCR (Reconhecimento de Texto)

```
OBJETIVO: Ler texto em imagens

ENTRADA: [foto de placa]
SAIDA: "ABC-1234"

MODELOS:
- Tesseract
- EasyOCR
- PaddleOCR

APLICACAO:
- Placas de carro
- Documentos
- Notas fiscais
```

### 6. Tracking (Rastreamento)

```
OBJETIVO: Rastrear objeto ao longo do video

ENTRADA: [video]
SAIDA:
  Frame 1: Pessoa A em (100, 200)
  Frame 2: Pessoa A em (110, 205)
  Frame 3: Pessoa A em (120, 210)

MODELOS:
- DeepSORT
- ByteTrack
- FairMOT
```

## Arquiteturas Populares

### CNN (Convolutional Neural Networks)

```
ENTRADA: Imagem (224x224x3)
    |
    v
CONV1: 32 filtros 3x3
    |
    v
POOL: 112x112x32
    |
    v
CONV2: 64 filtros 3x3
    |
    v
POOL: 56x56x64
    |
    v
...
    |
    v
FC: 1000 neuronios (classes)

APRENDIZAGEM:
- Filtros detectam bordas, texturas, formas
- Camadas profundas detectam objetos complexos
```

### Vision Transformer (ViT)

```
ENTRADA: Imagem (224x224x3)
    |
    v
PATCHES: Dividir em 16x16 blocos
    |
    v
EMBEDDINGS: Cada patch vira vetor
    |
    v
TRANSFORMER: Self-attention entre patches
    |
    v
CLASSIFICACAO: Qual classe?

VANTAGEM: Captura relacoes globais
```

### YOLO (You Only Look Once)

```
ENTRADA: Imagem (640x640x3)
    |
    v
REDE NEURAL: Detecta tudo de uma vez
    |
    v
SAIDA: [classe, x, y, w, h, confianca] para cada objeto

VANTAGEM: Tempo real (30+ FPS)
```

## Evolucao

```
2012: AlexNet (CNN)
  |
2014: VGG, GoogLeNet
  |
2015: ResNet (skip connections)
  |
2016: YOLO (deteccao real-time)
  |
2017: Mask R-CNN (segmentacao)
  |
2020: EfficientNet (otimizacao)
  |
2021: ViT (transformers para visao)
  |
2023: Segment Anything (SAM)
  |
2024-2026: Multimodal (GPT-4o, Gemini)
```

## Computer Vision + IA Generativa

| Tarefa | Tradicional | Generativa |
|--------|-------------|------------|
| Deteccao | YOLO | GPT-4o descreve |
| Segmentacao | SAM | DALL-E segmenta |
| Classificacao | ResNet | Gemini entende |
| Geracao | N/A | Stable Diffusion |

## Aplicacoes Reais

| Aplicacao | Tarefa | Modelo |
|-----------|--------|--------|
| Carro autonomo | Deteccao + Pose | YOLO + MediaPipe |
| Diagnostico medico | Classificacao | ResNet |
| Seguranca | Deteccao | YOLO |
| Realidade aumentada | Pose + Tracking | MediaPipe |
| Robos industriais | Deteccao | Mask R-CNN |
| Leitura de documentos | OCR | EasyOCR |

## Conexoes

- [[ia]] — Campo geral
- [[deep-learning]] — Redes neurais
- [[generative-ai]] — IA generativa inclui visao
- [[geracao-imagem]] — Geracao de imagens
- [[multimodal]] — Modelos que veem
- [[nlp]] — Combinacao com linguagem

---

**Status:** Documento explorado — computer vision completo
**Ultima atualizacao:** Setembro 2026
