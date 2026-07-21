---
titulo: "Prompt Engineering — A Arte de Instruir LLMs"
tags: [prompt, engenharia, few-shot, chain-of-thought, system-prompt]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: patterns
status: explored
connections:
  - llms
  - rag
  - fine-tuning
  - agentes-ia
---
# Prompt Engineering — A Arte de Instruir LLMs

## O que é

Prompt Engineering é a prática de **projetar instruções** que maximizam a qualidade e utilidade das respostas de um LLM. É a primeira e mais barata forma de customizar comportamento de modelos — antes de RAG ou fine-tuning.

## Por que importa

- Resolve ~80% dos casos sem custo adicional
- Diferença entre resposta medíocre e excelente
- Skill #1 de qualquer AI Engineer
- Muda com cada geração de modelos (técnicas evoluem)

## Técnicas Principais

| Técnica | Descrição | Quando Usar |
|---------|-----------|-------------|
| **Zero-shot** | Instrução direta sem exemplos | Tasks simples, modelos fortes |
| **Few-shot** | Incluir exemplos de input/output | Formato específico, padrões |
| **Chain-of-Thought (CoT)** | "Pense passo a passo" | Raciocínio, math, lógica |
| **System Prompt** | Contexto/persona persistente | Toda aplicação |
| **Role Prompting** | "Você é um especialista em X" | Domain expertise |
| **Output Format** | Especificar JSON, MD, etc. | Structured output |
| **Constraints** | "Não faça X, limite a Y" | Guardrails |
| **Self-consistency** | Gerar N respostas, votar | Reliability |
| **ReAct** | Reason + Act iterativo | Agentes |
| **Prompt Chaining** | Output de 1 = input de 2 | Tasks complexas decompostas |

## Estrutura de um Bom Prompt

```
1. ROLE: Quem o modelo é
2. CONTEXT: Background relevante
3. TASK: O que deve fazer (claro e específico)
4. FORMAT: Como entregar o output
5. CONSTRAINTS: O que NÃO fazer
6. EXAMPLES: Demonstrações (few-shot)
```

## Otimizações Avançadas (2026)

| Técnica | Descrição | Provider |
|---------|-----------|----------|
| **Prompt Caching** | Cache do prefix (até 90% desc) | Anthropic, OpenAI |
| **Extended Thinking** | Reasoning explícito antes da resposta | Claude (configurável) |
| **Structured Outputs** | JSON Schema enforced no output | OpenAI, Gemini |
| **Tool-use prompting** | Instruir uso correto de tools | Todos |
| **Temperature tuning** | 0 = determinístico, 1 = criativo | Todos |

## Anti-padrões

- ❌ Prompt vago ("faça algo bom")
- ❌ Instruções contraditórias
- ❌ Context gigante sem relevância (noise)
- ❌ Não testar variações (1 prompt ≠ bom prompt)
- ❌ Ignorar que modelos diferentes respondem diferente ao mesmo prompt

## Conceitos Relacionados

- [[llms]] — O que recebe o prompt
- [[rag]] — Complemento (knowledge injection)
- [[fine-tuning]] — Próximo passo se prompt não resolve
- [[agentes-ia]] — ReAct é prompting para agentes

## Conexões

- [[llms]] — Target
- [[rag]] — Complemento
- [[fine-tuning]] — Alternativa
- [[langchain]] — Prompt templates
- [[observabilidade-llm]] — Versionar e avaliar prompts
