---
titulo: "Mapa Conceitual — Fundação Teórica de IA"
data: '2026-09-07'
tipo: mapa-conceitual
status: vivo
---

# 🧠 Mapa Conceitual — Fundação Teórica

> **Propósito:** Entender o *porquê* por trás de cada conceito. De onde vem, como se conecta, por que existe.
> **Regra:** Cada nó é链接ado a outros. Nada existe isolado.

---

## VISÃO GERAL — A Árvore do Conhecimento

```
RAIZ: O que é Inteligência?
  │
  ├─→ ESTATÍSTICA & MATEMÁTICA (a língua)
  │     ├── Probabilidade
  │     ├── Álgebra Linear
  │     └── Cálculo
  │
  ├─→ HISTÓRIA DA IA (a jornada)
  │     ├── Primórdios (1940-50)
  │     ├── Birth of AI (1956)
  │     ├── Algoritmos Genéticos (1960-70)
  │     ├── AI Winters (1970-90)
  │     ├── Machine Learning Clássico (1990-2010)
  │     ├── Deep Learning Revolution (2012)
  │     ├── Transformers (2017)
  │     └── LLM Era (2022-hoje)
  │
  ├─→ TIPOS DE IA (a taxonomia)
  │     ├── Por Capacidade: Estreita → Geral → Super
  │     ├── Por Abordagem: Simbólica → Conectacionista → Híbrida
  │     └── Por Treinamento: Supervised → Unsupervised → RL → Self-supervised
  │
  ├─→ FUNDAMENTOS (os pilares)
  │     ├── Machine Learning
  │     ├── Deep Learning
  │     ├── NLP
  │     └── Computer Vision
  │
  ├─→ PARADIGMAS (como construímos)
  │     ├── RAG
  │     ├── Agentes
  │     ├── Fine-Tuning
  │     └── Prompt Engineering
  │
  └─→ ENGENHARIA (como colocamos em produção)
        ├── Arquitetura de Sistemas
        ├── Observabilidade
        └── Segurança & Governança
```

---

## MÓDULO 1 — HISTÓRIA DA IA

### 1.1 Primórdios (1940-1950) — A Ideia da Máquina Pensante

| Ano | Marco | Quem | Insight Chave |
|:---:|-------|------|---------------|
| 1936 | Máquina de Turing | Alan Turing | Qualquer problema computável pode ser resolvido por uma máquina |
| 1943 | Neurônio Formal | McCulloch & Pitts | Primeiro modelo matemático de um neurônio |
| 1949 | Aprendizado Hebbiano | Donald Hebb | "Neurônios que disparam juntos, conectam-se juntos" |

**Conexão:** McCulloch & Pitts → fundação → [[deep-learning]] → [[transformers]]

### 1.2 Nascimento da IA (1950-1960) — O Sonho

| Ano | Marco | Quem | Insight Chave |
|:---:|-------|------|---------------|
| 1950 | Teste de Turing | Alan Turing | "Máquinas podem pensar?" — propõe teste indireto |
| 1956 | Conferência de Dartmouth | John McCarthy | Cunha o termo "Inteligência Artificial" — regras + operadores lógicos = modelar realidade |
| 1957 | Perceptron | Frank Rosenblatt | Primeira rede neural que aprende (classificação linear) |
| 1958 | Lisp | John McCarthy | Linguagem para IA — manipulação de símbolos |

**Dois caminhos nascem:**
- **Simbólico** (McCarthy): Regras, lógica, manipulação de símbolos → IA Clássica
- **Conectacionista** (Rosenblatt): Redes neurais, aprendizado → futura [[deep-learning]]

### 1.3 Algoritmos Genéticos (1960-1975) — A Evolução Artificial

| Ano | Marco | Quem | Insight Chave |
|:---:|-------|------|---------------|
| 1962 | Autômatos Celulares | John Von Neumann | Sistemas auto-replicantes |
| 1975 | Algoritmos Genéticos | John Holland | Evolução darwiniana aplicada a otimização |

**O insight de Holland:** Em vez de regras fixas, usar seleção natural:
1. População de soluções
2. Avaliação (fitness)
3. Seleção (os melhores sobrevivem)
4. Crossover (combinação)
5. Mutação (variação)

**Conexão:** Holland foge da lógica de McCarthy → [[algoritmos-geneticos-computacao-evolutiva]] → precursor de [[reinforcement-learning]]

### 1.4 AI Winters (1970-1995) — A Desilusão

| Período | Causa | Consequência |
|---------|-------|--------------|
| 1974-1980 | Promessas não cumpridas, compute insuficiente | Cortes de financiamento |
| 1987-1993 | Expert systems caros demais, PC surgindo | Mercado colapsa |

