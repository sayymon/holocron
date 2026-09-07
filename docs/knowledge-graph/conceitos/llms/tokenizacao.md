---
titulo: "Tokenizacao — Como LLMs leem texto"
tags: [tokenizacao, tokens, bpe, sentencepiece, tiktoken, wordpiece]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: llms
status: explored
wikilinks:
  - llms
  - embeddings
  - transformers
  - prompt-engineering
  - geracao-texto
---

# Tokenizacao

> Tokenizacao e o processo de converter texto em numeros (tokens) que modelos de IA podem processar. E o primeiro passo de qualquer LLM.

## O Problema que Resolve

```
HUMANO: "Inteligencia Artificial e incrivel"

PROBLEMA: LLMs nao entendem texto, so numeros

SOLUCAO: Converter cada parte do texto em um numero
  "Intelig"   -> 12345
  "encia"     -> 67890
  "Artificial"-> 11111
  "e"         -> 22222
  "incrivel"  -> 33333

O modelo trabalha com [12345, 67890, 11111, 22222, 33333]
```

## Tipos de Tokenizacao

### 1. Por Palavras (Word Tokenization)

```
"O gato sentou no tapete"
-> ["O", "gato", "sentou", "no", "tapete"]
-> [1, 2, 3, 4, 5]

PROBLEMA:
- Vocabulario gigante (100k+ palavras)
- Nao handle palavras novas
- "intelligence" != "intelligently"
```

### 2. Por Caracteres (Char Tokenization)

```
"cat"
-> ["c", "a", "t"]
-> [3, 1, 20]

PROBLEMA:
- Sequencias muito longas
- Perde semantica
- "cat" = "act" = "tac"
```

### 3. Subword Tokenization (O Padrao)

```
"tokenization"
-> ["token", "ization"]
-> [1234, 5678]

VANTAGEM:
- Vocabulario moderado (~32k-100k tokens)
- Handle palavras novas
- Eficiente em memoria
```

## Algoritmos de Subword

### BPE (Byte Pair Encoding)

```
PROCESSO:
1. Comeca com caracteres individuais
2. Conta pares mais frequentes
3. Merge o par mais frequente em um novo token
4. Repete ate atingir tamanho desejado

EXEMPLO:
Corpus: "low low low low low lowest lowest newer newer newer wider"

Iteracao 1: l+o = lo (5 ocorrencias)
Iteracao 2: lo+w = low (5 ocorrencias)
Iteracao 3: low+e = lowe (2 ocorrencias)
Iteracao 4: low+er = lower (2 ocorrencias)

RESULTADO: "low", "er", "est", "new", "wid"
```

**Usado por:** GPT, Claude, Llama, Mistral

### WordPiece

```
DIFERENCA DO BPE:
- BPE: Merge pares mais frequentes
- WordPiece: Merge pares que maximizam likelihood

EXEMPLO:
"unbelievable" -> ["un", "##believ", "##able"]

O "##" indica que e continuacao da palavra anterior
```

**Usado por:** BERT, DistilBERT

### SentencePiece / Unigram

```
DIFERENCA:
- Unigram: Comeca com vocabulario grande, vai removendo
- SentencePiece: Lida com texto raw (sem pre-tokenizacao)

VANTAGEM:
- Funciona com qualquer idioma
- Nao precisa de espacos especiais
```

**Usado por:** T5, Llama, Gemini

## Tokens Especiais

| Token | Codigo | Funcao |
|-------|:------:|--------|
| endoftext | 50256 | Fim de texto |
| im_start | 100264 | Inicio de mensagem (ChatML) |
| im_end | 100265 | Fim de mensagem |
| pad | 0 | Preenchimento |
| unk | 1 | Token desconhecido |
| mask | 103 | Mascaramento (BERT) |

## Context Window e Tokens

| Modelo | Context Window | Tokens equivalem |
|--------|:--------------:|:----------------:|
| GPT-4o | 128K | ~96K palavras |
| Claude Opus | 200K | ~150K palavras |
| Gemini 3.x Flash | 1M | ~750K palavras |
| Gemini 3.x Pro | 2M | ~1.5M palavras |
| Llama 4 | 10M | ~7.5M palavras |

### Contagem Aproximada

```
1 token ~= 4 caracteres em ingles
1 token ~= 3 caracteres em portugues
1 token ~= 0.75 palavras em ingles
1 token ~= 0.6 palavras em portugues
100 tokens ~= 75 palavras
```

## Tokenizacao em Diferentes Idiomas

| Idioma | Eficiencia | Tokens por palavra |
|--------|:----------:|:------------------:|
| Ingles | Alta | 1.3 |
| Portugues | Media | 1.6 |
| Chines | Baixa | 1-2 por caracter |
| Japones | Baixa | 1-2 por caracter |
| Arabe | Media | 1.4 |

## Como Tokenizadores Lidam com Portugues

```
PROBLEMA: Tokenizadores treinados em ingles

"mae" -> ["m", "##ae"] (2 tokens)
"voce" -> ["v", "##o", "##ce"] (3 tokens)

SOLUCAO:
- Usar modelos com vocabulario multilingual
- Ou treinar tokenizador proprio
- GPT-4o e Claude tem suporte nativo
```

## Ferramentas de Tokenizacao

| Ferramenta | Tipo | Usado por |
|------------|------|-----------|
| tiktoken | BPE | OpenAI |
| SentencePiece | Unigram/BPE | Google, Meta |
| HuggingFace Tokenizers | Multiplo | Comunidade |
| WordPiece | WordPiece | BERT |

## Impacto no Custo

```
CUSTO = Numero de tokens x Preco por token

EXEMPLO (GPT-6 Astra):
- Input: $0.40 / 1M tokens
- Output: $1.60 / 1M tokens

1 documento (10K palavras) = ~13K tokens
Custo input: $0.005
Custo output: $0.02 (se gerar ~12K tokens)
```

## Conexoes

- [[llms]] — Modelos que usam tokenizacao
- [[embeddings]] — Representacoes vetoriais
- [[transformers]] — Arquitetura que processa tokens
- [[prompt-engineering]] — Como escrever prompts eficientes
- [[geracao-texto]] — Geracao depende de tokens

---

**Status:** Documento explorado — tokenizacao completa
**Ultima atualizacao:** Setembro 2026
