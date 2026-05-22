---
titulo: "Status Reports e Executive Summaries"
modulo: 7
unidade: 7
tags: [gestao-projetos, status-report, executive-summary, geracao-automatica, audiencia]
dificuldade: intermediario
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Status Reports e Executive Summaries

## Conceito Central

IA gera status reports automaticamente a partir de dados do projeto (Jira, Git, CI/CD) e adapta linguagem, nível de detalhe e foco conforme a audiência — de dev lead a C-level.

## Geração Automática

### Fontes de Dados

```
Jira (velocity, burndown, blockers)
    +
Git (commits, PRs, deploy frequency)
    +
CI/CD (build success rate, deploy time)
    +
Incidents (P1/P2, MTTR)
    ↓
[Report Generator] — consolida e narra
    ↓
Status Report adaptado por audiência
```

## Adaptação por Público

| Audiência | Foco | Tom | Métricas |
|-----------|------|-----|----------|
| C-Level | Impacto de negócio, riscos, timeline | Executivo, 3-5 bullets | ROI, deadline, budget |
| Director | Progresso vs plan, dependências | Gerencial, 1 página | Velocity, scope change |
| Tech Lead | Detalhes técnicos, blockers | Técnico, detalhado | PRs, bugs, tech debt |
| Stakeholder | Features entregues, próximos passos | Produto, visual | Roadmap, demos |

## Template Multi-Audiência

```markdown
## Prompt: Status Report Adaptativo

Dados do projeto (última semana):
{dados_jira_git_ci}

Gere 3 versões do status report:

### Versão Executive (C-Level)
- 3-5 bullets máximo
- Foco: on track/at risk, impacto em receita, decisões necessárias
- Linguagem: negócio, sem jargão técnico

### Versão Gerencial (Director)
- Progresso vs plano (% completude)
- Riscos e mitigações
- Dependências cross-team
- Pedidos de ajuda

### Versão Técnica (Tech Lead)
- Tasks completadas vs planejadas
- PRs abertos, bugs críticos
- Tech debt acumulado
- Próximas tasks por prioridade
```

## Indicadores Automáticos

| Indicador | Verde | Amarelo | Vermelho |
|-----------|-------|---------|----------|
| Velocity | ≥90% do planejado | 70-89% | <70% |
| Scope | Sem mudança | +1-10% | >10% |
| Bugs críticos | 0 | 1-2 | 3+ |
| Blockers | 0 | 1 (com plano) | 2+ sem plano |
| Timeline | On track | ≤3 dias risco | >3 dias atraso |

## Exercício Prático

1. Colete dados da última sprint (Jira + Git)
2. Gere report para 3 audiências diferentes
3. Valide com seu PM/Tech Lead se o conteúdo está adequado
4. Automatize geração semanal via script

## Armadilhas Comuns

- ❌ Report único para todas as audiências
- ❌ Dados sem narrativa (números soltos)
- ❌ Esconder problemas no report (transparência > otimismo)
- ❌ Reports muito longos que ninguém lê

## Conexões

- [[06-reunioes-turbinadas]] — Resumos de reunião alimentam reports
- [[04-estimativas-previsoes]] — Previsões entram no report
- [[10-portfolio-okrs]] — Reports alimentam visão de portfólio
