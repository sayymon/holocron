---
titulo: "Chrome Built-in AI (Web 4.0) — Modelos rodando direto no Browser"
tags: [chrome, built-in-ai, gemini-nano, prompt-api, web4, on-device, browser-ai]
fonte: "Google I/O 2025 + developer.chrome.com + Erick Wendel"
confiabilidade: alta
data: 2026-06-08
---

# Chrome Built-in AI — Modelos rodando direto no Browser

## O Conceito (Web 4.0)

O Google está embarcando modelos de IA **diretamente no Chrome**. Em vez de fazer chamadas a APIs de servidor, o browser baixa e gerencia modelos localmente (Gemini Nano + modelos especializados) que rodam no processador local (CPU, GPU ou NPU).

Isso é o que o Erick Wendel chamou de **Web 4.0**: inferência de IA acontecendo 100% client-side, sem server roundtrip, sem API key, sem custo por token.

### Por que isso muda o jogo?

| Antes (Web 3.0 / APIs) | Agora (Web 4.0 / Built-in AI) |
|-------------------------|-------------------------------|
| Request → Server → LLM → Response | Tudo local no browser |
| Custo por token | Custo zero (hardware do usuário) |
| Latência de rede | Quase instantâneo |
| Dados saem do device | Dados ficam no device (privacidade) |
| Precisa de internet | Funciona offline |
| Precisa de API key | Zero configuração para o user |

## APIs Disponíveis (Status Junho 2026)

| API | O que faz | Status no Chrome |
|-----|-----------|------------------|
| **Prompt API** | Chat livre com Gemini Nano (tipo ChatGPT local) | ✅ Chrome 148 (web) / Chrome 138 (extensions) |
| **Summarizer API** | Resume textos longos | ✅ Chrome 138 stable |
| **Translator API** | Traduz entre idiomas | ✅ Chrome 138 stable |
| **Language Detector API** | Detecta idioma do texto | ✅ Chrome 138 stable |
| **Writer API** | Gera texto novo baseado em instrução | 🧪 Origin Trial |
| **Rewriter API** | Reescreve/melhora texto existente | 🧪 Origin Trial |
| **Proofreader API** | Correção gramatical | 🧪 Origin Trial |
| **Multimodal (imagem/áudio)** | Input visual e sonoro para Gemini Nano | 🔬 EPP (Early Preview) |

## Como Testar na Sua Máquina

### Requisitos de Hardware/Software

- **OS:** macOS 13+ (Ventura), Windows 10/11, ou Linux
- **Chrome:** versão 138+ (para APIs stable) ou 148+ (para Prompt API web)
- **Storage:** ~22GB livre (para download do Gemini Nano)
- **RAM:** 4GB+ (recomendado 8GB+)
- **GPU:** recomendada (mas funciona com CPU fallback)
- ⚠️ **Não funciona em mobile**

### Passo a Passo — Habilitar Built-in AI

#### 1. Atualizar Chrome

Verifique sua versão em `chrome://version`. Precisa ser **138+** para APIs task-specific ou **148+** para Prompt API na web.

```
# Verificar versão
chrome://settings/help
```

