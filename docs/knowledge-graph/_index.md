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
│   │   └── transformers.md
│   ├── llms/                       Large Language Models e representações
│   │   ├── llms.md
│   │   └── embeddings.md
│   ├── paradigmas/                 Como construir com IA
│   │   ├── rag.md
│   │   ├── agentes-ia.md
│   │   ├── prompt-engineering.md
│   │   └── fine-tuning.md
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
| [[transformers]] | Arquitetura base dos LLMs |

### LLMs & Representações
| Nó | Descrição |
|----|-----------|
| [[llms]] | Large Language Models — taxonomia completa |
| [[embeddings]] | Representação vetorial de significado |

### Paradigmas de Construção
| Nó | Descrição |
|----|-----------|
| [[rag]] | Retrieval-Augmented Generation |
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
| [[openai-gpt]] | Proprietário | $0.05-$21/MTok |
| [[anthropic-claude]] | Proprietário | $0.80-$15/MTok |
| [[google-gemini]] | Proprietário | $0.10-$1.25/MTok |
| [[meta-llama]] | Open-weights | Grátis (self-host) |
| [[deepseek]] | Open-weights | $0.27/MTok (API) |
| [[qwen]] | Open-source (Apache 2.0) | Grátis |
| [[mistral]] | Open/Proprietário | Grátis-$2/MTok |

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
