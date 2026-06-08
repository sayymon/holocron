---
titulo: "Tokenização e Anatomia do GPT — Como LLMs realmente leem texto"
tags: [tokens, tokenizacao, gpt, transformers, attention, bpe, tiktoken, fundamentos]
fonte: "Estudo pessoal — curso Engenharia de IA Aplicada"
confiabilidade: alta
data: 2026-06-04
---

# Tokenização e Anatomia do GPT

## O Insight Principal

**Tokens NÃO são palavras nem letras.** São fragmentos de informação — pedaços de texto que o modelo aprendeu a reconhecer como unidades úteis durante o treinamento. Uma palavra pode ser 1 token, vários tokens, ou até parte de um token maior.

## Tokenização na Prática

### O que é um Token?

Um token é a unidade mínima de processamento de um LLM. O texto é quebrado em tokens antes de qualquer processamento:

| Texto | Tokens (GPT-4/tiktoken) | Qtd |
|-------|--------------------------|-----|
| "Hello" | `["Hello"]` | 1 |
| "tokenização" | `["token", "ização"]` | 2 |
| "indistinguishable" | `["ind", "isting", "u", "ishable"]` | 4 |
| " " (espaço) | geralmente colado ao próximo token | — |
| "GPT-4" | `["G", "PT", "-", "4"]` | 4 |
| "123456" | `["123", "456"]` | 2 |

### Por que fragmentos e não palavras?

1. **Vocabulário finito** — um tokenizer tem ~50k-100k tokens no vocabulário. Não dá para ter todas as palavras de todas as línguas
2. **Subpalavras** — fragmentos permitem representar palavras nunca vistas combinando pedaços conhecidos
3. **Eficiência** — palavras comuns viram 1 token ("the", "is"), raras são decompostas
4. **Multilíngue** — funciona para qualquer idioma sem vocabulário específico

### BPE (Byte-Pair Encoding) — O Algoritmo

O tokenizer mais usado (GPT, Claude, LLaMA) é baseado em BPE:

```
1. Começa com todos os bytes individuais (256 tokens base)
2. Conta pares de tokens adjacentes mais frequentes no corpus
3. Merge o par mais frequente em um novo token
4. Repete até atingir tamanho de vocabulário desejado (ex: 100k)
```

Resultado: tokens frequentes são longos ("the", "tion"), tokens raros são curtos (letras individuais).

### Ferramentas para Visualizar Tokens

