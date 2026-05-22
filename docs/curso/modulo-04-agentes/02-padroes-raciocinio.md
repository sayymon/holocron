---
titulo: "Padrões de Raciocínio"
modulo: 4
unidade: 2
tags: [agentes, react, plan-and-execute, reflection, raciocínio, chain-of-thought]
dificuldade: intermediária
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Unidade 2 — Padrões de Raciocínio

## Objetivo

Dominar os três padrões fundamentais de raciocínio em agentes: ReAct, Plan-and-Execute e Reflection.

## Por que padrões importam?

O LLM sozinho gera texto. Os padrões de raciocínio estruturam **como** o agente pensa, transformando geração de texto em resolução de problemas.

## 1. ReAct (Reasoning + Acting)

Intercala raciocínio explícito com ações.

### Fluxo

```
Thought: Preciso buscar informações sobre X
Action: search_knowledge_base("X")
Observation: [resultado da busca]
Thought: Agora tenho contexto suficiente
Action: final_answer("...")
```

### Características
- **Vantagem**: Transparente, fácil de debugar
- **Desvantagem**: Pode entrar em loops, não planeja a longo prazo
- **Quando usar**: Tarefas com 1-5 passos, Q&A com ferramentas

## 2. Plan-and-Execute

Separa planejamento de execução. O planner cria um plano completo antes de agir.

### Fluxo

```
Plan:
  1. Buscar dados do aluno
  2. Identificar gaps de conhecimento
  3. Gerar quiz personalizado

Execute Step 1: get_student_profile(id)
Execute Step 2: analyze_gaps(profile)
Execute Step 3: generate_quiz(gaps)

Replan (se necessário): ajustar passos restantes
```

### Características
- **Vantagem**: Melhor para tarefas complexas (5+ passos), visão global
- **Desvantagem**: Plano inicial pode estar errado, overhead de replanning
- **Quando usar**: Tarefas multi-step, pesquisa, geração de conteúdo longo

## 3. Reflection

O agente avalia sua própria saída e itera para melhorar.

### Fluxo

```
Generate: [primeira tentativa]
Reflect: "Faltou considerar X"
Refine: [versão melhorada]
Reflect: "Agora está adequada"
Output: [resposta final]
```

### Variantes
- **Self-Refine**: gera → critica → refina (mesmo LLM)
- **Reflexion**: mantém memória de erros passados
- **LATS**: combina reflection com tree search

## Comparativo

| Padrão | Complexidade | Latência | Qualidade | Melhor para |
|--------|-------------|----------|-----------|-------------|
| ReAct | Baixa | Baixa | Boa | Tarefas simples |
| Plan-and-Execute | Média | Média | Alta | Multi-step |
| Reflection | Média | Alta | Muito alta | Geração de conteúdo |

## Combinando Padrões

Agentes maduros combinam padrões:

```
Plan-and-Execute (nível macro)
  └── ReAct (execução de cada passo)
       └── Reflection (validação de outputs críticos)
```

## Conexão com o Holocron

O Agente Tutor usa:
- **ReAct** para Q&A rápido sobre conceitos
- **Plan-and-Execute** para gerar planos de estudo
- **Reflection** para avaliar qualidade das explicações

## Referências

- [Yao et al. — ReAct (2023)](https://arxiv.org/abs/2210.03629)
- [Wang et al. — Plan-and-Solve Prompting (2023)](https://arxiv.org/abs/2305.04091)
- [Madaan et al. — Self-Refine (2023)](https://arxiv.org/abs/2303.17651)
- [Shinn et al. — Reflexion (2023)](https://arxiv.org/abs/2303.11366)
