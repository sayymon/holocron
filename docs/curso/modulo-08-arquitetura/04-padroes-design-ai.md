---
titulo: "Padrões de Design AI-Específicos"
modulo: 8
unidade: 4
tags: [rag, model-router, semantic-cache, human-in-the-loop, design-patterns]
dificuldade: avançado
fonte: "Curso Engenharia de IA Aplicada + RAG Survey (Gao et al. 2024) + Production AI patterns"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Padrões de Design AI-Específicos

## 1. RAG Patterns (Retrieval-Augmented Generation)

[[rag-retrieval-augmented-generation]] é o padrão mais importante para grounding de LLMs. Existem variações com trade-offs distintos.

### Naive RAG

```
[Query] → [Embed] → [Vector Search] → [Top-K docs] → [LLM + docs] → [Answer]
```

- Simples, funciona para 80% dos casos
- Problemas: chunks irrelevantes, falta de contexto, ranking ruim

### Advanced RAG

```
[Query] → [Query Transform] → [Hybrid Search] → [Rerank] → [LLM] → [Answer]
                                                     ↕
                                              [Metadata Filter]
```

**Melhorias sobre Naive:**
- **Query Transformation** — rewrite, decompose, HyDE
- **Hybrid Search** — vector + keyword (BM25) combinados
- **Reranking** — modelo cross-encoder reordena resultados
- **Metadata Filtering** — filtra por data, autor, tipo antes do search

### Modular RAG

```
[Query] → [Router] → [Strategy A: Simple RAG]
                   → [Strategy B: Multi-hop RAG]
                   → [Strategy C: No RAG needed]
```

- Router decide qual estratégia de RAG usar
- Queries simples não precisam de RAG complexo
- Queries multi-hop precisam de busca iterativa

### Agentic RAG

```
[Query] → [Agent] → [Decide: precisa buscar?]
                         ↓ Sim
              [Search] → [Evaluate] → [Enough?]
                              ↓ Não
                         [Refine query, search again]
```

- Agente decide SE, QUANDO e COMO buscar
- Pode fazer múltiplas buscas iterativas
- Auto-avalia se tem informação suficiente
- Padrão usado no [[holocron]] tutor

### Graph RAG

```
[Query] → [Entity Extraction] → [Graph Traversal] → [Subgraph] → [LLM] → [Answer]
```

- Usa knowledge graph ao invés de (ou além de) vectors
- Melhor para queries sobre relacionamentos
- Ex: "Quais times dependem do serviço X?" → graph traversal

## 2. Model Router

```
[Input] → [Classifier] → [Simple?] → [Model Lite] → [Output]
                              ↓ No
                       [Model Heavy] → [Output]
```

### Conceito

Nem toda query precisa do modelo mais caro/capaz. Um router classifica a complexidade e direciona para o modelo adequado.

### Estratégias de Roteamento

| Estratégia | Como funciona | Trade-off |
|------------|---------------|-----------|
| Rule-based | Regex, keywords, length | Rápido mas limitado |
| Classifier | Modelo leve classifica | Precisa de dados de treino |
| Cascade | Tenta lite primeiro, escala se falhar | Latência variável |
| Semantic | Embedding similarity com exemplos | Flexível mas mais lento |

### Cascade Pattern (mais comum)

```
1. Tenta modelo lite (Claude Haiku, GPT-4o-mini)
2. Avalia confiança da resposta
3. Se confiança < threshold → escala para modelo heavy
4. Retorna resposta do modelo que passou
```

**Economia típica:** 60-80% das queries resolvidas pelo modelo lite = 60-80% economia.

### Aplicação na empresa

O [[ai-gateway]] Gateway implementa model routing:
- Queries simples → modelos menores via Bedrock
- Queries complexas → Claude Sonnet/GPT-4
- Observabilidade via [[langfuse]] para ajustar thresholds

## 3. Semantic Cache

```
[Query] → [Embed] → [Cache Search (similarity)] → [Hit?] → [Return cached]
                                                      ↓ Miss
                                               [LLM] → [Cache Store] → [Return]
```

### Diferença vs Cache Tradicional

| Aspecto | Cache Tradicional | Semantic Cache |
|---------|-------------------|----------------|
| Key | Hash exato da query | Embedding da query |
| Match | Igualdade exata | Similaridade > threshold |
| Hit rate | Baixo (queries variam) | Alto (semântica similar) |
| Invalidação | TTL ou evento | TTL + drift detection |

### Quando funciona bem
- Queries frequentes com variações de wording
- "Como resetar senha?" ≈ "Esqueci minha senha" ≈ "Password reset"
- FAQs, suporte, perguntas repetitivas

### Quando NÃO usar
- Queries que dependem de contexto temporal ("vendas de hoje")
- Queries personalizadas (resposta varia por usuário)
- Domínios com dados que mudam frequentemente

### Implementação

```typescript
const cacheThreshold = 0.92; // similaridade mínima
const embedding = await embed(query);
const cached = await vectorStore.search(embedding, { threshold: cacheThreshold });

if (cached.length > 0) {
  return cached[0].response; // cache hit
}

const response = await llm.invoke(query);
await vectorStore.upsert({ embedding, response, timestamp: now() });
return response;
```

## 4. Human-in-the-Loop (HITL)

### Conceito

Humano participa do loop de decisão do agente em pontos críticos. Não é fallback — é design intencional.

### Padrões HITL

**Approval Gate** — humano aprova antes de executar:
```
[Agent decides action] → [Human: approve/reject/modify] → [Execute]
```

**Escalation** — agente reconhece seus limites:
```
[Agent tries] → [Confidence < threshold] → [Escalate to human]
```

**Feedback Loop** — humano corrige para melhorar:
```
[Agent responds] → [Human rates/corrects] → [Fine-tune/update prompts]
```

**Collaborative** — humano e agente trabalham juntos:
```
[Human drafts] → [Agent refines] → [Human approves] → [Publish]
```

### Quando inserir HITL

| Cenário | Padrão HITL | Exemplo |
|---------|-------------|---------|
| Ação irreversível | Approval Gate | Deletar dados, enviar email |
| Alta consequência | Approval Gate | Transação financeira |
| Baixa confiança | Escalation | Query ambígua |
| Aprendizado contínuo | Feedback Loop | Melhorar respostas |
| Criação de conteúdo | Collaborative | Blog posts, docs |

### HITL no [[chatbot-cx]]

```
1. Cliente pergunta algo
2. CAIO tenta resolver (RAG + knowledge base)
3. Se confiança < 70% → escalation para humano
4. Humano resolve → feedback alimenta knowledge base
5. Próxima query similar → CAIO resolve sozinho
```

## Combinando Padrões

Os padrões se compõem. Um sistema real usa vários:

```
[Query] → [Semantic Cache] → Hit? → Return
                ↓ Miss
         [Model Router] → [Lite/Heavy model]
                ↓
         [Agentic RAG] → [Search + Evaluate]
                ↓
         [HITL Gate] → [Confidence check]
                ↓
         [Response] → [Cache Store]
```

## Conexões

- [[rag-retrieval-augmented-generation]] — fundamentos de RAG
- [[vector-database]] — storage para semantic cache e RAG
- [[ai-gateway]] — implementa model router em produção
- [[langfuse]] — observabilidade para medir hit rates e qualidade
- [[chatbot-cx]] — exemplo real de HITL em produção
