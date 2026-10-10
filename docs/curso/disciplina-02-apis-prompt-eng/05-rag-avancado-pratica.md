---
titulo: "RAG Avançado na Prática"
disciplina: 2
modulo: 5
tags: [rag, langchain, embeddings, vector-db, chunking, observabilidade, langfuse]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# RAG Avançado na Prática

## O que é RAG

Retrieval-Augmented Generation: buscar informação relevante em uma base de conhecimento e injetá-la no prompt antes de gerar a resposta.

```
Pergunta → Busca (retrieval) → Contexto + Pergunta → LLM → Resposta fundamentada
```

## Arquitetura de um Pipeline RAG

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Ingestão │───▶│ Chunking │───▶│ Embedding│───▶│ VectorDB │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                       │
┌──────────┐    ┌──────────┐    ┌──────────┐          │
│ Resposta │◀───│   LLM    │◀───│ Retrieval│◀─────────┘
└──────────┘    └──────────┘    └──────────┘
```

## Chunking Strategies

| Estratégia | Quando usar | Tamanho típico |
|------------|-------------|----------------|
| Fixed size | Textos homogêneos | 500-1000 tokens |
| Sentence-based | Artigos, docs | 3-5 sentenças |
| Semantic | Conteúdo variado | Variável |
| Recursive | Documentos estruturados | 500-1500 tokens |
| Parent-child | Precisão + contexto | Chunk pequeno + doc pai |

### Implementação com LangChain

```typescript
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
  separators: ['\n## ', '\n### ', '\n\n', '\n', ' ']
});

const chunks = await splitter.splitDocuments(documents);
```

## Embeddings e Vector Store

```typescript
import { OpenAIEmbeddings } from '@langchain/openai';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';

const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small', // Custo-eficiente
  dimensions: 1536
});

const vectorStore = await PGVectorStore.initialize(embeddings, {
  postgresConnectionOptions: { connectionString: process.env.DATABASE_URL },
  tableName: 'documents',
  columns: { idColumnName: 'id', vectorColumnName: 'embedding', contentColumnName: 'content' }
});
```

## Retrieval Avançado

### Hybrid Search (Keyword + Semantic)

```typescript
async function hybridSearch(query: string, k: number = 5) {
  // Busca semântica
  const semanticResults = await vectorStore.similaritySearch(query, k);
  
  // Busca por keyword (BM25/full-text)
  const keywordResults = await db.query(
    `SELECT * FROM documents WHERE to_tsvector(content) @@ plainto_tsquery($1) LIMIT $2`,
    [query, k]
  );

  // Reciprocal Rank Fusion
  return fuseResults(semanticResults, keywordResults);
}
```

### Reranking

```typescript
import { CohereRerank } from '@langchain/cohere';

const reranker = new CohereRerank({ topN: 3 });
const reranked = await reranker.compressDocuments(retrievedDocs, query);
```

### Multi-Query Retrieval

Gerar variações da pergunta para aumentar recall.

```typescript
const queries = await llm.call({
  prompt: `Gere 3 variações da pergunta para busca:
           Original: "${userQuery}"
           Retorne JSON: ["variacao1", "variacao2", "variacao3"]`
});

const allResults = await Promise.all(
  queries.map(q => vectorStore.similaritySearch(q, 3))
);
const deduplicated = dedup(allResults.flat());
```

## Gerenciamento de Erros

```typescript
class RAGPipeline {
  async query(question: string): Promise<RAGResponse> {
    try {
      const docs = await this.retrieve(question);
      
      if (docs.length === 0) {
        return { answer: 'Não encontrei informações relevantes.', sources: [], confidence: 0 };
      }

      const answer = await this.generate(question, docs);
      return { answer, sources: docs.map(d => d.metadata.source), confidence: this.score(docs) };
    } catch (error) {
      if (error.code === 'EMBEDDING_FAILED') {
        // Fallback: keyword search only
        return this.fallbackKeywordSearch(question);
      }
      if (error.code === 'LLM_TIMEOUT') {
        return { answer: 'Serviço temporariamente indisponível.', sources: [], confidence: 0 };
      }
      throw error;
    }
  }

  private score(docs: Document[]): number {
    const avgSimilarity = docs.reduce((sum, d) => sum + d.metadata.score, 0) / docs.length;
    return Math.min(avgSimilarity, 1);
  }
}
```

## Observabilidade com LangFuse

```typescript
import { CallbackHandler } from 'langfuse-langchain';

const langfuseHandler = new CallbackHandler({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_URL
});

// Toda chain LangChain automaticamente traceia
const chain = RetrievalQAChain.fromLLM(llm, retriever);
const result = await chain.call({ query }, { callbacks: [langfuseHandler] });
```

### O que monitorar

| Métrica | Alerta |
|---------|--------|
| Retrieval relevance (score médio) | < 0.7 |
| Tokens por query | > 10K |
| Latência p95 | > 5s |
| % "não encontrei" | > 30% |
| Custo por query | > $0.05 |

## Conexões

- → [Unidade 3: Prompts](03-engenharia-prompts-avancada.md) — Grounding prompts
- → [Unidade 4: Custo](04-consistencia-custo-eficiencia.md) — Cache de embeddings
- → [Unidade 6: Backend](06-integracao-ia-backend.md) — RAG em produção
