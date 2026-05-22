---
titulo: "System Design para IA"
modulo: 12
unidade: 9
tags: [system-design, entrevista, arquitetura, escalabilidade, ia]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# System Design para IA

## Diferença do System Design Tradicional

| Tradicional | IA |
|-------------|-----|
| CRUD, APIs REST | Pipelines ML, inferência |
| Latência previsível | Latência variável (LLM: 1-30s) |
| Escala horizontal simples | GPU-bound, batching |
| Dados estáticos | Dados + modelos evoluem |

## Framework de Resolução (45 min)

```
1. REQUISITOS (5 min)
   - Funcionais: o que o sistema faz
   - Não-funcionais: latência, throughput, custo
   - Escala: usuários, requests/s, dados

2. DESIGN DE ALTO NÍVEL (10 min)
   - Diagrama de componentes
   - Fluxo de dados principal
   - Escolhas de tecnologia

3. DEEP DIVE (20 min)
   - Componente mais complexo
   - Trade-offs e alternativas
   - Failure modes e mitigações

4. WRAP-UP (10 min)
   - Limitações e melhorias futuras
   - Custos estimados
   - Monitoramento e observabilidade
```

## Problemas Comuns em Entrevistas de IA

| Problema | Componentes-Chave |
|----------|-------------------|
| "Design um chatbot RAG" | Ingestion, chunking, retrieval, generation, eval |
| "Design um sistema de recomendação" | Feature store, model serving, A/B testing |
| "Design um agente autônomo" | Orquestração, tools, guardrails, memory |
| "Design um pipeline de moderação" | Classificação, human review, feedback loop |

## Componentes Recorrentes

- **Model Serving** — latência, batching, caching, fallback
- **Vector Store** — indexação, busca, atualização incremental
- **Evaluation** — offline (benchmarks) + online (A/B, user feedback)
- **Guardrails** — input/output filtering, rate limiting
- **Observabilidade** — traces, custos, qualidade ([[langfuse]])

## Dicas

- Sempre perguntar sobre **escala** e **custo** antes de desenhar
- Mencionar **trade-offs** explicitamente (não existe solução perfeita)
- Considerar **failure modes** (LLM down, latência alta, hallucination)
- Mostrar conhecimento de **ferramentas reais** (não só teoria)

## Conexões

- [[12-08-live-coding]] — system design complementa coding
- [[12-10-explicar-decisoes-tecnicas]] — justificar escolhas no design
- [[11-01-ideacao-arquitetura]] — prática de arquitetura no capstone
- [[modulo-08-arquitetura-ia]] — fundamentos de arquitetura
