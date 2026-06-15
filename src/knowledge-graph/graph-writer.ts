import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { CreateNodeInput, GraphArea } from './types.js';
import { KNOWLEDGE_GRAPH_PATH, GRAPH_AREAS } from './types.js';
import { getAllNodes } from './graph-reader.js';

const DOCS_PATH = path.resolve(process.cwd(), KNOWLEDGE_GRAPH_PATH);

/**
 * Cria (ou sobrescreve) um nó no Knowledge Graph.
 * Gera Markdown com front matter YAML + seções estruturadas.
 * Idempotente: criar mesmo nó 2x sobrescreve.
 */
export async function createNode(data: CreateNodeInput): Promise<string> {
  // Auto-bootstrap do diretório
  if (!fs.existsSync(DOCS_PATH)) {
    fs.mkdirSync(DOCS_PATH, { recursive: true });
  }

  const filePath = path.join(DOCS_PATH, `${data.slug}.md`);
  const today = new Date().toISOString().split('T')[0];

  const frontMatter = {
    titulo: data.titulo,
    tags: data.tags,
    fonte: 'Sessão socrática — Holocron AI Engineer',
    confiabilidade: 'alta' as const,
    data: today,
    ring: data.ring,
    area: data.area,
    status: 'explored' as const,
    prerequisitos: data.prerequisitos || [],
    connections: data.content.connections,
  };

  let body = `# ${data.titulo}\n\n`;
  body += `## O que é\n\n${data.content.explanation}\n\n`;
  body += `## Por que importa\n\n${data.content.relevance}\n\n`;

  // Conceitos-chave com wikilinks
  body += `## Conceitos-chave\n\n`;
  for (const concept of data.content.keyConcepts) {
    body += `- [[${concept}]]\n`;
  }
  body += '\n';

  // Seções específicas por Ring
  if (data.ring === 1) {
    // Ring 1: Landscape de Ferramentas
    if (data.content.tools && data.content.tools.length > 0) {
      body += `## Landscape de Ferramentas\n\n`;
      body += `| Ferramenta | Uso | Categoria |\n`;
      body += `|------------|-----|----------|\n`;
      for (const tool of data.content.tools) {
        body += `| ${tool.name} | ${tool.use} | ${tool.category || '-'} |\n`;
      }
      body += '\n';
    }
  } else if (data.ring === 2) {
    // Ring 2: Casos de uso + Quick Start + Alternativas
    if (data.content.tools && data.content.tools.length > 0) {
      body += `## Casos de uso\n\n`;
      for (const tool of data.content.tools) {
        body += `- ${tool.use}\n`;
      }
      body += '\n';
    }

    if (data.content.quickStart) {
      body += `## Como começar (Quick Start)\n\n${data.content.quickStart}\n\n`;
    }

    if (data.content.alternatives && data.content.alternatives.length > 0) {
      body += `## Alternativas\n\n`;
      body += `| Alternativa | Quando preferir |\n`;
      body += `|-------------|----------------|\n`;
      for (const alt of data.content.alternatives) {
        body += `| ${alt.name} | ${alt.whenToUse} |\n`;
      }
      body += '\n';
    }
  }

  // Conexões com o Mundo Real
  body += `## Conexões com o Mundo Real\n\n${data.content.realWorld}\n\n`;

  // Insights do usuário (se houver)
  if (data.content.userInsights) {
    body += `## Meus Insights\n\n${data.content.userInsights}\n\n`;
  }

  // Fontes
  body += `## Fontes para Aprofundamento\n\n`;
  for (const source of data.content.sources) {
    body += `- [${source.title}](${source.url}) — confiabilidade: ${source.reliability}\n`;
  }
  body += '\n';

  // Conexões (wikilinks)
  body += `## Conexões\n\n`;
  body += `- Pai: [[ia]]\n`;
  for (const conn of data.content.connections) {
    body += `- [[${conn}]]\n`;
  }
  body += '\n';

  const markdown = matter.stringify(body, frontMatter);
  fs.writeFileSync(filePath, markdown, 'utf-8');

  return filePath;
}

