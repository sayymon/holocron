import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { getLLM } from './nodes.js';
import { resolveDisciplina, DOCS_PATH } from '../mcp/curriculum.js';

/**
 * Quiz adaptativo — gera questões de múltipla escolha a partir do conteúdo
 * real de uma disciplina do curso.
 *
 * Conceitos aplicados:
 * - RAG "offline": o contexto vem direto dos docs da disciplina (sem vector DB)
 * - Structured output: pedimos JSON ao LLM e validamos antes de exibir
 */

export interface QuizQuestion {
  statement: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Quiz {
  disciplina: string;
  questions: QuizQuestion[];
}

/** Lê o README + módulos da disciplina e monta o contexto para o LLM. */
async function loadDisciplinaContext(dir: string): Promise<string> {
  const files = (await glob('*.md', { cwd: path.join(DOCS_PATH, dir) })).sort();
  const parts: string[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(DOCS_PATH, dir, file), 'utf-8');
    const { data, content } = matter(raw);
    const titulo = typeof data.titulo === 'string' && data.titulo.trim() ? data.titulo.trim() : file;
    parts.push(`## ${titulo}\n\n${content.trim()}`);
  }

  return parts.join('\n\n---\n\n').slice(0, 16000);
}

/** Extrai o primeiro array JSON da resposta do LLM (tolerante a code fences). */
function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start === -1 || end === -1) throw new Error('A resposta do LLM não contém um JSON válido.');
  return JSON.parse(raw.slice(start, end + 1));
}

/** Gera um quiz de `count` questões para a disciplina informada (número, slug ou nome). */
export async function generateQuiz(input: string, count = 3): Promise<Quiz> {
  const disciplina = await resolveDisciplina(input);
  if (!disciplina) {
    throw new Error(
      `Disciplina "${input}" não encontrada. Use o número (ex: 4), o slug (ex: disciplina-04-agentes) ou o nome completo.`,
    );
  }

  const context = await loadDisciplinaContext(disciplina.dir);
  const llm = getLLM(0.4);

  const result = await llm.invoke([
    {
      role: 'system',
      content: `Você é o Holocron, tutor do curso de Engenharia de IA Aplicada.
Gere um quiz de ${count} questões de múltipla escolha para a disciplina "${disciplina.name}".
Cada questão deve ter exatamente 4 alternativas e 1 única correta.

Responda APENAS com um JSON válido (array), sem texto extra, no formato:
[{"statement": "enunciado", "options": ["a","b","c","d"], "answerIndex": 0, "explanation": "por que a correta está certa"}]

Regras:
- Baseie-se EXCLUSIVAMENTE no conteúdo fornecido.
- Nível intermediário; misture conceito e aplicação prática.
- "answerIndex" é o índice (0-3) da alternativa correta.`,
    },
    { role: 'user', content: `Conteúdo da disciplina:\n\n${context}` },
  ]);

  const text = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
  const parsed = extractJson(text) as QuizQuestion[];

  const questions = parsed.filter(
    q =>
      q &&
      typeof q.statement === 'string' &&
      Array.isArray(q.options) &&
      q.options.length >= 2 &&
      Number.isInteger(q.answerIndex) &&
      q.answerIndex >= 0 &&
      q.answerIndex < q.options.length,
  );

  if (questions.length === 0) throw new Error('Não foi possível gerar o quiz (formato inválido).');

  return { disciplina: disciplina.name, questions };
}
