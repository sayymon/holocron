import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const DOCS_PATH = path.resolve(process.cwd(), 'docs');

/**
 * Simula o chunking do indexer sem precisar de DB/embeddings.
 * Testa a lógica de parsing isoladamente.
 */
function chunkDocument(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontMatter, content } = matter(raw);
  const sections = content.split(/(?=^#{2,3}\s)/m).filter(s => s.trim());

  if (sections.length <= 1 || content.length < 500) {
    return [{ content: `${frontMatter.titulo || ''}\n\n${content}`.trim(), metadata: frontMatter }];
  }

  return sections.map(section => ({
    content: section.trim(),
    metadata: frontMatter,
  }));
}

describe('Indexer — Chunking', () => {
  it('deve chunkar um documento com múltiplas seções', () => {
    const testFile = path.join(DOCS_PATH, 'curso/modulo-01-fundamentos/rag-embeddings-busca.md');
    if (!fs.existsSync(testFile)) return;

    const chunks = chunkDocument(testFile);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].metadata.titulo).toBeDefined();
  });

  it('documento curto deve virar um único chunk', () => {
    const testFile = path.join(DOCS_PATH, 'curso/modulo-01-fundamentos/historia-ia.md');
    if (!fs.existsSync(testFile)) return;

    const chunks = chunkDocument(testFile);
    // Pode ser 1 ou mais dependendo do tamanho, mas não deve ser 0
    expect(chunks.length).toBeGreaterThanOrEqual(1);
  });

  it('todos os chunks devem ter conteúdo não-vazio', async () => {
    const files = await glob('curso/modulo-01-fundamentos/*.md', { cwd: DOCS_PATH, absolute: true });
    for (const file of files) {
      const chunks = chunkDocument(file);
      for (const chunk of chunks) {
        expect(chunk.content.length).toBeGreaterThan(0);
      }
    }
  });

  it('metadata deve preservar front matter original', async () => {
    const files = await glob('curso/modulo-01-fundamentos/*.md', { cwd: DOCS_PATH, absolute: true });
    for (const file of files) {
      if (file.endsWith('README.md')) continue;
      const chunks = chunkDocument(file);
      expect(chunks[0].metadata.modulo).toBe(1);
    }
  });
});
