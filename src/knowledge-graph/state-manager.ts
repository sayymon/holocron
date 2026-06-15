import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ExplorationState, SessionEntry, SuggestionEntry } from './types.js';
import { KNOWLEDGE_GRAPH_PATH } from './types.js';
import { getAllNodes } from './graph-reader.js';

const DOCS_PATH = path.resolve(process.cwd(), KNOWLEDGE_GRAPH_PATH);
const STATE_FILE = path.join(DOCS_PATH, '_estado-exploracao.md');

/**
 * Bootstrap: cria o arquivo de estado vazio se não existir.
 */
function bootstrapStateFile(): void {
  if (!fs.existsSync(DOCS_PATH)) {
    fs.mkdirSync(DOCS_PATH, { recursive: true });
  }

  if (!fs.existsSync(STATE_FILE)) {
    const content = matter.stringify(
      `# Estado de Exploração do Knowledge Graph

## Progresso

| Métrica | Valor |
|---------|-------|
| Ring 1 explorados | 0/0 (0%) |
| Ring 2 explorados | 0/0 (0%) |
| Total | 0/0 (0%) |

## Últimas Sessões

| Data | Tópico | Status |
|------|--------|--------|

## Próximos Sugeridos

1. [[machine-learning]] — fundamento essencial de toda IA
2. [[deep-learning]] — base de LLMs e modelos modernos
3. [[nlp]] — domínio central para engenheiros de IA
`,
      {
        titulo: 'Estado de Exploração do Knowledge Graph',
        ultima_sessao: '',
        total_nodes: 0,
        explored: 0,
        in_progress: 0,
        pending: 0,
      }
    );
    fs.writeFileSync(STATE_FILE, content, 'utf-8');
  }
}


/**
 * Lê e parseia o estado de exploração.
 * Recalcula progresso a partir dos arquivos reais (source of truth = filesystem).
 */
export async function readExplorationState(): Promise<ExplorationState> {
  bootstrapStateFile();

  const allNodes = await getAllNodes();
  const ring1Nodes = allNodes.filter(n => n.ring === 1);
  const ring2Nodes = allNodes.filter(n => n.ring === 2);

  const explored = allNodes.filter(n => n.status === 'explored').length;
  const inProgress = allNodes.filter(n => n.status === 'in-progress').length;
  const pending = allNodes.filter(n => n.status === 'pending' || n.status === 'stub').length;

  // Lê sessões e sugestões do arquivo
  const raw = fs.readFileSync(STATE_FILE, 'utf-8');
  const { data } = matter(raw);

  const recentSessions = parseSessionsFromContent(raw);
  const nextSuggested = parseSuggestionsFromContent(raw);

  return {
    ultimaSessao: data.ultima_sessao || '',
    totalNodes: allNodes.length,
    explored,
    inProgress,
    pending,
    ring1Progress: {
      explored: ring1Nodes.filter(n => n.status === 'explored').length,
      total: ring1Nodes.length,
    },
    ring2Progress: {
      explored: ring2Nodes.filter(n => n.status === 'explored').length,
      total: ring2Nodes.length,
    },
    recentSessions,
    nextSuggested,
  };
}

/**
 * Marca um nó como explorado e registra a sessão.
 */
export async function markNodeExplored(slug: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  await addSessionEntry({ data: today, topic: slug, status: 'explored' });
  await rebuildStateFile();
}

/**
 * Marca um nó como em progresso (sessão interrompida).
 */
export async function markNodeInProgress(slug: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  await addSessionEntry({ data: today, topic: slug, status: 'in-progress' });
  await rebuildStateFile();
}

/**
 * Adiciona uma entrada de sessão ao histórico.
 */
export async function addSessionEntry(entry: SessionEntry): Promise<void> {
  bootstrapStateFile();

  const raw = fs.readFileSync(STATE_FILE, 'utf-8');
  const sessions = parseSessionsFromContent(raw);
  sessions.unshift(entry); // mais recente primeiro
  // Manter apenas últimas 20 sessões
  const trimmed = sessions.slice(0, 20);

  await rebuildStateFile(trimmed);
}

/**
 * Atualiza as sugestões de próximos tópicos.
 */
export async function updateSuggestions(suggestions: SuggestionEntry[]): Promise<void> {
  await rebuildStateFile(undefined, suggestions);
}


/**
 * Reconstrói o arquivo _estado-exploracao.md a partir do estado real.
 */
