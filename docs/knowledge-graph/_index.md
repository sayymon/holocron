---
titulo: Índice do Knowledge Graph
data: '2026-06-28'
---
# 📋 Índice do Knowledge Graph

## Estrutura de Pastas

```
knowledge-graph/
├── _index.md                       ← Você está aqui
├── _estado-exploracao.md           ← Progresso geral
│
├── conceitos/                      🧠 O QUE É (teoria, conceitos, paradigmas)
│   ├── fundamentos/                Bases de IA e Machine Learning
│   │   ├── ia.md
│   │   ├── machine-learning.md
│   │   ├── supervised-learning.md
│   │   ├── unsupervised-learning.md
│   │   ├── reinforcement-learning.md
│   │   ├── deep-learning.md
│   │   ├── nlp.md
│   │   ├── transformers.md
│   │   ├── computer-vision.md
│   │   └── generative-ai.md
│   ├── generative-ai/              IA Generativa (estrutura atômica)
│   │   ├── visao-geral.md
│   │   ├── historia.md
│   │   ├── tipos-modelos-generativos.md
│   │   ├── diffusion-models.md
│   │   ├── aplicacoes/             Docs atômicos por modalidade
│   │   │   ├── geracao-texto.md
│   │   │   ├── geracao-codigo.md
│   │   │   ├── geracao-imagem.md
│   │   │   ├── geracao-audio.md
│   │   │   ├── geracao-video.md
│   │   │   └── multimodal.md
│   │   └── benchmarks/
│   │       └── benchmarks-generative-ai.md
│   ├── llms/                       Large Language Models e representações
│   │   ├── llms.md
│   │   ├── embeddings.md
│   │   ├── tokenizacao.md
│   │   └── reasoning-models.md
│   ├── paradigmas/                 Como construir com IA
│   │   ├── rag.md
│   │   ├── chunking.md
│   │   ├── agentes-ia.md
│   │   ├── prompt-engineering.md
│   │   ├── fine-tuning.md
│   │   ├── peft.md
│   │   ├── lora.md
│   │   └── qlora.md
│   └── padroes/                    Protocolos e patterns
│       ├── mcp.md
│       └── human-in-the-loop.md
│
└── ferramentas/                    🔧 COM O QUE (tools, providers, plataformas)
    ├── providers-llm/              Provedores de modelos
    │   ├── openai-gpt.md
    │   ├── anthropic-claude.md
    │   ├── google-gemini.md
    │   ├── meta-llama.md
    │   ├── deepseek.md
    │   ├── qwen.md
    │   └── mistral.md
    ├── frameworks/                 Frameworks de orquestração e agentes
    │   ├── langchain.md
    │   ├── langgraph.md
    │   ├── crewai.md
    │   ├── llamaindex.md
    │   └── openai-agents-sdk.md
    ├── codificacao/                IDEs e assistentes de código
    │   ├── coding-assistants.md
    │   └── kiro.md
    ├── infraestrutura/             Infra para rodar IA
    │   ├── gateways-inference/     Gateways, routers, inference
    │   │   ├── ai-gateway.md
    │   │   ├── inference-platforms.md
    │   │   ├── openrouter.md
    │   │   └── ollama.md
    │   └── vector-databases/       Bancos vetoriais
    │       ├── vector-databases.md
    │       └── pgvector.md
    └── observabilidade/            Monitoramento de LLM
        ├── observabilidade-llm.md
        ├── langfuse.md
        └── langsmith.md
```

---

## 🧠 Conceitos

### Fundamentos
| Nó | Descrição |
|----|-----------|
| [[ia]] | Inteligência Artificial — o campo |
| [[machine-learning]] | Aprendizado de máquina |
| [[supervised-learning]] | Aprendizado supervisionado (com rotulos) |
| [[unsupervised-learning]] | Aprendizado não-supervisionado (sem rotulos) |
| [[reinforcement-learning]] | Aprendizado por reforco (com recompensa) |
| [[deep-learning]] | Redes neurais profundas |
| [[transformers]] | Arquitetura base dos LLMs |
| [[nlp]] | Processamento de Linguagem Natural |
| [[computer-vision]] | Visao computacional |
| [[generative-ai]] | IA Generativa — texto, imagem, codigo, audio, video |

### Generative AI — Aplicações
| Nó | Descrição |
|----|-----------|
| [[geracao-texto]] | Geração de texto — LLMs |
| [[geracao-codigo]] | Geração de código — assistentes |
| [[geracao-imagem]] | Geração de imagem — Diffusion |
| [[geracao-audio]] | Geração de áudio — TTS, STT, música |
| [[geracao-video]] | Geração de vídeo — Sora, Runway |
| [[multimodal]] | Modelos multimodais |

### Generative AI — Conceitos
| Nó | Descrição |
|----|-----------|
| [[tipos-modelos-generativos]] | Transformer, Diffusion, GANs, VAEs, MoE |
| [[diffusion-models]] | Modelos de difusao para geracao |
| [[benchmarks-generative-ai]] | Metricas e leaderboard |

