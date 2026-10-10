import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import pool from './client.js';

async function migrate() {
  const migrationsDir = path.resolve(import.meta.dirname, 'migrations');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename   TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  const { rows } = await pool.query<{ filename: string }>(
    'SELECT filename FROM schema_migrations'
  );
  const applied = new Set(rows.map(r => r.filename));

  const files = (await glob('*.sql', { cwd: migrationsDir })).sort();

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`⏭  ${file} (já aplicado)`);
      continue;
    }

    console.log(`Running: ${file}`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');

    await pool.query('BEGIN');
    try {
      await pool.query(sql);
      await pool.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
      await pool.query('COMMIT');
    } catch (err) {
      await pool.query('ROLLBACK');
      throw err;
    }
  }

  console.log('✅ Migrations complete');
  await pool.end();
}

migrate().catch(e => { console.error(e); process.exit(1); });
