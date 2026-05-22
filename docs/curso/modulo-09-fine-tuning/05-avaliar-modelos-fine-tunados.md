---
titulo: "Avaliar Modelos Fine-Tunados"
modulo: 9
unidade: 5
tags: [avaliação, métricas, testes-ab, overfitting, generalização, benchmarks]
dificuldade: avançada
fonte: "Hugging Face Evaluate Library, OpenAI Evals Framework"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Avaliar Modelos Fine-Tunados

## Contexto

Um modelo fine-tunado sem avaliação rigorosa é um risco. Pode parecer bom em exemplos cherry-picked mas falhar em produção. Avaliação sistemática é o que separa experimentação de engenharia.

## Framework de Avaliação

```
Baseline (modelo base) → Fine-tuned → Comparação → Decisão (deploy ou iterar)
```

## Métricas Quantitativas

### Para classificação/extração

| Métrica | O que mede | Quando usar |
|---------|-----------|-------------|
| Accuracy | % de acertos | Classes balanceadas |
| Precision | Acertos / predições positivas | Custo alto de falso positivo |
| Recall | Acertos / positivos reais | Custo alto de falso negativo |
| F1 | Harmônica de precision/recall | Equilíbrio geral |

### Para geração de texto

| Métrica | O que mede | Limitações |
|---------|-----------|------------|
| BLEU | Sobreposição de n-grams | Não captura semântica |
| ROUGE | Recall de n-grams | Melhor para sumarização |
| BERTScore | Similaridade semântica | Mais caro computacionalmente |
| LLM-as-Judge | Avaliação por outro modelo | Viés do avaliador |

### Loss curves

- **Training loss** — deve diminuir consistentemente
- **Validation loss** — deve acompanhar (gap crescente = overfitting)

## Avaliação com LLM-as-Judge

```javascript
async function evaluateWithJudge(original, generated, criteria, openai) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{
      role: 'system',
      content: `Avalie a resposta gerada vs a referência.
                Critérios: ${criteria.join(', ')}
                Retorne JSON: {"score": 1-5, "reasoning": "..."}`
    }, {
      role: 'user',
      content: `Referência: ${original}\nGerada: ${generated}`
    }]
  });
  return JSON.parse(response.choices[0].message.content);
}
```

## Testes A/B

### Design do experimento

1. **Grupo A:** Modelo base (ou versão anterior)
2. **Grupo B:** Modelo fine-tunado
3. **Métrica primária:** Definida antes do teste
4. **Tamanho amostral:** Mínimo 100 interações por grupo
5. **Duração:** 1-2 semanas (capturar variação temporal)

### Implementação

```javascript
function abTestRouter(userId, testConfig) {
  const bucket = hashUserId(userId) % 100;
  const isGroupB = bucket < testConfig.trafficPercent;
  return {
    model: isGroupB ? testConfig.modelB : testConfig.modelA,
    group: isGroupB ? 'B' : 'A'
  };
}
```

### Métricas de negócio para A/B

- Taxa de resolução (se chatbot)
- Satisfação do usuário (thumbs up/down)
- Tempo de interação
- Taxa de escalação para humano

## Overfitting — Detecção e Prevenção

### Sinais de overfitting

- Validation loss sobe enquanto training loss desce
- Modelo repete frases do dataset verbatim
- Performance excelente em exemplos similares ao treino, ruim em novos
- Modelo "esquece" capacidades do base model

### Prevenção

| Técnica | Como aplicar |
|---------|-------------|
| Mais dados | Aumentar dataset (qualidade > quantidade) |
| Menos epochs | Reduzir n_epochs |
| Early stopping | Parar quando val_loss para de melhorar |
| Regularização | Dropout no LoRA, weight decay |
| Data augmentation | Paráfrases, variações sintéticas |

## Generalização

### Teste de distribuição

Avalie em 3 categorias:
1. **In-distribution** — exemplos similares ao treino (deve ir bem)
2. **Near-distribution** — variações do treino (teste real)
3. **Out-of-distribution** — cenários novos (não deve degradar muito)

### Eval set design

```javascript
const evalSets = {
  inDist: loadExamples('eval/in-distribution.jsonl'),
  nearDist: loadExamples('eval/near-distribution.jsonl'),
  outDist: loadExamples('eval/out-of-distribution.jsonl'),
  adversarial: loadExamples('eval/adversarial.jsonl')
};

async function fullEvaluation(model, evalSets) {
  const results = {};
  for (const [name, examples] of Object.entries(evalSets)) {
    results[name] = await evaluateSet(model, examples);
  }
  return results;
}
```

## Checklist de Avaliação

- [ ] Baseline medido (modelo base sem fine-tuning)
- [ ] Métricas quantitativas calculadas
- [ ] LLM-as-Judge em amostra representativa
- [ ] Teste de overfitting (val_loss vs train_loss)
- [ ] Teste out-of-distribution
- [ ] Teste adversarial (inputs maliciosos/edge cases)
- [ ] Comparação custo-benefício vs baseline

## Conexões

- [[03-fine-tuning-openai-api]] — métricas de treino vêm do job
- [[04-lora-peft]] — comparar LoRA vs full FT com mesmas métricas
- [[06-projeto-modelo-customizado]] — aplicar tudo em projeto real
