import pool from '../db/client.js';
import { getEmbedding } from './embeddings.js';

export interface SearchResult {
  documentPath: string;
  chunkIndex: number;
  content: string;
  metadata: Record<string, unknown>;
  score: number;
}

/** Semantic search using cosine similarity */
export async function semanticSearch(query: string, limit = 5): Promise<SearchResult[]> {
  const embedding = await getEmbedding(query);
  const vector = `[${embedding.join(',')}]`;

  const { rows } = await pool.query(
    `SELECT document_path, chunk_index, content, metadata,
            1 - (embedding <=> $1::vector) AS score
     FROM document_embeddings
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [vector, limit]
  );

  return rows.map(r => ({
    documentPath: r.document_path,
    chunkIndex: r.chunk_index,
    content: r.content,
    metadata: r.metadata,
    score: parseFloat(r.score),
  }));
}

/** Hybrid search: semantic + keyword (full-text) */
export async function hybridSearch(query: string, limit = 5): Promise<SearchResult[]> {
  const embedding = await getEmbedding(query);
  const vector = `[${embedding.join(',')}]`;

  const { rows } = await pool.query(
    `WITH semantic AS (
       SELECT document_path, chunk_index, content, metadata,
              1 - (embedding <=> $1::vector) AS score
       FROM document_embeddings
       ORDER BY embedding <=> $1::vector
       LIMIT $2 * 2
     ),
     keyword AS (
       SELECT document_path, chunk_index, content, metadata,
              ts_rank(to_tsvector('portuguese', content), plainto_tsquery('portuguese', $3)) AS score
       FROM document_embeddings
       WHERE to_tsvector('portuguese', content) @@ plainto_tsquery('portuguese', $3)
       LIMIT $2 * 2
     )
     SELECT COALESCE(s.document_path, k.document_path) AS document_path,
            COALESCE(s.chunk_index, k.chunk_index) AS chunk_index,
            COALESCE(s.content, k.content) AS content,
            COALESCE(s.metadata, k.metadata) AS metadata,
            (COALESCE(s.score, 0) * 0.7 + COALESCE(k.score, 0) * 0.3) AS score
     FROM semantic s
     FULL OUTER JOIN keyword k ON s.document_path = k.document_path AND s.chunk_index = k.chunk_index
     ORDER BY score DESC
     LIMIT $2`,
    [vector, limit, query]
  );

  return rows.map(r => ({
    documentPath: r.document_path,
    chunkIndex: r.chunk_index,
    content: r.content,
    metadata: r.metadata,
    score: parseFloat(r.score),
  }));
}
