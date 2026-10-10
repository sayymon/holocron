import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { hybridSearch } from '../rag/index.js';
import { runTutor } from '../agents/index.js';
import { createTask, getTask, cleanOldTasks } from './task-store.js';
import { updateProgress, getProgress, summarize } from './progress-store.js';
import {
  listDisciplinas,
  resolveDisciplina,
  listEntities,
  searchEntities,
  resolveEntity,
  whereTaught,
  matchCategory,
  categoryLabel,
  applyCategoryFilter,
  entitySummary,
} from './curriculum.js';

const DOCS_PATH = path.resolve(process.cwd(), 'docs');

async function renderDisciplinas(): Promise<string> {
  const disciplinas = await listDisciplinas();
  const lines = disciplinas.map(d => `- **${d.name}** (número ${d.numero}, slug: ${d.slug})`);
  return `# Disciplinas do Curso (${disciplinas.length})\n\n${lines.join('\n')}`;
}

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
      return { content: [{ type: 'text', text: await renderDisciplinas() }] };
    }
  );

  // --- list_modules (alias de compatibilidade) ---
  server.tool(
    'list_modules',
    'Compatibilidade: alias de list_disciplinas para clientes que ainda usam o nome antigo. O nível superior do curso é "disciplina", não "módulo".',
    {},
    async () => {
      return { content: [{ type: 'text', text: await renderDisciplinas() }] };
    }
  );

  // --- get_disciplina ---
  server.tool(
    'get_disciplina',
    'Retorna o índice completo de uma disciplina (seus módulos, pré-requisitos, conexões). Aceita número ("2"), slug ("apis-prompt-eng") ou nome completo ("APIs de IA Generativa e Prompt Engineering").',
    { disciplina: z.string().describe('Disciplina: número (ex: "2"), slug (ex: "apis-prompt-eng") ou nome (ex: "APIs de IA Generativa e Prompt Engineering")') },
    async ({ disciplina }) => {
      const match = await resolveDisciplina(disciplina);
      if (!match) return { content: [{ type: 'text', text: `Disciplina "${disciplina}" não encontrada. Tente o número (ex: 2) ou o nome completo.` }] };

      const readmePath = path.join(DOCS_PATH, match.dir, 'README.md');
      if (!fs.existsSync(readmePath)) return { content: [{ type: 'text', text: `README da disciplina "${disciplina}" não encontrado.` }] };

      const content = fs.readFileSync(readmePath, 'utf-8');
      return { content: [{ type: 'text', text: content }] };
    }
  );

  // --- get_module (alias de compatibilidade) ---
  server.tool(
    'get_module',
    'Compatibilidade: alias de get_disciplina. Espera o número da disciplina (1-12), que nos clientes antigos era chamado de módulo.',
    { module_number: z.number().int().min(1).max(12).describe('Número da disciplina (1-12)') },
    async ({ module_number }) => {
      const match = await resolveDisciplina(String(module_number));
      if (!match) return { content: [{ type: 'text', text: `Disciplina ${module_number} não encontrada.` }] };

      const readmePath = path.join(DOCS_PATH, match.dir, 'README.md');
      if (!fs.existsSync(readmePath)) return { content: [{ type: 'text', text: `README da disciplina ${module_number} não encontrado.` }] };

      return { content: [{ type: 'text', text: fs.readFileSync(readmePath, 'utf-8') }] };
    }
  );

  // --- get_document ---
  server.tool(
    'get_document',
    'Retorna o conteúdo completo de um documento da Knowledge Base pelo caminho relativo.',
    { document_path: z.string().describe('Caminho relativo do documento (ex: curso/disciplina-01-fundamentos/rag-embeddings-busca.md)') },
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

  // --- search_curriculum ---
  // Visão de entidades do currículo: ferramentas, frameworks, conceitos, provedores e padrões
  // registrados no Knowledge Graph, com as relações entre eles.
  server.tool(
    'search_curriculum',
    'Busca entidades do currículo (ferramentas, frameworks, provedores, conceitos, padrões) no Knowledge Graph. Aceita termo específico ("LangGraph", "RAG"), categoria ampla ("ferramentas", "conceitos", "frameworks", "providers", "padrões") ou o filtro explícito `categoria`.',
    {
      query: z.string().describe('Termo a buscar (ex: "LangGraph", "RAG", "ferramentas", "conceitos")'),
      categoria: z.string().optional().describe('Filtro por categoria: ferramenta, conceito, framework, provider, mcp server, infraestrutura, padrao, paradigma, llm, observabilidade'),
      limit: z.number().optional().describe('Qtd máxima de resultados (default: 8; em listagens por categoria: 40)'),
    },
    async ({ query, limit, categoria }) => {
      const entities = await listEntities();
      const cat = categoria ? matchCategory(categoria) : matchCategory(query);
      const broad = cat != null;
      const effectiveLimit = limit ?? (broad ? 40 : 8);
      const hits = searchEntities(entities, query, effectiveLimit, categoria);

      if (hits.length === 0) {
        const hint = broad ? ` (categoria "${categoryLabel(cat!)}")` : '';
        return { content: [{ type: 'text', text: `Nenhuma entidade encontrada para "${query}"${hint}.` }] };
      }

      const total = broad ? applyCategoryFilter(entities, cat!).length : hits.length;
      const header = broad
        ? `# 🗂️ ${categoryLabel(cat!)} (${total})`
        : `# 🔎 Entidades do currículo para "${query}"`;

      const lines = hits.map((e, i) =>
        `[${i + 1}] **${e.titulo}** — ${e.top} (${e.categoria})\n` +
        `    slug: ${e.slug} · tags: ${e.tags.slice(0, 6).join(', ') || '-'}\n` +
        `    caminho: ${e.caminho}`
      );

      const footer = broad
        ? `\nUse get_curriculum_entity("<slug>") para detalhes, relações e onde cada uma é abordada.`
        : `\nUse get_curriculum_entity("<slug>") para detalhes, relações e onde é abordado.`;

      return { content: [{ type: 'text', text: `${header}\n\n${lines.join('\n\n')}\n${footer}` }] };
    }
  );

  // --- get_curriculum_entity ---
  server.tool(
    'get_curriculum_entity',
    'Retorna os detalhes de uma entidade do currículo: tipo, resumo, casos de uso (do próprio doc), relações (conceitos/ferramentas conectados via wikilinks) e onde é abordado no curso (disciplina/módulo).',
    { name: z.string().describe('Slug ou nome da entidade (ex: "langgraph", "rag", "lora")') },
    async ({ name }) => {
      const entities = await listEntities();
      const e = resolveEntity(entities, name);
      if (!e) return { content: [{ type: 'text', text: `Entidade "${name}" não encontrada. Use search_curriculum para buscar.` }] };

      const taught = whereTaught(e.slug);
      const slugSet = new Set(entities.map(x => x.slug));
      const related = e.rel.filter(r => slugSet.has(r));
      const outros = e.rel.filter(r => !slugSet.has(r));
      const { definicao, usos } = entitySummary(e);

      const lines = [
        `**${e.titulo}**`,
        `- Tipo: ${e.top} (${e.categoria})`,
        `- Slug: ${e.slug}`,
        `- Tags: ${e.tags.join(', ') || '-'}`,
        `- Doc: ${e.caminho}`,
        '',
        `Resumo: ${definicao}`,
      ];

      if (usos.length > 0) {
        lines.push('\nCasos de uso / aplicações (do doc):');
        for (const u of usos) lines.push(`  - ${u}`);
      }

      if (related.length > 0) {
        lines.push('\nRelações (via wikilinks):');
        for (const slug of related) {
          const r = entities.find(x => x.slug === slug)!;
          lines.push(`  - ${r.titulo} (${r.top} / ${r.categoria})`);
        }
        if (outros.length > 0) lines.push(`  - outros links: ${outros.slice(0, 8).join(', ')}${outros.length > 8 ? '…' : ''}`);
      }

      if (taught.length > 0) {
        lines.push(`\nAbordado no curso (${taught.length} ${taught.length === 1 ? 'documento' : 'documentos'}):`);
        for (const t of taught.slice(0, 12)) {
          const onde = t.disciplina != null ? `disciplina ${t.disciplina}` : 'material técnico';
          const mod = t.modulo != null ? `, módulo ${t.modulo}` : '';
          lines.push(`  - ${onde}${mod} — ${t.caminho}`);
        }
        if (taught.length > 12) lines.push(`  - … e mais ${taught.length - 12} documento(s)`);
      } else {
        lines.push('\nNão encontrado explicitamente no conteúdo do curso.');
      }

      return { content: [{ type: 'text', text: `# 📚 ${e.titulo}\n\n${lines.join('\n')}` }] };
    }
  );
}
