---
titulo: "Generative AI — IA Generativa"
tags: [generative-ai, ia-generativa, diffusion, gans, llms, multimodal]
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
  - embeddings
  - rag
  - prompt-engineering
  - fine-tuning
  - computer-vision
  - generative-ai-atomicos
---

# Generative AI — IA Generativa

> ⚠️ **DOC LEGADO** — Este documento foi substituído por docs atômicos mais detalhados.
> Para navegação completa, comece por: [[visao-geral-generative-ai]]

## Estrutura Atômica (Novos Docs)

### Conceitos
- [[visao-geral-generative-ai]] — O que é, posição no ecossistema
- [[historia-generative-ai]] — Linha do tempo completa
- [[tipos-modelos-generativos]] — Transformer, Diffusion, GANs, VAEs, MoE

### Aplicações
- [[geracao-texto]] — LLMs completos com benchmarks
- [[geracao-codigo]] — Copilot, Kiro, Claude Code
- [[geracao-imagem]] — Diffusion, DALL-E, Midjourney
- [[geracao-audio]] — TTS, STT, música
- [[geracao-video]] — Sora, Runway, Kling
- [[multimodal]] — Modelos que processam tudo

### Benchmarks
- [[benchmarks-generative-ai]] — Métricas e leaderboard

### Providers (Atualizados)
- [[openai-gpt]] — GPT-6 Astra completo
- [[anthropic-claude]] — Claude Fable 5.1 completo
- [[google-gemini]] — Gemini 3.x completo

> Generative AI é a categoria de Inteligência Artificial que **cria conteúdo novo** — texto, imagem, código, áudio, vídeo — que não existia antes. Diferente de IA discriminativa (que classifica ou prevê), IA generativa **gera dados**.

## O Problema que Generative AI Resolve

### De Entender para Criar

```
IA DISCRIMINATIVA (tradicional):
  → Classifica: "Este email é spam?"
  → Prediz: "Qual o preço desta casa?"
  → Detecta: "Tem faces nesta imagem?"
  → Dados de entrada → Resposta

IA GENERATIVA:
  → Cria texto: "Escreva um artigo sobre IA"
  → Gera imagem: "Um gato astronauta em Marte"
  → Escreve código: "Faça uma API REST em Python"
  → Produz áudio: "Narre este texto com voz natural"
  → Nenhum dado existente → Conteúdo novo
```

### A Revolução

| Era | Foco | Exemplo |
|-----|------|---------|
| **IA Clássica** | Regras e lógica | Sistemas especialistas |
| **Machine Learning** | Classificação e predição | Spam detection |
| **Deep Learning** | Representações aprendidas | Reconhecimento facial |
| **IA Generativa** | **Criação de conteúdo** | ChatGPT, DALL-E, Copilot |

---

## A História de Generative AI

### Era 1: Os Precursores (1943-2013)

| Ano | Marco | Quem | Insight |
|:---:|-------|------|---------|
| **1943** | Neurônio Formal | McCulloch & Pitts | Primeiro modelo matemático de neurônio |
| **1957** | Perceptron | Frank Rosenblatt | Primeira rede que aprende |
| **1986** | Backpropagation | Rumelhart, Hinton | Torna viável treinar redes profundas |
| **1998** | LeNet-5 (CNN) | Yann LeCun | Primeira CNN funcional |
| **2006** | Deep Belief Networks | Geoffrey Hinton | Prova que deep learning funciona |
| **2012** | AlexNet | Alex Krizhevsky | Revolução: GPU + big data + DL |

**Conexão:** Precursores → [[deep-learning]] → base para tudo

### Era 2: GANs — A Primeira Grande Arquitetura Generativa (2014)

| Ano | Marco | Quem | Insight |
|:---:|-------|------|---------|
| **2014** | **GANs** (Generative Adversarial Networks) | **Ian Goodfellow** | Duelo: Gerador vs Discriminador |

**Como GANs funcionam:**
```
GERADOR (Generator):
  → Recebe ruído aleatório (noise)
  → Gera imagem/falsa

DISCRIMINADOR (Discriminator):
  → Recebe imagem real OU falsa
  → Tenta distinguir

DUELO:
  → Gerador tenta enganar o Discriminador
  → Discriminador tenta detectar a fraude
  → Ambos melhoram juntos

RESULTADO:
  → Gerador aprende a criar imagens realistas
```

**Aplicações de GANs:**
- Geração de faces humanas falsas (ThisPersonDoesNotExist)
- Super-resolução (melhorar qualidade de imagens)
- Tradução de estilo (Van Gogh → foto real)
- Deepfakes (risco ético!)

