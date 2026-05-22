---
titulo: "Boas Práticas de Consistência e Custo-Eficiência"
modulo: 2
unidade: 4
tags: [cache, tokens, custo, consistencia, reuso-contexto, otimizacao, rate-limiting]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Boas Práticas de Consistência e Custo-Eficiência

## Entendendo Tokens e Custos

### O que são tokens

- 1 token ≈ 4 caracteres em inglês, ≈ 3 caracteres em português
- Uma frase média: 15-25 tokens
- Custo = (tokens_input + tokens_output) × preço_por_token

### Calculando custo real

```typescript
function estimateCost(inputTokens: number, outputTokens: number, model: string) {
  const pricing: Record<string, { input: number; output: number }> = {
    'gpt-4o': { input: 2.5, output: 10.0 },       // por 1M tokens
    'gpt-4o-mini': { input: 0.15, output: 0.60 },
    'claude-sonnet': { input: 3.0, output: 15.0 },
    'claude-haiku': { input: 0.25, output: 1.25 },
  };
  const p = pricing[model];
  return (inputTokens * p.input + outputTokens * p.output) / 1_000_000;
}
```

## Estratégias de Cache

### 1. Semantic Cache

Cachear respostas para perguntas semanticamente similares.

```typescript
import { createHash } from 'crypto';

class SemanticCache {
  private cache: Map<string, { response: string; embedding: number[] }> = new Map();

  async get(query: string, threshold = 0.92): Promise<string | null> {
    const queryEmbedding = await embed(query);
    for (const [, entry] of this.cache) {
      if (cosineSimilarity(queryEmbedding, entry.embedding) > threshold) {
        return entry.response;
      }
    }
    return null;
  }

  async set(query: string, response: string) {
    const embedding = await embed(query);
    const key = createHash('md5').update(query).digest('hex');
    this.cache.set(key, { response, embedding });
  }
}
```

### 2. Prompt Cache (Anthropic)

Claude cacheia automaticamente prefixos longos de system prompts — reutilize o mesmo system prompt para economizar.

### 3. Response Cache por Hash

Para queries determinísticas (temperature=0), cachear por hash exato.

```typescript
const cacheKey = createHash('sha256')
  .update(JSON.stringify({ model, messages, temperature }))
  .digest('hex');

const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);
```

## Reuso de Contexto

### Prefixo compartilhado

Manter system prompt + contexto base fixos, variando apenas a query do usuário.

```typescript
const BASE_MESSAGES = [
  { role: 'system', content: SYSTEM_PROMPT },        // ~500 tokens (cacheável)
  { role: 'user', content: CONTEXT_DOCUMENT },       // ~2000 tokens (cacheável)
  { role: 'assistant', content: 'Entendido.' },
];

// Cada nova query adiciona apenas a pergunta
const messages = [...BASE_MESSAGES, { role: 'user', content: userQuery }];
```

### Sliding Window para conversas longas

```typescript
function trimConversation(messages: Message[], maxTokens: number): Message[] {
  const system = messages[0]; // Sempre manter system
  let remaining = messages.slice(1);
  let totalTokens = countTokens(system.content);

  const kept: Message[] = [];
  for (let i = remaining.length - 1; i >= 0; i--) {
    const msgTokens = countTokens(remaining[i].content);
    if (totalTokens + msgTokens > maxTokens) break;
    totalTokens += msgTokens;
    kept.unshift(remaining[i]);
  }
  return [system, ...kept];
}
```

## Consistência de Respostas

### Temperature e Top-P

| Parâmetro | Valor | Efeito |
|-----------|-------|--------|
| temperature: 0 | Determinístico | Sempre mesma resposta |
| temperature: 0.3 | Levemente criativo | Bom para produção |
| temperature: 0.7 | Criativo | Brainstorming |
| temperature: 1.0 | Muito variável | Geração criativa |

### Seed para reprodutibilidade

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  seed: 42,           // Mesma seed = mesma resposta (best effort)
  temperature: 0,
  messages
});
```

### Validação de output

```typescript
import { z } from 'zod';

const ResponseSchema = z.object({
  resposta: z.string().min(10),
  confianca: z.number().min(0).max(1),
  fontes: z.array(z.string())
});

function validateLLMResponse(raw: string) {
  const parsed = JSON.parse(raw);
  return ResponseSchema.parse(parsed); // Throws se inválido
}
```

## Rate Limiting e Retry

```typescript
import pRetry from 'p-retry';

async function callWithRetry(fn: () => Promise<any>) {
  return pRetry(fn, {
    retries: 3,
    onFailedAttempt: (error) => {
      if (error.message.includes('429')) {
        // Rate limited — esperar mais
        return new Promise(r => setTimeout(r, 60_000));
      }
    }
  });
}
```

## Checklist de Otimização

- [ ] Modelo certo para a tarefa (não usar GPT-4o para classificação simples)
- [ ] Cache implementado (semantic ou hash)
- [ ] System prompt otimizado (sem tokens desnecessários)
- [ ] max_tokens definido (evitar respostas longas demais)
- [ ] Monitoramento de custo por feature/endpoint
- [ ] Alertas de gasto anômalo

## Conexões

- → [Unidade 2: Provedores](02-provedores-ia-generativa.md) — Preços por modelo
- → [Unidade 5: RAG](05-rag-avancado-pratica.md) — Cache de embeddings
- → [Unidade 6: Backend](06-integracao-ia-backend.md) — Implementação em produção
