---
titulo: "Embeddings — Representação Vetorial de Significado"
tags: [embeddings, vetores, semantica, similarity, modelos-embedding]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: foundations
status: explored
connections:
  - transformers
  - rag
  - vector-databases
  - llms
---
# Embeddings — Representação Vetorial de Significado

## O que é

Embeddings são **vetores numéricos** que capturam o significado semântico de texto (ou imagem, áudio, código). Textos com significado similar ficam "perto" no espaço vetorial. É o que permite busca semântica — encontrar "documentos relevantes" mesmo sem keyword match.

**Intuitivamente:** Embedding transforma "o gato dormiu no sofá" em [0.23, -0.87, 0.45, ...] de forma que frases sobre animais domésticos tenham vetores próximos.

## Por que importa

Embeddings são a **cola** entre texto humano e computação matemática:
- [[rag]] depende de embeddings para buscar docs relevantes
- Similarity search, clustering, classificação, recommendation
- Qualidade do embedding = qualidade do RAG

## Modelos de Embedding (Junho 2026)

### Proprietários

| Modelo | Dimensões | MTEB | Preço/MTok | Destaque |
|--------|:---------:|:----:|:----------:|----------|
| **OpenAI text-embedding-3-large** | 3072 (ajustável) | 0.64 | $0.13 | Melhor closed-source geral |
| **OpenAI text-embedding-3-small** | 1536 (ajustável) | 0.62 | $0.02 | **Custo-benefício excelente** |
| **Cohere Embed v4** | 1024 | 0.63 | $0.10 | Rápido (15ms), multilíngue |
| **Voyage 3** | 1024 | 0.63 | $0.06 | Code-aware, retrieval otimizado |
| **Gemini Embedding 2** | 3072 (ajustável) | 0.64 | Free tier | **Grátis**, all-rounder |

### Open-Source (Self-hosted)

| Modelo | Dimensões | MTEB | GPU? | Destaque |
|--------|:---------:|:----:|:----:|----------|
| **BGE-M3** (BAAI) | 1024 | 0.61 | Sim | Multilíngue líder, Apache 2.0 |
| **NV-Embed-v2** (NVIDIA) | 4096 | 0.65 | Sim (heavy) | MTEB #1 overall |
| **Jina Embeddings v4** | 1024 | 0.62 | Sim | Multimodal, flexível |
| **Nomic Embed** | 768 | 0.59 | Sim | Leve, local-friendly |
| **E5-Mistral-7B** | 4096 | 0.63 | Sim (7B params) | Alta qualidade, pesado |

## Critérios de Escolha

| Prioridade | Escolha |
|------------|---------|
| Simplicidade + qualidade | OpenAI text-embedding-3-large |
| Budget mínimo | OpenAI small ($0.02/MTok) ou Gemini (grátis) |
| Self-hosted/GDPR | BGE-M3 (Apache 2.0) |
| Código | Voyage 3 (code-aware) |
| Máxima qualidade (com GPU) | NV-Embed-v2 |
| Multimodal (texto + imagem) | Jina v4 ou Voyage Multimodal |

## Conceitos Técnicos

| Conceito | Explicação |
|----------|-----------|
| **Dimensões** | Tamanho do vetor. 1536 é suficiente para maioria. 3072 para max quality |
| **Cosine Similarity** | Métrica de distância padrão (0 = ortogonal, 1 = idêntico) |
| **Matryoshka** | Reduzir dimensões sem retreinar (OpenAI suporta) |
| **Late Interaction** | ColBERT-style, compara token a token (mais preciso, mais lento) |
| **Sparse vs Dense** | Dense = vetores contínuos. Sparse = BM25/TF-IDF |
| **Hybrid Search** | Dense + Sparse combinados (quase sempre melhor) |

## Dicas de Otimização

- **Batch API** reduz custo 50% (OpenAI) a 33% (Voyage)
- **Dimensões menores** (768 vs 3072) economizam storage e latência
- **Mesmo modelo** na indexação E na busca (obrigatório)
- **Normalizar vetores** antes de armazenar (cosine → dot product, mais rápido)
- Atualizar embeddings quando trocar modelo

## No Holocron

Usa OpenAI `text-embedding-3-small` via OpenRouter:
- Dimensão: 1536
- Custo: $0.02/MTok (muito barato)
- Adequado para o volume de docs do curso

## Conceitos Relacionados

- [[transformers]] — Arquitetura que gera embeddings (Encoder)
- [[rag]] — Principal consumidor
- [[vector-databases]] — Onde armazena
- [[tokenizacao]] — Pré-processamento antes de embedding

## Conexões

- [[rag]] — Pipeline principal
- [[vector-databases]] — Storage
- [[openai-gpt]] — Provider (embedding API)
- [[google-gemini]] — Provider (grátis)
- [[langchain]] — Framework que integra
