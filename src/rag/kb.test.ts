import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const DOCS_PATH = path.resolve(process.cwd(), 'docs');

describe('Knowledge Base — Estrutura', () => {
  it('deve ter 12 diretórios de módulos', async () => {
    const dirs = await glob('curso/modulo-*', { cwd: DOCS_PATH, onlyDirectories: true });
    expect(dirs.length).toBe(12);
  });

  it('cada módulo deve ter um README.md', async () => {
    const dirs = await glob('curso/modulo-*', { cwd: DOCS_PATH, onlyDirectories: true });
    for (const dir of dirs) {
      const readme = path.join(DOCS_PATH, dir, 'README.md');
      expect(fs.existsSync(readme), `Falta README em ${dir}`).toBe(true);
    }
  });

  it('deve ter pelo menos 80 documentos atômicos no total', async () => {
    const files = await glob('**/*.md', { cwd: DOCS_PATH });
    expect(files.length).toBeGreaterThanOrEqual(80);
  });
});

describe('Knowledge Base — Front Matter', () => {
  it('todos os docs atômicos devem ter front matter com titulo', async () => {
    const files = await glob('curso/modulo-*/**/*.md', { cwd: DOCS_PATH });
    const missing: string[] = [];

    for (const file of files) {
      if (file.endsWith('README.md')) continue; // READMEs são índices
      const content = fs.readFileSync(path.join(DOCS_PATH, file), 'utf-8');
      const { data } = matter(content);
      if (!data.titulo) missing.push(file);
    }

    expect(missing, `Docs sem titulo: ${missing.join(', ')}`).toHaveLength(0);
  });

  it('todos os docs de módulo devem ter campo modulo numérico', async () => {
    const files = await glob('curso/modulo-*/**/*.md', { cwd: DOCS_PATH });
    const missing: string[] = [];

    for (const file of files) {
      if (file.endsWith('README.md')) continue; // READMEs podem não ter unidade
      const content = fs.readFileSync(path.join(DOCS_PATH, file), 'utf-8');
      const { data } = matter(content);
      if (typeof data.modulo !== 'number') missing.push(file);
    }

    expect(missing, `Docs sem modulo: ${missing.join(', ')}`).toHaveLength(0);
  });

  it('todos os docs atômicos devem ter confiabilidade declarada', async () => {
    const files = await glob('curso/modulo-*/**/*.md', { cwd: DOCS_PATH });
    const missing: string[] = [];

    for (const file of files) {
      if (file.endsWith('README.md')) continue; // READMEs são índices
      const content = fs.readFileSync(path.join(DOCS_PATH, file), 'utf-8');
      const { data } = matter(content);
      if (!data.confiabilidade) missing.push(file);
    }

    expect(missing, `Docs sem confiabilidade: ${missing.join(', ')}`).toHaveLength(0);
  });
});

describe('Knowledge Base — Conteúdo', () => {
  it('nenhum doc deve estar vazio (menos de 50 chars de conteúdo)', async () => {
    const files = await glob('curso/modulo-*/**/*.md', { cwd: DOCS_PATH });
    const empty: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(path.join(DOCS_PATH, file), 'utf-8');
      const { content: body } = matter(content);
      if (body.trim().length < 50) empty.push(file);
    }

    expect(empty, `Docs vazios: ${empty.join(', ')}`).toHaveLength(0);
  });

  it('ADRs devem ter campos status e data', async () => {
    const files = await glob('adrs/*.md', { cwd: DOCS_PATH });
    expect(files.length).toBeGreaterThanOrEqual(3);

    for (const file of files) {
      const content = fs.readFileSync(path.join(DOCS_PATH, file), 'utf-8');
      const { data } = matter(content);
      expect(data.status, `ADR ${file} sem status`).toBeDefined();
      expect(data.data, `ADR ${file} sem data`).toBeDefined();
    }
  });
});
