---
titulo: "Mapa do Ecossistema de IA — Ferramentas, Modelos e Plataformas (2026)"
tags: [ecossistema, ferramentas, modelos, llm, rag, agentes, observabilidade, infraestrutura]
fonte: Pesquisa web consolidada (Junho 2026)
confiabilidade: media
---

# 🗺️ Mapa do Ecossistema de IA — Ferramentas, Modelos e Plataformas (2026)

> "Lute pelo estado da arte" — Mantra 4

## Visão Geral por Camadas

O ecossistema de IA em 2026 se organiza em **7 camadas**:

```
┌─────────────────────────────────────────────────────────┐
│  7. IDEs & Coding Assistants (onde você codifica)       │
├─────────────────────────────────────────────────────────┤
│  6. Observabilidade (como você monitora)                │
├─────────────────────────────────────────────────────────┤
│  5. Frameworks de Agentes (como orquestra agentes)      │
├─────────────────────────────────────────────────────────┤
│  4. Frameworks RAG/App (como constrói apps de IA)       │
├─────────────────────────────────────────────────────────┤
│  3. Vector Databases (onde armazena embeddings)          │
├─────────────────────────────────────────────────────────┤
│  2. Gateways & Inference (como acessa os modelos)       │
├─────────────────────────────────────────────────────────┤
│  1. Foundation Models (os cérebros)                     │
└─────────────────────────────────────────────────────────┘
```

---

## 1. 🧠 Foundation Models (LLMs)

### Modelos Proprietários (Closed-Source)

| Provedor | Modelo | Input $/MTok | Output $/MTok | Contexto | Melhor Para |
|----------|--------|:------------:|:-------------:|:--------:|-------------|
| **OpenAI** | GPT-5.2 | $1.75 | $14.00 | 128K | Raciocínio geral, agentes |
| OpenAI | GPT-5.2 Pro | $21.00 | $168.00 | 128K | Tarefas complexas, pesquisa |
| OpenAI | GPT-5 mini | $0.25 | $2.00 | 128K | Custo-benefício geral |
| OpenAI | GPT-5 nano | $0.05 | $0.40 | 128K | Alto volume, classificação |
| OpenAI | GPT-4.1 | $2.00 | $8.00 | 1M | Código, instrução-following |
| **Anthropic** | Claude Sonnet 4 | $3.00 | $15.00 | 200K | Código, análise, segurança |
| Anthropic | Claude Opus 4 | $15.00 | $75.00 | 200K | Tarefas ultra-complexas |
| Anthropic | Claude Haiku 3.5 | $0.80 | $4.00 | 200K | Velocidade, custo baixo |
| **Google** | Gemini 2.5 Pro | $1.25 | $10.00 | 1M | Multimodal, contexto longo |
| Google | Gemini 2.5 Flash | $0.15 | $0.60 | 1M | **Custo-líder com reasoning** |
| Google | Gemini 2.5 Flash-Lite | $0.10 | $0.40 | 1M | Ultra-baixo custo |

**Insight de custo:** Gemini 2.5 Flash é ~10x mais barato em input vs competidores, com 1M tokens de contexto. Para alto volume, é imbatível.

### Modelos Open-Source/Open-Weights

| Modelo | Params (Ativos) | Licença | Contexto | Destaque |
|--------|:--------------:|---------|:--------:|----------|
| **Llama 4 Scout** | 109B (17B MoE) | Llama License | **10M** | Contexto ultra-longo, single GPU |
| **Llama 4 Maverick** | 400B (17B MoE) | Llama License | 1M | Performance frontier |
| **DeepSeek V3/V4** | 671B (37B MoE) | DeepSeek License | 128K | Coding, raciocínio, custo/token líder |
| **Qwen 3.5** | 72B / 235B MoE | Apache 2.0 | 128K | Multilíngue, coding forte |
| **Mistral Large** | — | Apache 2.0 | 128K | Europa, compliance GDPR |
| **Gemma 4** | 9B / 27B | Google License | 128K | Leve, mobile, edge |
| **Phi-4** | 14B | MIT | 128K | Small model, raciocínio |

