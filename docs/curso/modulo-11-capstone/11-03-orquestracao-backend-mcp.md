---
titulo: "Orquestração Back-end e MCP"
modulo: 11
unidade: 3
tags: [capstone, backend, mcp, fastify, api, orquestracao]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Orquestração Back-end e MCP

## Arquitetura do Backend

### Stack Recomendada

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Fastify | Performance, TypeScript-first |
| ORM | Prisma | Type-safe, migrations |
| DB | PostgreSQL + pgvector | Relacional + vetorial |
| Auth | JWT + refresh tokens | Stateless, escalável |
| Validation | Zod | Runtime type checking |

### Estrutura de Projeto

```
src/
├── routes/          # Endpoints HTTP
├── services/        # Lógica de negócio
├── agents/          # LangGraph agents
├── rag/             # Pipeline RAG
├── mcp/             # MCP Server
├── db/              # Prisma schema + migrations
└── lib/             # Utilitários compartilhados
```

## MCP Server ([[mcp]])

### Por que expor via MCP

- Permite que IDEs agênticas (Kiro, Cursor) consumam o serviço
- Protocolo padronizado para tools, resources, prompts
- Composição com outros MCPs do ecossistema

### Implementação Mínima

```typescript
// Tools expostas via MCP
- search_knowledge(query) → resultados RAG
- get_progress(user_id) → progresso do aluno
- submit_answer(question_id, answer) → feedback
```

### Padrões

- **Transport**: stdio (local) ou SSE (remoto)
- **Auth**: token-based para acesso remoto
- **Error handling**: códigos MCP padronizados

## Orquestração

### Request Flow

```
Client → API Route → Service → Agent/RAG → LLM
                         ↓
                    DB (persist)
```

### Patterns

- **Streaming** — SSE para respostas longas de LLM
- **Queue** — jobs assíncronos para processamento pesado
- **Cache** — Redis para embeddings frequentes
- **Rate limiting** — por usuário e por endpoint

## Conexões

- [[11-01-ideacao-arquitetura]] — backend implementa a arquitetura definida
- [[11-02-fundamentos-rag-agentes]] — backend orquestra RAG e agentes
- [[11-04-frontend-implantacao]] — frontend consome este backend
- [[mcp]] — protocolo MCP em detalhe
