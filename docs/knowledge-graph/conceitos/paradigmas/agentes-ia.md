---
titulo: "Agentes de IA — O Paradigma Agentic"
tags: [agentes, agentic, tools, autonomy, reasoning, planning]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: patterns
status: explored
connections:
  - llms
  - langgraph
  - crewai
  - mcp
  - openai-agents-sdk
  - human-in-the-loop
---
# Agentes de IA — O Paradigma Agentic

## O que é

Um agente de IA é um sistema onde um LLM **decide autonomamente** quais ações tomar para atingir um objetivo. Em vez de responder a uma pergunta diretamente, o agente:
1. Analisa o objetivo
2. Planeja passos
3. Executa tools (busca, APIs, código)
4. Avalia resultado
5. Decide se precisa fazer mais

**Diferença chave:** Chat = pergunta → resposta. Agente = objetivo → planejamento → execução iterativa → resultado.

## Por que importa

Agentes são o paradigma dominante de 2026. Aplicações reais:
- **SARA (Hotmart)**: Recebe ticket → busca na base → decide se resolve ou escala
- **Claude Code**: Recebe task → lê código → edita → testa → itera
- **Sales Assistant**: Pesquisa lead → qualifica → gera outreach personalizado

## Componentes de um Agente

| Componente | Função | Exemplo |
|------------|--------|---------|
| **LLM (Brain)** | Raciocínio e decisão | Claude Sonnet 4, GPT-5 |
| **Tools** | Ações no mundo | API calls, DB queries, file ops |
| **Memory** | Contexto persistente | Conversas anteriores, estado |
| **Planning** | Decomposição de tarefas | Chain-of-thought, ReAct |
| **Observation** | Feedback do ambiente | Output de tools, erros |
| **Control Flow** | Quando parar, quando iterar | Critérios de sucesso/falha |

## Frameworks de Agentes

| Framework | Abordagem | Melhor Para |
|-----------|-----------|-------------|
| **[[langgraph]]** | State machine (grafos) | Produção, workflows complexos, HITL |
| **[[crewai]]** | Role-based (multi-agent) | Setup rápido, papéis definidos |
| **[[openai-agents-sdk]]** | Managed runtime | Ecossistema OpenAI |
| **Google ADK** | Multi-linguagem | Google Cloud, Gemini |
| **Claude Agent SDK** | Anthropic-native | Claude, tool-use avançado |
| **Microsoft Agent Framework** | Enterprise | Azure, Semantic Kernel |

## Padrões Agentic

| Padrão | Descrição | Caso de Uso |
|--------|-----------|-------------|
| **ReAct** | Reason → Act → Observe → loop | Agente simples |
| **Plan-and-Execute** | Plano completo → executa steps | Tasks decomponíveis |
| **Reflection** | Gera → Avalia → Refina | Escrita, código |
| **Multi-Agent** | Agentes especializados colaboram | Tasks complexas |
| **[[human-in-the-loop]]** | Humano aprova ações críticas | Segurança |
| **Tool-use** | LLM chama funções externas | Integração com sistemas |

## Custos de Agentes

| Fator | Impacto | Mitigação |
|-------|---------|-----------|
| Loops de raciocínio | 3-10x mais tokens | Limitar max_iterations |
| Multi-agent overhead | Cada agente = context separado | Consolidar quando possível |
| Tool calls | Latência + tokens do output | Cache, batch |
| Retries em falha | Custo duplicado | Bom error handling |

**Regra:** Um agente simples consome 5-20x mais tokens que um chat direto.

## Maturidade de Adoção (2026)

- ✅ **Produção**: Atendimento (CAIO, SARA), code review, content generation
- 🟡 **Crescendo**: Sales automation, data analysis, DevOps
- 🔴 **Experimental**: Agentes full-auto sem supervisão em sistemas críticos

## Conceitos Relacionados

- [[llms]] — O "cérebro" do agente
- [[mcp]] — Como agentes acessam tools
- [[langgraph]] — Framework de produção
- [[crewai]] — Framework role-based
- [[human-in-the-loop]] — Segurança
- [[observabilidade-llm]] — Monitorar agentes

## Conexões

- [[llms]] — Base
- [[mcp]] — Tool access
- [[langgraph]] — Implementação
- [[crewai]] — Implementação
- [[openai-agents-sdk]] — Implementação
- [[human-in-the-loop]] — Segurança
- [[observabilidade-llm]] — Monitoramento
