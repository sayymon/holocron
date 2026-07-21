---
titulo: "LlamaIndex — Framework RAG-First"
tags: [llamaindex, rag, indexing, connectors, retrieval, documents]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-frameworks
status: explored
connections:
  - rag
  - embeddings
  - vector-databases
  - langchain
---
# LlamaIndex — Framework RAG-First

## O que é

LlamaIndex é um framework **focado em RAG** — indexar, estruturar e buscar dados para alimentar LLMs. Enquanto [[langchain]] tenta ser "tudo para todos", LlamaIndex é especialista em fazer dados conversarem com LLMs.

**120+ conectores de dados** (Notion, Slack, Google Drive, Confluence, DBs, APIs...).

## Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **Data Connectors** | 120+ fontes (Notion, Slack, GDrive, DBs, APIs) |
| **Index Types** | Vector, List, Tree, Knowledge Graph, Summary |
| **Advanced Retrieval** | Hybrid, recursive, auto-merge, small-to-big |
| **Query Engine** | RAG com reranking, routing, sub-queries |
| **Agents** | Agentes sobre dados (query planning) |
| **LlamaCloud** | Managed indexing (60% menos setup) |
| **Evaluation** | Faithfulness, relevance, correctness built-in |
| **Structured Output** | Extrair dados estruturados de docs |

## Preço

- **Framework**: Grátis (MIT license)
- **LlamaCloud**: Pricing sob consulta (managed indexing)
- **Custo real**: Embeddings + LLM calls + vector storage

## Quando Usar

✅ **Use LlamaIndex quando:**
- Foco principal é **RAG sobre documentos**
- Precisa de **muitos conectores de dados** (120+)
- Quer **retrieval avançado** out-of-box (hybrid, recursive)
- Quer **avaliação de RAG** integrada
- Dados de múltiplas fontes heterogêneas

❌ **Evite quando:**
- Precisa de orquestração de agentes complexa → [[langgraph]]
- Quer ecossistema mais amplo → [[langchain]]
- Latência mínima em produção → [[haystack]]
- Workflow simples (overkill)

## LlamaIndex vs LangChain

| Dimensão | LlamaIndex | LangChain |
|----------|-----------|-----------|
| Foco | RAG, dados, indexação | Orquestração geral |
| Connectors | 120+ | ~50 |
| Retrieval | Avançado (hybrid, recursive) | Básico + extensível |
| Agents | Data agents | Agents gerais |
| Ecosystem | Focado | Amplo |
| Recall out-of-box | ~91% | ~85% |

## Conceitos Relacionados

- [[rag]] — Categoria principal
- [[embeddings]] — Vetorização de documentos
- [[vector-databases]] — Storage
- [[langchain]] — Alternativa/complemento

## Conexões

- [[rag]] — Caso de uso principal
- [[langchain]] — Competidor/complemento
- [[haystack]] — Competidor (produção)
- [[vector-databases]] — Backend de storage
