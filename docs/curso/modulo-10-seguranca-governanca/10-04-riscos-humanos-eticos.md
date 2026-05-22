---
titulo: "Gerenciamento de Riscos — Humanos/Éticos"
modulo: 10
unidade: 4
tags: [riscos, etica, humano-no-loop, impacto-social]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Gerenciamento de Riscos — Humanos/Éticos

## Categorias de Risco Humano/Ético

### Automação de Decisões de Alto Impacto
- Crédito, saúde, justiça criminal, emprego
- Risco: decisões irreversíveis sem supervisão humana
- Mitigação: [[human-in-the-loop]], revisão obrigatória

### Deslocamento de Trabalho
- Automação substituindo funções humanas
- Risco: impacto social sem transição adequada
- Mitigação: augmentation > replacement, reskilling

### Manipulação e Desinformação
- Deepfakes, conteúdo sintético, persuasão automatizada
- Risco: erosão de confiança social
- Mitigação: watermarking, detecção, transparência

### Dependência Excessiva
- Humanos confiando cegamente em outputs de IA
- Risco: atrofia de habilidades, automation bias
- Mitigação: calibração de confiança, treinamento de usuários

## Matriz de Risco

```
         Impacto
         Alto  │  Monitorar    │  Mitigar urgente
               │  ativamente   │  (kill switch)
         ──────┼───────────────┼──────────────────
         Baixo │  Aceitar      │  Monitorar
               │               │  periodicamente
               └───────────────┴──────────────────
                    Baixa           Alta
                       Probabilidade
```

## Human-in-the-Loop (HITL)

| Nível | Descrição | Quando usar |
|-------|-----------|-------------|
| Human-in-the-loop | Humano aprova cada decisão | Alto risco, baixo volume |
| Human-on-the-loop | Humano monitora e pode intervir | Médio risco, alto volume |
| Human-out-of-the-loop | Totalmente autônomo | Baixo risco, decisões reversíveis |

## Princípios Éticos Aplicados

1. **Beneficência** — IA deve gerar benefício líquido
2. **Não-maleficência** — minimizar danos previsíveis
3. **Autonomia** — preservar capacidade de escolha humana
4. **Justiça** — distribuir benefícios e riscos equitativamente

## Conexões

- [[10-03-vieses-responsabilidade]] — viés é manifestação de risco ético
- [[10-05-riscos-seguranca-dados]] — segurança protege contra danos técnicos
- [[10-01-governanca-ia]] — governança operacionaliza princípios éticos