**Conexão:** GANs → [[diffusion-models]] → precursor da geração moderna

### Era 3: Transformers — O Ponto de Inflexão (2017)

| Ano | Marco | Quem | Insight |
|:---:|-------|------|---------|
| **2017** | **"Attention is All You Need"** | **Vaswani et al. (Google)** | Self-Attention paralelo substitui RNNs |
| **2018** | BERT | Google | Encoder — entender texto |
| **2018** | GPT-1 | OpenAI | Decoder — gerar texto |
| **2020** | GPT-3 | OpenAI | 175B params — few-shot learning |

**A revolução Transformer:**
```
ANTES (RNN/LSTM):
  Sequencial: x₁ → x₂ → x₃ → ... → xₙ
  O(n) mas LENTO (não paraleliza)

DEPOIS (Transformer):
  Todos os tokens SIMULTANEAMENTE
  O(n²) mas PARALELO (GPUs resolvem)

SELF-ATTENTION:
  Cada token olha para TODOS os outros
  → Captura contexto global instantaneamente
```

**Conexão:** Transformers → [[transformers]] → [[llms]] → [[generative-ai]]

### Era 4: A Era dos LLMs (2020-hoje)

| Ano | Marco | Quem | Insight |
|:---:|-------|------|---------|
| **2022** | **ChatGPT** | **OpenAI** | RLHF democratiza IA generativa |
| **2022** | Stable Diffusion, DALL-E 3 | Vários | Geração de imagens vai mainstream |
| **2023** | Claude, GPT-4, Llama | Diversos | Batalha de modelos fundacionais |
| **2024** | MCP, Agentes | Indústria | Protocolos e autonomia |
| **2025** | Reasoning Models (o3, R1) | OpenAI, DeepSeek | Raciocínio profundo |
| **2026** | AI-Native Everything | Indústria | IA como infraestrutura invisível |

**O estado atual:**
```
IA GENERATIVA EM 2026:
  → Modelos frontier: GPT-5.2, Claude Opus 4, Gemini 2.5 Pro
  → Janelas de contexto: 128K a 1M tokens
  → Multimodal por padrão (texto + imagem + áudio + vídeo)
  → MoE (Mixture of Experts) dominante
  → Modelos de raciocínio (reasoning models)
  → Inferência em dispositivo (Chrome Built-in AI)
```

---

## Os 3 Tipos de IA Generativa

### 1. Generativa por LLMs (Texto, Código)

```
INPUT: Prompt textual
OUTPUT: Texto ou código gerado

ARQUITETURA: Decoder Transformer
MODELOS: GPT, Claude, Gemini, Llama, DeepSeek

APLICAÇÕES:
  → Chat / assistentes virtuais
  → Geração de código (Copilot, Kiro)
  → Copywriting, roteiros
  → Tradução, resumo
  → Análise de documentos
```

**Conexão:** [[llms]] → [[nlp]] → [[prompt-engineering]]

### 2. Generativa por Diffusion Models (Imagem, Vídeo)

```
INPUT: Prompt textual (ou imagem)
OUTPUT: Imagem ou vídeo gerado

ARQUITETURA: Diffusion + Transformer
MODELOS: DALL-E 3, Stable Diffusion, Midjourney, Sora

PROCESSO:
  1. Adiciona ruído à imagem (forward diffusion)
  2. Rede neural aprende a REMOVER ruído (denoising)
  3. Gera imagem limpa a partir de ruído

APLICAÇÕES:
  → Geração de imagens
  → Edição de imagens
  → Geração de vídeo
  → Design gráfico
  → Arte digital
```

**Conexão:** [[diffusion-models]] → [[computer-vision]] → multimodal

### 3. Generativa por VAEs (Variational Autoencoders)

```
INPUT: Dados (imagem, texto, áudio)
OUTPUT: Variações dos dados originais

ARQUITETURA: Encoder-Decoder com espaço latente
MODELOS: VAE, VQ-VAE

PROCESSO:
  1. Encoder comprime dados em espaço latente (compacto)
  2. Amostra do espaço latente
  3. Decoder reconstrói dados

APLICAÇÕES:
  → Geração de faces
  → Interpolação entre imagens
  → Anomalia detection
  → Representações aprendidas
```

---

## GANs vs Diffusion vs LLMs — Comparativo

