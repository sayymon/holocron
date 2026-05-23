import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { hybridSearch } from '../rag/index.js';
import { runTutor } from '../agents/index.js';
import { createTask, getTask, cleanOldTasks } from './task-store.js';

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

  // --- list_modules ---
  server.tool(
    'list_modules',
    'Lista todos os 12 módulos do curso de Engenharia de IA Aplicada.',
    {},
    async () => {
      const moduleDirs = await glob('curso/modulo-*', { cwd: DOCS_PATH });
      const sorted = moduleDirs.filter(d => fs.statSync(path.join(DOCS_PATH, d)).isDirectory()).sort();
      const modules = sorted.map(dir => {
        const readmePath = path.join(DOCS_PATH, dir, 'README.md');
        if (fs.existsSync(readmePath)) {
          const { data } = matter(fs.readFileSync(readmePath, 'utf-8'));
          return `- **${data.titulo || dir}** (${dir})`;
        }
        return `- ${dir}`;
      });
      return { content: [{ type: 'text', text: `# Módulos do Curso\n\n${modules.join('\n')}` }] };
    }
  );

  // --- get_module ---
  server.tool(
    'get_module',
    'Retorna o índice completo de um módulo específico (unidades, pré-requisitos, conexões).',
    { module_number: z.number().min(1).max(12).describe('Número do módulo (1-12)') },
    async ({ module_number }) => {
      const pattern = `curso/modulo-${String(module_number).padStart(2, '0')}-*`;
      const dirs = await glob(pattern, { cwd: DOCS_PATH });
      const filtered = dirs.filter(d => fs.statSync(path.join(DOCS_PATH, d)).isDirectory());
      if (filtered.length === 0) return { content: [{ type: 'text', text: `Módulo ${module_number} não encontrado.` }] };

      const readmePath = path.join(DOCS_PATH, filtered[0], 'README.md');
      if (!fs.existsSync(readmePath)) return { content: [{ type: 'text', text: `README do módulo ${module_number} não encontrado.` }] };

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
}
