import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import pool from './client.js';

async function migrate() {
  const migrationsDir = path.resolve(import.meta.dirname, 'migrations');
  const files = await glob('*.sql', { cwd: migrationsDir });

  for (const file of files.sort()) {
    console.log(`Running: ${file}`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    await pool.query(sql);
  }

  console.log('✅ Migrations complete');
  await pool.end();
}

migrate().catch(e => { console.error(e); process.exit(1); });
