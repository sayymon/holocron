---
titulo: "MCP Slack — Mensagens e Channels no IDE"
tags: [mcp, slack, messages, channels, communication, search]
fonte: Pesquisa consolidada
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
---
# MCP Slack — Mensagens e Channels no IDE

## O que é

MCP server para Slack. Permite ao LLM **buscar mensagens, listar channels, enviar mensagens e obter contexto de conversas** — útil para entender decisões tomadas em channels técnicos.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `search_messages` | Buscar por texto em channels |
| `list_channels` | Listar channels acessíveis |
| `get_channel_history` | Mensagens recentes de um channel |
| `post_message` | Enviar mensagem |
| `get_thread` | Ler thread completa |
| `get_user_info` | Info de um user |

## Instalação

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-...",
        "SLACK_TEAM_ID": "T0..."
      }
    }
  }
}
```

Requer criar um Slack App com scopes: `channels:history`, `channels:read`, `chat:write`, `search:read`.

## Casos de Uso

- **Buscar decisões**: "O que foi decidido sobre a migração do DB?"
- **Contexto de incidente**: "O que foi discutido no channel de incidentes ontem?"
- **Summarize**: "Resume as mensagens do #eng-platform desta semana"
- **Notificar**: Enviar update após task completada

## Conexões

- [[mcp-overview]] — Protocolo
- [[mcp-notion]] — Complementa (docs vs conversas)
