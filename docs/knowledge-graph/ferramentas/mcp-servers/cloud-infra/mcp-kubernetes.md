---
titulo: "MCP Kubernetes — Pods, Deployments e Logs no IDE"
tags: [mcp, kubernetes, k8s, pods, deployments, logs, devops]
fonte: Pesquisa consolidada
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: mcp-servers
status: explored
connections:
  - mcp-overview
  - observabilidade-llm
---
# MCP Kubernetes — Pods, Deployments e Logs no IDE

## O que é

MCP server para Kubernetes. Permite ao LLM **listar pods, ver logs, descrever deployments e debugar problemas** sem sair do IDE. Usa o kubeconfig local.

## Tools Disponíveis

| Tool | Função |
|------|--------|
| `list_pods` | Listar pods por namespace |
| `get_pod_logs` | Logs de um pod/container |
| `describe_pod` | Detalhes (events, status, conditions) |
| `list_deployments` | Deployments por namespace |
| `describe_deployment` | Detalhes de deployment |
| `list_services` | Services expostos |
| `list_namespaces` | Namespaces do cluster |
| `get_events` | Events recentes (warnings, erros) |

## Instalação

```json
{
  "mcpServers": {
    "kubernetes": {
      "command": "npx",
      "args": ["-y", "kubernetes-mcp-server"],
      "env": {
        "KUBECONFIG": "~/.kube/config"
      }
    }
  }
}
```

Usa o kubeconfig local — acesso aos mesmos clusters que você tem via `kubectl`.

## Casos de Uso

- **Debug em produção**: "Quais pods estão em CrashLoopBackOff?"
- **Logs**: "Mostra logs do pod X nos últimos 5 min"
- **Incident response**: "Quais events de Warning ocorreram?"
- **Capacity**: "Quantos pods estão rodando no namespace Y?"
- **Deploy check**: "O deployment Z está healthy?"

## Relevância Hotmart

Com 60 clusters K8s na Hotmart, esse MCP seria valioso para:
- Investigar incidentes sem sair do IDE
- Verificar status de deploys pós-ArgoCD sync
- Ler logs de serviços (SARA, CAIO, etc.)

## Segurança

| Risco | Mitigação |
|-------|-----------|
| Acesso a prod | Usar kubeconfig com role read-only |
| Delete/scale acidental | Não dar permissão de write |
| Exposição de secrets | Server não deve retornar Secrets |

## Conexões

- [[mcp-overview]] — Protocolo
- [[observabilidade-llm]] — Debugging em produção
- [[mcp-sentry]] — Complementa (errors + infra)
