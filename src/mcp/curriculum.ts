import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import matter from 'gray-matter';

export const DOCS_PATH = path.resolve(process.cwd(), 'docs');

export interface DisciplinaMeta {
  dir: string;
  numero: number;
  slug: string;
  name: string;
}

export interface CurriculumEntity {
  top: 'ferramenta' | 'conceito';
  categoria: string;
  slug: string;
  titulo: string;
  tags: string[];
  rel: string[];
  caminho: string;
}

export interface WhereTaught {
  caminho: string;
  disciplina: number | null;
  modulo: number | null;
}

const NUMERO_RE = /^disciplina-(\d{2})-(.+)$/;
const ENTITY_GLOBS = [
  'knowledge-graph/ferramentas/**/*.md',
  'knowledge-graph/conceitos/**/*.md',
];
const CATEGORIA_LABEL: Record<string, string> = {
  frameworks: 'framework',
  'providers-llm': 'provider de LLM',
  infraestrutura: 'infraestrutura',
  codificacao: 'ferramenta de codificação',
  'mcp-servers': 'MCP server',
  observabilidade: 'observabilidade',
  fundamentos: 'fundamentos',
  llms: 'LLMs',
  paradigmas: 'paradigma',
  'generative-ai': 'IA generativa',
  padroes: 'padrão',
};

