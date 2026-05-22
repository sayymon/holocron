---
titulo: "Segurança e Governança em MCPs"
modulo: 3
unidade: 6
tags: [mcp, segurança, governança, auth, rate-limiting, waf]
dificuldade: avançado
fonte: "Curso Engenharia de IA Aplicada + Práticas de Segurança"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Segurança e Governança em MCPs

## Por que Segurança em MCP é Crítica?

MCPs dão a LLMs acesso a sistemas reais. Um prompt injection bem-sucedido pode se tornar uma ação destrutiva (deletar dados, enviar emails, modificar infra). A superfície de ataque é amplificada.

## Modelo de Ameaças

| Ameaça | Vetor | Impacto |
|--------|-------|---------|
| Prompt Injection | Usuário manipula LLM para chamar tools maliciosamente | Ações não autorizadas |
| Data Exfiltration | LLM retorna dados sensíveis ao usuário | Vazamento de dados |
| Privilege Escalation | Tool executada com permissões além do necessário | Acesso indevido |
| Denial of Service | Chamadas excessivas a tools | Indisponibilidade |
| Supply Chain | MCP Server malicioso no ecossistema | Comprometimento total |

## Camadas de Segurança

### 1. Autenticação (AuthN)

```typescript
// OAuth 2.0 no transporte HTTP
app.post("/mcp", authenticateMiddleware, async (req, res) => {
  const user = req.user; // Identidade verificada
  const transport = new StreamableHTTPServerTransport({ /* ... */ });
  // Passar contexto de usuário para o server
});
```

### 2. Autorização (AuthZ)

```typescript
server.tool("deletar_usuario", { id: z.string() }, async ({ id }, { meta }) => {
  const caller = meta?.caller;
  if (!caller?.roles.includes("admin")) {
    return { content: [{ type: "text", text: "Permissão negada" }], isError: true };
  }
  // Executar ação
});
```

### 3. Rate Limiting

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // máximo 100 requests por minuto
  message: "Rate limit excedido",
});

app.post("/mcp", limiter, handler);
```

### 4. Input Validation (Defense in Depth)

```typescript
// Zod já valida, mas adicionar sanitização extra
server.tool("query", { sql: z.string().max(500) }, async ({ sql }) => {
  // NUNCA executar SQL direto do input
  // Usar queries parametrizadas ou allowlist
  if (!ALLOWED_QUERIES.includes(sql)) {
    return { content: [{ type: "text", text: "Query não permitida" }], isError: true };
  }
});
```

### 5. Approval Flow (Human-in-the-Loop)

O protocolo MCP suporta que o client peça aprovação do usuário antes de executar tools destrutivas. Implementar para:
- Operações de escrita/delete
- Ações com side-effects irreversíveis
- Acesso a dados sensíveis

### 6. WAF (Web Application Firewall)

Para MCP Servers expostos via HTTP:
- AWS WAF ou Cloudflare em frente ao endpoint
- Regras contra payloads maliciosos
- Geo-blocking se aplicável
- Bot detection

## Princípios de Governança

| Princípio | Implementação |
|-----------|---------------|
| Least Privilege | Cada tool tem permissões mínimas necessárias |
| Defense in Depth | Múltiplas camadas (auth + authz + validation + rate limit) |
| Audit Trail | Logar toda chamada de tool (quem, quando, o quê) |
| Fail Secure | Em caso de erro, negar acesso (não permitir) |
| Separation of Concerns | Server de leitura separado de server de escrita |

## Checklist de Segurança para MCP em Produção

- [ ] AuthN configurado (OAuth 2.0 / API Key)
- [ ] AuthZ por tool (RBAC ou ABAC)
- [ ] Rate limiting ativo
- [ ] Input validation com Zod + sanitização
- [ ] Logs de auditoria (quem chamou, quando, resultado)
- [ ] Secrets em vault (não hardcoded)
- [ ] Tools destrutivas com approval flow
- [ ] Testes de segurança (injection, escalation)
- [ ] WAF para endpoints HTTP públicos
- [ ] Monitoramento de anomalias

## Anti-padrões

- ❌ MCP Server sem autenticação "porque é interno"
- ❌ Credenciais do serviço backend no código do server
- ❌ Tools que executam SQL/comandos arbitrários do input
- ❌ Sem rate limiting (um agente pode fazer 1000 calls/segundo)
- ❌ Logs sem informação de quem chamou