/**
 * Atualiza o Central Node (ia.md) adicionando wikilink para um novo nó Ring 1.
 * Encontra a seção da área correta e adiciona se não existir.
 */
export async function updateCentralNode(newNodeSlug: string, area: GraphArea): Promise<void> {
  const centralPath = path.join(DOCS_PATH, 'ia.md');
  if (!fs.existsSync(centralPath)) return;

  let content = fs.readFileSync(centralPath, 'utf-8');
  const wikilink = `[[${newNodeSlug}]]`;

  // Se já existe, não duplica
  if (content.includes(wikilink)) return;

  // Encontra a seção da área e adiciona o wikilink
  const areaLabel = GRAPH_AREAS[area];
  const sectionHeader = `## ${areaLabel}`;

  const headerIndex = content.indexOf(sectionHeader);
  if (headerIndex === -1) return;

  // Encontra próxima seção ## depois da atual
  const afterHeader = content.indexOf('\n## ', headerIndex + sectionHeader.length);
  const insertPoint = afterHeader !== -1 ? afterHeader : content.length;

  // Insere antes da próxima seção
  const beforeInsert = content.slice(0, insertPoint);
  const afterInsert = content.slice(insertPoint);

  content = beforeInsert + `- ${wikilink}\n` + afterInsert;
  fs.writeFileSync(centralPath, content, 'utf-8');
}

/**
 * Regenera o _index.md com base nos nós reais no filesystem.
 */
export async function updateIndex(): Promise<void> {
  const indexPath = path.join(DOCS_PATH, '_index.md');
  const allNodes = await getAllNodes();

  const ring1 = allNodes.filter(n => n.ring === 1);
  const ring2 = allNodes.filter(n => n.ring === 2);

  // Agrupa Ring 1 por área
  const ring1ByArea = new Map<string, typeof ring1>();
  for (const node of ring1) {
    const existing = ring1ByArea.get(node.area) || [];
    existing.push(node);
    ring1ByArea.set(node.area, existing);
  }

  let body = `# 📋 Índice do Knowledge Graph\n\n`;
  body += `## Ring 0 — Central\n\n`;
  body += `| Nó | Status |\n|----|--------|\n`;
  body += `| [[ia]] | ✅ explored |\n\n`;

  body += `## Ring 1 — Áreas Principais\n\n`;

  for (const [area, label] of Object.entries(GRAPH_AREAS)) {
    if (area === 'central') continue;
    const nodes = ring1ByArea.get(area) || [];
    if (nodes.length === 0) continue;

    body += `### ${label}\n`;
    body += `| Nó | Status |\n|----|--------|\n`;
    for (const node of nodes) {
      const icon = statusIcon(node.status);
      body += `| [[${node.slug}]] | ${icon} ${node.status} |\n`;
    }
    body += '\n';
  }

  if (ring2.length > 0) {
    body += `## Ring 2 — Ferramentas & Tecnologias\n\n`;
    body += `| Nó | Área | Status |\n|----|------|--------|\n`;
    for (const node of ring2) {
      const icon = statusIcon(node.status);
      body += `| [[${node.slug}]] | ${node.area} | ${icon} ${node.status} |\n`;
    }
    body += '\n';
  }

  const exploredCount = allNodes.filter(n => n.status === 'explored').length;
  body += `---\n\n`;
  body += `**Total Ring 1:** ${ring1.length} nós | **Ring 2:** ${ring2.length} nós | **Explorados:** ${exploredCount} | **Progresso:** ${allNodes.length > 0 ? Math.round((exploredCount / allNodes.length) * 100) : 0}%\n`;

  const markdown = matter.stringify(body, {
    titulo: 'Índice do Knowledge Graph',
    data: new Date().toISOString().split('T')[0],
  });

  fs.writeFileSync(indexPath, markdown, 'utf-8');
}

function statusIcon(status: string): string {
  switch (status) {
    case 'explored': return '✅';
    case 'in-progress': return '🔄';
    case 'pending': return '⏳';
    case 'stub': return '📝';
    default: return '⏳';
  }
}