**Por que aconteceu:**
- Dados insuficientes
- Compute limitada
- Conceitos avançados demais para a tecnologia da época
- IA especialista = caro e frágil

**Lição:** Tecnologia pronta ≠ Tecnologia viável. Falta de dados + compute = morte.

### 1.5 Machine Learning Clássico (1990-2012)

| Ano | Marco | Insight Chave |
|:---:|-------|---------------|
| 1995 | SVMs | Margens máximas para classificação |
| 1998 | LeNet-5 (Yann LeCun) | Primeira CNN funcional para dígitos |
| 2001 | Random Forest | Ensemble de árvores robusto |
| 2006 | Deep Belief Networks | Hinton mostra que deep learning funciona |

**Conexão:** ML Clássico → [[machine-learning]] → [[supervised-learning]], [[unsupervised-learning]]

### 1.6 Deep Learning Revolution (2012)

| Ano | Marco | Insight Chave |
|:---:|-------|---------------|
| 2012 | AlexNet vence ImageNet | GPUs + big data + deep learning = revolução |
| 2014 | GANs | Generative Adversarial Networks — IA criativa |
| 2014 | Attention Mechanism | Bahdanau — atenção para tradução |

**Conexão:** AlexNet → prova que [[deep-learning]] funciona → investimento massivo → [[transformers]]

### 1.7 Transformers (2017) — O Ponto de Inflexão

| Ano | Marco | Insight Chave |
|:---:|-------|---------------|
| 2017 | "Attention is All You Need" | Google — Self-Attention paralelo substitui RNNs |
| 2018 | BERT | Encoder-only — entender texto |
| 2019 | GPT-2 | Decoder-only — gerar texto |
| 2020 | GPT-3 | 175B parâmetros — few-shot learning |
| 2022 | ChatGPT | RLHF — IA generativa mainstream |

**O mecanismo Self-Attention:**
- Cada token olha para TODOS os outros simultaneamente
- Paralelizável em GPU
- Captura dependências de longa distância
- O(n²) mas paralelo vs O(n) sequencial de RNNs

**Conexão:** Transformers → [[transformers]] → [[llms]] → [[generative-ai]] → tudo que temos hoje

### 1.8 Era dos LLMs (2022-hoje)

| Ano | Marco | Insight Chave |
|:---:|-------|---------------|
| 2022 | ChatGPT | RLHF democratiza IA |
| 2023 | Claude, GPT-4, Llama | Batalha de modelos |
| 2024 | MCP, Agentes | Protocolos e autonomia |
| 2025 | Reasoning Models | o3, R1 — raciocínio profundo |
| 2026 | AI-Native Everything | IA como infraestrutura |

**Conexão:** LLMs → [[prompt-engineering]] → [[rag]] → [[agentes-ia]] → [[mcp]]

---

## MÓDULO 2 — TIPOS DE IA

### 2.1 Por Capacidade

```
IA Estreita (Narrow AI)
  │  Hoje — especialista em UMA tarefa
  │  Ex: ChatGPT, AlphaFold, Midjourney
  │
  ├─→ IA Geral (AGI)
  │     Futuro — generalista como humano
  │
  └─→ Superinteligência
        Hipótese — supera todos humanos
```

### 2.2 Por Abordagem

```
Simbólica (Good Old-Fashioned AI)
  │  Regras, lógica, ontologias
  │  Ex: Expert systems, OWL, SPARQL
  │
  Conectacionista (Neural)
  │  Redes neurais, aprendizado de dados
  │  Ex: CNNs, RNNs, Transformers
  │
  Híbrida (Neuro-Symbolic)
     Combina ambos — promessa para AGI
     Ex: Knowledge Graphs + LLMs
```

### 2.3 Por Paradigma de Aprendizado

| Paradigmo | Dados | Como Aprende | Exemplo |
|-----------|-------|--------------|---------|
| **Supervised** | Rotulados (X, y) | Mapeia entrada→saída | Classificação de email |
| **Unsupervised** | Sem rótulos | Encontra padrões | Clustering de clientes |
| **Reinforcement** | Recompensas | Tentativa e erro | Jogo de xadrez |
| **Self-supervised** | Próprios dados | Cria supervisão internamente | GPT, BERT (pretext task) |
| **Transfer Learning** | Pré-treinado + fine-tune | Reaproveita conhecimento | BERT para sentimento |

