# Technical Design: AI Knowledge Graph

## Overview

O AI Knowledge Graph é uma extensão do Holocron que adiciona um grafo de conhecimento navegável sobre IA, construído iterativamente via diálogo socrático. A arquitetura se integra aos componentes existentes (MCP Server, RAG Pipeline, Tutor Agent) sem duplicar funcionalidade, adicionando um novo agente (Graph Navigator) e novas MCP tools para orquestrar sessões de exploração.

## Architecture

### Diagrama de Componentes

```
┌───────────────────────────────────────────────────────────────┐
│                      Kiro / IDE Client                         │
└────────────────────────────┬──────────────────────────────────┘
                             │ MCP (stdio)
┌────────────────────────────▼──────────────────────────────────┐
│                    Holocron MCP Server                         │
│                                                               │
│  Existing Tools          NEW: Knowledge Graph Tools            │
│  ─────────────           ──────────────────────────           │
│  search_content          explore_topic (async→task_id)         │
│  ask_tutor               crystallize_node (sync)               │
│  list_modules            get_exploration_state (sync)          │
│  get_module              suggest_next_topics (sync)            │
│  get_document            list_graph_nodes (sync)               │
│  get_task_result                                              │
└────────────────────────────┬──────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────────┐
         ▼                   ▼                       ▼
┌─────────────────┐ ┌────────────────────┐ ┌──────────────────┐
│  Graph Navigator│ │  RAG Pipeline      │ │  File System     │
│  Agent          │ │  (hybridSearch)    │ │  (docs/)         │
│  (LangGraph)    │ │                    │ │                  │
│                 │ │  embeddings →      │ │  knowledge-graph/│
│  loadState      │ │  pgvector →        │ │  ├── ia.md       │
│  findContext    │ │  retriever         │ │  ├── _estado.md  │
│  presentTopic   │ │                    │ │  ├── _index.md   │
│  suggestNext    │ │                    │ │  └── *.md nodes  │
└─────────────────┘ └────────────────────┘ └──────────────────┘
```


### Princípios de Design

1. **File-first** — O grafo vive como Markdown no filesystem, não em banco. Obsidian lê direto.
2. **Stateless MCP tools** — Cada tool é independente, estado vive em `_estado-exploracao.md`.
3. **Reuso máximo** — Graph Navigator usa o RAG Pipeline existente para buscar contexto.
4. **Async pattern** — `explore_topic` usa o mesmo `task-store` das tools existentes.
5. **Separation of concerns** — Cristalização (write) é tool separada de exploração (read/think).

---

## Data Models

### Node Document (Markdown with Front Matter)

```yaml
# docs/knowledge-graph/machine-learning.md
---
titulo: "Machine Learning — Aprendizado de Máquina"
tags: [ml, supervised, unsupervised, reinforcement, fundamentos]
fonte: "Sessão socrática + curso Engenharia de IA"
confiabilidade: alta
data: 2026-06-14
ring: 1
area: learning-paradigms
status: explored
prerequisitos: []
---
```

#### Sections Structure (Ring 1 Node)

```markdown
# Machine Learning

## O que é
[Explicação clara e concisa]

## Por que importa
[Relevância para AI Engineer]

## Conceitos-chave
- [[supervised-learning]]
- [[unsupervised-learning]]
- [[reinforcement-learning]]
- [[feature-engineering]]

## Landscape de Ferramentas
| Ferramenta | Uso | Categoria |
|------------|-----|-----------|
| scikit-learn | ML clássico | Framework |
| XGBoost | Gradient boosting | Biblioteca |

## Conexões com o Mundo Real
[Aplicações e casos de uso reais]

## Fontes para Aprofundamento
- [Hands-On ML - Aurélien Géron](url) — Livro referência
- [Stanford CS229](url) — Curso teórico

## Conexões
- Pai: [[ia]]
- Relacionados: [[deep-learning]], [[data-science]], [[estatistica]]
- Filhos (Ring 2): [[scikit-learn]], [[xgboost]], [[tensorflow]]
```


