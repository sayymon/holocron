---
titulo: "MCP Filesystem — Acesso a Arquivos Locais"
tags: [mcp, filesystem, files, directories, read, write, local]
fonte: Docs oficiais
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
---
# MCP Filesystem — Acesso a Arquivos Locais

## O que é

MCP server oficial para operações no filesystem local. Permite ao LLM **ler, escrever, buscar e listar** arquivos e diretórios com controle granular de quais paths são permitidos.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `read_file` | Ler conteúdo de um arquivo |
| `write_file` | Escrever/criar arquivo |
| `list_directory` | Listar conteúdo de pasta |
| `create_directory` | Criar diretório |
| `move_file` | Mover/renomear arquivo |
| `search_files` | Buscar por glob pattern |
| `get_file_info` | Metadata (tamanho, data, permissões) |
| `read_multiple_files` | Ler vários de uma vez |

## Instalação

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/saymon/Documents",
        "/Users/saymon/Projects"
      ]
    }
  }
}
```

**Os paths no args são os ÚNICOS diretórios acessíveis** — sandboxing nativo.

## Segurança

- O server só acessa diretórios explicitamente listados nos args
- Não tem acesso a paths fora do sandbox
- Ideal usar paths específicos (não `/` ou `~`)

## Casos de Uso

- **Config files**: Ler/editar configs (`.env`, `tsconfig`, etc)
- **Docs**: Navegar em pasta de documentação
- **Multi-projeto**: Acessar arquivos de outro repo
- **Log analysis**: Ler logs locais para debug

## Nota

Na maioria das IDEs (Kiro, Cursor), o acesso ao filesystem do workspace já é built-in. Este MCP é útil para:
- Acessar paths **fora do workspace**
- Usar em **Claude Desktop** (que não tem filesystem nativo)
- Dar acesso a **diretórios específicos** a outros hosts

## Conexões

- [[mcp-overview]] — Protocolo
- [[mcp-memory]] — Complemento (persistência semântica)
