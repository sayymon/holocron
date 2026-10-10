import { describe, it, expect } from 'vitest';
import {
  listDisciplinas,
  resolveDisciplina,
  listEntities,
  searchEntities,
  resolveEntity,
  whereTaught,
} from './curriculum.js';

describe('Curriculum — disciplinas', () => {
  it('lista 12 disciplinas com nomes canônicos', async () => {
    const ds = await listDisciplinas();
    expect(ds).toHaveLength(12);
    const apis = ds.find(d => d.numero === 2);
    expect(apis?.name).toBe('APIs de IA Generativa e Prompt Engineering');
    expect(apis?.slug).toBe('apis-prompt-eng');
  });

  it('resolve por número, slug e nome completo', async () => {
    expect((await resolveDisciplina('2'))?.numero).toBe(2);
    expect((await resolveDisciplina('apis-prompt-eng'))?.numero).toBe(2);
    expect((await resolveDisciplina('APIs de IA Generativa e Prompt Engineering'))?.numero).toBe(2);
    expect((await resolveDisciplina('fundamentos'))?.numero).toBe(1);
    expect(await resolveDisciplina('nada-a-ver')).toBeNull();
  });
});

describe('Curriculum — entidades', () => {
  it('carrega entidades do Knowledge Graph', async () => {
    const entities = await listEntities();
    expect(entities.length).toBeGreaterThan(50);
    expect(entities.some(e => e.slug === 'langgraph')).toBe(true);
    expect(entities.some(e => e.slug === 'rag')).toBe(true);
    expect(entities.some(e => e.slug === 'lora')).toBe(true);
  });

  it('searchEntities encontra LangGraph e RAG', async () => {
    const entities = await listEntities();
    expect(searchEntities(entities, 'LangGraph')[0]?.slug).toBe('langgraph');
    expect(searchEntities(entities, 'RAG').some(e => e.slug === 'rag')).toBe(true);
    expect(searchEntities(entities, 'você-é-culpa-do-cosmo')).toHaveLength(0);
  });

  it('resolveEntity encontra por slug', async () => {
    const entities = await listEntities();
    expect(resolveEntity(entities, 'langgraph')?.slug).toBe('langgraph');
    expect(resolveEntity(entities, 'rag')?.slug).toBe('rag');
  });

  it('whereTaught localiza LangGraph na disciplina 4', async () => {
    const taught = whereTaught('langgraph');
    expect(taught.length).toBeGreaterThan(0);
    expect(taught.some(t => t.disciplina === 4)).toBe(true);
  });
});