#### Sections Structure (Ring 2 Node — Tool/Technology)

```markdown
# scikit-learn

## O que é
[Explicação]

## Por que importa
[Relevância]

## Casos de uso
- Classificação de texto
- Regressão para previsão
- Clustering de clientes

## Como começar (Quick Start)
```python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
```

## Alternativas
| Alternativa | Quando preferir |
|-------------|-----------------|
| XGBoost | Performance em tabular |
| TensorFlow | Deep Learning |

## Conexões com o Mundo Real
[Aplicações reais]

## Fontes
- [Docs oficiais](url) — confiabilidade: alta
- [Tutorial Kaggle](url) — confiabilidade: media

## Conexões
- Pai: [[machine-learning]]
- Relacionados: [[pandas]], [[numpy]], [[feature-engineering]]
```

### Exploration State Document

```yaml
# docs/knowledge-graph/_estado-exploracao.md
---
titulo: "Estado de Exploração do Knowledge Graph"
ultima_sessao: 2026-06-14
total_nodes: 45
explored: 12
in_progress: 1
pending: 32
---

## Progresso

| Métrica | Valor |
|---------|-------|
| Ring 1 explorados | 5/12 (42%) |
| Ring 2 explorados | 7/33 (21%) |
| Total | 12/45 (27%) |

## Últimas Sessões

| Data | Tópico | Status |
|------|--------|--------|
| 2026-06-14 | [[machine-learning]] | ✅ explored |
| 2026-06-13 | [[deep-learning]] | 🔄 in-progress |

## Próximos Sugeridos

1. [[deep-learning]] — continuar sessão interrompida
2. [[nlp]] — adjacente a ML, base para LLMs
3. [[computer-vision]] — outro domínio aplicado de DL
```


### Graph Taxonomy (Ring 1 Nodes — Initial Map)

```
IA (Central)
├── Foundations
│   ├── machine-learning
│   ├── deep-learning
│   ├── estatistica-probabilidade
│   └── algebra-linear-calculo
├── Learning Paradigms
│   ├── supervised-learning
│   ├── unsupervised-learning
│   ├── reinforcement-learning
│   ├── transfer-learning
│   └── self-supervised-learning
├── Application Domains
│   ├── nlp (Natural Language Processing)
│   ├── computer-vision
│   ├── speech-audio
│   ├── robotics-embodied-ai
│   ├── recommendation-systems
│   └── generative-ai
├── Architecture & Models
│   ├── transformers
│   ├── llms (Large Language Models)
│   ├── diffusion-models
│   ├── graph-neural-networks
│   └── neural-architecture-search
├── Engineering & Infrastructure
│   ├── mlops
│   ├── data-engineering
│   ├── model-serving-deployment
│   ├── vector-databases
│   ├── embeddings
│   └── rag (Retrieval Augmented Generation)
├── Agents & Orchestration
│   ├── ai-agents
│   ├── tool-use-function-calling
│   ├── multi-agent-systems
│   ├── mcp (Model Context Protocol)
│   └── prompt-engineering
├── Safety & Ethics
│   ├── ai-safety-alignment
│   ├── bias-fairness
│   ├── explainability-interpretability
│   └── ai-governance-regulation
└── Tools & Platforms
    ├── frameworks (PyTorch, TF, JAX)
    ├── llm-providers (OpenAI, Anthropic, Google)
    ├── orchestration-tools (LangChain, LangGraph)
    ├── observability (LangFuse, Weights&Biases)
    └── cloud-ai-services (Bedrock, Vertex, SageMaker)
```

---

## Component Design

### 1. Graph Navigator Agent (`src/agents/graph-navigator.ts`)

Novo agente LangGraph que orquestra sessões de exploração socrática.

