---
inclusion: always
---

# Contexto do Projeto — Holocron AI Engineer

## O que é

Tutor inteligente personalizado para o curso de Engenharia de IA Aplicada. Cristaliza conteúdo em documentos atômicos (Markdown/Obsidian) e usa RAG + Agentes para ensinar de forma socrática.

## Arquitetura

- **Knowledge Base** (`docs/`) — Markdown atômico, Obsidian-compatible
- **Dados do aluno** → PostgreSQL + pgvector (NÃO em Markdown)
- **RAG Pipeline** (`src/rag/`) — indexação, embeddings, busca semântica
- **MCP Server** (`src/mcp/`) — expõe conhecimento via MCP
- **Agentes** (`src/agents/`) — Tutor, Quiz, Reviewer
- **API** (`src/api/`) — Fastify REST
- **DB** (`src/db/`) — migrations SQL, pgvector

## Stack

- TypeScript (ESM, strict mode), Node.js 20+
- PostgreSQL + pgvector
- LangChain/LangGraph
- MCP SDK (`@modelcontextprotocol/sdk`)
- Fastify, TensorFlow.js, Vitest

## Regras

- Dados do aluno NUNCA em Markdown — sempre Postgres
- Todo documento da KB tem Front Matter (titulo, modulo, tags, fonte, confiabilidade)
- Wikilinks `[[conceito]]` para navegação entre docs
- ADRs para decisões técnicas em `docs/adrs/`
- Cada commit é um capítulo — descritivo e autocontido
