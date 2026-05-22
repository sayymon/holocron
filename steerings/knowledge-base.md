# Knowledge Base — Padrões de Documentação

## Princípios

1. **Atômico** — cada documento cobre UM conceito/tópico
2. **Versionado** — Git é a fonte de verdade
3. **Obsidian-compatible** — wikilinks, tags, graph view funciona
4. **Rastreável** — toda informação tem fonte declarada
5. **Portável** — o engine é genérico, a KB é plugável

## Front Matter (obrigatório)

Todo documento da Knowledge Base DEVE ter Front Matter YAML:

```yaml
---
titulo: "Nome do Conceito"
modulo: 1
unidade: 3
tags:
  - llm
  - transformers
  - fundamentos
dificuldade: intermediario  # basico | intermediario | avancado
fonte: "Aula 1.3 - Introdução a LLMs"
atualizado_em: 2026-05-22
confiabilidade: alta  # alta | media | baixa
---
```

## Estrutura de um Documento

```markdown
---
(front matter)
---

# Título do Conceito

> Resumo em uma frase (para embedding e preview)

## O que é

Explicação clara e direta.

## Como funciona

Detalhamento técnico.

## Exemplo prático

Código ou demonstração.

## Conexões

- [[conceito-relacionado-1]]
- [[conceito-relacionado-2]]

## Fontes

- Aula X.Y do curso
- Referência externa (se houver)
```

## Organização

```
docs/
├── curso/                    # Conteúdo por módulo
│   └── modulo-XX-nome/       # Um dir por módulo
│       └── conceito.md       # Um arquivo por conceito
├── conceitos/                # Conceitos transversais
├── ferramentas/              # Ferramentas e stack
├── projetos/                 # Projetos práticos
├── fontes/                   # Registro de fontes
└── adrs/                     # Architecture Decision Records
```

## Naming

- Arquivos: `kebab-case.md`
- Diretórios de módulo: `modulo-XX-nome-curto`
- Wikilinks: `[[nome-do-arquivo]]` (sem extensão)

## O que NÃO vai na Knowledge Base

- **Dados do aluno** → PostgreSQL (progresso, scores, interações)
- **Memória do agente** → PostgreSQL (contexto, histórico)
- **Embeddings** → pgvector no PostgreSQL
- **Configurações** → arquivos de config no repo

## Sistema de Fontes

Cada informação deve ser rastreável:

```yaml
confiabilidade: alta    # Fonte primária (aula oficial, documentação)
confiabilidade: media   # Fonte secundária (artigo, tutorial)
confiabilidade: baixa   # Inferência ou interpretação pessoal
```

## Realimentação

A KB é viva — novos conteúdos são adicionados conforme:
1. Novas aulas são assistidas
2. Novos conceitos são aprendidos na prática
3. Fontes externas complementam o conteúdo
4. O agente identifica gaps no conhecimento
