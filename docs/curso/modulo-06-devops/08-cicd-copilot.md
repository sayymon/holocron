---
titulo: "CI/CD Copilot"
modulo: 6
unidade: 8
tags: [cicd, pipelines, gates, sast, dast, canary, rollback, github-actions]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# CI/CD Copilot

## Objetivos de Aprendizagem

- Gerar e otimizar pipelines CI/CD com assistência de IA
- Implementar quality gates inteligentes com decisão por LLM
- Integrar SAST/DAST com análise e priorização automática
- Automatizar canary deployments com rollback baseado em métricas

## Conceitos-Chave

### Geração de Pipelines

**Input:** Descrição do projeto + stack + requisitos
**Output:** Pipeline completo (GitHub Actions, GitLab CI, etc.)

```
"API Node.js com Postgres, precisa de testes, lint, build Docker, deploy em K8s"
     ↓
LLM gera workflow YAML → Validação de sintaxe → Dry-run
```

### Quality Gates Inteligentes

| Gate | Critério | IA Adiciona |
|------|----------|-------------|
| Code Quality | Coverage > 80%, 0 critical | Análise de risco do diff |
| Security | 0 high CVEs | Priorização por exploitability |
| Performance | p99 < 500ms | Comparação com baseline |
| Compliance | Policies pass | Verificação de requisitos regulatórios |

### SAST/DAST com IA

```
Scan Results → Deduplicação → Priorização por risco real
                                      ↓
              LLM analisa contexto → False positive? → Remove
                                   → True positive? → Gera fix + PR
```

**Redução de ruído:** LLMs podem reduzir falsos positivos em 40-60% ao analisar contexto do código.

### Canary com Rollback Automático

```
Deploy canary (5%) → Coleta métricas (5min) → Análise
    ├── Healthy → Promote (25% → 50% → 100%)
    └── Unhealthy → Rollback automático + Notificação
```

**Métricas de decisão:**
- Error rate delta vs baseline
- Latência p99 delta
- Saturação de recursos
- Logs de erro novos (semantic diff)

## Exercício Prático

1. Crie um gerador de GitHub Actions a partir de descrição NL do projeto
2. Implemente quality gates que usam LLM para análise de risco do PR
3. Integre SAST (Semgrep) com filtro de falsos positivos por IA
4. Construa canary deployment com rollback automático baseado em SLOs

## Conexões

- **Unidade 03:** Deploy em K8s via ArgoCD
- **Unidade 07:** SAST/DAST como parte de segurança
- **empresa:** GitHub Actions (padrão), ArgoCD para canary
