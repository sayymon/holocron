---
titulo: "Explicar Decisões Técnicas"
modulo: 12
unidade: 10
tags: [comunicacao, decisoes-tecnicas, adr, trade-offs, entrevista]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Explicar Decisões Técnicas

## Por que é Crucial

- Entrevistadores avaliam **raciocínio** mais que a resposta final
- Demonstra senioridade (junior faz, senior explica por quê)
- Diferencia quem "seguiu tutorial" de quem **entende**

## Framework: Contexto → Opções → Decisão → Trade-off

```
1. CONTEXTO
   "Dado que [restrição/requisito]..."

2. OPÇÕES CONSIDERADAS
   "Avaliei A, B e C..."

3. DECISÃO
   "Escolhi B porque..."

4. TRADE-OFF ACEITO
   "O custo dessa escolha é... mas aceitável porque..."
```

### Exemplo

> "Por que usou pgvector ao invés de Pinecone?"

- **Contexto**: MVP com budget limitado, já usava Postgres
- **Opções**: Pinecone (managed), Chroma (local), pgvector (extensão)
- **Decisão**: pgvector — zero custo adicional, menos complexidade operacional
- **Trade-off**: performance inferior em escala, mas aceitável para <100K docs

## Decisões Comuns em AI Engineering

| Decisão | Opções Típicas | Critérios |
|---------|---------------|-----------|
| RAG vs Fine-tuning | RAG, FT, híbrido | Custo, atualização, qualidade |
| Modelo | GPT-4, Claude, open-source | Custo, latência, qualidade, privacidade |
| Vector DB | pgvector, Pinecone, Weaviate | Escala, custo, operação |
| Framework | LangChain, LlamaIndex, custom | Flexibilidade, maturidade |
| Deploy | Serverless, containers, edge | Latência, custo, escala |

## Documentação: ADR ([[adr]])

Toda decisão significativa deve ser documentada:

```markdown
# ADR-XXX: [Título]
## Status: Aceito
## Contexto: [Por que essa decisão é necessária]
## Decisão: [O que decidimos]
## Consequências: [Trade-offs aceitos]
```

## Conexões

- [[12-09-system-design-ia]] — explicar decisões durante system design
- [[12-11-perguntas-tecnicas-ia]] — justificar respostas técnicas
- [[11-05-apresentacao-defesa]] — defender decisões no capstone
