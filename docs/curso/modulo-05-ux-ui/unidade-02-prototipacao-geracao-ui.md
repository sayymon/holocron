---
titulo: "Prototipação e Geração de UI com IA"
modulo: 5
unidade: 2
tags: [text-to-ui, firebase-studio, figma, prototipacao, code-generation]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada — Módulo 05"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Prototipação e Geração de UI com IA

## Contexto

A geração de interfaces a partir de linguagem natural ([[text-to-ui]]) é uma das aplicações mais tangíveis de IA generativa. Ferramentas como v0.dev, Firebase Studio e plugins Figma permitem ir de uma descrição textual a código funcional em minutos.

## Text-to-UI

O paradigma [[text-to-ui]] transforma prompts em interfaces renderizáveis:

```
Prompt: "Dashboard com sidebar, gráfico de vendas mensal e tabela de leads recentes"
Output: Componente React com Tailwind, responsivo, pronto para customização
```

### Ferramentas Principais

| Ferramenta | Output | Stack |
|------------|--------|-------|
| v0.dev (Vercel) | React + Tailwind + shadcn/ui | Next.js |
| Bolt.new | Full-stack app | Vite + React |
| Lovable | App completo com backend | React + Supabase |
| Firebase Studio | Protótipo + deploy | Next.js + Firebase |

## Firebase Studio

Firebase Studio (evolução do Project IDX) é um ambiente cloud que integra:

1. **App Prototyping** — descreva o app em linguagem natural
2. **Gemini integrado** — assistente de código contextual
3. **Deploy direto** — Firebase Hosting com um clique
4. **Emuladores** — teste local de Auth, Firestore, Functions

### Fluxo Típico

```
Descrição natural → Gemini gera scaffold → Iteração com chat → Preview → Deploy
```

### Quando Usar

- Prototipação rápida de ideias
- MVPs para validação
- Demos para stakeholders
- Aprendizado de novos frameworks

## Figma → Código

A ponte entre design e implementação:

### Abordagens

| Método | Ferramenta | Qualidade |
|--------|-----------|-----------|
| Plugin nativo | Figma Dev Mode | Tokens + specs |
| IA generativa | Anima, Locofy | Código React/Vue |
| MCP + agente | [[figma]] MCP Server | Contexto completo para LLM |
| Manual assistido | Copilot + design specs | Controle total |

### Figma MCP

O [[mcp]] permite que agentes de IA acessem o contexto do Figma:

- Leitura de componentes, tokens, variantes
- Geração de código respeitando o [[design-system]]
- Sincronização bidirecional design ↔ código

## Boas Práticas

1. **Prompt específico** — inclua stack, estilo, responsividade
2. **Itere, não refaça** — refine o output ao invés de regenerar
3. **Extraia componentes** — quebre UIs grandes em partes menores
4. **Valide acessibilidade** — ferramentas geram visual, não semântica
5. **Mantenha design system** — use tokens do seu [[design-system]] como constraint

## Limitações

- Código gerado pode não seguir padrões do projeto
- Componentes complexos (drag-and-drop, animações) ainda precisam de dev manual
- Sem contexto de negócio, a IA gera UI genérica
- Performance do código gerado precisa de revisão

## Conexões

- [[text-to-ui]] — paradigma central desta unidade
- [[prompt-engineering]] — qualidade do input define o output
- [[figma]] — ferramenta de design dominante
- [[mcp]] — protocolo para integração Figma ↔ agentes
- [[design-system]] — constraint para geração consistente
- [[firebase]] — plataforma de deploy e backend
