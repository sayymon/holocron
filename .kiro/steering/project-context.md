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
- **MCP Server** (`src/mcp/`) — expõe conhecimento via MCP (stdio transport)
- **Agentes** (`src/agents/`) — Tutor, Quiz, Reviewer
- **API** (`src/api/`) — Fastify REST
- **DB** (`src/db/`) — migrations SQL, pgvector

## MCP Server — Tools Disponíveis

| Tool | Tipo | Descrição |
|------|------|-----------|
| `list_modules` | Síncrona | Lista os 12 módulos do curso |
| `get_module` | Síncrona | Retorna README de um módulo |
| `get_document` | Síncrona | Retorna conteúdo de um doc da KB |
| `search_content` | **Async** | Busca semântica (retorna task_id) |
| `ask_tutor` | **Async** | Pergunta ao tutor socrático (retorna task_id) |
| `get_task_result` | Polling | Obtém resultado de task async |

### Padrão Async (ADR 003)

Tools que dependem de API externa (embeddings, LLM) usam padrão fire-and-forget:
1. Tool retorna `task_id` imediatamente
2. Execução acontece em background
3. `get_task_result(task_id)` faz polling do resultado

## Stack

- TypeScript (ESM, strict mode), Node.js 20+
- PostgreSQL + pgvector
- LangChain/LangGraph
- MCP SDK (`@modelcontextprotocol/sdk`)
- Fastify, Vitest
- OpenRouter (embeddings + LLM)

## Regras

- Dados do aluno NUNCA em Markdown — sempre Postgres
- Todo documento da KB tem Front Matter (titulo, modulo, tags, fonte, confiabilidade)
- Wikilinks `[[conceito]]` para navegação entre docs
- ADRs para decisões técnicas em `docs/adrs/`
- Cada commit é um capítulo — descritivo e autocontido
- Tools MCP de longa duração DEVEM usar padrão async (task-store)
- Processo MCP DEVE ter handlers de unhandledRejection/uncaughtException
