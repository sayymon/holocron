---
titulo: "Arquiteturas Multi-Agent"
modulo: 8
unidade: 3
tags: [multi-agent, orquestração, supervisor, hierarchical, handoff, arquitetura]
dificuldade: avançado
fonte: "Curso Engenharia de IA Aplicada + LangGraph Multi-Agent docs + AutoGen papers"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Arquiteturas Multi-Agent

## Por que Multi-Agent?

Um único agente com muitas responsabilidades sofre de:
- **Prompt bloat** — system prompt gigante degrada qualidade
- **Tool confusion** — muitas ferramentas = escolhas erradas
- **Lack of specialization** — jack of all trades, master of none

Multi-agent resolve dividindo responsabilidades entre agentes especializados.

## 1. Sequential (Pipeline)

```
[Input] → [Agent A] → [Agent B] → [Agent C] → [Output]
```

- Cada agente processa e passa adiante
- Ordem fixa e predeterminada
- Simples de entender e debugar

**Quando usar:** Pipelines com etapas claras (Extract → Transform → Validate → Store).

## 2. Parallel (Fan-out/Fan-in)

```
              ┌→ [Agent A] →┐
[Input] → [Router] → [Agent B] → [Aggregator] → [Output]
              └→ [Agent C] →┘
```

- Múltiplos agentes trabalham simultaneamente
- Reduz latência total
- Precisa de estratégia de agregação

**Estratégias de Agregação:** Best-of-N (escolhe melhor), Merge (combina todos), Vote (maioria), Consensus (todos concordam).

**Quando usar:** Tasks decomponíveis em subtasks independentes, quando latência é crítica.

## 3. Supervisor

```
                    [Supervisor]
                   ↗     ↕      ↘
          [Agent A]  [Agent B]  [Agent C]
```

- Um agente supervisor decide **quem** executa **o quê**
- Supervisor não executa tasks — delega
- Pode re-rotear baseado em resultados intermediários
- Padrão mais flexível e comum em produção

### O Loop do Supervisor

```
1. Supervisor analisa o input
2. Decide qual agente deve atuar
3. Agente executa e retorna resultado
4. Supervisor avalia: precisa de mais trabalho?
   → Sim: delega para outro agente
   → Não: retorna resultado final
```

**Quando usar:** Tasks complexas com múltiplas especialidades, fluxo não predeterminado. Ex: [[hotmart-ai-companion]] orquestrando agentes especialistas.

## 4. Hierarchical (Multi-level Supervisor)

```
              [Top Supervisor]
             ↗               ↘
    [Team Lead A]        [Team Lead B]
    ↗    ↕    ↘          ↗    ↕    ↘
 [A1]  [A2]  [A3]     [B1]  [B2]  [B3]
```

- Supervisores em múltiplos níveis
- Cada nível tem escopo de decisão limitado
- Escala para sistemas muito complexos

**Trade-offs:**
- ✅ Escala para complexidade alta
- ✅ Cada supervisor tem contexto focado
- ❌ Mais latência (múltiplos hops)
- ❌ Mais difícil de debugar
- ❌ Risco de "telephone game"

**Quando usar:** Sistemas com dezenas de agentes, domínios com sub-domínios claros.

## 5. Group Chat (Debate)

```
[Agent A] ↔ [Agent B] ↔ [Agent C]
     ↕           ↕           ↕
         [Shared Context]
```

- Agentes conversam entre si em espaço compartilhado
- Sem hierarquia fixa
- Moderador (opcional) controla turnos
- Emergência de soluções via debate

**Padrões de Moderação:** Round-robin, Raise-hand, Moderator-driven, Free-form.

**Quando usar:** Brainstorming, múltiplas perspectivas, code review (autor + reviewer + security).

## 6. Handoff (Transfer)

```
[Agent A] → handoff → [Agent B] → handoff → [Agent C]
```

- Agente ativo transfere controle para outro
- Decisão de handoff é do agente atual (não de supervisor)
- Estado é passado junto com o controle

### Diferença vs Supervisor

| Aspecto | Supervisor | Handoff |
|---------|-----------|---------|
| Quem decide | Supervisor central | Agente atual |
| Controle | Centralizado | Distribuído |
| Overhead | Supervisor em todo ciclo | Direto entre agentes |

**Quando usar:** Atendimento ao cliente (triagem → especialista), workflows com transições naturais. Ex: [[caio]] transferindo para humano.

## Comparativo

| Padrão | Complexidade | Flexibilidade | Latência | Debugabilidade |
|--------|-------------|---------------|----------|----------------|
| Sequential | ⭐ | Baixa | Soma | Alta |
| Parallel | ⭐⭐ | Média | Max | Média |
| Supervisor | ⭐⭐⭐ | Alta | Variável | Média |
| Hierarchical | ⭐⭐⭐⭐ | Muito Alta | Alta | Baixa |
| Group Chat | ⭐⭐⭐⭐ | Muito Alta | Alta | Baixa |
| Handoff | ⭐⭐⭐ | Alta | Variável | Alta |

## Decision Framework

```
Quantos agentes preciso?
  2-3 → Supervisor ou Sequential
  4-10 → Supervisor com sub-teams
  10+ → Hierarchical

O fluxo é previsível?
  Sim, sempre igual → Sequential
  Sim, mas paralelo → Parallel
  Não, depende do input → Supervisor/Handoff

Agentes sabem seus limites?
  Sim → Handoff
  Não → Supervisor decide por eles
```

## Conexões

- [[langgraph]] — framework principal para multi-agent
- [[hotmart-ai-companion]] — exemplo real de supervisor pattern
- [[caio]] — exemplo real de handoff (AI → humano)
- [[mcp]] — comunicação padronizada entre agentes e tools
- [[sara]] — agente com RAG em arquitetura de produção
