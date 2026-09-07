---
titulo: "AGENTS.md — Regras de Atomicidade"
data: '2026-09-07'
tipo: meta
---

# AGENTS.md — Regras de Atomicidade para o Knowledge Graph

> Este documento define as regras que devem ser seguidas ao criar ou expandir documentos no Knowledge Graph do Holocron. O objetivo é garantir **atomicidade**, **profundidade** e **consistência**.

---

## 1. Princípio da Atomicidade

### Regra de Ouro

```
UM CONCEITO = UM DOCUMENTO

Cada doc deve ser AUTOCONTIDO — explicar um conceito/ferramenta
de forma completa, sem depender de outros docs para entender o básico.
```

### O que é um Átomo

| Característica | Descrição |
|----------------|-----------|
| **Foco único** | Um conceito, uma ferramenta, uma técnica |
| **Autocontido** | Pode ser lido isoladamente |
| **Linkado** | Conecta-se a outros átomos via wikilinks |
| **Profundo** | Não é superficial — explora história, arquitetura, uso |
| **Front Matter** | YAML com tags, fonte, confiabilidade, data, ring, area |

### Exemplos de Átomos Corretos

```
✅ CORRETO:
  lora.md → Tudo sobre LoRA (história, arquitetura, uso, comparações)
  openai-gpt.md → Tudo sobre OpenAI GPT (modelos, preços, benchmarks)
  geracao-texto.md → Tudo sobre geração de texto (LLMs, aplicações)

❌ ERRADO:
  ia-gerativa.md → Muito amplo (deveria ser 5+ docs)
  ferramentas.md → Muito amplo (deveria ser 1 doc por ferramenta)
  modelos.md → Muito amplo (deveria ser 1 doc por modelo)
```

---

## 2. Hierarquia de Documentos

### Estrutura de Pastas

```
docs/knowledge-graph/
├── conceitos/
│   ├── fundamentos/          ← Conceitos base (ia, ml, dl, nlp)
│   ├── llms/                 ← LLMs e embeddings
│   ├── paradigmas/           ← RAG, agentes, fine-tuning, prompts
│   ├── generative-ai/        ← IA Generativa
│   │   ├── visao-geral.md
│   │   ├── historia.md
│   │   ├── aplicacoes/       ← Docs atômicos por modalidade
│   │   │   ├── geracao-texto.md
│   │   │   ├── geracao-codigo.md
│   │   │   ├── geracao-imagem.md
│   │   │   ├── geracao-audio.md
│   │   │   ├── geracao-video.md
│   │   │   └── multimodal.md
│   │   └── benchmarks/
│   └── padroes/              ← MCP, HITL
│
└── ferramentas/
    ├── providers-llm/        ← 1 doc por provider
    ├── frameworks/           ← 1 doc por framework
    ├── infraestrutura/       ← Vector DBs, gateways, observability
    ├── codificacao/          ← IDEs e assistentes
    └── mcp-servers/          ← 1 doc por server
```

### Regras de Pasta

| Pasta | Conteúdo | Exemplo |
|-------|----------|---------|
| `fundamentos/` | Conceitos base de IA | ia.md, ml.md, dl.md |
| `llms/` | Modelos de linguagem | llms.md, embeddings.md |
| `paradigmas/` | Como construir com IA | rag.md, agentes.md |
| `generative-ai/` | IA Generativa | historias, aplicações, benchmarks |
| `providers-llm/` | Provedores de modelos | openai-gpt.md, claude.md |
| `frameworks/` | Frameworks de orquestração | langchain.md, langgraph.md |

---

## 3. Front Matter Obrigatório

Todo documento DEVE ter:

```yaml
---
titulo: "Título Descritivo"
tags: [tag1, tag2, tag3]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta|média|baixa
data: YYYY-MM-DD
ring: 0|1|2
area: fundamentos|llms|paradigmas|generative-ai|padroes|tools-*
status: explored|stub
wikilinks:
  - conceito1
  - conceito2
---
```

### Valores de Ring

| Ring | Significado | Exemplo |
|:----:|-------------|---------|
| 0 | Conceito central | ia.md |
| 1 | Conceito importante | llms.md, transformers.md |
| 2 | Detalhe/ferramenta | openai-gpt.md, lora.md |

---

## 4. Profundidade Mínima

### Todo documento DEVE ter:

