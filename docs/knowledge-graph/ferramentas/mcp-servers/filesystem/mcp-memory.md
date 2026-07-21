---
titulo: "MCP Memory — Knowledge Graph Persistente"
tags: [mcp, memory, knowledge-graph, entities, relations, persistence]
fonte: Docs oficiais + pesquisa
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - agentes-ia
---
# MCP Memory — Knowledge Graph Persistente

## O que é

MCP server oficial da Anthropic para **memória persistente**. Mantém um knowledge graph local onde o LLM armazena entidades, relações e observações entre sessões. O LLM "lembra" de coisas entre conversas.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `create_entities` | Criar novas entidades (pessoa, projeto, conceito) |
| `create_relations` | Criar relações entre entidades |
| `add_observations` | Adicionar fatos/observações a entidades |
| `search_nodes` | Buscar no grafo por query |
| `open_nodes` | Abrir entidades específicas |
| `delete_entities` | Remover entidades |
| `delete_relations` | Remover relações |
| `delete_observations` | Remover observações |

## Instalação

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-memory"]
    }
  }
}
```

Grátis, sem API key. Armazena em arquivo local (`~/.mcp-memory/`).

## Como Funciona

O LLM cria um grafo de conhecimento:

```
[Saymon] --works_at--> [Hotmart]
[Saymon] --leads--> [Lead Generation Squad]
[Saymon] --uses--> [Kiro]
[Hotmart] --has_product--> [Marketing Screen]
```

Na próxima conversa, o LLM busca no grafo e "lembra" do contexto.

## Casos de Uso

- **Preferences**: LLM lembra suas preferências (stack, estilo, team)
- **Context carryover**: Informação persiste entre sessões
- **Project knowledge**: Decisões, trade-offs, ADRs
- **People graph**: Quem é quem, o que faz, onde atua
- **Personal CRM**: Notas sobre contatos, reuniões, compromissos

## Limitações

- Storage local (não sincroniza entre máquinas)
- Não é vector search (é graph search)
- Depende do LLM escolher quando salvar (não automático)
- Pode acumular informação desatualizada

## Conexões

- [[mcp-overview]] — Protocolo
- [[agentes-ia]] — Agentes com memória persistente
- [[mcp-filesystem]] — Complemento (raw files vs structured memory)
