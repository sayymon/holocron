---
titulo: "Projeto Integrador DevOps"
modulo: 6
unidade: 12
tags: [projeto, integrador, agente-devops, iac, kubernetes, observabilidade, capstone]
dificuldade: avançada
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Projeto Integrador DevOps

## Objetivos de Aprendizagem

- Integrar todas as capacidades do módulo em um agente/copilot completo
- Demonstrar fluxo end-to-end: IaC → Deploy → Observabilidade → Remediação
- Implementar arquitetura multi-agente para operações DevOps
- Entregar um sistema production-ready com segurança e auditoria

## Especificação do Projeto

### Visão Geral

Construir um **DevOps AI Agent** que opera como um SRE virtual, capaz de:
1. Gerar e validar infraestrutura (IaC)
2. Gerenciar deployments em Kubernetes
3. Monitorar e diagnosticar problemas
4. Executar remediações com supervisão humana

### Arquitetura Multi-Agente

```
Orchestrator Agent
    ├── IaC Agent (Terraform/Helm generation + validation)
    ├── K8s Agent (deploy, scale, rollback)
    ├── Observability Agent (metrics, logs, anomalies)
    ├── Security Agent (scan, fix, compliance)
    ├── FinOps Agent (cost analysis, rightsizing)
    └── Remediation Agent (playbooks, canary, HITL)
```

### Requisitos Funcionais

| Capacidade | Unidades Integradas | Critério de Aceite |
|-----------|--------------------|--------------------|
| NL → IaC | 01, 02 | Gera Terraform válido a partir de descrição |
| Deploy GitOps | 03, 08 | PR → ArgoCD → Canary → Promote/Rollback |
| Monitoring | 05 | Dashboard auto-gerado, alertas preditivos |
| Troubleshooting | 04, 10 | RCA automático com timeline |
| Remediação | 11 | Playbook executado com dry-run + HITL |
| ChatOps | 06 | Interface conversacional com RBAC |
| Segurança | 07 | Scan + fix automático de CVEs |
| FinOps | 09 | Relatório de custos + recomendações |

### Requisitos Não-Funcionais

- **Segurança:** RBAC, audit log, secrets management
- **Observabilidade:** LangFuse para traces de LLM, métricas do agente
- **Resiliência:** Circuit breakers, fallbacks, graceful degradation
- **Testabilidade:** Cenários simulados, chaos engineering

### Entregáveis

1. **Código-fonte** do agente multi-agent com testes
2. **Documentação** de arquitetura (ADR + diagramas)
3. **Demo** gravada mostrando fluxo completo
4. **Runbook** do próprio agente (como operar, troubleshoot)
5. **Métricas** de eficácia (tempo de resolução, accuracy)

## Critérios de Avaliação

| Critério | Peso | Excelente | Suficiente |
|----------|------|-----------|------------|
| Integração | 30% | Todos os agentes colaboram | 4+ agentes funcionais |
| Segurança | 20% | HITL + RBAC + audit completo | HITL básico |
| Qualidade | 20% | Testes + observabilidade + docs | Testes básicos |
| Inovação | 15% | Abordagem criativa, além do pedido | Requisitos atendidos |
| Apresentação | 15% | Demo fluida, arquitetura clara | Funcional |

## Conexões

- **Todas as unidades** do módulo convergem aqui
- **Módulo 04:** Padrões de agentes aplicados
- **Módulo 08:** Arquitetura AI-First
- **empresa:** Heimdall + ArgoCD + Karpenter + NewRelic como inspiração
