---
titulo: "Function Calling e Tool Use"
modulo: 4
unidade: 3
tags: [agentes, function-calling, tool-use, json-schema, mcp, apis]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 3 — Function Calling e Tool Use

## Objetivo

Implementar ferramentas que agentes podem invocar: definição de schemas, integração com APIs externas e uso de MCPs como fonte de capacidades.

## Conceitos-Chave

| Conceito | Descrição |
|----------|-----------|
| **Function Calling** | Capacidade nativa do LLM de gerar chamadas estruturadas |
| **Tool Use** | Padrão mais amplo — qualquer capacidade invocável |
| **MCP** | Protocolo padronizado para expor ferramentas a agentes |

## Anatomia de uma Tool

```typescript
interface Tool {
  name: string;           // Identificador único
  description: string;    // LLM usa isso para decidir quando chamar
  parameters: JSONSchema; // Schema dos parâmetros
  execute: (params: any) => Promise<any>;
}
```

## JSON Schema para Parâmetros

```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "Texto de busca semântica"
    },
    "limit": {
      "type": "number",
      "description": "Máximo de resultados",
      "default": 5
    }
  },
  "required": ["query"]
}
```

### Boas Práticas
- Descriptions claras — o LLM decide baseado nelas
- Enums quando possível — reduz erros
- Defaults explícitos — menos parâmetros obrigatórios
- Validação server-side — nunca confie no LLM

## MCP como Fonte de Tools

```typescript
import { Client } from "@modelcontextprotocol/sdk/client";

const client = new Client({ name: "holocron-agent" });
await client.connect(transport);

const { tools } = await client.listTools();

const result = await client.callTool({
  name: "search_documents",
  arguments: { query: "ReAct pattern" }
});
```

### Vantagens do MCP
- Tools descobertas dinamicamente (não hardcoded)
- Protocolo padronizado entre agentes e servidores
- Isolamento — tool roda em processo separado
- Composição — múltiplos MCP servers = mais capacidades

## Tratamento de Erros

```typescript
async function safeToolCall(tool: Tool, params: any) {
  try {
    const result = await tool.execute(params);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message, retryable: error.retryable };
  }
}
```

## Conexão com o Holocron

O Holocron MCP Server expõe tools para o Agente Tutor:
- `search_knowledge_base` — busca semântica na KB
- `get_student_progress` — progresso do aluno
- `generate_quiz` — gera quiz adaptativo
- `update_progress` — registra avanço

## Referências

- [OpenAI — Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic — Tool Use](https://docs.anthropic.com/en/docs/tool-use)
- [MCP Specification](https://modelcontextprotocol.io)
