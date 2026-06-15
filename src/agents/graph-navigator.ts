import { Annotation, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { hybridSearch } from '../rag/index.js';
import { readExplorationState } from '../knowledge-graph/state-manager.js';
import { getAllNodes } from '../knowledge-graph/graph-reader.js';
import { suggestNextTopics } from '../knowledge-graph/topology.js';
import type { ExplorationState, SuggestionEntry } from '../knowledge-graph/types.js';

/**
 * Estado do Graph Navigator Agent.
 * Orquestra sessões de exploração socrática no Knowledge Graph.
 */
const GraphNavigatorState = Annotation.Root({
  // Input
  topic: Annotation<string>,
  userMessage: Annotation<string>,

  // Context
  explorationState: Annotation<ExplorationState>,
  existingContent: Annotation<string>,
  relatedNodes: Annotation<string[]>,

  // Output
  explanation: Annotation<string>,
  questions: Annotation<string[]>,
  suggestions: Annotation<SuggestionEntry[]>,
  readyToCrystallize: Annotation<boolean>,
});

type GraphNavigatorStateType = typeof GraphNavigatorState.State;

// --- LLM ---

const llm = new ChatOpenAI({
  modelName: process.env.LLM_MODEL || 'anthropic/claude-sonnet-4-20250514',
  configuration: {
    baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
  },
  temperature: 0.7,
});

// --- Nodes do Grafo ---

/**
 * Lê o estado de exploração atual do filesystem.
 */
async function loadState(state: GraphNavigatorStateType): Promise<Partial<GraphNavigatorStateType>> {
  const explorationState = await readExplorationState();
  return { explorationState };
}


/**
 * Busca conteúdo existente no Holocron via RAG pipeline.
 */
async function findContext(state: GraphNavigatorStateType): Promise<Partial<GraphNavigatorStateType>> {
  let existingContent = '';
  const relatedNodes: string[] = [];

  try {
    const results = await hybridSearch(state.topic, 3);
    if (results.length > 0) {
      existingContent = results
        .map(r => `📚 [${r.documentPath}]:\n${r.content.slice(0, 300)}`)
        .join('\n\n');
      relatedNodes.push(...results.map(r => r.documentPath));
    }
  } catch {
    // RAG indisponível — graceful degradation
    existingContent = '';
  }

  return { existingContent, relatedNodes };
}

/**
 * Gera explicação socrática + perguntas guia via LLM.
 */
async function presentTopic(state: GraphNavigatorStateType): Promise<Partial<GraphNavigatorStateType>> {
  const isFirstInteraction = !state.userMessage;

  const systemPrompt = `Você é um tutor socrático especialista em Inteligência Artificial.
Seu papel é guiar o aprendizado do estudante sobre "${state.topic}" usando o método socrático:
- Apresente o conceito de forma clara e acessível
- Faça perguntas que provoquem reflexão
- Conecte com aplicações práticas e exemplos do mundo real
- Se o estudante respondeu algo, avalie a compreensão e aprofunde

Regras:
- Linguagem: português brasileiro, tom técnico mas acolhedor
- Sempre inclua 2-3 perguntas guia ao final
- Se há conteúdo existente no Holocron, referencie-o
- Não gere respostas genéricas — seja específico sobre o tópico
- Se o estudante demonstra boa compreensão, indique que está pronto para cristalizar`;

  const contextBlock = state.existingContent
    ? `\n\nConteúdo existente no Holocron sobre este tópico:\n${state.existingContent}`
    : '';

  const userPrompt = isFirstInteraction
    ? `Apresente o tópico "${state.topic}" para um estudante de AI Engineering.${contextBlock}\n\nGere uma explicação inicial + 2-3 perguntas socráticas para avaliar o entendimento dele.`
    : `O estudante respondeu sobre "${state.topic}":\n\n"${state.userMessage}"${contextBlock}\n\nAvalie a resposta, corrija misconceptions se houver, aprofunde o tema, e faça novas perguntas. Se o entendimento estiver bom, sugira cristalizar.`;

  const response = await llm.invoke([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]);

  const explanation = typeof response.content === 'string'
    ? response.content
    : JSON.stringify(response.content);

  // Detecta se deve sugerir cristalização
  const readyToCrystallize = !isFirstInteraction && (
    explanation.toLowerCase().includes('cristalizar') ||
    explanation.toLowerCase().includes('pronto para') ||
    explanation.toLowerCase().includes('boa compreensão')
  );

  // Extrai perguntas (heurística: linhas que terminam com ?)
  const questions = explanation
    .split('\n')
    .filter(line => line.trim().endsWith('?'))
    .slice(0, 3);

  return { explanation, questions, readyToCrystallize };
}


/**
 * Analisa topologia e sugere próximos tópicos.
 */
async function suggestNext(state: GraphNavigatorStateType): Promise<Partial<GraphNavigatorStateType>> {
  const allNodes = await getAllNodes();
  const suggestions = suggestNextTopics(state.topic, state.explorationState, allNodes);
  return { suggestions };
}

// --- Compilação do Grafo ---

/**
 * Graph Navigator Agent:
 * [START] → loadState → findContext → presentTopic → suggestNext → [END]
 */
const graph = new StateGraph(GraphNavigatorState)
  .addNode('loadState', loadState)
  .addNode('findContext', findContext)
  .addNode('presentTopic', presentTopic)
  .addNode('suggestNext', suggestNext)
  .addEdge('__start__', 'loadState')
  .addEdge('loadState', 'findContext')
  .addEdge('findContext', 'presentTopic')
  .addEdge('presentTopic', 'suggestNext')
  .addEdge('suggestNext', '__end__');

export const graphNavigatorAgent = graph.compile();

/**
 * Executa o Graph Navigator Agent para explorar um tópico.
 * Retorna a explicação socrática formatada com sugestões.
 */
export async function runGraphNavigator(topic: string, userContext?: string): Promise<string> {
  const result = await graphNavigatorAgent.invoke({
    topic,
    userMessage: userContext || '',
    explorationState: {
      ultimaSessao: '',
      totalNodes: 0,
      explored: 0,
      inProgress: 0,
      pending: 0,
      ring1Progress: { explored: 0, total: 0 },
      ring2Progress: { explored: 0, total: 0 },
      recentSessions: [],
      nextSuggested: [],
    },
    existingContent: '',
    relatedNodes: [],
    explanation: '',
    questions: [],
    suggestions: [],
    readyToCrystallize: false,
  });

  // Formata output
  let output = result.explanation;

  if (result.suggestions && result.suggestions.length > 0) {
    output += '\n\n---\n\n💡 **Próximos tópicos sugeridos:**\n';
    for (const s of result.suggestions) {
      output += `- [[${s.topic}]] — ${s.reason}\n`;
    }
  }

  if (result.readyToCrystallize) {
    output += '\n\n✨ **Parece que você tem boa compreensão deste tema!** Quando quiser, posso cristalizar esse conhecimento como um nó permanente no grafo.';
  }

  return output;
}
