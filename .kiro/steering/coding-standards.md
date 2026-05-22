---
inclusion: always
---

# Padrões de Código — Holocron AI Engineer

## Convenções

- Arquivos: `kebab-case.ts`
- Classes: `PascalCase`, Funções: `camelCase`, Constantes: `UPPER_SNAKE_CASE`
- Imports absolutos: `@/mcp`, `@/agents`, `@/rag`, `@/api`, `@/db`
- ESM (ES Modules), strict mode
- Async/await, early return, erros tipados (não `any`)

## Commits

- Português: `tipo: descrição` (feat, fix, docs, refactor, test, chore)
- Cada commit é um capítulo do aprendizado

## Testes

- Vitest (`*.test.ts`)
- Testes unitários junto ao código

## Database

- PostgreSQL + pgvector
- Migrations SQL em `src/db/migrations/` (`YYYYMMDD_NNN_descricao.sql`)
- Embeddings: `vector(1536)`

## Documentação

- ADRs em `docs/adrs/`
- Conceitos novos viram docs atômicos em `docs/`
- Front Matter YAML obrigatório
