import { ChatOpenAI } from '@langchain/openai';
import { TutorStateType } from './state.js';
import { hybridSearch } from '../rag/index.js';
import { getStudentMemory, saveInteraction } from './memory.js';

function getLLM() {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  return new ChatOpenAI({
    modelName: process.env.CHAT_MODEL || 'openai/gpt-4o-mini',
    openAIApiKey: apiKey,
    configuration: {
      baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : undefined,
      apiKey,
    },
    temperature: 0.7,
  });
}

/**
 * Nó 1: CLASSIFY — Identifica intenção e nível do aluno
 *
 * Conceito: O agente primeiro entende O QUE o aluno quer antes de agir.
 * Isso é o "percepção" do agent loop (percepção → raciocínio → ação).
 */
export async function classify(state: TutorStateType): Promise<Partial<TutorStateType>> {
  const llm = getLLM();
  const memory = await getStudentMemory(state.studentId);

  const result = await llm.invoke([
    { role: 'system', content: `Classifique a intenção do aluno e seu nível.
Responda APENAS em JSON: {"mode": "explain|challenge|quiz|review|guide", "difficulty": "beginner|intermediate|advanced"}

Contexto do aluno: ${memory || 'Novo aluno, sem histórico.'}` },
    { role: 'user', content: state.question },
  ]);

  try {
    const parsed = JSON.parse(result.content as string);
    return { mode: parsed.mode, difficulty: parsed.difficulty, studentMemory: memory };
  } catch {
    return { mode: 'explain', difficulty: 'intermediate', studentMemory: memory };
  }
}

/**
 * Nó 2: RETRIEVE — Busca contexto relevante na Knowledge Base
 *
 * Conceito: RAG — o agente não "sabe" tudo, ele BUSCA o que precisa.
 * Hybrid search (semântico + keyword) para máxima relevância.
 */
export async function retrieve(state: TutorStateType): Promise<Partial<TutorStateType>> {
  const results = await hybridSearch(state.question, 5);
  const context = results.map(r => `[${r.documentPath}]\n${r.content}`).join('\n\n---\n\n');
  const sources = results.map(r => r.documentPath);
  return { retrievedContext: context, sources };
}

/**
 * Nó 3: REASON — Raciocínio explícito (ReAct: Thought)
 *
 * Conceito: ReAct Pattern — o agente "pensa em voz alta" antes de responder.
 * Isso melhora a qualidade e permite auditoria do raciocínio.
 */
export async function reason(state: TutorStateType): Promise<Partial<TutorStateType>> {
  const llm = getLLM();

  const result = await llm.invoke([
    { role: 'system', content: `Você é o raciocínio interno do Holocron Tutor.
Analise a pergunta, o contexto recuperado e o perfil do aluno.
Produza um raciocínio estruturado sobre COMO responder (não a resposta em si).

Considere:
- Modo: ${state.mode} | Nível: ${state.difficulty}
- O que o aluno já sabe: ${state.studentMemory || 'sem histórico'}
- Se deve questionar (socrático) ou explicar diretamente
- Quais conexões entre módulos são relevantes` },
    { role: 'user', content: `Pergunta: ${state.question}\n\nContexto RAG:\n${state.retrievedContext}` },
  ]);

  return { reasoning: result.content as string };
}

/**
 * Nó 4: RESPOND — Gera a resposta final para o aluno
 *
 * Conceito: O agente usa o raciocínio + contexto + perfil para gerar
 * uma resposta personalizada no estilo socrático.
 */
export async function respond(state: TutorStateType): Promise<Partial<TutorStateType>> {
  const llm = getLLM();

  const styleGuide: Record<string, string> = {
    explain: 'Explique de forma clara, use analogias. Termine com uma pergunta que faça o aluno pensar.',
    challenge: 'Desafie o aluno. Faça perguntas provocativas. Não dê a resposta direta.',
    quiz: 'Crie uma pergunta de quiz sobre o tema. Dê 4 alternativas. Não revele a resposta ainda.',
    review: 'Analise criticamente. Aponte pontos fortes e fracos. Sugira melhorias específicas.',
    guide: 'Dê um passo-a-passo prático. Inclua código quando relevante. Conecte com o projeto.',
  };

  const result = await llm.invoke([
    { role: 'system', content: `Você é o Holocron, tutor socrático do curso de Engenharia de IA Aplicada.

Estilo para este modo (${state.mode}): ${styleGuide[state.mode] || styleGuide.explain}
Nível do aluno: ${state.difficulty}

Regras:
- Cite as fontes (módulo/unidade) quando usar informação do contexto
- Nunca invente informação fora do contexto
- Adapte a linguagem ao nível do aluno
- Seja conciso mas completo

Seu raciocínio interno (não mostre ao aluno): ${state.reasoning}` },
    { role: 'user', content: `Pergunta: ${state.question}\n\nContexto:\n${state.retrievedContext}` },
  ]);

  return { response: result.content as string };
}

/**
 * Nó 5: REFLECT — Auto-avaliação da resposta (Reflection Pattern)
 *
 * Conceito: O agente revisa sua própria resposta antes de entregar.
 * Se a qualidade for baixa, pode re-gerar. Isso é o "Reflection Loop".
 */
export async function reflect(state: TutorStateType): Promise<Partial<TutorStateType>> {
  const llm = getLLM();

  const result = await llm.invoke([
    { role: 'system', content: `Avalie a qualidade desta resposta de tutor. Responda em JSON:
{"score": 1-10, "notes": "breve justificativa"}

Critérios:
- Precisão (usa o contexto corretamente?)
- Estilo socrático (questiona ou só despeja informação?)
- Adequação ao nível do aluno
- Cita fontes?
- É concisa?` },
    { role: 'user', content: `Pergunta: ${state.question}\nResposta: ${state.response}` },
  ]);

  try {
    const parsed = JSON.parse(result.content as string);
    // Salva interação na memória
    await saveInteraction(state.studentId, state.question, state.response, state.mode);
    return { reflectionScore: parsed.score, reflectionNotes: parsed.notes };
  } catch {
    await saveInteraction(state.studentId, state.question, state.response, state.mode);
    return { reflectionScore: 7, reflectionNotes: 'Avaliação automática falhou' };
  }
}
