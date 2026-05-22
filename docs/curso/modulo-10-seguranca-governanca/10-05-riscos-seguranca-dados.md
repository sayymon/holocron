---
titulo: "Gerenciamento de Riscos — Segurança/Dados"
modulo: 10
unidade: 5
tags: [seguranca, dados, privacidade, adversarial, prompt-injection]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Gerenciamento de Riscos — Segurança/Dados

## Vetores de Ataque em Sistemas de IA

### Ataques ao Modelo

| Ataque | Descrição | Mitigação |
|--------|-----------|-----------|
| **Adversarial examples** | Inputs manipulados para enganar o modelo | Adversarial training, input validation |
| **Model extraction** | Replicar modelo via queries | Rate limiting, output perturbation |
| **Data poisoning** | Contaminar dados de treino | Validação de dados, proveniência |
| **Model inversion** | Extrair dados de treino do modelo | Differential privacy |

### Ataques a LLMs e Agentes

| Ataque | Descrição | Mitigação |
|--------|-----------|-----------|
| **Prompt injection** | Manipular comportamento via input | Input sanitization, guardrails |
| **Jailbreaking** | Contornar safety filters | Multi-layer defense, monitoring |
| **Data exfiltration** | Extrair dados sensíveis do contexto | Scope limiting, output filtering |
| **Tool abuse** | Agente executa ações maliciosas | Least privilege, sandboxing |

## Segurança de Dados

### Privacidade

- **Minimização** — coletar apenas o necessário
- **Anonimização** — remover PII antes do treino
- **Differential Privacy** — adicionar ruído matemático garantido
- **Federated Learning** — treinar sem centralizar dados

### Proteção em Produção

- Criptografia em trânsito e em repouso
- Controle de acesso granular (RBAC/ABAC)
- Logs de acesso a dados sensíveis
- Data retention policies automatizadas

## Segurança de Agentes ([[agentes-ia]])

```
┌─────────────────────────────────────┐
│         Camadas de Defesa           │
├─────────────────────────────────────┤
│ 1. Input validation & sanitization  │
│ 2. Guardrails (content filtering)   │
│ 3. Least privilege (tool access)    │
│ 4. Output filtering                 │
│ 5. Rate limiting                    │
│ 6. Monitoring & alerting            │
│ 7. Kill switch                      │
└─────────────────────────────────────┘
```

## OWASP Top 10 para LLMs

1. Prompt Injection
2. Insecure Output Handling
3. Training Data Poisoning
4. Model Denial of Service
5. Supply Chain Vulnerabilities
6. Sensitive Information Disclosure
7. Insecure Plugin Design
8. Excessive Agency
9. Overreliance
10. Model Theft

## Conexões

- [[10-04-riscos-humanos-eticos]] — segurança protege contra danos a pessoas
- [[10-06-riscos-legal-regulatorio]] — vazamentos geram responsabilidade legal
- [[10-01-governanca-ia]] — governança define políticas de segurança
- [[prompt-engineering]] — entender prompts para defender contra injection
