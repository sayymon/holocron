---
titulo: "Mapa de Aplicação — Ferramentas e Implementação"
data: '2026-09-07'
tipo: mapa-aplicacao
status: vivo
---

# 🔧 Mapa de Aplicação — Ferramentas e Implementação

> **Propósito:** Entender *como* implementar cada conceito. Qual ferramenta usar, como conectar, quando escolher cada uma.
> **Regra:** Cada ferramenta链接a(s) conceito(s) que implementa.

---

## VISÃO GERAL — Ecossistema de Ferramentas

```
USUÁRIO FINAL
      │
      ▼
┌─────────────────────────────────────────────────┐
│                  INTERFACE                        │
│  IDEs (Cursor, Kiro, VS Code)                    │
│  Chat UIs (OpenAI Playground, Claude)            │
│  Apps (Streamlit, Gradio, Web)                   │
└──────────────────────┬──────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │  PROMPT  │ │   RAG    │ │ AGENTES  │
    │ ENGINEER │ │ PIPELINE │ │  SYSTEMS │
    └────┬─────┘ └────┬─────┘ └────┬─────┘
         │            │            │
         └────────────┼────────────┘
                      │
              ┌───────┴───────┐
              ▼               ▼
       ┌─────────────┐ ┌─────────────┐
       │  ORQUESTRÃO │ │  PROTOCOLOS │
       │  (Frameworks)│ │   (MCP)     │
       └──────┬──────┘ └──────┬──────┘
              │               │
              └───────┬───────┘
                      │
              ┌───────┴───────┐
              ▼               ▼
       ┌─────────────┐ ┌─────────────┐
       │   PROVIDERS │ │ INFRAESTRUT │
       │  (LLMs API) │ │ (Vector DBs)│
       └─────────────┘ └─────────────┘
```

---

## CAMADA 1 — PROVIDERS DE LLM

### 1.1 Mapa de Decisão

```
Qual modelo usar?
      │
      ├─→ Precisa de CODIGO?
      │     ├─→ Simples → GPT-4o-mini ($0.15/MTok)
      │     ├─→ Complexo → Claude Sonnet 4 ($3/MTok)
      │     └─→ Opensource → DeepSeek-Coder ($0.27/MTok)
      │
      ├─→ Precisa de RACIOCÍNIO?
      │     ├─→ Profundo → o3, Claude Opus 4 ($15/MTok)
      │     ├─→ Rápido → GPT-4o ($2.50/MTok)
      │     └─→ Budget → DeepSeek-R1 ($0.55/MTok)
      │
      ├─→ Precisa de MULTIMODAL?
      │     ├─→ Imagem+Texto → GPT-4o, Gemini 2.5 Pro
      │     ├─→ Vídeo → Gemini 2.5 Pro
      │     └─→ Áudio → GPT-4o-audio
      │
      └─→ Precisa de CUSTO BAIXO?
            ├─→ Self-host → Llama 3.3 (grátis)
            ├─→ API barata → DeepSeek, Qwen
            └─→ Ultra-rápido → Groq (Llama)
```

### 1.2 Tabela de Referência Rápida

| Provider | Melhor Para | Preço Entrada | API Endpoint |
|----------|-------------|:-------------:|-------------|
| [[openai-gpt]] | Generalista, código, multimodal | $0.15/MTok | api.openai.com |
| [[anthropic-claude]] | Código, raciocínio, segurança | $0.80/MTok | api.anthropic.com |
| [[google-gemini]] | Multimodal, vídeo, contexto longo | $0.10/MTok | generativelanguage.googleapis.com |
| [[meta-llama]] | Self-host, sem custo de API | Grátis | huggingface.co |
| [[deepseek]] | Budget, raciocínio, código | $0.27/MTok | api.deepseek.com |
| [[qwen]] | Opensource, multilíngue | Grátis | dashscope.aliyuncs.com |
| [[mistral]] | Europeu, Opensource, EdEU | Grátis-$2/MTok | api.mistral.ai |

### 1.3 Conexões com Conceitos

| Provider | Conceito que Implementa |
|----------|------------------------|
| OpenAI | [[llms]], [[prompt-engineering]], [[fine-tuning]] |
| Anthropic | [[llms]], [[human-in-the-loop]], [[ai-safety-alignment]] |
| Google | [[llms]], [[multimodal]] |
| Meta | [[llms]], [[fine-tuning]] (open weights) |
| DeepSeek | [[reasoning-models]], [[fine-tuning]] |
| Qwen | [[fine-tuning]] (Apache 2.0) |
| Mistral | [[fine-tuning]], [[mlops]] (enterprise) |

