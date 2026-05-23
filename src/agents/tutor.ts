import { StateGraph } from '@langchain/langgraph';
import { TutorState } from './state.js';
import { classify, retrieve, reason, respond, reflect } from './nodes.js';

/**
 * Grafo do Agente Tutor — orquestra o fluxo de raciocínio.
 *
 * Conceitos aplicados (Módulo 4, Unidade 6):
 * - StateGraph: grafo dirigido onde cada nó transforma o estado
 * - Fluxo linear (por agora): classify → retrieve → reason → respond → reflect
 * - Futuro: edges condicionais (se reflection < 5, re-gera resposta)
 *
 * Fluxo visual:
 *
 *   [START]
 *      ↓
 *   classify  → identifica modo + nível
 *      ↓
 *   retrieve  → busca contexto via RAG
 *      ↓
 *   reason    → pensa (ReAct: Thought)
 *      ↓
 *   respond   → gera resposta socrática
 *      ↓
 *   reflect   → auto-avalia qualidade
 *      ↓
 *   [END]
 */
const graph = new StateGraph(TutorState)
  .addNode('classify', classify)
  .addNode('retrieve', retrieve)
  .addNode('reason', reason)
  .addNode('respond', respond)
  .addNode('reflect', reflect)
  .addEdge('__start__', 'classify')
  .addEdge('classify', 'retrieve')
  .addEdge('retrieve', 'reason')
  .addEdge('reason', 'respond')
  .addEdge('respond', 'reflect')
  .addEdge('reflect', '__end__');

export const tutorAgent = graph.compile();

/** Executa o agente tutor com uma pergunta */
export async function runTutor(question: string, studentId = 'default'): Promise<string> {
  const result = await tutorAgent.invoke({
    question,
    studentId,
    mode: 'explain',
    difficulty: 'intermediate',
    retrievedContext: '',
    sources: [],
    reasoning: '',
    response: '',
    reflectionScore: 0,
    reflectionNotes: '',
    studentMemory: '',
  });

  return result.response;
}