**Decisão rápida:**
- Quer rodar local com contexto enorme? → **Llama 4 Scout** (10M tokens)
- Melhor coder open-source? → **DeepSeek V4** ou **Qwen 3.5**
- Licença mais permissiva? → **Qwen (Apache 2.0)** ou **GLM-5 (MIT)**
- Edge/mobile? → **Gemma 4** ou **Phi-4**

---

## 2. 🚪 Gateways, Routers & Plataformas de Inferência

### O que são?
Camada entre sua aplicação e os provedores de modelos. Unificam API, fazem failover, caching, rate limiting e observabilidade.

| Ferramenta | Tipo | Modelo de Cobrança | Melhor Para |
|------------|------|-------------------|-------------|
| **OpenRouter** | Router multi-provider | Pay-per-token (markup ~0-30%) | Diversidade de modelos (250+), fallback automático |
| **LiteLLM** | Gateway open-source | Self-hosted (grátis) | Controle total, 100+ providers, sem vendor lock |
| **Portkey** | Gateway managed | Free tier + pay-per-usage | Enterprise, guardrails, analytics dashboard |
| **Cloudflare AI Gateway** | Gateway managed | Free tier generoso | Caching, rate limiting, já usa Cloudflare |
| **Helicone** | Proxy + observability | Free até 100K req/mês | Logging + analytics com zero code change |
| **AWS Bedrock** | Plataforma managed | Pay-per-token, sem provisioning | Enterprise AWS, compliance, múltiplos models |
| **Vercel AI Gateway** | Gateway + SDK | Incluso no Vercel Pro | Apps Next.js, streaming, edge |

### Plataformas de Inferência (Self-hosted / Serverless)

| Plataforma | Diferencial | Preço Referência (Llama 70B) | Velocidade |
|------------|------------|:---------------------------:|:----------:|
| **Groq** | Custom LPU silicon | ~$0.59/MTok | ~319 tok/s |
| **Cerebras** | Wafer-Scale Engine | ~$0.60/MTok | ~2000 tok/s |
| **Together AI** | GPU cluster, fine-tuning | ~$0.88/MTok | ~150 tok/s |
| **Fireworks AI** | Function-calling otimizado | ~$0.90/MTok | ~150 tok/s |
| **DeepInfra** | Budget serverless | ~$0.50/MTok | ~120 tok/s |
| **Replicate** | Pay-per-second GPU | Variável | Variável |
| **Ollama** | Local, grátis | $0 (só hardware) | Depende GPU |

**Hotmart Context:** O Hotmart AI Gateway v2 usa **AWS Bedrock** como backend. Para projetos pessoais/estudo, **OpenRouter** ou **Groq** (free tier) são ótimas portas de entrada.

---

## 3. 📦 Vector Databases

### O que são?
Armazenam embeddings (vetores numéricos que representam significado semântico) e permitem busca por similaridade — a base do RAG.

| Database | Tipo | Preço | Melhor Para | Latência P95 |
|----------|------|-------|-------------|:------------:|
| **pgvector** | Extensão PostgreSQL | Grátis (+ custo Postgres) | Já usa Postgres, ACID, <1M vetores | ~80ms |
| **Pinecone** | Managed (serverless) | Free: 2GB / Paid: $0.33/1M reads | Zero ops, produção rápida | ~52ms |
| **Qdrant** | Self-hosted ou Cloud | Open-source / Cloud: $0.025/hr | Performance máxima, self-hosted | ~48ms |
| **Weaviate** | Self-hosted ou Cloud | Open-source / Cloud: sob consulta | Hybrid search nativo, GraphQL | ~60ms |
| **Chroma** | Embedded (in-process) | Grátis | Prototipação, dev local, leve | ~30ms |
| **Milvus/Zilliz** | Distributed | Open-source / Cloud: usage-based | Escala massiva (bilhões de vetores) | ~55ms |

