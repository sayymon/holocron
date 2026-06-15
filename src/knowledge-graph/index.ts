// Types
export type {
  GraphNode,
  ExplorationState,
  GraphArea,
  NodeStatus,
  NodeRing,
  SuggestionEntry,
  SessionEntry,
  CreateNodeInput,
  ToolEntry,
  SourceEntry,
} from './types.js';

export { GRAPH_AREAS, RING1_TAXONOMY, KNOWLEDGE_GRAPH_PATH } from './types.js';

// Reader
export { getAllNodes, getNodeBySlug, getNodesByArea, getNodesByStatus } from './graph-reader.js';

// Writer
export { createNode, updateCentralNode, updateIndex } from './graph-writer.js';

// State Manager
export {
  readExplorationState,
  markNodeExplored,
  markNodeInProgress,
  addSessionEntry,
  updateSuggestions,
} from './state-manager.js';

// Topology
export { getAdjacentNodes, checkPrerequisites, suggestNextTopics } from './topology.js';
