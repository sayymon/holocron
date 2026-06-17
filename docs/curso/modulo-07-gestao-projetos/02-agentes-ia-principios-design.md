---
titulo: "Agentes de IA — Princípios de Design e Tomada de Decisão"
modulo: 7
unidade: 2
tags: [agentes, design-principles, contratos, limites, ciclo-agente, especificidade, escalation, tools]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada — Módulo 07 (Aula Agentes e Decisões em Etapas)"
atualizado_em: 2026-06-16
confiabilidade: alta
---

# Agentes de IA — Princípios de Design e Tomada de Decisão

## O Conceito Fundamental

Um agente de IA **não é um chatbot que responde perguntas**. É um sistema que:

1. Recebe um objetivo
2. Cria um **plano** com instruções de como resolver
3. Executa ações (tools, APIs, file system)
4. Observa resultados
5. Decide o próximo passo
6. Repete até concluir ou escalar

```
╭─────────────────────────────────────────╮
│         CICLO CONTROLADO DO AGENTE      │
╰─────────────────────────────────────────╯

  Objetivo
     │
     ▼
  ┌──────────────┐
  │  PLANEJAR    │  ← Cria plano com etapas
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  EXECUTAR    │  ← Usa tools/ações
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  OBSERVAR    │  ← Avalia resultado
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐     Não
  │  CONCLUIU?   │──────────┐
  └──────┬───────┘          │
         │ Sim              │
         ▼                  ▼
  ┌──────────────┐   ┌──────────────┐
  │  RESPONDER   │   │  PRÓXIMO     │──→ volta ao PLANEJAR
  └──────────────┘   │  PASSO       │
                     └──────────────┘
```

**A diferença crucial:** Um chatbot faz 1 passo (pergunta → resposta). Um agente faz N passos em ciclo até resolver o problema.

## Agentes Podem Existir em Qualquer Lugar

O que define um agente **não é** a tecnologia, o modelo, ou o ambiente. É ter:

| Característica | Chatbot | Agente |
|---------------|---------|--------|
| Passos | 1 (input → output) | N (ciclo até resolver) |
| Ações | Apenas responde texto | Executa ações no mundo |
| Tools | Não tem | Tem ferramentas e capacidades |
| Planejamento | Não planeja | Planeja antes de agir |
| Iteração | Não itera | Itera até satisfazer |

**Exemplos de agentes:**
- Um script Python que usa LLM para decidir qual API chamar → agente
- Um bot no Slack que cria tickets no Jira quando detecta problema → agente
- Um workflow no n8n que classifica emails e roteia → agente
- Um MCP server que busca dados e sintetiza → agente
- Um prompt com function calling que consulta banco → agente

**Não precisa de framework sofisticado.** Se tem ciclo + ações + decisão = é um agente.

## Princípio 1: Especificidade

> "Um agente tem que ser, por natureza, específico. Tem que saber bem o que fazer e, principalmente, o que NÃO fazer."

### O que significa ser específico

```
❌ RUIM — Agente genérico:
"Você é um assistente que ajuda com qualquer coisa."

✅ BOM — Agente específico:
"Você é um agente de análise de SQL.
VOCÊ FAZ: analisar queries, sugerir índices, identificar N+1.
VOCÊ NÃO FAZ: gerar código frontend, responder sobre infra, criar tests."
```

### Por que especificidade importa

| Agente genérico | Agente específico |
|-----------------|-------------------|
| Alucina mais (tenta cobrir tudo) | Alucina menos (escopo restrito) |
| Respostas superficiais | Respostas profundas |
| Difícil de testar | Fácil de testar (escopo definido) |
| Imprevisível | Previsível |
| Difícil de auditar | Auditável |

### Regra prática

Se você não consegue descrever o que o agente faz em **uma frase**, ele está genérico demais.

```
✅ "Agente que analisa queries SQL e sugere otimizações"
✅ "Agente que classifica tickets de suporte em categorias"
✅ "Agente que gera relatórios financeiros semanais"
❌ "Agente que ajuda o time com várias coisas"
```

## Princípio 2: Contratos e Papéis Bem Definidos

> "Agentes devem ter contratos e papéis bem definidos."

### Anatomia de um Contrato de Agente

```json
{
  "agent": {
    "name": "sql-analyzer",
    "role": "Analista de performance SQL",
    "version": "1.2.0"
  },
  "contract": {
    "inputs": {
      "accepts": ["SQL query", "schema DDL", "execution plan"],
      "rejects": ["código aplicação", "perguntas gerais"]
    },
    "outputs": {
      "provides": ["análise de performance", "sugestões de índice", "score de complexidade"],
      "format": "markdown com code blocks"
    },
    "capabilities": {
      "can_do": [
        "Analisar queries SELECT/INSERT/UPDATE",
        "Identificar full table scans",
        "Sugerir índices compostos",
        "Calcular custo estimado"
      ],
      "cannot_do": [
        "Executar queries em produção",
        "Alterar schemas",
        "Acessar dados sensíveis",
        "Responder sobre temas fora de SQL"
      ]
    },
    "escalation": {
      "when": "Query envolve dados PII ou acesso a produção",
      "to": "human:dba-team"
    }
  }
}
```

