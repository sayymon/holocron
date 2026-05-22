---
titulo: "Integração de Lógica de IA no Cliente/Servidor"
modulo: 5
unidade: 5
tags: [firebase, ai-logic, busca-semantica, chatbot, rag, backend-ia]
dificuldade: avançado
fonte: "Curso Engenharia de IA Aplicada — Módulo 05"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Integração de Lógica de IA no Cliente/Servidor

## Contexto

Interfaces inteligentes precisam de lógica de IA no backend (e às vezes no cliente). Firebase AI Logic, busca semântica com [[rag]] e chatbots embarcados são padrões para entregar experiências AI-powered em produção.

## Firebase AI Logic

Firebase AI Logic (anteriormente Vertex AI in Firebase) permite chamar modelos generativos diretamente do cliente ou de Cloud Functions:

### Arquitetura

```
Cliente (Web/Mobile)
    ↓ Firebase SDK
Firebase AI Logic (proxy seguro)
    ↓
Gemini / Vertex AI (modelo)
    ↓
Resposta → Cliente
```

### Vantagens

- **Sem backend custom** — SDK direto do cliente
- **Segurança** — App Check + Firebase Auth protegem chamadas
- **Multimodal** — texto, imagem, áudio, vídeo
- **Streaming** — respostas em tempo real
- **Grounding** — Google Search como fonte de verdade

### Exemplo Conceitual

```typescript
import { getGenerativeModel } from "firebase/ai";

const model = getGenerativeModel(ai, { model: "gemini-2.0-flash" });

const result = await model.generateContent(
  "Resuma os principais pontos deste documento para um iniciante"
);
```

## Busca Semântica

A [[busca-semantica]] vai além de keywords — entende intenção e significado:

### Pipeline

```
Documento → Chunking → Embedding → Vector Store
                                        ↓
Query do usuário → Embedding → Similarity Search → Contexto → LLM → Resposta
```

### Implementação com Firebase

| Componente | Tecnologia |
|------------|-----------|
| Vector Store | Firestore + Vector Search |
| Embeddings | Vertex AI Embeddings |
| Orquestração | Cloud Functions |
| Frontend | Firebase SDK + streaming |

### Alternativas

| Stack | Quando usar |
|-------|-------------|
| Firestore Vectors | Já usa Firebase, escala moderada |
| [[pgvector]] | Postgres existente, controle total |
| Pinecone | Escala massiva, managed |
| Weaviate | Open-source, self-hosted |

## Chatbots em Interfaces

### Padrões de Integração

1. **Widget embarcado** — chat flutuante na página
2. **Inline** — chat como seção da UI
3. **Conversacional** — toda a interface é chat-first
4. **Híbrido** — UI tradicional + assistente contextual

### Componentes de um Chatbot Produção

```
UI (React) → API Route → Orquestrador → LLM
                              ↓
                    Tools (busca, ações, DB)
                              ↓
                    Memória (histórico, contexto)
```

### Boas Práticas para Chatbots

1. **Streaming obrigatório** — UX de espera é inaceitável
2. **Fallback gracioso** — quando a IA não sabe, direcione
3. **Contexto limitado** — não envie tudo, envie o relevante ([[rag]])
4. **Feedback loop** — thumbs up/down para melhorar
5. **Rate limiting** — proteja contra abuso
6. **Guardrails** — filtre conteúdo inadequado

## Padrão Cliente vs Servidor

| Aspecto | Client-side | Server-side |
|---------|-------------|-------------|
| Latência | Menor (direto) | Maior (hop extra) |
| Segurança | Menor (API key exposta) | Maior (secrets no server) |
| Controle | Menor | Total (logs, cache, retry) |
| Custo | Difícil de controlar | Gerenciável |
| Complexidade | Menor | Maior |

**Recomendação:** Use Firebase AI Logic para prototipação e apps simples. Para produção com requisitos de segurança e controle, prefira server-side com Cloud Functions ou backend dedicado.

## Conexões

- [[rag]] — padrão para busca semântica e contexto
- [[busca-semantica]] — fundamento da recuperação inteligente
- [[firebase]] — plataforma de integração
- [[llm-gateway]] — abstração de providers em produção
- [[streaming]] — padrão de UX para respostas de IA
- [[agentes-de-ia]] — chatbots avançados são agentes
- [[pgvector]] — alternativa para vector store
