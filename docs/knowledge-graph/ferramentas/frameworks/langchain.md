---
titulo: "LangChain — O Framework de Orquestração LLM"
tags: [langchain, framework, chains, tools, agents, orchestration]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-frameworks
status: explored
connections:
  - llms
  - rag
  - agentes-ia
  - langgraph
  - langsmith
---
# LangChain — O Framework de Orquestração LLM

## O que é

LangChain é o framework open-source mais popular para construir aplicações com LLMs. Fornece abstrações para encadear chamadas a modelos, tools, memória, e data sources. É o "Spring Boot" do mundo de IA — opinionated, ecossistema amplo, 10M+ downloads/mês.

Em 2026, o ecossistema LangChain Inc inclui:
- **LangChain** — Framework core (chains, tools, prompts)
- **[[langgraph]]** — Agentes stateful (grafos)
- **[[langsmith]]** — Observabilidade e evaluation
- **LangServe** — Deploy de chains como API
- **Deep Agents** — Long-running workflows

## Componentes Principais

| Componente | Função |
|------------|--------|
| **Chat Models** | Interface unificada para LLMs (OpenAI, Anthropic, etc.) |
| **Prompts** | Templates com variáveis e few-shot examples |
| **Chains** | Sequências de operações (prompt → model → parser) |
| **Tools** | Ações que LLMs podem chamar |
| **Retrievers** | Busca em vector stores, BM25, hybrid |
| **Memory** | Conversação multi-turn, buffer, summary |
| **Output Parsers** | Structured output (JSON, Pydantic) |
| **Callbacks** | Hooks para logging, streaming, observability |

## Preço

- **Framework**: Grátis (MIT license)
- **LangSmith**: Free (5K traces) → Plus ($39/seat/mês) → Enterprise
- **LangGraph Platform**: Enterprise pricing
- **Custo real**: LLM API calls + vector DB + hosting

## Quando Usar

✅ **Use LangChain quando:**
- Quer **ecossistema amplo** (100+ integrações out-of-box)
- Precisa de **prototipação rápida** de RAG/agents
- Time usa **Python ou TypeScript**
- Quer trocar providers sem reescrever código
- Precisa de observabilidade integrada (LangSmith)

❌ **Evite quando:**
- Quer **minimal abstractions** (use Vercel AI SDK ou direto)
- Overhead de abstração é inaceitável (latência extra ~5-10ms)
- Só precisa de RAG (LlamaIndex é mais focado)
- Não quer depender de um ecossistema grande

## Ecossistema

```
┌─────────────────────────────────────────┐
│              LangSmith                   │ ← Observability
├─────────────────────────────────────────┤
│         LangGraph Platform              │ ← Deploy managed
├────────────────┬────────────────────────┤
│   LangChain    │    LangGraph           │ ← Frameworks
│  (chains,      │   (agents,             │
│   tools, RAG)  │   state, graphs)       │
├────────────────┴────────────────────────┤
│         100+ integrations               │ ← Providers, VectorDBs
└─────────────────────────────────────────┘
```

## LangChain vs Alternativas

| Framework | Foco | Vantagem | Desvantagem |
|-----------|------|----------|-------------|
| **LangChain** | Tudo | Ecossistema amplo | Abstração pesada |
| [[llamaindex]] | RAG | Melhor recall, data connectors | Menos agentes |
| [[haystack]] | RAG produção | Latência baixa, declarativo | Menos integrações |
| Vercel AI SDK | Web apps | TS-native, streaming | Menos features |
| DSPy | Prompts | Otimização automática | Curva de aprendizado |

## Holocron usa LangChain

O Holocron MCP server usa LangChain (TypeScript) para:
- RAG pipeline (busca semântica no curso)
- Tools dos agentes (Tutor, Quiz)
- Integração com pgvector
- Output parsing

## Conceitos Relacionados

- [[llms]] — O que LangChain orquestra
- [[rag]] — Principal caso de uso
- [[langgraph]] — Extensão para agentes
- [[langsmith]] — Observabilidade
- [[agentes-ia]] — Paradigma

## Conexões

- [[llamaindex]] — Alternativa RAG-focused
- [[haystack]] — Alternativa production-focused
- [[langgraph]] — Extensão stateful
- [[langsmith]] — Monitoring
