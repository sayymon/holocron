---
titulo: "Planejamento e Escopo com IA"
modulo: 7
unidade: 1
tags: [gestao-projetos, planejamento, requirements, nlp, decomposicao, epicos, historias]
dificuldade: intermediario
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Planejamento e Escopo com IA

## Conceito Central

IA transforma requisitos vagos em artefatos estruturados de projeto. Um **Requirements Copilot** converte linguagem natural em épicos, histórias de usuário e critérios de aceite — acelerando discovery e reduzindo ambiguidade.

## NL → Épicos e Histórias

Transformar descrição em linguagem natural em artefatos estruturados:

```
Input: "Precisamos de um sistema de notificações que avise o creator 
quando ele faz uma venda, com push mobile e email"

Output:
Epic: Sistema de Notificações de Vendas
├── US-01: Como creator, quero receber push mobile ao fazer uma venda
├── US-02: Como creator, quero receber email ao fazer uma venda  
├── US-03: Como creator, quero configurar preferências de notificação
└── US-04: Como admin, quero monitorar taxa de entrega das notificações
```

## Decomposição Hierárquica — Prompt Pattern

```markdown
## Prompt: Decomposição de Requisito

Dado o requisito: "{requisito}"

Decomponha em:
1. **Épico** — objetivo de negócio (1 frase)
2. **Histórias de Usuário** — formato "Como [persona], quero [ação] para [benefício]"
3. **Critérios de Aceite** — formato Given/When/Then para cada história
4. **Dependências técnicas** — sistemas, APIs, dados necessários
5. **Riscos** — o que pode dar errado

Contexto do sistema: {contexto_tecnico}
Personas envolvidas: {personas}
```

## Requirements Copilot — Arquitetura

```
┌─────────────────────────────────────────┐
│           Requirements Copilot           │
├─────────────────────────────────────────┤
│  Input: NL (texto, voz, doc)            │
│  ↓                                       │
│  Parser: Extrai entidades e intenções    │
│  ↓                                       │
│  Generator: Produz artefatos             │
│  ↓                                       │
│  Validator: Checa completude/INVEST      │
│  ↓                                       │
│  Output: Épicos, US, AC, Tasks           │
└─────────────────────────────────────────┘
```

## Validação INVEST com IA

| Critério | Pergunta | IA verifica |
|----------|----------|-------------|
| Independent | Pode ser entregue isoladamente? | Análise de dependências |
| Negotiable | Tem espaço para discussão? | Detecção de over-specification |
| Valuable | Entrega valor ao usuário? | Presença de benefício explícito |
| Estimable | É possível estimar? | Complexidade e ambiguidade |
| Small | Cabe em uma sprint? | Contagem de critérios de aceite |
| Testable | Tem critérios verificáveis? | Presença de Given/When/Then |

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| ChatGPT/Claude | Geração e refinamento de requisitos |
| Jira + AI | Criação automática de issues |
| Notion AI | Documentação de PRDs |
| Linear | Decomposição assistida |

## Exercício Prático

1. Pegue um requisito real do seu projeto
2. Use o prompt de decomposição para gerar épicos/histórias
3. Valide cada história contra INVEST usando IA
4. Compare com a decomposição manual — meça tempo e qualidade

## Armadilhas Comuns

- ❌ Aceitar output da IA sem revisão humana
- ❌ Gerar histórias sem contexto técnico do sistema
- ❌ Ignorar stakeholders na validação
- ❌ Decomposição excessiva (micro-tasks sem valor isolado)

## Conexões

- [[02-priorizacao-backlog]] — Após gerar, priorizar
- [[09-automacao-ferramentas]] — Automatizar criação no Jira
