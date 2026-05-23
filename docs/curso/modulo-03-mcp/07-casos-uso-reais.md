---
titulo: "Casos de Uso Reais em Empresas"
modulo: 3
unidade: 7
tags: [mcp, enterprise, casos-de-uso, legados, copilots]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada + Práticas de Mercado"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Casos de Uso Reais em Empresas

## 1. Copilots de Desenvolvimento

### Problema
Desenvolvedores alternam entre IDE, Jira, Confluence, GitHub, dashboards de observabilidade. Context switching constante.

### Solução com MCP
IDE conecta a múltiplos MCP Servers simultaneamente:
- **Jira MCP** — criar/buscar issues sem sair do editor
- **GitHub MCP** — PRs, reviews, code search
- **Observability MCP** — logs, métricas, alertas
- **Docs MCP** — buscar documentação interna

### Resultado
Desenvolvedor resolve tarefas sem trocar de contexto. Exemplo real: Kiro na empresa de tecnologia conecta Atlassian, GitHub, Google Workspace e Cosmos DS.

## 2. Sistemas Legados (Strangler Fig via MCP)

### Problema
Sistema legado monolítico sem API moderna. Reescrever é inviável no curto prazo.

### Solução com MCP
Criar MCP Server como **fachada** do sistema legado:

```
┌──────────┐     ┌──────────────┐     ┌────────────┐
│  Agente  │────▶│  MCP Server  │────▶│  Legado    │
│  (novo)  │◀────│  (adaptador) │◀────│  (SOAP/FTP)│
└──────────┘     └──────────────┘     └────────────┘
```

- MCP Server traduz JSON-RPC → SOAP/XML/FTP/mainframe
- Agentes modernos consomem sem conhecer o legado
- Migração gradual: substituir backend do MCP Server sem mudar interface

### Exemplo
Empresa com ERP SAP B1 cria MCP Server que expõe consultas financeiras. Agentes de CS consultam saldo, faturas e status sem acessar SAP diretamente.

## 3. Atendimento ao Cliente (CX)

### Problema
Agentes de atendimento precisam consultar múltiplos sistemas para resolver um ticket.

### Solução com MCP
Agente de IA (como CAIO na empresa de tecnologia) conecta a:
- **CRM MCP** — histórico do cliente
- **Billing MCP** — faturas, pagamentos
- **Product MCP** — status de entrega, acesso
- **Knowledge Base MCP** — artigos de ajuda

### Resultado
CAIO na empresa de tecnologia atende em PT/EN/ES via chat, WhatsApp e email, consultando sistemas internos via MCP de forma transparente.

## 4. Automação de Vendas

### Problema
SDRs gastam tempo em tarefas repetitivas: qualificação, enriquecimento de leads, follow-ups.

### Solução com MCP
- **Lead Enrichment MCP** — dados de LinkedIn, empresa, cargo
- **CRM MCP** — criar/atualizar oportunidades
- **Email MCP** — enviar sequências personalizadas
- **Calendar MCP** — agendar reuniões

### Exemplo empresa de tecnologia
Sales Assistant (Automations Unit) usa MCPs para automatizar fluxo de vendas BR e LATAM.

## 5. Governança e Compliance

### Problema
Auditorias exigem rastreabilidade de quem acessou o quê, quando.

### Solução com MCP
- Toda chamada de tool é logada (audit trail nativo)
- Permissões granulares por tool/usuário
- Dashboards de uso e anomalias

## 6. Onboarding de Desenvolvedores

### Problema
Novo dev leva semanas para entender a stack, encontrar documentação, configurar ambiente.

### Solução com MCP
Agente de onboarding conecta a:
- **Docs MCP** — Golden Path, ADRs, runbooks
- **TechDeck MCP** — catálogo de serviços, owners
- **GitHub MCP** — repos relevantes, exemplos de código

## Padrões Comuns

| Padrão | Descrição |
|--------|-----------|
| **Fachada** | MCP como adaptador para sistema legado |
| **Agregador** | MCP que combina dados de múltiplas fontes |
| **Gateway** | MCP centralizado que roteia para sub-servers |
| **Sidecar** | MCP que roda junto ao serviço principal |

## Métricas de Sucesso

- Tempo economizado por interação
- Redução de context switching
- Taxa de resolução sem escalonamento (CX)
- Adoção (% de devs/agentes usando)
- NPS interno
