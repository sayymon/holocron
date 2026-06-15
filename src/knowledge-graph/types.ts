/**
 * Tipos e interfaces do AI Knowledge Graph.
 *
 * O Knowledge Graph é uma estrutura de documentos Markdown interconectados
 * via wikilinks, formando um grafo navegável no Obsidian. Cada nó representa
 * um conceito, ferramenta ou área de IA.
 */

// --- Graph Areas (Taxonomia Ring 1) ---

export type GraphArea =
  | 'foundations'
  | 'learning-paradigms'
  | 'application-domains'
  | 'architecture-models'
  | 'engineering-infrastructure'
  | 'agents-orchestration'
  | 'safety-ethics'
  | 'tools-platforms'
  | 'central';

export type NodeStatus = 'explored' | 'in-progress' | 'pending' | 'stub';

export type NodeRing = 0 | 1 | 2;

// --- Graph Node ---

export interface GraphNode {
  /** kebab-case filename sem .md */
  slug: string;
  titulo: string;
  ring: NodeRing;
  area: GraphArea;
  status: NodeStatus;
  tags: string[];
  prerequisitos: string[];
  connections: string[];
  fonte: string;
  confiabilidade: 'alta' | 'media' | 'baixa';
  data: string; // ISO date YYYY-MM-DD
}

// --- Exploration State ---

export interface SessionEntry {
  data: string; // ISO date
  topic: string; // slug
  status: 'explored' | 'in-progress';
}

export interface SuggestionEntry {
  topic: string; // slug
  reason: string;
  ring: NodeRing;
  area: GraphArea;
}


export interface ExplorationState {
  ultimaSessao: string; // ISO date
  totalNodes: number;
  explored: number;
  inProgress: number;
  pending: number;
  ring1Progress: { explored: number; total: number };
  ring2Progress: { explored: number; total: number };
  recentSessions: SessionEntry[];
  nextSuggested: SuggestionEntry[];
}

// --- Create Node Input ---

export interface ToolEntry {
  name: string;
  use: string;
  category?: string;
}

export interface SourceEntry {
  title: string;
  url: string;
  reliability: 'alta' | 'media' | 'baixa';
}

export interface CreateNodeInput {
  slug: string;
  titulo: string;
  ring: NodeRing;
  area: GraphArea;
  tags: string[];
  prerequisitos?: string[];
  content: {
    explanation: string;
    relevance: string;
    keyConcepts: string[];
    tools?: ToolEntry[];
    sources: SourceEntry[];
    connections: string[];
    realWorld: string;
    quickStart?: string;
    alternatives?: Array<{ name: string; whenToUse: string }>;
    userInsights?: string;
  };
}

// --- Constantes da Taxonomia ---

export const GRAPH_AREAS: Record<GraphArea, string> = {
  central: 'Central',
  foundations: 'Foundations',
  'learning-paradigms': 'Learning Paradigms',
  'application-domains': 'Application Domains',
  'architecture-models': 'Architecture & Models',
  'engineering-infrastructure': 'Engineering & Infrastructure',
  'agents-orchestration': 'Agents & Orchestration',
  'safety-ethics': 'Safety & Ethics',
  'tools-platforms': 'Tools & Platforms',
};

/** Ring 1 nodes planejados por área */
export const RING1_TAXONOMY: Record<Exclude<GraphArea, 'central'>, string[]> = {
  foundations: [
    'machine-learning',
    'deep-learning',
    'estatistica-probabilidade',
    'algebra-linear-calculo',
  ],
  'learning-paradigms': [
    'supervised-learning',
    'unsupervised-learning',
    'reinforcement-learning',
    'transfer-learning',
    'self-supervised-learning',
  ],
  'application-domains': [
    'nlp',
    'computer-vision',
    'speech-audio',
    'robotics-embodied-ai',
    'recommendation-systems',
    'generative-ai',
  ],
  'architecture-models': [
    'transformers',
    'llms',
    'diffusion-models',
    'graph-neural-networks',
    'neural-architecture-search',
  ],
  'engineering-infrastructure': [
    'mlops',
    'data-engineering',
    'model-serving-deployment',
    'vector-databases',
    'embeddings',
    'rag',
  ],
  'agents-orchestration': [
    'ai-agents',
    'tool-use-function-calling',
    'multi-agent-systems',
    'mcp',
    'prompt-engineering',
  ],
  'safety-ethics': [
    'ai-safety-alignment',
    'bias-fairness',
    'explainability-interpretability',
    'ai-governance-regulation',
  ],
  'tools-platforms': [
    'frameworks',
    'llm-providers',
    'orchestration-tools',
    'observability-ai',
    'cloud-ai-services',
  ],
};

/** Caminho base do Knowledge Graph no filesystem */
export const KNOWLEDGE_GRAPH_PATH = 'docs/knowledge-graph';
