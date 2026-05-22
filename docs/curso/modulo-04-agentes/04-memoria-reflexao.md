---
titulo: "Memória e Reflexão"
modulo: 4
unidade: 4
tags: [agentes, memória, short-term, long-term, episódica, reflection, reflexion]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 4 — Memória e Reflexão

## Objetivo

Implementar sistemas de memória que permitem ao agente aprender com interações passadas e reflection loops para auto-correção.

## Tipos de Memória

### 1. Memória de Curto Prazo (Working Memory)

Contexto da conversa atual. Limitada pela context window do LLM.

```typescript
interface ShortTermMemory {
  messages: Message[];
  scratchpad: string;
  currentPlan: Step[];
}
```

- Volátil — descartada ao fim da sessão
- Limitada pelo context window (128K-200K tokens)
- Rápida — está no prompt

### 2. Memória de Longo Prazo (Long-Term Memory)

Conhecimento persistente entre sessões.

```typescript
interface LongTermMemory {
  facts: Fact[];
  preferences: Preference[];
  skills: Skill[];
}
```

**Implementações:** Vector store (pgvector), Key-value (Redis), Relacional (Postgres)

### 3. Memória Episódica

Registra experiências completas — sequências de ações e resultados.

```typescript
interface Episode {
  id: string;
  goal: string;
  steps: ActionResult[];
  outcome: "success" | "failure";
  lessons: string[];
  timestamp: Date;
}
```

**Uso:** "Já tentei algo parecido? O que funcionou?"

## Reflection Loops

### Padrão Self-Reflect

```typescript
async function reflectAndImprove(agent, output, goal) {
  const reflection = await agent.llm.generate(`
    Objetivo: ${goal}
    Sua resposta: ${output}
    Avalie: atinge o objetivo? O que falta? Erros factuais?
  `);
  if (reflection.needsImprovement) {
    return agent.llm.generate(`Melhore: ${reflection.feedback}`);
  }
  return output;
}
```

### Reflexion (com memória de erros)

Persiste aprendizados entre tentativas:

```typescript
async function reflexionLoop(agent, task) {
  const pastLessons = await agent.memory.getRelevantLessons(task);
  const result = await agent.execute(task, { context: pastLessons });
  if (!result.success) {
    const lesson = await agent.reflect(task, result);
    await agent.memory.saveLesson(lesson);
    return reflexionLoop(agent, task); // Retry com novo conhecimento
  }
  return result.output;
}
```

## Estratégias de Persistência

| Tipo | Storage | Acesso | Uso |
|------|---------|--------|-----|
| Curto prazo | In-memory | Direto | Conversa atual |
| Longo prazo (fatos) | Postgres | Query | Perfil do aluno |
| Longo prazo (semântica) | pgvector | Similaridade | Busca contextual |
| Episódica | Postgres + vector | Híbrido | Aprender com passado |

## Conexão com o Holocron

- **Curto prazo**: histórico da conversa no state do LangGraph
- **Longo prazo**: perfil do aluno em Postgres
- **Episódica**: sessões de estudo passadas
- **Reflection**: valida explicações antes de entregar

## Referências

- [Shinn et al. — Reflexion (2023)](https://arxiv.org/abs/2303.11366)
- [Park et al. — Generative Agents (2023)](https://arxiv.org/abs/2304.03442)
- [LangGraph — Memory Guide](https://langchain-ai.github.io/langgraph/concepts/memory/)
