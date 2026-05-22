---
titulo: "Estimativas e Previsões"
modulo: 7
unidade: 4
tags: [gestao-projetos, estimativas, previsoes, monte-carlo, custos, dados-historicos]
dificuldade: avancado
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Estimativas e Previsões

## Conceito Central

IA melhora estimativas de prazo e custo usando dados históricos, simulação Monte Carlo e análise de padrões — substituindo "achismo" por previsões probabilísticas com intervalos de confiança.

## Estimativa Baseada em Dados Históricos

```
Histórico de Tasks (Jira/Linear)
    ↓
[Feature Extraction] — tipo, complexidade, time, sprint
    ↓
[Similarity Engine] — encontra tasks similares passadas
    ↓
[Statistical Model] — distribuição de tempo real vs estimado
    ↓
[Prediction] — estimativa + intervalo de confiança
```

Métricas extraídas: cycle time, accuracy ratio (estimado/real), complexity proxy (SP, LOC), rework rate.

## Simulação Monte Carlo

```
Para cada task no projeto:
  1. Define distribuição (otimista, provável, pessimista)
  2. Roda 1000+ simulações
  3. Cada simulação sorteia duração de cada task
  4. Calcula data final em cada simulação
  
Resultado:
- P50 (50% chance): 15/março
- P75 (75% chance): 22/março  
- P90 (90% chance): 02/abril
```

## Detecção de Viés do Time

IA identifica padrões de estimativa:

```
Análise do Time X (últimos 6 meses):
- Viés médio: +40% (subestimam consistentemente)
- Tasks de frontend: +20% de viés
- Tasks de integração: +65% de viés ← alerta
- Recomendação: Aplicar fator 1.4x em estimativas brutas
```

## Estimativa de Custos

```
Custo Total = Σ (Horas × Rate) + Infra + Licenças + Buffer
```

| Complexidade | Horas típicas | Confiança |
|-------------|---------------|-----------|
| Trivial (1 SP) | 2-4h | Alta |
| Simples (2-3 SP) | 4-16h | Alta |
| Médio (5 SP) | 16-40h | Média |
| Complexo (8 SP) | 40-80h | Baixa |
| Épico (13+ SP) | 80-200h | Muito baixa → decompor |

## Exercício Prático

1. Exporte histórico de 3 sprints do seu time
2. Calcule accuracy ratio (estimado/real)
3. Identifique viés por tipo de task
4. Aplique Monte Carlo no próximo milestone
5. Compare P50 vs deadline prometido

## Armadilhas Comuns

- ❌ Usar média sem intervalo de confiança
- ❌ Ignorar viés histórico do time
- ❌ Monte Carlo com inputs inventados (garbage in, garbage out)
- ❌ Apresentar P50 como "a data" sem explicar probabilidade

## Conexões

- [[03-cronograma-capacidade]] — Estimativas alimentam cronograma
- [[05-riscos-mitigacoes]] — Alta variância = risco
- [[07-status-reports]] — Previsões entram no report