### O contrato responde 4 perguntas

1. **O que eu recebo?** (inputs aceitos e rejeitados)
2. **O que eu entrego?** (outputs e formato)
3. **O que eu posso fazer?** (capabilities)
4. **O que eu NÃO posso fazer?** (limites explícitos)

## Princípio 3: Limites e Fronteiras

> "O limite dele pode ser a fronteira com outros agentes ou até mesmo acionar o usuário. Nunca inventar ou fazer ações inesperadas."

### Tipos de fronteiras

```
┌─────────────────────────────────────────────────────┐
│                   SISTEMA MULTI-AGENT                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────┐     fronteira     ┌───────────┐    │
│  │  Agente A │ ──────────────── │  Agente B │    │
│  │  (SQL)    │   delega task     │  (Deploy) │    │
│  └───────────┘                   └───────────┘    │
│        │                                           │
│        │ fronteira (não sabe resolver)             │
│        │                                           │
│        ▼                                           │
│  ┌───────────┐                                    │
│  │  HUMANO   │  ← escalation                     │
│  │  (DBA)    │                                    │
│  └───────────┘                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Regras de escalation

| Situação | Ação correta | Anti-padrão |
|----------|-------------|-------------|
| Não sabe responder | Dizer "não sei" + escalar | Inventar resposta |
| Fora do escopo | Redirecionar ao agente correto | Tentar resolver mesmo assim |
| Ação destrutiva | Pedir confirmação ao humano | Executar sem perguntar |
| Ambiguidade | Perguntar ao usuário | Assumir e agir |
| Conflito com outro agente | Escalar ao orquestrador | Entrar em loop |

### O pattern "nunca inventar"

```typescript
// ❌ Anti-padrão: agente que inventa
async function handleQuery(query: string) {
  const result = await searchKnowledge(query);
  if (!result) {
    return llm.generate("Responda mesmo sem dados: " + query); // ALUCINA!
  }
  return result;
}

// ✅ Padrão correto: agente que escala
async function handleQuery(query: string) {
  const result = await searchKnowledge(query);
  if (!result) {
    return {
      status: "cannot_resolve",
      reason: "Informação não encontrada na base de conhecimento",
      suggestion: "Consulte a equipe de dados ou adicione essa informação à KB",
      escalate_to: "human"
    };
  }
  return result;
}
```

## Ciclo Controlado — O Plano como Instrução

O agente não improvisa. Ele segue um **plano** que funciona como receita:

```markdown
## Plano para: "Otimizar a query de listagem de produtos"

### Passo 1: Coletar informações
- [ ] Obter a query atual
- [ ] Obter o schema das tabelas envolvidas
- [ ] Obter o EXPLAIN da query

### Passo 2: Analisar
- [ ] Identificar full table scans
- [ ] Verificar joins sem índice
- [ ] Calcular selectividade dos filtros

### Passo 3: Propor
- [ ] Sugerir índices (máximo 3)
- [ ] Reescrever query se necessário
- [ ] Estimar melhoria esperada

### Passo 4: Validar
- [ ] Rodar EXPLAIN na query otimizada
- [ ] Comparar custo antes vs depois
- [ ] Se melhoria < 20%, escalar ao DBA humano
```

**Cada etapa é verificável.** Se o agente não consegue completar um passo, ele sabe que deve parar ali — não pular para o próximo "adivinhando".

## Resumo: Os 3 Mandamentos do Agente

```
┌─────────────────────────────────────────────────┐
│  1. SEJA ESPECÍFICO                             │
│     Saber o que faz E o que não faz             │
│                                                  │
│  2. TENHA CONTRATO                              │
│     Inputs, outputs, capabilities, limites      │
│                                                  │
│  3. RESPEITE FRONTEIRAS                         │
│     Escale ao invés de inventar                 │
│     Pergunte ao invés de assumir                │
│     Delegue ao invés de improvisar              │
└─────────────────────────────────────────────────┘
```

## Aplicação Prática — Design de Agentes

Antes de construir qualquer agente, responda:

1. **Qual é a frase que descreve o que ele faz?** (1 frase, específica)
2. **O que ele recebe como input?** (formatos, validações)
3. **O que ele entrega?** (formato, SLA, qualidade mínima)
4. **O que ele NÃO faz?** (lista explícita)
5. **Quando ele para e pede ajuda?** (condições de escalation)
6. **Quem é o próximo na cadeia?** (humano ou outro agente)

## Conexões

- → [[01-arquitetura-agents|Arquitetura de Agents]] — Implementação técnica do ciclo
- → [[03-function-calling-tool-use|Function Calling]] — Como agentes usam ferramentas
- → [[09-multi-agent-systems|Multi-Agent Systems]] — Fronteiras entre agentes
- → [[01-editores-agenticos-panorama-2026|Editores Agênticos]] — Como IDEs implementam agentes
- → [[09-estrutura-operacional-prompts|Estrutura de Prompts]] — Como definir o contrato via prompt
