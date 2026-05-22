---
titulo: "Priorização Inteligente de Backlog"
modulo: 7
unidade: 2
tags: [gestao-projetos, priorizacao, backlog, rice, wsjf, moscow, roadmap]
dificuldade: intermediario
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Priorização Inteligente de Backlog

## Conceito Central

IA automatiza e enriquece frameworks de priorização, analisando dados históricos, impacto estimado e esforço para ordenar o backlog de forma objetiva — reduzindo viés e acelerando decisões de roadmap.

## RICE Score

```
RICE = (Reach × Impact × Confidence) / Effort
```

| Dimensão | Como IA ajuda |
|----------|---------------|
| **Reach** | Estima usuários impactados via dados de analytics |
| **Impact** | Classifica impacto (0.25→3) via análise de requisitos |
| **Confidence** | Avalia completude de informação disponível |
| **Effort** | Estima person-weeks via histórico de tasks similares |

## WSJF (Weighted Shortest Job First)

```
WSJF = Cost of Delay / Job Duration

Cost of Delay = User Value + Time Criticality + Risk Reduction
```

IA calcula cada componente analisando:
- Feedback de clientes (NPS, tickets) → User Value
- Deadlines contratuais/regulatórios → Time Criticality
- Incidentes e débito técnico → Risk Reduction

## MoSCoW com IA

| Categoria | Critério IA |
|-----------|-------------|
| **Must** | Bloqueador de release, compliance, SLA |
| **Should** | Alto impacto, baixo risco, alinhado com OKR |
| **Could** | Melhoria incremental, nice-to-have validado |
| **Won't** | Fora do escopo atual, baixo ROI |

## Roadmap Automático — Pipeline

```
Backlog Items
    ↓
[Scoring Engine] — aplica RICE/WSJF
    ↓
[Constraint Solver] — respeita dependências, capacidade
    ↓
[Roadmap Generator] — distribui em sprints/quarters
    ↓
[Visualizer] — timeline, swimlanes por tema
```

## Prompt para Priorização

```markdown
Dado o backlog abaixo, calcule o RICE score para cada item:
{lista_de_items}

Contexto:
- Base de usuários: {num_usuarios}
- Sprint capacity: {capacity} story points
- Objetivo do quarter: {okr}

Para cada item forneça: Reach, Impact, Confidence, Effort, RICE Score, Ranking.
```

## Exercício Prático

1. Exporte seu backlog real (Jira/Notion)
2. Aplique RICE scoring via prompt
3. Compare ranking IA vs. ranking atual do time
4. Identifique items sub/sobre-priorizados
5. Gere roadmap de 1 quarter automaticamente

## Armadilhas Comuns

- ❌ Confiar cegamente no score sem contexto estratégico
- ❌ Usar RICE para items muito pequenos (overhead > valor)
- ❌ Ignorar dependências técnicas no ranking
- ❌ Não recalibrar pesos quando o contexto muda

## Conexões

- [[01-planejamento-escopo]] — Items vêm da decomposição
- [[03-cronograma-capacidade]] — Priorização alimenta o cronograma
- [[10-portfolio-okrs]] — Alinhamento com OKRs
