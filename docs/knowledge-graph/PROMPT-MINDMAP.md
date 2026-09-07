---
titulo: "Prompt para Exportação de Mindmap"
data: '2026-09-07'
tipo: meta
---

# Prompt para Exportação de Mindmap Completo

> Use este prompt em qualquer LLM para gerar um mindmap navegável com 5+ níveis de profundidade.

---

## PROMPT PRINCIPAL

```
Você é um especialista em organização de conhecimento de IA. Sua tarefa é criar um MINDMAP COMPLETO e NAVIGÁVEL a partir da estrutura do Knowledge Graph do Holocron.

CONTEXTO:
- O projeto é um holocron de um curso de Pós em Engenharia de IA Aplicada
- Contém 49+ documentos atômicos sobre IA
- Cada doc tem Front Matter YAML com tags, wikilinks e hierarquia

ESTRUTURA DE ENTRADA:
[Listar abaixo a estrutura completa de pastas e arquivos]

REGRAS PARA O MINDMAP:
1. MÍNIMO 5 NÍVEIS de profundidade
2. Cada nó deve ter:
   - Nome do conceito/ferramenta
   - Link para o doc (se existir)
   - Breve descrição (1 linha)
   - Indicador de status (✅ explorado / ⚠️ stub / 📌 para criar)
3. Organizar por:
   - Nível 0: Domínio principal (IA, Ferramentas)
   - Nível 1: Subdomínios (Fundamentos, Paradigmas, Providers)
   - Nível 2: Conceitos (Deep Learning, NLP, RAG)
   - Nível 3: Detalhes (CNN, LSTM, Embeddings)
   - Nível 4: Ferramentas/Frameworks (PyTorch, LangChain)
   - Nível 5: Casos de uso/aplicações
4. Incluir CONEXÕES entre nós (wikilinks)
5. Destacar gaps (docs que faltam)
6. Formato: Markdown com indentação hierárquica

FORMATO DE SAÍDA:
```markdown
# Mindmap — Holocron AI Engineer

## [Nível 0] IA
### [Nível 1] Fundamentos
#### [Nível 2] Conceitos Base
##### [Nível 3] Deep Learning
###### [Nível 4] Arquiteturas
####### [Nível 5] CNN
- **Status:** ✅ Explorado
- **Doc:** `conceitos/fundamentos/deep-learning.md`
- **Conecta com:** Transformers, Machine Learning, Computer Vision
- **Descrição:** Redes neurais com múltiplas camadas para aprendizado de representações hierárquicas
```

APÓS GERAR O MINDMAP:
1. Listar todos os gaps identificados (docs que deveriam existir mas não existem)
2. Sugerir novos documentos atômicos para preencher esses gaps
3. Priorizar por dependência (o que precisa existir primeiro)

 IMPORTANTE: 
- Ser EXAUSTIVO — incluir TODOS os 49+ docs existentes
- Ser PROFUNDO — 5+ níveis mínimos
- Ser NAVIGÁVEL — links e conexões claros
- Ser ÚTIL — identificar o que falta
```

---

## PROMPT COMPLEMENTAR (Para Gerar Novos Docs)

```
Com base no mindmap gerado, crie os seguintes documentos atômicos no formato do Knowledge Graph:

PARA CADA GAP IDENTIFICADO:
1. Verificar se já existe um stub ou doc parcial
2. Criar o doc com Front Matter completo
3. Seguir as regras de atomicidade do AGENTS.MD
4. Inuir:
   - Definição clara
   - Problema que resolve
   - Como funciona (arquitetura/mecanismo)
   - Aplicações reais
   - Comparativo com alternativas
   - Conexões (wikilinks)
   - Tabelas de benchmarks/preços (quando aplicável)

TAMANHO: 200-500 linhas por doc
FORMATO: Markdown com Front Matter YAML
```

---

## ESTRUTURA COMPLETA DO CONHECIMENTO (Entrada para o Prompt)

