---
titulo: Estado de Exploração do Knowledge Graph
ultima_sessao: '2026-09-07'
total_nodes: 57
explored: 57
in_progress: 0
pending: 0
mapas_criados:
  - mapa-conceitual: '2026-09-07'
  - mapa-aplicacao: '2026-09-07'
---
# Estado de Exploração do Knowledge Graph

## Progresso

| Métrica | Valor |
|---------|-------|
| Ring 0 | 1/1 (100%) |
| Ring 1 explorados | 13/13 (100%) |
| Ring 2 explorados | 15/15 (100%) |
| Stubs pendentes | 13 |
| **Total explorados** | **29/42 (69%)** |

## Sessão Atual (2026-06-28) — Ecossistema AI Completo

Nós criados nesta sessão:

### Ring 1 (Áreas)
| Nó | Area |
|----|------|
| [[llms]] | foundations |
| [[embeddings]] | foundations |
| [[rag]] | patterns |
| [[agentes-ia]] | patterns |
| [[prompt-engineering]] | patterns |
| [[fine-tuning]] | patterns |
| [[mcp]] | patterns |
| [[vector-databases]] | infrastructure |
| [[ai-gateway]] | infrastructure |
| [[inference-platforms]] | infrastructure |
| [[observabilidade-llm]] | infrastructure |
| [[coding-assistants]] | tools-developers |

### Ring 2 (Ferramentas)
| Nó | Area |
|----|------|
| [[openai-gpt]] | tools-providers |
| [[anthropic-claude]] | tools-providers |
| [[google-gemini]] | tools-providers |
| [[meta-llama]] | tools-providers |
| [[deepseek]] | tools-providers |
| [[qwen]] | tools-providers |
| [[mistral]] | tools-providers |
| [[langchain]] | tools-frameworks |
| [[langgraph]] | tools-frameworks |
| [[crewai]] | tools-frameworks |
| [[llamaindex]] | tools-frameworks |
| [[openai-agents-sdk]] | tools-frameworks |
| [[pgvector]] | tools-infrastructure |
| [[openrouter]] | tools-infrastructure |
| [[ollama]] | tools-infrastructure |
| [[langfuse]] | tools-infrastructure |
| [[langsmith]] | tools-infrastructure |
| [[kiro]] | tools-developers |
| [[human-in-the-loop]] | patterns |

## Sessão Atual (2026-09-07) — Mapas Conceitual e de Aplicação

Nós criados nesta sessão:

| Nó | Tipo | Descrição |
|----|------|-----------|
| MAPA-CONCEITUAL.md | Mapa | Fundação teórica — história, tipos, fundamentos, paradigmas |
| MAPA-APLICACAO.md | Mapa | Ferramentas — providers, frameworks, RAG, agents, infra |
| [[deep-learning]] | Conceito | Redes neurais profundas — ponte ML → Transformers |
| [[peft]] | Conceito | Família de técnicas de fine-tuning eficiente |
| [[lora]] | Conceito | Low-Rank Adaptation — técnica principal de PEFT |
| [[qlora]] | Conceito | QLoRA — LoRA + quantização 4-bit |
| [[nlp]] | Conceito | Processamento de Linguagem Natural — história completa |
| [[generative-ai]] | Conceito | IA Generativa — texto, imagem, código, áudio, vídeo |
| visao-geral.md | Conceito | Visão geral de IA Generativa |
| historia.md | Conceito | História completa de IA Generativa |
| geracao-texto.md | Conceito | Geração de texto — LLMs completos |
| geracao-codigo.md | Conceito | Geração de código — assistentes |
| geracao-imagem.md | Conceito | Geração de imagem — Diffusion |
| geracao-audio.md | Conceito | Geração de áudio — TTS, STT, música |
| geracao-video.md | Conceito | Geração de vídeo — Sora, Runway |
| multimodal.md | Conceito | Modelos multimodais |
| tipos-modelos-generativos.md | Conceito | Transformer, Diffusion, GANs, VAEs, MoE |
| benchmarks-generative-ai.md | Conceito | Métricas e leaderboard completo |
| tokenizacao.md | Conceito | Como LLMs leem texto |
| chunking.md | Conceito | Dividindo documentos para RAG |
| reasoning-models.md | Conceito | Modelos de raciocínio |
| supervised-learning.md | Conceito | Aprendizado supervisionado |
| unsupervised-learning.md | Conceito | Aprendizado nao-supervisionado |
| reinforcement-learning.md | Conceito | Aprendizado por reforco |
| computer-vision.md | Conceito | Visao computacional |
| diffusion-models.md | Conceito | Modelos de difusao |

## Últimas Sessões

| Data | Tópico | Status | Nós criados |
|------|--------|--------|:-----------:|
| 2026-06-28 | Ecossistema AI completo | ✅ explored | 26 |
| 2026-06-16 | [[transformers]] | ✅ explored | 1 |
| 2026-06-15 | [[machine-learning]] | ✅ explored | 1 |

## Mapas de Navegação (Criados em 2026-09-07)

| Mapa | Caminho | Propósito |
|------|---------|-----------|
| **Mapa Conceitual** | `MAPA-CONCEITUAL.md` | Fundação teórica — história, tipos, fundamentos, paradigmas |
| **Mapa de Aplicação** | `MAPA-APLICACAO.md` | Ferramentas — providers, frameworks, RAG, agents, infra |

### Estrutura dos Mapas

**Mapa Conceitual** — 6 módulos:
1. História da IA (primórdios → LLMs)
2. Tipos de IA (capacidade, abordagem, paradigma)
3. Fundamentos Matemáticos (estatística, álgebra, cálculo)
4. Fundamentos de IA (ML, DL, NLP, GenAI)
5. Paradigmas (RAG, Agentes, Fine-Tuning, Prompts)
6. Conexões Críticas (stubs, relações ausentes, docs órfãos)

**Mapa de Aplicação** — 7 camadas:
1. Providers de LLM
2. Frameworks de Orquestração
3. Protocolos (MCP)
4. RAG Pipeline
5. Agentes
6. Fine-Tuning
7. Infraestrutura

---

## Próximos Sugeridos (Stubs para Expandir)

### Alta Prioridade (muito referenciados)
1. [[tokenizacao]] — Base de como LLMs processam texto
2. [[chunking]] — Fundamental para qualidade do RAG
3. [[pinecone]] — Principal vector DB managed

### Média Prioridade
4. [[haystack]] — Alternativa RAG em produção
5. [[together-ai]] — Platform de inferência + fine-tuning
6. [[vllm]] — Serving engine self-hosted
7. [[qdrant]] — Vector DB performance

### Para Explorar Futuramente
8. [[multimodal]] — Tendência forte 2026
9. [[reasoning-models]] — O3, DeepSeek R1, etc.
10. [[deep-learning]] — Fundamento
11. [[nlp]] — Domínio base
12. [[generative-ai]] — Categoria geral
13. [[chroma]] — Vector DB para prototipação
