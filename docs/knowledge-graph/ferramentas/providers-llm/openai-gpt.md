---
titulo: "OpenAI GPT — O Ecossistema Dominante"
tags: [openai, gpt, gpt-6-astra, chatgpt, api, provider, coding, computer-use]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: tools-providers
status: explored
wikilinks:
  - llms
  - ai-gateway
  - fine-tuning
  - embeddings
  - openai-agents-sdk
  - generative-ai
  - geracao-texto
  - geracao-codigo
  - benchmarks-generative-ai
  - gpt-6-astra
---

# OpenAI GPT — O Ecossistema Dominante

> OpenAI e a empresa que popularizou LLMs com o ChatGPT (2022). Oferece a familia GPT via API, Assistants API, fine-tuning, embeddings, Agents SDK e Computer Use. Em setembro 2026, lancou o **GPT-6 Astra** — o modelo mais capaz ja criado.

## Modelos Atomicos

| Modelo | Doc | Status |
|--------|-----|:------:|
| **GPT-6 Astra** | [[gpt-6-astra]] | ✅ Explorado |

## Arquitetura Interna

```
┌─────────────────────────────────────────────────────┐
│                  GPT-6 ASTRA                         │
│                                                      │
│  INPUT MODALITIES: Texto, Imagem                     │
│  OUTPUT MODALITY: Texto                              │
│  CONTEXT WINDOW: 1.05M tokens                        │
│  MAX OUTPUT: 128K tokens                             │
│  KNOWLEDGE CUTOFF: Abr 2026                          │
│                                                      │
│  ARQUITETURA: Dense Transformer (decoder-only)       │
│  TREINO: Pre-training + RLHF + Alignment             │
│  ESPECIALIDADES:                                     │
│    → Computer Use (controlar desktop)                │
│    → Coding (Terminal-Bench #1)                      │
│    → Raciocínio profundo (reasoning tokens)          │
│    → Cybersecurity (threshold Critical)              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Modelos (Setembro 2026)

### Tier Frontier

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso Principal |
|--------|:------------:|:-------------:|:--------:|---------------|
| **GPT-6 Astra** | $10.00 | $50.00 | 1.05M | Raciocínio, computer use, código |
| **GPT-6 Astra Pro** | $20.00 | $100.00 | 1.05M | Ultra-complexo, pesquisa |
| **GPT-5.6 Sol** | $5.00 | $25.00 | 200K | Anterior frontier |
| **o3** | $10.00 | $40.00 | 200K | Reasoning chains |

### Tier Mid

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso Principal |
|--------|:------------:|:-------------:|:--------:|---------------|
| **GPT-5 mini** | $0.25 | $2.00 | 128K | Custo-benefício geral |
| **GPT-5.6 Luna** | $0.20 | $1.20 | 128K | Ultra-baixo custo |
| **GPT-4.1** | $2.00 | $8.00 | 1M | Código, instruction-following |

### Tier Budget

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso Principal |
|--------|:------------:|:-------------:|:--------:|---------------|
| **GPT-5 nano** | $0.05 | $0.40 | 128K | Classificação, extração |
| **GPT-4.1 mini** | $0.40 | $1.60 | 1M | Alto volume |

## GPT-6 Astra — O Modelo Mais Capaz

### Dados Técnicos

| Característica | Valor |
|----------------|-------|
| **Model ID** | `gpt-6-astra` |
| **Input** | Texto, Imagem |
| **Output** | Texto |
| **Contexto** | 1,050,000 tokens |
| **Max Input** | 922,000 tokens |
| **Max Output** | 128,000 tokens |
| **Knowledge Cutoff** | Abril 2026 |
| **Reasoning** | Sim (reasoning tokens) |
| **Lançamento** | 4 Setembro 2026 |

### Benchmarks (vs Concorrentes)

| Benchmark | GPT-6 Astra | GPT-5.6 Sol | Claude Opus 5 | Claude Fable 5.1 |
|-----------|:-----------:|:-----------:|:-------------:|:----------------:|
| **Agents' Last Exam** | **59.3%** | 53.6% | 55.5% | — |
| **OSWorld 2.0** | **72.6%** | 65.7% | 70.2% | — |
| **Terminal-Bench 4.0** | **57.9%** | 37.3% | 52.3% | 55.8% |
| **FrontierMath Tier 4** | **97.6%** | 83.0% | 73.2% | 87.8% |
| **GPQA Diamond** | **96.0%** | 94.6% | 93.7% | 93.7% |
| **ARC-AGI-3** | **99.9%** | 7.8% | 30.2% | — |
| **ExploitBench** | **100%** | 78.5% | 70% | — |
| **DeepSWE v1.1** | **74.1%** | 72.7% | 73.7% | 67.4% |
| **SWE-Bench Verified** | **78.2%** | 72.1% | 73.5% | 76.2% |

### Capacidades Únicas

| Capacidade | Descrição |
|------------|-----------|
| **Computer Use** | Controlar desktop: preencher forms, pesquisar online, organizar calendário |
| **1.05M Contexto** | Maior janela da indústria — documentos inteiros no contexto |
| **Alignment** | 0% de ação além do escopo (vs 48% do antecessor) |
| **Velocidade** | 47% mais rápido que GPT-5.6 Sol (40min vs 75min) |
| **Cybersecurity** | Threshold "Critical" — encontra zero-days |
| **Reasoning Tokens** | Raciocínio profundo antes de responder |
| **Persistent Notes** | Memória entre context windows no Codex |

### Preços

| Metrica | Standard | Fast Mode | Batch |
|---------|:--------:|:---------:|:-----:|
| **Input** | $10/MTok | $20/MTok | $5/MTok |
| **Cached Input** | $1/MTok | $2/MTok | $0.50/MTok |
| **Output** | $50/MTok | $100/MTok | $25/MTok |
| **>272K input** | 2x preço | 2x preço | 2x preço |

### Tools Disponíveis

| Tool | O que faz |
|------|-----------|
| `web_search` | Pesquisa na web |
| `file_search` | Busca em arquivos |
| `image_generation` | Gera imagens |
| `code_interpreter` | Executa código |
| `hosted_shell` | Terminal remoto |
| `computer_use` | Controlar desktop |
| `mcp` | Integrar MCP servers |

## Funcionalidades do Ecossistema

| Feature | O que faz | Quando usar |
|---------|-----------|-------------|
| **Chat Completions** | Gerar texto | Todo chat/completion |
| **Assistants API** | Agentes com memória | Chatbots stateful |
| **Fine-tuning** | Treinar modelos customizados | Estilo/formato específico |
| **Embeddings** | Vetorizar texto | RAG, busca semântica |
| **Batch API** | Lote (50% desconto) | Alto volume não real-time |
| **Realtime API** | Áudio/voz em tempo real | Voice assistants |
| **Codex** | Agente de código cloud | Software engineering |
| **Prompt Caching** | Cache de prefixo (90% desc.) | Prompts com prefix fixo |

## Quando Usar

✅ **Use OpenAI quando:**
- Precisa do modelo mais capaz (GPT-6 Astra)
- Computer use é essencial
- Precisa de contexto > 1M tokens
- Ecossistema completo (assistants, realtime, codex)
- Coding profissional (Terminal-Bench #1)

❌ **Evite quando:**
- Budget apertado + alto volume (Gemini Flash é 10x mais barato)
- Soberania de dados/GDPR (servidores US only)
- Coding máximo (Claude Fable 5.1 é competitivo)
- Contexto > 1M (Gemini tem 2M)

## Casos de Uso Reais

| Caso | Como usa |
|------|----------|
| **Hotmart SARA** | Suporte automatizado via API |
| **Kiro IDE** | Modelo base para coding |
| **Playco** | Desenvolvimento de games (50% menos fixes manuais) |
| **Devin** | Agente de software engineering |
| **Jane Street** | Modelagem financeira |

## Conceitos Relacionados

- [[llms]] — Categoria do produto
- [[ai-gateway]] — Como intermediar acesso
- [[fine-tuning]] — Customização
- [[embeddings]] — API de embeddings
- [[openai-agents-sdk]] — Framework de agentes
- [[prompt-engineering]] — Otimizar uso
- [[geracao-texto]] — Aplicação principal
- [[geracao-codigo]] — Terminal-Bench, Codex
- [[benchmarks-generative-ai]] — Métricas

## Conexões

- [[anthropic-claude]] — Competidor (coding líder)
- [[google-gemini]] — Competidor (mais barato, contexto maior)
- [[meta-llama]] — Open-source
- [[deepseek]] — Budget + código
- [[openrouter]] — Acesso via gateway
- [[langchain]] — Framework que integra

---

**Status:** Documento explorado — ecossistema OpenAI completo com GPT-6 Astra
**Última atualização:** Setembro 2026
