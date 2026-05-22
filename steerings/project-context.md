# Project Context — Holocron AI Engineer

## O que é este projeto

O Holocron AI Engineer é um **tutor inteligente personalizado** para o curso de Engenharia de IA Aplicada. Ele cristaliza todo o conteúdo do curso em documentos atômicos (Markdown/Obsidian) e usa RAG + Agentes para atuar como um tutor que conhece o aluno, desafia, valida e evolui.

## Filosofia

- Cada commit é um capítulo — o projeto cresce junto com o aprendizado
- Cada módulo do curso vira uma feature implementada no projeto
- O projeto É o aprendizado — não é separado dele
- Portável — o engine é genérico, a knowledge base é plugável

## Arquitetura em Alto Nível

```
┌─────────────────────────────────────────────────────┐
│                    Interfaces                         │
│  Web UI │ Mobile │ MCP Client │ CLI │ Chat           │
└────────────────────────┬────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────┐
│                  Agente Tutor                         │
│  ReAct │ Memória │ Multi-agent │ Reflection          │
└────────────────────────┬────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────┐
│              RAG Pipeline + MCP Server                │
│  Embeddings │ Vector Search │ Hybrid │ Reranking     │
└──────┬─────────────────────────────────────┬────────┘
       │                                     │
┌──────▼──────┐                    ┌─────────▼────────┐
│ Knowledge   │                    │   PostgreSQL      │
│ Base (MD)   │                    │   (pgvector +     │
│ Obsidian    │                    │    dados aluno)   │
└─────────────┘                    └──────────────────┘
```

## Domínios

1. **Knowledge Base** (`docs/`) — Conteúdo do curso em Markdown atômico
2. **RAG Pipeline** (`src/rag/`) — Indexação, embeddings, busca semântica
3. **MCP Server** (`src/mcp/`) — Expõe conhecimento via Model Context Protocol
4. **Agentes** (`src/agents/`) — Tutor, Quiz, Reviewer
5. **API** (`src/api/`) — Backend REST/GraphQL
6. **Database** (`src/db/`) — Schemas, migrations, dados do aluno

## Decisões Importantes

- **Dados do aluno ficam em Postgres** — NÃO em Markdown. Progresso, scores, interações, memória do agente → banco relacional. Veja ADR-001.
- **Conteúdo do curso fica em Markdown** — atômico, versionado, Obsidian-compatible
- **TypeScript** como linguagem principal (alinhado com o curso que usa JS/TS)
- **Multi-provider** — suporte a OpenAI, Gemini, Claude via abstração

## Módulos do Curso (12)

1. Fundamentos de IA e LLMs para Programadores
2. APIs de IA Generativa e Prompt Engineering
3. MCP – Model Context Protocol
4. Criação de Agentes Autônomos
5. Ferramentas de IA para UX & UI
6. Ferramentas de IA para DevOps
7. Ferramentas de IA para Gestão de Projetos
8. Arquitetura de Sistemas com IA
9. Processamento de Dados e Fine-Tuning de Modelos
10. Segurança e Governança em IA
11. Projeto Integrador – Capstone Project
12. Carreira e Entrevistas para Engenheiros de AI Aplicada

## Ao trabalhar neste projeto

- Sempre documente decisões técnicas como ADRs em `docs/adrs/`
- Novos conceitos aprendidos viram documentos atômicos em `docs/`
- Mantenha Front Matter nos documentos (título, módulo, tags, fonte)
- Código em TypeScript, seguindo os padrões em `coding-standards.md`
- Commits descritivos — cada um conta uma história