async function rebuildStateFile(
  sessionsOverride?: SessionEntry[],
  suggestionsOverride?: SuggestionEntry[]
): Promise<void> {
  bootstrapStateFile();

  const allNodes = await getAllNodes();
  const ring1Nodes = allNodes.filter(n => n.ring === 1);
  const ring2Nodes = allNodes.filter(n => n.ring === 2);

  const explored = allNodes.filter(n => n.status === 'explored').length;
  const inProgress = allNodes.filter(n => n.status === 'in-progress').length;
  const pending = allNodes.filter(n => n.status === 'pending' || n.status === 'stub').length;
  const total = allNodes.length;

  const ring1Explored = ring1Nodes.filter(n => n.status === 'explored').length;
  const ring2Explored = ring2Nodes.filter(n => n.status === 'explored').length;

  // Sessões
  const raw = fs.readFileSync(STATE_FILE, 'utf-8');
  const sessions = sessionsOverride ?? parseSessionsFromContent(raw);
  const suggestions = suggestionsOverride ?? parseSuggestionsFromContent(raw);

  const today = new Date().toISOString().split('T')[0];

  const pct = (n: number, t: number) => t === 0 ? '0%' : `${Math.round((n / t) * 100)}%`;

  const sessionsTable = sessions.length > 0
    ? sessions.map(s => {
        const icon = s.status === 'explored' ? '✅' : '🔄';
        return `| ${s.data} | [[${s.topic}]] | ${icon} ${s.status} |`;
      }).join('\n')
    : '';

  const suggestionsLines = suggestions.length > 0
    ? suggestions.map((s, i) => `${i + 1}. [[${s.topic}]] — ${s.reason}`).join('\n')
    : '1. [[machine-learning]] — fundamento essencial de toda IA\n2. [[deep-learning]] — base de LLMs e modelos modernos\n3. [[nlp]] — domínio central para engenheiros de IA';

  const body = `# Estado de Exploração do Knowledge Graph

## Progresso

| Métrica | Valor |
|---------|-------|
| Ring 1 explorados | ${ring1Explored}/${ring1Nodes.length} (${pct(ring1Explored, ring1Nodes.length)}) |
| Ring 2 explorados | ${ring2Explored}/${ring2Nodes.length} (${pct(ring2Explored, ring2Nodes.length)}) |
| Total | ${explored}/${total} (${pct(explored, total)}) |

## Últimas Sessões

| Data | Tópico | Status |
|------|--------|--------|
${sessionsTable}

## Próximos Sugeridos

${suggestionsLines}
`;

  const content = matter.stringify(body, {
    titulo: 'Estado de Exploração do Knowledge Graph',
    ultima_sessao: sessions[0]?.data || today,
    total_nodes: total,
    explored,
    in_progress: inProgress,
    pending,
  });

  fs.writeFileSync(STATE_FILE, content, 'utf-8');
}

// --- Parsers auxiliares ---

function parseSessionsFromContent(raw: string): SessionEntry[] {
  const sessions: SessionEntry[] = [];
  const lines = raw.split('\n');
  let inTable = false;

  for (const line of lines) {
    if (line.includes('| Data | Tópico | Status |')) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith('|---')) continue;
    if (inTable && line.startsWith('|')) {
      const cols = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cols.length >= 3) {
        const data = cols[0];
        const topicMatch = cols[1].match(/\[\[(.+?)\]\]/);
        const topic = topicMatch ? topicMatch[1] : cols[1];
        const status = cols[2].includes('explored') ? 'explored' as const : 'in-progress' as const;
        sessions.push({ data, topic, status });
      }
    } else if (inTable && !line.startsWith('|')) {
      inTable = false;
    }
  }
  return sessions;
}

function parseSuggestionsFromContent(raw: string): SuggestionEntry[] {
  const suggestions: SuggestionEntry[] = [];
  const lines = raw.split('\n');
  let inSuggestions = false;

  for (const line of lines) {
    if (line.includes('## Próximos Sugeridos')) {
      inSuggestions = true;
      continue;
    }
    if (inSuggestions && line.startsWith('#')) break;
    if (inSuggestions && /^\d+\./.test(line)) {
      const topicMatch = line.match(/\[\[(.+?)\]\]/);
      const reasonMatch = line.match(/— (.+)/);
      if (topicMatch) {
        suggestions.push({
          topic: topicMatch[1],
          reason: reasonMatch ? reasonMatch[1] : '',
          ring: 1,
          area: 'foundations',
        });
      }
    }
  }
  return suggestions;
}
