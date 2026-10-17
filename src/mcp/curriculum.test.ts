import { describe, it, expect } from 'vitest';
import {
  listDisciplinas,
  resolveDisciplina,
  listEntities,
  searchEntities,
  resolveEntity,
  whereTaught,
  matchCategory,
  applyCategoryFilter,
  entitySummary,
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

  it('buscas amplas por categoria listam ferramentas e conceitos', async () => {
    const entities = await listEntities();
    const ferramentas = searchEntities(entities, 'ferramentas', 100);
    expect(ferramentas.length).toBeGreaterThan(20);
    expect(ferramentas.every(e => e.top === 'ferramenta')).toBe(true);

    const conceitos = searchEntities(entities, 'conceitos', 100);
    expect(conceitos.length).toBeGreaterThan(20);
    expect(conceitos.every(e => e.top === 'conceito')).toBe(true);
  });

  it('consulta que casa categoria vazia cai para busca por token', async () => {
    const entities = await listEntities();
    const r = searchEntities(entities, 'mcp', 100);
    expect(r.length).toBeGreaterThan(3);
    expect(r.every(e => (e.slug + e.tags.join()).includes('mcp'))).toBe(true);
  });

  it('busca ampla por categoria enumera frameworks e padrões', async () => {
    const entities = await listEntities();
    const frameworks = searchEntities(entities, 'frameworks', 100);
    expect(frameworks.length).toBeGreaterThan(0);
    expect(frameworks.every(e => e.categoria === 'framework')).toBe(true);

    const padroes = applyCategoryFilter(entities, matchCategory('padrões')!);
    expect(padroes.length).toBeGreaterThan(0);
    expect(padroes.every(e => e.categoria === 'padrão')).toBe(true);
  });

  it('filtro explícito por categoria', async () => {
    const entities = await listEntities();
    const providers = searchEntities(entities, '', 100, 'provider');
    expect(providers.length).toBeGreaterThan(0);
    expect(providers.every(e => e.categoria === 'provider de LLM')).toBe(true);
  });

  it('entitySummary extrai definição e usos da doc', async () => {
    const entities = await listEntities();
    const lg = resolveEntity(entities, 'langgraph')!;
    const { definicao, usos } = entitySummary(lg);
    expect(definicao.length).toBeGreaterThan(20);
    expect(usos.length).toBeGreaterThanOrEqual(1);
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