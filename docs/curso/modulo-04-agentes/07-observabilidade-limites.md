---
titulo: "Observabilidade e Limites"
modulo: 4
unidade: 7
tags: [agentes, observabilidade, métricas, guardrails, human-in-the-loop, langfuse]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 7 — Observabilidade e Limites

## Objetivo

Instrumentar agentes com métricas, traces e logs; implementar guardrails de segurança e padrões de human-in-the-loop.

## Por que Observabilidade em Agentes?

Agentes são não-determinísticos e multi-step. Sem observabilidade:
- Não sabemos **por que** o agente tomou uma decisão
- Não detectamos loops infinitos ou degradação
- Não medimos custo real (tokens, latência, chamadas)
- Não identificamos falhas silenciosas

## Métricas Essenciais

| Métrica | O que mede | Alerta |
|---------|-----------|--------|
| Steps per task | Eficiência do agente | > 10 steps |
| Token usage | Custo por interação | > threshold |
| Tool call success rate | Confiabilidade das tools | < 90% |
| Latency (P50/P95) | Experiência do usuário | P95 > 30s |
| Loop detection | Agente preso | Mesmo estado 3x |
| Task completion rate | Eficácia | < 80% |

## LangFuse para Traces

```typescript
import { CallbackHandler } from "langfuse-langchain";

const langfuseHandler = new CallbackHandler({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
});

const result = await graph.invoke(input, {
  callbacks: [langfuseHandler],
  metadata: { userId: "student-123", module: 4 }
});
```

### O que um trace mostra
- Sequência completa de nós visitados
- Input/output de cada LLM call
- Duração e tokens de cada step
- Tool calls e seus resultados
- Custo total da interação

## Guardrails

### 1. Limite de Iterações

```typescript
const MAX_ITERATIONS = 15;

async function guardedAgentLoop(agent, goal) {
  let iterations = 0;
  while (!state.isComplete) {
    if (++iterations > MAX_ITERATIONS) {
      return { error: "Max iterations reached", partial: state };
    }
    state = await agent.step(state);
  }
  return state;
}
```

### 2. Content Filtering

```typescript
async function outputGuardrail(output: string): Promise<string> {
  const check = await moderationAPI.check(output);
  if (check.flagged) {
    return "Não posso fornecer essa informação.";
  }
  return output;
}
```

### 3. Budget Control

```typescript
interface BudgetGuard {
  maxTokensPerSession: number;
  maxCostPerSession: number;
  currentUsage: { tokens: number; cost: number };
  check(): boolean;
}
```

## Human-in-the-Loop (HITL)

Padrão para ações de alto risco que requerem aprovação humana.

### Com LangGraph

```typescript
import { interrupt } from "@langchain/langgraph";

async function riskyActionNode(state) {
  const action = state.proposedAction;
  
  // Pausa execução e pede aprovação
  const approval = interrupt({
    question: `Aprovar ação: ${action.description}?`,
    options: ["approve", "reject", "modify"]
  });
  
  if (approval === "reject") return { cancelled: true };
  return executeAction(action);
}
```

### Quando usar HITL
- Ações irreversíveis (deletar dados, enviar emails)
- Decisões de alto custo (compras, contratos)
- Outputs sensíveis (comunicação externa)
- Baixa confiança do agente (score < threshold)

## Conexão com o Holocron

- LangFuse para traces de todas as interações do tutor
- Guardrail de iterações (max 10 steps por pergunta)
- HITL quando o agente sugere alterar progresso do aluno
- Métricas: completion rate, tokens/sessão, satisfação

## Referências

- [LangFuse Documentation](https://langfuse.com/docs)
- [LangGraph — Human-in-the-Loop](https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/)
- [Anthropic — Guardrails Best Practices](https://docs.anthropic.com/en/docs/test-and-evaluate)
