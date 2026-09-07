---
titulo: "Anthropic Claude — Líder em Coding e Segurança"
tags: [anthropic, claude, fable, opus, haiku, provider, coding, mcp]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: tools-providers
status: explored
wikilinks:
  - llms
  - ai-gateway
  - mcp
  - prompt-engineering
  - generative-ai
  - geracao-texto
  - geracao-codigo
  - benchmarks-generative-ai
---

# Anthropic Claude — Líder em Coding e Segurança

> Anthropic é a empresa fundada por ex-pesquisadores da OpenAI (Dario e Daniela Amodei). Foco em AI Safety. A família Claude é líder em coding (#1 SWE-Bench), criou o [[mcp]] (Model Context Protocol), e oferece Claude Code — agente terminal autônomo.

## Arquitetura Interna

```
┌─────────────────────────────────────────────────────┐
│                CLAUDE FABLE 5.1                      │
│                                                      │
│  INPUT MODALITIES: Texto, Imagem                     │
│  OUTPUT MODALITY: Texto                              │
│  CONTEXT WINDOW: 200K tokens                         │
│                                                      │
│  ARQUITETURA: Dense Transformer (decoder-only)       │
│  TREINO: Pre-training + RLHF + Constitutional AI     │
│  ESPECIALIDADES:                                     │
│    → Coding (#1 SWE-Bench Verified)                  │
│    → MCP nativo (criador do protocolo)               │
│    → Extended Thinking (raciocínio visível)          │
│    → Computer Use (controlar desktop)                │
│    → Claude Code (agente terminal)                   │
│                                                      │
│  SEGURANÇA:                                          │
│    → Constitutional AI (regras éticas embutidas)     │
│    → Menos jailbreaks que concorrentes               │
│    → AI Safety é o foco principal                    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Modelos (Setembro 2026)

### Tier Frontier

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso Principal |
|--------|:------------:|:-------------:|:--------:|---------------|
| **Claude Opus 5** | $15.00 | $75.00 | 200K | Pesquisa profunda, raciocínio |
| **Claude Fable 5.1** | $3.00 | $15.00 | 200K | **Coding líder**, agentes |
| **Claude Mythos Preview** | — | — | 200K | Preview limitado |

### Tier Mid

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso Principal |
|--------|:------------:|:-------------:|:--------:|---------------|
| **Claude Fable 5** | $3.00 | $15.00 | 200K | Geral, custo-benefício |
| **Claude Sonnet 4** | $3.00 | $15.00 | 200K | Coding, análise |

### Tier Budget

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso Principal |
|--------|:------------:|:-------------:|:--------:|---------------|
| **Claude Haiku 3.5** | $0.80 | $4.00 | 200K | Velocidade, classificação |

## Claude Fable 5.1 — O Modelo de Coding

### Dados Técnicos

| Característica | Valor |
|----------------|-------|
| **Context Window** | 200K tokens |
| **Input** | Texto, Imagem |
| **Output** | Texto |
| **Pricing** | $3/$15 per MTok |
| **Melhor para** | Coding, agentes, análise |
| **Lançamento** | Setembro 2026 |

### Benchmarks

| Benchmark | Fable 5.1 | GPT-6 Astra | Claude Opus 5 |
|-----------|:---------:|:-----------:|:-------------:|
| **SWE-Bench Verified** | **78.5%** | 78.2% | 73.5% |
| **Terminal-Bench 4.0** | 55.8% | **57.9%** | 52.3% |
| **DeepSWE v1.1** | 67.4% | **74.1%** | 73.7% |
| **FrontierCode 1.1** | 63.6% | **64.5%** | 63.6% |
| **GPQA Diamond** | 93.7% | **96.0%** | 93.7% |

### Diferenciais

| Feature | Descrição |
|---------|-----------|
| **#1 SWE-Bench** | Resolução de bugs reais em repositórios |
| **200K contexto** | Nativo, sem degradação significativa |
| **MCP nativo** | Criador do protocolo — integração perfeita |
| **Extended Thinking** | Raciocínio explícito (chain-of-thought visível) |
| **Claude Code** | Agente terminal autônomo para coding |
| **Computer Use** | Controlar desktop (screenshots + clicks) |
| **Artifacts** | Geração de UI/código executável no chat |
| **Prompt Caching** | Até 90% desconto em prefixos repetidos |

## Claude Code — Agente Terminal

```
┌─────────────────────────────────────────────────────┐
│                CLAUDE CODE                           │
│                                                      │
│  O QUE É: Agente terminal autônomo                   │
│  COMO FUNCIONA:                                      │
│    1. Usuário descreve tarefa em linguagem natural   │
│    2. Claude analisa o projeto                        │
│    3. Cria plano de execução                          │
│    4. Executa comandos no terminal                    │
│    5. Instala dependências                            │
│    6. Escreve código                                  │
│    7. Roda testes                                     │
│    8. Entrega resultado                               │
│                                                      │
│  USO:                                                 │
│    → npm install -g @anthropic-ai/claude-code         │
│    → claude "crie uma API REST em Python"             │
│                                                      │
│  CUSTO: Incluído no Claude Max ($100/mês)             │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## MCP (Model Context Protocol)

```
┌─────────────────────────────────────────────────────┐
│              MODEL CONTEXT PROTOCOL                   │
│                                                      │
│  O QUE É: Protocolo universal para conectar LLMs     │
│           a ferramentas e dados externos              │
│                                                      │
│  CRIADO POR: Anthropic (2024)                         │
│                                                      │
│  PRIMITIVAS:                                          │
│    → Resources: Dados read-only                       │
│    → Tools: Ações executáveis                         │
│    → Prompts: Templates reutilizáveis                 │
│    → Sampling: Server pede completion                 │
│                                                      │
│  TRANSPORTES:                                         │
│    → stdio (local, IDEs)                              │
│    → Streamable HTTP (remoto, SSE)                    │
│                                                      │
│  ADOÇÃO:                                              │
│    → Cursor, Kiro, VS Code, Windsurf                  │
│    → LangChain, LlamaIndex, CrewAI                    │
│    → Vercel AI SDK                                    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Extended Thinking

```
PROMPT: "Resolva esta equação: 2x + 5 = 15"

RESPOSTA SEM EXTENDED THINKING:
  x = 5

RESPOSTA COM EXTENDED THINKING:
  [Thinking]:
    2x + 5 = 15
    2x = 15 - 5
    2x = 10
    x = 5
    
  [Response]:
    x = 5

VANTAGEM:
  → Raciocínio visível e auditável
  → Melhor para problemas complexos
  → Transparência no processo de decisão
```

## Quando Usar

✅ **Use Claude quando:**
- Tarefa principal é **código** (geração, review, refactoring)
- Precisa de contexto longo (200K) bem utilizado
- Quer integrar com [[mcp]] nativamente
- Segurança/safety é prioridade
- Coding assistant profissional (Claude Code)
- Raciocínio complexo com Extended Thinking

❌ **Evite quando:**
- Precisa de contexto > 200K (Gemini tem 1M+)
- Budget mínimo + alto volume (Gemini Flash é mais barato)
- Multimodal heavy (imagem/vídeo generation)
- Real-time voice/audio (OpenAI é melhor)
- Computer use avançado (GPT-6 Astra lidera)

## Casos de Uso Reais

| Caso | Como usa |
|------|----------|
| **Kiro** | Modelo default para coding |
| **Hotmart AI Gateway** | Acesso via AWS Bedrock |
| **SARA** | Agente de suporte |
| **Code Review** | Claude Sonnet automatizado |
| **Claude Code** | Desenvolvimento autônomo |

## Planos

| Plano | Preço | Inclui |
|-------|:-----:|--------|
| **Claude Pro** | $20/mês | Acesso consumer |
| **Claude Max** | $100/mês | Claude Code ilimitado |
| **API** | Pay-per-token | Via console ou Bedrock |

## Conceitos Relacionados

- [[llms]] — Categoria
- [[mcp]] — Protocolo criado pela Anthropic
- [[ai-gateway]] — Acesso via Bedrock
- [[prompt-engineering]] — Extended Thinking
- [[coding-assistants]] — Claude Code
- [[geracao-texto]] — Aplicação principal
- [[geracao-codigo]] — SWE-Bench líder
- [[benchmarks-generative-ai]] — Métricas

## Conexões

- [[openai-gpt]] — Competidor (ecossistema maior, GPT-6 Astra)
- [[google-gemini]] — Competidor (mais barato, contexto maior)
- [[meta-llama]] — Open-source
- [[deepseek]] — Budget + código
- [[langchain]] — Framework que integra
- [[kiro]] — IDE que usa Claude

---

**Status:** Documento explorado — ecossistema Anthropic completo com Fable 5.1
**Última atualização:** Setembro 2026
