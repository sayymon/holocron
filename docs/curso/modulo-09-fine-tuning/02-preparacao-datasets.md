---
titulo: "Preparação de Datasets"
modulo: 9
unidade: 2
tags: [datasets, jsonl, limpeza-dados, automação, javascript, qualidade]
dificuldade: intermediária
fonte: "OpenAI Data Preparation Guide, Hugging Face Datasets Documentation"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Preparação de Datasets

## Contexto

A qualidade do fine-tuning é diretamente proporcional à qualidade dos dados. "Garbage in, garbage out" é especialmente verdadeiro aqui — um dataset ruim produz um modelo que alucina com confiança.

## Formato JSONL

O padrão para fine-tuning de chat models é JSONL (JSON Lines), onde cada linha é uma conversa completa:

```jsonl
{"messages": [{"role": "system", "content": "Você é um assistente de vendas."}, {"role": "user", "content": "Como funciona o checkout?"}, {"role": "assistant", "content": "O checkout funciona..."}]}
{"messages": [{"role": "system", "content": "Você é um assistente de vendas."}, {"role": "user", "content": "Quais formas de pagamento?"}, {"role": "assistant", "content": "Aceitamos..."}]}
```

### Regras do formato

- Uma conversa por linha (não quebrar JSON em múltiplas linhas)
- Encoding UTF-8
- Roles válidos: `system`, `user`, `assistant`
- Mínimo: 1 `user` + 1 `assistant` por conversa
- System message opcional mas recomendada (consistência)

## Pipeline de Preparação

```
Fontes brutas → Coleta → Limpeza → Formatação → Validação → Split
```

### 1. Coleta de Dados

Fontes comuns:
- Logs de conversas reais (chat, tickets)
- Documentação existente transformada em Q&A
- Dados sintéticos gerados por modelo maior
- Anotações manuais por especialistas

### 2. Limpeza com JavaScript

```javascript
function cleanExample(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[^\S\n]+$/gm, '')
    .trim();
}

function validateMessage(msg) {
  if (!msg.role || !msg.content) return false;
  if (!['system', 'user', 'assistant'].includes(msg.role)) return false;
  if (msg.content.trim().length === 0) return false;
  return true;
}
```

### 3. Processamento em Stream

```javascript
import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';

async function processDataset(inputPath, outputPath) {
  const input = createInterface({ input: createReadStream(inputPath) });
  const output = createWriteStream(outputPath);
  let valid = 0, invalid = 0;

  for await (const line of input) {
    try {
      const example = JSON.parse(line);
      if (!example.messages?.every(validateMessage)) {
        invalid++;
        continue;
      }
      example.messages = example.messages.map(m => ({
        ...m,
        content: cleanExample(m.content)
      }));
      output.write(JSON.stringify(example) + '\n');
      valid++;
    } catch {
      invalid++;
    }
  }
  console.log(`Valid: ${valid} | Invalid: ${invalid}`);
  output.end();
}
```

### 4. Deduplicação

```javascript
import { createHash } from 'crypto';

function deduplicateExamples(examples) {
  const seen = new Set();
  return examples.filter(ex => {
    const hash = createHash('md5')
      .update(JSON.stringify(ex.messages))
      .digest('hex');
    if (seen.has(hash)) return false;
    seen.add(hash);
    return true;
  });
}
```

### 5. Split Train/Validation

```javascript
function splitDataset(examples, trainRatio = 0.8) {
  const shuffled = [...examples].sort(() => Math.random() - 0.5);
  const splitIdx = Math.floor(shuffled.length * trainRatio);
  return {
    train: shuffled.slice(0, splitIdx),
    validation: shuffled.slice(splitIdx)
  };
}
```

Proporções recomendadas:
- **Mínimo:** 50 exemplos (train) + 10 (validation)
- **Ideal:** 200-500 exemplos de alta qualidade
- **Split:** 80/20 ou 90/10

## Dados Sintéticos

Quando dados reais são escassos, use um modelo maior para gerar exemplos:

```javascript
async function generateSyntheticPair(topic, openai) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{
      role: 'user',
      content: `Gere um par pergunta/resposta sobre "${topic}". JSON: {"user": "...", "assistant": "..."}`
    }]
  });
  return JSON.parse(response.choices[0].message.content);
}
```

⚠️ Dados sintéticos podem amplificar vieses. Sempre revise uma amostra manualmente.

## Checklist de Qualidade

- [ ] Sem duplicatas
- [ ] Tokens dentro do limite do modelo
- [ ] Distribuição balanceada de tópicos
- [ ] Sem PII não anonimizado
- [ ] Respostas do assistant são exemplares (não medianas)

## Conexões

- [[01-quando-fazer-fine-tuning]] — decisão que precede a preparação
- [[03-fine-tuning-openai-api]] — próximo passo: enviar dataset para treino
