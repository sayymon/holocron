---
titulo: "Projeto Prático: Agent Completo"
disciplina: 4
modulo: 8
tags: [agentes, projeto, implementação, langgraph, apis, memória, observabilidade]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 8 — Projeto Prático: Agent Completo

## Objetivo

Integrar todos os conceitos do módulo em um agente funcional: planejamento, ferramentas, memória, observabilidade e logs.

## Especificação: Agente Tutor do Holocron

Construir um agente que atua como tutor personalizado do curso de IA.

### Requisitos Funcionais
- Responder perguntas sobre o conteúdo do curso (RAG)
- Gerar quizzes adaptativos baseados no progresso
- Manter perfil do aluno (dificuldades, preferências)
- Sugerir próximos passos de estudo
- Explicar conceitos com diferentes níveis de profundidade

### Requisitos Não-Funcionais
- Latência P95 < 10s para respostas simples
- Custo < $0.05 por interação média
- Observabilidade completa (LangFuse)
- Guardrails: max 10 steps, content filter

## Arquitetura

```
┌─────────────────────────────────────────┐
│            StateGraph (LangGraph)         │
├──────────┬──────────┬──────────┬────────┤
│  Router  │  RAG     │  Quiz    │ Planner│
│  Node    │  Subgraph│  Subgraph│ Node   │
└────┬─────┴────┬─────┴────┬─────┴────┬───┘
     │          │          │          │
┌────▼──────────▼──────────▼──────────▼───┐
│           Tool Layer (MCP)               │
├──────────┬──────────┬───────────────────┤
│ KB Search│ Progress │ Quiz Gen │ Update │
└────┬─────┴────┬─────┴────┬─────┴───┬───┘
     │          │          │         │
┌────▼──────────▼──────────▼─────────▼───┐
│         Data Layer                      │
├──────────┬──────────┬──────────────────┤
│ pgvector │ Postgres │ Redis (cache)    │
└──────────┴──────────┴──────────────────┘
```

## Implementação Step-by-Step

### Step 1: Definir State

```typescript
const TutorState = Annotation.Root({
  messages: Annotation<Message[]>({ reducer: messagesReducer }),
  studentId: Annotation<string>(),
  studentProfile: Annotation<StudentProfile | null>(),
  retrievedDocs: Annotation<Document[]>({ default: () => [] }),
  currentModule: Annotation<number | null>(),
});
```

### Step 2: Implementar Nós

```typescript
async function routerNode(state) {
  const intent = await classifyIntent(state.messages.at(-1));
  return { intent };
}

async function ragNode(state) {
  const docs = await searchKB(state.messages.at(-1).content);
  const answer = await generateAnswer(docs, state.messages);
  return { messages: [{ role: "assistant", content: answer }], retrievedDocs: docs };
}

async function quizNode(state) {
  const quiz = await generateQuiz(state.studentProfile, state.currentModule);
  return { messages: [{ role: "assistant", content: formatQuiz(quiz) }] };
}
```

### Step 3: Montar Grafo

```typescript
const graph = new StateGraph(TutorState)
  .addNode("load_profile", loadProfileNode)
  .addNode("router", routerNode)
  .addNode("rag", ragNode)
  .addNode("quiz", quizNode)
  .addNode("planner", plannerNode)
  .addEdge("__start__", "load_profile")
  .addEdge("load_profile", "router")
  .addConditionalEdges("router", routeByIntent)
  .compile({ checkpointer: postgresCheckpointer });
```

### Step 4: Adicionar Observabilidade

```typescript
const app = graph.compile({
  checkpointer,
  callbacks: [langfuseHandler],
});
```

## Checklist de Entrega

- [ ] Agent loop funcional com LangGraph
- [ ] Mínimo 3 tools via MCP
- [ ] Memória de longo prazo (Postgres)
- [ ] Roteamento condicional (min 3 paths)
- [ ] Traces no LangFuse
- [ ] Guardrails (iterações, content)
- [ ] Testes de integração
- [ ] README com instruções de execução

## Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Funcionalidade (resolve o problema) | 30% |
| Arquitetura (clean, extensível) | 25% |
| Observabilidade (traces, métricas) | 20% |
| Robustez (error handling, guardrails) | 15% |
| Documentação | 10% |

## Referências

- Unidades 1-7 deste módulo (pré-requisitos)
- [LangGraph — Tutorials](https://langchain-ai.github.io/langgraph/tutorials/)
- [Holocron README](../../README.md)
