---
titulo: "Gerenciamento de Contextos"
modulo: 4
unidade: 5
tags: [agentes, contexto, pruning, stitching, context-window, compartilhado]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 5 — Gerenciamento de Contextos

## Objetivo

Dominar técnicas para gerenciar a context window limitada do LLM: pruning, stitching e contexto compartilhado entre agentes.

## O Problema

LLMs têm context window finita (128K-200K tokens). Agentes de longa duração acumulam:
- Histórico de mensagens
- Resultados de ferramentas
- Planos e scratchpads
- Documentos recuperados (RAG)

Sem gerenciamento, o contexto estoura ou degrada a qualidade.

## Técnicas de Pruning (Poda)

### Sliding Window
Mantém apenas as N mensagens mais recentes.

```typescript
function slidingWindow(messages: Message[], maxTokens: number): Message[] {
  let total = 0;
  const kept: Message[] = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    total += countTokens(messages[i]);
    if (total > maxTokens) break;
    kept.unshift(messages[i]);
  }
  return kept;
}
```

### Summarization Pruning
Resume mensagens antigas em vez de descartá-las.

```typescript
async function summarizePrune(messages: Message[], llm: LLM) {
  const old = messages.slice(0, -10);
  const recent = messages.slice(-10);
  const summary = await llm.generate(`Resuma esta conversa: ${format(old)}`);
  return [{ role: "system", content: `Resumo: ${summary}` }, ...recent];
}
```

### Relevance Pruning
Mantém apenas mensagens relevantes ao objetivo atual.

```typescript
async function relevancePrune(messages: Message[], currentGoal: string, embedder) {
  const goalEmbedding = await embedder.embed(currentGoal);
  return messages.filter(m => {
    const sim = cosineSimilarity(goalEmbedding, m.embedding);
    return sim > 0.7;
  });
}
```

## Context Stitching (Costura)

Combina fragmentos de contexto de diferentes fontes em um prompt coerente.

```typescript
interface ContextStitch {
  systemPrompt: string;
  memoryContext: string;      // Resumo de memória longa
  ragContext: string;         // Documentos relevantes
  conversationHistory: Message[];
  currentTask: string;
}

function stitch(parts: ContextStitch): Message[] {
  return [
    { role: "system", content: parts.systemPrompt },
    { role: "system", content: `Memória: ${parts.memoryContext}` },
    { role: "system", content: `Contexto: ${parts.ragContext}` },
    ...parts.conversationHistory,
    { role: "user", content: parts.currentTask }
  ];
}
```

### Priorização de Contexto

Quando o espaço é limitado, priorize:
1. System prompt (identidade do agente)
2. Tarefa atual
3. Resultados de tools recentes
4. Memória relevante
5. Histórico de conversa (resumido)

## Contexto Compartilhado (Multi-Agent)

Em sistemas multi-agente, agentes precisam compartilhar contexto:

```typescript
interface SharedContext {
  blackboard: Record<string, any>;  // Estado compartilhado
  read(key: string): any;
  write(key: string, value: any): void;
  subscribe(key: string, callback: Function): void;
}
```

### Padrões
- **Blackboard**: espaço compartilhado de leitura/escrita
- **Message Passing**: agentes trocam mensagens explícitas
- **Shared Memory**: store externo (Redis, Postgres)

## Conexão com o Holocron

- Pruning por summarization no histórico de tutoria
- Stitching: combina perfil do aluno + RAG + conversa
- Contexto compartilhado entre agente tutor e agente de quiz

## Referências

- [LangChain — Conversation Memory](https://python.langchain.com/docs/modules/memory/)
- [Anthropic — Long Context Tips](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [MemGPT — Virtual Context Management](https://arxiv.org/abs/2310.08560)
