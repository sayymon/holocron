---
titulo: "Usando o MCP Inspector com o Holocron"
tags: [mcp, inspector, debug, desenvolvimento, tools]
fonte: "Documentação oficial + experiência prática"
confiabilidade: alta
---

# MCP Inspector — Testando o Server Holocron

## O que é

O [MCP Inspector](https://github.com/modelcontextprotocol/inspector) é uma ferramenta visual interativa para testar e debugar MCP servers. Funciona como um "Postman para MCP" — conecta ao seu server, lista tools/resources/prompts e permite invocar manualmente.

## Pré-requisitos

- Node.js 20+
- Banco PostgreSQL rodando (`npm run db:up`)
- Variáveis de ambiente configuradas (`.env`)
- Índice RAG populado (se quiser testar `search_content`)

## Como Rodar

```bash
# Na raiz do projeto holocron
npx @modelcontextprotocol/inspector tsx src/mcp/index.ts
```

Isso vai:
1. Subir o Inspector (UI web)
2. Conectar ao server Holocron via stdio
3. Abrir no browser (geralmente `http://localhost:6274`)

## Interface

Ao abrir, você verá:

- **Tools** — lista todas as tools expostas pelo server
- **Resources** — recursos estáticos (se houver)
- **Prompts** — templates de prompt (se houver)

Para cada tool, o Inspector mostra:
- Nome e descrição
- Schema de input (parâmetros com tipos)
- Formulário para testar manualmente

## Tools Disponíveis no Holocron

### Síncronas (resposta imediata)

| Tool | Descrição | Parâmetros |
|------|-----------|------------|
| `list_modules` | Lista os 12 módulos do curso | nenhum |
| `get_module` | Retorna README de um módulo | `module_number` (1-12) |
| `get_document` | Conteúdo de um doc da KB | `document_path` (caminho relativo) |
| `get_exploration_state` | Estado do Knowledge Graph | nenhum |
| `suggest_next_topics` | Sugere próximos tópicos | `current_topic?` |
| `list_graph_nodes` | Lista nós do grafo com filtros | `filter?`, `area?` |
| `crystallize_node` | Cristaliza tópico no grafo | vários (ver schema) |

### Assíncronas (retorna task_id → polling)

| Tool | Descrição | Parâmetros |
|------|-----------|------------|
| `search_content` | Busca semântica na KB | `query`, `limit?` |
| `ask_tutor` | Pergunta ao tutor socrático | `question` |
| `explore_topic` | Sessão socrática sobre tópico | `topic`, `context?` |
| `get_task_result` | Obtém resultado de task async | `task_id` |

## Testando Passo a Passo

### 1. Testar tool síncrona simples

1. Clique em **Tools** → `list_modules`
2. Clique em **Run Tool** (sem parâmetros)
3. Veja a lista de módulos retornada

### 2. Testar tool com parâmetros

1. Clique em `get_module`
2. Preencha `module_number`: `3`
3. **Run Tool** → veja o README do módulo 03 (MCP)

### 3. Testar fluxo assíncrono

1. Clique em `search_content`
2. Preencha `query`: `"o que são embeddings?"`
3. **Run Tool** → recebe `task_id`
4. Copie o `task_id` retornado
5. Vá em `get_task_result`
6. Cole o `task_id`
7. **Run Tool** → resultado da busca (ou "ainda processando")

### 4. Testar Knowledge Graph

1. `get_exploration_state` → veja o progresso
2. `list_graph_nodes` com `filter`: `"explored"` → nós já cristalizados
3. `suggest_next_topics` → próximas sugestões

## Dicas

- **Hot reload:** Se alterar o código do server, pare o Inspector (Ctrl+C) e rode novamente.
- **Stderr:** Logs do server (erros, warnings) aparecem no terminal onde o Inspector roda.
- **Variáveis de ambiente:** O Inspector herda o `.env` do diretório onde é executado.
- **Timeout:** Tools async podem demorar — espere 5-10s antes de fazer polling.

## Troubleshooting

| Problema | Solução |
|----------|---------|
| "Connection refused" | Verifique se não há outro processo na porta |
| Tool retorna erro de DB | Confirme `npm run db:up` e `npm run db:migrate` |
| search_content falha | Rode `npm run index` antes para popular embeddings |
| Inspector não abre | Tente `npx @modelcontextprotocol/inspector@latest tsx src/mcp/index.ts` |

## Adicionando ao Scripts (opcional)

Para facilitar, adicione ao `package.json`:

```json
{
  "scripts": {
    "mcp:inspect": "npx @modelcontextprotocol/inspector tsx src/mcp/index.ts"
  }
}
```

Depois:

```bash
npm run mcp:inspect
```

## Referências

- [MCP Inspector — GitHub](https://github.com/modelcontextprotocol/inspector)
- [MCP Protocol Spec](https://spec.modelcontextprotocol.io)
- [[mcp-servers-discovery]] — Conceito de MCP no Knowledge Graph