**Decisão rápida:**
- Já tem PostgreSQL? → **pgvector** (zero infra nova)
- Quer zero ops + produção? → **Pinecone** serverless
- Precisa de performance + controle? → **Qdrant** self-hosted
- Só prototipar? → **Chroma** (in-memory)

**Holocron usa:** pgvector (ADR 001 — dados do aluno no Postgres)

---

## 4. 🔧 Frameworks para Aplicações de IA (RAG & Apps)

| Framework | Foco Principal | Linguagem | Quando Usar |
|-----------|---------------|-----------|-------------|
| **LangChain** | Orquestração geral de LLM | Python/JS | Ecossistema amplo, 100+ integrações, prototipação rápida |
| **LlamaIndex** | RAG especializado | Python/JS | Indexação de docs, 120+ conectores, melhor recall out-of-box |
| **Haystack** (deepset) | RAG em produção | Python | Latência baixa (340ms), pipelines declarativos |
| **Vercel AI SDK** | Apps fullstack | TypeScript | Next.js, streaming, React Server Components |
| **Mastra** | Framework de agentes TS | TypeScript | Workflows em TS, type-safe, integração com Vercel |
| **DSPy** | Programação de prompts | Python | Otimização automática de prompts, academia |
| **Semantic Kernel** | Enterprise .NET/Java | C#/Java/Python | Microsoft stack, Azure |

**Trade-offs chave:**
- **LangChain vs LlamaIndex**: LangChain = breadth (muitas features), LlamaIndex = depth (melhor RAG)
- **Python vs TypeScript**: Python domina ML/data; TS domina apps web e developer experience
- **Holocron usa:** LangChain/LangGraph (TypeScript) — pela integração com MCP e agentes

---

## 5. 🤖 Frameworks de Agentes

| Framework | Arquitetura | Melhor Para | Status 2026 |
|-----------|-------------|-------------|:-----------:|
| **
\** | State machine (grafos) | Workflows complexos, human-in-the-loop, branching | 🟢 Padrão produção |
| **CrewAI** | Role-based (multi-agente) | Times de agentes com papéis definidos, rápido setup | 🟢 2B+ execuções |
| **OpenAI Agents SDK** | Managed runtime | Ecossistema OpenAI, tools nativos, memória | 🟢 Novo, crescendo |
| **Google ADK** | Multi-linguagem | Google Cloud, Gemini nativo | 🟢 4 linguagens |
| **Claude Agent SDK** | Anthropic-native | Claude, tool-use avançado | 🟡 Novo |
| **AutoGen → AG2** | Conversational | Chat multi-agente, pesquisa, brainstorming | 🟡 Fork community |
| **Microsoft Agent Framework** | Enterprise unified | Azure, Semantic Kernel + AutoGen mergeado | 🟢 Enterprise |

**Decisão rápida:**
- Workflow com estados, loops, human-in-the-loop? → **LangGraph**
- Time de agentes com papéis (pesquisador, escritor, revisor)? → **CrewAI**
- All-in com OpenAI? → **OpenAI Agents SDK**
- Enterprise Microsoft? → **Microsoft Agent Framework**

---

## 6. 👁️ Observabilidade & Avaliação de LLM

| Ferramenta | Tipo | Preço | Melhor Para |
|------------|------|-------|-------------|
| **LangFuse** | Open-source, self-hosted | Grátis (self-host) / Cloud: free tier | GDPR, soberania de dados, framework-agnostic |
| **LangSmith** | Managed (LangChain) | Free: 5K traces / Plus: $39/seat/mês | Stack LangChain/LangGraph, prompt versioning |
| **Arize Phoenix** | Open-source | Grátis | RAG evaluation, hallucination detection |
| **Helicone** | Managed proxy | Free: 100K req/mês | Logging simples, zero config |
| **Braintrust** | Managed | Free tier + usage | Eval programático, A/B de prompts |
| **Latitude** | Agent-native | Paid | Multi-turn tracing, issue discovery |
| **Weights & Biases** | MLOps + LLM | Free personal | Experiments, fine-tuning tracking |

