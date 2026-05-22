---
titulo: "Portfólio e OKRs com IA"
modulo: 7
unidade: 10
tags: [gestao-projetos, portfolio, okrs, alinhamento, metricas, outcome, impacto]
dificuldade: avancado
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Portfólio e OKRs com IA

## Conceito Central

IA conecta execução tática (tasks, sprints) com objetivos estratégicos (OKRs) — medindo alinhamento, prevendo impacto em outcomes e identificando gaps no portfólio de projetos.

## Alinhamento Automático

### De Tasks a OKRs

```
OKR: Aumentar retenção de creators em 15%
    ↓
[Alignment Engine] — mapeia contribuição de cada iniciativa
    ↓
Iniciativa A: Onboarding melhorado → contribui 40%
Iniciativa B: Notificações inteligentes → contribui 25%
Iniciativa C: Dashboard de métricas → contribui 20%
Gap: 15% sem cobertura → IA sugere novas iniciativas
```

### Prompt para Análise de Alinhamento

```markdown
OKRs do quarter: {lista_okrs}
Backlog/Roadmap atual: {iniciativas}

Para cada iniciativa, avalie:
1. Qual OKR ela impacta (pode ser múltiplos)
2. Contribuição estimada (%) para o Key Result
3. Confiança da estimativa (alta/média/baixa)
4. Gaps: OKRs sem cobertura suficiente

Sugira iniciativas para cobrir gaps identificados.
```

## Métricas de Outcome vs Output

| Tipo | Exemplo | IA mede |
|------|---------|---------|
| **Output** | Features entregues, PRs merged | Contagem automática |
| **Outcome** | Retenção, NPS, conversão | Correlação com entregas |
| **Impact** | Receita, market share | Atribuição causal |

### IA para Correlação

```
Entrega: Feature X deployada em 15/03
Métrica: Conversão subiu 3% em 22/03
Correlação: 0.72 (alta)
Confounders checados: sazonalidade, campanha marketing
Conclusão: Feature X provavelmente contribuiu para +2.1% de conversão
```

## Gestão de Portfólio

### Health Score por Projeto

```
Portfolio Health = Σ (Project Score × Strategic Weight)

Project Score = f(timeline, budget, quality, alignment)
Strategic Weight = importância relativa para OKRs
```

### Dashboard de Portfólio (IA-generated)

| Projeto | Status | OKR | Contribuição | Risco |
|---------|--------|-----|-------------|-------|
| Cockpit SDR | 🟢 On track | Grow Revenue | 30% | Baixo |
| Migration DB | 🟡 At risk | Reduce Cost | 45% | Médio |
| AI Companion | 🟢 On track | Retention | 25% | Baixo |

## Trade-off Analysis

IA simula cenários de portfólio:

```
Cenário A: Priorizar Projeto X (cortar Y)
→ OKR1: +15%, OKR2: -8%, OKR3: neutro

Cenário B: Manter ambos com escopo reduzido
→ OKR1: +8%, OKR2: +5%, OKR3: neutro

Cenário C: Adicionar headcount
→ OKR1: +15%, OKR2: +10%, Custo: +200K/quarter
```

## Exercício Prático

1. Liste os OKRs do seu quarter
2. Mapeie suas tasks/projetos contra cada OKR
3. Use IA para identificar gaps de cobertura
4. Calcule portfolio health score
5. Simule 2 cenários de trade-off

## Armadilhas Comuns

- ❌ OKRs desconectados da execução diária
- ❌ Medir só output (features) sem outcome (impacto)
- ❌ Portfólio sem priorização (tudo é prioridade = nada é)
- ❌ Correlação ≠ causalidade (cuidado com atribuição)

## Conexões

- [[02-priorizacao-backlog]] — Priorização alinhada com OKRs
- [[07-status-reports]] — Reports alimentam visão de portfólio
- [[04-estimativas-previsoes]] — Previsões de impacto
