import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

function getClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENROUTER_API_KEY
      ? 'https://openrouter.ai/api/v1'
      : undefined,
  });
}

export async function getEmbedding(text: string): Promise<number[]> {
  const res = await getClient().embeddings.create({
    model: process.env.EMBEDDING_MODEL || 'openai/text-embedding-3-small',
    input: text,
  });
  return res.data[0].embedding;
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const res = await getClient().embeddings.create({
    model: process.env.EMBEDDING_MODEL || 'openai/text-embedding-3-small',
    input: texts,
  });
  return res.data.map(d => d.embedding);
}