| Aspecto | GANs | Diffusion | LLMs |
|---------|------|-----------|------|
| **Saída** | Imagem | Imagem/Vídeo | Texto/Código |
| **Mecanismo** | Duelo Gerador vs Discriminador | Denoising progressivo | Next-token prediction |
| **Treino** | Instável (modos colapsam) | Estável | Estável |
| **Controle** | Baixo | Alto (prompt) | Alto (prompt) |
| **Qualidade** | Alta (mas instável) | Muito alta | Muito alta |
| **Status 2026** | Obsoleto para maioria | Padrão para imagem | Padrão para texto |

---

## Multimodal — A Convergência

```
2026: Modelos processam TUDO junto

GPT-4o:
  → Texto + Imagem + Áudio (input e output)
  → "Olhe esta foto e me conte o que vê"
  → "Narre este texto com voz natural"

Gemini 2.5 Pro:
  → Texto + Imagem + Vídeo + Áudio
  → Contexto de 1M tokens
  → "Analise este vídeo de 2 horas"

CLAREZA:
  → IA generativa NÃO é só texto
  → É qualquer formato de saída
  → Multimodal é o futuro (e o presente)
```

---

## Aplicações Reais de Generative AI

### 1. Geração de Texto

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Chat / Conversação** | LLM gera respostas | ChatGPT, Claude |
| **Copywriting** | Cria textos comerciais | Jasper, Copy.ai |
| **Roteiros** | Gera roteiros de vídeo | YouTubers, podcasts |
| **E-mails** | Redige emails profissionais | Superhuman, Spark |
| **Artigos** | Escreve conteúdo completo | Newsroom tools |
| **Tradução** | Traduz entre idiomas | DeepL, Google Translate |

### 2. Geração de Código

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Autocomplete** | Sugere próximo código | GitHub Copilot |
| **Geração completa** | Escreve função a partir de prompt | Kiro, Cursor |
| **Refactoring** | Melhora código existente | Copilot Chat |
| **Debug** | Encontra e corrige bugs | Claude, GPT-4 |
| **Documentação** | Gera docs e comentários | Copilot, Mintlify |
| **IaC** | Gera Terraform, K8s configs | Copilot + RAG |

### 3. Geração de Imagem

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Text-to-Image** | Prompt → imagem | DALL-E 3, Midjourney |
| **Edição** | Editar imagem com prompt | Photoshop AI, Canva |
| **Super-resolução** | Aumentar qualidade | Topaz, Real-ESRGAN |
| **Inpainting** | Preencher áreas | Stable Diffusion |
| **Design gráfico** | Criar logos, banners | Ideogram, Leonardo AI |
| **Arte digital** | Arte conceitual | Midjourney, DALL-E |

### 4. Geração de Áudio

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **TTS (Text-to-Speech)** | Texto → voz | ElevenLabs, OpenAI TTS |
| **STT (Speech-to-Text)** | Áudio → texto | Whisper, Deepgram |
| **Clone de voz** | Copiar voz de alguém | ElevenLabs, Resemble |
| **Música** | Gerar música | MusicGen, Suno |
| **Efeitos sonoros** | Gerar SFX | ElevenLabs SFX |
| **Dublagem** | Traduzir áudio mantendo voz | Rask, ElevenLabs |

### 5. Geração de Vídeo

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Text-to-Video** | Prompt → vídeo | Sora, Runway, Kling |
| **Edição com IA** | Editar com linguagem natural | Runway, CapCut |
| **Dublagem automática** | Vídeo traduzido com lip-sync | HeyGen, Rask |
| **Avatar falante** | Texto → avatar animado | HeyGen, Synthesia |
| **Animação** | Transformar foto em vídeo | Runway, Luma |

### 6. Aplicações Multimodais

| Aplicação | Como funciona | Ferramenta |
|-----------|---------------|------------|
| **Análise de documentos** | OCR +理解 + extração | GPT-4o, Claude Vision |
| **QA sobre imagens** | "O que tem nesta foto?" | GPT-4o, Gemini |
| **Tradução visual** | Traduzir texto em imagens | GPT-4o, Google Lens |
| **Assistentes visuais** | Descrever o mundo | Be My Eyes, Aira |
| **Conteúdo para redes** | Gerar posts visuais | Canva AI, Adobe Firefly |

---

## O Ecossistema de Ferramentas

### Providers de Modelos Generativos

| Provider | Modelos | Foco |
|----------|---------|------|
| **OpenAI** | GPT-5, DALL-E 3, Whisper, Sora | Texto, imagem, áudio, vídeo |
| **Anthropic** | Claude Opus 4, Sonnet 4 | Texto (seguro, menos alucinações) |
| **Google** | Gemini 2.5 Pro, Imagen 3 | Multimodal (1M context) |
| **Meta** | Llama 4, SAM 2 | Open-source |
| **Stability AI** | Stable Diffusion 3 | Imagem (open-source) |
| **Midjourney** | Midjourney v7 | Imagem (estética) |
| **ElevenLabs** | ElevenLabs v3 | Áudio (voz, SFX) |

