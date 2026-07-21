---
titulo: "Framework de Decisão — Qual Ferramenta de IA Usar?"
tags: [decisão, ferramentas, critérios, custo, trade-offs]
fonte: Consolidação pesquisa Junho 2026
confiabilidade: media
---

# 🎯 Framework de Decisão — Qual Ferramenta de IA Usar?

> Mantra 10: "Otimize velocidade e qualidade, antes do custo"

## Fluxograma de Decisão

```
Tenho uma demanda de IA →
│
├─ Preciso GERAR texto/código/análise?
│  ├─ É simples (classificação, extração)? → Modelo BARATO (GPT-5 nano, Haiku, Flash-Lite)
│  ├─ É complexo (raciocínio, multi-step)? → Modelo FRONTIER (Sonnet 4, GPT-5.2, Gemini Pro)
│  └─ Preciso de controle total? → Modelo OPEN-SOURCE + self-host
│
├─ Preciso BUSCAR informação em docs?
│  ├─ Docs estáticos? → RAG (embeddings + vector DB + LLM)
│  ├─ Docs dinâmicos/API? → Agente com tools
│  └─ Knowledge graph? → Neo4j/Neptune + RAG híbrido
│
├─ Preciso de AGENTE autônomo?
│  ├─ Workflow linear? → LangGraph (simple chain)
│  ├─ Workflow com branches/loops? → LangGraph (graph)
│  ├─ Múltiplos agentes com papéis? → CrewAI
│  └─ Integração com ferramentas externas? → MCP servers
│
├─ Preciso CUSTOMIZAR um modelo?
│  ├─ Só ajustar comportamento? → Prompt Engineering + few-shot
│  ├─ Preciso de domain knowledge? → RAG
│  ├─ Preciso de estilo/formato específico? → LoRA fine-tuning
│  └─ Preciso de performance máxima? → Full fine-tuning (raro)
│
└─ Preciso MONITORAR em produção?
   ├─ Traces + custo? → LangFuse (self-host) ou LangSmith
   ├─ Avaliação de qualidade? → Arize Phoenix + evals
   └─ APM geral? → NewRelic/Datadog + LangFuse
```

---

## Matriz Custo vs Complexidade

```
                        COMPLEXIDADE DA TAREFA
                    Baixa              Alta
              ┌──────────────────┬──────────────────┐
    Baixo     │  GPT-5 nano      │  Gemini Flash    │
              │  Haiku 3.5       │  GPT-5 mini      │
    CUSTO     │  Flash-Lite      │  DeepSeek V3     │
              ├──────────────────┼──────────────────┤
    Alto      │  ❌ Desperdício   │  Claude Sonnet 4 │
              │  (não faça isso)  │  GPT-5.2         │
              │                   │  Gemini 2.5 Pro  │
              └──────────────────┴──────────────────┘
```

---

## Critérios de Seleção por Dimensão

### 1. Custo

| Faixa | Budget Mensal | Recomendação |
|-------|:------------:|--------------|
| **Hobby/Estudo** | $0-20 | Free tiers (OpenRouter, Groq, Gemini), Ollama local |
| **Startup/MVP** | $20-200 | Gemini Flash + OpenAI small + pgvector |
| **Produção leve** | $200-2000 | Mix models via gateway + caching + batch |
| **Enterprise** | $2000+ | AWS Bedrock + Portkey + LangFuse + dedicated |

### 2. Latência

| Requisito | Solução |
|-----------|---------|
| < 100ms (real-time) | Groq/Cerebras + modelo pequeno |
| 100-500ms (conversacional) | Qualquer provider + streaming |
| 500ms-2s (aceitável) | Qualquer modelo frontier |
| > 2s (batch/async) | Batch API (50% desconto), async processing |

### 3. Privacidade & Compliance

| Requisito | Stack |
|-----------|-------|
| GDPR / dados em EU | Mistral (França) + LangFuse self-host |
| Zero data sharing | Ollama + self-hosted tudo |
| SOC2 / Enterprise | AWS Bedrock + Portkey + data retention policies |
| Brasil (LGPD) | AWS São Paulo + Bedrock + logs em território |

### 4. Qualidade Output

| Prioridade | Modelo | Justificativa |
|------------|--------|---------------|
| Código | Claude Sonnet 4, DeepSeek V4 | Benchmarks SWE-Bench líderes |
| Texto criativo | GPT-5.2, Claude Opus 4 | Nuance, estilo, coerência longa |
| Análise dados | Gemini 2.5 Pro | 1M contexto, multimodal |
| Instrução precisa | GPT-4.1 | Instruction-following líder |
| Multilingue | Qwen 3.5, Gemini | Treinados explicitamente multi-lang |

---

## Anti-Padrões Comuns

| ❌ Anti-Padrão | ✅ Correto | Por Quê |
|----------------|-----------|---------|
| Usar GPT-5.2 para tudo | Cascade (nano → mini → full) | 90% das queries não precisa do frontier |
| Fine-tuning antes de RAG | RAG primeiro, FT se insuficiente | RAG é mais flexível e barato |
| Um provider só | Gateway multi-provider | Single point of failure, sem barganha |
| Ignorar caching | Cache semântico | 40-60% economia, mesma qualidade |
| Embedding de 3072 dims | 1536 ou 1024 é suficiente | Storage + latência desnecessários |
| Self-host tudo | Managed para MVP, self-host para escala | Ops overhead > economia em estágio early |
| Sem observabilidade | LangFuse desde dia 1 | Impossível otimizar o que não mede |

---

## Progressão de Aprendizado Sugerida

### Nível 1 — Fundamentos (onde você está)
- [ ] Entender diferença entre modelos (proprietário vs open-source)
- [ ] Saber o que é RAG e quando usar
- [ ] Usar um IDE com IA (Kiro/Cursor)
- [ ] Entender tokens, contexto, temperature

### Nível 2 — Construtor
- [ ] Fazer RAG funcional com LangChain + pgvector
- [ ] Configurar MCP server básico
- [ ] Monitorar com LangFuse
- [ ] Escolher modelo certo por tarefa (cascading)

### Nível 3 — Arquiteto
- [ ] Desenhar sistema multi-agente com LangGraph
- [ ] Implementar AI Gateway com fallback
- [ ] Fine-tuning com LoRA para domínio específico
- [ ] Avaliar modelos sistematicamente (evals)
- [ ] Otimizar custos em produção (batch, cache, routing)

### Nível 4 — Platform Engineer
- [ ] Construir plataforma de IA (como Hotmart AI v2)
- [ ] Self-host modelos open-source (vLLM)
- [ ] Governança: guardrails, rate limiting, auditoria
- [ ] Multi-tenant com isolation

---

## Recursos para Aprofundar

### Cursos/Docs Oficiais
- [LangChain Docs](https://docs.langchain.com)
- [LlamaIndex Docs](https://docs.llamaindex.ai)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [OpenAI Cookbook](https://cookbook.openai.com)
- [Anthropic Docs](https://docs.anthropic.com)

### Benchmarks & Comparações
- [LMSYS Chatbot Arena](https://chat.lmsys.org) — ranking humano de modelos
- [Artificial Analysis](https://artificialanalysis.ai) — speed + quality + cost
- [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) — embeddings
- [SWE-Bench](https://swe-bench.com) — coding benchmarks

### Comunidades
- [r/LocalLLaMA](https://reddit.com/r/LocalLLaMA) — modelos open-source
- [LangChain Discord](https://discord.gg/langchain)
- [Hugging Face Discord](https://discord.gg/huggingface)