---

## CAMADA 2 — FRAMEWORKS DE ORQUESTRAÇÃO

### 2.1 Mapa de Decisão

```
O que você precisa fazer?
      │
      ├─→ RAG simples?
      │     └─→ [[llamaindex]] (especialista em RAG)
      │
      ├─→ Agentes simples?
      │     └─→ [[langchain]] (ecossistema maior)
      │
      ├─→ Agentes stateful complexos?
      │     └─→ [[langgraph]] (máquina de estados)
      │
      ├─→ Multi-agentes com papéis?
      │     └─→ [[crewai]] (role-based)
      │
      └─→ Agentes OpenAI managed?
            └─→ [[openai-agents-sdk]] (runtime gerenciado)
```

### 2.2 Comparativo Detalhado

| Framework | Abordagem | Melhor Para | Curva Aprendizado |
|-----------|-----------|-------------|:-----------------:|
| [[langchain]] | Chain/Graph | RAG geral, prototipagem | Média |
| [[langgraph]] | State Machine | Agentes production, HITL | Alta |
| [[crewai]] | Role-based | Multi-agentes, rapid setup | Baixa |
| [[llamaindex]] | Index-based | RAG especializado | Média |
| [[openai-agents-sdk]] | Managed | OpenAI ecosystem | Baixa |

### 2.3 Conexões com Conceitos

| Framework | Conceitos que Implementa |
|-----------|------------------------|
| LangChain | [[rag]], [[prompt-engineering]], [[tool-use-function-calling]] |
| LangGraph | [[agentes-ia]], [[multi-agent-systems]], [[human-in-the-loop]] |
| CrewAI | [[multi-agent-systems]], [[agentes-ia]] |
| LlamaIndex | [[rag]], [[embeddings]], [[vector-databases]] |
| OpenAI Agents SDK | [[agentes-ia]], [[tool-use-function-calling]] |

### 2.4 Conexões com Ferramentas

| Framework | Integra Com |
|-----------|-------------|
| LangChain | [[langfuse]], [[langsmith]], [[mcp]], [[pgvector]] |
| LangGraph | [[langfuse]], [[langsmith]], [[mcp]], [[pgvector]] |
| CrewAI | [[langfuse]], [[mcp]] |
| LlamaIndex | [[langfuse]], [[vector-databases]] |
| OpenAI Agents SDK | [[openai-gpt]] (nativo) |

---

## CAMADA 3 — PROTOCOLOS

### 3.1 MCP (Model Context Protocol)

```
HOST (IDE/App)
      │
      ├─→ CLIENT 1 ──→ SERVER A (Filesystem)
      │
      ├─→ CLIENT 2 ──→ SERVER B (Database)
      │
      └─→ CLIENT N ──→ SERVER N (Browser)
```

**Primitivas:**
| Primitive | O que faz | Quem controla |
|-----------|-----------|---------------|
| Resources | Dados read-only | Server |
| Tools | Ações executáveis | Server executa, Client aprova |
| Prompts | Templates reutilizáveis | Server |
| Sampling | Server pede completion | Client executa |

**Transportes:**
- stdio → Local (IDEs)
- Streamable HTTP → Remoto (SSE)

**Conexões:** [[mcp]] → [[agentes-ia]] (tools) → [[prompt-engineering]] (prompts) → [[mcp-transports]]

### 3.2 MCP Servers Documentados

| Categoria | Servers | Conceito que Implementa |
|-----------|---------|------------------------|
| Filesystem | [[mcp-filesystem]], [[mcp-memory]] | [[data-engineering]] |
| Databases | [[mcp-postgres]], [[mcp-sqlite]], [[mcp-supabase]] | [[vector-databases]] |
| Search | [[mcp-brave-search]], [[mcp-exa]], [[mcp-firecrawl]] | [[rag]] |
| Code | [[mcp-github]], [[mcp-context7]], [[mcp-sentry]] | [[mlops]] |
| Browser | [[mcp-playwright]] | [[computer-vision]] (indireto) |
| Productivity | [[mcp-slack]], [[mcp-notion]] | Integração |
| Cloud | [[mcp-kubernetes]] | [[mlops]], [[model-serving-deployment]] |

---

## CAMADA 4 — RAG PIPELINE

### 4.1 Fluxo Completo

