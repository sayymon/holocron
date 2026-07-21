---
titulo: "pgvector — Busca Vetorial no PostgreSQL"
tags: [pgvector, postgres, vector-db, extensao, hnsw, rag]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-infrastructure
status: explored
connections:
  - vector-databases
  - rag
  - embeddings
---
# pgvector — Busca Vetorial no PostgreSQL

## O que é

pgvector é uma **extensão do PostgreSQL** que adiciona tipo de dados `vector` e operadores de busca por similaridade. Permite fazer RAG sem adicionar infra nova — seu Postgres vira um vector database.

## Por que Escolher pgvector

- ✅ **Zero infra nova** — já tem Postgres? Só adicionar extensão
- ✅ **ACID** — transações, consistência, rollback
- ✅ **SQL nativo** — queries com WHERE, JOIN, GROUP BY + similarity
- ✅ **Metadata filtering** — combinar busca vetorial com filtros relacionais
- ✅ **Backup/restore** — mesma infra que dados tradicionais
- ✅ **Grátis** — open-source (extensão)

## Limitações

- ❌ Performance degrada >5M vetores (vs Qdrant/Pinecone)
- ❌ Não tem GPU acceleration nativa
- ❌ HNSW index consome muita RAM
- ❌ Não é distribuído nativamente

## Setup

```sql
-- Habilitar extensão
CREATE EXTENSION vector;

-- Criar tabela com coluna vetorial
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536),  -- OpenAI text-embedding-3-small
  metadata JSONB
);

-- Criar índice HNSW (busca rápida)
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Busca por similaridade
SELECT content, 1 - (embedding <=> query_embedding) AS similarity
FROM documents
ORDER BY embedding <=> query_embedding
LIMIT 5;
```

## Performance

| Vetores | Latência (sem índice) | Latência (HNSW) | RAM p/ índice |
|:-------:|:---------------------:|:---------------:|:-------------:|
| 100K | ~200ms | ~5ms | ~500MB |
| 1M | ~2s | ~20ms | ~5GB |
| 5M | ~10s | ~80ms | ~25GB |
| 10M+ | Impraticável | ~150ms | 50GB+ |

## No Holocron

Escolhido na ADR 001 por:
- Dados do aluno já em PostgreSQL
- Escala do curso é < 1M vetores
- Simplicidade operacional (1 banco, 1 backup)
- ACID para consistência de dados do aluno + embeddings

## Conceitos Relacionados

- [[vector-databases]] — Categoria
- [[embeddings]] — O que armazena
- [[rag]] — Pipeline que alimenta

## Conexões

- [[vector-databases]] — Categoria
- [[rag]] — Consumidor
- [[embeddings]] — Input
- [[langchain]] — Integração (PGVector store)
