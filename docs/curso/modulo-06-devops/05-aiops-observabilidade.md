---
titulo: "AIOps e Observabilidade"
modulo: 6
unidade: 5
tags: [aiops, observabilidade, promql, logql, grafana, anomalias, alertas-preditivos]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# AIOps e Observabilidade

## Objetivos de Aprendizagem

- Gerar queries PromQL/LogQL a partir de linguagem natural
- Construir dashboards Grafana programaticamente com IA
- Implementar detecção de anomalias em métricas de infraestrutura
- Criar alertas preditivos que antecipam problemas

## Conceitos-Chave

### NL → PromQL/LogQL

| Pergunta Natural | PromQL |
|-----------------|--------|
| "p99 de latência do gateway?" | `histogram_quantile(0.99, rate(http_duration_seconds_bucket{service="gateway"}[5m]))` |
| "Erros 5xx nos últimos 30min?" | `sum(increase(http_requests_total{status=~"5.."}[30m]))` |
| "CPU por pod no namespace prod" | `sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="prod"}[5m]))` |

### Detecção de Anomalias

| Técnica | Quando Usar | Complexidade |
|---------|-------------|--------------|
| Z-Score | Métricas estacionárias | Baixa |
| Seasonal Decomposition | Padrões cíclicos | Média |
| Isolation Forest | Multi-dimensional | Média |
| Prophet/NeuralProphet | Forecasting + anomalia | Alta |
| Autoencoders | Padrões complexos | Alta |

### Alertas Preditivos

**Diferença fundamental:**
- **Reativo:** "CPU está em 95%" (já aconteceu)
- **Preditivo:** "CPU atingirá 95% em ~2h" (vai acontecer)

```
Série temporal → Forecasting (Prophet) → Projeção futura
    Projeção cruza threshold → Alerta preditivo com tempo estimado
```

### Dashboards Inteligentes

**Geração automática baseada em RED Metrics:**
- Rate: requests/segundo
- Errors: % de erros
- Duration: latência (p50, p95, p99)

## Exercício Prático

1. Construa um tradutor NL→PromQL com validação de sintaxe
2. Implemente detecção de anomalias com Isolation Forest em métricas CPU/Memory
3. Crie alertas preditivos usando Prophet para prever saturação de disco
4. Gere um dashboard Grafana completo a partir de um service name

## Conexões

- **Unidade 04:** Métricas alimentam troubleshooting
- **Unidade 09:** Métricas de custo para FinOps
- **Unidade 11:** Anomalias trigam auto-remediação
- **Hotmart:** NewRelic + Kibana + CloudWatch como fontes de dados
