import OpenAI from 'openai';

function getClient(): OpenAI {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = process.env.OPENROUTER_API_KEY
    ? 'https://openrouter.ai/api/v1'
    : undefined;
  return new OpenAI({ apiKey, baseURL });
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
