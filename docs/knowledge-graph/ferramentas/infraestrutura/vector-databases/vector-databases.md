---
titulo: "Vector Databases — Armazenamento de Embeddings"
tags: [vector-db, embeddings, similarity-search, hnsw, rag]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: infrastructure
status: explored
connections:
  - embeddings
  - rag
  - pgvector
  - pinecone
  - qdrant
---
# Vector Databases — Armazenamento de Embeddings

## O que é

Vector Databases são bancos de dados especializados em armazenar e buscar **vetores de alta dimensão** (embeddings). A operação core é **similarity search** — dado um vetor de query, encontrar os K vetores mais próximos no espaço vetorial.

São a peça fundamental de qualquer sistema [[rag]], busca semântica, ou recommendation engine.

## Por que importa

Busca vetorial é O QUE permite que LLMs acessem conhecimento específico. Sem vector DB, não há RAG. Sem RAG, LLMs ficam limitados ao knowledge de treinamento (stale + hallucination).

## Algoritmos de Busca

| Algoritmo | Trade-off | Quando usar |
|-----------|-----------|-------------|
| **HNSW** | Alta precisão + boa velocidade | Default para < 10M vetores |
| **IVF** | Mais rápido em escala, menos preciso | > 10M vetores |
| **Flat (brute-force)** | Precisão perfeita, lento | < 100K vetores, benchmarks |
| **DiskANN** | Vetores em disco, memória baixa | Datasets enormes sem RAM |

## Comparação de Soluções

| Database | Tipo | Preço | Melhor Para | Latência P95 |
|----------|------|-------|-------------|:------------:|
| **[[pgvector]]** | Extensão PostgreSQL | Grátis | Já usa Postgres, ACID, < 1M vetores | ~80ms |
| **[[pinecone]]** | Managed serverless | Free: 2GB / $0.33/1M reads | Zero ops, produção rápida | ~52ms |
| **[[qdrant]]** | Self-hosted/Cloud | OSS / Cloud: $0.025/hr | Performance + controle | ~48ms |
| **Weaviate** | Self-hosted/Cloud | OSS / Cloud: sob consulta | Hybrid search nativo | ~60ms |
| **[[chroma]]** | Embedded | Grátis | Dev local, prototipação | ~30ms |
| **Milvus/Zilliz** | Distributed | OSS / Cloud: usage-based | Escala bilhões de vetores | ~55ms |
| **Turbopuffer** | Serverless | Pay-per-query | Custo muito baixo em escala | ~65ms |

## Critérios de Escolha

```
Já usa PostgreSQL?
  ├─ SIM → pgvector (zero infra nova)
  └─ NÃO
      ├─ Quer zero ops? → Pinecone
      ├─ Quer performance + controle? → Qdrant
      ├─ Escala bilhões? → Milvus
      └─ Só prototipar? → Chroma
```

## Features Importantes

| Feature | pgvector | Pinecone | Qdrant | Chroma |
|---------|:--------:|:--------:|:------:|:------:|
| ACID transactions | ✅ | ❌ | ❌ | ❌ |
| Hybrid search | ✅ (com pg_bm25) | ✅ | ✅ | ❌ |
| Metadata filtering | ✅ | ✅ | ✅ | ✅ |
| Multi-tenancy | ✅ | ✅ (namespaces) | ✅ (collections) | ❌ |
| GPU acceleration | ❌ | ✅ | ✅ | ❌ |
| Self-host | ✅ | ❌ | ✅ | ✅ |

## Custos em Escala

| Vetores | pgvector (RDS) | Pinecone | Qdrant Cloud |
|:-------:|:--------------:|:--------:|:------------:|
| 100K | ~$50/mês | Free tier | ~$25/mês |
| 1M | ~$100/mês | ~$70/mês | ~$50/mês |
| 10M | ~$300/mês | ~$300/mês | ~$150/mês |
| 100M | ~$1000/mês | ~$2000/mês | ~$500/mês |

## No Holocron

O Holocron usa **[[pgvector]]** porque:
- Já temos PostgreSQL para dados do aluno (ADR 001)
- Escala do curso < 1M vetores
- ACID para consistência
- Zero infra adicional

## Conceitos Relacionados

- [[embeddings]] — O que armazena
- [[rag]] — Principal caso de uso
- [[pgvector]] — Solução escolhida
- [[pinecone]] — Alternativa managed
- [[qdrant]] — Alternativa performance

## Conexões

- [[embeddings]] — Input
- [[rag]] — Consumidor
- [[langchain]] — Integração
- [[llamaindex]] — Integração