```typescript
// State Definition
const GraphNavigatorState = Annotation.Root({
  // Input
  topic: Annotation<string>,           // tópico solicitado
  userMessage: Annotation<string>,     // resposta do usuário (se continuação)
  
  // Context
  explorationState: Annotation<ExplorationState>,
  existingContent: Annotation<string>, // conteúdo existente no Holocron
  relatedNodes: Annotation<string[]>,  // nós adjacentes
  
  // Output
  explanation: Annotation<string>,     // explicação socrática
  questions: Annotation<string[]>,     // perguntas guia
  suggestions: Annotation<string[]>,   // próximos tópicos
  readyToCrystallize: Annotation<boolean>,
});

// Graph Flow
// [START] → loadState → findContext → presentTopic → [END]
```

#### Node Responsibilities

| Node | Função | Deps |
|------|--------|------|
| `loadState` | Lê `_estado-exploracao.md`, identifica posição atual | fs |
| `findContext` | Busca conteúdo existente via RAG + docs/conceitos | RAG pipeline |
| `presentTopic` | Gera explicação socrática + perguntas guia | LLM |
| `suggestNext` | Analisa grafo e sugere próximos tópicos | graph topology |


### 2. MCP Tools (`src/mcp/graph-tools.ts`)

Novas tools registradas no MCP Server para interação com o Knowledge Graph.

#### `explore_topic` (Async — retorna task_id)

```typescript
// Input
{ topic: z.string(), context?: z.string() }

// Behavior
// 1. Cria task via task-store
// 2. Executa Graph Navigator Agent em background
// 3. Retorna task_id para polling via get_task_result

// Output (via get_task_result)
// Explicação socrática do tópico + 2-3 perguntas guia
// + sugestões de próximos tópicos
// + flag se há conteúdo existente no Holocron
```

#### `crystallize_node` (Sync)

```typescript
// Input
{
  topic: z.string(),        // nome do nó (kebab-case)
  ring: z.number(),         // 1 ou 2
  area: z.string(),         // categoria pai
  content: z.object({       // conteúdo estruturado
    explanation: z.string(),
    relevance: z.string(),
    keyConcepts: z.array(z.string()),
    tools: z.array(z.object({ name: z.string(), use: z.string() })).optional(),
    sources: z.array(z.object({ title: z.string(), url: z.string(), reliability: z.string() })),
    connections: z.array(z.string()),
    realWorld: z.string(),
    quickStart: z.string().optional(),
    userInsights: z.string().optional(),
  })
}

// Behavior
// 1. Gera Markdown com front matter a partir do input
// 2. Salva em docs/knowledge-graph/{topic}.md
// 3. Atualiza _estado-exploracao.md (status → explored)
// 4. Atualiza _index.md
// 5. Atualiza ia.md se for Ring 1
// 6. Retorna confirmação + wikilinks gerados
```

#### `get_exploration_state` (Sync)

```typescript
// Input: {} (sem parâmetros)
// Output: conteúdo de _estado-exploracao.md parseado
// Inclui: progresso, últimas sessões, próximos sugeridos
```

#### `suggest_next_topics` (Sync)

```typescript
// Input: { current_topic?: z.string() }
// Behavior:
// 1. Lê _estado-exploracao.md
// 2. Analisa topologia do grafo (prerequisitos, adjacência)
// 3. Retorna 2-3 sugestões com justificativa
// Output: lista de {topic, reason, ring, area, hasPrerequisites}
```

#### `list_graph_nodes` (Sync)

```typescript
// Input: { filter?: z.enum(['all', 'explored', 'pending', 'in-progress']), area?: z.string() }
// Behavior: glob docs/knowledge-graph/*.md, parseia front matter
// Output: lista de nós com status, ring, area
```


### 3. Graph Utilities (`src/knowledge-graph/`)

Módulo utilitário para operações no grafo.

```
src/knowledge-graph/
├── index.ts           # exports
├── types.ts           # interfaces e tipos
├── graph-reader.ts    # lê e parseia nós do grafo
├── graph-writer.ts    # cria/atualiza nós Markdown
├── state-manager.ts   # gerencia _estado-exploracao.md
└── topology.ts        # lógica de adjacência e prerequisites
```

#### Types (`src/knowledge-graph/types.ts`)

