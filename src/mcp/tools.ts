import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { semanticSearch, hybridSearch } from '../rag/index.js';
import { runTutor } from '../agents/index.js';

const DOCS_PATH = path.resolve(process.cwd(), 'docs');

export function registerTools(server: McpServer) {

  // --- search_content ---
  server.tool(
    'search_content',
    'Busca semântica no conteúdo do curso de Engenharia de IA Aplicada. Use para encontrar conceitos, explicações e exemplos.',
    { query: z.string().describe('Pergunta ou termos de busca'), limit: z.number().optional().describe('Número de resultados (default: 5)') },
    async ({ query, limit }) => {
      const results = await hybridSearch(query, limit || 5);
      const text = results.map((r, i) =>
        `[${i + 1}] ${r.documentPath} (score: ${r.score.toFixed(3)})\n${r.content.slice(0, 500)}`
      ).join('\n\n---\n\n');
      return { content: [{ type: 'text', text: text || 'Nenhum resultado encontrado.' }] };
    }
  );

  // --- list_modules ---
  server.tool(
    'list_modules',
    'Lista todos os 12 módulos do curso de Engenharia de IA Aplicada.',
    {},
    async () => {
      const moduleDirs = await glob('curso/modulo-*', { cwd: DOCS_PATH, onlyDirectories: true });
      const modules = moduleDirs.sort().map(dir => {
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
      const dirs = await glob(pattern, { cwd: DOCS_PATH, onlyDirectories: true });
      if (dirs.length === 0) return { content: [{ type: 'text', text: `Módulo ${module_number} não encontrado.` }] };

      const readmePath = path.join(DOCS_PATH, dirs[0], 'README.md');
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

  // --- ask_tutor ---
  server.tool(
    'ask_tutor',
    'Faz uma pergunta ao tutor do curso. Ele busca na base de conhecimento e responde de forma socrática, desafiando o aluno a pensar.',
    { question: z.string().describe('Pergunta sobre o conteúdo do curso') },
    async ({ question }) => {
      const answer = await runTutor(question);
      return { content: [{ type: 'text', text: answer }] };
    }
  );
}
