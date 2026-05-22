# Steerings — Instruções para Agentes de IA

Este diretório contém instruções genéricas que qualquer IDE agêntica ou assistente de IA pode consumir para entender o contexto do projeto Holocron AI Engineer.

## Estrutura

| Arquivo | Propósito |
|---------|-----------|
| `project-context.md` | Visão geral do projeto, arquitetura e decisões |
| `coding-standards.md` | Padrões de código, convenções e stack |
| `knowledge-base.md` | Como criar e manter documentos atômicos |
| `architecture.md` | Decisões técnicas, patterns e constraints |

## Como usar

### Kiro
Os steerings são carregados automaticamente via `.kiro/` que referencia este diretório.

### Cursor
Copie ou symlink o conteúdo para `.cursor/rules/` ou use `@steerings/` nas instruções.

### Antigravity
Configure em `.antigravity/` apontando para estes arquivos.

### Claude (Claude Code / API)
Passe o conteúdo de `project-context.md` como system prompt ou contexto de projeto.

## Princípio

Os steerings são **genéricos e portáveis**. Não dependem de nenhuma IDE específica. Qualquer agente que leia Markdown consegue entender o contexto.