```typescript
export interface GraphNode {
  slug: string;          // kebab-case filename sem .md
  titulo: string;
  ring: 1 | 2;
  area: string;
  status: 'explored' | 'in-progress' | 'pending' | 'stub';
  tags: string[];
  prerequisitos: string[];
  connections: string[];
  data: string;         // ISO date
}

export interface ExplorationState {
  ultimaSessao: string;
  totalNodes: number;
  explored: number;
  inProgress: number;
  pending: number;
  ring1Progress: { explored: number; total: number };
  ring2Progress: { explored: number; total: number };
  recentSessions: SessionEntry[];
  nextSuggested: SuggestionEntry[];
}

export interface SessionEntry {
  data: string;
  topic: string;
  status: 'explored' | 'in-progress';
}

export interface SuggestionEntry {
  topic: string;
  reason: string;
  ring: 1 | 2;
  area: string;
}

export type GraphArea = 
  | 'foundations'
  | 'learning-paradigms'
  | 'application-domains'
  | 'architecture-models'
  | 'engineering-infrastructure'
  | 'agents-orchestration'
  | 'safety-ethics'
  | 'tools-platforms';
```

#### Graph Reader (`src/knowledge-graph/graph-reader.ts`)

```typescript
// Responsabilidades:
// - glob docs/knowledge-graph/*.md (exclui _prefixed)
// - Parseia front matter com gray-matter
// - Retorna GraphNode[] tipado
// - Filtra por ring, area, status

export function getAllNodes(): Promise<GraphNode[]>;
export function getNodeBySlug(slug: string): Promise<GraphNode | null>;
export function getNodesByArea(area: GraphArea): Promise<GraphNode[]>;
export function getNodesByStatus(status: string): Promise<GraphNode[]>;
```

#### Graph Writer (`src/knowledge-graph/graph-writer.ts`)

```typescript
// Responsabilidades:
// - Gera Markdown com front matter a partir de dados estruturados
// - Salva arquivo em docs/knowledge-graph/
// - Garante wikilinks formatados corretamente
// - Atualiza Central Node (ia.md) ao criar Ring 1

export function createNode(data: CreateNodeInput): Promise<string>;
export function updateCentralNode(newNodeSlug: string, area: GraphArea): Promise<void>;
export function updateIndex(): Promise<void>;
```


#### State Manager (`src/knowledge-graph/state-manager.ts`)

```typescript
// Responsabilidades:
// - Lê e parseia _estado-exploracao.md
// - Atualiza status de nodes (explored, in-progress)
// - Registra sessões
// - Recalcula progresso

export function readExplorationState(): Promise<ExplorationState>;
export function markNodeExplored(slug: string): Promise<void>;
export function markNodeInProgress(slug: string): Promise<void>;
export function addSessionEntry(entry: SessionEntry): Promise<void>;
export function updateSuggestions(suggestions: SuggestionEntry[]): Promise<void>;
```

#### Topology (`src/knowledge-graph/topology.ts`)

```typescript
// Responsabilidades:
// - Determina adjacência entre nós
// - Verifica prerequisites satisfeitos
// - Sugere próximos tópicos com heurística:
//   1. In-progress > pending (continuidade)
//   2. Ring 1 > Ring 2 (fundamentos primeiro)
//   3. Adjacentes ao último explorado (coerência)
//   4. Sem prerequisites pendentes (viabilidade)

export function getAdjacentNodes(slug: string, allNodes: GraphNode[]): GraphNode[];
export function checkPrerequisites(slug: string, allNodes: GraphNode[]): { satisfied: boolean; missing: string[] };
export function suggestNextTopics(currentSlug: string, state: ExplorationState, allNodes: GraphNode[]): SuggestionEntry[];
```

---

## Integration Points

### Com RAG Pipeline Existente

O `explore_topic` usa `hybridSearch` para encontrar conteúdo relevante antes de gerar a explicação socrática. Isso garante que:
- Conceitos já documentados em `docs/conceitos/` são referenciados
- Conteúdo do curso (`docs/curso/`) é incorporado
- Não há duplicação de informação

