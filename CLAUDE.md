# CLAUDE.md — Contexto para Claude Code

## Projeto

Holocron AI Engineer — Tutor inteligente personalizado para o curso de Engenharia de IA Aplicada. Cristaliza conteúdo do curso em documentos atômicos (Markdown/Obsidian) e usa RAG + Agentes para ensinar de forma socrática.

## Arquitetura

- **Knowledge Base** (`docs/`) — Markdown atômico, Obsidian-compatible, versionado via Git
- **Dados do aluno** → PostgreSQL + pgvector (NÃO em Markdown). Progresso, scores, interações, memória do agente
- **RAG Pipeline** (`src/rag/`) — indexação, embeddings, busca semântica
- **MCP Server** (`src/mcp/`) — expõe conhecimento via Model Context Protocol
- **Agentes** (`src/agents/`) — Tutor (socrático), Quiz, Reviewer
- **API** (`src/api/`) — Fastify REST
- **DB** (`src/db/`) — migrations SQL, pgvector

## Stack

- TypeScript (ESM, strict mode)
- Node.js 20+
- PostgreSQL + pgvector
- LangChain/LangGraph
- MCP SDK (`@modelcontextprotocol/sdk`)
- Fastify
- TensorFlow.js
- Vitest

## Convenções

- Arquivos: `kebab-case.ts`
- Imports absolutos: `@/mcp`, `@/agents`, `@/rag`, `@/api`, `@/db`
- Commits em português: `tipo: descrição` (feat, fix, docs, refactor, test, chore)
- Cada commit é um capítulo — descritivo e autocontido
- ADRs para decisões técnicas em `docs/adrs/`
- Novos conceitos viram docs atômicos com Front Matter YAML

## Regras

- Dados do aluno NUNCA em Markdown — sempre Postgres
- Todo documento da KB tem Front Matter (titulo, modulo, tags, fonte, confiabilidade)
- Wikilinks `[[conceito]]` para navegação entre docs
- Testes com Vitest (`*.test.ts`)
- Secrets via env vars (nunca hardcoded)

## Contexto Completo

Para mais detalhes, leia:
- `steerings/project-context.md` — visão geral e arquitetura
- `steerings/coding-standards.md` — padrões de código
- `steerings/knowledge-base.md` — como manter a KB
- `steerings/architecture.md` — decisões e patterns
