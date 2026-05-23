---
titulo: "Integração Padronizada de LLMs com MCP"
modulo: 3
unidade: 2
tags: [mcp, integração, llm, apis, bancos-de-dados, serviços]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada + Documentação Oficial MCP"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Integração Padronizada de LLMs com MCP

## O Problema Antes do MCP

Cada integração LLM ↔ serviço externo exigia código custom, parsing manual, gerenciamento individual de auth e lógica de retry específica. Resultado: **N modelos × M serviços = N×M integrações** (explosão combinatória).

## A Solução MCP

Com MCP, cada serviço expõe **uma interface padronizada**. Qualquer client compatível se conecta sem código custom:

```
N modelos × 1 protocolo × M servers = M integrações
```

## Tipos de Integração

### 1. APIs REST/GraphQL

O MCP Server encapsula chamadas HTTP e expõe como tools:

```typescript
server.tool("buscar_usuario", { id: z.string() }, async ({ id }) => {
  const response = await fetch(`https://api.empresa.com/users/${id}`);
  const user = await response.json();
  return { content: [{ type: "text", text: JSON.stringify(user) }] };
});
```

### 2. Bancos de Dados

Acesso controlado a queries — o modelo nunca vê a connection string:

```typescript
server.tool("consultar_vendas", { periodo: z.string() }, async ({ periodo }) => {
  const result = await db.query("SELECT * FROM vendas WHERE periodo = $1", [periodo]);
  return { content: [{ type: "text", text: JSON.stringify(result.rows) }] };
});
```

### 3. Serviços Internos (gRPC, Filas, etc.)

MCP abstrai qualquer protocolo interno:

```typescript
server.tool("publicar_evento", { tipo: z.string(), payload: z.string() }, async ({ tipo, payload }) => {
  await queue.publish(tipo, JSON.parse(payload));
  return { content: [{ type: "text", text: "Evento publicado com sucesso" }] };
});
```

## Padrão de Integração

O MCP Server atua como **adaptador** — traduz o protocolo padronizado (JSON-RPC) para o protocolo específico do serviço.

## Resources vs Tools

| Cenário | Usar Resource | Usar Tool |
|---------|--------------|-----------|
| Dados estáticos/contexto | ✅ | ❌ |
| Ação com side-effect | ❌ | ✅ |
| Leitura de configuração | ✅ | ❌ |
| CRUD em banco | ❌ | ✅ |
| Schema/documentação | ✅ | ❌ |

## Boas Práticas de Integração

1. **Descrições claras** — o modelo decide qual tool usar baseado na descrição
2. **Schemas tipados** — use Zod para validar inputs
3. **Respostas estruturadas** — JSON parseável, não texto livre
4. **Erros informativos** — retorne `isError: true` com mensagem útil
5. **Idempotência** — tools com side-effects devem ser idempotentes quando possível
6. **Paginação** — para queries que retornam muitos resultados

## Exemplo Real: empresa de tecnologia Atlassian MCP

O MCP Atlassian da empresa de tecnologia expõe tools para criar issues, buscar por JQL, ler/criar páginas Confluence. Qualquer agente (CAIO, SARA, Kiro) conecta e usa sem código custom.

## Anti-padrões

- ❌ Expor connection strings ou credenciais nas respostas
- ❌ Tools sem validação de input (SQL injection via LLM)
- ❌ Retornar datasets inteiros sem paginação
- ❌ Descrições vagas que confundem o modelo na seleção de tools