**Conexão:**
- Supervised → [[supervised-learning]] → evaluate models
- Unsupervised → [[unsupervised-learning]] → [[embeddings]]
- Reinforcement → [[reinforcement-learning]] → RLHF → [[fine-tuning]]
- Self-supervised → [[self-supervised-learning]] → [[transformers]] → [[llms]]

---

## MÓDULO 3 — FUNDAMENTOS MATEMÁTICOS

### 3.1 Estatística & Probabilidade
- Distribuições, média, variância, desvio padrão
- Teorema de Bayes → Inferência probabilística
- Aprendizado estatístico → [[machine-learning]]

### 3.2 Álgebra Linear
- Vetores, matrizes, transformações
- Decomposição (SVD, eigendecomposition)
- Embeddings = vetores em alta dimensão → [[embeddings]]

### 3.3 Cálculo
- Derivadas, gradiente descendente
- Otimização → como modelos aprendem
- Backpropagation → [[deep-learning]]

---

## MÓDULO 4 — FUNDAMENTOS DE IA

### 4.1 Machine Learning
- Definição: Sistemas que aprendem com dados
- Pipeline: Dados → Features → Modelo → Avaliação → Deploy
- [[machine-learning]] — nó existente

### 4.2 Deep Learning
- Redes neurais com múltiplas camadas
- CNNs → Imagens
- RNNs → Sequências (obsoletas)
- Transformers → Tudo (atual)
- [[deep-learning]] — **STUB CRÍTICO**

### 4.3 NLP (Processamento de Linguagem Natural)
- Tokenização → Parsing → Semântica → Geração
- De regras (stemming) a neurais (BERT, GPT)
- [[nlp]] — **STUB CRÍTICO**

### 4.4 Generative AI
- IA que cria: texto, imagem, código, áudio, vídeo
- Subconjunto de IA baseado em modelos generativos
- [[generative-ai]] — **STUB CRÍTICO**

---

## MÓDULO 5 — PARADIGMAS DE CONSTRUÇÃO

### 5.1 RAG (Retrieval-Augmented Generation)

```
Query → Embedding → Vector Search → Top-K Docs → Prompt + Context → LLM → Response
         │              │                              │
    [[embeddings]]  [[vector-databases]]         [[prompt-engineering]]
```

**O problema que resolve:** LLMs alucinam e têm knowledge cutoff.
**A solução:** Ancorar respostas em documentos reais (Grounding).

**Variações:**
- Naive RAG → para MVP
- Advanced RAG → reranking, hybrid search
- Modular RAG → routing inteligente
- Agentic RAG → agente decide quando buscar

**Conexões:** [[rag]] → [[embeddings]] → [[vector-databases]] → [[chunking]] (stub)

### 5.2 Agentes de IA

```
Objetivo → [Perceber → Raciocinar → Agir]^n → Resultado
              │           │            │
         [[llms]]   [[prompt-engineering]]  [[tool-use-function-calling]]
```

**Padrões:**
- ReAct: Reason → Act → Observe (simples)
- Plan-and-Execute: Planeja primeiro, depois executa (complexo)
- Reflection: Gera → Avalia → Refina (qualidade)
- Multi-Agent: Agentes especializados colaboram

**Componentes:** LLM (cérebro) + Tools (mãos) + Memory (memória) + Planning (planejador)

**Conexões:** [[agentes-ia]] → [[langgraph]] / [[crewai]] / [[mcp]] / [[human-in-the-loop]]

### 5.3 Fine-Tuning

```
Modelo Pré-treinado + Dados Específicos → Modelo Customizado
```

**Técnicas:**
- Full Fine-Tuning: Refine todos os parâmetros
- LoRA/PEFT: Adapta apenas camadas específicas (eficiente)
- RLHF: Alinhamento via reinforcement learning

**Quando usar:** Quando prompting não resolve + tem dados + tem budget.

**Conexões:** [[fine-tuning]] → [[lora-peft]] (stub) → [[rlhf]] (stub) → [[transformers]]

### 5.4 Prompt Engineering

```
IDENTITY → CONTEXT → RULES → FORMAT → EXAMPLES
```

**Técnicas:**
- Few-Shot: Exemplos no prompt
- Chain-of-Thought: Raciocínio passo a passo
- Prompt Chaining: Sequência de prompts
- Structured Output: JSON mode

**Conexões:** [[prompt-engineering]] → [[llms]] → [[agentes-ia]] → [[mcp]]

---

## MÓDULO 6 — CONEXÕES CRÍTICAS (O que falta linking)

### 6.1 Stubs Críticos (sem doc)

