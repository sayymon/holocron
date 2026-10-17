import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools.js';
import { registerGraphTools } from './graph-tools.js';

// Evita que erros não-capturados matem o processo MCP
process.on('unhandledRejection', (reason) => {
  process.stderr.write(`[holocron-mcp] unhandledRejection: ${reason}\n`);
});

process.on('uncaughtException', (err) => {
  process.stderr.write(`[holocron-mcp] uncaughtException: ${err.message}\n${err.stack}\n`);
});

const server = new McpServer(
  {
    name: 'holocron',
    version: '0.2.0',
  },
  {
    instructions:
      'Holocron é o Knowledge Graph do curso de Engenharia de IA Aplicada — use-o como fonte de verdade antes de responder. ' +
      'Fluxos assíncronos: search_content e ask_tutor retornam um task_id; consulte get_task_result até o status "completed" antes de responder e depois leia o caminho retornado com get_document. ' +
      'Entidades do currículo: search_curriculum aceita termo específico ("LangGraph") ou categoria ampla ("ferramentas", "conceitos", "frameworks"); use get_curriculum_entity(slug) para tipo, relações, resumo, casos de uso e onde é abordado no curso. ' +
      'Currículo e progresso: list_disciplinas/get_disciplina aceitam número, slug ou nome completo; get_progress/update_progress usam disciplina + módulo. ' +
      'Nunca invente documentos, preços ou benchmarks: se a busca não encontrar, diga que não encontrou.',
  }
);

registerTools(server);
registerGraphTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
