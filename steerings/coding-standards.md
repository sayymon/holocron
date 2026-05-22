# Coding Standards — Holocron AI Engineer

## Linguagem e Runtime

- **TypeScript** como linguagem principal
- **Node.js 20+** como runtime
- **ESM** (ES Modules) — não CommonJS
- Strict mode habilitado no tsconfig

## Estrutura de Código

```
src/
├── mcp/          # MCP Server — tools, resources, prompts
├── agents/       # Agentes — tutor, quiz, reviewer
├── rag/          # Pipeline RAG — indexer, retriever, reranker
├── api/          # Backend — routes, controllers, middleware
└── db/           # Database — schemas, migrations, queries
```

## Convenções

### Naming
- Arquivos: `kebab-case.ts`
- Classes: `PascalCase`
- Funções/variáveis: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Tipos/Interfaces: `PascalCase` (prefixo `I` não usado)

### Imports
- Imports absolutos via path aliases (`@/mcp`, `@/agents`, etc.)
- Imports de tipos com `type` keyword

### Funções
- Preferir funções puras quando possível
- Async/await sobre callbacks
- Early return para reduzir nesting
- Erros tipados (não `any`)

## Dependências Principais

| Pacote | Uso |
|--------|-----|
| `@modelcontextprotocol/sdk` | MCP Server |
| `@langchain/core` | RAG e Agentes |
| `@langchain/langgraph` | Orquestração multi-agent |
| `pg` + `pgvector` | Database + Vector search |
| `fastify` | Backend API |
| `@tensorflow/tfjs` | ML no browser/node |
| `zod` | Validação de schemas |

## Database

- **PostgreSQL** com extensão `pgvector`
- Migrations via SQL puro em `src/db/migrations/`
- Naming: `YYYYMMDD_NNN_descricao.sql`
- Dados do aluno: progresso, scores, interações, memória do agente
- Embeddings: armazenados como `vector(1536)` no pgvector

## Testes

- Vitest como test runner
- Testes unitários junto ao código (`*.test.ts`)
- Testes de integração em `tests/`

## Commits

- Mensagens descritivas em português
- Formato: `tipo: descrição breve`
- Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Cada commit conta uma história — é um capítulo do aprendizado

## Documentação

- ADRs para decisões técnicas (`docs/adrs/`)
- Conceitos novos viram docs atômicos (`docs/conceitos/`)
- Front Matter obrigatório em todo documento da KB
