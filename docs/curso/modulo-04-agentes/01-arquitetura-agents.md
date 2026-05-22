---
titulo: "Arquitetura de Agents"
modulo: 4
unidade: 1
tags: [agentes, arquitetura, agent-loop, planner, executor, memory, toolbox]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 1 — Arquitetura de Agents

## Objetivo

Compreender a anatomia de um agente autônomo: o loop de execução, os componentes internos e os diferentes tipos de agentes.

## O que é um Agent?

Um agente é um sistema que usa um LLM como motor de raciocínio para decidir **quais ações tomar** e **em que ordem**, de forma autônoma, até atingir um objetivo.

Diferença fundamental:
- **Chatbot**: input → LLM → output (1 passo)
- **Agent**: input → [LLM → ação → observação]ⁿ → output (N passos)

## Agent Loop (Ciclo do Agente)

```
OBJETIVO (Goal)
     │
     ▼
PERCEPÇÃO (Observe) ◄───┐
  - Input do usuário     │
  - Resultado de tools   │
  - Estado da memória    │
     │                   │
     ▼                   │
RACIOCÍNIO (Think)       │
  - LLM decide ação      │
  - Planner avalia        │
     │                   │
     ▼                   │
AÇÃO (Act)               │
  - Chamar ferramenta    │
  - Gerar resposta       │
  - Delegar              │
     │                   │
     ▼                   │
 Terminou? ── Não ───────┘
     │
     │ Sim
     ▼
RESPOSTA FINAL
```

## Componentes Internos

### 1. Planner (Planejador)
Decompõe o objetivo em sub-tarefas. Pode ser implícito (ReAct) ou explícito (Plan-and-Execute).

### 2. Executor
Executa ações individuais — chamadas a ferramentas, queries, transformações.

### 3. Memory (Memória)
Mantém contexto entre iterações:
- **Working memory**: contexto da conversa atual
- **Long-term memory**: conhecimento persistente entre sessões

### 4. Toolbox (Caixa de Ferramentas)
Conjunto de capacidades disponíveis ao agente — APIs, bancos, file system, MCPs.

## Tipos de Agentes

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **Reactive** | Responde a estímulos sem planejamento | Chatbot com tools |
| **Deliberative** | Planeja antes de agir | Plan-and-Execute |
| **Hybrid** | Combina reação rápida com planejamento | ReAct |
| **Hierarchical** | Agente supervisor delega a sub-agentes | Multi-agent |

## Exemplo Conceitual (TypeScript)

```typescript
interface Agent {
  planner: Planner;
  executor: Executor;
  memory: Memory;
  tools: Tool[];
}

async function agentLoop(agent: Agent, goal: string): Promise<string> {
  let state = await agent.memory.load();
  while (!state.isComplete) {
    const plan = await agent.planner.think(goal, state);
    const result = await agent.executor.act(plan.nextAction, agent.tools);
    state = await agent.memory.update(result);
  }
  return state.finalAnswer;
}
```

## Conexão com o Holocron

O Agente Tutor do Holocron é um agente deliberativo com:
- Planner que decompõe perguntas pedagógicas
- Executor com tools de RAG, quiz e progresso
- Memória de longo prazo (perfil do aluno em Postgres)
- Toolbox: busca na KB, geração de quiz, atualização de progresso

## Referências

- [LangGraph Docs — Agent Architectures](https://langchain-ai.github.io/langgraph/)
- [Lilian Weng — LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)
- Andrew Ng — Agentic Design Patterns (2024)
