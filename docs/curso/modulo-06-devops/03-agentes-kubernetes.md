---
titulo: "Agentes para Kubernetes"
modulo: 6
unidade: 3
tags: [kubernetes, agentes, yaml, hpa, vpa, rollout, rollback, gitops, argocd]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Agentes para Kubernetes

## Objetivos de Aprendizagem

- Construir agentes que geram e validam manifests YAML
- Implementar auto-scaling inteligente com HPA/VPA assistido por IA
- Automatizar rollout/rollback com decisão baseada em métricas
- Integrar com GitOps (ArgoCD) para deploy seguro

## Conceitos-Chave

### Agente K8s — Arquitetura

```
User Intent → Agent Core → Tool Selection
                              ├── kubectl_tool (read-only)
                              ├── manifest_generator
                              ├── metrics_analyzer
                              ├── argocd_tool
                              └── approval_gate
```

### Geração de Manifests YAML

**Validação em camadas:**
1. Sintaxe YAML válida
2. Schema K8s (kubeconform)
3. Políticas OPA/Kyverno
4. Dry-run no cluster (`kubectl apply --dry-run=server`)

### Auto-Scaling Inteligente

| Tipo | Métrica | IA Adiciona |
|------|---------|-------------|
| HPA | CPU/Memory/Custom | Predição de carga (time-series) |
| VPA | Histórico de uso | Rightsizing com confidence interval |
| KEDA | Event-driven | Correlação eventos → scaling |

### Rollout/Rollback Automatizado

**Estratégias suportadas:**
- **Canary:** Deploy gradual (5% → 25% → 50% → 100%)
- **Blue/Green:** Switch instantâneo com rollback rápido
- **Progressive:** Baseado em SLOs (error rate < 0.1%, p99 < 500ms)

**Decisão de rollback por IA:**
```
Métricas pós-deploy → Anomaly Detection → Score de saúde
    Score < threshold → Rollback automático
    Score > threshold → Promote para próximo estágio
```

### Integração GitOps

```
Agent gera manifest → PR no Git → ArgoCD detecta → Sync
                          ↓
                    Review automático (OPA + LLM)
                          ↓
                    Aprovação humana (se crítico)
```

## Exercício Prático

1. Crie um agente que gera Deployments, Services e Ingress a partir de descrição NL
2. Implemente um advisor de HPA que analisa métricas e sugere configuração
3. Construa um rollback automático baseado em error rate pós-deploy
4. Integre com ArgoCD para GitOps completo

## Conexões

- **Unidade 02:** Helm charts do IaC Copilot deployados aqui
- **Unidade 05:** Métricas de observabilidade alimentam decisões de scaling
- **Hotmart:** 60 clusters K8s, Karpenter, ArgoCD como padrão