**O que monitorar:**
- **Traces**: Cada chamada LLM, tool-use, chain completa
- **Custo**: Tokens consumidos × preço por provider
- **Latência**: Tempo de resposta end-to-end
- **Qualidade**: Hallucination rate, relevância, faithfulness
- **Erros**: Timeouts, rate limits, respostas vazias

**Hotmart usa:** LangFuse (para IA) + NewRelic (APM geral)

---

## 7. 💻 IDEs & Coding Assistants

| Ferramenta | Base | Preço/mês | Diferencial |
|------------|------|:---------:|-------------|
| **Kiro** (AWS) | Code OSS | Free: 50 cr / Pro: $20 (1000 cr) | Spec-driven dev, Hooks, Steering, MCP nativo |
| **Cursor** | VS Code Fork | Free: limitado / Pro: $20 | Agent mode, codebase inteiro, background agents |
| **GitHub Copilot** | VS Code extension | Free: 50 req / Pro: $10 | Ecossistema GitHub, 20M+ devs, broad IDE support |
| **Windsurf** (Cognition) | VS Code Fork | Pro: $15 | Cascade agent, Devin integration, autonomia |
| **Claude Code** | Terminal | Incluído no Max ($100) | Terminal-first, autonomous agent, multi-file |
| **Cline** | VS Code extension | Pay-your-own-API | Open-source, usa sua própria API key |
| **Aider** | Terminal | Grátis (open-source) | Git-aware, pair programming terminal |

**Decisão rápida:**
- Quer estrutura (specs, hooks, governança)? → **Kiro**
- Quer máxima velocidade de iteração? → **Cursor**
- Quer ecossistema + integração ampla? → **GitHub Copilot**
- Quer autonomia máxima (IDE)? → **Windsurf**
- Quer agente terminal autônomo? → **Claude Code**
- Budget-conscious, traz sua API? → **Cline** ou **Aider**

---

## 8. 📐 Embedding Models

| Modelo | Dimensões | MTEB Score | Preço/MTok | Observação |
|--------|:---------:|:----------:|:----------:|------------|
| **OpenAI text-embedding-3-large** | 1536/3072 | 0.64 | $0.13 | Melhor closed-source geral |
| **OpenAI text-embedding-3-small** | 512/1536 | 0.62 | $0.02 | Custo-benefício excelente |
| **Cohere Embed v4** | 1024 | 0.63 | $0.10 | API rápida (15ms), multilíngue |
| **Voyage 3** | 1024 | 0.63 | $0.06 | Code-aware, retrieval otimizado |
| **Gemini Embedding 2** | 768/3072 | 0.64 | $0.00 (free tier) | Melhor all-rounder 2026 |
| **BGE-M3** (BAAI) | 1024 | 0.61 | Grátis (self-host) | Open-source líder, multilíngue |
| **Jina Embeddings v4** | 1024 | 0.62 | $0.02 | Multimodal, compressão flexível |
| **NV-Embed-v2** (NVIDIA) | 4096 | 0.65 | Self-host | MTEB líder, requer GPU |

**Decisão rápida:**
- Quer qualidade + simplicidade? → **OpenAI text-embedding-3-large**
- Budget mínimo? → **OpenAI text-embedding-3-small** ($0.02/MTok)
- Grátis + bom? → **Gemini Embedding 2** ou **BGE-M3**
- Otimizado para código? → **Voyage 3**

---

## 9. 🔨 Fine-Tuning & Customização

### Métodos

| Método | VRAM Necessária | Custo Relativo | Quando Usar |
|--------|:--------------:|:--------------:|-------------|
| **Prompt Engineering** | 0 | Grátis | Sempre primeiro. 80% dos casos resolve aqui |
| **RAG** | Baixa (embeddings) | Baixo | Conhecimento dinâmico, docs específicos |
| **LoRA** | ~16GB (7B model) | Médio | Estilo/formato específico, domain expertise |
| **QLoRA** | ~6GB (7B model) | Baixo | LoRA em hardware limitado |
| **Full Fine-Tuning** | ~80GB+ (7B model) | Alto | Máxima performance, casos raros |
| **RLHF/DPO** | Alto | Alto | Alinhamento comportamental avançado |

