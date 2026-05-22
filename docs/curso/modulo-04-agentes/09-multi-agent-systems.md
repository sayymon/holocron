---
titulo: "Multi-Agent Systems"
modulo: 4
unidade: 9
tags: [agentes, multi-agent, orquestração, supervisor, group-chat, delegation]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 9 — Multi-Agent Systems

## Objetivo

Projetar sistemas onde múltiplos agentes especializados colaboram: padrões de orquestração, supervisor, group chat e delegation.

## Por que Multi-Agent?

Um único agente com muitas responsabilidades:
- Prompt gigante e confuso
- Difícil de debugar
- Impossível escalar independentemente
- Mistura concerns diferentes

Multi-agent = **separação de responsabilidades** aplicada a agentes.

## Padrões de Orquestração

### 1. Supervisor (Hierárquico)

Um agente supervisor decide qual especialista acionar.

```typescript
const supervisorGraph = new StateGraph(State)
  .addNode("supervisor", supervisorNode)
  .addNode("researcher", researcherAgent)
  .addNode("writer", writerAgent)
  .addNode("reviewer", reviewerAgent)
  .addConditionalEdges("supervisor", (state) => {
    return state.nextAgent; // "researcher" | "writer" | "reviewer" | "end"
  })
  .addEdge("researcher", "supervisor")
  .addEdge("writer", "supervisor")
  .addEdge("reviewer", "supervisor")
  .compile();
```

**Características:**
- Controle centralizado
- Fácil de entender e debugar
- Supervisor pode ser gargalo

### 2. Group Chat (Colaborativo)

Agentes conversam entre si em turnos, mediados por um moderador.

```typescript
async function groupChat(agents: Agent[], topic: string, maxRounds: number) {
  const history: Message[] = [];
  for (let round = 0; round < maxRounds; round++) {
    const nextSpeaker = await selectNextSpeaker(agents, history);
    const response = await nextSpeaker.respond(history);
    history.push({ agent: nextSpeaker.name, content: response });
    if (isConsensus(history)) break;
  }
  return synthesize(history);
}
```

**Características:**
- Emergência de soluções criativas
- Difícil de controlar
- Bom para brainstorming e revisão

### 3. Delegation (Peer-to-Peer)

Agentes delegam sub-tarefas diretamente uns aos outros.

```typescript
async function delegatingAgent(state) {
  const subtask = identifySubtask(state);
  if (subtask.domain === "data") {
    const result = await dataAgent.invoke(subtask);
    return { ...state, dataResult: result };
  }
  // Resolve localmente
  return solve(state);
}
```

**Características:**
- Descentralizado
- Cada agente decide quando delegar
- Pode criar dependências circulares

## Comunicação entre Agentes

| Padrão | Mecanismo | Quando usar |
|--------|-----------|-------------|
| Shared State | LangGraph state | Agentes no mesmo grafo |
| Message Passing | Fila/evento | Agentes independentes |
| Blackboard | Store compartilhado | Colaboração assíncrona |
| Tool Call | Um agente como tool de outro | Hierarquia clara |

## Exemplo: Sistema Tutor Multi-Agent

```
┌─────────────────────────────────┐
│         Supervisor Agent         │
│   (roteia por tipo de pedido)    │
└──────┬──────────┬───────────────┘
       │          │          │
┌──────▼───┐ ┌───▼────┐ ┌──▼──────┐
│  Tutor   │ │  Quiz  │ │ Planner │
│  Agent   │ │  Agent │ │  Agent  │
│(explica) │ │(avalia)│ │(planeja)│
└──────────┘ └────────┘ └─────────┘
```

### Implementação com LangGraph

```typescript
const multiAgentGraph = new StateGraph(OrchestratorState)
  .addNode("supervisor", supervisorNode)
  .addNode("tutor", tutorSubgraph)
  .addNode("quiz", quizSubgraph)
  .addNode("planner", plannerSubgraph)
  .addConditionalEdges("supervisor", routeToSpecialist)
  .addEdge("tutor", "supervisor")
  .addEdge("quiz", "supervisor")
  .addEdge("planner", "supervisor")
  .compile();
```

## Desafios

| Desafio | Mitigação |
|---------|-----------|
| Loops infinitos entre agentes | Max rounds + deadlock detection |
| Contexto perdido entre agentes | Shared state explícito |
| Custo multiplicado | Budget per-agent + caching |
| Debugging complexo | Traces hierárquicos (LangFuse) |
| Latência acumulada | Paralelismo quando possível |

## Conexão com o Holocron

O Holocron evolui para multi-agent:
- **Tutor Agent**: explica conceitos, responde dúvidas
- **Quiz Agent**: gera e avalia quizzes adaptativos
- **Planner Agent**: cria planos de estudo personalizados
- **Supervisor**: roteia baseado na intenção do aluno

## Referências

- [LangGraph — Multi-Agent](https://langchain-ai.github.io/langgraph/concepts/multi_agent/)
- [AutoGen — Multi-Agent Conversations](https://microsoft.github.io/autogen/)
- [CrewAI — Agent Collaboration](https://docs.crewai.com/)
- Wu et al. — AutoGen: Enabling Next-Gen LLM Applications (2023)
