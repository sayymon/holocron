---
titulo: "OpenRouter — Proxy Multi-Provider para LLMs"
modulo: 2
unidade: 10
tags: [openrouter, proxy, gateway, fallback, streaming, multi-provider, llm-router, modelos-gratuitos]
dificuldade: iniciante
fonte: "Aula presencial — Curso Engenharia de IA Aplicada"
atualizado_em: 2026-08-08
confiabilidade: alta
---

# OpenRouter — Proxy Multi-Provider para LLMs

## O que é

OpenRouter é um **proxy/gateway unificado** que dá acesso a centenas de modelos de IA (OpenAI, Anthropic, Google, Meta, Mistral, etc.) através de uma única API compatível com o padrão OpenAI (`/v1/chat/completions`).

Diferente de usar cada provedor diretamente, o OpenRouter atua como intermediário inteligente com funcionalidades de roteamento, fallback e observabilidade.

## Proposta de Valor

| Feature | Descrição |
|---------|-----------|
| **API unificada** | Uma única key para acessar 200+ modelos |
| **Fallback automático** | Se um provider cai, redireciona para outro |
| **Modelos gratuitos** | Vários modelos free-tier (Gemma, Llama, etc.) |
| **Revogação automática de keys** | GitHub hook expira key se detectada em commit |
| **Streaming nativo** | Suporte a SSE (Server-Sent Events) |
| **Reasoning tokens** | Suporte a modelos com chain-of-thought |
| **Compatibilidade OpenAI** | Drop-in replacement — mesma interface |

## Segurança — Revogação Automática de Keys

O OpenRouter integra com o GitHub Secret Scanning. Se uma key for commitada acidentalmente:

1. GitHub detecta o padrão da key no push
2. Envia webhook para o OpenRouter
3. OpenRouter **expira a key automaticamente**

Isso evita uso malicioso de credenciais vazadas — mas a key precisa ser regenerada manualmente depois.

> ⚠️ Mesmo com essa proteção, **nunca suba keys em código**. Use variáveis de ambiente.

## Modelos Disponíveis

### Modelos Gratuitos (free tier)

Ideais para aprendizado, prototipação e testes:

- `google/gemma-4-26b-a4b-it:free`
- `meta-llama/llama-3.1-8b-instruct:free`
- `mistralai/mistral-7b-instruct:free`

### Modelos Pagos (estado da arte)

Para produção e tarefas complexas:

- `anthropic/claude-sonnet-4`
- `openai/gpt-4o`
- `google/gemini-2.5-pro`
- `deepseek/deepseek-r1`

## Chamada via cURL

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "HTTP-Referer: http://localhost:8080" \
  -H "X-Title: Teste Gemma" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{
    "model": "google/gemma-4-26b-a4b-it:free",
    "messages": [
      {
        "role": "user",
        "content": "Explique o que é RAG em 3 frases."
      }
    ],
    "reasoning": {
      "enabled": true
    }
  }'
```

### Headers importantes

| Header | Obrigatório | Descrição |
|--------|-------------|-----------|
| `Authorization` | ✅ | Bearer token com a API key |
| `HTTP-Referer` | Recomendado | URL da aplicação (analytics) |
| `X-Title` | Recomendado | Nome da aplicação (dashboard) |
| `Content-Type` | ✅ | `application/json` |

## Streaming com SDK TypeScript

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

const stream = await openrouter.chat.send({
  chatRequest: {
    model: "google/gemma-4-26b-a4b-it:free",
    messages: [
      { role: "user", content: "How many r's are in the word 'strawberry'?" }
    ],
    stream: true
  }
});

let response = "";

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    response += content;
    process.stdout.write(content);
  }

  // Usage info vem no chunk final
  if (chunk.usage) {
    console.log(
      "\nReasoning tokens:",
      chunk.usage.completionTokensDetails?.reasoningTokens
    );
  }
}
```

### Pacote npm

```bash
npm install @openrouter/sdk
```

## Compatibilidade com OpenAI SDK

Como a API é compatível, também funciona com o SDK padrão da OpenAI apontando para o base URL do OpenRouter:

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:8080',
    'X-Title': 'Meu App'
  }
});

const response = await client.chat.completions.create({
  model: 'google/gemma-4-26b-a4b-it:free',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

## Reasoning (Chain-of-Thought)

Modelos que suportam raciocínio explícito podem ser ativados com:

```json
{
  "reasoning": {
    "enabled": true
  }
}
```

Os tokens de raciocínio aparecem no campo `usage.completionTokensDetails.reasoningTokens` do response.

## Quando Usar OpenRouter

| Cenário | Recomendação |
|---------|-------------|
| Prototipação rápida | ✅ Modelos free, zero setup |
| Comparar modelos | ✅ Troca de modelo = trocar string |
| Produção com fallback | ✅ Resiliência multi-provider |
| Aulas e workshops | ✅ Sem custo, fácil demonstrar |
| Enterprise com compliance | ⚠️ Avaliar — dados passam pelo proxy |
| Hotmart (produção) | ❌ Usar AI Gateway v2 interno |

## OpenRouter vs Outros Gateways

| Gateway | Tipo | Diferencial |
|---------|------|-------------|
| **OpenRouter** | SaaS público | Modelos free, fallback, facilidade |
| **LiteLLM** | Self-hosted | Controle total, sem intermediário |
| **AWS Bedrock** | Cloud managed | Compliance, dados na AWS |
| **Hotmart AI Gateway** | Interno | Multi-provider via Bedrock, LangFuse integrado |

## Conexões

- → [[02-provedores-ia-generativa]] — Provedores individuais que o OpenRouter agrega
- → [[04-consistencia-custo-eficiencia]] — Otimização de custos com roteamento
- → [[06-integracao-ia-backend]] — Implementação em aplicações reais
- → [[mapa-ecossistema-ai-ferramentas-2026]] — Posicionamento no ecossistema