```
DOCUMENTOS
    │
    ▼
┌─────────────┐
│  LOADER     │ ← PDF, HTML, MD, DB
│  (Ingestão) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  CHUNKING   │ ← Recursive, Semantic, Paragraph
│  (Divisão)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  EMBEDDING  │ ← OpenAI, Cohere, BGE
│  (Vetorização)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ VECTOR STORE│ ← pgvector, Pinecone, Qdrant
│  (Armazenamento)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  RETRIEVER  │ ← Similarity, MMR, Hybrid
│  (Busca)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  GENERATOR  │ ← LLM (GPT, Claude, etc)
│  (Resposta) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  EVALUATOR  │ ← RAGAS, DeepEval
│  (Qualidade)│
└─────────────┘
```

### 4.2 Ferramentas por Etapa

| Etapa | Ferramentas | Conceito |
|-------|-------------|----------|
| Loader | LangChain, LlamaIndex, Unstructured | [[data-engineering]] |
| Chunking | LangChain RecursiveTextSplitter | [[chunking]] (stub) |
| Embedding | OpenAI, Cohere, BGE | [[embeddings]] |
| Vector Store | pgvector, Pinecone, Qdrant, Chroma | [[vector-databases]] |
| Retriever | LangChain, LlamaIndex | [[rag]] |
| Generator | Any LLM | [[llms]] |
| Evaluator | RAGAS, DeepEval, Arize | [[evaluation]] (stub) |

### 4.3 Conexões com Conceitos

| Ferramenta | Conceito que Implementa |
|------------|------------------------|
| pgvector | [[vector-databases]], [[rag]] |
| Pinecone | [[vector-databases]], [[rag]] |
| Qdrant | [[vector-databases]], [[rag]] |
| LangChain | [[rag]], [[prompt-engineering]] |
| LlamaIndex | [[rag]], [[embeddings]] |
| RAGAS | [[evaluation]], [[rag]] |

---

## CAMADA 5 — AGENTES

### 5.1 Fluxo de um Agente

```
OBJETIVO DO USUÁRIO
        │
        ▼
┌─────────────────┐
│  PERCEBER       │ ← Input do usuário, resultados de tools, memória
│  (Observation)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  RACIOCINAR     │ ← LLM + Prompt + Chain-of-Thought
│  (Reasoning)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AGIR           │ ← Tool call (MCP)
│  (Action)       │
└────────┬────────┘
         │
         ▼
    ┌────┴────┐
    │ SUCESSO? │──→ SIM → RESPOSTA FINAL
    └────┬────┘
         │ NÃO
         ▼
    VOLTA PARA PERCEBER
```

### 5.2 Componentes e Ferramentas

| Componente | Ferramentas | Conceito |
|------------|-------------|----------|
| LLM (Brain) | OpenAI, Anthropic, Google | [[llms]] |
| Planning | Prompt Engineering, CoT | [[prompt-engineering]] |
| Tools | MCP Servers | [[mcp]], [[tool-use-function-calling]] |
| Memory | pgvector, Redis, Mem0 | [[embeddings]], [[rag]] |
| Observability | LangFuse, LangSmith | [[observabilidade-llm]] |
| Guardrails | Guardrails AI, NeMo | [[ai-safety-alignment]] |

### 5.3 Frameworks por Tipo de Agente

| Tipo de Agente | Framework | Exemplo |
|----------------|-----------|---------|
| Simples (ReAct) | LangChain | Chatbot com tools |
| Stateful | LangGraph | Workflow complexo com estado |
| Multi-agente | CrewAI | Equipe de agentes especializados |
| Managed | OpenAI Agents SDK | Assistente OpenAI |

---

## CAMADA 6 — FINE-TUNING

### 6.1 Fluxo de Decisão

```
Você tem dados específicos?
      │
      ├─→ NÃO → Use Prompt Engineering + RAG
      │
      └─→ SIM → O modelo precisa de comportamento específico?
            │
            ├─→ NÃO → Use Few-Shot no prompt
            │
            └─→ SIM → Quantos dados?
                  │
                  ├─→ <100 exemplos → Few-Shot + CoT
                  │
                  ├─→ 100-1000 → LoRA/PEFT
                  │
                  └─→ >1000 → Full Fine-Tuning
```

### 6.2 Ferramentas por Técnica

| Técnica | Ferramentas | Conceito |
|---------|-------------|----------|
| LoRA/PEFT | HuggingFace PEFT, Unsloth | [[fine-tuning]] |
| Full FT | OpenAI API, HuggingFace Trainer | [[fine-tuning]] |
| RLHF | TRL, OpenAI API | [[reinforcement-learning]] |
| DPO | TRL, Alignment Handbook | [[fine-tuning]] |

### 6.3 Plataformas de Fine-Tuning

