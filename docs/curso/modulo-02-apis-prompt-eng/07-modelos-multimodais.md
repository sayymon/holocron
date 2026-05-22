---
titulo: "Modelos Multimodais"
modulo: 2
unidade: 7
tags: [multimodal, vision, audio, video, texto, gpt-4o, gemini, whisper, tts]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Modelos Multimodais

## O que são Modelos Multimodais

Modelos que processam e/ou geram múltiplas modalidades de dados (texto, imagem, áudio, vídeo) em uma única arquitetura.

## Modalidades e Provedores

| Modalidade | Input | Output | Provedores |
|------------|-------|--------|------------|
| Texto → Texto | ✅ | ✅ | Todos |
| Imagem → Texto | ✅ | ✅ | GPT-4o, Claude, Gemini |
| Texto → Imagem | ✅ | ✅ | DALL-E 3, Stable Diffusion, Midjourney |
| Áudio → Texto | ✅ | ✅ | Whisper, Gemini |
| Texto → Áudio | ✅ | ✅ | OpenAI TTS, ElevenLabs |
| Vídeo → Texto | ✅ | ✅ | Gemini (nativo), GPT-4o (frames) |

## Vision (Imagem → Texto)

### GPT-4o Vision

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Descreva esta imagem em detalhes.' },
      { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } }
    ]
  }]
});
```

### Claude Vision

```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'O que há nesta imagem?' },
      { type: 'image', source: { type: 'base64', media_type: 'image/png', data: base64Image } }
    ]
  }]
});
```

### Gemini (imagem + vídeo nativos)

```typescript
const response = await genai.generateContent([
  'Analise este vídeo e descreva os principais momentos.',
  { fileData: { mimeType: 'video/mp4', fileUri: uploadedVideoUri } }
]);
```

## Áudio

### Speech-to-Text (Whisper)

```typescript
const transcription = await openai.audio.transcriptions.create({
  model: 'whisper-1',
  file: fs.createReadStream('audio.mp3'),
  language: 'pt',
  response_format: 'verbose_json', // Inclui timestamps
});
```

### Text-to-Speech

```typescript
const speech = await openai.audio.speech.create({
  model: 'tts-1-hd',
  voice: 'nova',
  input: 'Olá! Bem-vindo ao curso de IA.',
  speed: 1.0
});

const buffer = Buffer.from(await speech.arrayBuffer());
fs.writeFileSync('output.mp3', buffer);
```

## Geração de Imagens

### DALL-E 3

```typescript
const image = await openai.images.generate({
  model: 'dall-e-3',
  prompt: 'Um dashboard futurista mostrando métricas de IA em tempo real',
  size: '1024x1024',
  quality: 'hd',
  n: 1
});

const imageUrl = image.data[0].url;
```

## Custos Multimodais

| Operação | Modelo | Custo aproximado |
|----------|--------|-----------------|
| Imagem input (alta res) | GPT-4o | ~$0.01-0.03 por imagem |
| Áudio transcription | Whisper | $0.006 / minuto |
| TTS | tts-1-hd | $0.030 / 1K chars |
| Geração de imagem | DALL-E 3 HD | $0.080 / imagem |
| Vídeo analysis | Gemini | Varia por duração |

## Limitações Atuais

- **Vídeo:** Apenas Gemini processa vídeo nativamente; outros extraem frames
- **Áudio em tempo real:** Latência ainda alta para conversação fluida
- **Geração de imagem:** Dificuldade com texto em imagens, mãos, consistência
- **Multimodal output:** Poucos modelos geram múltiplas modalidades simultaneamente

## Padrão de Integração

```typescript
class MultimodalService {
  async process(input: MultimodalInput): Promise<MultimodalOutput> {
    switch (input.type) {
      case 'image':
        return this.processImage(input.data);
      case 'audio':
        const text = await this.transcribe(input.data);
        return this.processText(text);
      case 'video':
        const frames = await this.extractFrames(input.data);
        return this.processFrames(frames);
      default:
        return this.processText(input.data);
    }
  }
}
```

## Conexões

- → [Unidade 2: Provedores](02-provedores-ia-generativa.md) — Capacidades por provedor
- → [Unidade 8: Aplicações](08-aplicacoes-praticas-multimodais.md) — Casos de uso reais
- → [Unidade 6: Backend](06-integracao-ia-backend.md) — Endpoints multimodais
