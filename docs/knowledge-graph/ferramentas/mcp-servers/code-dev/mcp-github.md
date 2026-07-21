---
titulo: "MCP GitHub — Repos, PRs, Issues e Code Search"
tags: [mcp, github, repos, pull-requests, issues, code-search]
fonte: Docs oficiais + pesquisa
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - coding-assistants
  - kiro
---
# MCP GitHub — Repos, PRs, Issues e Code Search

## O que é

O MCP server oficial do GitHub. Dá ao LLM acesso completo a repositórios, pull requests, issues, code search e file contents via GitHub API.

**O mais popular do ecossistema MCP** — presente em praticamente toda config de dev.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `search_repositories` | Buscar repos por query |
| `search_code` | Buscar código no GitHub |
| `get_file_contents` | Ler arquivos de um repo |
| `create_or_update_file` | Criar/editar arquivo |
| `push_files` | Push múltiplos arquivos (single commit) |
| `create_issue` | Criar issue |
| `list_issues` | Listar/filtrar issues |
| `create_pull_request` | Criar PR |
| `list_pull_requests` | Listar PRs |
| `get_pull_request_diff` | Ver diff de PR |
| `create_branch` | Criar branch |
| `fork_repository` | Fork |
| `list_commits` | Histórico de commits |
| `search_users` | Buscar usuários |

## Instalação

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "<your-personal-access-token>"
      }
    }
  }
}
```

### Token Necessário

GitHub Personal Access Token com scopes:
- `repo` (acesso a repos privados)
- `read:org` (se precisa de org data)
- `workflow` (se precisa de Actions)

## Casos de Uso

- **Code review**: Ler diff de PR → analisar → sugerir melhorias
- **Issue triage**: Listar issues → classificar por prioridade/label
- **Explorar repos**: Buscar código → entender padrões usados
- **Automação**: Criar branches, PRs, issues programaticamente
- **Onboarding**: LLM explora codebase de um novo projeto

## Na Hotmart/Kiro

Já configurado. Usado para:
- Criar PRs diretamente do chat
- Buscar código em repos da org
- Navegar issues sem sair do IDE

## Limitações

- Rate limit da GitHub API (5000 req/hr com token)
- Não executa Actions/Workflows
- File contents limitado a arquivos < 1MB
- Busca por código depende de indexação do GitHub

## Alternativas

| Server | Diferença |
|--------|-----------|
| **GitLab MCP** | Para repos GitLab (MRs, pipelines) |
| **Gitea MCP** | Self-hosted Git |

## Conexões

- [[mcp-overview]] — Protocolo
- [[coding-assistants]] — Principal consumidor
- [[kiro]] — Configurado aqui