| Plataforma | Modelos Suportados | Preço |
|------------|-------------------|-------|
| OpenAI | GPT-4o-mini, GPT-4o | $3-$25/MTok treino |
| HuggingFace | Qualquer opensource | Compute |
| Together AI | Llama, Mistral, Qwen | $0.002-$0.008/hora |
| Unslath | Llama, Mistral | Open-source |

---

## CAMADA 7 — INFRAESTRUTURA

### 7.1 Vector Databases

| DB | Tipo | Melhor Para | Conceito |
|----|------|-------------|----------|
| [[pgvector]] | Extensão PostgreSQL | Production, SQL familiar | [[vector-databases]] |
| [[pinecone]] | Managed | Sem infra, rápido setup | [[vector-databases]] |
| [[qdrant]] | Self-hosted/Managed | Performance, Rust | [[vector-databases]] |
| [[chroma]] | Embedded | Prototipagem, local | [[vector-databases]] |

### 7.2 Gateways & Inference

| Ferramenta | Função | Conceito |
|------------|--------|----------|
| [[openrouter]] | Multi-provider router | [[ai-gateway]] |
| [[ollama]] | LLMs locais | [[model-serving-deployment]] |
| [[vllm]] (stub) | Serving de alto Throughput | [[model-serving-deployment]] |
| [[together-ai]] (stub) | Fine-tuning + serving | [[fine-tuning]] |

### 7.3 Observabilidade

| Ferramenta | Tipo | Conceito |
|------------|------|----------|
| [[langfuse]] | Open-source, self-hosted | [[observabilidade-llm]] |
| [[langsmith]] | Managed (LangChain) | [[observabilidade-llm]] |
| Arize | Enterprise | [[observabilidade-llm]] |
| Helicone | Gateway + Monitoring | [[observabilidade-llm]] |

---

## MAPA DE CONEXÕES FERRAMENTA ↔ CONCEITO

```
┌─────────────────────────────────────────────────────────────┐
│                     CONCEITOS                                │
│                                                              │
│  [[llms]] ←→ [[transformers]] ←→ [[deep-learning]]          │
│     │              │                    │                    │
│     │              │                    │                    │
│  [[embeddings]] ← [[rag]] ←→ [[chunking]]                   │
│     │              │                                          │
│     │              │                                          │
│  [[vector-databases]] [[agentes-ia]] ←→ [[prompt-engineering]]│
│     │              │                    │                    │
│     │              │                    │                    │
│  [[mcp]] ←→ [[tool-use-function-calling]] ←→ [[fine-tuning]]│
│     │              │                                          │
│     │              │                                          │
│  [[observabilidade-llm]] ←→ [[evaluation]]                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ implementa
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      FERRAMENTAS                             │
│                                                              │
│  Providers:    [[openai-gpt]] [[anthropic-claude]] [[google-gemini]] │
│  Frameworks:   [[langchain]] [[langgraph]] [[crewai]] [[llamaindex]] │
│  Protocols:    [[mcp]] [[mcp-postgres]] [[mcp-playwright]]  │
│  Vector DBs:   [[pgvector]] [[pinecone]] [[qdrant]]        │
│  Observability:[[langfuse]] [[langsmith]]                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## STUBS DE FERRAMENTAS (Para Expandir)

| Stub | Categoria | Prioridade | Referenciado por |
|------|-----------|:----------:|------------------|
| pinecone | Vector DB | ALTA | vector-databases |
| qdrant | Vector DB | ALTA | vector-databases |
| chroma | Vector DB | MÉDIA | vector-databases |
| haystack | Framework | MÉDIA | rag, langchain |
| together-ai | Inference | MÉDIA | inference-platforms |
| vllm | Serving | MÉDIA | inference-platforms |
| groq | Provider | MÉDIA | inference-platforms |
| cerebras | Provider | BAIXA | inference-platforms |

---

## ORDEM DE EXPANSÃO — FERRAMENTAS

### Fase 1: Vector DBs (crítico para RAG)
1. `pinecone.md` — Managed, popular
2. `qdrant.md` — Self-hosted, performance
3. `chroma.md` — Prototipagem

### Fase 2: Inference (custo e performance)
4. `vllm.md` — Serving de produção
5. `together-ai.md` — Fine-tuning + serving
6. `groq.md` — Ultra-rápido

### Fase 3: Frameworks (ecossistema)
7. `haystack.md` — RAG production
8. `guardrails-ai.md` — Segurança

---

**Status:** Mapa vivo — expanda conforme implementar.
**Próximo:** Qual ferramenta quer documentar primeiro?
