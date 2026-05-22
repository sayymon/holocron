import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import pool from '../db/client.js';
import { getEmbeddings } from './embeddings.js';

interface Chunk {
  documentPath: string;
  chunkIndex: number;
  content: string;
  metadata: Record<string, unknown>;
}

function chunkDocument(filePath: string, basePath: string): Chunk[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontMatter, content } = matter(raw);
  const relativePath = path.relative(basePath, filePath);

  // Split by headings (## or ###) keeping heading with its content
  const sections = content.split(/(?=^#{2,3}\s)/m).filter(s => s.trim());

  // If no sections or very short doc, treat as single chunk
  if (sections.length <= 1 || content.length < 500) {
    return [{
      documentPath: relativePath,
      chunkIndex: 0,
      content: `${frontMatter.titulo || ''}\n\n${content}`.trim(),
      metadata: frontMatter,
    }];
  }

  return sections.map((section, i) => ({
    documentPath: relativePath,
    chunkIndex: i,
    content: section.trim(),
    metadata: frontMatter,
  }));
}

export async function indexDocuments(docsPath: string): Promise<number> {
  const files = await glob('**/*.md', { cwd: docsPath, absolute: true });
  console.log(`Found ${files.length} documents to index`);

  // Clear existing embeddings
  await pool.query('DELETE FROM document_embeddings');

  let totalChunks = 0;
  const BATCH_SIZE = 20;

  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const allChunks: Chunk[] = [];

    for (const file of batch) {
      allChunks.push(...chunkDocument(file, docsPath));
    }

    if (allChunks.length === 0) continue;

    // Get embeddings in batch
    const texts = allChunks.map(c => c.content.slice(0, 8000));
    const embeddings = await getEmbeddings(texts);

    // Insert into pgvector
    const values: string[] = [];
    const params: unknown[] = [];
    let paramIdx = 1;

    for (let j = 0; j < allChunks.length; j++) {
      const chunk = allChunks[j];
      const embedding = `[${embeddings[j].join(',')}]`;
      values.push(`($${paramIdx}, $${paramIdx + 1}, $${paramIdx + 2}, $${paramIdx + 3}::vector, $${paramIdx + 4}::jsonb)`);
      params.push(chunk.documentPath, chunk.chunkIndex, chunk.content, embedding, JSON.stringify(chunk.metadata));
      paramIdx += 5;
    }

    await pool.query(
      `INSERT INTO document_embeddings (document_path, chunk_index, content, embedding, metadata)
       VALUES ${values.join(', ')}
       ON CONFLICT (document_path, chunk_index) DO UPDATE SET
         content = EXCLUDED.content,
         embedding = EXCLUDED.embedding,
         metadata = EXCLUDED.metadata`,
      params
    );

    totalChunks += allChunks.length;
    console.log(`  Indexed ${totalChunks} chunks (${i + batch.length}/${files.length} files)`);
  }

  return totalChunks;
}
