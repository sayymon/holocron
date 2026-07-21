---
titulo: "MCP PostgreSQL — Queries e Schema no IDE"
tags: [mcp, postgres, database, sql, schema, queries]
fonte: Docs oficiais + pesquisa
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - pgvector
  - vector-databases
---
# MCP PostgreSQL — Queries e Schema no IDE

## O que é

MCP server oficial para PostgreSQL. Permite ao LLM **executar queries, inspecionar schemas e explorar dados** diretamente. Fundamental para qualquer app que usa Postgres.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `query` | Executar SQL (SELECT, INSERT, UPDATE, DELETE) |
| `list_tables` | Listar tabelas do schema |
| `describe_table` | Schema de uma tabela (colunas, tipos, constraints) |
| `list_schemas` | Schemas disponíveis |

## Instalação

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:pass@localhost:5432/mydb"
      ]
    }
  }
}
```

**Atenção:** A connection string contém credenciais. Use variável de ambiente em produção.

## Variante: Postgres MCP Pro

Server da comunidade com features extras:

| Feature | Oficial | Pro |
|---------|:-------:|:---:|
| Queries | ✅ | ✅ |
| Schema inspection | ✅ | ✅ |
| EXPLAIN plans | ❌ | ✅ |
| Index suggestions | ❌ | ✅ |
| Read-only mode | ❌ | ✅ |
| Query history | ❌ | ✅ |

## Casos de Uso

- **Explorar dados**: "Quais tabelas tem? Qual o schema de users?"
- **Debug**: "Porque essa query está lenta?" (com EXPLAIN via Pro)
- **Gerar migrations**: LLM vê schema atual → gera SQL de alteração
- **Análise**: "Quantos usuários criados este mês?"
- **RAG/pgvector**: "Busca os 5 documentos mais similares a X"

## Segurança

| Risco | Mitigação |
|-------|-----------|
| DROP TABLE acidental | Usar user read-only no Postgres |
| Exposição de dados sensíveis | Limitar tabelas acessíveis |
| Connection string vazada | Env var, nunca hardcode |
| Queries pesadas | Timeout no server |

**Recomendação:** Crie um user PostgreSQL read-only para o MCP server:
```sql
CREATE USER mcp_reader WITH PASSWORD 'xxx';
GRANT CONNECT ON DATABASE mydb TO mcp_reader;
GRANT USAGE ON SCHEMA public TO mcp_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO mcp_reader;
```

## No Holocron

Conecta ao banco local PostgreSQL + pgvector:
- Inspecionar embeddings
- Verificar dados do aluno
- Debug de queries RAG

## Conexões

- [[mcp-overview]] — Protocolo
- [[pgvector]] — Extensão de vectors no mesmo Postgres
- [[rag]] — Pipeline que consulta o banco
