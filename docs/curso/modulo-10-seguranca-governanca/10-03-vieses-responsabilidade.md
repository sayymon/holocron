---
titulo: "Vieses e Responsabilidade"
modulo: 10
unidade: 3
tags: [vieses, fairness, ia-responsavel, etica]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Vieses e Responsabilidade

## Tipos de Viés em IA

| Tipo | Origem | Exemplo |
|------|--------|---------|
| **Dados históricos** | Dataset reflete desigualdades passadas | Modelo de crédito penaliza minorias |
| **Seleção** | Amostra não-representativa | Treinar reconhecimento facial só com rostos claros |
| **Medição** | Proxy inadequado | Usar CEP como proxy para renda |
| **Agregação** | Tratar grupos heterogêneos como homogêneos | Modelo único para populações diversas |
| **Confirmação** | Feedback loop reforça viés | Sistema de recomendação cria bolhas |

## Métricas de Fairness

- **Demographic Parity** — taxa de decisão positiva igual entre grupos
- **Equalized Odds** — TPR e FPR iguais entre grupos
- **Calibration** — scores significam a mesma coisa para todos os grupos
- **Individual Fairness** — indivíduos similares recebem tratamentos similares

> ⚠️ É matematicamente impossível satisfazer todas as métricas simultaneamente. A escolha é uma decisão **ética**, não técnica.

## Mitigação

### Pré-processamento
- Rebalanceamento de datasets
- Remoção de features sensíveis (com cuidado — proxies existem)

### In-processing
- Regularização por fairness durante treino
- Adversarial debiasing

### Pós-processamento
- Ajuste de thresholds por grupo
- Reject option classification

## Responsabilidade em LLMs

- [[llm]] herdam vieses da internet inteira
- RLHF mitiga parcialmente mas não elimina
- Guardrails são necessários mas insuficientes sozinhos
- Monitoramento contínuo de outputs em produção

## Framework de Responsabilidade

```
1. Identificar grupos afetados
2. Definir métricas de fairness relevantes
3. Medir baseline
4. Aplicar mitigação
5. Monitorar drift de fairness em produção
6. Documentar trade-offs aceitos (ADR)
```

## Conexões

- [[10-02-interpretabilidade-explicabilidade]] — explicabilidade revela vieses
- [[10-04-riscos-humanos-eticos]] — viés é risco ético primário
- [[10-01-governanca-ia]] — governança define quem decide sobre trade-offs de fairness