| Ferramenta | Uso |
|------------|-----|
| [tiktoken](https://github.com/openai/tiktoken) | Lib Python oficial da OpenAI |
| [OpenAI Tokenizer](https://platform.openai.com/tokenizer) | Calculadora visual online |
| [tiktokenizer.vercel.app](https://tiktokenizer.vercel.app/) | Visualizador web interativo |

```python
import tiktoken

enc = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode("Algoritmos genéticos são fascinantes")
print(len(tokens))  # ex: 6 tokens
print(tokens)       # IDs numéricos
print([enc.decode([t]) for t in tokens])  # cada token como texto
```

### Implicações Práticas de Tokenização

| Fato | Impacto |
|------|---------|
| Português usa ~1.5x mais tokens que inglês para o mesmo texto | Custo maior por API call |
| Código é tokenizado de forma diferente de prosa | Indentação e sintaxe viram tokens |
| Números são tokenizados por pedaços | LLMs "não sabem matemática" por isso |
| Context window é medida em tokens, não palavras | 128K tokens ≠ 128K palavras |
| Cada token tem um ID numérico no vocabulário | É o que o modelo realmente processa |

## A Pipeline: Tokens → Embeddings → Attention

### O Fluxo Mental Correto

```
TEXTO → TOKENS → EMBEDDINGS → SELF-ATTENTION → OUTPUT
         ↓           ↓              ↓
     fragmentos   posição no     peso e direção
     do texto     espaço         (contexto)
                  semântico
```

| Etapa | O que faz | Analogia |
|-------|-----------|----------|
| **Tokenização** | Quebra texto em fragmentos processáveis | Cortar um livro em cards |
| **Embeddings** | Define a proximidade semântica entre tokens — posiciona cada token em um espaço vetorial onde tokens similares ficam próximos | Plotar cada card em um mapa 3D onde "rei" fica perto de "rainha" |
| **Self-Attention** | Correlaciona tokens dando peso e direção — cada token "olha" para todos os outros e decide quais são relevantes para si | Cada card desenha setas para os cards relacionados, com espessura proporcional à relevância |
| **Multi-Head Attention** | Vários transformers em paralelo, cada um buscando um tipo diferente de relação | Múltiplos analistas olhando os mesmos cards, cada um focando em um aspecto (sintaxe, semântica, co-referência) |

### Embeddings — O Mapa Semântico

Embeddings NÃO são apenas "números para representar palavras". São **coordenadas em um espaço onde distância = similaridade de significado**.

```
Espaço vetorial (simplificado 2D):

         rei •
              \
    rainha •   \ (direção "gênero")
                \
     homem •----→ mulher •
              (mesma direção!)
```

Propriedades aprendidas:
- `vetor("rei") - vetor("homem") + vetor("mulher") ≈ vetor("rainha")`
- Tokens que aparecem em contextos similares ficam próximos
- Dimensionalidade real: 768 a 12288 dimensões (não 2D!)

### Self-Attention — O Correlacionador

Depois que cada token tem seu embedding (posição semântica), o self-attention faz a mágica: **dá peso e direção** baseado no contexto.

A mesma palavra "banco" tem o MESMO embedding inicial, mas depois do self-attention:
- "Sentei no **banco** do parque" → attention pesa: sentei, parque → significado = assento
- "Depositei no **banco** central" → attention pesa: depositei, central → significado = instituição

**Self-attention transforma significado estático (embedding) em significado contextual.**

### Multi-Head Attention — Paralelismo de Perspectivas

Um único mecanismo de atenção capturaria apenas um tipo de relação. Multi-head resolve isso rodando **N atenções em paralelo**, cada uma aprendendo a focar em algo diferente:

```
Input: "O gato que eu vi ontem dormiu no sofá"

Cabeça 1 (sintática):    "gato" ←→ "dormiu" (sujeito-verbo)
Cabeça 2 (referência):   "que" ←→ "gato" (co-referência)
Cabeça 3 (temporal):     "ontem" ←→ "vi" (quando aconteceu)
Cabeça 4 (espacial):     "no" ←→ "sofá" (localização)
...
Cabeça N: outro padrão emergente

→ Concatena todos os resultados → visão COMPLETA do contexto
```

GPT-4 usa ~96 cabeças por camada × ~120 camadas = **milhares de perspectivas simultâneas**.

---

## Anatomia do GPT

### O Nome Decoded

**G**enerative **P**re-trained **T**ransformer:

| Parte | Significado |
|-------|-------------|
| **Generative** | Gera texto token a token (autoregressivo) |
| **Pre-trained** | Treinado previamente em corpus massivo (fase 1) |
| **Transformer** | Arquitetura baseada em mecanismo de atenção |

### O Mecanismo de Atenção (Attention)

A inovação central dos Transformers. Em vez de processar texto sequencialmente (como RNNs), a atenção permite que cada token "olhe" para todos os outros tokens simultaneamente.

#### Self-Attention — Intuição

Para a frase "O gato sentou no tapete porque **ele** estava cansado":
- O modelo precisa saber que "ele" se refere a "gato"
- Self-attention calcula um "score de atenção" entre "ele" e cada outro token
- "gato" recebe score alto → modelo entende a referência

#### Como funciona (simplificado)

```
Para cada token:
1. Gera 3 vetores: Query (Q), Key (K), Value (V)
2. Score = Q · K^T (produto escalar — quão relevante é cada outro token)
3. Weights = softmax(Score / √d)  (normaliza para probabilidades)
4. Output = Weights × V  (média ponderada dos valores)
```

O "√d" é o fator de escala que estabiliza gradientes.

#### Multi-Head Attention

Em vez de uma única atenção, usa **múltiplas "cabeças"** em paralelo. Cada cabeça pode aprender a prestar atenção em aspectos diferentes:
- Cabeça 1: relações sintáticas (sujeito-verbo)
- Cabeça 2: relações semânticas (sinônimos)
- Cabeça 3: proximidade posicional
- Etc.

GPT-4 tem ~96 cabeças de atenção por camada.

### Arquitetura Completa (GPT-style)

```
Input: "O gato sentou"
    ↓
[Tokenização] → [354, 1029, 8921]
    ↓
[Embedding Layer] → vetores densos (ex: 12288 dimensões)
    ↓
[+ Positional Encoding] → injetar informação de posição
    ↓
[Transformer Block × N camadas]
  ├── Multi-Head Self-Attention
  ├── Layer Normalization
  ├── Feed-Forward Network (MLP)
  └── Layer Normalization
    ↓
[Linear + Softmax] → probabilidade do próximo token
    ↓
Output: token mais provável (ex: "no")
```

### Sampling — O Funil que Gera o Próximo Token

Sampling é o **último estágio** do pipeline de geração. Depois de toda a maquinaria dos Transformers (embeddings → attention → feed-forward), o modelo produz uma distribuição de probabilidade sobre TODO o vocabulário (~100K tokens). O sampling é o processo que **filtra e seleciona** um único token dessa distribuição.

#### O Ciclo Autoregressivo

A parte crucial: o token selecionado é **anexado ao final do contexto** e o processo inteiro roda novamente. É um loop:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Contexto: "O céu é"                                    │
│       ↓                                                 │
│  [Tokenização] → [354, 8821, 502]                       │
│       ↓                                                 │
│  [Embeddings] → vetores semânticos                      │
│       ↓                                                 │
│  [Transformer × N camadas] → attention + feed-forward   │
│       ↓                                                 │
│  [Logits] → scores brutos para ~100K tokens             │
│       ↓                                                 │
│  ┌──── SAMPLING (funil) ────┐                           │
│  │ 1. Temperature (reescala)│                           │
│  │ 2. Top-K (corte fixo)    │                           │
│  │ 3. Top-P (corte dinâmico)│                           │
│  │ 4. Sortear 1 token       │                           │
│  └──────────────────────────┘                           │
│       ↓                                                 │
│  Token selecionado: "azul"                              │
│       ↓                                                 │
│  ANEXA ao contexto → "O céu é azul"                     │
│       ↓                                                 │
│  ← VOLTA para o início (novo ciclo) ←──────────────────┘
│
│  Próximo ciclo: contexto = "O céu é azul"
│  → Transformer processa tudo de novo
│  → Sampling gera próximo token: "e"
│  → Contexto vira: "O céu é azul e"
│  → ... repete até [EOS] ou max_tokens
```

#### Por que é um "funil"?

```
~100.000 tokens no vocabulário (todos com alguma probabilidade)
        ↓ Temperature
    Probabilidades reescaladas (concentra ou espalha)
        ↓ Top-K
    Máximo K candidatos (ex: 40)
        ↓ Top-P
    Só os que somam P de probabilidade (ex: 5-15 tokens)
        ↓ Amostragem
    ★ 1 único token selecionado ★
```

De ~100K possibilidades → 1 token. A cada ciclo.

#### Implicações Práticas do Loop

| Fato | Consequência |
|------|-------------|
| Cada token requer passar por TODO o modelo | Geração é lenta (sequencial, não paralela) |
| O contexto cresce a cada ciclo | Custo computacional aumenta quadraticamente (attention é O(n²)) |
| Token errado no meio contamina o resto | "Hallucination cascade" — um erro gera mais erros |
| O modelo só vê tokens anteriores (causal mask) | Não pode "voltar atrás" e corrigir |
| [EOS] (end-of-sequence) é um token como qualquer outro | O modelo "decide" parar quando sorteia esse token |
| Max tokens é um corte abrupto | Pode cortar no meio de uma frase |

#### Greedy vs Sampling vs Beam Search

| Estratégia | Como funciona | Trade-off |
|------------|---------------|-----------|
| **Greedy** (temp=0) | Sempre pega o token mais provável | Rápido, determinístico, mas repetitivo |
| **Sampling** (temp>0) | Sorteia baseado nas probabilidades filtradas | Diverso, criativo, mas pode divergir |
| **Beam Search** | Mantém N sequências candidatas em paralelo, escolhe a melhor no final | Melhor qualidade média, mas mais lento e menos criativo |

#### O Custo do Loop

Se uma resposta tem 500 tokens, o modelo rodou **500 forward passes completos**:

```
Pass 1: processa contexto de N tokens → gera token 1
Pass 2: processa contexto de N+1 tokens → gera token 2
Pass 3: processa contexto de N+2 tokens → gera token 3
...
Pass 500: processa contexto de N+499 tokens → gera token 500
```

Isso explica por que:
- Respostas longas são mais caras (mais passes)
- Contexto grande é mais lento (cada pass processa mais)
- Streaming funciona token a token (cada token aparece conforme é gerado)
- `max_tokens` controla custo diretamente

### Fases de Treinamento

| Fase | O que acontece | Dados |
|------|---------------|-------|
| **Pre-training** | Prever próximo token (unsupervised) | Trilhões de tokens da internet |
| **Fine-tuning (SFT)** | Ajustar para seguir instruções | Dados curados de instrução |
| **RLHF/RLAIF** | Alinhar com preferências humanas | Feedback humano/IA |

### Parâmetros de Geração (Sampling)

Depois que o modelo calcula a probabilidade de cada token possível (distribuição sobre o vocabulário inteiro), os parâmetros de sampling **filtram e reescalam** essa distribuição antes de sortear o próximo token.

#### Temperature — O Filtro de Confiança

Reescala as probabilidades antes da seleção. Controla quão "achatada" ou "pontiaguda" é a distribuição.

```
Exemplo — próximo token após "O céu é":

Token      | Prob original | Temp=0.2    | Temp=1.0  | Temp=1.5
-----------|---------------|-------------|-----------|----------
"azul"     | 0.50          | 0.92 ↑↑     | 0.50      | 0.35 ↓
"bonito"   | 0.25          | 0.07        | 0.25      | 0.25
"infinito" | 0.10          | 0.01        | 0.10      | 0.15 ↑
"verde"    | 0.05          | 0.00        | 0.05      | 0.10 ↑
"banana"   | 0.01          | 0.00        | 0.01      | 0.05 ↑
```

| Temperature | Efeito | Quando usar |
|-------------|--------|-------------|
| **0** | Sempre escolhe o token mais provável (greedy/determinístico) | Extração de dados, código, fatos |
| **0.1–0.3** | Quase determinístico, mínima variação | Tarefas estruturadas, JSON |
| **0.7–0.9** | Balanceado — criativo mas coerente | Conversação, escrita geral |
| **1.0** | Distribuição original do modelo | Brainstorm, criatividade |
| **>1.0** | Distribuição achatada — tokens improváveis ganham chance | Experimentação, poesia |

**Fórmula intuitiva:** `temperature baixa → concentra peso nos mais prováveis → mais previsível`

#### Top-K — Limite Rígido de Candidatos

Restringe o número de tokens candidatos a exatamente K opções (as K mais prováveis). Todos os demais são descartados antes do sorteio.

```
Vocabulário total: ~100.000 tokens com probabilidades

Top-K = 3:  Só considera os 3 mais prováveis
  "azul"    (0.50) ✅
  "bonito"  (0.25) ✅
  "infinito"(0.10) ✅
  "verde"   (0.05) ❌ cortado
  ... todos os outros ❌ cortados

→ Renormaliza: azul=0.59, bonito=0.29, infinito=0.12
→ Sorteia entre esses 3
```

| Top-K | Efeito | Quando usar |
|-------|--------|-------------|
| **1** | Equivale a temperature=0 (sempre o top 1) | Máxima precisão |
| **5–10** | Texto preciso, pouca variação | Respostas factuais |
| **40–100** | Balanceado | Uso geral |
| **500+** | Muito diverso, pode perder coerência | Geração criativa |

**Insight:** Top-K é um corte **fixo** — sempre K tokens, independente de quão confiante o modelo está.

#### Top-P (Nucleus Sampling) — Limite Dinâmico por Probabilidade

Em vez de cortar um número fixo (Top-K), corta por **probabilidade acumulada**. Inclui tokens até que a soma das probabilidades atinja P.

```
Top-P = 0.9 → inclui tokens até somar 90% de probabilidade

Caso 1 — modelo CONFIANTE:
  "azul"    (0.85) ✅  → acumulado: 0.85
  "bonito"  (0.08) ✅  → acumulado: 0.93 > 0.9 → PARA
  → Só 2 tokens considerados (cortou cedo porque havia certeza)

Caso 2 — modelo INCERTO:
  "azul"    (0.20) ✅  → acumulado: 0.20
  "bonito"  (0.18) ✅  → acumulado: 0.38
  "infinito"(0.15) ✅  → acumulado: 0.53
  "lindo"   (0.14) ✅  → acumulado: 0.67
  "vasto"   (0.12) ✅  → acumulado: 0.79
  "imenso"  (0.10) ✅  → acumulado: 0.89
  "claro"   (0.05) ✅  → acumulado: 0.94 > 0.9 → PARA
  → 7 tokens considerados (mais opções porque o modelo estava inseguro)
```

| Top-P | Efeito | Quando usar |
|-------|--------|-------------|
| **0.1** | Só tokens de altíssima confiança passam — muito restritivo | Extração, fatos |
| **0.5** | Moderadamente restritivo | Respostas diretas |
| **0.9** | Balanceado — padrão da maioria das APIs | Uso geral |
| **0.95–1.0** | Quase tudo passa, máxima diversidade | Criatividade |

**A vantagem do Top-P sobre Top-K:** é **adaptativo**. Quando o modelo tem certeza, considera poucos tokens. Quando está incerto, abre o leque automaticamente.

#### Combinação na Prática

Os parâmetros são aplicados em sequência (pipeline de filtragem):

```
Distribuição original (~100K tokens)
    ↓
[Temperature] → reescala probabilidades
    ↓
[Top-K] → corta para máximo K candidatos
    ↓
[Top-P] → corta por probabilidade acumulada
    ↓
[Amostragem] → sorteia 1 token da distribuição filtrada
```

**Receitas comuns:**

| Caso de uso | Temperature | Top-K | Top-P |
|-------------|-------------|-------|-------|
| Código, JSON, extração | 0 | 1 | 1.0 |
| Conversação geral | 0.7 | 40 | 0.9 |
| Escrita criativa | 1.0 | 100 | 0.95 |
| Brainstorm maluco | 1.3 | 200 | 0.98 |

**Dica:** Na maioria das APIs (OpenAI, Anthropic), usa-se **Temperature + Top-P** e ignora-se Top-K. O recomendado é ajustar um OU outro (não os dois agressivamente ao mesmo tempo).

#### Outros Parâmetros

| Parâmetro | Efeito |
|-----------|--------|
| **Max tokens** | Limite máximo de tokens na resposta |
| **Stop sequences** | Tokens/strings que interrompem a geração imediatamente |
| **Frequency penalty** | Penaliza tokens que já apareceram (evita repetição) |
| **Presence penalty** | Penaliza tokens presentes no texto (força diversidade de vocabulário) |

## Context Window e Custo

### Cálculo de Custo

```
Custo = (tokens_input + tokens_output) × preço_por_token
```

Regra de bolso para **português**:
- ~1 token ≈ 0.7 palavras (ou ~1.5 tokens por palavra)
- 1000 tokens ≈ 700 palavras em PT-BR

### Context Windows Atuais (2026)

| Modelo | Context Window | Observação |
|--------|---------------|------------|
| GPT-4o | 128K tokens | ~90K palavras PT |
| Claude Sonnet 4 | 200K tokens | ~140K palavras PT |
| Gemini 1.5 Pro | 1M tokens | ~700K palavras PT |
| Mistral Large | 128K tokens | Open-weight |

## Conexões

- [[llms-transformers]] — visão geral de LLMs
- [[rag-embeddings-busca]] — embeddings são a camada antes da atenção
- [[consistencia-custo-eficiencia]] — otimizar uso de tokens = reduzir custo
- [[engenharia-prompts-avancada]] — entender tokens ajuda a craftar prompts melhores

## Referências

- Paper: "Attention is All You Need" (Vaswani et al., 2017)
- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
- [tiktoken — GitHub](https://github.com/openai/tiktoken)
- [3Blue1Brown — Transformers Visualized](https://www.youtube.com/watch?v=wjZofJX0v4M)
- [Jay Alammar — The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