```typescript
// No nó findContext do Graph Navigator Agent:
const existingContent = await hybridSearch(topic, 3);
// Se encontrou → apresenta como "contexto prévio" na sessão socrática
// Se não → gera explicação do zero
```

### Com Tutor Agent Existente

O Graph Navigator NÃO substitui o Tutor. A divisão é:
- **Tutor Agent** → responde perguntas livres, modo socrático genérico
- **Graph Navigator** → explora tópicos específicos do grafo, com estado e progressão

O Graph Navigator pode invocar conceitos do Tutor internamente para enriquecer explicações.

### Com Obsidian (Graph View)

A estrutura é projetada para renderizar automaticamente no Obsidian:
- Wikilinks `[[slug]]` criam arestas no grafo
- Front matter `ring` permite filtrar por profundidade
- Front matter `area` permite colorir por domínio
- Tags permitem busca facetada
- `_estado-exploracao.md` é metadado (prefixo `_` = não aparece no grafo principal)

### Com MCP Task Store

`explore_topic` reutiliza o mesmo `createTask`/`getTask` pattern:
```typescript
const task = createTask(async () => {
  return await runGraphNavigator(topic, context);
});
```

---

## File Structure (New Files)

```
docs/knowledge-graph/
├── ia.md                      # Central Node
├── _estado-exploracao.md      # Exploration State (meta)
├── _index.md                  # Index por Ring/Area
├── machine-learning.md        # Ring 1 node (example)
├── deep-learning.md           # Ring 1 node
├── nlp.md                     # Ring 1 node
├── scikit-learn.md            # Ring 2 node (example)
└── ...

src/knowledge-graph/
├── index.ts
├── types.ts
├── graph-reader.ts
├── graph-writer.ts
├── state-manager.ts
└── topology.ts

src/agents/graph-navigator.ts  # New agent
src/mcp/graph-tools.ts         # New MCP tools registration
```


---

## Interaction Flow (Socratic Session)

### Fluxo Completo de uma Sessão

```
Usuário: "Quero explorar Machine Learning"
    │
    ▼
[explore_topic(topic="machine-learning")]
    │
    ├── loadState: lê _estado-exploracao.md → ML está "pending"
    ├── findContext: hybridSearch("machine learning") → encontra docs existentes
    ├── presentTopic: LLM gera explicação + perguntas
    │
    ▼
Retorno (via get_task_result):
    "Machine Learning é o campo da IA onde sistemas aprendem
     padrões a partir de dados, sem serem explicitamente programados...
     
     🤔 Perguntas para reflexão:
     1. Qual a diferença entre um programa tradicional e um modelo de ML?
     2. Você consegue pensar em um caso onde ML seria melhor que regras?
     
     📚 Conteúdo existente no Holocron: [[rag-embeddings-busca]]
     
     💡 Sugestões próximas: [[deep-learning]], [[supervised-learning]]"
    │
    ▼
Usuário responde com seu entendimento...
    │
    ▼
[explore_topic(topic="machine-learning", context="resposta do usuário")]
    │ (Graph Navigator adapta, aprofunda, corrige)
    ▼
... (N iterações até compreensão)
    │
    ▼
Usuário: "Acho que entendi, pode cristalizar"
    │
    ▼
[crystallize_node(topic="machine-learning", ring=1, area="foundations", content={...})]
    │
    ├── Gera docs/knowledge-graph/machine-learning.md
    ├── Atualiza _estado-exploracao.md (→ explored)
    ├── Atualiza ia.md (adiciona wikilink)
    ├── Atualiza _index.md
    │
    ▼
"✅ Nó [[machine-learning]] cristalizado! 
 Progresso: Ring 1: 1/12 (8%) | Total: 1/45 (2%)
 
 Próximos sugeridos:
 1. [[deep-learning]] — extensão natural de ML com redes neurais
 2. [[supervised-learning]] — paradigma mais comum de ML
 3. [[data-engineering]] — dados são o combustível do ML"
```

---

## Decisions & Trade-offs

