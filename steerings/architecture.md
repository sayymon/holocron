# Architecture — Decisões e Patterns

## Visão Geral

O Holocron AI Engineer segue uma arquitetura **AI-First** onde o conhecimento é a base e os agentes são a interface inteligente.

## Camadas

### 1. Knowledge Layer (docs/)
- Markdown atômico, Obsidian-compatible
- Fonte de verdade para conteúdo do curso
- Versionado via Git — cada commit é rastreável

### 2. Data Layer (PostgreSQL)
- **pgvector** para embeddings e busca semântica
- Dados do aluno: progresso, scores, interações
- Memória do agente: contexto, histórico de conversas
- Migrations SQL versionadas

### 3. RAG Layer (src/rag/)
- Indexação: Markdown → chunks → embeddings → pgvector
- Retrieval: hybrid search (semantic + keyword)
- Reranking para relevância
- Context window management

### 4. Agent Layer (src/agents/)
- **Tutor Agent**: principal — socrático, desafia, guia
- **Quiz Agent**: gera e avalia quizzes adaptativos
- **Reviewer Agent**: revisa código e projetos do aluno
- Pattern: ReAct + Reflection + Memory
- Orquestração via LangGraph

### 5. Interface Layer
- **MCP Server** (src/mcp/): para IDEs agênticas
- **API REST** (src/api/): para web/mobile
- **Web UI**: chat + dashboard + grafo

## Patterns Adotados

| Pattern | Onde | Por quê |
|---------|------|---------|
| RAG | Busca de conteúdo | Precisão sem fine-tuning |
| ReAct | Agente Tutor | Raciocínio + ação iterativa |
| Reflection | Auto-melhoria | Agente revisa próprias respostas |
| Multi-agent | Orquestração | Especialização por domínio |
| Hybrid Search | Retrieval | Combina semântico + keyword |
| Human-in-the-loop | Validação | Aluno confirma/corrige |

## Constraints

- **TypeScript** — alinhado com o curso (JS/TS)
- **PostgreSQL** — único banco (pgvector elimina necessidade de DB separado)
- **Multi-provider** — não lock-in em um LLM (OpenAI, Gemini, Claude)
- **Offline-first KB** — Markdown funciona sem internet
- **Portável** — trocar a KB = trocar o curso

## Segurança

- Rate limiting no MCP e API
- Guardrails no agente (não responde fora do escopo)
- Dados do aluno isolados por tenant (futuro multi-user)
- Secrets via variáveis de ambiente (nunca no código)

## Observabilidade

- LangFuse para traces de LLM
- Logs estruturados (JSON)
- Métricas: latência, tokens, custo, satisfação do aluno