```
HOLOCRONE AI ENGINEER
│
├── CONCEITOS
│   │
│   ├── FUNDAMENTOS (6 docs)
│   │   ├── ia.md ✅ — Inteligência Artificial (mapa central)
│   │   ├── machine-learning.md ✅ — Aprendizado de máquina
│   │   ├── deep-learning.md ✅ — Redes neurais profundas
│   │   ├── nlp.md ✅ — Processamento de Linguagem Natural
│   │   ├── transformers.md ✅ — Arquitetura base dos LLMs
│   │   └── generative-ai.md ✅ — IA Generativa (legado → novos docs)
│   │
│   ├── GENERATIVE-AI (9 docs — estrutura atômica)
│   │   ├── visao-geral.md ✅ — O que é IA Generativa
│   │   ├── historia.md ✅ — Linha do tempo completa
│   │   ├── tipos-modelos-generativos.md ✅ — Transformer, Diffusion, GANs, VAEs, MoE
│   │   │
│   │   ├── APLICACÕES (6 docs)
│   │   │   ├── geracao-texto.md ✅ — LLMs completos com GPT-6 Astra
│   │   │   ├── geracao-codigo.md ✅ — Copilot, Kiro, Claude Code
│   │   │   ├── geracao-imagem.md ✅ — Diffusion, DALL-E, Midjourney
│   │   │   ├── geracao-audio.md ✅ — TTS, STT, música
│   │   │   ├── geracao-video.md ✅ — Sora, Runway, Kling
│   │   │   └── multimodal.md ✅ — Modelos que processam tudo
│   │   │
│   │   └── BENCHMARKS (1 doc)
│   │       └── benchmarks-generative-ai.md ✅ — Métricas e leaderboard
│   │
│   ├── LLMS (2 docs)
│   │   ├── llms.md ✅ — Taxonomia de modelos
│   │   └── embeddings.md ✅ — Representações vetoriais
│   │
│   ├── PARADIGMAS (7 docs)
│   │   ├── rag.md ✅ — Retrieval-Augmented Generation
│   │   ├── agentes-ia.md ✅ — O paradigma agentic
│   │   ├── prompt-engineering.md ✅ — A arte de instruir LLMs
│   │   ├── fine-tuning.md ✅ — Customização de modelos
│   │   ├── peft.md ✅ — Família de fine-tuning eficiente
│   │   ├── lora.md ✅ — Low-Rank Adaptation
│   │   └── qlora.md ✅ — LoRA + quantização
│   │
│   └── PADRÕES (6 docs)
│       ├── mcp-overview.md ✅ — Visão geral MCP
│       ├── mcp-architecture.md ✅ — Arquitetura MCP
│       ├── mcp-transports.md ✅ — Transportes MCP
│       ├── mcp-building.md ✅ — Como construir MCP servers
│       ├── mcp-servers-discovery.md ✅ — Descoberta de servers
│       └── human-in-the-loop.md ✅ — Supervisão humana
│
├── FERRAMENTAS
│   │
│   ├── PROVIDERS-LLM (7 docs)
│   │   ├── openai-gpt.md ✅ — GPT-6 Astra completo
│   │   ├── anthropic-claude.md ✅ — Claude Fable 5.1 completo
│   │   ├── google-gemini.md ✅ — Gemini 3.x completo
│   │   ├── meta-llama.md ✅ — Llama 4
│   │   ├── deepseek.md ✅ — DeepSeek V4
│   │   ├── qwen.md ✅ — Qwen 3
│   │   └── mistral.md ✅ — Mistral Large
│   │
│   ├── FRAMEWORKS (5 docs)
│   │   ├── langchain.md ✅ — Orquestração geral
│   │   ├── langgraph.md ✅ — Agentes stateful
│   │   ├── crewai.md ✅ — Multi-agentes
│   │   ├── llamaindex.md ✅ — RAG especializado
│   │   └── openai-agents-sdk.md ✅ — Agentes OpenAI
│   │
│   ├── CODIFICACAO (2 docs)
│   │   ├── coding-assistants.md ✅ — Visão geral
│   │   └── kiro.md ✅ — IDE AI-native
│   │
│   ├── INFRAESTRUTURA (6 docs)
│   │   ├── ai-gateway.md ✅ — Proxies e routers
│   │   ├── inference-platforms.md ✅ — Onde rodar LLMs
│   │   ├── openrouter.md ✅ — Multi-provider router
│   │   ├── ollama.md ✅ — LLMs locais
│   │   ├── vector-databases.md ✅ — Bancos vetoriais
│   │   └── pgvector.md ✅ — Extensão PostgreSQL
│   │
│   ├── OBSERVABILIDADE (3 docs)
│   │   ├── observabilidade-llm.md ✅ — Visão geral
│   │   ├── langfuse.md ✅ — Open-source
│   │   └── langsmith.md ✅ — Managed
│   │
│   └── MCP-SERVERS (14 docs)
│       ├── filesystem: mcp-filesystem, mcp-memory
│       ├── databases: mcp-postgres, mcp-sqlite, mcp-supabase
│       ├── search-web: mcp-brave-search, mcp-exa, mcp-firecrawl
│       ├── code-dev: mcp-github, mcp-context7, mcp-sentry
│       ├── browser: mcp-playwright
│       ├── productivity: mcp-notion, mcp-slack
│       └── cloud: mcp-kubernetes
│
└── META
    ├── AGENTS.md ✅ — Regras de atomicidade
    ├── _index.md ✅ — Índice do KG
    ├── _estado-exploracao.md ✅ — Progresso
    ├── MAPA-CONCEITUAL.md ✅ — Mapa teórico
    └── MAPA-APLICACAO.md ✅ — Mapa de ferramentas
```

