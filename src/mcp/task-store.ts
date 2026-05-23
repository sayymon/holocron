import crypto from 'crypto';

export type TaskStatus = 'pending' | 'completed' | 'error';

export interface Task {
  id: string;
  status: TaskStatus;
  createdAt: number;
  completedAt?: number;
  result?: string;
  error?: string;
}

const tasks = new Map<string, Task>();

/** Cria uma task e dispara a execução em background */
export function createTask(executor: () => Promise<string>): Task {
  const id = crypto.randomUUID().slice(0, 8);
  const task: Task = { id, status: 'pending', createdAt: Date.now() };
  tasks.set(id, task);

  executor()
    .then(result => {
      task.status = 'completed';
      task.completedAt = Date.now();
      task.result = result;
    })
    .catch(err => {
      task.status = 'error';
      task.completedAt = Date.now();
      task.error = err instanceof Error ? `${err.message}\n${err.stack}` : String(err);
    });

  return task;
}

/** Busca resultado de uma task */
export function getTask(id: string): Task | undefined {
  return tasks.get(id);
}

/** Limpa tasks antigas (> 10 min) */
export function cleanOldTasks(): void {
  const tenMinutes = 10 * 60 * 1000;
  const now = Date.now();
  for (const [id, task] of tasks) {
    if (now - task.createdAt > tenMinutes) {
      tasks.delete(id);
    }
  }
}