### Por que file-based state (não Postgres)?

| Critério | File (.md) | Postgres |
|----------|------------|----------|
| Obsidian-compatible | ✅ nativo | ❌ precisa export |
| Simplicidade | ✅ fs read/write | ⚠️ migrations, connection |
| Portabilidade | ✅ git clone = funciona | ❌ precisa DB rodando |
| Performance | ⚠️ ~50 files = OK | ✅ melhor em escala |
| Concorrência | ⚠️ single user = OK | ✅ multi-user |

**Decisão:** File-based. O Knowledge Graph é pessoal (1 usuário), tem ~50-100 nós, e PRECISA ser visível no Obsidian. Performance não é concern nessa escala.

### Por que um novo agente (não estender o Tutor)?

O Tutor responde perguntas genéricas sem estado. O Graph Navigator:
- Tem estado persistente (progresso no grafo)
- Tem topologia (sabe o que conecta ao quê)
- Tem progressão (sugere próximos com lógica)
- Tem cristalização (gera documentos permanentes)

São responsabilidades distintas que justificam separação.

### Por que explore_topic é async?

Consistência com o pattern existente (`search_content`, `ask_tutor`). O Graph Navigator faz chamada LLM + RAG search que podem levar 3-10s. O padrão async com polling via `get_task_result` já é familiar ao cliente MCP.

---

## Requirement Mapping

| Requirement | Components | Files |
|-------------|-----------|-------|
| R1: Grafo Central | graph-writer, Central Node | `ia.md`, `graph-writer.ts` |
| R2: Nodes Atômicos | graph-writer, types | `types.ts`, `graph-writer.ts` |
| R3: Processo Socrático | Graph Navigator Agent, explore_topic | `graph-navigator.ts`, `graph-tools.ts` |
| R4: Navegação Inteligente | topology, suggest_next_topics | `topology.ts`, `graph-tools.ts` |
| R5: Estado Persistente | state-manager, _estado-exploracao.md | `state-manager.ts` |
| R6: Integração Holocron | findContext node, RAG pipeline | `graph-navigator.ts` |
| R7: Mapa Visual | front matter conventions, wikilinks | all node .md files |
| R8: Conteúdo Rico | crystallize_node, node templates | `graph-writer.ts`, `graph-tools.ts` |


---

## Components and Interfaces

### Component: Knowledge Graph Utilities (`src/knowledge-graph/`)

**Interface pública:**

```typescript
// src/knowledge-graph/index.ts
export { GraphNode, ExplorationState, GraphArea, SuggestionEntry, SessionEntry } from './types.js';
export { getAllNodes, getNodeBySlug, getNodesByArea, getNodesByStatus } from './graph-reader.js';
export { createNode, updateCentralNode, updateIndex } from './graph-writer.js';
export { readExplorationState, markNodeExplored, markNodeInProgress, addSessionEntry, updateSuggestions } from './state-manager.js';
export { getAdjacentNodes, checkPrerequisites, suggestNextTopics } from './topology.js';
```

### Component: Graph Navigator Agent (`src/agents/graph-navigator.ts`)

**Interface pública:**

```typescript
export const graphNavigatorAgent: CompiledStateGraph;
export function runGraphNavigator(topic: string, userContext?: string): Promise<string>;
```

### Component: MCP Graph Tools (`src/mcp/graph-tools.ts`)

**Interface pública:**

```typescript
export function registerGraphTools(server: McpServer): void;
```

Registra no MCP Server as 5 tools:
- `explore_topic` — async, retorna task_id
- `crystallize_node` — sync, cria/atualiza arquivo .md
- `get_exploration_state` — sync, lê estado
- `suggest_next_topics` — sync, analisa topologia
- `list_graph_nodes` — sync, lista nós filtrados

### Component Interactions

