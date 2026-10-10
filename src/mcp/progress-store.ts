import pool from '../db/client.js';
import { resolveDisciplina } from './curriculum.js';

/**
 * Progresso do aluno — persistido na tabela `progress` (Postgres).
 *
 * Nomenclatura do domínio:
 * - disciplina: nível superior do curso (ex: "APIs de IA Generativa e Prompt Engineering")
 * - modulo:     nível interno de cada disciplina (ex: 7)
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
  disciplina: string;
  modulo: number;
  status: ProgressStatus;
  score: number | null;
  completed_at: string | null;
  updated_at: string | null;
}

export interface DisciplinaSummary {
  disciplina: string;
  modulos: number;
  completed: number;
  inProgress: number;
  percent: number;
  rows: ProgressRow[];
}

const DEFAULT_STUDENT_NAME = process.env.HOLOCRON_STUDENT_NAME || 'default';

/** Normaliza o nome da disciplina para evitar duplicatas por variação de caixa/espaço. */
export function normalizeDisciplina(disciplina: string): string {
  return disciplina.trim().replace(/\s+/g, ' ');
}

/** Resolve a entrada (número, slug ou nome) para o nome canônico da disciplina. */
async function canonicalDisciplina(input: string): Promise<string> {
  const resolved = await resolveDisciplina(input);
  return resolved ? resolved.name : normalizeDisciplina(input);
}

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

/** Cria ou atualiza o progresso de um módulo de uma disciplina (idempotente). */
export async function updateProgress(input: {
  disciplina: string;
  modulo: number;
  status: ProgressStatus;
  score?: number;
}): Promise<ProgressRow> {
  const studentId = await getStudentId();
  const disciplina = await canonicalDisciplina(input.disciplina);

  const { rows } = await pool.query(
    `INSERT INTO progress (student_id, disciplina, modulo, status, score, completed_at, updated_at)
     VALUES ($1, $2, $3, $4, $5,
             CASE WHEN $4 = 'completed' THEN NOW() ELSE NULL END, NOW())
     ON CONFLICT (student_id, disciplina, modulo)
     DO UPDATE SET status       = EXCLUDED.status,
                   score        = COALESCE(EXCLUDED.score, progress.score),
                   completed_at = EXCLUDED.completed_at,
                   updated_at   = NOW()
     RETURNING disciplina, modulo, status, score, completed_at, updated_at`,
    [studentId, disciplina, input.modulo, input.status, input.score ?? null]
  );

  return rows[0];
}

/** Lê o progresso registrado (todas as disciplinas ou uma específica). */
export async function getProgress(disciplina?: string): Promise<ProgressRow[]> {
  const studentId = await getStudentId();

  const params: unknown[] = [studentId];
  let where = 'WHERE student_id = $1';
  if (disciplina) {
    params.push(await canonicalDisciplina(disciplina));
    where += ' AND disciplina = $2';
  }

  const { rows } = await pool.query(
    `SELECT disciplina, modulo, status, score, completed_at, updated_at
     FROM progress ${where}
     ORDER BY disciplina, modulo`,
    params
  );

  return rows;
}

/** Agrupa por disciplina e calcula percentual (concluídos / módulos registrados). */
export function summarize(rows: ProgressRow[]): DisciplinaSummary[] {
  const byDisciplina = new Map<string, ProgressRow[]>();
  for (const row of rows) {
    const list = byDisciplina.get(row.disciplina) || [];
    list.push(row);
    byDisciplina.set(row.disciplina, list);
  }

  return [...byDisciplina.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'))
    .map(([disciplina, list]) => {
      const completed = list.filter(r => r.status === 'completed').length;
      const inProgress = list.filter(r => r.status === 'in_progress').length;
      return {
        disciplina,
        modulos: list.length,
        completed,
        inProgress,
        percent: list.length ? Math.round((completed / list.length) * 100) : 0,
        rows: list,
      };
    });
}
