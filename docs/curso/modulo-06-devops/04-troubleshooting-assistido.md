---
titulo: "Troubleshooting Assistido"
modulo: 6
unidade: 4
tags: [troubleshooting, react, crashloopbackoff, logs, rca, root-cause, agentes]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Troubleshooting Assistido

## Objetivos de Aprendizagem

- Implementar agentes ReAct para diagnóstico de infraestrutura
- Resolver CrashLoopBackOff e outros estados de erro comuns
- Correlacionar logs multi-serviço para root cause analysis
- Construir árvores de decisão assistidas por IA

## Conceitos-Chave

### Padrão ReAct para Troubleshooting

```
Thought: Pod em CrashLoopBackOff. Preciso verificar logs.
Action: kubectl logs pod/api-server --previous
Observation: "Error: ECONNREFUSED 10.0.1.5:5432"
Thought: Conexão recusada ao Postgres. Verificar se DB está up.
Action: kubectl get pods -n database -l app=postgres
Observation: postgres-0 Running 1/1
Thought: DB up. Pode ser network policy bloqueando.
Action: kubectl get networkpolicy -n production
Observation: deny-all policy ativa
Diagnosis: NetworkPolicy deny-all impedindo conexão ao Postgres.
```

### Taxonomia de Erros K8s

| Estado | Causas Comuns | Diagnóstico |
|--------|---------------|-------------|
| CrashLoopBackOff | Config errada, deps faltando | logs, describe |
| ImagePullBackOff | Registry auth, imagem inexistente | describe, secrets |
| OOMKilled | Memory limit baixo | metrics, describe |
| Pending | Resources insuficientes | describe, events, nodes |
| Evicted | Node pressure | node conditions |

### Correlação de Logs

```
Alerta → Coleta de contexto temporal (±5min)
              ├── Logs do pod afetado
              ├── Logs de pods dependentes
              ├── Events do namespace
              ├── Métricas de infra
              └── Deploys recentes
                    ↓
         LLM correlaciona → Timeline → Root Cause
```

### Root Cause Analysis Automatizada

**Output estruturado:**
```json
{
  "symptom": "API 500 errors",
  "root_cause": "Memory leak in upload handler",
  "evidence": ["OOMKilled events", "memory growth pattern"],
  "fix": "Add stream cleanup in finally block",
  "prevention": "Add memory limit alerts at 80%"
}
```

## Exercício Prático

1. Implemente um agente ReAct com tools: `kubectl`, `logs`, `metrics`, `events`
2. Crie um banco de cenários de erro (CrashLoop, OOM, Pending, Network)
3. Construa um correlacionador de logs que gera timeline de incidente
4. Produza relatórios de RCA estruturados automaticamente

## Conexões

- **Unidade 03:** Erros de K8s diagnosticados aqui
- **Unidade 05:** Métricas de observabilidade como input
- **Unidade 10:** RCA alimenta base de post-mortems
- **empresa:** SARA resolve 27.5% dos tickets com abordagem similar