function normalizeToken(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function stemPT(s: string): string {
  return s.endsWith('s') ? s.slice(0, -1) : s;
}

export type CategoryFilter = { top?: 'ferramenta' | 'conceito'; categoria?: string };

const CATEGORIA_SYNS: Record<string, string[]> = {
  framework: ['framework', 'frameworks', 'frameworks de orquestracao'],
  'provider de LLM': ['provider', 'providers', 'provedor', 'provedores', 'provider de llm', 'provedor de llm', 'modelo', 'modelos', 'models'],
  'mcp server': ['mcp server', 'mcp servers', 'mcp-server', 'mcps', 'servidor mcp', 'servidores mcp'],
  infraestrutura: ['infraestrutura', 'infrastructure', 'infra', 'vector db', 'vector databases', 'banco de dados vetorial', 'bancos vetoriais'],
  'ferramenta de codificação': ['codificacao', 'codificação', 'ide', 'ferramenta de codificação', 'ferramenta de codificacao'],
  observabilidade: ['observabilidade', 'observability'],
  fundamentos: ['fundamentos', 'foundations'],
  'LLMs': ['llm', 'llms', 'large language models'],
  paradigma: ['paradigma', 'paradigmas', 'paradigm', 'paradigms'],
  'IA generativa': ['ia generativa', 'ia generativa aplicada', 'generative ai', 'genai'],
  'padrão': ['padrao', 'padrão', 'padroes', 'padrões', 'pattern', 'patterns', 'design pattern', 'design patterns'],
};

const CATEGORIA_PLURAL: Record<string, string> = {
  framework: 'frameworks',
  'provider de LLM': 'providers de LLM / modelos',
  'mcp server': 'MCP servers',
  infraestrutura: 'infraestrutura',
  'ferramenta de codificação': 'ferramentas de codificação',
  observabilidade: 'observabilidade',
  fundamentos: 'fundamentos',
  'LLMs': 'LLMs',
  paradigma: 'paradigmas',
  'IA generativa': 'IA generativa',
  'padrão': 'padrões',
};

/** Detecta se a consulta é uma categoria ampla (ex: "ferramentas", "conceitos", "frameworks"). */
export function matchCategory(input: string): CategoryFilter | null {
  const raw = input.trim().toLowerCase();
  if (!raw) return null;
  const tok = normalizeToken(raw);
  const hasSpace = /\s/.test(raw);
  const t = stemPT(tok);

  if ((!hasSpace && t === stemPT('ferramenta')) || ['ferramenta', 'ferramentas', 'tool', 'tools'].includes(tok)) {
    return { top: 'ferramenta' };
  }
  if ((!hasSpace && t === stemPT('conceito')) || ['conceito', 'conceitos', 'concept', 'concepts'].includes(tok)) {
    return { top: 'conceito' };
  }

  for (const [categoria, syns] of Object.entries(CATEGORIA_SYNS)) {
    const sym = syns.map(normalizeToken);
    const match = sym.includes(tok) || (!hasSpace && sym.some(s => stemPT(s) === t));
    if (match) return { categoria };
  }
  return null;
}

export function categoryLabel(cat: CategoryFilter): string {
  if (cat.categoria) return CATEGORIA_PLURAL[cat.categoria] ?? cat.categoria;
  if (cat.top) return cat.top === 'ferramenta' ? 'ferramentas' : 'conceitos';
  return 'currículo';
}

export function applyCategoryFilter(entities: CurriculumEntity[], cat: CategoryFilter): CurriculumEntity[] {
  return entities.filter(e =>
    (!cat.top || e.top === cat.top) &&
    (!cat.categoria || e.categoria === cat.categoria)
  );
}

function isExcluded(file: string): boolean {
  const base = path.basename(file);
  return base.startsWith('_') || /^(MAPA|MINDMAP|PROMPT)/.test(base);
}

/** Lê o nome canônico da disciplina a partir do frontmatter `titulo` ou do H1 do README. */
export function readDisciplinaName(readmePath: string): string | null {
  if (!fs.existsSync(readmePath)) return null;
  const raw = fs.readFileSync(readmePath, 'utf-8');
  const { data, content } = matter(raw);
  let title = typeof data.titulo === 'string' && data.titulo.trim() ? data.titulo.trim() : '';
  if (!title) {
    const m = content.match(/^#\s+(.+)$/m);
    if (m) title = m[1].trim();
  }
  if (!title) return null;
  return title.replace(/^disciplina\s+\d{1,2}\s*[—–:-]\s*/i, '').trim();
}

export async function listDisciplinas(): Promise<DisciplinaMeta[]> {
  const dirs = (await glob('curso/disciplina-*', { cwd: DOCS_PATH }))
    .filter(d => fs.statSync(path.join(DOCS_PATH, d)).isDirectory())
    .sort();
  return dirs.map(dir => {
    const m = path.basename(dir).match(NUMERO_RE);
    const name = readDisciplinaName(path.join(DOCS_PATH, dir, 'README.md')) || (m?.[2] ?? dir);
    return { dir, numero: m ? parseInt(m[1], 10) : 0, slug: m?.[2] ?? '', name };
  });
}

/** Resolve uma disciplina por número ("2"), slug ("apis-prompt-eng") ou nome completo. */
export async function resolveDisciplina(input: string): Promise<DisciplinaMeta | null> {
  const needle = input.trim();
  if (!needle) return null;
  const all = await listDisciplinas();

  if (/^\d+$/.test(needle)) {
    const byNum = all.find(d => d.numero === parseInt(needle, 10));
    if (byNum) return byNum;
  }

  const tok = normalizeToken(needle);
  const bySlug = all.find(d => normalizeToken(d.slug).includes(tok) || tok.includes(normalizeToken(d.slug)));
  if (bySlug) return bySlug;

  const byName = all.find(d => normalizeToken(d.name).includes(tok));
  if (byName) return byName;

  return all.find(d => normalizeToken(d.dir).includes(tok)) ?? null;
}

function readEntity(file: string): CurriculumEntity | null {
  const raw = fs.readFileSync(path.join(DOCS_PATH, file), 'utf-8');
  const { data } = matter(raw);
  const top: 'ferramenta' | 'conceito' = file.startsWith('knowledge-graph/ferramentas') ? 'ferramenta' : 'conceito';
  const categoria = file.split('/')[2] ?? '';
  const titulo = typeof data.titulo === 'string' && data.titulo.trim()
    ? data.titulo.trim()
    : path.basename(file, '.md').replace(/-/g, ' ');

  const rel = [...raw.matchAll(/\[\[([^\]|#]+)/g)]
    .map(m => m[1].trim())
    .map(s => s.replace(/^\.\.\//, '').replace(/\.md$/, ''))
    .filter(Boolean);

  return {
    top,
    categoria: CATEGORIA_LABEL[categoria] ?? categoria,
    slug: path.basename(file, '.md'),
    titulo,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    rel: [...new Set(rel)],
    caminho: file,
  };
}

export async function listEntities(): Promise<CurriculumEntity[]> {
  const out: CurriculumEntity[] = [];
  for (const g of ENTITY_GLOBS) {
    const files = await glob(g, { cwd: DOCS_PATH });
    for (const f of files) {
      if (isExcluded(f)) continue;
      const e = readEntity(f);
      if (e) out.push(e);
    }
  }
  return out;
}

export function searchEntities(
  entities: CurriculumEntity[],
  query: string,
  limit = 10,
  categoria?: string
): CurriculumEntity[] {
  const cat = categoria ? matchCategory(categoria) : matchCategory(query);
  if (cat) {
    return applyCategoryFilter(entities, cat).slice(0, limit);
  }

  const tokens = normalizeToken(query).split(/\s+/).filter(Boolean);
  const scored = entities.map(e => {
    let score = 0;
    const slugTok = normalizeToken(e.slug);
    const titleTok = normalizeToken(e.titulo);
    for (const t of tokens) {
      if (slugTok.includes(t)) score += 3;
      if (titleTok.includes(t)) score += 2;
      if (e.tags.some(tag => normalizeToken(tag).includes(t))) score += 1;
    }
    return { e, score };
  }).filter(x => x.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(x => x.e);
}

export function resolveEntity(entities: CurriculumEntity[], name: string): CurriculumEntity | null {
  const tok = normalizeToken(name);
  const exact = entities.find(e => normalizeToken(e.slug) === tok);
  if (exact) return exact;
  const title = entities.find(e => normalizeToken(e.titulo) === tok);
  if (title) return title;
  return entities.find(e => normalizeToken(e.slug).includes(tok) || normalizeToken(e.titulo).includes(tok)) ?? null;
}

/** Extrai da própria doc da entidade: definição (1º parágrafo) e bullets de usos/aplicações. */
export function entitySummary(e: CurriculumEntity): { definicao: string; usos: string[] } {
  const raw = fs.readFileSync(path.join(DOCS_PATH, e.caminho), 'utf-8');
  const { content } = matter(raw);
  const lines = content.split('\n');

  let definicao = '';
  const h1 = lines.findIndex(l => /^#\s/.test(l));
  if (h1 >= 0) {
    const para: string[] = [];
    for (const l of lines.slice(h1 + 1)) {
      const t = l.trim();
      if (!t) { if (para.length) break; continue; }
      if (t.startsWith('```')) break;
      if (/^#{1,6}\s/.test(t)) break;
      para.push(t.replace(/^>\s?/, ''));
    }
    definicao = para.join(' ').replace(/`/g, '').slice(0, 420);
  }
  if (!definicao) definicao = e.titulo;

  const usos: string[] = [];
  const secIdx = lines.findIndex(l => /^#{1,6}\s*(Aplica|Casos de uso|Quando usar|Casos de Uso práticos)/i.test(l.trim()));
  if (secIdx >= 0) {
    for (const l of lines.slice(secIdx + 1)) {
      const t = l.trim();
      if (/^#{1,6}\s/.test(t)) break;
      const m = t.match(/^[-*]\s+(.*)$/);
      if (m) {
        const s = m[1].replace(/\*\*/g, '').trim();
        if (s && s.length < 160) usos.push(s);
        if (usos.length >= 4) break;
      }
    }
  }

  return { definicao, usos };
}

/** Onde a entidade é abordada no curso: busca da palavra no conteúdo, respeitando fronteira de palavra. */
export function whereTaught(term: string): WhereTaught[] {
  const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  const out: WhereTaught[] = [];

  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md') && e.name !== 'README.md') {
        const content = fs.readFileSync(p, 'utf-8');
        if (!pattern.test(content)) continue;
        const { data } = matter(content);
        out.push({
          caminho: path.relative(DOCS_PATH, p),
          disciplina: typeof data.disciplina === 'number' ? data.disciplina : null,
          modulo: typeof data.modulo === 'number' ? data.modulo : null,
        });
      }
    }
  };
  walk(path.join(DOCS_PATH, 'curso'));
  out.sort((a, b) => a.caminho.localeCompare(b.caminho));
  return out;
}