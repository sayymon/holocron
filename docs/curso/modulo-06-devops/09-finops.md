---
titulo: "FinOps com IA"
modulo: 6
unidade: 9
tags: [finops, infracost, rightsizing, spot, zombie-resources, forecasting, custos]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# FinOps com IA

## Objetivos de Aprendizagem

- Integrar Infracost com IA para estimativa e otimização de custos
- Implementar rightsizing automático baseado em métricas de uso
- Detectar e eliminar zombie resources com agentes
- Construir forecasting de custos com modelos preditivos

## Conceitos-Chave

### Infracost + IA

```
Terraform Plan → Infracost (estimativa) → LLM analisa
                                              ↓
              Sugestões de otimização → PR comment com alternativas
              "Essa instância m5.xlarge custa $140/mês. Uso médio: 15% CPU.
               Sugestão: m5.large ($70/mês) ou spot ($42/mês)"
```

### Rightsizing Automático

| Recurso | Métrica | Ação |
|---------|---------|------|
| EC2/Pods | CPU < 20% por 7d | Downsize |
| RDS | Connections < 10% capacity | Downsize |
| EBS | IOPS < 5% provisioned | Mudar tipo |
| ElastiCache | Memory < 30% | Downsize |

**Pipeline:**
```
Métricas de uso (14d) → Análise estatística → Recomendação
                                                    ↓
              Confidence > 90% → Auto-apply (non-prod)
              Confidence < 90% → Recomendação para humano
```

### Zombie Resources

**Detecção de recursos órfãos:**
- Load Balancers sem targets
- EBS volumes unattached
- Elastic IPs não associados
- Security Groups sem uso
- Snapshots antigos (> 90d)

**Agente de limpeza:**
```
Scan periódico → Identifica zombies → Valida com owner (tag)
                                           ↓
              Sem owner → Alerta → 7d sem resposta → Terminate
              Com owner → Notifica → Aguarda decisão
```

### Forecasting de Custos

**Modelos aplicáveis:**
- Prophet para sazonalidade (Black Friday, lançamentos)
- Linear regression para crescimento orgânico
- Anomaly detection para spikes inesperados

```
Histórico de billing → Feature engineering → Modelo → Projeção 30/60/90d
                                                          ↓
              Projeção > budget → Alerta preventivo + Sugestões de corte
```

## Exercício Prático

1. Integre Infracost em PR com comentários de otimização gerados por LLM
2. Implemente rightsizing automático para pods K8s baseado em métricas
3. Crie um agente que detecta e propõe eliminação de zombie resources
4. Construa forecasting de custos com alertas de budget

## Conexões

- **Unidade 02:** Custo estimado no momento da geração de IaC
- **Unidade 05:** Métricas de uso alimentam rightsizing
- **empresa:** Economia 11.4M BRL (2025), 73% infra idle, Karpenter
