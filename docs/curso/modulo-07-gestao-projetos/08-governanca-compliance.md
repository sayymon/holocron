---
titulo: "Governança, Compliance e Qualidade"
modulo: 7
unidade: 8
tags: [gestao-projetos, governanca, compliance, qualidade, checklists, auditoria]
dificuldade: avancado
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Governança, Compliance e Qualidade

## Conceito Central

IA automatiza verificações de governança, gera checklists contextuais, audita conformidade com padrões e mantém documentação de qualidade atualizada — reduzindo risco regulatório e overhead manual.

## Checklists Inteligentes

### Geração Contextual

IA gera checklists adaptados ao tipo de entrega:

| Tipo de Entrega | Checklist Gerado |
|----------------|-----------------|
| Nova feature | Code review, testes, docs, feature flag, rollback plan |
| Migração de dados | Backup, validação, rollback, comunicação, compliance |
| Integração externa | Contrato, SLA, segurança, fallback, monitoramento |
| Mudança de infra | Change request, janela, impacto, aprovações |

### Prompt para Checklist

```markdown
Tipo de entrega: {tipo}
Contexto: {descricao}
Regulações aplicáveis: {lgpd, sox, soc2, pci}

Gere checklist de governança com:
1. Items obrigatórios (bloqueiam deploy)
2. Items recomendados (best practice)
3. Evidências necessárias para auditoria
4. Aprovadores por item
```

## Auditoria Automatizada

```
Código/Config/Processo
    ↓
[Policy Engine] — regras de compliance como código
    ↓
[Scanner] — verifica conformidade automaticamente
    ↓
[Report] — findings + severidade + remediação
    ↓
[Tracking] — integra com Jira para resolução
```

### Verificações Automáticas

| Área | IA Verifica |
|------|-------------|
| LGPD/GDPR | Dados pessoais sem consentimento, retenção |
| SOC 2 | Controles de acesso, logs, encryption |
| Segurança | Secrets expostos, dependências vulneráveis |
| Qualidade | Cobertura de testes, code smells, docs |
| Processo | PRs sem review, deploys sem aprovação |

## Documentação de Qualidade

IA mantém documentação atualizada:

- **ADRs** — Gera rascunho de Architecture Decision Records
- **Runbooks** — Atualiza procedimentos operacionais
- **Postmortems** — Estrutura análise de incidentes
- **Change logs** — Gera a partir de commits/PRs

## Quality Gates com IA

```
PR Aberto
    ↓
[Gate 1] Testes passam? (CI)
    ↓
[Gate 2] Cobertura ≥ threshold? (Sonar)
    ↓
[Gate 3] Sem findings críticos? (Heimdall)
    ↓
[Gate 4] Docs atualizados? (IA verifica)
    ↓
[Gate 5] Aprovação de compliance? (se aplicável)
    ↓
Deploy permitido
```

## Exercício Prático

1. Identifique regulações aplicáveis ao seu projeto
2. Gere checklist de compliance com IA
3. Automatize 1 verificação como quality gate
4. Crie template de ADR assistido por IA

## Armadilhas Comuns

- ❌ Compliance como checkbox sem entendimento
- ❌ Documentação gerada mas nunca revisada
- ❌ Quality gates tão rígidos que bloqueiam tudo
- ❌ Ignorar contexto regulatório do mercado-alvo

## Conexões

- [[05-riscos-mitigacoes]] — Riscos alimentam governança
- [[09-automacao-ferramentas]] — Automação de quality gates
- [[07-status-reports]] — Compliance status nos reports
