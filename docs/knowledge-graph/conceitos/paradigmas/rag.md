---
titulo: "RAG — Retrieval-Augmented Generation"
tags: [rag, retrieval, embeddings, vector-db, chunking, knowledge]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: patterns
status: explored
connections:
  - llms
  - embeddings
  - vector-databases
  - langchain
  - llamaindex
  - chunking
---
# RAG — Retrieval-Augmented Generation

## O que é

RAG é um padrão arquitetural que combina busca de informação (Retrieval) com geração de texto (Generation). Em vez de confiar apenas no conhecimento do LLM (que pode estar desatualizado ou alucinar), você busca documentos relevantes e os injeta no contexto do modelo.

**Pipeline básico:**
```
Query → Embedding → Busca Vetorial → Top-K docs → Prompt + Docs → LLM → Resposta
```

## Por que importa

RAG resolve 3 limitações fundamentais dos LLMs:
1. **Conhecimento desatualizado** — Docs atuais no índice
2. **Hallucination** — Resposta baseada em fatos concretos
3. **Domínio específico** — Acesso a dados privados/internos

Na Hotmart: SARA usa RAG para buscar artigos de suporte. Holocron usa RAG para buscar conteúdo do curso.

## Componentes do RAG

| Componente | Função | Ferramentas |
|------------|--------|-------------|
| **Document Loader** | Ingerir docs (PDF, HTML, MD, etc.) | [[langchain]], [[llamaindex]], Unstructured |
| **Chunking** | Dividir docs em pedaços | Recursive, Semantic, por parágrafos |
| **Embedding Model** | Converter chunks em vetores | [[embeddings]] (OpenAI, Cohere, BGE) |
| **Vector Store** | Armazenar e buscar vetores | [[vector-databases]] (pgvector, Pinecone) |
| **Retriever** | Buscar docs relevantes | Similarity, MMR, Hybrid, Reranking |
| **Generator (LLM)** | Gerar resposta com contexto | [[llms]] (GPT, Claude, Gemini) |
| **Evaluator** | Medir qualidade | RAGAS, DeepEval, Arize |

## Variantes de RAG

| Variante | Descrição | Quando usar |
|----------|-----------|-------------|
| **Naive RAG** | Embed → busca → gera | MVP, prototipação |
| **Advanced RAG** | + reranking, hybrid search, query expansion | Produção |
| **Modular RAG** | Routing, sub-queries, agents decidem busca | Complexo |
| **Graph RAG** | Estrutura relacional entre entities | Muitas relações entre docs |
| **Agentic RAG** | Agente decide QUANDO e COMO buscar | Workflows autônomos |

## Métricas de Qualidade

| Métrica | O que mede | Ideal |
|---------|-----------|:-----:|
| **Recall@K** | % docs relevantes recuperados | > 90% |
| **Precision@K** | % docs recuperados que são relevantes | > 80% |
| **Faithfulness** | Resposta fiel ao contexto (não alucina) | > 95% |
| **Relevance** | Resposta relevante à query | > 85% |
| **Answer Correctness** | Resposta factualmente correta | > 90% |

## Ferramentas por Etapa

### Frameworks RAG
- [[langchain]] — Ecossistema amplo, 100+ integrações
- [[llamaindex]] — RAG-first, 120+ conectores, melhor recall out-of-box
- [[haystack]] — Produção, latência baixa (340ms)

### Vector Databases
- [[pgvector]] — Já usa Postgres? Sem infra nova
- [[pinecone]] — Managed, zero ops
- [[qdrant]] — Performance + self-hosted
- [[chroma]] — Prototipação, in-memory

### Embedding Models
- [[embeddings]] — Detalhamento completo nesse nó

## Custos Típicos

| Escala | Volume | Custo Estimado/mês |
|--------|:------:|:------------------:|
| Hobby | 10K queries | $5-15 |
| Startup | 100K queries | $50-200 |
| Enterprise | 1M+ queries | $500-5000 |

*Inclui: embeddings + vector DB + LLM calls*

## Anti-padrões

- ❌ Chunks muito grandes (perda de precisão)
- ❌ Chunks muito pequenos (perda de contexto)
- ❌ Não usar reranking (top-K bruto tem ruído)
- ❌ Embedding model diferente na indexação vs busca
- ❌ Não avaliar qualidade (voar às cegas)
- ❌ Ignorar metadata filtering (mais lento e menos preciso)

## Conexões com o Mundo Real

- **Holocron**: Busca semântica no conteúdo do curso
- **SARA (Hotmart)**: RAG sobre base de suporte (27.5% resolução)
- **Chatbots de produto**: Documentação → RAG → resposta ao usuário
- **Code search**: Embeddings de código → busca por funcionalidade

## Meus Insights

- RAG > fine-tuning para 90% dos casos. Fine-tuning = formato/estilo. RAG = conhecimento
- Chunk overlap de 10-20% evita perda de contexto em fronteiras
- Hybrid search (BM25 + vetorial) quase sempre melhor que só vetorial
- Reranking (Cohere, BGE-Reranker) custa centavos e melhora muito a precisão

## Fontes

- [RAG Survey Paper](https://arxiv.org/abs/2312.10997) — confiabilidade: alta
- [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/) — confiabilidade: alta
- [LlamaIndex RAG Docs](https://docs.llamaindex.ai/en/stable/) — confiabilidade: alta

## Conexões

- Pai: [[ia]]
- [[llms]] — O "G" de RAG
- [[embeddings]] — O "R" de RAG
- [[vector-databases]] — Onde armazena
- [[langchain]] — Framework
- [[llamaindex]] — Framework RAG-first
- [[chunking]] — Estratégia de divisão
- [[fine-tuning]] — Alternativa/complemento
