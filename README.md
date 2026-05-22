# 🔮 Holocron AI Engineer

> Base de conhecimento viva + Tutor inteligente para o curso de Engenharia de IA Aplicada.

## O que é

O Holocron AI Engineer é um sistema que cristaliza todo o conhecimento do curso de Engenharia de IA Aplicada em documentos atômicos, e usa esse conhecimento para atuar como um tutor personalizado que:

- **Domina** 100% do conteúdo do curso (12 módulos, ~100 unidades)
- **Conhece** o aluno (progresso, dificuldades, projetos aplicados)
- **Desafia** — questiona, faz pensar, propõe soluções
- **Valida** — dá feedback, sugere otimizações, aponta gaps
- **Evolui** — a base é realimentada com novas fontes continuamente

## Filosofia

Cada commit é um capítulo. Cada módulo do curso vira uma feature implementada. O projeto **é** o aprendizado.

| Módulo do Curso | Aplicação no Projeto |
|-----------------|---------------------|
| Fundamentos de IA | TensorFlow.js para quiz adaptativo |
| APIs & Prompt Eng | Multi-provider, prompt templates |
| MCP | Holocron MCP Server |
| Agentes | Agente Tutor (ReAct, memória, multi-agent) |
| UX/UI | Interface web conversacional |
| DevOps | CI/CD, IaC, observabilidade |
| Gestão de Projetos | Backlog automatizado, status reports |
| Arquitetura | Design AI-First, RAG patterns |
| Fine-tuning | Modelo customizado para o domínio |
| Segurança | Guardrails, rate limiting, governança |
| Capstone | O próprio Holocron |
| Carreira | Portfolio piece |

## Estrutura

```
holocron/
├── docs/                     # Knowledge Base (Obsidian-compatible)
│   ├── curso/                # Conteúdo atomizado por módulo
│   ├── conceitos/            # Conceitos transversais
│   ├── ferramentas/          # Stack e ferramentas
│   ├── projetos/             # Projetos práticos
│   ├── fontes/               # Rastreabilidade de fontes
│   └── adrs/                 # Architecture Decision Records
├── src/                      # Código-fonte
│   ├── mcp/                  # MCP Server
│   ├── agents/               # Agentes (Tutor, Quiz, etc.)
│   ├── rag/                  # Pipeline RAG
│   ├── api/                  # Backend API
│   └── db/                   # Schemas e migrations (Postgres)
├── steerings/                # Instruções para agentes de IA (genérico)
├── .kiro/                    # Config específica Kiro
├── .cursor/                  # Config específica Cursor
└── .antigravity/             # Config específica Antigravity
```

## Decisões Arquiteturais

- **Dados do aluno em Postgres** — não em Markdown. Progresso, scores, interações ficam em banco relacional. ([ADR-001](docs/adrs/001-dados-aluno-postgres.md))
- **Knowledge Base em Markdown** — conteúdo do curso é atômico, versionado, Obsidian-compatible
- **Portável** — o engine é genérico, a KB é plugável para qualquer curso

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Knowledge Base | Markdown + Obsidian + Git |
| Vector DB | Postgres + pgvector |
| RAG | LangChain/LangGraph (TypeScript) |
| MCP Server | TypeScript (SDK MCP) |
| Agente | LangGraph + multi-agent |
| Backend | Node.js (Fastify) |
| Frontend | React/Next.js |
| ML | TensorFlow.js |
| Observabilidade | LangFuse |
| DB | PostgreSQL |

## Como usar

```bash
# Instalar dependências
npm install

# Rodar em dev
npm run dev

# Rodar MCP server
npm run mcp
```

## Steerings (para agentes de IA)

Os steerings em `steerings/` são instruções genéricas que qualquer IDE agêntica pode consumir. Veja [steerings/README.md](steerings/README.md) para detalhes.

## Licença

MIT
