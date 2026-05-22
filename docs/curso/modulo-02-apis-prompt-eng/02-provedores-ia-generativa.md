---
titulo: "Principais Provedores de IA Generativa"
modulo: 2
unidade: 2
tags: [openai, anthropic, huggingface, gemini, google, aws-bedrock, provedores, comparativo]
dificuldade: iniciante
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Principais Provedores de IA Generativa

## OpenAI

### Modelos principais

| Modelo | Uso | Context Window | Custo (input/output por 1M tokens) |
|--------|-----|----------------|-------------------------------------|
| GPT-4o | General purpose, multimodal | 128K | ~$2.50 / $10.00 |
| GPT-4o-mini | Tarefas simples, alto volume | 128K | ~$0.15 / $0.60 |
| o1 / o3 | Raciocínio complexo, código | 200K | ~$15.00 / $60.00 |

### Pontos fortes
- Ecossistema maduro (SDK, playground, fine-tuning)
- Function calling robusto
- Assistants API com threads e file search
- Maior comunidade e documentação

### Pontos fracos
- Vendor lock-in forte
- Rate limits restritivos em tiers baixos

```typescript
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'Você é um assistente técnico.' },
    { role: 'user', content: 'Explique RAG em 3 frases.' }
  ],
  temperature: 0.3,
  max_tokens: 200
});
```

## Anthropic (Claude)

### Modelos principais

| Modelo | Uso | Context Window | Custo (input/output por 1M tokens) |
|--------|-----|----------------|-------------------------------------|
| Claude Sonnet 4 | Melhor custo-benefício | 200K | ~$3.00 / $15.00 |
| Claude Opus 4 | Tarefas complexas | 200K | ~$15.00 / $75.00 |
| Claude Haiku | Alta velocidade, baixo custo | 200K | ~$0.25 / $1.25 |

### Pontos fortes
- Context window enorme (200K tokens)
- Constitutional AI — menos alucinações
- Extended thinking para raciocínio step-by-step

### Pontos fracos
- Ecossistema menor que OpenAI
- Mais conservador em respostas

```typescript
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const response = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 200,
  system: 'Você é um assistente técnico.',
  messages: [{ role: 'user', content: 'Explique RAG em 3 frases.' }]
});
```

## Google (Gemini)

| Modelo | Context Window | Diferencial |
|--------|----------------|-------------|
| Gemini 2.5 Pro | 1M tokens | Maior context window do mercado |
| Gemini 2.5 Flash | 1M tokens | Baixa latência |

### Pontos fortes
- Context window de 1M tokens
- Multimodal nativo (texto, imagem, áudio, vídeo)
- Grounding com Google Search

### Pontos fracos
- API menos estável (mudanças frequentes)
- Menos adoção enterprise

## HuggingFace

Plataforma open-source — não é um provedor único, mas um ecossistema.

| Produto | Uso |
|---------|-----|
| Hub | Repositório de 500K+ modelos |
| Inference API | Hosting de modelos open-source |
| TGI | Server otimizado para LLMs |

**Modelos relevantes:** Llama 3 (Meta), Mistral/Mixtral, CodeLlama, Whisper

**Quando usar:** Self-hosting (compliance), custo zero de API, fine-tuning com controle total.

## AWS Bedrock (Meta-provedor)

Serviço gerenciado da AWS com acesso a múltiplos foundation models via API unificada. **Usado na Hotmart via AI Gateway.**

Modelos disponíveis: Claude (Anthropic), Llama (Meta), Titan (Amazon), Mistral.

## Árvore de Decisão

- Dados sensíveis → Self-host (HuggingFace) ou Bedrock
- Código → OpenAI (o3) ou Claude Sonnet
- Texto longo → Claude (200K) ou Gemini (1M)
- Multimodal → Gemini ou GPT-4o
- Alto volume, baixo custo → GPT-4o-mini ou Haiku
- Multi-provider → Gateway (Bedrock, LiteLLM, Hotmart AI Gateway)

## Conexões

- → [Unidade 1: Mercado](01-panorama-mercado-ia-servico.md) — Contexto de negócio
- → [Unidade 4: Custo-eficiência](04-consistencia-custo-eficiencia.md) — Otimização por provedor
- → [Unidade 6: Integração backend](06-integracao-ia-backend.md) — Implementação prática
