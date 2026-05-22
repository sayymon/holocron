---
titulo: "Fundamentos RAG e Agentes"
modulo: 11
unidade: 2
tags: [capstone, rag, agentes, langchain, langgraph, embeddings]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Fundamentos RAG e Agentes

## RAG no Capstone

### Pipeline Mínimo Viável

```
Documentos → Chunking → Embeddings → Vector Store → Retrieval → LLM → Resposta
```

### Decisões-Chave

| Decisão | Opções | Critério |
|---------|--------|----------|
| Chunking | Fixed-size, semantic, recursive | Tipo de conteúdo |
| Embedding model | OpenAI, Cohere, open-source | Custo vs qualidade |
| Vector store | pgvector, Pinecone, Chroma | Escala e infra |
| Retrieval | Similarity, MMR, hybrid | Diversidade vs relevância |
| Reranking | Cohere, cross-encoder | Precisão do top-k |

### Otimizações Progressivas

1. **Baseline** — chunking fixo + similarity search
2. **v2** — semantic chunking + hybrid search (BM25 + vector)
3. **v3** — reranking + query expansion + metadata filtering

## Agentes no Capstone

### Quando usar agente vs RAG puro

| Cenário | Abordagem |
|---------|-----------|
| Pergunta factual sobre documentos | RAG puro |
| Tarefa multi-step com ferramentas | Agente |
| Análise + ação (ex: "analise e crie ticket") | Agente com RAG |

### Arquitetura de Agente ([[agentes-ia]])

```
┌─────────────────────────────────┐
│         LangGraph Agent         │
├─────────────────────────────────┤
│  State: { messages, context }   │
│  Tools: [rag_search, db_query,  │
│          api_call, ...]         │
│  Memory: conversation + summary │
└─────────────────────────────────┘
```

### Padrões Recomendados

- **ReAct** — raciocínio + ação iterativa
- **Plan-and-Execute** — planejar antes de agir
- **Multi-agent** — especialistas colaborando

## Avaliação de Qualidade

- **Retrieval** — precision@k, recall@k, MRR
- **Generation** — faithfulness, relevance, coherence
- **End-to-end** — user satisfaction, task completion rate
- Frameworks: RAGAS, DeepEval

## Conexões

- [[11-01-ideacao-arquitetura]] — RAG/agentes são o core do capstone
- [[11-03-orquestracao-backend-mcp]] — backend expõe RAG via API
- [[rag]] — conceito transversal de RAG
- [[agentes-ia]] — conceito transversal de agentes
- [[prompt-engineering]] — prompts que guiam o agente
