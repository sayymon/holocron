import 'dotenv/config';
import path from 'path';
import { indexDocuments, semanticSearch, hybridSearch } from './rag/index.js';
import { runTutor } from './agents/index.js';
import pool from './db/client.js';

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'index': {
      const docsPath = args[0] || path.resolve(process.cwd(), 'docs');
      console.log(`Indexing documents from: ${docsPath}`);
      const count = await indexDocuments(docsPath);
      console.log(`✅ Indexed ${count} chunks`);
      break;
    }
    case 'search': {
      const query = args.join(' ');
      if (!query) { console.error('Usage: holocron search <query>'); process.exit(1); }
      console.log(`🔍 Searching: "${query}"\n`);
      const results = await semanticSearch(query);
      for (const r of results) {
        console.log(`[${r.score.toFixed(3)}] ${r.documentPath}`);
        console.log(`  ${r.content.slice(0, 150).replace(/\n/g, ' ')}...\n`);
      }
      break;
    }
    case 'hybrid': {
      const query = args.join(' ');
      if (!query) { console.error('Usage: holocron hybrid <query>'); process.exit(1); }
      console.log(`🔍 Hybrid search: "${query}"\n`);
      const results = await hybridSearch(query);
      for (const r of results) {
        console.log(`[${r.score.toFixed(3)}] ${r.documentPath}`);
        console.log(`  ${r.content.slice(0, 150).replace(/\n/g, ' ')}...\n`);
      }
      break;
    }
    case 'ask': {
      const question = args.join(' ');
      if (!question) { console.error('Usage: holocron ask <pergunta>'); process.exit(1); }
      console.log(`🔮 Holocron pensando...\n`);
      const answer = await runTutor(question);
      console.log(answer);
      break;
    }
    default:
      console.log(`Holocron CLI
  
  Commands:
    index [path]        Index documents from path (default: ./docs)
    search <query>      Semantic search
    hybrid <query>      Hybrid search (semantic + keyword)
    ask <question>      Ask the tutor (RAG + LLM)`);
  }

  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