---

## GAPS IDENTIFICADOS (Docs que Faltam)

### Críticos (referenciados mas não existem)

| Doc | Categoria | Prioridade | Referenciado por |
|-----|-----------|:----------:|------------------|
| `tokenizacao.md` | conceitos/llms/ | ALTA | llms, embeddings |
| `chunking.md` | conceitos/paradigmas/ | ALTA | rag |
| `reasoning-models.md` | conceitos/llms/ | ALTA | deepseek, openai |
| `supervised-learning.md` | conceitos/fundamentos/ | MÉDIA | ia, machine-learning |
| `unsupervised-learning.md` | conceitos/fundamentos/ | MÉDIA | ia, machine-learning |
| `reinforcement-learning.md` | conceitos/fundamentos/ | MÉDIA | ia, machine-learning |
| `computer-vision.md` | conceitos/fundamentos/ | MÉDIA | ia, generative-ai |
| `diffusion-models.md` | conceitos/generative-ai/ | MÉDIA | generative-ai, geracao-imagem |
| `mlops.md` | conceitos/fundamentos/ | BAIXA | ia, machine-learning |
| `ai-safety-alignment.md` | conceitos/padroes/ | BAIXA | ia |

### Ferramentas (stubs referenciados)

| Doc | Categoria | Prioridade | Referenciado por |
|-----|-----------|:----------:|------------------|
| `pinecone.md` | ferramentas/vector-databases/ | ALTA | vector-databases |
| `qdrant.md` | ferramentas/vector-databases/ | ALTA | vector-databases |
| `chroma.md` | ferramentas/vector-databases/ | MÉDIA | vector-databases |
| `together-ai.md` | ferramentas/inference/ | MÉDIA | inference-platforms |
| `vllm.md` | ferramentas/inference/ | MÉDIA | inference-platforms |
| `groq.md` | ferramentas/providers/ | MÉDIA | inference-platforms |

---

## AÇÕES RECOMENDADAS

### Fase 1: Completar Fundação (Prioridade ALTA)
1. Criar `tokenizacao.md`
2. Criar `chunking.md`
3. Criar `reasoning-models.md`

### Fase 2: Expandir Conceitos (Prioridade MÉDIA)
4. Criar `supervised-learning.md`
5. Criar `unsupervised-learning.md`
6. Criar `reinforcement-learning.md`
7. Criar `computer-vision.md`
8. Criar `diffusion-models.md`

### Fase 3: Completar Ferramentas (Prioridade MÉDIA)
9. Criar `pinecone.md`
10. Criar `qdrant.md`
11. Criar `together-ai.md`
12. Criar `vllm.md`

### Fase 4: Engenharia (Prioridade BAIXA)
13. Criar `mlops.md`
14. Criar `ai-safety-alignment.md`
15. Criar `groq.md`

---

**Status:** Prompt pronto para uso
**Última atualização:** 2026-09-07
