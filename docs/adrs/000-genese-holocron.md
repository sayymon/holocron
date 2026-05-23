---
titulo: "ADR-000 — Gênese do Holocron AI Engineer"
status: aceita
data: 2026-05-22
decisores: Saymon Silva
tags:
  - genesis
  - arquitetura
  - fundacao
---

# ADR-000 — Gênese do Holocron AI Engineer

## Contexto

Estou cursando Engenharia de IA Aplicada (12 módulos, ~100 unidades) e preciso de um projeto que:
1. Aplique cada conceito aprendido de forma prática
2. Gere valor real (para mim e para outros alunos)
3. Sirva como portfolio profissional
4. Seja evolutivo — cresce junto com o aprendizado

## Decisão

Criar o **Holocron AI Engineer** — um tutor inteligente personalizado que cristaliza o conhecimento do curso em documentos atômicos e usa RAG + Agentes para ensinar de forma socrática.

O projeto segue a mesma filosofia de Knowledge Bases atômicas:
- Knowledge Base em Markdown atômico (Obsidian-compatible)
- Cada commit é um capítulo
- Documentação como código
- ADRs para decisões técnicas

## Princípios Fundadores

1. **O projeto É o aprendizado** — cada módulo vira uma feature
2. **Portável** — o engine é genérico, a KB é plugável para qualquer curso
3. **Socrático** — o tutor questiona, não apenas responde
4. **Rastreável** — toda informação tem fonte declarada
5. **Evolutivo** — a base é realimentada continuamente

## Consequências

- Positivas: aprendizado profundo, portfolio real, utilidade para a turma
- Negativas: escopo ambicioso, precisa de disciplina para manter atômico
- Riscos: over-engineering no início — mitigado com MVP incremental

## Referências

- Inspiração em projetos de Knowledge Base atômica
- Ementa oficial do curso de Engenharia de IA Aplicada
