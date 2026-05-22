---
titulo: "ADR-001 — Dados do Aluno em PostgreSQL"
status: aceita
data: 2026-05-22
decisores: Saymon Silva
tags:
  - database
  - postgres
  - aluno
  - arquitetura
---

# ADR-001 — Dados do Aluno em PostgreSQL, não Markdown

## Contexto

O Holocron precisa armazenar dois tipos de dados:
1. **Conteúdo do curso** — estático, versionável, colaborativo
2. **Dados do aluno** — dinâmicos, relacionais, privados (progresso, scores, interações, memória do agente)

A tentação natural é colocar tudo em Markdown (como o conteúdo do curso), mas dados do aluno têm características diferentes.

## Decisão

**Dados do aluno ficam em PostgreSQL. Não em Markdown.**

### O que vai no Postgres:
- Progresso por módulo/unidade (% completado, data)
- Scores de quizzes e desafios
- Histórico de interações com o agente
- Memória de longo prazo do agente (o que o aluno sabe/não sabe)
- Embeddings (via pgvector)
- Preferências e configurações do aluno

### O que fica em Markdown:
- Conteúdo do curso (conceitos, ferramentas, projetos)
- ADRs e documentação técnica
- Fontes e referências

## Justificativa

| Critério | Markdown | PostgreSQL |
|----------|----------|------------|
| Queries complexas | ❌ | ✅ |
| Relações entre dados | ❌ | ✅ |
| Concorrência | ❌ | ✅ |
| Versionamento | ✅ | ❌ (mas tem audit log) |
| Colaboração | ✅ | ❌ |
| Privacidade | ❌ (Git público) | ✅ |
| Vector search | ❌ | ✅ (pgvector) |
| Performance em escala | ❌ | ✅ |

## Consequências

- **Positiva**: Um único banco (Postgres + pgvector) resolve dados relacionais E vetoriais
- **Positiva**: Dados do aluno ficam privados (não vão pro Git)
- **Positiva**: Queries SQL para analytics de progresso
- **Negativa**: Precisa de infra (Postgres rodando) — mitigado com Docker Compose
- **Negativa**: Migrations para manter schema — mitigado com SQL versionado

## Schema Inicial

```sql
-- Aluno
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progresso
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  module INT NOT NULL,
  unit INT NOT NULL,
  status TEXT DEFAULT 'not_started', -- not_started | in_progress | completed
  score NUMERIC,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interações com o agente
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  agent TEXT NOT NULL, -- tutor | quiz | reviewer
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Embeddings dos documentos
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_path TEXT NOT NULL,
  chunk_index INT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Referências

- [pgvector](https://github.com/pgvector/pgvector)
- ADR-000 (Gênese do projeto)
