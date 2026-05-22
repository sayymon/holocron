---
titulo: "Engenharia de Prompts Avançada"
modulo: 2
unidade: 3
tags: [prompt-engineering, chaining, templates, alucinacoes, few-shot, chain-of-thought]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Engenharia de Prompts Avançada

## Técnicas Avançadas

### 1. Chain-of-Thought (CoT)

Força o modelo a raciocinar passo a passo antes de responder.

```
Resolva o problema abaixo. Pense passo a passo.

Problema: Um e-commerce tem 1000 produtos. 30% são digitais. 
Dos digitais, 40% são cursos. Quantos cursos existem?

Raciocínio:
1. Produtos digitais: 1000 × 0.30 = 300
2. Cursos (40% dos digitais): 300 × 0.40 = 120
Resposta: 120 cursos.
```

**Quando usar:** Problemas matemáticos, lógica, decisões multi-critério.

### 2. Prompt Chaining

Dividir tarefa complexa em etapas sequenciais — output de um prompt é input do próximo.

```typescript
// Etapa 1: Extrair entidades
const entities = await llm.call({
  prompt: `Extraia entidades do texto: "${userInput}". JSON: { pessoas: [], empresas: [] }`
});

// Etapa 2: Classificar intenção
const intent = await llm.call({
  prompt: `Entidades: ${entities}. Classifique: consulta_dados | acao_sistema | pergunta_geral`
});

// Etapa 3: Gerar resposta
const response = await llm.call({
  prompt: `Intenção: ${intent}. Entidades: ${entities}. Responda: "${userInput}"`
});
```

**Vantagens:** Testável por etapa, menor alucinação, modelos diferentes por etapa.

### 3. Prompt Templates

Estruturas reutilizáveis com variáveis.

```typescript
const TEMPLATE = `
Você é um analista de {dominio}.

## Contexto
{contexto}

## Tarefa
Analise e responda em JSON:
{ "tendencia": "string", "anomalias": ["string"], "recomendacoes": ["string"] }
`;

function buildPrompt(dominio: string, contexto: string) {
  return TEMPLATE.replace('{dominio}', dominio).replace('{contexto}', contexto);
}
```

### 4. Few-Shot com Exemplos Estratégicos

```
Classifique o ticket. Exemplos:

Input: "Não consigo acessar meu curso"
Output: { "categoria": "acesso", "urgencia": "alta", "produto": "club" }

Input: "Quando vou receber meu pagamento?"
Output: { "categoria": "financeiro", "urgencia": "media", "produto": "plataforma" }

Agora classifique:
Input: "{ticket_do_usuario}"
```

**Regras:** Cobrir edge cases, variar formato de input, incluir todas as categorias.

### 5. Structured Output (JSON Mode)

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  response_format: { type: 'json_object' },
  messages: [
    { role: 'system', content: 'Responda em JSON: { "resposta": string, "confianca": number }' },
    { role: 'user', content: pergunta }
  ]
});
```

## Redução de Alucinações

| Estratégia | Implementação | Eficácia |
|------------|---------------|----------|
| Grounding | Fornecer contexto factual no prompt | Alta |
| Self-consistency | Gerar N respostas e votar | Alta (caro) |
| Instrução explícita | "Se não souber, diga 'não sei'" | Média |
| Citação obrigatória | "Cite o trecho exato da fonte" | Alta |
| Temperature baixa | temperature: 0.0-0.3 | Média |
| Verificação em cadeia | Prompt 2 valida output do Prompt 1 | Alta |

### Padrão: Grounding + Citação

```
## Contexto (use APENAS estas informações)
{documentos_recuperados}

## Regras
- Responda SOMENTE com base no contexto acima
- Se não encontrar, diga: "Não encontrei essa informação."
- Cite o trecho relevante entre aspas

## Pergunta
{pergunta_do_usuario}
```

## System Prompts — Anatomia

```
1. IDENTIDADE — Quem o modelo é
2. CONTEXTO — O que ele sabe / tem acesso
3. REGRAS — O que pode e não pode fazer
4. FORMATO — Como deve responder
5. EXEMPLOS — Demonstrações do comportamento esperado
```

## Métricas de Qualidade

| Métrica | Como medir | Meta |
|---------|-----------|------|
| Consistência | Mesma pergunta N vezes → % iguais | >90% |
| Factualidade | % respostas verificáveis corretas | >95% |
| Formato compliance | % no formato pedido | >98% |
| Latência | Tempo p95 | <3s |

## Conexões

- → [Unidade 4: Custo-eficiência](04-consistencia-custo-eficiencia.md) — Otimizar tokens
- → [Unidade 5: RAG](05-rag-avancado-pratica.md) — Prompts com contexto recuperado
- → [Unidade 6: Backend](06-integracao-ia-backend.md) — Templates em produção
