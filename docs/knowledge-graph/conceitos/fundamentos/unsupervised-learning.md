---
titulo: "Unsupervised Learning — Aprendizado Nao-Supervisionado"
tags: [unsupervised-learning, clustering, dimenso-reduction, pca, kmeans]
fonte: "Knowledge Graph — Holocron AI Engineer"
confiabilidade: alta
data: 2026-09-07
ring: 1
area: fundamentos
status: explored
wikilinks:
  - ia
  - machine-learning
  - deep-learning
  - supervised-learning
  - reinforcement-learning
  - embeddings
---

# Unsupervised Learning

> Unsupervised Learning e o paradigma de machine learning onde o modelo aprende a partir de dados SEM ROTULOS. O modelo descobre padroes, estrutura e organizacao natural dos dados.

## O Problema que Resolve

```
DADOS: 1 milhao de clientes de e-commerce

PROBLEMA: Como agrupar clientes similares?

SOLUCAO:
  Modelo encontra GRUPOS naturais:
    Grupo 1: "Compradores de eletronicos"
    Grupo 2: "Compradores de roupas"
    Grupo 3: "Compradores de livros"
    Grupo 4: "Compradores casuais"

  NENHUM rotulo foi dado!
  Modelo DESCOBRIU os grupos
```

## Como Funciona

```
1. COLETAR dados sem rotulos
2. ALIMENTAR o modelo
3. MODELO encontra padroes
4. HUMANOS interpretam resultados
5. APLICAR conhecimento
```

## Tipos Principais

### 1. Clustering (Agrupamento)

```
OBJETIVO: Agrupar dados similares

EXEMPLO:
DADOS: [1,2], [1.5,1.8], [5,8], [8,8], [1,0.6], [9,11]

RESULTADO:
  Grupo A: [1,2], [1.5,1.8], [1,0.6]  (compactos)
  Grupo B: [5,8], [8,8], [9,11]       (dispersos)
```

#### Algoritmos de Clustering

| Algoritmo | Como funciona | K? | Vantagens |
|-----------|---------------|:--:|-----------|
| **K-Means** | Centroides | Sim | Rapido, simples |
| **DBSCAN** | Densidade | Nao | Detecta outliers |
| **Hierarchical** | Arvore | Nao | Visualizacao bonita |
| **GMM** | Distribuicoes | Sim | Probabilistico |
| **Mean Shift** | Densidade | Nao | Automatico |

#### K-Means em Detalhe

```
PROCESSO:
1. Escolher K centroides aleatoriamente
2. Atribuir cada ponto ao centroide mais proximo
3. Recalcular centroides
4. Repete ate convergir

EXEMPLO (K=2):
Iteracao 1: Centroides [1,1] e [8,8]
  Distancia [1,2] ate [1,1] = 1
  Distancia [1,2] ate [8,8] = 9.2
  -> Grupo 1

Iteracao 2: Novos centroides [1.2, 1.5] e [7.3, 9]
  ...

RESULTADO:
  Grupo 1: [1,2], [1.5,1.8], [1,0.6]
  Grupo 2: [5,8], [8,8], [9,11]
```

#### Como Escolher K (Elbow Method)

```
K=1: Inercia = 1000
K=2: Inercia = 500
K=3: Inercia = 300  <-- "COTOVELO"
K=4: Inercia = 280
K=5: Inercia = 260

K=3 e onde a melhoria desacelera
```

### 2. Diminuicao de Dimensionalidade

```
PROBLEMA: 1000 features sao dificeis de visualizar

SOLUCAO: Reduzir para 2-3 dimensoes

DADOS: [1000 features]
    |
    v  (PCA, t-SNE, UMAP)
    |
RESULTADO: [2 features]
```

#### Algoritmos

| Algoritmo | Como funciona | Uso |
|-----------|---------------|-----|
| **PCA** | Componentes principais | Visualizacao |
| **t-SNE** | Similaridade local | Clusters |
| **UMAP** | Similaridade global | Visualizacao |
| **Autoencoders** | Redes neurais | Compressao |

#### PCA (Principal Component Analysis)

```
DADOS: 100 features

PCA:
  Componente 1: 40% da variancia
  Componente 2: 20% da variancia
  Componente 3: 15% da variancia
  ...

REDUZIR para 2 componentes:
  Preserva 60% da informacao
  Elimina 40% (ruido)
```

### 3. Deteccao de Anomalias

```
OBJETIVO: Encontrar dados incomuns

EXEMPLO:
DADOS: 999 transacoes normais + 1 fraude

MODELO:
  - Aprende padrao "normal"
  - Marca o que foge do padrao

ALGORITMOS:
  - Isolation Forest
  - One-Class SVM
  - Autoencoders
  - LOF (Local Outlier Factor)
```

### 4. Regras de Associacao

```
OBJETIVO: Encontrar relacoes entre itens

EXEMPLO (Carrinho de compras):
  CLIENTE 1: [leite, paes, manteiga]
  CLIENTE 2: [leite, fraldas, cerveja]
  CLIENTE 3: [paes, fraldas, cerveja]

REGRA: "Quem compra fraldas tambem compra cerveja"
  Suporte: 66% (2/3 clientes)
  Confianca: 100% (todos que compram fraldas compram cerveja)

ALGORITMOS:
  - Apriori
  - FP-Growth
```

## Comparativo com Supervised Learning

| Aspecto | Supervised | Unsupervised |
|---------|:----------:|:------------:|
| **Dados** | Rotulados | Sem rotulos |
| **Objetivo** | Prever saida | Encontrar padroes |
| **Saida** | Categoria/valor | Grupo/estrutura |
| **Avaliacao** | Metricas claras | Subjetiva |
| **Custo** | Alto (rotular) | Baixo |
| **Exemplo** | Spam detection | Clientes similares |

## Aplicacoes Reais

| Aplicacao | Tipo | Algoritmo |
|-----------|------|-----------|
| Segmentacao de clientes | Clustering | K-Means |
| Compressao de imagens | Dim. reducao | PCA |
| Deteccao de fraudes | Anomalia | Isolation Forest |
| Recomendacao | Associacao | Apriori |
| Visualizacao de dados | Dim. reducao | t-SNE/UMAP |
| Topic modeling | Clustering | LDA |
| GANs | Generativo | GAN |

## Relacao com Deep Learning

```
UNSUPERVISED LEARNING CLASSICO:
- K-Means
- PCA
- Apriori

DEEP LEARNING UNSUPERVISED:
- Autoencoders (compressao)
- GANs (geracao)
- VAEs (geracao)
- Self-supervised learning (BERT, GPT)

O FUTURO:
- Self-supervised domina
- Modelos aprendem de dados brutos
- Pouca ou nenhuma anotacao
```

## Conexoes

- [[ia]] — Campo geral
- [[machine-learning]] — Paradigma
- [[deep-learning]] — Redes neurais
- [[supervised-learning]] — Com rotulos
- [[reinforcement-learning]] — Com recompensa
- [[embeddings]] — Representacoes

---

**Status:** Documento explorado — unsupervised learning completo
**Ultima atualizacao:** Setembro 2026
