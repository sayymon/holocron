import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const DOCS_PATH = path.resolve(process.cwd(), 'docs');

describe('MCP Tools — list_disciplinas (filesystem)', () => {
  it('deve encontrar 12 diretórios de disciplinas', async () => {
    const dirs = await glob('curso/disciplina-*', { cwd: DOCS_PATH, onlyDirectories: true });
    expect(dirs.sort()).toHaveLength(12);
    expect(dirs.sort()[0]).toContain('disciplina-01');
    expect(dirs.sort()[11]).toContain('disciplina-12');
  });
});

describe('MCP Tools — get_disciplina (filesystem)', () => {
  it('deve ler README da disciplina 1', () => {
    const readmePath = path.join(DOCS_PATH, 'curso/disciplina-01-fundamentos/README.md');
    expect(fs.existsSync(readmePath)).toBe(true);
    const content = fs.readFileSync(readmePath, 'utf-8');
    expect(content).toContain('Disciplina 01');
  });

  it('deve ler README da disciplina 4 (agentes)', async () => {
    const dirs = await glob('curso/disciplina-04-*', { cwd: DOCS_PATH, onlyDirectories: true });
    expect(dirs.length).toBe(1);
    const readmePath = path.join(DOCS_PATH, dirs[0], 'README.md');
    expect(fs.existsSync(readmePath)).toBe(true);
  });
});

describe('MCP Tools — get_document (filesystem)', () => {
  it('deve retornar conteúdo de um documento existente', () => {
    const docPath = path.join(DOCS_PATH, 'curso/disciplina-01-fundamentos/rag-embeddings-busca.md');
    expect(fs.existsSync(docPath)).toBe(true);
    const content = fs.readFileSync(docPath, 'utf-8');
    expect(content).toContain('RAG');
    expect(content).toContain('embeddings');
  });

  it('deve falhar graciosamente para documento inexistente', () => {
    const docPath = path.join(DOCS_PATH, 'curso/nao-existe.md');
    expect(fs.existsSync(docPath)).toBe(false);
  });
});

describe('MCP Config', () => {
  it('mcp.json deve existir e ter config válida', () => {
    const mcpPath = path.resolve(process.cwd(), 'mcp.json');
    expect(fs.existsSync(mcpPath)).toBe(true);
    const config = JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
    expect(config.mcpServers.holocron).toBeDefined();
    expect(config.mcpServers.holocron.command).toBe('npx');
  });
});
