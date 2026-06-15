import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import type { GraphNode, GraphArea, NodeStatus } from './types.js';
import { KNOWLEDGE_GRAPH_PATH } from './types.js';

const DOCS_PATH = path.resolve(process.cwd(), KNOWLEDGE_GRAPH_PATH);

/**
 * Parseia front matter de um arquivo Markdown em um GraphNode.
 * Retorna null se o front matter for inválido.
 */
function parseNodeFile(filePath: string): GraphNode | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    const slug = path.basename(filePath, '.md');

    if (!data.titulo || data.ring === undefined || !data.area || !data.status) {
      process.stderr.write(
        `[knowledge-graph] Warning: front matter inválido em ${filePath}\n`
      );
      return null;
    }

    return {
      slug,
      titulo: data.titulo,
      ring: data.ring,
      area: data.area,
      status: data.status,
      tags: data.tags || [],
      prerequisitos: data.prerequisitos || [],
      connections: data.connections || [],
      fonte: data.fonte || '',
      confiabilidade: data.confiabilidade || 'media',
      data: data.data || new Date().toISOString().split('T')[0],
    };
  } catch (err) {
    process.stderr.write(
      `[knowledge-graph] Error parsing ${filePath}: ${err instanceof Error ? err.message : err}\n`
    );
    return null;
  }
}

/**
 * Retorna todos os nós do Knowledge Graph.
 * Exclui arquivos prefixados com _ (metadados).
 */
export async function getAllNodes(): Promise<GraphNode[]> {
  if (!fs.existsSync(DOCS_PATH)) {
    return [];
  }

  const files = await glob('*.md', { cwd: DOCS_PATH });
  const nodeFiles = files.filter(f => !f.startsWith('_'));

  const nodes: GraphNode[] = [];
  for (const file of nodeFiles) {
    const node = parseNodeFile(path.join(DOCS_PATH, file));
    if (node) {
      nodes.push(node);
    }
  }

  return nodes;
}


/**
 * Busca um nó específico por slug.
 */
export async function getNodeBySlug(slug: string): Promise<GraphNode | null> {
  const filePath = path.join(DOCS_PATH, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return parseNodeFile(filePath);
}

/**
 * Retorna nós filtrados por área.
 */
export async function getNodesByArea(area: GraphArea): Promise<GraphNode[]> {
  const all = await getAllNodes();
  return all.filter(n => n.area === area);
}

/**
 * Retorna nós filtrados por status.
 */
export async function getNodesByStatus(status: NodeStatus): Promise<GraphNode[]> {
  const all = await getAllNodes();
  return all.filter(n => n.status === status);
}
