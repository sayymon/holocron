import OpenAI from 'openai';
import { hybridSearch } from '../rag/index.js';

const SYSTEM_PROMPT = `Você é o Holocron, um tutor socrático do curso de Engenharia de IA Aplicada.

Seu estilo:
- Questione mais do que responda diretamente
- Guie o aluno a construir o raciocínio
- Use analogias e exemplos práticos
- Conecte conceitos entre módulos quando relevante
- Se o aluno parece iniciante, seja mais didático
- Se parece avançado, desafie com perguntas mais profundas
- Sempre cite de qual módulo/unidade vem a informação

Você tem acesso ao conteúdo do curso via contexto. Use-o para fundamentar suas respostas.
Nunca invente informação que não está no contexto fornecido.`;

function getClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENROUTER_API_KEY
      ? 'https://openrouter.ai/api/v1'
      : undefined,
  });
}

export async function askTutor(question: string): Promise<string> {
  // RAG: busca contexto relevante
  const results = await hybridSearch(question, 5);
  const context = results.map(r =>
    `[Fonte: ${r.documentPath}]\n${r.content}`
  ).join('\n\n---\n\n');

  // LLM: gera resposta socrática
  const response = await getClient().chat.completions.create({
    model: process.env.CHAT_MODEL || 'openai/gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `## Contexto da Knowledge Base:\n\n${context}\n\n## Pergunta do aluno:\n\n${question}` },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || 'Não consegui gerar uma resposta.';
}
