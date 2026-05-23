---
titulo: "Transformando sua Empresa em um MCP"
modulo: 3
unidade: 5
tags: [mcp, enterprise, serviços-internos, estratégia, adoção]
dificuldade: avançado
fonte: "Curso Engenharia de IA Aplicada + Práticas de Mercado"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Transformando sua Empresa em um MCP

## A Visão

Cada serviço interno da empresa se torna um MCP Server. Agentes de IA (copilots, assistentes, automações) consomem esses servers de forma padronizada, sem integrações ad-hoc.

## Antes vs Depois

**Antes:** Cada agente/ferramenta implementa sua própria integração com cada serviço.

**Depois:** Serviços expõem MCP Servers → qualquer agente conecta via protocolo padrão.

## Estratégia de Adoção (Bottom-Up)

### Fase 1: Piloto (1-2 meses)
- Escolher 1-2 serviços de alto valor e baixo risco
- Criar MCP Servers para eles
- Conectar a 1 IDE ou agente interno
- Medir: tempo economizado, adoção, bugs

### Fase 2: Expansão (3-6 meses)
- Documentar padrões e templates
- Criar SDK/boilerplate interno
- Expandir para 5-10 serviços
- Estabelecer governança (quem publica, quem consome)

### Fase 3: Plataforma (6-12 meses)
- Registry centralizado de MCP Servers
- Auth/AuthZ unificado
- Observabilidade (LangFuse, métricas)
- Self-service para times criarem novos servers

## Quais Serviços Expor Primeiro?

| Critério | Peso |
|----------|------|
| Frequência de uso por humanos | Alto |
| Já tem API REST documentada | Alto |
| Dados não-sensíveis | Médio |
| Time disposto a manter | Alto |
| Múltiplos consumers potenciais | Alto |

### Candidatos típicos:
- Catálogo de serviços (TechDeck)
- Documentação (Confluence)
- Gestão de tarefas (Jira)
- Observabilidade (dashboards, métricas)
- CI/CD (status de deploys)

## Padrão de Implementação

```typescript
// Template para MCP Server empresarial
const server = new McpServer({
  name: "empresa-servico-x",
  version: "1.0.0",
});

// 1. Health check (obrigatório)
server.tool("health", "Verifica saúde do serviço", {}, async () => ({
  content: [{ type: "text", text: JSON.stringify({ status: "ok", timestamp: Date.now() }) }],
}));

// 2. Tools de leitura (baixo risco, começar por aqui)
server.tool("listar_items", "Lista items com filtros", { /* schema */ }, async (args) => { /* ... */ });

// 3. Tools de escrita (adicionar depois, com aprovação)
server.tool("criar_item", "Cria novo item", { /* schema */ }, async (args) => { /* ... */ });
```

## Governança Organizacional

| Aspecto | Decisão |
|---------|---------|
| Quem pode criar servers? | Qualquer squad (com template padrão) |
| Quem aprova publicação? | Tech Lead + Security review |
| Onde ficam registrados? | Registry centralizado (TechDeck) |
| Quem mantém? | Squad owner do serviço |
| SLA mínimo? | 99.5% uptime, <200ms p95 |

## Caso de Uso Real

MCPs ativos em empresas de tecnologia:
- **Atlassian** — Jira + Confluence (CRUD, JQL, CQL)
- **Golden Path** — Documentação de padrões de arquitetura
- **Cosmos DS** — Design System (componentes, tokens, guidelines)
- **GitHub** — Repos, PRs, issues, code search
- **Google Workspace** — Gmail, Drive, Docs, Sheets, Calendar, Chat

MCPs planejados: Observability, Magic Deploy, TechDeck, AstroBox, AstroFlow.

## Anti-padrões

- ❌ Expor TUDO de uma vez (começar pequeno)
- ❌ MCP sem owner definido (vira abandonware)
- ❌ Ignorar segurança "porque é interno"
- ❌ Duplicar lógica que já existe na API REST
- ❌ Server monolítico com 50+ tools (dividir por domínio)
