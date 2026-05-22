---
titulo: "Projeto Final — Modelo Customizado para Domínio Específico"
modulo: 9
unidade: 6
tags: [projeto, fine-tuning, end-to-end, pipeline, produção, domínio]
dificuldade: avançada
fonte: "Síntese das unidades 1-5, OpenAI Best Practices"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Projeto Final — Modelo Customizado para Domínio Específico

## Objetivo

Aplicar todo o conhecimento do módulo em um projeto end-to-end: da decisão de fine-tuning até um modelo avaliado e pronto para produção.

## Escopo do Projeto

Criar um modelo especializado para um domínio de sua escolha, seguindo o pipeline completo:

```
Decisão → Dados → Treino → Avaliação → Documentação
```

## Fase 1: Decisão e Planejamento

### Deliverable: ADR (Architecture Decision Record)

Documente:
- **Domínio escolhido** — qual problema o modelo resolve
- **Por que fine-tuning** — por que RAG/prompt eng não bastam (referência: Unidade 1)
- **Métrica de sucesso** — como saber se funcionou
- **Abordagem** — API (OpenAI) ou LoRA (justifique)

### Template de ADR

```markdown
# ADR: Fine-tuning para [domínio]

## Status: Proposto

## Contexto
[Problema que o modelo resolve]

## Decisão
Fine-tuning via [API/LoRA] porque [justificativa]

## Alternativas consideradas
- Prompt engineering: descartado porque [motivo]
- RAG: descartado porque [motivo]

## Métricas de sucesso
- [Métrica 1]: baseline X → target Y
- [Métrica 2]: baseline X → target Y
```

## Fase 2: Preparação de Dados

### Deliverable: Dataset JSONL validado

Requisitos mínimos:
- 100+ exemplos de treino
- 20+ exemplos de validação
- Script de preparação reproduzível
- Relatório de qualidade (stats, distribuição)

### Estrutura esperada

```
projeto/
├── data/
│   ├── raw/              # Dados brutos
│   ├── processed/        # Dados limpos
│   ├── train.jsonl       # Dataset de treino
│   └── validation.jsonl  # Dataset de validação
├── scripts/
│   ├── prepare.js        # Pipeline de preparação
│   └── validate.js       # Validação de qualidade
└── docs/
    └── data-report.md    # Relatório do dataset
```

### Script de validação

```javascript
import fs from 'fs';

function validateDataset(path) {
  const lines = fs.readFileSync(path, 'utf-8').trim().split('\n');
  const stats = { total: lines.length, valid: 0, errors: [] };

  for (const [i, line] of lines.entries()) {
    try {
      const ex = JSON.parse(line);
      const hasUser = ex.messages?.some(m => m.role === 'user');
      const hasAssistant = ex.messages?.some(m => m.role === 'assistant');
      if (!hasUser || !hasAssistant) {
        stats.errors.push(`Line ${i + 1}: missing user or assistant`);
      } else {
        stats.valid++;
      }
    } catch (e) {
      stats.errors.push(`Line ${i + 1}: invalid JSON`);
    }
  }
  return stats;
}
```

## Fase 3: Treinamento

### Deliverable: Modelo treinado + log de experimentos

```javascript
const experiment = {
  id: 'exp-001',
  date: '2026-05-22',
  model_base: 'gpt-4o-mini-2024-07-18',
  dataset: { train: 120, validation: 30 },
  hyperparameters: { epochs: 3, batch_size: 'auto', lr: 'auto' },
  results: {
    training_loss_final: null,
    validation_loss_final: null,
    fine_tuned_model_id: null
  }
};
```

## Fase 4: Avaliação

### Deliverable: Relatório de avaliação comparativo

Avaliar em 3 dimensões:

| Dimensão | Baseline (sem FT) | Fine-tuned | Delta |
|----------|-------------------|------------|-------|
| Qualidade (LLM-judge 1-5) | ? | ? | ? |
| Consistência de formato | ? | ? | ? |
| Aderência ao domínio | ? | ? | ? |

### Eval automatizado

```javascript
async function runEvaluation(baseModel, ftModel, evalSet, openai) {
  const results = { base: [], ft: [] };

  for (const example of evalSet) {
    const [baseResp, ftResp] = await Promise.all([
      generate(baseModel, example.input, openai),
      generate(ftModel, example.input, openai)
    ]);

    const [baseScore, ftScore] = await Promise.all([
      judgeResponse(baseResp, example.expected, openai),
      judgeResponse(ftResp, example.expected, openai)
    ]);

    results.base.push(baseScore);
    results.ft.push(ftScore);
  }

  return {
    base_avg: avg(results.base),
    ft_avg: avg(results.ft),
    improvement: avg(results.ft) - avg(results.base)
  };
}
```

## Fase 5: Documentação

### Deliverable: README do projeto

Deve conter:
1. Problema resolvido
2. Decisão de abordagem (link para ADR)
3. Como reproduzir (scripts, comandos)
4. Resultados (tabela comparativa)
5. Limitações conhecidas
6. Próximos passos

## Critérios de Avaliação

| Critério | Peso | Excelente | Suficiente | Insuficiente |
|----------|------|-----------|------------|--------------|
| Decisão justificada | 15% | ADR completo | Justificativa parcial | Sem justificativa |
| Qualidade do dataset | 25% | 200+ exemplos, pipeline automatizado | 100+ exemplos | <50 exemplos |
| Treino executado | 20% | Múltiplas iterações documentadas | 1 treino com métricas | Sem métricas |
| Avaliação rigorosa | 25% | A/B + LLM-judge + OOD | LLM-judge básico | Avaliação subjetiva |
| Documentação | 15% | Reproduzível por terceiros | README básico | Sem docs |

## Sugestões de Domínio

- Assistente de vendas para produto digital
- Classificador de tickets de suporte
- Gerador de descrições de produto
- Assistente de código para framework específico
- Chatbot de onboarding para empresa

## Conexões

- [[01-quando-fazer-fine-tuning]] — framework de decisão (Fase 1)
- [[02-preparacao-datasets]] — pipeline de dados (Fase 2)
- [[03-fine-tuning-openai-api]] — execução do treino (Fase 3)
- [[05-avaliar-modelos-fine-tunados]] — métricas e avaliação (Fase 4)
