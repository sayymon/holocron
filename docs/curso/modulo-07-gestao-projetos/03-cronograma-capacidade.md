---
titulo: "Cronograma, Capacidade e Alocação"
modulo: 7
unidade: 3
tags: [gestao-projetos, cronograma, capacidade, alocacao, dependencias, what-if]
dificuldade: intermediario
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Cronograma, Capacidade e Alocação

## Conceito Central

IA modela dependências entre tasks, simula cenários de alocação e identifica gargalos antes que aconteçam — transformando planejamento de capacidade de arte em ciência.

## Detecção Automática de Dependências

IA analisa descrições de tasks e identifica dependências implícitas:

```
Input: Lista de histórias de usuário

Análise IA:
- US-03 depende de US-01 (usa API criada em US-01)
- US-05 depende de US-02 (precisa do schema definido em US-02)
- US-04 e US-06 podem ser paralelas (sem dependência)

Caminho crítico: US-01 → US-03 → US-07
```

## Análise What-If

```markdown
## Prompt: Simulação What-If

Dado o cronograma atual: {cronograma_com_dependencias}

Simule:
1. Dev senior sai de férias na sprint 3
2. Requisito X muda de escopo (+3 story points)
3. Dependência externa atrasa 1 semana

Para cada cenário mostre: impacto no deadline, tasks afetadas, mitigações.
```

| Cenário | IA calcula |
|---------|-----------|
| Pessoa sai | Redistribuição ótima de tasks |
| Escopo cresce | Novo caminho crítico + trade-offs |
| Dependência atrasa | Cascata de impacto + alternativas |
| Budget reduz | O que cortar com menor impacto |

## Balanceamento de Carga

```
Capacidade Real = Dias Úteis × Fator de Foco × Headcount

Fator de Foco típico:
- Dev: 0.6-0.7 (reuniões, code review, suporte)
- PM: 0.4-0.5 (reuniões, alinhamentos, reports)
- Designer: 0.5-0.6 (feedback loops, pesquisa)
```

IA gera alocação ótima considerando skills, disponibilidade, dependências e backlog priorizado — alertando sobrecarga antes que aconteça.

## Ferramentas

| Ferramenta | Capacidade IA |
|------------|---------------|
| Linear | Auto-scheduling com dependências |
| Monday.com | Workload balancing |
| MS Project + Copilot | Critical path + what-if |
| Jira + Tempo | Capacity planning com histórico |

## Exercício Prático

1. Mapeie dependências do seu sprint atual com IA
2. Identifique o caminho crítico
3. Simule: "E se a task X atrasar 3 dias?"
4. Gere alocação balanceada para próxima sprint

## Armadilhas Comuns

- ❌ Ignorar fator de foco (alocar 100% do tempo)
- ❌ Não considerar dependências cross-team
- ❌ Planejar sem buffer para imprevistos
- ❌ Tratar estimativas como compromissos fixos

## Conexões

- [[02-priorizacao-backlog]] — Priorização define o que entra
- [[04-estimativas-previsoes]] — Estimativas alimentam o cronograma
- [[05-riscos-mitigacoes]] — Riscos impactam alocação