```
registerGraphTools(server)
    │
    ├── explore_topic → createTask → runGraphNavigator
    │                                      │
    │                                      ├── readExplorationState()
    │                                      ├── hybridSearch(topic)
    │                                      └── LLM (socrático)
    │
    ├── crystallize_node → createNode → markNodeExplored → updateCentralNode → updateIndex
    │
    ├── get_exploration_state → readExplorationState()
    │
    ├── suggest_next_topics → getAllNodes → suggestNextTopics()
    │
    └── list_graph_nodes → getAllNodes → filter
```

---

## Error Handling

| Cenário | Comportamento | Recuperação |
|---------|--------------|-------------|
| `_estado-exploracao.md` não existe | Cria arquivo com estado vazio (bootstrap) | Auto-heal |
| Nó referenciado não existe (wikilink quebrado) | Log warning, retorna como "stub" | Sugere cristalizar o stub |
| Front matter inválido em nó | Pula nó, log error com path | Não inclui na listagem |
| RAG pipeline indisponível (DB offline) | Graph Navigator continua sem contexto existente | Explicação sem referências |
| LLM timeout em explore_topic | Task status = "error" com mensagem | Retry via novo explore_topic |
| Conflito de escrita (arquivo alterado externamente) | Lê sempre do fs (stateless) | Sem lock, fs é source of truth |
| `docs/knowledge-graph/` não existe | Cria diretório no primeiro crystallize_node | Auto-bootstrap |

### Strategy

- **Fail-safe para leitura** — Se não consegue ler estado, assume "tudo pending" e continua.
- **Fail-fast para escrita** — Se não consegue salvar nó, retorna erro explícito (não perde conteúdo silenciosamente).
- **Graceful degradation** — RAG indisponível = funciona sem contexto existente. LLM indisponível = retorna erro claro.

---

## Correctness Properties

### Property 1: Idempotência de crystallize
Cristalizar o mesmo tópico 2x sobrescreve com a versão nova (não duplica arquivos).
**Validates: Requirements 2.1, 5.2**

### Property 2: Consistência de estado
`_estado-exploracao.md` é recalculado a partir dos arquivos reais no `glob`, não mantido em memória.
**Validates: Requirements 5.1, 5.4**

### Property 3: Wikilinks válidos
Todo `[[slug]]` referenciado deve corresponder a um arquivo existente ou stub planejado.
**Validates: Requirements 2.5, 7.1**

### Property 4: Front matter compliance
Todo nó criado via `createNode` garante todos os campos obrigatórios (titulo, tags, ring, area, status, data).
**Validates: Requirements 2.2, 6.4**

### Property 5: Ring hierarchy
Ring 2 nodes SEMPRE têm um parent Ring 1 no campo `area`.
**Validates: Requirements 1.3, 7.3, 7.4**

### Property 6: No orphan nodes
Todo nó criado é adicionado ao `_index.md` e referenciado por pelo menos 1 outro nó.
**Validates: Requirements 1.4, 7.5**

---

## Testing Strategy

### Unit Tests (`src/knowledge-graph/*.test.ts`)

| Módulo | Testes |
|--------|--------|
| `graph-reader` | Parseia front matter corretamente, filtra por ring/area/status, ignora `_` prefixed |
| `graph-writer` | Gera Markdown válido com front matter, cria wikilinks formatados, atualiza ia.md |
| `state-manager` | Lê/escreve estado, recalcula progresso, bootstrap quando vazio |
| `topology` | Adjacência correta, prerequisites check, heurística de sugestões |

### Integration Tests

| Cenário | Validação |
|---------|-----------|
| Cristalizar nó Ring 1 | Arquivo criado + ia.md atualizado + estado atualizado + index atualizado |
| Explorar tópico existente | RAG retorna conteúdo, Graph Navigator incorpora na explicação |
| Explorar tópico novo | Sem conteúdo RAG, explicação gerada do zero |
| Estado bootstrap | Primeiro acesso cria `_estado-exploracao.md` vazio válido |

### Validação Manual (Obsidian)

- Abrir vault no Obsidian → Graph View mostra grafo radial
- Filtrar por tag `ring:1` → Apenas nós de primeiro nível
- Clicar em wikilink → Navega para nó correto
- Buscar por tag → Retorna nós da área
