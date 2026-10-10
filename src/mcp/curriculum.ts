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

export function searchEntities(entities: CurriculumEntity[], query: string, limit = 10): CurriculumEntity[] {
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