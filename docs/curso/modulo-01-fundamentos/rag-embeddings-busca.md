---
titulo: "RAG, Embeddings e Busca Semântica"
modulo: 1
unidade: 9
tags:
  - rag
  - embeddings
  - vector-database
  - busca-semantica
  - pgvector
dificuldade: intermediario
fonte: "Aula 1.9 - RAG, embeddings e busca semântica"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# RAG, Embeddings e Busca Semântica

> Retrieval-Augmented Generation — como dar conhecimento atualizado a um LLM.

## O que é RAG

RAG (Retrieval-Augmented Generation) é um padrão que combina:
1. **Retrieval** — busca documentos relevantes em uma base de conhecimento
2. **Augmented** — injeta esses documentos no contexto do LLM
3. **Generation** — LLM gera resposta baseada no contexto enriquecido

## Por que é importante

- LLMs têm conhecimento limitado ao treinamento (cutoff date)
- RAG permite respostas baseadas em dados atualizados e específicos
- Mais barato que fine-tuning para domínios específicos
- Rastreável — sabe-se de onde veio a informação

## Embeddings

Vetores numéricos que representam o "significado" de um texto:
- Textos similares → vetores próximos
- Busca por similaridade (cosine similarity, dot product)
- Dimensões típicas: 768, 1024, 1536

## Vector Databases

Bancos especializados em armazenar e buscar vetores:
- **pgvector** — extensão do PostgreSQL (nossa escolha)
- Pinecone, Weaviate, Qdrant — alternativas especializadas

## Similarity Search

Busca por "significado", não por texto exato:
- Query: "como funciona attention?" 
- Encontra: documento sobre "mecanismo de self-attention em transformers"
- Mesmo sem match exato de palavras

## Aplicação no Holocron

Este é o CORE do projeto:
1. Documentos atômicos → chunks → embeddings → pgvector
2. Pergunta do aluno → embedding → busca semântica → contexto
3. Contexto + pergunta → LLM → resposta fundamentada

## Conexões

- [[llms-transformers]] — embeddings vêm dos transformers
- [[modulo-02-apis-prompt-eng]] — RAG avançado
- [[modulo-08-arquitetura]] — patterns de RAG

## Fontes

- Aula 1.9 do curso
- Projeto prático: "Criando o primeiro RAG com JavaScript e Postgres"
