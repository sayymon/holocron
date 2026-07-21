---
titulo: "OpenAI Agents SDK — Framework Managed de Agentes"
tags: [openai, agents-sdk, managed, tools, memory, swarm]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-frameworks
status: explored
connections:
  - agentes-ia
  - openai-gpt
  - langgraph
---
# OpenAI Agents SDK — Framework Managed de Agentes

## O que é

O OpenAI Agents SDK é a evolução do projeto experimental "Swarm" em um framework production-ready. Oferece um runtime managed para construir agentes com tools, memória e handoffs entre agentes especializados.

## Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **Agent primitives** | Agents com instructions, tools, handoffs |
| **Built-in tools** | Web search, code interpreter, file search |
| **Memory** | Persistência de contexto entre sessões |
| **Handoffs** | Um agente passa controle para outro |
| **Guardrails** | Input/output validation nativa |
| **Tracing** | OpenTelemetry-compatible |
| **Hosted runtime** | OpenAI gerencia infra |

## Preço

- **SDK**: Grátis (open-source)
- **Runtime hosted**: Incluído nos custos de API token
- **Custo real**: Tokens do modelo escolhido (GPT-5, etc.)

## Quando Usar

✅ **Use OpenAI Agents SDK quando:**
- Stack já é OpenAI (GPT-5, tools)
- Quer **zero infra** (managed runtime)
- Handoffs entre agentes especializados
- Built-in tools (web search, code interpreter)

❌ **Evite quando:**
- Quer provider-agnostic → [[langgraph]]
- Precisa de grafos complexos com cycles → [[langgraph]]
- Multi-agent com papéis → [[crewai]]
- Budget exige modelos open-source

## Conceitos Relacionados

- [[agentes-ia]] — Categoria
- [[openai-gpt]] — Provider/ecossistema
- [[langgraph]] — Alternativa provider-agnostic
- [[crewai]] — Alternativa role-based

## Conexões

- [[openai-gpt]] — Ecossistema
- [[agentes-ia]] — Paradigma
- [[langgraph]] — Competidor
- [[crewai]] — Competidor
