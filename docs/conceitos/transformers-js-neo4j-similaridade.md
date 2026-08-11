---
titulo: "Transformers.js + Neo4j — Embeddings Locais e Busca por Similaridade"
tags: [transformers-js, neo4j, embeddings, similarity-search, topk, vector-search, rag, javascript, onnx]
dificuldade: intermediario
fonte: "Aula com Erick Wendel — Curso Engenharia de IA Aplicada"
atualizado_em: 2026-08-10
confiabilidade: alta
---

# Transformers.js + Neo4j — Embeddings Locais e Busca por Similaridade

> Rodar modelos de embedding direto no JavaScript (sem API externa) e buscar por significado no Neo4j com topK.

## Transformers.js

### O que é

[Transformers.js](https://huggingface.co/docs/transformers.js) é uma biblioteca da HuggingFace que permite **rodar modelos Transformer diretamente em JavaScript** — no Node.js ou no browser — sem precisar de Python ou APIs externas.

Usa modelos convertidos para ONNX Runtime, que roda otimizado em CPU/GPU local.

### Por que importa

| Benefício | Explicação |
|-----------|-----------|
| **Zero custo de API** | Embeddings rodando local, sem pagar por token |
| **Privacidade** | Dados nunca saem da máquina |
| **Offline** | Funciona sem internet após download do modelo |
| **Baixa latência** | Sem roundtrip de rede |
| **JavaScript nativo** | Mesmo ecossistema do backend/frontend |

### Instalação

```bash
npm install @huggingface/transformers
```

### Gerando Embeddings

```typescript
import { pipeline } from '@huggingface/transformers';

// Carrega modelo de embeddings (download na primeira vez)
const embedder = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2'  // 384 dimensões, leve e eficiente
);

// Gera embedding de um texto
const result = await embedder('Como criar um curso online?', {
  pooling: 'mean',
  normalize: true
});

const embedding = Array.from(result.data);
// → [0.023, -0.045, 0.078, ...] (384 dimensões)
```

### Modelos Populares para Embeddings

| Modelo | Dimensões | Tamanho | Uso |
|--------|-----------|---------|-----|
| `Xenova/all-MiniLM-L6-v2` | 384 | ~23MB | Uso geral, leve |
| `Xenova/all-mpnet-base-v2` | 768 | ~110MB | Maior qualidade |
| `Xenova/bge-small-en-v1.5` | 384 | ~33MB | Otimizado para retrieval |
| `Xenova/multilingual-e5-small` | 384 | ~118MB | Multilíngue (PT-BR) |

### Além de Embeddings

Transformers.js suporta múltiplas tarefas:

```typescript
// Classificação de sentimento
const classifier = await pipeline('sentiment-analysis');
const result = await classifier('Adorei esse produto!');
// → { label: 'POSITIVE', score: 0.9998 }

// Sumarização
const summarizer = await pipeline('summarization');
const summary = await summarizer(longText, { max_length: 100 });

// Question Answering
const qa = await pipeline('question-answering');
const answer = await qa({
  question: 'O que é RAG?',
  context: 'RAG é Retrieval-Augmented Generation...'
});
```

## Neo4j como Vector Store

### O que é Neo4j

Neo4j é um **banco de dados de grafos** — armazena dados como nós e relacionamentos. Mas desde a versão 5.11+, também suporta **busca vetorial** nativa com índices de similaridade.

### Busca por Similaridade vs Busca Exata

A diferença fundamental:

```
BUSCA TRADICIONAL (match exato)
─────────────────────────────────
"SELECT * FROM docs WHERE titulo = 'RAG'"
→ Só encontra se o título for EXATAMENTE "RAG"

BUSCA POR SIMILARIDADE (topK)
─────────────────────────────────
"Encontre os K documentos mais SIMILARES a este vetor"
→ Encontra por SIGNIFICADO, não por texto exato
→ "Como funciona RAG?" encontra docs sobre "Retrieval-Augmented Generation"
```

### Por que topK é poderoso

| Aspecto | Match exato | Similaridade (topK) |
|---------|-------------|---------------------|
| Busca por | Texto literal | Significado/semântica |
| Tolerância a erro | Nenhuma | Alta (sinônimos, paráfrases) |
| Ranking | Sim/Não | Score de 0 a 1 (distância) |
| Resultado | Binário | Top K mais relevantes |
| Uso em IA | Limitado | Fundamental (RAG, recomendação) |

### Criando Índice Vetorial no Neo4j

```cypher
-- Criar índice de similaridade vetorial
CREATE VECTOR INDEX documento_embedding IF NOT EXISTS
FOR (d:Documento)
ON (d.embedding)
OPTIONS {
  indexConfig: {
    `vector.dimensions`: 384,
    `vector.similarity_function`: 'cosine'
  }
}
```

### Inserindo Documentos com Embeddings

```typescript
import neo4j from 'neo4j-driver';
import { pipeline } from '@huggingface/transformers';

const driver = neo4j.driver('bolt://localhost:7687', 
  neo4j.auth.basic('neo4j', 'password')
);

const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

// Gerar embedding e salvar no Neo4j
async function indexDocument(titulo: string, conteudo: string) {
  const result = await embedder(conteudo, { pooling: 'mean', normalize: true });
  const embedding = Array.from(result.data);

  const session = driver.session();
  await session.run(
    `CREATE (d:Documento {
      titulo: $titulo,
      conteudo: $conteudo,
      embedding: $embedding
    })`,
    { titulo, conteudo, embedding }
  );
  await session.close();
}
```

### Busca por Similaridade (topK)

```typescript
async function searchSimilar(query: string, k: number = 5) {
  // 1. Gerar embedding da query
  const result = await embedder(query, { pooling: 'mean', normalize: true });
  const queryEmbedding = Array.from(result.data);

  // 2. Buscar os K mais similares no Neo4j
  const session = driver.session();
  const response = await session.run(
    `CALL db.index.vector.queryNodes(
      'documento_embedding',  // nome do índice
      $k,                     // topK resultados
      $embedding              // vetor da query
    )
    YIELD node, score
    RETURN node.titulo AS titulo, 
           node.conteudo AS conteudo, 
           score
    ORDER BY score DESC`,
    { k, embedding: queryEmbedding }
  );

  return response.records.map(record => ({
    titulo: record.get('titulo'),
    conteudo: record.get('conteudo'),
    score: record.get('score')  // 0 a 1 (cosine similarity)
  }));
}

// Uso
const docs = await searchSimilar('como monetizar conhecimento online', 3);
// Encontra docs sobre infoprodutos, cursos, creators — por SIGNIFICADO
```

## Pipeline Completo: RAG com Transformers.js + Neo4j

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Documentos   │────▶│Transformers.js│────▶│   Neo4j      │
│ (markdown,   │     │ (embedding   │     │ (armazena    │
│  PDF, etc)   │     │  local)      │     │  nó + vetor) │
└──────────────┘     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Pergunta do  │────▶│Transformers.js│────▶│ Neo4j topK   │
│ usuário      │     │ (embedding)  │     │ (similaridade)│
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │ LLM (gera    │
                                          │ resposta com │
                                          │ contexto)    │
                                          └──────────────┘
```

### Vantagem do Neo4j sobre Vector DBs puros

O Neo4j combina **grafo + vetores**, permitindo:

```cypher
-- Busca vetorial + filtro por relacionamento
CALL db.index.vector.queryNodes('documento_embedding', 10, $embedding)
YIELD node, score
WHERE (node)-[:PERTENCE_A]->(:Modulo {nome: 'RAG'})
RETURN node.titulo, score
```

Isso é poderoso porque:
- Busca semântica (topK por significado)
- **Filtrada por contexto de grafo** (relacionamentos entre entidades)
- Combina o melhor dos dois mundos: vector search + graph traversal

## Quando Usar Cada Combinação

| Cenário | Stack recomendada |
|---------|------------------|
| RAG simples, baixo custo | Transformers.js + pgvector |
| RAG com relacionamentos | Transformers.js + Neo4j |
| RAG em produção (escala) | API de embeddings + Pinecone/Qdrant |
| Knowledge Graph + RAG | Neo4j (grafo + vetores) |
| Browser/Edge | Transformers.js (WebGPU) |
| Hotmart (produção) | AI Gateway + Neptune/DocumentDB |

## Conexões

- → [[rag-memoria-parametrica-contextual]] — Fundamentos de RAG
- → [[rag-embeddings-busca]] — Embeddings e busca semântica (Módulo 1)
- → [[05-rag-avancado-pratica]] — RAG avançado com LangChain (Módulo 2)
- → [[transfer-learning-fine-tuning]] — Como os modelos de embedding são treinados
- → [[decision-framework-ai-tools]] — Neo4j/Neptune no decision tree
