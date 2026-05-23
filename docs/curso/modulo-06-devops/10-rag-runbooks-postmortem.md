---
titulo: "RAG de Runbooks e Post-mortem"
modulo: 6
unidade: 10
tags: [rag, runbooks, postmortem, indexacao, agente, timeline, lessons-learned]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# RAG de Runbooks e Post-mortem

## Objetivos de Aprendizagem

- Indexar runbooks operacionais para retrieval em tempo de incidente
- Construir agente que executa runbooks passo-a-passo
- Gerar timelines de incidente automaticamente
- Extrair lessons learned e alimentar base de conhecimento

## Conceitos-Chave

### Indexação de Runbooks

**Estrutura de um runbook indexável:**
```markdown
# Runbook: Alta latência no API Gateway
## Sintomas: p99 > 2s, error rate > 5%
## Passos:
1. Verificar métricas do gateway (PromQL: ...)
2. Checar upstream services (kubectl get pods ...)
3. Verificar rate limiting (redis-cli ...)
## Escalação: Se não resolver em 15min → page SRE lead
```

**Pipeline de indexação:**
```
Runbooks (Confluence/Git) → Parser estruturado → Chunks por passo
                                                       ↓
              Embeddings → Vector DB → Metadata (sintomas, serviço, severidade)
```

### Agente Runbook

```
Alerta dispara → Retrieval (sintomas → runbook relevante)
                       ↓
    Agente executa passo-a-passo → Valida resultado de cada passo
         ├── Passo resolveu? → Documenta e encerra
         └── Passo falhou? → Próximo passo ou escalação
```

**Diferencial vs runbook estático:** O agente adapta os passos ao contexto real (métricas atuais, estado do cluster, histórico recente).

### Timeline de Incidente

**Geração automática:**
```
Fontes: alerts, deploys, PRs, config changes, scaling events
     ↓
Correlação temporal → Ordenação → Causalidade inferida
     ↓
Timeline estruturada com causa provável destacada
```

**Exemplo de output:**
```
10:00 - Deploy v2.3.1 (PR #456 - novo handler de upload)
10:05 - Memory usage crescendo (pod api-server-xyz)
10:12 - OOMKilled event
10:12 - Pod restart (CrashLoopBackOff)
10:15 - Alerta: error rate > 5%
10:18 - Rollback automático para v2.3.0
10:20 - Métricas normalizadas
ROOT CAUSE: Memory leak no handler de upload (PR #456)
```

### Lessons Learned

**Extração automática de post-mortems:**
- Padrões recorrentes (mesmo serviço, mesmo tipo de erro)
- Action items não cumpridos
- Tempo médio de resolução por categoria
- Eficácia de runbooks (resolveu? em quanto tempo?)

## Exercício Prático

1. Indexe 10+ runbooks com metadata estruturada em vector DB
2. Construa um agente que seleciona e executa runbook baseado em alerta
3. Implemente gerador de timeline a partir de múltiplas fontes de eventos
4. Crie extrator de lessons learned que identifica padrões recorrentes

## Conexões

- **Unidade 04:** RCA alimenta post-mortems
- **Unidade 05:** Alertas trigam busca de runbooks
- **Unidade 11:** Runbooks são base para auto-remediação
- **empresa:** Holocron como base de conhecimento, SARA para resolução