### Plataformas de Fine-Tuning

| Plataforma | Suporta | Preço | Diferencial |
|------------|---------|-------|-------------|
| **OpenAI Fine-Tuning** | GPT-4o, GPT-4.1 mini | ~$25/MTok training | Mais simples, sem infra |
| **Together AI** | Llama, Mistral, Qwen | ~$5-20/MTok | Open-source models, LoRA rápido |
| **Fireworks AI** | Llama, Mistral | Variável | 100 LoRA adapters simultâneos |
| **Unsloth** | Qualquer HuggingFace | Grátis (open-source) | 2x mais rápido, 60% menos VRAM |
| **Axolotl** | Qualquer HuggingFace | Grátis (open-source) | Configurável, multi-GPU |
| **HuggingFace AutoTrain** | Qualquer HF model | $0 (seu hardware) ou Spaces | UI simples, sem código |

**Regra de ouro:** Prompt Engineering → RAG → LoRA → Full FT. Não pule etapas.

---

## 10. 🔌 MCP (Model Context Protocol)

### O que é?
Padrão aberto (criado pela Anthropic, adotado por OpenAI, Google, Microsoft, AWS) que define uma interface universal para conectar modelos de IA a ferramentas e dados externos. Pense como "USB-C para IA".

### Ecossistema em 2026
- **97M+ downloads/mês** dos SDKs
- **2.300+ servidores** públicos
- Suportado nativamente: Claude, Cursor, Windsurf, VS Code, Kiro, 200+ tools
- Doado para Linux Foundation (Agentic AI Foundation)

### Primitivas MCP

| Primitiva | O que faz | Exemplo |
|-----------|-----------|---------|
| **Tools** | Ações que o modelo pode executar | Criar issue no Jira, buscar no DB |
| **Resources** | Dados que o modelo pode ler | Conteúdo de arquivo, schema de tabela |
| **Prompts** | Templates reutilizáveis | Prompt de code review, análise de PR |

### Transporte
- **stdio** — Para processos locais (CLIs, IDEs)
- **Streamable HTTP** — Para servidores remotos (produção)

---

## 11. 🏗️ Infraestrutura de Deploy

| Ferramenta | Função | Quando Usar |
|------------|--------|-------------|
| **vLLM** | Serving engine open-source | Self-host modelos open-source em produção |
| **TGI** (HuggingFace) | Serving engine | HuggingFace ecosystem |
| **Ollama** | Local inference | Dev local, prototipação, privacidade |
| **LM Studio** | GUI para LLMs locais | Experimentação desktop sem código |
| **NVIDIA NIM** | Containers otimizados | Enterprise, GPUs NVIDIA |
| **SkyPilot** | Multi-cloud orchestrator | Melhor preço entre clouds |

---

## 12. 📊 Resumo: Quando Usar O Quê

### Por tipo de demanda:

| Demanda | Stack Recomendada |
|---------|-------------------|
| **Chatbot simples** | OpenAI GPT-4.1 mini + Vercel AI SDK |
| **RAG sobre docs internos** | LlamaIndex + pgvector + OpenAI embeddings |
| **Agente autônomo** | LangGraph + Claude Sonnet 4 + LangFuse |
| **Multi-agentes com papéis** | CrewAI + GPT-5 mini |
| **Código assistido** | Kiro / Cursor + Claude Sonnet 4 |
| **Fine-tuning domain-specific** | Together AI + LoRA + Llama 4 |
| **Alto volume, baixo custo** | Gemini 2.5 Flash + Cloudflare Gateway |
| **Privacidade/local** | Ollama + Llama 4 Scout + Chroma |
| **Enterprise regulated** | AWS Bedrock + Portkey + LangFuse (self-host) |
| **Prototipação rápida** | OpenRouter + LangChain + Chroma |

