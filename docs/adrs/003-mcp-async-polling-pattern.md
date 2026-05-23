# ADR 003 — Padrão Async com Polling para Tools MCP de Longa Duração

**Status:** Aceito  
**Data:** 2026-05-22  
**Autor:** Saymon Silva  

## Contexto

O MCP Server do Holocron expõe tools que dependem de chamadas externas (API de embeddings via OpenRouter + queries no pgvector). Essas operações levam de 1 a 35 segundos para completar.

Clientes MCP (Kiro, Claude Desktop, etc.) possuem timeouts curtos para respostas de tools via stdio transport. Quando a tool demora mais que o timeout do client, a conexão é encerrada e o processo MCP pode ser reiniciado, perdendo o resultado.

### Problema observado

- `search_content` (embedding + pgvector): ~1-3s
- `ask_tutor` (RAG + LLM generation): ~15-35s
- Timeout do Kiro para tools MCP: aparentemente < 5s para considerar "connection error"

## Decisão

Implementar o padrão **async com polling** (fire-and-forget + poll for result):

1. Tools de longa duração (`search_content`, `ask_tutor`) retornam **imediatamente** com um `task_id`
2. A execução real acontece em background (Promise não-bloqueante)
3. Uma nova tool `get_task_result` permite polling do resultado por `task_id`
4. Tasks expiram após 10 minutos (cleanup automático)

### Fluxo

```
Client → search_content("O que é RAG?")
Server → { task_id: "abc123" }  (instantâneo, < 50ms)

[client aguarda alguns segundos]

Client → get_task_result("abc123")
Server → { status: "pending" }  ou  { status: "completed", result: "..." }
```

## Alternativas Consideradas

### 1. Progress Notifications (MCP SDK nativo)
- O SDK suporta `sendProgress()` para manter o client informado
- **Descartado:** Clientes TypeScript têm hard limit de 60s que não reseta com progress updates. Além disso, nem todos os clients MCP implementam progress notifications.

### 2. Aumentar timeout do client
- Configurar `MCP_SERVER_REQUEST_TIMEOUT` no client
- **Descartado:** Não é portável — cada client tem sua configuração. Não resolve o problema para todos os ambientes.

### 3. Streamable HTTP transport
- Migrar de stdio para HTTP com SSE
- **Descartado por ora:** Adiciona complexidade (HTTP server, CORS, sessions). O stdio é mais simples para uso local. Pode ser reconsiderado no futuro para deploy remoto.

### 4. Execução síncrona com timeout curto
- Tentar executar dentro do handler com timeout, fallback para erro
- **Descartado:** Não resolve — o client já desconectou antes do timeout interno.

## Implementação

### Arquivos criados/modificados

- `src/mcp/task-store.ts` — Store in-memory com Map, TTL de 10min, UUID curto (8 chars)
- `src/mcp/tools.ts` — `search_content` e `ask_tutor` usam `createTask()`, nova tool `get_task_result`
- `src/mcp/index.ts` — Handlers de `unhandledRejection` e `uncaughtException` para evitar crash do processo

### Detalhes técnicos

- Tasks armazenadas em `Map<string, Task>` (in-memory, sem persistência)
- IDs gerados com `crypto.randomUUID().slice(0, 8)` (curtos para facilitar uso)
- Cleanup de tasks antigas executado a cada chamada de `search_content` ou `ask_tutor`
- Erros capturados com stack trace completo para debugging

## Consequências

### Positivas
- Tools respondem instantaneamente — sem timeout
- Compatível com qualquer client MCP (não depende de features avançadas)
- Processo MCP não crasha com erros de rede
- Stack trace completo disponível em caso de falha

### Negativas
- Requer duas chamadas (fire + poll) ao invés de uma
- Tasks em memória — perdidas se o processo reiniciar
- Client precisa saber fazer polling (documentado na descrição da tool)

### Riscos
- Se o client reiniciar o processo MCP entre fire e poll, a task se perde
- Memory leak teórico se muitas tasks forem criadas sem cleanup (mitigado pelo TTL de 10min)

## Notas adicionais

### Fix de TLS
Durante a investigação, descobrimos que o processo MCP precisa de `NODE_TLS_REJECT_UNAUTHORIZED=0` no env para conectar ao OpenRouter. Sem isso, o OpenAI SDK falha com "Connection error". Isso é causado por configurações de npm/TLS herdadas do ambiente.

## Referências

- [MCP SDK - Progress Notifications](https://ts.sdk.modelcontextprotocol.io/documents/protocol.html)
- [Fix MCP Server Timeout Errors](https://rapidevelopers.com/mcp-tutorial/how-to-fix-mcp-server-timeout-errors)
- [MCP Spec - Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
