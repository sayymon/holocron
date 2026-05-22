---
titulo: "Gerenciamento de Riscos — Legal/Regulatório"
modulo: 10
unidade: 6
tags: [regulacao, lgpd, gdpr, eu-ai-act, compliance]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Gerenciamento de Riscos — Legal/Regulatório

## Panorama Regulatório Global

### EU AI Act (2024+)

Classificação por risco:

| Nível | Exemplos | Requisitos |
|-------|----------|------------|
| **Inaceitável** | Social scoring, manipulação subliminar | Proibido |
| **Alto risco** | Crédito, recrutamento, saúde | Conformidade obrigatória, auditoria |
| **Risco limitado** | Chatbots, deepfakes | Transparência (disclosure) |
| **Risco mínimo** | Filtros de spam, jogos | Sem requisitos específicos |

### LGPD (Brasil)

- **Base legal** para tratamento de dados pessoais em IA
- **Direito à explicação** de decisões automatizadas (Art. 20)
- **DPIA** (Data Protection Impact Assessment) obrigatório para alto risco
- **Encarregado (DPO)** deve ser consultado em projetos de IA

### GDPR (Europa)

- Direito de não ser sujeito a decisão exclusivamente automatizada (Art. 22)
- Right to explanation
- Data minimization e purpose limitation
- Privacy by design e by default

## Propriedade Intelectual

| Questão | Status Atual |
|---------|-------------|
| Copyright de outputs de IA | Indefinido na maioria das jurisdições |
| Dados de treino protegidos | Litígios em andamento (NYT vs OpenAI) |
| Patentes geradas por IA | Geralmente não patenteáveis |
| Código gerado por IA | Licença depende dos dados de treino |

## Responsabilidade Civil

- **Quem responde** quando IA causa dano? Desenvolvedor? Operador? Usuário?
- Tendência: responsabilidade do **deployer** (quem coloca em produção)
- Documentação de decisões ([[adr]]) como proteção legal

## Checklist de Compliance

```
□ Classificar sistema por nível de risco (EU AI Act)
□ Realizar DPIA se aplicável
□ Documentar base legal para dados pessoais
□ Implementar direito à explicação
□ Registrar proveniência de dados de treino
□ Definir responsável (accountability)
□ Manter logs de auditoria
□ Revisar periodicamente (regulação evolui)
```

## Conexões

- [[10-01-governanca-ia]] — governança implementa compliance
- [[10-05-riscos-seguranca-dados]] — segurança de dados é requisito legal
- [[10-02-interpretabilidade-explicabilidade]] — explicabilidade é direito legal
- [[10-04-riscos-humanos-eticos]] — ética informa regulação