### Para a Hotmart especificamente:

| Necessidade | Usar |
|-------------|------|
| LLM Gateway | Hotmart AI Gateway v2 (Bedrock) |
| Observabilidade LLM | LangFuse |
| Agentes internos | Agent SDK + Agent Core |
| Vector DB | pgvector (já no stack) |
| RAG | LangChain (TypeScript) |
| Deploy | ArgoCD + Helm + K8s |
| Coding | Kiro (com MCPs configurados) |

---

## 13. 💰 Otimização de Custos — Dicas Práticas

1. **Caching** — Cache semântico (respostas similares) reduz 40-60% do custo
2. **Batch API** — OpenAI/Voyage oferecem 50% desconto em batch (não real-time)
3. **Prompt caching** — Anthropic e OpenAI cacheiam o prefixo (até 90% desconto em input repetido)
4. **Modelo certo pro job** — Classificação não precisa de GPT-5; nano/haiku resolve
5. **Cascading** — Modelo barato primeiro, escala pro caro só se falhar
6. **Output limits** — Setar max_tokens evita respostas verbosas
7. **Embeddings baratos** — text-embedding-3-small ($0.02/MTok) é suficiente para 90% dos RAGs

---

## 14. 🗂️ Glossário Rápido

| Termo | Significado |
|-------|-------------|
| **LLM** | Large Language Model — modelo de linguagem treinado em texto massivo |
| **RAG** | Retrieval-Augmented Generation — busca docs + gera resposta contextualizada |
| **MoE** | Mixture of Experts — arquitetura que ativa só parte dos parâmetros (eficiente) |
| **LoRA** | Low-Rank Adaptation — fine-tuning eficiente que treina poucos parâmetros |
| **Embeddings** | Representação vetorial de texto para busca semântica |
| **MTEB** | Massive Text Embedding Benchmark — benchmark padrão de embeddings |
| **MTok** | Milhão de tokens — unidade de cobrança padrão |
| **MCP** | Model Context Protocol — padrão de integração ferramenta↔modelo |
| **HNSW** | Hierarchical Navigable Small World — algoritmo de busca vetorial |
| **Agentic** | Paradigma onde o modelo age autonomamente (usa tools, decide próximo passo) |
| **Gateway** | Proxy entre app e providers que unifica API, faz retry/cache/logging |
| **Human-in-the-loop** | Padrão onde humano valida/intervém em pontos do workflow |

---

## Fontes

- [LLM API Pricing Comparison 2026](https://fungies.io/llm-api-pricing-comparison-2026-openai-claude-gemini/)
- [OpenAI vs Anthropic vs Google Cost Comparison](https://llm.svc-utility-belt.optimizely.com/blog/openai-vs-anthropic-vs-google-cost-comparison)
- [AI Agent Frameworks Compared 2026](https://sparkco.ai/blog/ai-agent-frameworks-compared-langchain-autogen-crewai-and-openclaw-in-2026)
- [Best Vector Databases 2026](https://www.groovyweb.co/blog/vector-database-comparison-2026)
- [Best Embedding Models for RAG 2026](https://markaicode.com/best/best-embedding-models-for-rag-2026/)
- [LLM Observability Tools 2026](https://dupple.com/learn/best-llm-observability-tools)
- [AI Coding Assistants 2026](https://scrimba.com/articles/best-ai-coding-assistants-2026/)
- [MCP Ecosystem 2026](https://www.requesty.ai/blog/mcp-ecosystem-2026-building-agent-tool-infrastructure-that-scales)
- [Open Source LLMs 2026](https://codersera.com/blog/open-source-llms-landscape-2026/)
- [LLM Gateways & Routers Compared](https://www.requesty.ai/blog/best-llm-routing-platforms-compared-2026-requesty-portkey-litellm-openrouter)

*Content was rephrased for compliance with licensing restrictions.*
