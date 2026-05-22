---
titulo: "MCPs vs Tools Tradicionais"
modulo: 3
unidade: 3
tags: [mcp, tools, function-calling, comparação, arquitetura]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada + Documentação Oficial MCP"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# MCPs vs Tools Tradicionais

## O que são "Tools Tradicionais"?

Function calling nativo dos providers (OpenAI Functions, Anthropic Tool Use, Google Function Calling). O desenvolvedor define schemas JSON e o modelo retorna chamadas estruturadas que a aplicação executa.

## Comparação Direta

| Aspecto | Tools Tradicionais | MCP |
|---------|-------------------|-----|
| **Definição** | No código da aplicação | No MCP Server (separado) |
| **Descoberta** | Estática (compile-time) | Dinâmica (runtime) |
| **Reutilização** | Copy-paste entre projetos | Plug-and-play |
| **Transporte** | Embutido na API do provider | Protocolo próprio (JSON-RPC) |
| **Multi-provider** | Reescrever para cada LLM | Funciona com qualquer client |
| **Composição** | Manual | N servers simultâneos |
| **Segurança** | Responsabilidade da app | Built-in (capabilities, approval) |
| **Ecossistema** | Fechado por provider | Aberto e compartilhável |

## Quando usar cada um?

### Use Tools Tradicionais quando:
- Integração simples e pontual (1-2 tools)
- Aplicação monolítica sem necessidade de reutilização
- Latência ultra-baixa é crítica (sem overhead de protocolo)
- Protótipo rápido que não vai escalar

### Use MCP quando:
- Múltiplos consumers precisam das mesmas tools
- Quer desacoplar a lógica de integração da aplicação
- Precisa de descoberta dinâmica de capabilities
- Segurança granular é requisito
- O serviço será consumido por diferentes IDEs/agentes
- Quer contribuir para um ecossistema compartilhado

## Overhead do MCP

| Fator | Impacto |
|-------|---------|
| Latência | +5-20ms por chamada (stdio) / +50-100ms (HTTP) |
| Complexidade | Server separado para manter |
| Setup inicial | Mais boilerplate que function calling direto |

**Trade-off:** o overhead se paga quando há reutilização ou múltiplos consumers.

## Árvore de Decisão

```
Preciso dessa tool em mais de 1 lugar?
├── Sim → MCP
└── Não → É um serviço que outros times podem usar?
    ├── Sim → MCP
    └── Não → Tool tradicional (por enquanto)
```

## Migração: Tools → MCP

1. **Identificar tools reutilizáveis** — quais são usadas em mais de um contexto?
2. **Extrair para MCP Server** — mover lógica para um server independente
3. **Manter schemas** — Zod schemas são compatíveis com ambos
4. **Testar com MCP Inspector** — validar que o server responde corretamente
5. **Conectar clients** — substituir chamadas diretas por conexão MCP
