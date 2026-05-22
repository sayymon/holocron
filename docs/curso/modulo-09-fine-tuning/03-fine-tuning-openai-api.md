---
titulo: "Fine-Tuning via OpenAI API"
modulo: 9
unidade: 3
tags: [fine-tuning, openai, api, hiperparâmetros, versionamento, treinamento]
dificuldade: intermediária
fonte: "OpenAI Fine-Tuning API Documentation, OpenAI Cookbook"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Fine-Tuning via OpenAI API

## Contexto

A OpenAI oferece fine-tuning como serviço gerenciado. Você envia dados, configura hiperparâmetros e recebe um modelo customizado — sem gerenciar GPUs.

## Fluxo Completo

```
Upload dataset → Criar job → Monitorar → Avaliar → Deploy
```

## 1. Upload do Dataset

```javascript
import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI();

async function uploadTrainingFile(filePath) {
  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: 'fine-tune'
  });
  console.log(`File ID: ${file.id} | Status: ${file.status}`);
  return file;
}
```

## 2. Criar Job de Fine-Tuning

```javascript
async function createFineTuneJob(trainingFileId, options = {}) {
  const job = await openai.fineTuning.jobs.create({
    training_file: trainingFileId,
    model: options.model || 'gpt-4o-mini-2024-07-18',
    hyperparameters: {
      n_epochs: options.epochs || 'auto',
      batch_size: options.batchSize || 'auto',
      learning_rate_multiplier: options.lr || 'auto'
    },
    suffix: options.suffix || 'my-domain-v1',
    validation_file: options.validationFileId || undefined
  });
  return job;
}
```

### Modelos disponíveis

| Modelo | Custo relativo | Quando usar |
|--------|---------------|-------------|
| gpt-4o-mini | Baixo | Tarefas simples, alto volume |
| gpt-4o | Alto | Raciocínio complexo, qualidade máxima |

## 3. Hiperparâmetros

### Epochs (n_epochs)

- **Auto:** OpenAI calcula baseado no tamanho do dataset
- **Manual:** 1-10 (datasets pequenos precisam de mais epochs)
- **Risco:** Muitos epochs → overfitting

### Batch Size

- **Auto:** Otimizado pela OpenAI
- **Trade-off:** Maior batch = treino mais estável mas mais lento

### Learning Rate Multiplier

- **Auto:** Recomendado para começar
- **Manual:** 0.1-2.0 (menor = mais conservador)

## 4. Monitoramento

```javascript
async function monitorJob(jobId) {
  const events = await openai.fineTuning.jobs.listEvents(jobId, { limit: 20 });
  for (const event of events.data.reverse()) {
    console.log(`[${event.created_at}] ${event.message}`);
  }
  const job = await openai.fineTuning.jobs.retrieve(jobId);
  if (job.status === 'succeeded') {
    console.log(`Modelo: ${job.fine_tuned_model}`);
  }
  return job;
}
```

### Métricas durante treino

- **training_loss** — deve diminuir ao longo dos steps
- **validation_loss** — deve acompanhar training_loss (divergência = overfitting)

## 5. Usando o Modelo

```javascript
async function query(modelId, userMessage) {
  const response = await openai.chat.completions.create({
    model: modelId,
    messages: [
      { role: 'system', content: 'Você é um especialista no domínio X.' },
      { role: 'user', content: userMessage }
    ]
  });
  return response.choices[0].message.content;
}
```

## 6. Versionamento

### Convenção de nomenclatura

```
ft:{base_model}:{org}:{suffix}:{id}
Exemplo: ft:gpt-4o-mini-2024-07-18:hotmart:sales-v2:abc123
```

### Boas práticas

1. **Sufixo semântico** — `domain-v1`, `domain-v2`
2. **Changelog** — documente o que mudou entre versões
3. **Baseline** — sempre compare com modelo base sem fine-tuning
4. **Rollback** — mantenha versões anteriores até validar a nova
5. **Reprodutibilidade** — salve file IDs, hiperparâmetros e métricas

## Custos (referência)

| Operação | Custo |
|----------|-------|
| Training (gpt-4o-mini) | ~$0.003/1K tokens |
| Training (gpt-4o) | ~$0.025/1K tokens |
| Inference (fine-tuned) | ~1.5x do modelo base |

**Estimativa:** 200 exemplos × 500 tokens × 3 epochs = 300K tokens ≈ $0.90 (mini)

## Conexões

- [[02-preparacao-datasets]] — dataset precisa estar pronto antes
- [[04-lora-peft]] — alternativa para fine-tuning local
- [[05-avaliar-modelos-fine-tunados]] — como medir se funcionou
