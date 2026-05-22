---
titulo: "Quando Fazer Fine-Tuning"
modulo: 9
unidade: 1
tags: [fine-tuning, decision-framework, rag, prompt-engineering, trade-offs]
dificuldade: intermediária
fonte: "OpenAI Fine-Tuning Guide, Chip Huyen - Designing ML Systems"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Quando Fazer Fine-Tuning

## Contexto

Fine-tuning não é a primeira resposta — é a última. Antes de investir tempo e dinheiro treinando um modelo, é preciso esgotar alternativas mais leves. Este documento apresenta um framework de decisão claro.

## O Espectro de Customização

```
Prompt Engineering → Few-shot → RAG → Fine-tuning → Treino from scratch
       ↑                                                        ↑
  Menor custo/risco                              Maior custo/controle
```

## Decision Framework

### Quando Prompt Engineering basta

- A tarefa pode ser descrita em instruções claras
- Exemplos few-shot resolvem variações
- O modelo base já tem o conhecimento necessário
- Volume de uso não justifica investimento

### Quando RAG é melhor

- O conhecimento muda frequentemente
- Precisa de citações/fontes verificáveis
- O domínio é amplo demais para memorizar
- Latência de retrieval é aceitável

### Quando Fine-Tuning é necessário

- **Estilo/tom consistente** — o modelo precisa "falar" de um jeito específico sempre
- **Formato estruturado** — outputs com schema rígido que few-shot não resolve
- **Conhecimento implícito** — raciocínio de domínio que não cabe em contexto
- **Latência crítica** — eliminar tokens de prompt/retrieval
- **Custo em escala** — prompts longos repetidos milhões de vezes

## Matriz de Decisão

| Critério | Prompt Eng | RAG | Fine-Tuning |
|----------|-----------|-----|-------------|
| Custo inicial | Baixo | Médio | Alto |
| Custo por request | Alto (tokens) | Médio | Baixo |
| Atualização de conhecimento | Imediata | Rápida | Lenta (retrain) |
| Consistência de estilo | Baixa | Baixa | Alta |
| Controle de formato | Médio | Médio | Alto |
| Latência | Baixa | Média | Baixa |
| Complexidade operacional | Baixa | Média | Alta |

## Combinações Poderosas

Fine-tuning não exclui outras técnicas:

- **Fine-tuning + RAG** — modelo especializado que consulta base atualizada
- **Fine-tuning + Few-shot** — modelo ajustado com exemplos dinâmicos
- **Fine-tuning para routing** — modelo leve que decide qual pipeline usar

## Red Flags — Não faça fine-tuning se:

1. Você tem menos de 50 exemplos de qualidade
2. O conhecimento muda semanalmente
3. Prompt engineering não foi testado exaustivamente
4. Não há métrica clara de sucesso
5. O time não tem capacidade de manter o modelo

## Checklist Pré-Fine-Tuning

- [ ] Prompt engineering testado com 10+ variações
- [ ] Few-shot com 5+ exemplos avaliado
- [ ] RAG considerado e descartado com justificativa
- [ ] Métrica de sucesso definida (baseline vs target)
- [ ] Dataset com 50+ exemplos de qualidade disponível
- [ ] Budget de compute aprovado
- [ ] Plano de manutenção/retrain definido

## Conexões

- [[02-preparacao-datasets]] — próximo passo após decidir por fine-tuning
- [[../modulo-02-prompt-engineering/]] — dominar antes de considerar fine-tuning
- [[../modulo-08-arquitetura/]] — RAG como alternativa arquitetural
