---
titulo: "Agentes de IA e CLI no Front-End"
modulo: 5
unidade: 3
tags: [agentes-de-ia, cli, gemini, scaffolding, frontend, developer-experience]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada — Módulo 05"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Agentes de IA e CLI no Front-End

## Contexto

[[agentes-de-ia]] no terminal estão transformando o fluxo de desenvolvimento frontend. Ferramentas como Gemini CLI, Claude Code e Kiro CLI permitem scaffolding, refatoração e geração de código diretamente do terminal, sem sair do contexto de trabalho.

## Gemini CLI

O Gemini CLI é a interface de linha de comando do Google para interação com modelos Gemini:

### Capacidades

- **Geração de código** — componentes, hooks, utils
- **Scaffolding** — estrutura de projetos completos
- **Refatoração** — migração de padrões, atualização de APIs
- **Explicação** — análise de código existente
- **Multimodal** — aceita imagens (screenshots → código)

### Fluxo de Trabalho

```bash
# Gerar componente a partir de descrição
gemini "Crie um componente React de tabela com sorting e pagination usando shadcn/ui"

# Scaffolding de feature completa
gemini "Scaffold uma feature de autenticação com login, registro e reset de senha"

# Refatorar código existente
gemini "Migre este componente de class para functional com hooks" < OldComponent.tsx
```

## Scaffolding com IA

### Padrão de Scaffolding Inteligente

```
1. Descreva a feature (prompt)
2. Agente analisa o projeto existente (contexto)
3. Gera estrutura de arquivos respeitando convenções
4. Cria código base com tipos, testes e stories
5. Dev revisa e itera
```

### Vantagens sobre Templates Estáticos

| Aspecto | Template | Agente IA |
|---------|----------|-----------|
| Contexto do projeto | ❌ Genérico | ✅ Lê convenções |
| Adaptação | ❌ Fixo | ✅ Adapta ao estilo |
| Completude | ❌ Boilerplate | ✅ Lógica inicial |
| Manutenção | ❌ Desatualiza | ✅ Sempre atual |

## Fluxo de Trabalho Integrado

### Developer Inner Loop com IA

```
Ideia → Prompt CLI → Código gerado → Review → Testes → Commit
  ↑                                                        |
  └────────────── Iteração via chat ───────────────────────┘
```

### Ferramentas no Ecossistema

| Ferramenta | Foco | Integração |
|------------|------|------------|
| Gemini CLI | Geração multimodal | Terminal + VS Code |
| Claude Code | Coding agent | Terminal |
| Kiro CLI | Dev workflow completo | Terminal + MCP |
| GitHub Copilot CLI | Comandos e scripts | Terminal |

## Boas Práticas

1. **Contexto é rei** — forneça arquivos relevantes ao agente
2. **Incremental > monolítico** — peça partes, não apps inteiros
3. **Review obrigatório** — código gerado não é código validado
4. **Versionamento** — commite antes de pedir refatorações grandes
5. **Prompt reusável** — salve prompts que funcionam bem como templates

## Integração com MCP

O [[mcp]] permite que CLIs acessem contexto externo:

- **Filesystem** — leitura de código existente
- **Git** — histórico, branches, PRs
- **Design** — Figma, design tokens
- **Docs** — Confluence, READMEs, ADRs

Isso transforma o CLI de "gerador de texto" em "agente contextual".

## Conexões

- [[agentes-de-ia]] — fundamento teórico dos agentes CLI
- [[mcp]] — protocolo de integração de contexto
- [[prompt-engineering]] — técnicas para prompts eficazes no CLI
- [[developer-experience]] — impacto na produtividade do dev
- [[react]] — framework alvo principal para geração
