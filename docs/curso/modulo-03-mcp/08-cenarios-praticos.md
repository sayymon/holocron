---
titulo: "Cenários Práticos"
modulo: 3
unidade: 8
tags: [mcp, cenários, plugins, ides, erp, crm, prática]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada + Ecossistema MCP"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Cenários Práticos

## 1. MCP como Plugin de IDE

### Cenário
Criar um MCP Server que expõe funcionalidades específicas do projeto para a IDE.

### Implementação

```json
// .mcp.json na raiz do projeto
{
  "mcpServers": {
    "projeto-docs": {
      "command": "node",
      "args": ["./tools/mcp-docs-server.js"]
    },
    "projeto-db": {
      "command": "node",
      "args": ["./tools/mcp-db-server.js"],
      "env": { "DATABASE_URL": "${env:DATABASE_URL}" }
    }
  }
}
```

### Tools típicas para IDE:
- `buscar_documentacao` — pesquisa na KB do projeto
- `gerar_migration` — cria migration baseada em schema
- `rodar_testes` — executa suite de testes específica
- `verificar_lint` — roda linter e retorna problemas

## 2. MCP para ERP (SAP, Oracle, etc.)

### Cenário
Expor consultas e operações do ERP para agentes de IA sem dar acesso direto.

### Arquitetura

```
┌─────────┐     ┌──────────────┐     ┌─────────┐
│ Agente  │────▶│ MCP Server   │────▶│  SAP    │
│         │     │ (adaptador)  │     │  RFC/API│
└─────────┘     └──────────────┘     └─────────┘
```

### Tools típicas:
- `consultar_saldo_cliente` — read-only, sem expor dados sensíveis
- `listar_pedidos` — com filtros de data e status
- `verificar_estoque` — quantidade disponível por SKU
- `gerar_relatorio_financeiro` — relatório pré-formatado

### Segurança:
- Nunca expor tools de escrita no ERP sem approval flow
- Rate limiting agressivo (ERP não escala como microserviço)
- Cache para consultas frequentes

## 3. MCP para CRM (Salesforce, HubSpot, Pipedrive)

### Cenário
Agentes de vendas consultam e atualizam CRM via linguagem natural.

### Tools típicas:
- `buscar_lead` — por nome, empresa, email
- `atualizar_status_deal` — mover no pipeline
- `registrar_atividade` — log de ligação, email, reunião
- `proximas_tarefas` — agenda do vendedor

### Exemplo prático:

```typescript
server.tool(
  "buscar_lead",
  "Busca leads no CRM por nome ou empresa",
  { query: z.string(), limit: z.number().default(5) },
  async ({ query, limit }) => {
    const leads = await crm.search({ q: query, limit });
    return { content: [{ type: "text", text: JSON.stringify(leads) }] };
  }
);
```

## 4. MCP para Observabilidade

### Cenário
Devs consultam métricas, logs e alertas sem sair da IDE.

### Tools típicas:
- `buscar_logs` — por serviço, período, nível
- `metricas_servico` — latência, throughput, error rate
- `alertas_ativos` — incidentes em andamento
- `status_deploy` — último deploy, versão em produção

## 5. MCP para Comunicação Interna

### Cenário
Agente que interage com Slack/Teams/Google Chat para automações.

### Tools típicas:
- `enviar_mensagem` — para canal ou DM
- `buscar_mensagens` — por termo, canal, período
- `criar_thread` — iniciar discussão
- `agendar_lembrete` — notificação futura

## 6. MCP para Knowledge Base

### Cenário
RAG turbinado — MCP Server que expõe busca semântica na documentação.

### Tools típicas:
- `buscar_docs` — busca semântica com embeddings
- `listar_adrs` — Architecture Decision Records
- `golden_path` — padrões recomendados por tecnologia

## Matriz de Cenários

| Cenário | Complexidade | Valor | Risco |
|---------|-------------|-------|-------|
| Plugin IDE | Baixa | Alto | Baixo |
| ERP | Alta | Alto | Médio |
| CRM | Média | Alto | Baixo |
| Observabilidade | Média | Alto | Baixo |
| Comunicação | Baixa | Médio | Baixo |
| Knowledge Base | Média | Alto | Baixo |

## Dica: Comece pelo Quadrante "Alto Valor + Baixo Risco"

Plugins de IDE e Knowledge Base são os melhores pontos de partida — alto impacto, baixo risco, rápido de implementar.