Se necessário, use Chrome Canary/Dev para acesso mais cedo:
- [Chrome Canary](https://www.google.com/chrome/canary/)
- [Chrome Dev](https://www.google.com/chrome/dev/)

#### 2. Habilitar Flags

Abra uma nova aba e vá para `chrome://flags`:

```
# Flag principal — Prompt API (chat com Gemini Nano)
chrome://flags/#prompt-api-for-gemini-nano → Enabled

# Flag para download do modelo sem restrições
chrome://flags/#optimization-guide-on-device-model → Enabled BypassPerfRequirement

# Flag para input multimodal (imagem/áudio) — opcional
chrome://flags/#prompt-api-for-gemini-nano-multimodal-input → Enabled
```

**Reinicie o Chrome** após alterar as flags.

#### 3. Baixar o Modelo

Depois de reiniciar, o Chrome precisa baixar o Gemini Nano (~22GB). Para forçar o download:

```javascript
// Abra o Console do DevTools (F12) e execute:
const canCreate = await LanguageModel.availability();
console.log(canCreate); // "downloadable", "downloading", ou "available"
```

Se retornar `"downloadable"`, force o download:

```javascript
// Isso inicia o download do modelo
await LanguageModel.create();
```

#### 4. Verificar o Status

```
# Página de diagnóstico interna
chrome://on-device-internals
```

Aqui você vê o status do download e logs de eventos.

#### 5. Verificar se está funcionando

```javascript
// No Console do DevTools:
const availability = await LanguageModel.availability();
console.log(availability); // Deve retornar "available"

// Se "available", testar uma inferência:
const session = await LanguageModel.create({
  systemPrompt: "Você é um assistente útil e responde em português."
});

const response = await session.prompt("O que é Web 4.0?");
console.log(response);
```

## Exemplos de Código

### Prompt API — Chat básico

```javascript
// Criar sessão com system prompt
const session = await LanguageModel.create({
  systemPrompt: "Você é um assistente técnico conciso."
});

// Prompt simples
const resposta = await session.prompt("Explique REST em uma frase");
console.log(resposta);

// Streaming (token a token)
const stream = await session.promptStreaming("Conte uma história curta");
for await (const chunk of stream) {
  console.log(chunk); // cada pedaço conforme gerado
}

// Verificar tokens restantes na sessão
console.log(`Tokens usados: ${session.tokensSoFar}/${session.maxTokens}`);
console.log(`Tokens disponíveis: ${session.tokensLeft}`);

// Destruir sessão quando não precisar mais
session.destroy();
```

### Prompt API — Com parâmetros de sampling

```javascript
const session = await LanguageModel.create({
  systemPrompt: "Você é um poeta criativo.",
  temperature: 1.2,  // mais criativo
  topK: 40           // mais diversidade
});

const poema = await session.prompt("Escreva um haiku sobre código");
```

### Summarizer API — Resumir texto

```javascript
// Verificar disponibilidade
const canSummarize = await Summarizer.availability();

if (canSummarize === "available") {
  const summarizer = await Summarizer.create({
    type: "key-points",    // "tl;dr", "key-points", "teaser", "headline"
    length: "short",       // "short", "medium", "long"
    format: "plain-text"   // "plain-text", "markdown"
  });

  const resumo = await summarizer.summarize(textoLongo);
  console.log(resumo);
}
```

### Translator API — Traduzir

```javascript
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "pt"
});

const traduzido = await translator.translate("Hello, how are you?");
console.log(traduzido); // "Olá, como você está?"
```

### Language Detector API — Detectar idioma

```javascript
const detector = await LanguageDetector.create();
const resultados = await detector.detect("Bonjour le monde");

console.log(resultados[0]);
// { detectedLanguage: "fr", confidence: 0.97 }
```

## TypeScript Types

```bash
npm install --save-dev @types/dom-chromium-ai
```

Depois basta usar normalmente — as interfaces `LanguageModel`, `Summarizer`, `Translator`, `LanguageDetector` ficam disponíveis globalmente.

## Limitações Atuais

| Limitação | Detalhe |
|-----------|---------|
| Apenas desktop | Não funciona em mobile (Chrome Android/iOS) |
| Modelo fixo | Só usa Gemini Nano (não dá para escolher modelo) |
| Context window pequena | Gemini Nano tem ~4K-8K tokens |
| Qualidade inferior | Gemini Nano < Gemini Pro < GPT-4o (é um modelo pequeno) |
| Download pesado | ~22GB no primeiro uso |
| Idiomas limitados | Melhor em inglês, resultados variáveis em PT-BR |
| Sem fine-tuning | Não dá para customizar o modelo |

## Quando usar Built-in AI vs APIs de servidor?

| Cenário | Built-in AI | API Server (OpenAI, Gemini) |
|---------|-------------|----------------------------|
| Privacidade crítica | ✅ | ❌ |
| Funcionar offline | ✅ | ❌ |
| Custo zero | ✅ | ❌ |
| Latência mínima | ✅ | ❌ |
| Qualidade máxima | ❌ | ✅ |
| Contexto grande | ❌ | ✅ |
| Mobile | ❌ | ✅ |
| Tarefas complexas | ❌ | ✅ |

**Abordagem ideal: híbrida** — Built-in AI para tarefas leves/rápidas + fallback para server quando precisa de mais poder.

## Arquitetura Híbrida (recomendada)

```
                 ┌─── Built-in AI disponível? ───┐
                 │                                │
                YES                              NO
                 │                                │
    ┌────────────▼────────────┐    ┌─────────────▼──────────────┐
    │  Chrome Prompt API      │    │  Firebase AI Logic /       │
    │  (Gemini Nano local)    │    │  OpenAI / Gemini Pro API   │
    │  - Zero custo           │    │  - Custo por token         │
    │  - Offline OK           │    │  - Melhor qualidade        │
    │  - Privacidade total    │    │  - Context maior           │
    └─────────────────────────┘    └────────────────────────────┘
```

## Ferramentas Úteis

| Ferramenta | URL | Uso |
|------------|-----|-----|
| Chrome AI Demos | https://chrome.dev/web-ai-demos/ | Demos oficiais para testar |
| Prompt API Test | https://prompt-api.com/ | Tester online |
| on-device-internals | `chrome://on-device-internals` | Debug e logs do modelo |
| EPP (Early Preview) | https://developer.chrome.com/docs/ai/join-epp | Acesso antecipado a novas APIs |
| TypeScript types | `@types/dom-chromium-ai` | Tipagens para desenvolvimento |

## Padronização (W3C)

Essas APIs estão em processo de padronização no W3C WebML Working Group. Mozilla e WebKit foram consultados — se aprovadas, outros browsers (Firefox, Safari) poderão implementar no futuro.

## Conexões

- [[tokenizacao-e-anatomia-gpt]] — tokens, sampling, geração autoregressiva (acontece localmente agora)
- [[provedores-ia-generativa]] — comparativo com APIs tradicionais
- [[consistencia-custo-eficiencia]] — custo zero é game changer
- [[integracao-ia-backend]] — arquitetura híbrida client + server

## Referências

- [Chrome Built-in AI Overview](https://developer.chrome.com/docs/ai/built-in/overview)
- [Built-in AI APIs Status](https://developer.chrome.com/docs/ai/built-in-apis)
- [Prompt API Docs](https://developer.chrome.com/docs/ai/prompt-api)
- [Prompt API GitHub Spec](https://github.com/webmachinelearning/prompt-api)
- [Google I/O 2025 — AI on Chrome](https://developer.chrome.com/blog/ai-io25)
- [Chrome AI Demos](https://chrome.dev/web-ai-demos/)
- [TypeScript Types](https://www.npmjs.com/package/@types/dom-chromium-ai)
