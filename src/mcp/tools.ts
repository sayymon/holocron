import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { hybridSearch } from '../rag/index.js';
import { runTutor } from '../agents/index.js';
import { createTask, getTask, cleanOldTasks } from './task-store.js';
import { updateProgress, getProgress, summarize } from './progress-store.js';

const DOCS_PATH = path.resolve(process.cwd(), 'docs');

export function registerTools(server: McpServer) {

  // --- search_content ---
  // Dispara busca semântica em background e retorna task_id imediatamente.
  // Use get_task_result para obter o resultado.
  server.tool(
    'search_content',
    'Busca semântica no conteúdo do curso de Engenharia de IA Aplicada. Use para encontrar conceitos, explicações e exemplos. Retorna um task_id — use get_task_result para obter o resultado.',
    { query: z.string().describe('Pergunta ou termos de busca'), limit: z.number().optional().describe('Número de resultados (default: 5)') },
    async ({ query, limit }) => {
      cleanOldTasks();

      const task = createTask(async () => {
        const results = await hybridSearch(query, limit || 5);
        return results.map((r, i) =>
          `[${i + 1}] ${r.documentPath} (score: ${r.score.toFixed(3)})\n${r.content.slice(0, 500)}`
        ).join('\n\n---\n\n') || 'Nenhum resultado encontrado.';
      });

      return {
        content: [{
          type: 'text',
          text: `🔍 Busca iniciada. Use get_task_result com task_id="${task.id}" para obter os resultados.`
        }]
      };
    }
  );

  // --- ask_tutor ---
  // Dispara pergunta ao tutor em background e retorna task_id imediatamente.
  server.tool(
    'ask_tutor',
    'Faz uma pergunta ao tutor do curso. Ele busca na base de conhecimento e responde de forma socrática. Retorna um task_id — use get_task_result para obter a resposta.',
    { question: z.string().describe('Pergunta sobre o conteúdo do curso') },
    async ({ question }) => {
      cleanOldTasks();

      const task = createTask(async () => {
        return await runTutor(question);
      });

      return {
        content: [{
          type: 'text',
          text: `🧠 Tutor processando sua pergunta. Use get_task_result com task_id="${task.id}" para obter a resposta.`
        }]
      };
    }
  );

  // --- get_task_result ---
  // Polling: retorna resultado de uma task assíncrona.
  server.tool(
    'get_task_result',
    'Obtém o resultado de uma busca ou pergunta ao tutor. Passe o task_id retornado por search_content ou ask_tutor.',
    { task_id: z.string().describe('ID da task retornado por search_content ou ask_tutor') },
    async ({ task_id }) => {
      const task = getTask(task_id);

      if (!task) {
        return { content: [{ type: 'text', text: `❌ Task "${task_id}" não encontrada. Pode ter expirado (TTL: 10min).` }] };
      }

      if (task.status === 'pending') {
        const elapsed = ((Date.now() - task.createdAt) / 1000).toFixed(1);
        return { content: [{ type: 'text', text: `⏳ Task "${task_id}" ainda em processamento (${elapsed}s). Tente novamente em alguns segundos.` }] };
      }

      if (task.status === 'error') {
        return { content: [{ type: 'text', text: `❌ Task "${task_id}" falhou: ${task.error}` }] };
      }

      const elapsed = ((task.completedAt! - task.createdAt) / 1000).toFixed(1);
      return { content: [{ type: 'text', text: `✅ Resultado (${elapsed}s):\n\n${task.result}` }] };
    }
  );

  // --- list_disciplinas ---
  server.tool(
    'list_disciplinas',
    'Lista as disciplinas do curso de Engenharia de IA Aplicada. Atenção: no curso, cada disciplina contém vários MÓDULOS internos — o nível superior se chama "disciplina", não "módulo".',
    {},
    async () => {
      const disciplinaDirs = await glob('curso/modulo-*', { cwd: DOCS_PATH });
      const sorted = disciplinaDirs.filter(d => fs.statSync(path.join(DOCS_PATH, d)).isDirectory()).sort();
      const disciplinas = sorted.map(dir => {
        const readmePath = path.join(DOCS_PATH, dir, 'README.md');
        if (fs.existsSync(readmePath)) {
          const { data } = matter(fs.readFileSync(readmePath, 'utf-8'));
          return `- **${data.titulo || dir}** (${dir})`;
        }
        return `- ${dir}`;
      });
      return { content: [{ type: 'text', text: `# Disciplinas do Curso\n\n${disciplinas.join('\n')}` }] };
    }
  );

  // --- get_disciplina ---
  server.tool(
    'get_disciplina',
    'Retorna o índice completo de uma disciplina (seus módulos, pré-requisitos, conexões). A pasta da disciplina é "curso/modulo-NN-<slug>".',
    { disciplina: z.string().describe('Disciplina: número (ex: "2") ou slug/nome (ex: "apis-prompt-eng", "APIs de IA Generativa")') },
    async ({ disciplina }) => {
      const allDirs = (await glob('curso/modulo-*', { cwd: DOCS_PATH }))
        .filter(d => fs.statSync(path.join(DOCS_PATH, d)).isDirectory())
        .sort();

      const needle = String(disciplina).trim().toLowerCase();
      let match = allDirs.find(d => d.toLowerCase().includes(needle));
      if (!match && /^\d+$/.test(needle)) {
        const num = needle.padStart(2, '0');
        match = allDirs.find(d => d.includes(`modulo-${num}`));
      }
      if (!match) return { content: [{ type: 'text', text: `Disciplina "${disciplina}" não encontrada.` }] };

      const readmePath = path.join(DOCS_PATH, match, 'README.md');
      if (!fs.existsSync(readmePath)) return { content: [{ type: 'text', text: `README da disciplina "${disciplina}" não encontrado.` }] };

      const content = fs.readFileSync(readmePath, 'utf-8');
      return { content: [{ type: 'text', text: content }] };
    }
  );

  // --- get_document ---
  server.tool(
    'get_document',
    'Retorna o conteúdo completo de um documento da Knowledge Base pelo caminho relativo.',
    { document_path: z.string().describe('Caminho relativo do documento (ex: curso/modulo-01-fundamentos/rag-embeddings-busca.md)') },
    async ({ document_path }) => {
      const fullPath = path.join(DOCS_PATH, document_path);
      if (!fs.existsSync(fullPath)) return { content: [{ type: 'text', text: `Documento não encontrado: ${document_path}` }] };

      const content = fs.readFileSync(fullPath, 'utf-8');
      return { content: [{ type: 'text', text: content }] };
    }
  );

  // --- update_progress ---
  // Escreve o progresso do aluno na tabela `progress` (Postgres). Idempotente.
  server.tool(
    'update_progress',
    'Registra ou atualiza o progresso do aluno em um MÓDULO de uma DISCIPLINA. Ex: disciplina="APIs de IA Generativa e Prompt Engineering", modulo=7. Idempotente — repetir o mesmo módulo atualiza em vez de duplicar. Requer banco Postgres rodando (npm run db:up && npm run db:migrate).',
    {
      disciplina: z.string().describe('Nome da disciplina (ex: "APIs de IA Generativa e Prompt Engineering")'),
      modulo: z.number().int().min(1).describe('Número do módulo dentro da disciplina (ex: 7)'),
      status: z.enum(['not_started', 'in_progress', 'completed']).describe('Status do módulo'),
      score: z.number().min(0).max(100).optional().describe('Nota/percentual (opcional)'),
    },
    async ({ disciplina, modulo, status, score }) => {
      try {
        const row = await updateProgress({ disciplina, modulo, status, score });
        const icon = status === 'completed' ? '✅' : status === 'in_progress' ? '🟡' : '⬜';
        return {
          content: [{
            type: 'text',
            text: `${icon} Progresso salvo — disciplina "${row.disciplina}", módulo ${row.modulo}: **${row.status}**` +
              (row.score != null ? ` (score: ${row.score})` : ''),
          }],
        };
      } catch (err) {
        return {
          content: [{
            type: 'text',
            text: `❌ Não foi possível salvar o progresso. O banco está rodando? (npm run db:up && npm run db:migrate)\n\n${err instanceof Error ? err.message : String(err)}`,
          }],
        };
      }
    }
  );

  // --- get_progress ---
  // Lê o progresso registrado e resume por disciplina.
  server.tool(
    'get_progress',
    'Consulta o progresso do aluno. Sem parâmetros, resume todas as disciplinas com percentual. Com disciplina, detalha os módulos daquela disciplina.',
    { disciplina: z.string().optional().describe('Disciplina específica (nome); omita para resumo geral') },
    async ({ disciplina }) => {
      try {
        const rows = await getProgress(disciplina);
        if (rows.length === 0) {
          return { content: [{ type: 'text', text: '📭 Nenhum progresso registrado ainda. Use update_progress para começar.' }] };
        }

        const summary = summarize(rows);
        const lines = summary.map(d =>
          `- **${d.disciplina}**: ${d.percent}% ` +
          `(${d.completed}/${d.modulos} módulos concluídos${d.inProgress ? `, ${d.inProgress} em andamento` : ''})`
        );

        let text = `# 📊 Progresso\n\n${lines.join('\n')}`;

        if (disciplina) {
          const detail = summary[0].rows
            .map(r => {
              const icon = r.status === 'completed' ? '✅' : r.status === 'in_progress' ? '🟡' : '⬜';
              return `  ${icon} módulo ${r.modulo}: ${r.status}${r.score != null ? ` (${r.score})` : ''}`;
            })
            .join('\n');
          text += `\n\n**Detalhe — ${summary[0].disciplina}:**\n${detail}`;
        }

        return { content: [{ type: 'text', text }] };
      } catch (err) {
        return {
          content: [{
            type: 'text',
            text: `❌ Não foi possível ler o progresso. O banco está rodando? (npm run db:up && npm run db:migrate)\n\n${err instanceof Error ? err.message : String(err)}`,
          }],
        };
      }
    }
  );
}
