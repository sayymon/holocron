---
titulo: "Automação em Jira/Asana/Trello/Notion/Slack"
modulo: 7
unidade: 9
tags: [gestao-projetos, automacao, jira, notion, slack, bots, workflows, javascript]
dificuldade: avancado
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Automação em Jira/Asana/Trello/Notion/Slack

## Conceito Central

Bots e automações conectam ferramentas de gestão com IA — transformando linguagem natural em workflows executáveis e eliminando trabalho manual repetitivo de atualização de boards.

## NL → Workflow

```
Input: "Quando um bug P1 for criado, notifique o canal #incidents, 
atribua ao on-call e mova para In Progress"

Output (Jira Automation Rule):
Trigger: Issue Created (type=Bug, priority=P1)
Actions:
  1. Send Slack message → #incidents
  2. Assign → On-call rotation
  3. Transition → In Progress
```

## Arquitetura de Bot JS

```javascript
// Bot pattern para integração Jira + Slack + IA
const bot = {
  // Webhook recebe evento
  onEvent: async (event) => {
    const context = await enrichWithAI(event);
    const actions = await determineActions(context);
    await executeActions(actions);
  },
  
  // IA enriquece contexto
  enrichWithAI: async (event) => {
    return await llm.analyze({
      event,
      prompt: "Classifique urgência e sugira ações"
    });
  },
  
  // Executa ações nas ferramentas
  executeActions: async (actions) => {
    for (const action of actions) {
      switch(action.tool) {
        case 'jira': await jiraClient.execute(action);
        case 'slack': await slackClient.execute(action);
        case 'notion': await notionClient.execute(action);
      }
    }
  }
};
```

## Automações por Ferramenta

### Jira
| Automação | Trigger | Ação |
|-----------|---------|------|
| Auto-assign | Issue criada | Atribui por skill/carga |
| Stale alert | Sem update 3 dias | Notifica owner no Slack |
| Sprint report | Sprint fechada | Gera resumo no Confluence |
| Dependency alert | Blocker adicionado | Notifica dependentes |

### Notion
| Automação | Trigger | Ação |
|-----------|---------|------|
| Meeting notes → tasks | Página atualizada | Extrai action items |
| Status sync | Jira atualizado | Sincroniza status no Notion |
| Doc review | Deadline próximo | Lembra reviewers |

### Slack
| Automação | Trigger | Ação |
|-----------|---------|------|
| Daily digest | Cron 9h | Resume pendências do dia |
| Standup bot | Cron 9:30h | Coleta updates assíncronos |
| Decision log | Reação 📌 | Registra decisão no Confluence |

## NL Command Interface

```
Usuário no Slack: "/pm crie uma task de bug P2 para o time de payments 
sobre timeout na API de checkout"

Bot:
1. Parseia intent (criar task)
2. Extrai: tipo=bug, prioridade=P2, time=payments, descrição
3. Cria issue no Jira
4. Responde: "✅ PAY-234 criada e atribuída ao on-call de payments"
```

## Exercício Prático

1. Identifique 3 tarefas repetitivas no seu workflow
2. Implemente 1 automação Jira (regra nativa ou webhook)
3. Crie bot Slack que cria issues via NL
4. Configure sync bidirecional entre 2 ferramentas

## Armadilhas Comuns

- ❌ Automação sem fallback (o que acontece se falhar?)
- ❌ Notificações excessivas (alert fatigue)
- ❌ Sync bidirecional sem conflict resolution
- ❌ Bot sem rate limiting (pode spammar APIs)

## Conexões

- [[01-planejamento-escopo]] — Criação automática de issues
- [[06-reunioes-turbinadas]] — Integração meeting → board
- [[07-status-reports]] — Dados para reports automáticos
