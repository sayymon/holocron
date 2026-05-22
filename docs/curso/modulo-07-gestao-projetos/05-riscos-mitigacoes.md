---
titulo: "Riscos e Mitigações com AIOps"
modulo: 7
unidade: 5
tags: [gestao-projetos, riscos, mitigacao, aiops, deteccao-automatica, padroes]
dificuldade: avancado
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Riscos e Mitigações com AIOps

## Conceito Central

IA detecta riscos de projeto automaticamente analisando padrões em dados de execução (commits, velocity, bugs, comunicação) — alertando antes que problemas se materializem e sugerindo planos de mitigação.

## Detecção Automática de Riscos

### Sinais que IA Monitora

| Sinal | Risco Indicado |
|-------|---------------|
| Velocity caindo 2+ sprints | Escopo subestimado ou bloqueios |
| Commits concentrados no fim da sprint | Trabalho acumulado, qualidade em risco |
| Bug rate subindo | Débito técnico acumulado |
| Dependência externa sem update | Bloqueio iminente |
| Reuniões aumentando | Desalinhamento ou escopo indefinido |
| PR review time crescendo | Gargalo de revisão |

### Pipeline de Detecção

```
Dados de Execução (Jira, Git, Slack, CI)
    ↓
[Anomaly Detection] — desvios de padrão histórico
    ↓
[Pattern Matching] — compara com projetos passados que falharam
    ↓
[Risk Scoring] — probabilidade × impacto
    ↓
[Alert + Mitigation Plan] — notifica PM com ações sugeridas
```

## Classificação de Riscos

```
Risk Score = Probabilidade × Impacto × (1 - Detectabilidade)

Onde:
- Probabilidade: 1-5 (raro → quase certo)
- Impacto: 1-5 (negligível → catastrófico)
- Detectabilidade: 0-1 (0=invisível, 1=óbvio)
```

## Planos de Mitigação Gerados por IA

```markdown
## Prompt: Plano de Mitigação

Risco identificado: {descricao_risco}
Probabilidade: {prob} | Impacto: {impacto}
Contexto do projeto: {contexto}

Gere plano de mitigação com:
1. Ações preventivas (reduzir probabilidade)
2. Ações contingenciais (reduzir impacto se ocorrer)
3. Triggers de ativação (quando acionar contingência)
4. Owner sugerido para cada ação
5. Custo estimado da mitigação vs custo do risco
```

## Padrões de Projetos que Falham

IA aprende com histórico organizacional:

| Padrão | Frequência | Ação |
|--------|-----------|------|
| Escopo cresce >30% sem replanejamento | 45% dos projetos | Alert no sprint 3 |
| Sem deploy até metade do timeline | 60% atrasam | Sugerir MVP antecipado |
| 1 pessoa com >40% das tasks | 35% têm bottleneck | Redistribuir |
| Dependência externa sem SLA | 50% atrasam | Escalar early |

## Exercício Prático

1. Liste os 5 maiores riscos do seu projeto atual
2. Use IA para calcular Risk Score de cada um
3. Gere planos de mitigação automaticamente
4. Defina triggers de monitoramento
5. Configure alertas baseados em sinais do Jira/Git

## Armadilhas Comuns

- ❌ Só identificar riscos no início e nunca revisar
- ❌ Mitigações genéricas sem ações concretas
- ❌ Ignorar riscos "políticos" (stakeholder, budget)
- ❌ Alert fatigue — muitos alertas de baixa relevância

## Conexões

- [[04-estimativas-previsoes]] — Alta variância indica risco
- [[03-cronograma-capacidade]] — Riscos impactam alocação
- [[08-governanca-compliance]] — Riscos alimentam governança
