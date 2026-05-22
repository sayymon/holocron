---
titulo: "Arquitetura Enterprise"
modulo: 8
unidade: 5
tags: [enterprise, api-gateway, kubernetes, observabilidade, model-tiering, produção]
dificuldade: avançado
fonte: "Curso Engenharia de IA Aplicada + Hotmart AI Platform + AWS Well-Architected AI/ML"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Arquitetura Enterprise

## Visão Geral

Levar IA de POC para produção enterprise exige resolver: escala, custo, observabilidade, governança e resiliência. Este documento cobre os padrões que fazem isso funcionar.

## 1. AI API Gateway

```
[Clients] → [API Gateway] → [Rate Limit] → [Auth] → [Route] → [Model Provider]
                  ↕                                        ↕
            [Observability]                          [Fallback Provider]
```

### Responsabilidades

| Função | Descrição |
|--------|-----------|
| Rate Limiting | Controle de tokens/min por tenant |
| Authentication | API keys, OAuth, RBAC |
| Routing | Direcionar para provider correto |
| Fallback | Se provider A falha → provider B |
| Cost Tracking | Tokens consumidos por team/projeto |
| Caching | [[semantic-cache]] centralizado |
| Guardrails | Filtros de input/output |
| Logging | Traces completos para auditoria |

### Implementação na Hotmart

O [[hotmart-ai-v2]] Gateway centraliza acesso a LLMs:
- Multi-provider via AWS Bedrock (Claude, GPT, Gemini)
- [[langfuse]] para observabilidade
- Cost allocation por squad
- Fallback automático entre providers

### Padrão Multi-Provider

```
[Request] → [Gateway] → [Primary: Claude Sonnet]
                              ↓ (timeout/error)
                         [Fallback 1: GPT-4]
                              ↓ (timeout/error)
                         [Fallback 2: Claude Haiku]
                              ↓ (all failed)
                         [Graceful degradation]
```

**Critérios de fallback:** timeout, rate limit, error 5xx, quality threshold.

## 2. Deploy em Kubernetes

### Arquitetura de Referência

```
┌─────────────────── K8s Cluster ───────────────────┐
│                                                     │
│  [Ingress] → [AI Service] → [AI Gateway] → [LLM]  │
│                    ↕                                │
│              [Vector DB]                            │
│              [Redis Cache]                          │
│              [Postgres]                             │
│                                                     │
│  [Worker Pods] → [Embedding Jobs]                   │
│  [CronJob] → [Index Refresh]                        │
└─────────────────────────────────────────────────────┘
```

### Considerações Específicas para AI Workloads

| Aspecto | Tradicional | AI Workload |
|---------|-------------|-------------|
| Scaling trigger | CPU/Memory | Queue depth + latência |
| Pod resources | Previsível | Variável (depende do prompt) |
| Timeout | 30s padrão | 120s+ para agentes complexos |
| Health check | /health 200 | + model connectivity check |
| Startup time | Segundos | Minutos (model loading) |

### Autoscaling para AI

```yaml
# HPA baseado em métricas custom
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  metrics:
  - type: External
    external:
      metric:
        name: queue_depth
      target:
        type: AverageValue
        averageValue: "5"  # scale quando fila > 5
```

### Canary Deployment para Prompts

Usando [[argocd]] para rollout gradual de mudanças de prompt:
```
v1 (prompt atual): 90% tráfego
v2 (prompt novo): 10% tráfego
→ Comparar métricas de qualidade
→ Se OK: progressive rollout
→ Se degradou: rollback automático
```

## 3. Observabilidade para IA

### As 4 Camadas

```
[Infra Metrics] → CPU, Memory, Network (CloudWatch, Prometheus)
[App Metrics] → Latência, Throughput, Errors (New Relic)
[LLM Metrics] → Tokens, Cost, Model, Latência por call (LangFuse)
[Quality Metrics] → Relevância, Groundedness, Helpfulness (Evals)
```

### Métricas Essenciais

