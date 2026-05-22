---
titulo: "Ideação e Arquitetura do Micro-SaaS"
modulo: 11
unidade: 1
tags: [capstone, ideacao, arquitetura, micro-saas, mvp]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Ideação e Arquitetura do Micro-SaaS

## Processo de Ideação

### Critérios de Seleção

| Critério | Peso | Pergunta |
|----------|------|----------|
| Viabilidade técnica | Alto | Consigo construir em 4-6 semanas? |
| Demonstra IA | Alto | Usa LLM/RAG/Agentes de forma não-trivial? |
| Valor real | Médio | Alguém pagaria por isso? |
| Diferenciação | Médio | Não é "mais um chatbot wrapper"? |
| Portfólio | Alto | Impressiona em entrevista? |

### Framework de Validação

```
1. Problema → Quem sofre com isso?
2. Solução → Como IA resolve melhor que alternativas?
3. Escopo → O que é MVP vs nice-to-have?
4. Risco → Qual a maior incerteza técnica?
5. Prova → Como demonstro que funciona?
```

## Arquitetura de Referência

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend    │────▶│  LLM/Agent  │
│  (Next.js)  │     │  (Fastify)   │     │  (LangGraph) │
└─────────────┘     └──────┬───────┘     └─────────────┘
                           │
                    ┌──────┴───────┐
                    │   Postgres   │
                    │  + pgvector  │
                    └──────────────┘
```

## Documentação Obrigatória

- **README.md** — visão geral, setup, uso
- **ADRs** — decisões arquiteturais ([[adr]])
- **Diagrama C4** — contexto, containers, componentes
- **API docs** — OpenAPI/Swagger

## Escopo do MVP

Definir claramente:
- ✅ O que entra no MVP (core value)
- ❌ O que fica para v2 (backlog)
- ⚠️ Riscos técnicos a validar primeiro (spike)

## Conexões

- [[11-02-fundamentos-rag-agentes]] — implementação do core de IA
- [[11-03-orquestracao-backend-mcp]] — backend que suporta a arquitetura
- [[modulo-08-arquitetura-ia]] — padrões arquiteturais aplicados
- [[modulo-09-gestao-projetos-ia]] — gestão do projeto capstone