1. **Definição clara** — O que é, em 1-2 frases
2. **Problema que resolve** — Por que existe
3. **Como funciona** — Mecanismo/arquitetura
4. **Aplicações** — Casos de uso reais
5. **Comparativo** — vs alternativas (quando aplicável)
6. **Conexões** — Wikilinks para outros conceitos

### Para ferramentas/providers, adicionar:

7. **Modelos/preços** — Tabela atualizada
8. **Benchmarks** — Scores relevantes
9. **Quando usar** — ✅ Use quando / ❌ Evite quando
10. **Conexões** — Links com conceitos e outras ferramentas

---

## 5. Tamanho dos Documentos

| Tipo | Tamanho Recomendado | Exemplo |
|------|:-------------------:|---------|
| Conceito base | 200-400 linhas | ia.md, nlp.md |
| Conceito detalhado | 300-500 linhas | lora.md, rag.md |
| Provider/Modelo | 150-300 linhas | openai-gpt.md |
| Framework | 150-250 linhas | langchain.md |
| Aplicação | 200-400 linhas | geracao-texto.md |

### Se o doc passar de 500 linhas:

**DIVIDIR em múltiplos docs atômicos!**

Exemplo:
- ❌ `generative-ai.md` (600 linhas) → Muito grande
- ✅ `generative-ai/visao-geral.md` + `aplicacoes/geracao-texto.md` + ...

---

## 6. Regras de Criação

### Antes de criar um doc:

1. **Verificar se já existe** — Buscar por similar
2. **Definir o átomo** — Qual conceito específico?
3. **Mapear conexões** — Quais outros docs se conectam?
4. **Escolher a pasta** — Onde fica na hierarquia?

### Ao criar um doc:

1. **Front Matter completo** — Todos os campos obrigatórios
2. **Definição no topo** — O que é em 1-2 frases
3. **Estrutura lógica** → História → Como funciona → Aplicações → Conexões
4. **Wikilinks** — Linkar todos os conceitos relacionados
5. **Tabelas** — Usar para comparativos e listas
6. **Código/diagramas** — Quando ajuda na explicação

### Após criar um doc:

1. **Atualizar `_index.md`** — Adicionar ao índice
2. **Atualizar `_estado-exploracao.md`** — Incrementar contadores
3. **Atualizar docs existentes** — Adicionar wikilinks de volta

---

## 7. Regras de Atualização

### Quando atualizar um doc:

- Novo modelo lançado (ex: GPT-6 Astra)
- Preços mudaram
- Benchmarks atualizados
- Novas aplicações descobertas
- Correções de erros

### Como atualizar:

1. **Manter a estrutura** — Não reorganizar sem necessidade
2. **Atualizar data** — No front matter
3. **Preservar links** — Não quebrar wikilinks
4. **Adicionar novo conteúdo** — Não remover o existente

---

## 8. Exemplo de Átomo Completo

```yaml
---
titulo: "LoRA — Low-Rank Adaptation"
tags: [lora, peft, fine-tuning, parameter-efficient]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 2
area: paradigmas
status: explored
wikilinks:
  - peft
  - qlora
  - fine-tuning
  - transformers
  - llms
---

# LoRA — Low-Rank Adaptation

> LoRA é a técnica de fine-tuning eficiente que decompõe a atualização 
> de pesos em duas matrizes de baixo-rango, treinando apenas ~0.1% dos 
> parâmetros enquanto mantém ~95-98% da qualidade do fine-tuning completo.

## O Problema que LoRA Resolve
[Explica o problema]

## Como LoRA Funciona
[Arquitetura e matemática]

## Hiperparâmetros
[Tabela de configurações]

## Quando Usar
[✅ Use quando / ❌ Evite quando]

## Comparativo
[Tabela com alternativas]

## Conexões
[Wikilinks]
```

---

## 9. Checklist de Qualidade

Antes de finalizar um doc, verificar:

- [ ] Front Matter completo e válido
- [ ] Definição clara no topo
- [ ] Problema que resolve explicado
- [ ] Como funciona com diagramas/código
- [ ] Aplicações com exemplos reais
- [ ] Comparativo com alternativas
- [ ] Wikilinks corretos (sem quebrados)
- [ ] Tamanho adequado (200-500 linhas)
- [ ] `_index.md` atualizado
- [ ] `_estado-exploracao.md` atualizado

---

**Status:** Regras definidas — seguir este guia para todos os novos docs
**Última atualização:** 2026-09-07