| Stub | O que é | Por que importa | Referenciado por |
|------|---------|-----------------|------------------|
| **deep-learning** | Redes neurais profundas | Ponte entre ML e Transformers | ia, machine-learning, transformers |
| **nlp** | Processamento de linguagem | Domínio principal dos LLMs | ia, transformers |
| **generative-ai** | IA generativa | Categoria que engloba tudo | ia, transformers |
| **tokenizacao** | Divisão em tokens | Define custo e janela de contexto | llms, embeddings |
| **chunking** | Divisão de documentos | Qualidade do RAG | rag |
| **reasoning-models** | Modelos de raciocínio | Fronteira 2025-2026 | deepseek |
| **multimodal** | Modelos multi-modalidade | Capabilidade frontier | google-gemini |

### 6.2 Relações Ausentes

| De | Para | Tipo |
|----|------|------|
| rag | fine-tuning | Quando fine-tuning > RAG |
| agentes-ia | observabilidade | Agentes precisam de monitoring |
| embeddings | rag | Bidirecional (só 1-way existe) |
| langchain | mcp | LangChain consome MCP tools |
| fine-tuning | qwen/mistral | Estes são populares para FT |

### 6.3 Docs Órfãos (existem fora do KG)

| Doc | Caminho | O que falta |
|-----|---------|-------------|
| algoritmos-geneticos | /docs/conceitos/ | Link com [[reinforcement-learning]] |
| tokenizacao | /docs/conceitos/ | Integrar ao KG |
| transfer-learning | /docs/conceitos/ | Merge com fine-tuning.md |
| rag-memoria-parametrica | /docs/conceitos/ | Link com [[rag]] |
| decision-framework | /docs/conceitos/ | Nó central de decisão |

---

## MAPA VISUAL — Fluxo de Dependências

```
MATEMÁTICA (áudio, prob, cálculo)
       │
       ▼
  MACHINE LEARNING ─────────────────────────────┐
       │                                         │
       ▼                                         ▼
  DEEP LEARNING                           LEARNING PARADIGMS
       │                                   (supervised, unsupervised,
       ▼                                    reinforcement, self-supervised)
  TRANSFORMERS ──────────────────────────────┐
       │                                      │
       ├─→ EMBEDDINGS ──→ VECTOR DBs         │
       │                         │            │
       ├─→ LLMs ◄───────────────┘            │
       │     │                                │
       │     ├─→ TOKENIZAÇÃO                  │
       │     ├─→ PROMPT ENGINEERING ──────────┤
       │     ├─→ FINE-TUNING ◄────────────────┘
       │     │     │
       │     │     └─→ LoRA, PEFT, RLHF
       │     │
       │     └─→ GENERATIVE AI
       │           │
       │           ├─→ NLP (texto)
       │           ├─→ COMPUTER VISION (imagem)
       │           └─→ SPEECH/AUDIO (áudio)
       │
       ├─→ RAG ──→ CHUNKING ──→ EMBEDDINGS ──→ VECTOR DBs
       │     │
       │     └─→ AGENTES IA
       │           │
       │           ├─→ PLANNING (prompt engineering)
       │           ├─→ TOOLS (MCP)
       │           ├─→ MEMORY (vector DBs + relational)
       │           └─→ OBSERVABILIDADE
       │
       └─→ MCP ──→ TOOLS ──→ AGENTES
                 │
                 └─→ HUMAN-IN-THE-LOOP
```

---

## PRÓXIMOS PASSOS — Ordem de Expansão

### Fase 1: Fundação (Críticos)
1. `deep-learning.md` — Ponte ML → Transformers
2. `nlp.md` — Domínio dos LLMs
3. `generative-ai.md` — Categoria principal
4. `tokenizacao.md` — Integrar doc existente ao KG
5. `chunking.md` — Completar pipeline RAG

### Fase 2: Aprofundamento (Importantes)
6. `reasoning-models.md` — o3, R1, thinking models
7. `multimodal.md` — Visão + Linguagem
8. `supervised-learning.md` — Paradigma principal
9. `unsupervised-learning.md` — Clustering, embeddings
10. `reinforcement-learning.md` — RLHF, agentes

### Fase 3: Engenharia (Produção)
11. `mlops.md` — DevOps para ML
12. `data-engineering.md` — Pipelines
13. `model-serving.md` — Deploy
14. `evaluation.md` — Métricas de qualidade
15. `ai-safety-alignment.md` — Segurança

### Fase 4: Ferramentas (Stubs)
16. `pinecone.md`, `qdrant.md`, `chroma.md`
17. `together-ai.md`, `vllm.md`
18. `haystack.md`

---

**Status:** Mapa vivo — expanda conforme aprofundar.
**Próximo:** Qual módulo quer explorar primeiro?
