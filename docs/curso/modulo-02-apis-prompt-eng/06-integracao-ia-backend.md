---
titulo: "Integração de IA ao Back-end"
modulo: 2
unidade: 6
tags: [backend, openai, fastify, api, streaming, middleware, producao]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Integração de IA ao Back-end

## Arquitetura de Referência

```
┌─────────┐     ┌──────────┐     ┌───────────┐     ┌─────────┐
│ Frontend │────▶│ API (BFF)│────▶│ AI Service│────▶│ OpenAI  │
└─────────┘     └──────────┘     └───────────┘     └─────────┘
                      │                  │
                      ▼                  ▼
                ┌──────────┐     ┌───────────┐
                │  Cache   │     │ LangFuse  │
                └──────────┘     └───────────┘
```

## Projeto Prático: API com Fastify + OpenAI

### Setup

```typescript
// src/server.ts
import Fastify from 'fastify';
import { aiRoutes } from './routes/ai';

const app = Fastify({ logger: true });

app.register(aiRoutes, { prefix: '/api/ai' });

app.listen({ port: 3000, host: '0.0.0.0' });
```

### Rota de Completion

```typescript
// src/routes/ai.ts
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AIService } from '../services/ai';

const CompletionSchema = z.object({
  prompt: z.string().min(1).max(5000),
  model: z.enum(['gpt-4o', 'gpt-4o-mini']).default('gpt-4o-mini'),
  temperature: z.number().min(0).max(1).default(0.3)
});

export async function aiRoutes(app: FastifyInstance) {
  const aiService = new AIService();

  app.post('/completion', async (request, reply) => {
    const body = CompletionSchema.parse(request.body);
    const result = await aiService.complete(body);
    return reply.send(result);
  });

  app.post('/completion/stream', async (request, reply) => {
    const body = CompletionSchema.parse(request.body);
    reply.raw.writeHead(200, { 'Content-Type': 'text/event-stream' });
    
    for await (const chunk of aiService.streamComplete(body)) {
      reply.raw.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    reply.raw.end();
  });
}
```

### Service Layer

```typescript
// src/services/ai.ts
import OpenAI from 'openai';
import { Redis } from 'ioredis';
import { createHash } from 'crypto';

export class AIService {
  private client: OpenAI;
  private cache: Redis;

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.cache = new Redis(process.env.REDIS_URL);
  }

  async complete(params: { prompt: string; model: string; temperature: number }) {
    // Check cache
    const cacheKey = this.buildCacheKey(params);
    const cached = await this.cache.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const response = await this.client.chat.completions.create({
      model: params.model,
      temperature: params.temperature,
      messages: [{ role: 'user', content: params.prompt }]
    });

    const result = {
      content: response.choices[0].message.content,
      usage: response.usage,
      model: response.model
    };

    // Cache por 1h se temperature=0
    if (params.temperature === 0) {
      await this.cache.setex(cacheKey, 3600, JSON.stringify(result));
    }
    return result;
  }

  async *streamComplete(params: { prompt: string; model: string; temperature: number }) {
    const stream = await this.client.chat.completions.create({
      model: params.model,
      temperature: params.temperature,
      messages: [{ role: 'user', content: params.prompt }],
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) yield { content };
    }
  }

  private buildCacheKey(params: Record<string, any>): string {
    return `ai:${createHash('sha256').update(JSON.stringify(params)).digest('hex')}`;
  }
}
```

## Patterns de Produção

### Circuit Breaker

```typescript
import CircuitBreaker from 'opossum';

const breaker = new CircuitBreaker(aiService.complete.bind(aiService), {
  timeout: 30000,
  errorThresholdPercentage: 50,
  resetTimeout: 60000
});

breaker.fallback(() => ({ content: 'Serviço temporariamente indisponível.', fallback: true }));
```

### Rate Limiting por usuário

```typescript
import rateLimit from '@fastify/rate-limit';

app.register(rateLimit, {
  max: 20,           // 20 requests
  timeWindow: 60000, // por minuto
  keyGenerator: (req) => req.headers['x-user-id'] as string
});
```

### Middleware de custo

```typescript
app.addHook('onResponse', async (request, reply) => {
  const usage = request.aiUsage; // Set pelo service
  if (usage) {
    await metrics.track({
      endpoint: request.url,
      model: usage.model,
      inputTokens: usage.prompt_tokens,
      outputTokens: usage.completion_tokens,
      cost: calculateCost(usage)
    });
  }
});
```

## Checklist de Produção

- [ ] Validação de input (Zod/Joi)
- [ ] Rate limiting por usuário/API key
- [ ] Circuit breaker com fallback
- [ ] Cache (Redis) para queries determinísticas
- [ ] Streaming para respostas longas
- [ ] Observabilidade (LangFuse + métricas de custo)
- [ ] Timeout configurável
- [ ] Retry com backoff exponencial
- [ ] Logs estruturados (sem PII)

## Conexões

- → [Unidade 4: Custo](04-consistencia-custo-eficiencia.md) — Cache e otimização
- → [Unidade 5: RAG](05-rag-avancado-pratica.md) — Integrar retrieval no backend
- → [Unidade 7: Multimodal](07-modelos-multimodais.md) — Endpoints multimodais
