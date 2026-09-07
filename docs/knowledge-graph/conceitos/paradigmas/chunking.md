---
titulo: "Chunking — Dividindo documentos para RAG"
tags: [chunking, rag, embeddings, retrieval, documentos]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: paradigmas
status: explored
wikilinks:
  - rag
  - embeddings
  - llms
  - vector-databases
  - prompt-engineering
---

# Chunking

> Chunking e o processo de dividir documentos grandes em pedacos menores (chunks) para que possam ser indexados e recuperados por sistemas RAG.

## O Problema que Resolve

```
DOCUMENTO: 100 paginas (50K palavras)

PROBLEMA 1: Context window limitada
- GPT-6: 128K tokens (nao cabe o documento inteiro)
- Claude: 200K tokens (ainda assim e muito)

PROBLEMA 2: Precisao da busca
- Buscar documento inteiro = irrelevante
- Buscar trecho especifico = preciso

SOLUCAO: Dividir em chunks de 200-1000 tokens
```

## Estrategias de Chunking

### 1. Chunking Estático

#### Por Tamanho (Fixed Size)

```
DOCUMENTO: "O transformers e uma arquitetura de IA..."
TAMANHO: 512 tokens

CHUNK 1: [0-512] "O transformers e uma arquitetura..."
CHUNK 2: [512-1024] "...que revolucionou o NLP..."
CHUNK 3: [1024-1536] "...sendo usado em todos os apps..."

PROS:
- Simples de implementar
- Uniforme

CONTRAS:
- Quebra frases no meio
- Perde contexto
```

#### Por Caracteres

```
TAMANHO: 1000 caracteres

CHUNK 1: [0-1000]
CHUNK 2: [1000-2000]
...
```

### 2. Chunking Semântico

#### Por Parágrafos

```
DOCUMENTO:
Paragrafo 1: "Introducao..."
Paragrafo 2: "Metodologia..."
Paragrafo 3: "Resultados..."
Paragrafo 4: "Conclusao..."

CHUNKS:
- Chunk 1 = Paragrafo 1 (completo)
- Chunk 2 = Paragrafo 2 (completo)
- Chunk 3 = Paragrafo 3 (completo)
- Chunk 4 = Paragrafo 4 (completo)

PROS:
- Mantem coerencia
- Sentido completo

CONTRAS:
- Tamanhos variados
- Pode ser muito grande
```

#### Por Frases

```
DOCUMENTO: "O transformers foi publicado em 2017. Ele revolucionou NLP."

CHUNK 1: "O transformers foi publicado em 2017."
CHUNK 2: "Ele revolucionou NLP."

PROS:
- Granularidade alta
- Precisao boa

CONTRAS:
- Muitos chunks
- Perde contexto entre frases
```

### 3. Chunking por sliding Window

```
DOCUMENTO: "A B C D E F G H I J"
JANELA: 3 tokens
OVERLAP: 1 token

CHUNK 1: [A B C]
CHUNK 2:   [C D E]
CHUNK 3:     [E F G]
CHUNK 4:       [G H I]
CHUNK 5:         [I J]

VANTAGEM: Overlap mantem contexto entre chunks
```

### 4. Chunking Hierárquico

```
DOCUMENTO COMPLETO
  |
  +-- CAPITULO 1
  |     +-- Secao 1.1
  |     +-- Secao 1.2
  |
  +-- CAPITULO 2
        +-- Secao 2.1
        +-- Secao 2.2

INDEXAR:
- Chunks de Secao (granularidade fina)
- Chunks de Capitulo (granularidade media)
- Resumo do Documento (granularidade grossa)

NA HORA DA BUSCA:
- Buscar em todos os niveis
- Retornar o chunk mais relevante
```

### 5. Chunking com LLM

```
PROCESSO:
1. Enviar documento para LLM
2. LLM identifica secoes semanticas
3. LLM cria chunks com resumos
4. Indexar chunks + resumos

EXEMPLO:
LLM: "Este paragrafo fala sobre arquitetura do modelo"
CHUNK: [texto] + metadata: {topico: "arquitetura"}
```

## Tamanho Ideal dos Chunks

| Tamanho | Tokens | Quando usar |
|---------|:------:|-------------|
| **Pequeno** | 100-200 | Perguntas especificas, Q&A |
| **Medio** | 300-500 | Uso geral (recomendado) |
| **Grande** | 500-1000 | Contexto amplo, resumo |
| **Muito grande** | 1000+ | Documentos inteiros (raro) |

### Regra de Ouro

```
TAMANHO IDEAL = 2-3x o tamanho medio da pergunta

EXEMPLO:
- Pergunta media: 50 tokens
- Chunk ideal: 100-150 tokens
```

## Overlap (Sobreposição)

```
SEM OVERLAP:
Chunk 1: [A B C D E]
Chunk 2: [F G H I J]
         ^-- Perde contexto entre E e F

COM OVERLAP (20%):
Chunk 1: [A B C D E]
Chunk 2:     [D E F G H]
Chunk 3:         [H I J K]

RECOMENDACAO: 10-20% de overlap
```

## Metadata e Chunks

```json
{
  "chunk_id": "doc1_chunk3",
  "content": "O transformers e uma arquitetura...",
  "metadata": {
    "source": "artigo_transformers.pdf",
    "page": 5,
    "chapter": "Introducao",
    "section": "1.1",
    "author": "Vaswani et al.",
    "date": "2017",
    "topics": ["transformers", "attention", "NLP"]
  },
  "embedding": [0.12, -0.45, 0.78, ...]
}
```

## Ferramentas de Chunking

| Ferramenta | Tipo | Biblioteca |
|------------|------|------------|
| LangChain | Multiplas | langchain |
| LlamaIndex | Semanticas | llama-index |
| Unstructured | Documentos | unstructured |
| Chunking (Custom) | Qualquer | Python |

## Comparativo

| Estrategia | Precisao | Velocidade | Complexidade | Uso |
|------------|:--------:|:----------:|:------------:|-----|
| Fixed Size | Media | Alta | Baixa | Basico |
| Por Paragrafo | Alta | Alta | Baixa | Documentos estruturados |
| Sliding Window | Alta | Media | Media | Texto corrido |
| Hierarquico | Muito alta | Media | Alta | Documentos complexos |
| Com LLM | Maxima | Baixa | Alta | Documentos criticos |

## Melhores Praticas

```
1. COMECAR SIMPLES
   - Fixed size com overlap e suficiente para maioria

2. TESTAR DIFERENTES TAMANHOS
   - 256, 512, 768 tokens e medir recall

3. ADICIONAR OVERLAP
   - 10-20% para manter contexto

4. USAR METADATA
   - Fonte, pagina, secao, data

5. AVALIAR QUALIDADE
   - Retrieval rate, precisao, relevancia
```

## Exemplo Completo

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Configurar splitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=50,
    length_function=len,
    separators=["\n\n", "\n", ". ", " ", ""]
)

# Dividir documento
chunks = splitter.split_text(documento)

# Resultado
for i, chunk in enumerate(chunks):
    print(f"Chunk {i}: {len(chunk)} chars")
```

## Conexoes

- [[rag]] — Chunking e essencial para RAG
- [[embeddings]] — Cada chunk vira um embedding
- [[llms]] — Chunks alimentam o contexto
- [[vector-databases]] — Chunks sao armazenados
- [[prompt-engineering]] — Chunks formatam o contexto

---

**Status:** Documento explorado — chunking completo
**Ultima atualizacao:** Setembro 2026
