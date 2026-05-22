---
titulo: "Aplicações Práticas Multimodais"
modulo: 2
unidade: 8
tags: [ocr, analise-midia, bots-multimodais, vision, audio, aplicacoes, producao]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Aplicações Práticas Multimodais

## OCR Inteligente com Vision

### Além do OCR tradicional

OCR clássico (Tesseract) extrai texto. Vision models **entendem** o documento.

| Capacidade | OCR Tradicional | Vision AI |
|------------|----------------|-----------|
| Extrair texto | ✅ | ✅ |
| Entender layout | ❌ | ✅ |
| Interpretar tabelas | Parcial | ✅ |
| Classificar documento | ❌ | ✅ |
| Extrair dados estruturados | ❌ | ✅ |

### Implementação: Extração de dados de nota fiscal

```typescript
async function extractInvoiceData(imageBuffer: Buffer) {
  const base64 = imageBuffer.toString('base64');
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: `Extraia os dados desta nota fiscal em JSON:
          { "emitente": string, "cnpj": string, "valor_total": number,
            "data_emissao": string, "itens": [{ "descricao": string, "valor": number }] }` },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${base64}`, detail: 'high' } }
      ]
    }]
  });

  return JSON.parse(response.choices[0].message.content);
}
```

### Pipeline de documentos

```typescript
class DocumentProcessor {
  async process(file: Buffer, mimeType: string) {
    // 1. Classificar tipo de documento
    const docType = await this.classify(file, mimeType);
    
    // 2. Extrair dados com prompt específico por tipo
    const template = this.getTemplate(docType);
    const data = await this.extract(file, template);
    
    // 3. Validar dados extraídos
    const validated = await this.validate(data, docType);
    
    return { docType, data: validated, confidence: validated.confidence };
  }

  private async classify(file: Buffer, mimeType: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Classificação é simples
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'Classifique: nota_fiscal | contrato | recibo | identidade | outro' },
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${file.toString('base64')}` } }
        ]
      }]
    });
    return response.choices[0].message.content.trim();
  }
}
```

## Análise de Mídia

### Análise de vídeo (thumbnails de curso)

```typescript
async function analyzeCourseThumbnail(imageUrl: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: `Analise esta thumbnail de curso e avalie:
          1. Clareza da proposta de valor (1-10)
          2. Qualidade visual (1-10)
          3. Elementos de persuasão presentes
          4. Sugestões de melhoria
          Responda em JSON.` },
        { type: 'image_url', image_url: { url: imageUrl } }
      ]
    }]
  });
  return JSON.parse(response.choices[0].message.content);
}
```

### Moderação de conteúdo

```typescript
async function moderateImage(imageUrl: string) {
  const moderation = await openai.moderations.create({
    model: 'omni-moderation-latest',
    input: [{ type: 'image_url', image_url: { url: imageUrl } }]
  });

  return {
    flagged: moderation.results[0].flagged,
    categories: moderation.results[0].categories
  };
}
```

### Transcrição + Resumo de aulas

```typescript
async function processLessonAudio(audioPath: string) {
  // 1. Transcrever
  const transcription = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioPath),
    language: 'pt',
    response_format: 'verbose_json'
  });

  // 2. Resumir com timestamps
  const summary = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{
      role: 'user',
      content: `Resuma esta transcrição de aula em tópicos com timestamps:
        ${JSON.stringify(transcription.segments.map(s => ({ time: s.start, text: s.text })))}`
    }]
  });

  return { transcription: transcription.text, summary: summary.choices[0].message.content };
}
```

## Bots Multimodais

### Arquitetura de bot que aceita texto, imagem e áudio

```typescript
class MultimodalBot {
  async handleMessage(message: UserMessage): Promise<BotResponse> {
    const parts: ContentPart[] = [];

    // Processar cada attachment
    for (const attachment of message.attachments) {
      switch (attachment.type) {
        case 'image':
          parts.push({ type: 'image_url', image_url: { url: attachment.url } });
          break;
        case 'audio':
          const text = await this.transcribe(attachment.url);
          parts.push({ type: 'text', text: `[Áudio transcrito]: ${text}` });
          break;
        case 'document':
          const extracted = await this.extractDocument(attachment.url);
          parts.push({ type: 'text', text: `[Documento]: ${extracted}` });
          break;
      }
    }

    // Adicionar texto do usuário
    if (message.text) {
      parts.push({ type: 'text', text: message.text });
    }

    // Gerar resposta
    const response = await this.llm.chat({
      messages: [
        { role: 'system', content: this.systemPrompt },
        { role: 'user', content: parts }
      ]
    });

    return { text: response.content, type: 'text' };
  }
}
```

### Caso de uso: Bot de suporte com screenshot

```
Usuário: "Não consigo acessar meu curso" + [screenshot do erro]
Bot: 
  1. Analisa screenshot → identifica erro 403
  2. Busca na KB → "Erro 403 = sessão expirada"
  3. Responde: "Pelo screenshot, sua sessão expirou. Tente fazer logout e login novamente."
```

## Custos e Trade-offs

| Aplicação | Modelo recomendado | Custo/operação | Latência |
|-----------|-------------------|----------------|----------|
| OCR simples | GPT-4o-mini | ~$0.005 | ~2s |
| OCR complexo (tabelas) | GPT-4o | ~$0.02 | ~4s |
| Moderação | omni-moderation | ~$0.001 | ~1s |
| Transcrição | Whisper | $0.006/min | ~real-time |
| Análise de vídeo | Gemini 2.5 | Variável | ~10s |

## Conexões

- → [Unidade 7: Multimodal](07-modelos-multimodais.md) — Fundamentos técnicos
- → [Unidade 6: Backend](06-integracao-ia-backend.md) — Integração em APIs
- → [Unidade 5: RAG](05-rag-avancado-pratica.md) — RAG multimodal
