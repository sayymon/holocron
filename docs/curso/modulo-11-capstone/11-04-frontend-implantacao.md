---
titulo: "Front-End e Implantação"
modulo: 11
unidade: 4
tags: [capstone, frontend, deploy, nextjs, vercel, docker]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Front-End e Implantação

## Frontend

### Stack

| Tecnologia | Uso |
|-----------|-----|
| Next.js 14+ | Framework React com SSR/SSG |
| Tailwind CSS | Estilização utility-first |
| Vercel AI SDK | Streaming de LLM no frontend |
| shadcn/ui | Componentes acessíveis |

### Componentes Core

- **Chat interface** — streaming, markdown rendering, code highlighting
- **Dashboard** — progresso, métricas, histórico
- **Auth flow** — login, registro, recuperação
- **Settings** — preferências do usuário

### UX para IA

- Indicadores de "pensando" (skeleton, typing indicator)
- Streaming token-by-token (não esperar resposta completa)
- Feedback inline (thumbs up/down por resposta)
- Citações clicáveis (link para fonte no RAG)

## Implantação

### Opções de Deploy

| Plataforma | Frontend | Backend | Custo |
|-----------|----------|---------|-------|
| Vercel + Railway | ✅ | ✅ | ~$20-50/mês |
| Vercel + Fly.io | ✅ | ✅ | ~$15-40/mês |
| AWS (ECS/Lambda) | ✅ | ✅ | Variável |
| Docker Compose (VPS) | ✅ | ✅ | ~$10-30/mês |

### Checklist de Produção

```
□ HTTPS em todos os endpoints
□ Environment variables (não hardcoded)
□ Rate limiting configurado
□ Error tracking (Sentry)
□ Logs estruturados
□ Health check endpoint
□ CI/CD pipeline (GitHub Actions)
□ Backup de banco automatizado
□ Monitoramento de custos de LLM
```

### CI/CD Pipeline

```yaml
# GitHub Actions simplificado
trigger: push to main
steps:
  1. Lint + Type check
  2. Tests
  3. Build
  4. Deploy (preview em PR, prod em main)
```

## Conexões

- [[11-03-orquestracao-backend-mcp]] — frontend consome o backend
- [[11-05-apresentacao-defesa]] — demo funcional para apresentação
- [[11-01-ideacao-arquitetura]] — frontend implementa a UX planejada
- [[mlops]] — CI/CD e observabilidade em produção
