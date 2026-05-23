---
titulo: "Fundamentos de IA Generativa para Infraestrutura"
modulo: 6
unidade: 1
tags: [llm, apis, frameworks, rag, prompting, infraestrutura, devops]
dificuldade: básica
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Fundamentos de IA Generativa para Infraestrutura

## Objetivos de Aprendizagem

- Compreender como LLMs se aplicam a tarefas de infraestrutura
- Conhecer APIs e frameworks para integração de IA em pipelines DevOps
- Implementar RAG sobre documentação técnica (Terraform docs, K8s docs)
- Dominar técnicas de prompting para geração de código de infra

## Conceitos-Chave

### LLMs no Contexto de Infraestrutura

LLMs treinados em código possuem conhecimento extenso sobre sintaxe declarativa (HCL, YAML, JSON), padrões de cloud providers e best practices de segurança.

**Limitações críticas:**
- Alucinação de recursos/parâmetros inexistentes
- Versões desatualizadas de APIs
- Falta de contexto sobre o ambiente específico

### APIs e Frameworks

| Framework | Uso em DevOps |
|-----------|---------------|
| LangChain | Orquestração de chains para IaC |
| LangGraph | Agentes com estado para troubleshooting |
| Semantic Kernel | Integração com Azure DevOps |
| CrewAI | Multi-agentes para operações |

### RAG para Documentação Técnica

```
Docs (Terraform, K8s, Helm) → Chunking semântico → Embeddings → Vector DB
                                                                    ↓
User Query → Retrieval → Context Augmentation → LLM → Resposta validada
```

**Estratégias de chunking para docs técnicas:**
- Por bloco de recurso (resource block)
- Por seção de documentação (arguments, attributes)
- Hierárquico (provider → resource → argument)

### Prompting para Infraestrutura

**Princípios:**
1. Especificar provider e versão (`AWS provider 5.x`)
2. Definir constraints (`região us-east-1, VPC existente`)
3. Pedir validação inline (`inclua comentários sobre security groups`)
4. Solicitar output estruturado (HCL puro, sem explicação)

## Exercício Prático

1. Configure um pipeline RAG indexando a documentação do Terraform AWS Provider
2. Implemente um prompt template que gera módulos Terraform a partir de descrição NL
3. Valide o output com `terraform validate` automaticamente

## Conexões

- **Módulo 02:** Técnicas de prompting aplicadas aqui
- **Módulo 04:** Base para agentes DevOps das próximas unidades
- **empresa:** AI Gateway corporativo como provider de LLM
