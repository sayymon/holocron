---
titulo: "Visão Geral de MCP"
modulo: 3
unidade: 1
tags: [mcp, protocolo, fundamentos, llm, integração]
dificuldade: iniciante
fonte: "Curso Engenharia de IA Aplicada + Documentação Oficial MCP"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Visão Geral de MCP

## O que é MCP?

**Model Context Protocol (MCP)** é um protocolo aberto criado pela Anthropic que padroniza a forma como aplicações fornecem contexto e ferramentas para LLMs. Funciona como um "USB-C para IA" — uma interface universal que conecta modelos a dados e serviços externos.

## Arquitetura Básica

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│  MCP Client │────▶│  MCP Server │────▶│  Recurso Externo │
│  (IDE, App) │◀────│  (Protocolo)│◀────│  (API, DB, FS)   │
└─────────────┘     └─────────────┘     └─────────────────┘
```

### Componentes

| Componente | Papel |
|------------|-------|
| **Host** | Aplicação que inicia a conexão (IDE, chatbot) |
| **Client** | Mantém conexão 1:1 com um server |
| **Server** | Expõe recursos, tools e prompts via protocolo padronizado |

## Por que MCP está ganhando tração?

1. **Fragmentação resolvida** — antes, cada LLM tinha sua forma de chamar tools. MCP unifica.
2. **Composabilidade** — um client pode conectar N servers simultaneamente.
3. **Segurança by design** — permissões granulares, sem expor credenciais ao modelo.
4. **Ecossistema crescente** — IDEs (Cursor, Kiro, VS Code), frameworks (LangChain, Vercel AI SDK) adotaram.
5. **Vendor-agnostic** — funciona com qualquer LLM que suporte tool calling.

## Primitivas do Protocolo

| Primitiva | Descrição | Quem controla |
|-----------|-----------|---------------|
| **Resources** | Dados/contexto expostos ao modelo (read-only) | Server |
| **Tools** | Ações que o modelo pode invocar | Server (execução), Client (aprovação) |
| **Prompts** | Templates reutilizáveis de prompts | Server |
| **Sampling** | Server solicita completions ao client | Server (solicita), Client (executa) |

## Transporte

MCP suporta dois mecanismos de transporte:

- **stdio** — comunicação via stdin/stdout (local, IDEs)
- **Streamable HTTP** — comunicação remota via HTTP com Server-Sent Events

## Ciclo de Vida

1. **Initialize** — client e server negociam capabilities
2. **Operation** — troca de mensagens (requests, notifications)
3. **Shutdown** — encerramento gracioso da conexão

## Analogias

| Conceito | Analogia |
|----------|----------|
| MCP Server | Driver USB — traduz protocolo para dispositivo |
| MCP Client | Sistema operacional — gerencia conexões |
| Tools | Botões do dispositivo — ações disponíveis |
| Resources | Arquivos no dispositivo — dados acessíveis |

## Conexão com o Ecossistema Hotmart

Na Hotmart, MCPs conectam agentes (CAIO, SARA, AI Companion) a serviços internos de forma padronizada. O Hotmart AI Gateway v2 atua como orquestrador, e MCPs como Atlassian, Cosmos DS e GitHub já estão ativos.

## Referências

- [Especificação MCP](https://modelcontextprotocol.io)
- [MCP GitHub](https://github.com/modelcontextprotocol)
- Anthropic Blog: "Introducing the Model Context Protocol"