| Métrica | O que mede | Alerta quando |
|---------|-----------|---------------|
| p95 latência | Experiência do usuário | > 10s |
| Token cost/day | Custo operacional | > budget |
| Cache hit rate | Eficiência do cache | < 30% |
| Hallucination rate | Qualidade | > 5% |
| Fallback rate | Saúde do provider | > 10% |
| HITL escalation rate | Capacidade do agente | > 30% |

### Stack de Observabilidade

```
[AI Service] → [LangFuse] → Traces, custos, qualidade LLM
            → [New Relic] → APM, distributed tracing
            → [Sentry] → Errors, exceptions
            → [Kibana] → Logs estruturados
            → [CloudWatch] → Métricas infra AWS
```

### Trace de um Request AI

```
Trace: user_query_123
├── [Gateway] 2ms - auth, rate check
├── [Semantic Cache] 15ms - miss
├── [Model Router] 5ms - classified as "complex"
├── [RAG Pipeline] 200ms
│   ├── [Embed Query] 50ms
│   ├── [Vector Search] 80ms - 10 results
│   └── [Rerank] 70ms - top 3
├── [LLM Call] 3200ms - Claude Sonnet, 1.2K tokens
├── [Guardrails] 50ms - passed
└── [Cache Store] 10ms
Total: 3.5s | Cost: $0.003 | Quality: 0.92
```

## 4. Model Tiering

### Conceito

Diferentes modelos para diferentes necessidades. Não usar canhão para matar mosca.

### Tiers Típicos

| Tier | Modelo | Custo | Uso |
|------|--------|-------|-----|
| Tier 1 (Lite) | Claude Haiku, GPT-4o-mini | $ | FAQ, classificação, extração simples |
| Tier 2 (Standard) | Claude Sonnet, GPT-4o | $$$ | Raciocínio, geração, análise |
| Tier 3 (Heavy) | Claude Opus, o1 | $$$$$ | Raciocínio complexo, code gen |
| Tier 0 (Embed) | text-embedding-3 | ¢ | Embeddings, similarity |

### Estratégia de Alocação

```
[Query] → [Complexity Classifier]
              ↓
         Score 1-3 → Tier 1 (60% das queries)
         Score 4-7 → Tier 2 (30% das queries)
         Score 8-10 → Tier 3 (10% das queries)
```

**Economia:** Se 60% vai para Tier 1 (30x mais barato que Tier 3), economia total ~70%.

## 5. Arquitetura Híbrida (Cloud + Edge)

### Quando Edge faz sentido para IA

| Cenário | Cloud | Edge |
|---------|-------|------|
| Latência crítica (<100ms) | ❌ | ✅ |
| Dados sensíveis (LGPD) | ⚠️ | ✅ |
| Offline capability | ❌ | ✅ |
| Modelo grande (>7B params) | ✅ | ❌ |
| Custo por inference | $$$ | $ (após setup) |

### Padrão Híbrido

```
[Device/Edge] → [Small Model: classificação, cache local]
       ↓ (quando precisa de mais)
[Cloud] → [Large Model: raciocínio complexo, RAG]
```

### Aplicação Prática

- **Mobile (Hotmart App):** modelo leve on-device para sugestões rápidas, cloud para respostas complexas
- **Embeddings:** podem rodar edge para reduzir latência de busca
- **Guardrails:** filtros simples edge, validação complexa cloud

## Checklist Enterprise

- [ ] API Gateway com rate limiting e auth
- [ ] Multi-provider com fallback automático
- [ ] Model tiering configurado
- [ ] Semantic cache ativo
- [ ] Observabilidade 4 camadas (infra, app, LLM, quality)
- [ ] Canary deployment para prompts
- [ ] Cost allocation por team
- [ ] [[guardrails]] de input/output
- [ ] Disaster recovery (provider down)
- [ ] Compliance (LGPD, dados sensíveis)

## Conexões

- [[hotmart-ai-v2]] — implementação real de AI Gateway
- [[argocd]] — GitOps e canary para AI services
- [[langfuse]] — observabilidade LLM
- [[kubernetes]] — orquestração de containers
- [[semantic-cache]] — otimização de custo e latência
- [[model-router]] — roteamento inteligente entre modelos
