---
titulo: "LangGraph e Workflows Complexos"
modulo: 4
unidade: 6
tags: [agentes, langgraph, workflows, grafos, roteamento, fallback, state-machine]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 6 — LangGraph e Workflows Complexos

## Objetivo

Construir agentes como grafos de estado usando LangGraph: nós, arestas condicionais, roteamento dinâmico e estratégias de fallback.

## Por que LangGraph?

Chains lineares (LangChain) não suportam:
- Loops (agent loop precisa de ciclos)
- Branching condicional (decisões dinâmicas)
- Estado persistente entre nós
- Human-in-the-loop (pausar e retomar)

LangGraph modela agentes como **grafos de estado** com controle explícito de fluxo.

## Conceitos Fundamentais

### StateGraph

```typescript
import { StateGraph, Annotation } from "@langchain/langgraph";

const AgentState = Annotation.Root({
  messages: Annotation<Message[]>({ reducer: (a, b) => [...a, ...b] }),
  plan: Annotation<string[]>(),
  currentStep: Annotation<number>({ default: () => 0 }),
});

const graph = new StateGraph(AgentState)
  .addNode("planner", plannerNode)
  .addNode("executor", executorNode)
  .addNode("evaluator", evaluatorNode)
  .addEdge("planner", "executor")
  .addConditionalEdges("evaluator", routeDecision)
  .compile();
```

### Nós (Nodes)
Funções que recebem state e retornam state atualizado.

```typescript
async function plannerNode(state: typeof AgentState.State) {
  const plan = await llm.invoke(`Crie um plano para: ${state.messages.at(-1)}`);
  return { plan: plan.steps };
}
```

### Arestas Condicionais (Routing)

```typescript
function routeDecision(state: typeof AgentState.State) {
  if (state.currentStep >= state.plan.length) return "end";
  if (state.needsReplan) return "planner";
  return "executor";
}
```

## Padrões de Workflow

### 1. Loop com Condição de Saída

```
planner → executor → evaluator → (volta ao executor OU finaliza)
```

### 2. Roteamento por Tipo

```typescript
function routeByType(state) {
  const lastMessage = state.messages.at(-1);
  if (lastMessage.includes("quiz")) return "quiz_agent";
  if (lastMessage.includes("explique")) return "tutor_agent";
  return "general_agent";
}
```

### 3. Fallback Chain

```typescript
const graph = new StateGraph(State)
  .addNode("primary", primaryLLM)
  .addNode("fallback", fallbackLLM)
  .addNode("error_handler", handleError)
  .addConditionalEdges("primary", (state) => {
    if (state.error) return "fallback";
    return "end";
  })
  .addConditionalEdges("fallback", (state) => {
    if (state.error) return "error_handler";
    return "end";
  });
```

## Checkpointing e Persistência

```typescript
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();
const app = graph.compile({ checkpointer });

// Execução com thread_id para persistência
const result = await app.invoke(input, {
  configurable: { thread_id: "session-123" }
});
```

## Subgraphs (Composição)

```typescript
const tutorSubgraph = new StateGraph(TutorState)
  .addNode("retrieve", ragNode)
  .addNode("generate", generateNode)
  .compile();

const mainGraph = new StateGraph(MainState)
  .addNode("router", routerNode)
  .addNode("tutor", tutorSubgraph)  // Subgraph como nó
  .addNode("quiz", quizSubgraph)
  .compile();
```

## Conexão com o Holocron

O Agente Tutor é um StateGraph com:
- Nó de roteamento (tipo de pergunta)
- Subgraph RAG (busca + geração)
- Subgraph Quiz (geração + avaliação)
- Checkpointing em Postgres para sessões persistentes

## Referências

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangGraph — How-to Guides](https://langchain-ai.github.io/langgraph/how-tos/)
- [Harrison Chase — LangGraph Explained](https://blog.langchain.dev/langgraph/)
