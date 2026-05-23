---
titulo: "ChatOps com Aprovação Humana"
modulo: 6
unidade: 6
tags: [chatops, slack, discord, rbac, auditoria, hitl, aprovacao-humana]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# ChatOps com Aprovação Humana

## Objetivos de Aprendizagem

- Construir bots ChatOps para Slack/Discord com capacidades de IA
- Implementar fluxos de aprovação humana (HITL) para ações críticas
- Configurar RBAC granular para operações via chat
- Manter auditoria completa de todas as ações executadas

## Conceitos-Chave

### Classificação de Risco

| Nível | Exemplos | Fluxo |
|-------|----------|-------|
| Baixo | `status`, `logs`, `describe` | Execução direta |
| Médio | `scale`, `restart pod` | Confirmação do autor |
| Alto | `delete`, `apply`, `rollback` | Aprovação de N pessoas |
| Crítico | `delete namespace`, `drop db` | Aprovação + MFA + delay |

### RBAC para ChatOps

```yaml
roles:
  viewer:
    allowed: [status, logs, describe, metrics]
    environments: [dev, staging, production]
  operator:
    allowed: [scale, restart, rollout]
    environments: [dev, staging]
    requires_approval_for: [production]
  admin:
    allowed: [delete, apply, migrate]
    requires_approval_for: [production]
    min_approvers: 2
```

### Fluxo de Aprovação

```
Requisição → Validação RBAC → Approval Request
                                    ↓
              Notificação (thread) → Approvers votam
                                    ↓
              Quorum atingido → Execução → Resultado
              Timeout/Rejeição → Cancelamento
```

### Auditoria

```json
{
  "timestamp": "2026-05-22T10:30:00Z",
  "user": "saymon.silva",
  "channel": "#ops-production",
  "intent": "scale deployment",
  "risk_level": "medium",
  "approval": {"required": true, "approvers": ["lead-1"]},
  "result": "success"
}
```

## Exercício Prático

1. Crie um bot Slack que aceita comandos de infra em linguagem natural
2. Implemente RBAC com 3 níveis (viewer, operator, admin)
3. Construa fluxo de aprovação com timeout e escalação
4. Gere relatório de auditoria semanal com resumo de ações

## Conexões

- **Unidade 03:** Ações K8s executadas via ChatOps
- **Unidade 07:** RBAC alinhado com políticas de segurança
- **Unidade 11:** Auto-remediação com gate de aprovação humana
- **empresa:** JiraOps para gestão de incidentes, C3PO para comunicação
