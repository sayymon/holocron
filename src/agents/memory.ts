import pool from '../db/client.js';

/**
 * Memória de longo prazo do agente — armazenada em Postgres.
 *
 * Conceitos aplicados (Módulo 4, Unidade 4):
 * - Memória episódica: histórico de interações passadas
 * - Memória semântica: resumo do que o aluno sabe/não sabe
 * - Persistência: sobrevive entre sessões (diferente do state que é efêmero)
 */

/** Busca resumo da memória do aluno (últimas interações + perfil) */
export async function getStudentMemory(studentId: string): Promise<string> {
  if (!studentId) return '';

  try {
    const { rows } = await pool.query(
      `SELECT input, output, context->>'mode' as mode
       FROM interactions
       WHERE student_id = $1
       ORDER BY created_at DESC
       LIMIT 5`,
      [studentId]
    );

    if (rows.length === 0) return '';

    const summary = rows.map(r =>
      `[${r.mode}] Perguntou: "${r.input.slice(0, 80)}..." → Respondido com sucesso`
    ).join('\n');

    return `Últimas ${rows.length} interações:\n${summary}`;
  } catch {
    return ''; // DB não disponível — funciona sem memória
  }
}

/** Salva uma interação na memória persistente */
export async function saveInteraction(
  studentId: string,
  input: string,
  output: string,
  mode: string
): Promise<void> {
  if (!studentId) return;

  try {
    await pool.query(
      `INSERT INTO interactions (student_id, agent, input, output, context)
       VALUES ($1, 'tutor', $2, $3, $4)`,
      [studentId, input, output, JSON.stringify({ mode })]
    );
  } catch {
    // Silently fail — memória é best-effort
  }
}
