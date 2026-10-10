import pool from '../db/client.js';

/**
 * Progresso do aluno — persistido na tabela `progress` (Postgres).
 *
 * Diferente das tasks (efêmeras, em memória), o progresso sobrevive entre
 * sessões. Aluno é resolvido por HOLOCRON_STUDENT_ID (env) ou por um registro
 * "default" criado on-demand.
 *
 * Conceitos aplicados (Módulo 03 — MCP):
 * - Tool de escrita: o agent passa a poder alterar estado (não só ler)
 * - Idempotência: UPSERT (INSERT ... ON CONFLICT) — repetir não duplica
 */

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface ProgressRow {
  module: number;
  unit: number;
  status: ProgressStatus;
  score: number | null;
  completed_at: string | null;
  updated_at: string | null;
}

export interface ModuleSummary {
  module: number;
  units: number;
  completed: number;
  inProgress: number;
  percent: number;
  rows: ProgressRow[];
}

const DEFAULT_STUDENT_NAME = process.env.HOLOCRON_STUDENT_NAME || 'default';

/** Resolve o id do aluno (env, ou cria/usa um registro "default"). */
async function getStudentId(): Promise<string> {
  if (process.env.HOLOCRON_STUDENT_ID) return process.env.HOLOCRON_STUDENT_ID;

  const existing = await pool.query(
    `SELECT id FROM students WHERE name = $1 ORDER BY created_at LIMIT 1`,
    [DEFAULT_STUDENT_NAME]
  );
  if (existing.rows.length > 0) return existing.rows[0].id;

  const created = await pool.query(
    `INSERT INTO students (name) VALUES ($1) RETURNING id`,
    [DEFAULT_STUDENT_NAME]
  );
  return created.rows[0].id;
}

/** Cria ou atualiza o progresso de uma unidade (idempotente). */
export async function updateProgress(input: {
  module: number;
  unit: number;
  status: ProgressStatus;
  score?: number;
}): Promise<ProgressRow> {
  const studentId = await getStudentId();

  const { rows } = await pool.query(
    `INSERT INTO progress (student_id, module, unit, status, score, completed_at, updated_at)
     VALUES ($1, $2, $3, $4, $5,
             CASE WHEN $4 = 'completed' THEN NOW() ELSE NULL END, NOW())
     ON CONFLICT (student_id, module, unit)
     DO UPDATE SET status       = EXCLUDED.status,
                   score        = COALESCE(EXCLUDED.score, progress.score),
                   completed_at = EXCLUDED.completed_at,
                   updated_at   = NOW()
     RETURNING module, unit, status, score, completed_at, updated_at`,
    [studentId, input.module, input.unit, input.status, input.score ?? null]
  );

  return rows[0];
}

/** Lê o progresso registrado (todos os módulos ou um específico). */
export async function getProgress(module?: number): Promise<ProgressRow[]> {
  const studentId = await getStudentId();

  const params: unknown[] = [studentId];
  let where = 'WHERE student_id = $1';
  if (typeof module === 'number') {
    params.push(module);
    where += ' AND module = $2';
  }

  const { rows } = await pool.query(
    `SELECT module, unit, status, score, completed_at, updated_at
     FROM progress ${where}
     ORDER BY module, unit`,
    params
  );

  return rows;
}

/** Agrupa por módulo e calcula percentual (completas / unidades registradas). */
export function summarize(rows: ProgressRow[]): ModuleSummary[] {
  const byModule = new Map<number, ProgressRow[]>();
  for (const row of rows) {
    const list = byModule.get(row.module) || [];
    list.push(row);
    byModule.set(row.module, list);
  }

  return [...byModule.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([module, list]) => {
      const completed = list.filter(r => r.status === 'completed').length;
      const inProgress = list.filter(r => r.status === 'in_progress').length;
      return {
        module,
        units: list.length,
        completed,
        inProgress,
        percent: list.length ? Math.round((completed / list.length) * 100) : 0,
        rows: list,
      };
    });
}
