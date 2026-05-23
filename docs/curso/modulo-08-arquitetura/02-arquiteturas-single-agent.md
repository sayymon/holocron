---
titulo: "Arquiteturas Single-Agent"
modulo: 8
unidade: 2
tags: [agentes, single-agent, react, self-reflection, tool-use, arquitetura]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada + LangGraph docs + Andrew Ng (AI Agentic Patterns)"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Arquiteturas Single-Agent

## Visão Geral

Um single-agent é um sistema onde **um único LLM** orquestra todo o fluxo de raciocínio e ação. A complexidade vem da sofisticação do loop, não da quantidade de agentes.

```
Reactive → Memory → Tools → ReAct → Self-Reflection
   ↑                                        ↑
 Simples                              Mais capaz
```

## 1. Reactive Agent (Stateless)

```
[Input] → [LLM] → [Output]
```

- Sem memória entre interações
- Sem acesso a ferramentas externas
- Resposta baseada apenas no prompt + input atual

**Quando usar:** Tasks simples e isoladas (classificação, extração, tradução). Quando latência mínima é prioridade.

**Limitações:** Sem personalização, cada request é independente, context window é o único "conhecimento".

## 2. Memory-Enhanced Agent

```
[Input] → [Memory Retrieval] → [LLM + Context] → [Output]
                                       ↓
                               [Memory Update]
```

### Tipos de Memória

| Tipo | Analogia | Implementação | Uso |
|------|----------|---------------|-----|
| Short-term | RAM | Conversation buffer | Contexto da sessão |
| Long-term | HD | [[vector-database]] | Histórico persistente |
| Episodic | Diário | Event store | Experiências passadas |
| Semantic | Enciclopédia | Knowledge graph | Fatos sobre o mundo |
| Procedural | Muscle memory | Tool schemas | Como fazer coisas |

### Padrões de Memória

- **Sliding Window** — mantém últimas N mensagens
- **Summary Memory** — resume conversas antigas
- **Vector Memory** — busca por relevância semântica via similarity search

**Quando usar:** Chatbots com continuidade (ex: [[chatbot-cx]]), tutores que lembram progresso, assistentes pessoais.

## 3. Tool-Using Agent

```
[Input] → [LLM] → [Tool Selection] → [Tool Execution] → [LLM] → [Output]
                         ↕
                  [Tool Registry]
```

O LLM decide **quando** e **qual** ferramenta usar. As ferramentas estendem capacidades além do que o modelo sabe fazer sozinho.

### Categorias de Tools

| Categoria | Exemplos | Propósito |
|-----------|----------|-----------|
| Retrieval | Search, RAG, DB query | Buscar informação |
| Action | API calls, CRUD, email | Executar ações |
| Computation | Calculator, code exec | Processar dados |
| Communication | [[mcp]], webhooks | Integrar sistemas |

**Quando usar:** Quando o LLM precisa de dados externos, executar ações no mundo real, ou computação precisa.

## 4. ReAct Agent (Reasoning + Acting)

```
[Input] → [Thought] → [Action] → [Observation] → [Thought] → ... → [Final Answer]
```

### O Loop ReAct

```
Thought: Preciso buscar informações sobre X
Action: search_docs("X")
Observation: [resultados da busca]
Thought: Agora sei que X é Y, mas preciso confirmar Z
Action: query_db("Z")
Observation: [resultado do DB]
Thought: Tenho todas as informações
Final Answer: [resposta completa]
```

**Características:**
- Raciocínio explícito — cada passo é verbalizado
- Iterativo — pode fazer N ciclos até resolver
- Observável — traces mostram o "pensamento"
- Grounded — ações trazem dados reais para o raciocínio

**Quando usar:** Tasks complexas multi-step, quando transparência importa, quando combina múltiplas ferramentas. Padrão mais comum em produção.

## 5. Self-Reflection Agent

```
[Input] → [Generate] → [Critique] → [Refine] → [Output]
                ↑                        |
                └────────────────────────┘
                    (loop até satisfeito)
```

O agente gera uma resposta, **avalia a própria resposta** e decide se precisa melhorar.

### Tipos de Reflexão

- **Critic Pattern** — avalia qualidade com score, refina até threshold
- **Reflexion Pattern** — aprende com erros anteriores para próxima tentativa
- **Constitutional AI** — auto-verifica princípios (segurança, ética, precisão)

**Quando usar:** Geração de código (gerar → testar → corrigir), escrita criativa, respostas de alta qualidade onde latência é aceitável.

### Trade-offs

| Benefício | Custo |
|-----------|-------|
| Qualidade superior | 2-5x mais tokens |
| Auto-correção | 2-5x mais latência |
| Menos alucinações | Mais complexidade |

## Comparativo

| Padrão | Complexidade | Latência | Qualidade | Custo |
|--------|-------------|----------|-----------|-------|
| Reactive | ⭐ | Baixa | Básica | $ |
| Memory | ⭐⭐ | Baixa-Média | Boa | $$ |
| Tool-Using | ⭐⭐⭐ | Média | Boa | $$ |
| ReAct | ⭐⭐⭐⭐ | Média-Alta | Alta | $$$ |
| Self-Reflection | ⭐⭐⭐⭐⭐ | Alta | Muito Alta | $$$$ |

## Conexões

- [[langgraph]] — framework para implementar esses padrões
- [[mcp]] — protocolo para tool-use padronizado
- [[prompt-engineering]] — qualidade do system prompt define o agente
- [[chain-of-thought]] — técnica base do ReAct
- [[avaliação-llm]] — necessária para Self-Reflection
