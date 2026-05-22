---
titulo: "Governança em IA"
modulo: 10
unidade: 1
tags: [governanca, ia-responsavel, compliance, frameworks]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Governança em IA

## Por que importa

Sem governança, sistemas de IA operam como caixas-pretas organizacionais — sem accountability, sem auditoria, sem controle. Governança define **quem decide o quê**, **como se monitora** e **quando se intervém**.

## Pilares de Governança

### 1. Accountability (Responsabilização)

- Toda decisão automatizada precisa de um **owner humano**
- Definir RACI para cada etapa do ciclo de vida do modelo
- Documentar decisões via [[adr]] (Architecture Decision Records)

### 2. Transparência

- Registrar proveniência de dados de treino
- Versionar modelos e datasets ([[mlops]])
- Publicar model cards para stakeholders

### 3. Auditabilidade

- Logs de inferência imutáveis
- Métricas de fairness monitoradas continuamente
- Revisões periódicas por comitê de ética/IA

## Frameworks de Referência

| Framework | Origem | Foco |
|-----------|--------|------|
| NIST AI RMF | EUA | Gestão de riscos |
| EU AI Act | União Europeia | Regulação por risco |
| ISO/IEC 42001 | Internacional | Sistema de gestão de IA |
| Responsible AI (Microsoft) | Indústria | Princípios práticos |

## Implementação Prática

```
1. Inventário de modelos em produção
2. Classificação por nível de risco (baixo/médio/alto/inaceitável)
3. Definição de controles por nível
4. Monitoramento contínuo + alertas
5. Revisão periódica (trimestral mínimo)
```

## Governança no Contexto de Agentes

Com [[agentes-ia]] autônomos, governança ganha camadas extras:
- **Guardrails** — limites de ação do agente
- **Human-in-the-loop** — quando escalar para humano
- **Kill switch** — mecanismo de parada emergencial
- **Audit trail** — rastreio completo de decisões do agente

## Conexões

- [[10-02-interpretabilidade-explicabilidade]] — transparência requer explicabilidade
- [[10-04-riscos-humanos-eticos]] — governança mitiga riscos éticos
- [[10-06-riscos-legal-regulatorio]] — compliance exige governança formal
