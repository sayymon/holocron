---
titulo: "Introdução a LLMs — Transformers, Embeddings, Attention"
modulo: 1
unidade: 2
tags:
  - llm
  - transformers
  - embeddings
  - attention
  - fundamentos
dificuldade: intermediario
fonte: "Aula 1.2 - Introdução a LLMs"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Introdução a LLMs — Transformers, Embeddings, Attention

> Como funcionam os Large Language Models: a arquitetura que revolucionou a IA.

## O que é

LLMs (Large Language Models) são modelos de deep learning treinados em quantidades massivas de texto que conseguem gerar, entender e transformar linguagem natural.

## Como funciona

### Transformers
Arquitetura introduzida em 2017 ("Attention is All You Need") que processa sequências em paralelo usando mecanismos de atenção.

### Embeddings
Representações numéricas (vetores) de palavras/frases que capturam significado semântico. Palavras similares ficam próximas no espaço vetorial.

### Attention (Self-Attention)
Mecanismo que permite ao modelo "prestar atenção" em diferentes partes do input ao gerar cada token de output.

## Exemplos de LLMs

- **GPT-4** (OpenAI) — proprietário, multimodal
- **Gemini** (Google) — proprietário, multimodal
- **Claude** (Anthropic) — proprietário, foco em segurança
- **LLaMA** (Meta) — open-source
- **Mistral** — open-source, eficiente

## Aplicação no Holocron

- Embeddings para indexar a Knowledge Base (pgvector)
- LLMs como cérebro do Agente Tutor
- Attention para entender contexto do aluno

## Conexões

- [[rag-embeddings-busca]] — RAG usa embeddings
- [[modelos-open-vs-proprietarios]] — comparativo
- [[historia-ia]] — contexto histórico

## Fontes

- Aula 1.2 do curso
- Paper: "Attention is All You Need" (Vaswani et al., 2017)