### Generative AI — Modelos Flagship
| Nó | Descrição |
|----|-----------|
| [[gpt-6-astra]] | OpenAI — O modelo mais capaz do mundo |
| [[claude-fable-5]] | Anthropic — Lider em coding (SWE-Bench #1) |
| [[gemini-3-flash]] | Google — Melhor custo-beneficio, 1M contexto |
| [[llama-4]] | Meta — Open-weights, Scout 10M contexto |
| [[deepseek-v4]] | DeepSeek — #1 open-source coding |
| [[qwen-3.5]] | Alibaba — Apache 2.0, 200+ idiomas |
| [[mistral-large-3]] | Mistral — Frontier europeu, GDPR |

### LLMs & Representações
| Nó | Descrição |
|----|-----------|
| [[llms]] | Large Language Models — taxonomia completa |
| [[embeddings]] | Representação vetorial de significado |
| [[tokenizacao]] | Como LLMs leem texto — BPE, WordPiece, SentencePiece |
| [[reasoning-models]] | Modelos de raciocínio — o-series, Extended Thinking |

### Paradigmas de Construção
| Nó | Descrição |
|----|-----------|
| [[rag]] | Retrieval-Augmented Generation |
| [[chunking]] | Dividindo documentos para RAG |
| [[agentes-ia]] | O paradigma agentic |
| [[prompt-engineering]] | A arte de instruir LLMs |
| [[fine-tuning]] | Customização de modelos |

### Padrões & Protocolos
| Nó | Descrição |
|----|-----------|
| [[mcp]] | Model Context Protocol — "USB-C para IA" |
| [[human-in-the-loop]] | Supervisão humana em agentes |

---

## 🔧 Ferramentas

### Providers de LLM
| Nó | Tipo | Preço entrada |
|----|------|:-------------:|
| [[openai-gpt]] | Proprietário | $0.05-$50/MTok |
| [[anthropic-claude]] | Proprietário | $0.80-$15/MTok |
| [[google-gemini]] | Proprietário | $0.10-$10/MTok |
| [[meta-llama]] | Open-weights | $0.24/MTok (Bedrock) |
| [[deepseek]] | Open-weights (MIT) | $0.07-$0.55/MTok |
| [[qwen]] | Open-source (Apache 2.0) | $0.03-$0.60/MTok |
| [[mistral]] | Open/Proprietário | $0.15-$7.50/MTok |

### Frameworks
| Nó | Foco |
|----|------|
| [[langchain]] | Orquestração geral de LLM |
| [[langgraph]] | Agentes stateful (grafos) |
| [[crewai]] | Multi-agentes com papéis |
| [[llamaindex]] | RAG especializado |
| [[openai-agents-sdk]] | Agentes managed OpenAI |

### Codificação
| Nó | Preço |
|----|:-----:|
| [[coding-assistants]] | Overview da categoria |
| [[kiro]] | Free / $20/mês |

### Infraestrutura
| Nó | Subcategoria |
|----|-------------|
| [[ai-gateway]] | Proxies e routers |
| [[inference-platforms]] | Onde rodar LLMs |
| [[openrouter]] | Multi-provider router |
| [[ollama]] | LLMs locais |
| [[vector-databases]] | Overview bancos vetoriais |
| [[pgvector]] | Extensão PostgreSQL |

### Observabilidade
| Nó | Tipo |
|----|------|
| [[observabilidade-llm]] | Overview da categoria |
| [[langfuse]] | Open-source, self-hosted |
| [[langsmith]] | Managed (LangChain) |

---

## 🗺️ Mapa Visual de Conexões

```
                              [[ia]]
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
      [[machine-learning]]  [[transformers]]   [[agentes-ia]]
              │                 │                 │
              ▼                 ▼                 ├─→ [[langgraph]]
         [[llms]] ◄────────────┘                 ├─→ [[crewai]]
              │                                   ├─→ [[openai-agents-sdk]]
    ┌─────────┼─────────────┐                    └─→ [[human-in-the-loop]]
    ▼         ▼             ▼
[[openai]] [[claude]]  [[gemini]]
[[llama]]  [[deepseek]] [[qwen]] [[mistral]]
    │
    ├─→ [[prompt-engineering]]
    ├─→ [[rag]] ──→ [[embeddings]] ──→ [[vector-databases]]
    │                                        │
    │                                        └─→ [[pgvector]]
    ├─→ [[fine-tuning]]
    ├─→ [[mcp]]
    │
    ├─→ [[ai-gateway]] ──→ [[openrouter]]
    ├─→ [[inference-platforms]] ──→ [[ollama]]
    ├─→ [[observabilidade-llm]] ──→ [[langfuse]] / [[langsmith]]
    │
    └─→ [[coding-assistants]] ──→ [[kiro]]
              │
              └─→ [[langchain]] / [[llamaindex]]
```

---

## Stubs (para expandir futuramente)

| Nó | Onde colocar | Referenciado por |
|----|-------------|-----------------|
| [[tokenizacao]] | conceitos/llms/ | llms, embeddings |
| [[chunking]] | conceitos/paradigmas/ | rag |
| [[pinecone]] | ferramentas/infraestrutura/vector-databases/ | vector-databases |
| [[qdrant]] | ferramentas/infraestrutura/vector-databases/ | vector-databases |
| [[chroma]] | ferramentas/infraestrutura/vector-databases/ | vector-databases |
| [[haystack]] | ferramentas/frameworks/ | rag, langchain |
| [[together-ai]] | ferramentas/infraestrutura/gateways-inference/ | inference-platforms |
| [[vllm]] | ferramentas/infraestrutura/gateways-inference/ | inference-platforms |
| [[multimodal]] | conceitos/llms/ | google-gemini |
| [[reasoning-models]] | conceitos/llms/ | deepseek |
| [[deep-learning]] | conceitos/fundamentos/ | transformers |
| [[nlp]] | conceitos/fundamentos/ | transformers |
| [[generative-ai]] | conceitos/fundamentos/ | transformers |

---

**Totais:** 29 nós explorados | 13 stubs pendentes | Progresso: 69%
