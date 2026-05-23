---
titulo: "Auto-Remediação Segura"
modulo: 6
unidade: 11
tags: [auto-remediacao, playbooks, canary, circuit-breaker, dry-run, hitl, seguranca]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Auto-Remediação Segura

## Objetivos de Aprendizagem

- Construir playbooks de remediação executáveis por agentes
- Implementar padrão canary para ações de remediação
- Aplicar circuit breakers para evitar cascata de falhas
- Garantir segurança com dry-run e human-in-the-loop (HITL)

## Conceitos-Chave

### Playbooks de Remediação

```yaml
playbook: high-memory-pod
trigger: memory_usage > 90% for 5m
severity: medium
steps:
  - action: collect_diagnostics
    tool: kubectl top pods
  - action: check_recent_deploys
    tool: argocd app history
  - action: restart_pod
    requires_approval: false
    condition: "no recent deploy in 1h"
  - action: rollback_deploy
    requires_approval: true
    condition: "recent deploy correlates with issue"
escalation:
  timeout: 15m
  target: sre-oncall
```

### Padrão Canary para Remediação

**Princípio:** Nunca aplicar remediação em 100% de uma vez.

```
Problema detectado em N pods
     ↓
Remediação em 1 pod (canary) → Observa 5min
     ├── Melhorou? → Aplica em 25% → 50% → 100%
     └── Piorou? → Reverte canary → Escalação humana
```

### Circuit Breakers

**Proteções contra cascata:**

| Circuit Breaker | Condição | Ação |
|----------------|----------|------|
| Max actions/hour | > 10 remediações/h | Pausa + alerta humano |
| Blast radius | > 30% dos pods afetados | Requer aprovação |
| Repeated failure | Mesma ação falhou 2x | Escala para humano |
| Dependency check | Serviço crítico downstream | Modo read-only |

### Dry-Run Obrigatório

```
Ação planejada → Dry-run → Diff esperado
                              ↓
              Impacto aceitável? → Execução real
              Impacto alto? → Apresenta para humano
```

### HITL (Human-in-the-Loop)

**Matriz de decisão:**

| Severidade | Blast Radius | Confiança | Ação |
|-----------|--------------|-----------|------|
| Low | < 5% pods | > 95% | Auto-execute |
| Medium | < 20% pods | > 90% | Auto + notify |
| High | < 50% pods | > 80% | Require approval |
| Critical | Any | Any | Always human |

## Exercício Prático

1. Crie 5 playbooks de remediação para cenários comuns (OOM, disk full, high latency, cert expiry, connection pool)
2. Implemente canary pattern para ações de restart/scale
3. Construa circuit breakers com contadores e timeouts
4. Integre dry-run + HITL com notificação via Slack

## Conexões

- **Unidade 04:** Diagnóstico precede remediação
- **Unidade 06:** Aprovação humana via ChatOps
- **Unidade 10:** Runbooks como base dos playbooks
- **empresa:** Karpenter para scaling, ArgoCD para rollback
