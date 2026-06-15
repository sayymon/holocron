import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { createTask, cleanOldTasks } from './task-store.js';
import { runGraphNavigator } from '../agents/graph-navigator.js';
import { getAllNodes, getNodesByStatus, getNodesByArea } from '../knowledge-graph/graph-reader.js';
import { createNode, updateCentralNode, updateIndex } from '../knowledge-graph/graph-writer.js';
import {
  readExplorationState,
  markNodeExplored,
  updateSuggestions,
} from '../knowledge-graph/state-manager.js';
import { suggestNextTopics } from '../knowledge-graph/topology.js';
import type { GraphArea, CreateNodeInput } from '../knowledge-graph/types.js';

/**
 * Registra as MCP tools do Knowledge Graph no server.
 */
export function registerGraphTools(server: McpServer) {

  // --- explore_topic (async) ---
  server.tool(
    'explore_topic',
    'Inicia uma sessão socrática sobre um tópico de IA. Retorna explicação + perguntas guia + sugestões de próximos tópicos. Use get_task_result para obter o resultado.',
    {
      topic: z.string().describe('Tópico a explorar (kebab-case, ex: machine-learning)'),
      context: z.string().optional().describe('Resposta/contexto do usuário para continuar diálogo'),
    },
    async ({ topic, context }) => {
      cleanOldTasks();

      const task = createTask(async () => {
        return await runGraphNavigator(topic, context);
      });

      return {
        content: [{
          type: 'text',
          text: `🧭 Explorando "${topic}"... Use get_task_result com task_id="${task.id}" para obter a explicação socrática.`,
        }],
      };
    }
  );


  // --- crystallize_node (sync) ---
  server.tool(
    'crystallize_node',
    'Cristaliza um tópico explorado como nó permanente no Knowledge Graph. Cria o documento Markdown, atualiza o estado e o índice.',
    {
      slug: z.string().describe('Nome do nó em kebab-case (ex: machine-learning)'),
      titulo: z.string().describe('Título do nó em português'),
      ring: z.number().min(1).max(2).describe('Ring do nó (1 = área principal, 2 = ferramenta/tecnologia)'),
      area: z.string().describe('Área pai (ex: foundations, learning-paradigms, application-domains)'),
      tags: z.array(z.string()).describe('Tags para busca'),
      explanation: z.string().describe('Explicação do conceito (O que é)'),
      relevance: z.string().describe('Por que importa para um AI Engineer'),
      keyConcepts: z.array(z.string()).describe('Conceitos-chave como slugs para wikilinks'),
      tools: z.array(z.object({
        name: z.string(),
        use: z.string(),
        category: z.string().optional(),
      })).optional().describe('Ferramentas relacionadas'),
      sources: z.array(z.object({
        title: z.string(),
        url: z.string(),
        reliability: z.enum(['alta', 'media', 'baixa']),
      })).describe('Fontes de informação'),
      connections: z.array(z.string()).describe('Slugs de nós conectados'),
      realWorld: z.string().describe('Aplicações no mundo real'),
      quickStart: z.string().optional().describe('Quick start para Ring 2'),
      userInsights: z.string().optional().describe('Insights pessoais do estudante'),
    },
    async (params) => {
      try {
        const input: CreateNodeInput = {
          slug: params.slug,
          titulo: params.titulo,
          ring: params.ring as 1 | 2,
          area: params.area as GraphArea,
          tags: params.tags,
          content: {
            explanation: params.explanation,
            relevance: params.relevance,
            keyConcepts: params.keyConcepts,
            tools: params.tools,
            sources: params.sources,
            connections: params.connections,
            realWorld: params.realWorld,
            quickStart: params.quickStart,
            userInsights: params.userInsights,
          },
        };

        // 1. Cria o nó
        const filePath = await createNode(input);

        // 2. Marca como explorado
        await markNodeExplored(params.slug);

        // 3. Atualiza Central Node se Ring 1
        if (params.ring === 1) {
          await updateCentralNode(params.slug, params.area as GraphArea);
        }

        // 4. Regenera índice
        await updateIndex();

        // 5. Lê estado atualizado para feedback
        const state = await readExplorationState();

        return {
          content: [{
            type: 'text',
            text: `✅ Nó [[${params.slug}]] cristalizado com sucesso!\n\n` +
              `📁 Arquivo: ${filePath}\n` +
              `📊 Progresso: Ring 1: ${state.ring1Progress.explored}/${state.ring1Progress.total} | ` +
              `Ring 2: ${state.ring2Progress.explored}/${state.ring2Progress.total} | ` +
              `Total: ${state.explored}/${state.totalNodes}`,
          }],
        };
      } catch (err) {
        return {
          content: [{
            type: 'text',
            text: `❌ Erro ao cristalizar: ${err instanceof Error ? err.message : String(err)}`,
          }],
        };
      }
    }
  );


  // --- get_exploration_state (sync) ---
  server.tool(
    'get_exploration_state',
    'Retorna o estado atual de exploração do Knowledge Graph: progresso, últimas sessões, próximos sugeridos.',
    {},
    async () => {
      const state = await readExplorationState();

      const pct = (n: number, t: number) => t === 0 ? '0%' : `${Math.round((n / t) * 100)}%`;

      let text = `# 📊 Estado de Exploração\n\n`;
      text += `| Métrica | Valor |\n|---------|-------|\n`;
      text += `| Ring 1 | ${state.ring1Progress.explored}/${state.ring1Progress.total} (${pct(state.ring1Progress.explored, state.ring1Progress.total)}) |\n`;
      text += `| Ring 2 | ${state.ring2Progress.explored}/${state.ring2Progress.total} (${pct(state.ring2Progress.explored, state.ring2Progress.total)}) |\n`;
      text += `| Total | ${state.explored}/${state.totalNodes} (${pct(state.explored, state.totalNodes)}) |\n`;
      text += `| Em progresso | ${state.inProgress} |\n`;
      text += `| Última sessão | ${state.ultimaSessao || 'nenhuma'} |\n\n`;

      if (state.recentSessions.length > 0) {
        text += `## Últimas Sessões\n\n`;
        for (const s of state.recentSessions.slice(0, 5)) {
          const icon = s.status === 'explored' ? '✅' : '🔄';
          text += `- ${icon} [[${s.topic}]] (${s.data})\n`;
        }
        text += '\n';
      }

      if (state.nextSuggested.length > 0) {
        text += `## Próximos Sugeridos\n\n`;
        for (const s of state.nextSuggested) {
          text += `- [[${s.topic}]] — ${s.reason}\n`;
        }
      }

      return { content: [{ type: 'text', text }] };
    }
  );

  // --- suggest_next_topics (sync) ---
  server.tool(
    'suggest_next_topics',
    'Sugere 2-3 próximos tópicos a explorar baseado no estado atual e topologia do grafo.',
    {
      current_topic: z.string().optional().describe('Tópico atual para basear sugestões em adjacência'),
    },
    async ({ current_topic }) => {
      const state = await readExplorationState();
      const allNodes = await getAllNodes();
      const suggestions = suggestNextTopics(current_topic, state, allNodes);

      if (suggestions.length === 0) {
        return {
          content: [{
            type: 'text',
            text: '🎉 Parabéns! Todos os nós do grafo foram explorados! Considere adicionar Ring 2 (ferramentas específicas) aos tópicos que você domina.',
          }],
        };
      }

      // Atualiza sugestões no estado
      await updateSuggestions(suggestions);

      let text = `## 🧭 Próximos Tópicos Sugeridos\n\n`;
      for (let i = 0; i < suggestions.length; i++) {
        const s = suggestions[i];
        text += `${i + 1}. **[[${s.topic}]]** (Ring ${s.ring}, ${s.area})\n`;
        text += `   ${s.reason}\n\n`;
      }

      return { content: [{ type: 'text', text }] };
    }
  );

  // --- list_graph_nodes (sync) ---
  server.tool(
    'list_graph_nodes',
    'Lista os nós do Knowledge Graph com filtros opcionais por status e área.',
    {
      filter: z.enum(['all', 'explored', 'pending', 'in-progress', 'stub']).optional()
        .describe('Filtrar por status (default: all)'),
      area: z.string().optional().describe('Filtrar por área (ex: foundations)'),
    },
    async ({ filter, area }) => {
      let nodes = await getAllNodes();

      if (filter && filter !== 'all') {
        nodes = nodes.filter(n => n.status === filter);
      }
      if (area) {
        nodes = nodes.filter(n => n.area === area);
      }

      if (nodes.length === 0) {
        return { content: [{ type: 'text', text: 'Nenhum nó encontrado com os filtros aplicados.' }] };
      }

      let text = `# Knowledge Graph — ${nodes.length} nós\n\n`;
      text += `| Nó | Ring | Área | Status |\n`;
      text += `|----|------|------|--------|\n`;
      for (const node of nodes.sort((a, b) => a.ring - b.ring || a.area.localeCompare(b.area))) {
        const icon = node.status === 'explored' ? '✅' : node.status === 'in-progress' ? '🔄' : '⏳';
        text += `| [[${node.slug}]] | ${node.ring} | ${node.area} | ${icon} ${node.status} |\n`;
      }

      return { content: [{ type: 'text', text }] };
    }
  );
}
