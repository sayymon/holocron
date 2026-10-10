import 'dotenv/config';
import path from 'path';
import { indexDocuments, semanticSearch, hybridSearch } from './rag/index.js';
import { runTutor, generateQuiz } from './agents/index.js';
import { getProgress, summarize, updateProgress, type ProgressStatus } from './mcp/progress-store.js';
import pool from './db/client.js';

const [,, command, ...args] = process.argv;
const STATUSES = ['not_started', 'in_progress', 'completed'] as const;

function statusIcon(status: string): string {
  return status === 'completed' ? '✅' : status === 'in_progress' ? '🟡' : '⬜';
}

/** Aceita "9", "9 10", "9,10" e ranges "9-12". */
function parseModulos(tokens: string[]): number[] {
  const out = new Set<number>();
  for (const token of tokens) {
    for (const part of token.split(',')) {
      const p = part.trim();
      if (!p) continue;
      const range = p.match(/^(\d+)-(\d+)$/);
      if (range) {
        const a = parseInt(range[1], 10);
        const b = parseInt(range[2], 10);
        for (let i = Math.min(a, b); i <= Math.max(a, b); i++) out.add(i);
      } else if (/^\d+$/.test(p)) {
        out.add(parseInt(p, 10));
      } else {
        throw new Error(`Módulo inválido: "${p}"`);
      }
    }
  }
  return [...out].sort((a, b) => a - b);
}

async function writeProgress(rawArgs: string[]) {
  const scoreIdx = rawArgs.indexOf('--score');
  let score: number | undefined;
  let tokens = rawArgs;

  if (scoreIdx !== -1) {
    score = Number(rawArgs[scoreIdx + 1]);
    if (!Number.isInteger(score) || score < 0 || score > 100) {
      console.error('❌ --score deve ser um inteiro entre 0 e 100.');
      process.exit(1);
    }
    tokens = rawArgs.filter((_, i) => i !== scoreIdx && i !== scoreIdx + 1);
  }

  const statusIdx = tokens.findIndex(t => (STATUSES as readonly string[]).includes(t.toLowerCase()));
  if (statusIdx < 1 || statusIdx === tokens.length - 1) {
    console.error('Usage: holocron progress <disciplina> <status> <modulo...> [--score N]');
    console.error('  status:  not_started | in_progress | completed');
    console.error('  modulos: ex. "9 10" | "9,10" | range "9-12"');
    process.exit(1);
  }

  const disciplina = tokens.slice(0, statusIdx).join(' ');
  const status = tokens[statusIdx].toLowerCase() as ProgressStatus;
  const modulos = parseModulos(tokens.slice(statusIdx + 1));

  try {
    for (const modulo of modulos) {
      const row = await updateProgress({ disciplina, modulo, status, score });
      const s = row.score != null ? ` (score: ${row.score})` : '';
      console.log(`${statusIcon(row.status)} ${row.disciplina} — módulo ${row.modulo}: ${row.status}${s}`);
    }
  } catch (err) {
    throw new Error(
      `Não foi possível salvar o progresso. O banco está rodando? (npm run db:up)\n${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

async function showStatus(disciplina?: string) {
  const rows = await getProgress(disciplina);
  if (rows.length === 0) {
    console.log('📭 Nenhum progresso registrado ainda.');
    return;
  }

  const summary = summarize(rows);
  console.log('# 📊 Progresso\n');
  for (const d of summary) {
    const extra = d.inProgress ? `, ${d.inProgress} em andamento` : '';
    console.log(`- ${d.disciplina}: ${d.percent}% (${d.completed}/${d.modulos} módulos concluídos${extra})`);
  }

  if (disciplina) {
    console.log(`\nDetalhe — ${summary[0].disciplina}:`);
    for (const r of summary[0].rows) {
      const score = r.score != null ? ` (${r.score})` : '';
      console.log(`  ${statusIcon(r.status)} módulo ${r.modulo}: ${r.status}${score}`);
    }
  }
}

async function showQuiz(raw: string) {
  const match = raw.match(/^(.*?)\s+(\d+)$/);
  const input = (match ? match[1] : raw).trim();
  const count = match ? parseInt(match[2], 10) : 3;

  if (!input) { console.error('Usage: holocron quiz <disciplina> [n]'); process.exit(1); }

  console.log(`🔮 Gerando quiz — "${input}" (${count} questões)...\n`);
  const quiz = await generateQuiz(input, count);

  quiz.questions.forEach((q, i) => {
    console.log(`**${i + 1}. ${q.statement}**`);
    q.options.forEach((opt, j) => console.log(`   ${String.fromCharCode(97 + j)}) ${opt}`));
    console.log('');
  });

  console.log('---\n\n## Gabarito\n');
  quiz.questions.forEach((q, i) => {
    const letter = String.fromCharCode(97 + q.answerIndex);
    console.log(`${i + 1}. ${letter}) ${q.options[q.answerIndex]}`);
    if (q.explanation) console.log(`   💡 ${q.explanation}`);
  });
}

async function main() {
  switch (command) {
    case 'index': {
      const docsPath = args[0] || path.resolve(process.cwd(), 'docs');
      console.log(`Indexing documents from: ${docsPath}`);
      const count = await indexDocuments(docsPath);
      console.log(`✅ Indexed ${count} chunks`);
      break;
    }
    case 'search': {
      const query = args.join(' ');
      if (!query) { console.error('Usage: holocron search <query>'); process.exit(1); }
      console.log(`🔍 Searching: "${query}"\n`);
      const results = await semanticSearch(query);
      for (const r of results) {
        console.log(`[${r.score.toFixed(3)}] ${r.documentPath}`);
        console.log(`  ${r.content.slice(0, 150).replace(/\n/g, ' ')}...\n`);
      }
      break;
    }
    case 'hybrid': {
      const query = args.join(' ');
      if (!query) { console.error('Usage: holocron hybrid <query>'); process.exit(1); }
      console.log(`🔍 Hybrid search: "${query}"\n`);
      const results = await hybridSearch(query);
      for (const r of results) {
        console.log(`[${r.score.toFixed(3)}] ${r.documentPath}`);
        console.log(`  ${r.content.slice(0, 150).replace(/\n/g, ' ')}...\n`);
      }
      break;
    }
    case 'ask': {
      const question = args.join(' ');
      if (!question) { console.error('Usage: holocron ask <pergunta>'); process.exit(1); }
      console.log(`🔮 Holocron pensando...\n`);
      const answer = await runTutor(question);
      console.log(answer);
      break;
    }
    case 'quiz': {
      await showQuiz(args.join(' ').trim());
      break;
    }
    case 'status': {
      await showStatus(args.join(' ').trim() || undefined);
      break;
    }
    case 'progress': {
      await writeProgress(args);
      break;
    }
    default:
      console.log(`Holocron CLI
  
  Commands:
    index [path]                       Index documents from path (default: ./docs)
    search <query>                     Semantic search
    hybrid <query>                     Hybrid search (semantic + keyword)
    ask <question>                     Ask the tutor (RAG + LLM)
    quiz <disciplina> [n]              Generate an adaptive quiz (default: 3 questions)
    status [disciplina]                Show study progress
    progress <disciplina> <status> <modulo...> [--score N]   Update progress
                                       status: not_started | in_progress | completed`);
  }

  await pool.end();
}

main().catch(e => {
  console.error(`❌ ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
