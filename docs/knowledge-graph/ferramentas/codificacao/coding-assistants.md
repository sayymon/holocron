---
titulo: "Coding Assistants — IDEs com IA"
tags: [coding, ide, kiro, cursor, copilot, windsurf, claude-code]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: tools-developers
status: explored
connections:
  - llms
  - mcp
  - anthropic-claude
  - agentes-ia
---
# Coding Assistants — IDEs com IA

## O que é

Coding Assistants são ferramentas que integram LLMs no fluxo de desenvolvimento — autocompletar código, gerar funções, refatorar, debugar, e até agir autonomamente em tasks complexas (multi-file edits, testes, PRs).

Em 2026, migraram de "autocomplete fancy" para **agentes de código** que entendem codebases inteiras.

## Ferramentas Principais

| Ferramenta | Base | Preço/mês | Modelo Default | Diferencial |
|------------|------|:---------:|----------------|-------------|
| **[[kiro]]** | Code OSS (AWS) | Free: 50cr / Pro: $20 | Claude Sonnet | Spec-driven, Hooks, Steering, MCP |
| **Cursor** | VS Code Fork | Free: limitado / Pro: $20 | Multi-model | Agent mode, codebase completa, background agents |
| **GitHub Copilot** | VS Code ext | Free: 50 req / Pro: $10 | GPT-4.1 | Ecossistema GitHub, 20M+ devs, multi-IDE |
| **Windsurf** | VS Code Fork (Cognition) | Pro: $15 | Multi-model | Cascade agent, Devin integration, autonomia |
| **Claude Code** | Terminal | Max: $100 (incluso) | Claude Sonnet/Opus | Terminal-first, full autonomy, git-aware |
| **Cline** | VS Code ext | Sua API key | Qualquer | Open-source, pay-your-own |
| **Aider** | Terminal | Grátis (OSS) | Qualquer | Git-aware, pair programming |

## Critérios de Escolha

| Necessidade | Recomendação |
|-------------|-------------|
| Estrutura (specs, hooks, governança) | **[[kiro]]** |
| Velocidade + entender codebase inteira | **Cursor** |
| Ecossistema + multi-IDE + empresas | **GitHub Copilot** |
| Autonomia máxima IDE-based | **Windsurf** |
| Agente terminal autônomo | **Claude Code** |
| Budget-zero, traz sua API key | **Cline** ou **Aider** |

## Paradigmas

| Paradigma | Como funciona | Exemplos |
|-----------|---------------|----------|
| **Autocomplete** | Sugere próximas linhas enquanto digita | Copilot inline, Cursor Tab |
| **Chat** | Pergunta/resposta sobre código | Todos |
| **Edit** | Seleciona código, pede mudança | Cursor Cmd+K, Kiro |
| **Agent** | Define task, IDE executa autonomamente | Cursor Agent, Kiro Autopilot |
| **Background** | Agente roda em paralelo enquanto você trabalha | Cursor Background Agent |
| **Spec-driven** | Define requirements → design → tasks → implementa | **Kiro Specs** |

## O que Diferencia Kiro

| Feature | Descrição |
|---------|-----------|
| **Specs** | Requirements → Design → Tasks estruturados |
| **Hooks** | Automações IDE (lint on save, test on edit) |
| **Steering** | Contexto persistente para o agente |
| **MCP nativo** | Integra ferramentas externas (Jira, Figma, etc.) |
| **Autopilot/Supervised** | Controle de autonomia |
| **AWS native** | Integração com ecossistema AWS |

## Custos Reais

O preço da assinatura é só parte do custo:
- **Cursor Pro ($20)**: ~ilimitado com fair-use, modelo incluído
- **Copilot Pro ($10)**: 300 premium requests/mês
- **Kiro Pro ($20)**: 1000 credits/mês
- **Claude Code ($100 Max)**: ilimitado, mas tokens de API contam
- **Cline ($0 + sua API)**: Gasta seus tokens (~$5-50/mês dependendo do uso)

## Conceitos Relacionados

- [[llms]] — Modelos que alimentam os assistants
- [[mcp]] — Como assistants acessam tools externas
- [[agentes-ia]] — Paradigma agent mode
- [[anthropic-claude]] — Modelo principal de vários

## Conexões

- [[kiro]] — IDE atual
- [[mcp]] — Extensibilidade
- [[llms]] — Modelos usados
- [[agentes-ia]] — Paradigma
- [[anthropic-claude]] — Provider principal
