import { Annotation } from '@langchain/langgraph';

/**
 * Estado do Agente Tutor — tudo que flui entre os nós do grafo.
 *
 * Conceitos aplicados (Módulo 4):
 * - State Machine: cada campo representa uma parte do "pensamento" do agente
 * - Memória de curto prazo: o state vive durante uma execução
 * - Memória de longo prazo: studentMemory vem do Postgres
 */
export const TutorState = Annotation.Root({
  // Input do aluno
  question: Annotation<string>,

  // Classificação da intenção
  mode: Annotation<'explain' | 'challenge' | 'quiz' | 'review' | 'guide'>,
  difficulty: Annotation<'beginner' | 'intermediate' | 'advanced'>,

  // Contexto recuperado via RAG
  retrievedContext: Annotation<string>,
  sources: Annotation<string[]>,

  // Raciocínio do agente (ReAct: Thought)
  reasoning: Annotation<string>,

  // Resposta gerada
  response: Annotation<string>,

  // Reflection: auto-avaliação
  reflectionScore: Annotation<number>,
  reflectionNotes: Annotation<string>,

  // Memória do aluno (do Postgres)
  studentId: Annotation<string>,
  studentMemory: Annotation<string>,
});

export type TutorStateType = typeof TutorState.State;