### Frameworks

| Framework | Foco |
|-----------|------|
| **LangChain** | Orquestração geral |
| **LangGraph** | Agentes stateful |
| **LlamaIndex** | RAG especializado |
| **Diffusers (HuggingFace)** | Diffusion models |
| **Transformers (HuggingFace)** | Qualquer modelo |

### Plataformas de Deploy

| Plataforma | Tipo |
|------------|------|
| **OpenRouter** | Multi-provider router |
| **Ollama** | LLMs locais |
| **vLLM** | Serving de alto throughput |
| **Replicate** | Deploy de modelos |
| **Together AI** | Fine-tuning + serving |

---

## Custos de IA Generativa (Referência 2026)

| Modelo | Input (por MTok) | Output (por MTok) | Contexto |
|--------|:----------------:|:-----------------:|:--------:|
| GPT-5.2 | $2.50 | $10.00 | 128K |
| Claude Opus 4 | $15.00 | $75.00 | 200K |
| Gemini 2.5 Pro | $1.25 | $5.00 | 1M |
| DeepSeek-R1 | $0.55 | $2.19 | 128K |
| Llama 3.3 (local) | Grátis | Grátis | 128K |

**Regra de custo:** Dobra o contexto = quadruplica o custo (O(n²))

---

## A Cadeia de Dependência

```
MATEMÁTICA (álgebra, prob, cálculo)
       │
       ▼
  MACHINE LEARNING
       │
       ▼
  DEEP LEARNING
       │
       ▼
  TRANSFORMERS ←── GANs (precursor)
       │
       ├─→ LLMs ──→ IA GENERATIVA DE TEXTO
       │     │
       │     ├─→ Chat, Código, Tradução
       │     └─→ RAG, Agentes, MCP
       │
       ├─→ Embeddings ──→ Busca Semântica
       │
       └─→ Diffusion Models ──→ IA GENERATIVA DE IMAGEM
             │
             ├─→ DALL-E, Midjourney, Stable Diffusion
             └─→ Sora, Runway (vídeo)

MULTIMODAL = LLM + Diffusion + Speech unificados
```

---

## Generative AI no Holocron

| Componente | Como usa Generative AI |
|------------|------------------------|
| **RAG Pipeline** | LLM gera respostas baseadas em docs |
| **Tutor Agent** | LLM gera explicações socráticas |
| **Knowledge Graph** | Embeddings para busca semântica |
| **MCP Server** | Protocolo para LLMs usarem tools |
| **Prompt Engineering** | Interface com modelos generativos |

---

## Tendências 2026-2027

| Tendência | O que é | Impacto |
|-----------|---------|---------|
| **MoE (Mixture of Experts)** | Só fração dos parâmetros ativos por token | Custo menor, performance maior |
| **Contextos de 1M+ tokens** | Memória de longo prazo | Documentos inteiros no contexto |
| **Reasoning Models** | Raciocínio profundo passo a passo | Problemas complexas resolvidas |
| **On-device Inference** | IA rodando no browser/dispositivo | Zero custo de API, privacidade |
| **AI Agents** | IA que pensa e age autonomamente | Automação completa de tarefas |
| **Multimodal Nativo** | Texto+Imagem+Áudio+Vídeo juntos | Interação mais natural |

---

## Conexões

### Conceitos Relacionados
- [[ia]] — Domínio maior
- [[deep-learning]] — Fundamento
- [[transformers]] — Arquitetura base
- [[llms]] — Modelos de texto/código
- [[nlp]] — Processamento de linguagem
- [[diffusion-models]] — Geração de imagem
- [[computer-vision]] — Visão computacional
- [[embeddings]] — Representações vetoriais
- [[rag]] — Combina geração com busca
- [[prompt-engineering]] — Interface com modelos
- [[fine-tuning]] — Customização de modelos

### Modalidades
- **Texto:** LLMs (GPT, Claude, Gemini)
- **Imagem:** Diffusion (DALL-E, Midjourney, Stable Diffusion)
- **Áudio:** TTS/STT (Whisper, ElevenLabs)
- **Vídeo:** Sora, Runway, Kling
- **Código:** LLMs (Copilot, Kiro)

---

**Status:** Documento explorado — categoria principal de IA
**Próximo:** [[computer-vision]] (visão computacional) ou [[diffusion-models]] (geração de imagem)
