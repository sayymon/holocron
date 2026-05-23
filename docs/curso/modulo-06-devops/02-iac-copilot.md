---
titulo: "IaC Copilot"
modulo: 6
unidade: 2
tags: [iac, terraform, pulumi, helm, opa, drift-detection, copilot, nlp]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# IaC Copilot

## Objetivos de Aprendizagem

- Construir um copilot que converte linguagem natural em código IaC
- Implementar validação automática com OPA (Open Policy Agent)
- Detectar drift entre estado desejado e real da infraestrutura
- Suportar múltiplos backends (Terraform, Pulumi, Helm)

## Conceitos-Chave

### Pipeline NL → IaC

```
Requisição NL → Parser de Intent → Seleção de Template → LLM Generation
                                                              ↓
                                          Validação Sintática → OPA Policy Check
                                                              ↓
                                          Plan Preview → Aprovação Humana → Apply
```

### Geração Multi-Backend

**Estratégia de geração:**
1. Extrair intent e entidades da requisição
2. Mapear para resource type do backend alvo
3. Gerar código com constraints do ambiente
4. Validar contra políticas organizacionais

### Validação com OPA

```rego
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_s3_bucket"
    not resource.values.server_side_encryption_configuration
    msg := sprintf("Bucket '%s' sem encryption", [resource.name])
}
```

**Integração no copilot:**
- Pré-validação: checar políticas antes de gerar
- Pós-validação: validar output contra OPA bundle
- Feedback loop: usar violações para refinar prompt

### Drift Detection com IA

```
Estado Desejado (Git) ←→ Estado Real (Cloud API)
         ↓                        ↓
    Comparação automática → Diff semântico
         ↓
    LLM classifica: intencional vs acidental
         ↓
    Ação: alertar / auto-corrigir / ignorar
```

**Classificação de drift:**
- **Crítico:** Security groups abertos, encryption removida
- **Médio:** Tags faltando, sizing diferente
- **Baixo:** Metadata, descriptions

## Exercício Prático

1. Implemente um copilot que aceita descrições em português e gera Terraform HCL
2. Adicione validação OPA com pelo menos 5 políticas de segurança
3. Crie um detector de drift que classifica severidade com LLM
4. Integre com `terraform plan` para preview antes de apply

## Conexões

- **Unidade 01:** Usa RAG e prompting como base
- **Unidade 03:** Helm charts gerados aqui são deployados no K8s
- **empresa:** TechDeck como catálogo de recursos padronizados
