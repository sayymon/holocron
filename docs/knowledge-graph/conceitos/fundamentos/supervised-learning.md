---
titulo: "Supervised Learning — Aprendizado Supervisionado"
tags: [supervised-learning, classificacao, regressao, treino, labels]
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
  - unsupervised-learning
  - reinforcement-learning
  - fine-tuning
---

# Supervised Learning

> Supervised Learning e o paradigma de machine learning onde o modelo aprende a partir de dados ROTULADOS (input + saida esperada). E o tipo mais usado em producao.

## O Problema que Resolve

```
DADOS: 1000 emails rotulados como "spam" ou "nao-spam"

PROBLEMA: Como automatizar a classificacao?

SOLUCAO:
  Treinar modelo com:
    Input: "Ganhe dinheiro rapido!"
    Label: SPAM

  Modelo aprende o padrao:
    "ganhe" + "dinheiro" + "rapido" -> SPAM

  Depois classifica emails novos automaticamente
```

## Como Funciona

```
1. COLETAR dados rotulados
2. DIVIDIR em treino (80%) e teste (20%)
3. TREINAR modelo nos dados de treino
4. AVALIAR no dados de teste
5. AJUSTAR hiperparametros
6. DEPLOY em producao
```

## Dois Tipos Principais

### 1. Classificacao

```
PREVISAO: Categoria discreta

EXEMPLOS:
- Email: spam / nao-spam
- Imagem: gato / cachorro / passaro
- Sentimento: positivo / negativo / neutro
- Doenca: tem / nao-tem

METRICAS:
- Accuracy: % de acertos
- Precision: % dos positivos sao verdadeiros
- Recall: % dos positivos foram detectados
- F1: Media harmoinca de precision e recall
```

### 2. Regressao

```
PREVISAO: Valor continuo

EXEMPLOS:
- Preco de casa: R$ 500.000
- Temperatura: 25.3 graus
- Vendas: 10.000 unidades
- Idade: 35 anos

METRICAS:
- MSE: Erro quadratico medio
- MAE: Erro absoluto medio
- R2: Coeficiente de determinacao
```

## Algoritmos Populares

### Para Classificacao

| Algoritmo | Complexidade | Interpretabilidade | Uso |
|-----------|:------------:|:------------------:|-----|
| **Logistic Regression** | Baixa | Alta | Baseline |
| **Decision Tree** | Media | Alta | Regras |
| **Random Forest** | Alta | Media | Geral |
| **SVM** | Alta | Media | Dados complexos |
| **KNN** | Baixa | Media | Simples |
| **XGBoost** | Alta | Media | Competicoes |
| **Neural Networks** | Muito alta | Baixa | Complexos |

### Para Regressao

| Algoritmo | Complexidade | Interpretabilidade | Uso |
|-----------|:------------:|:------------------:|-----|
| **Linear Regression** | Baixa | Alta | Baseline |
| **Ridge/Lasso** | Baixa | Alta | Regularizacao |
| **Decision Tree** | Media | Alta | Regras |
| **Random Forest** | Alta | Media | Geral |
| **XGBoost** | Alta | Media | Competicoes |
| **Neural Networks** | Muito alta | Baixa | Complexos |

## O Pipeline Completo

```
DADOS RAW
    |
    v
PRE-PROCESSAMENTO
    - Limpeza
    - Normalizacao
    - Encoding categorico
    |
    v
FEATURE ENGINEERING
    - Selecao de features
    - Criacao de features
    - Reducao de dimensionalidade
    |
    v
TREINO
    - Split treino/validacao/teste
    - Cross-validation
    - Hiperparametros
    |
    v
AVALIACAO
    - Metricas no conjunto de teste
    - Matriz de confusao
    - Curvas ROC/PR
    |
    v
DEPLOY
    - Modelo salvo
    - API de inferencia
    - Monitoramento
```

## Overfitting vs Underfitting

```
OVERFITTING: Modelo "decorou" os dados de treino
  - Acuracia treino: 99%
  - Acuracia teste: 60%
  - SOLUCAO: Regularizacao, mais dados, cross-validation

UNDERFITTING: Modelo nao aprendeu o padrao
  - Acuracia treino: 55%
  - Acuracia teste: 52%
  - SOLUCAO: Modelo mais complexo, mais features

IDEAL:
  - Acuracia treino: 90%
  - Acuracia teste: 88%
  - Diferenca minima entre treino e teste
```

## Regularizacao

| Tecnica | Como funciona | Quando usar |
|---------|---------------|-------------|
| **L1 (Lasso)** | Penaliza pesos grandes | Selecao de features |
| **L2 (Ridge)** | Penaliza todos os pesos | Geral |
| **Dropout** | Desliga neuronios aleatoriamente | Redes neurais |
| **Early Stopping** | Para quando validao piora | Geral |
| **Data Augmentation** | Aumenta dados artificiais | Imagens, texto |

## Validacao

### Holdout

```
DADOS: 1000 amostras

TREINO: 800 (80%)
VALIDACAO: 100 (10%)
TESTE: 100 (10%)

PRO: Simples
CONTRA: Depende da divisao
```

### Cross-Validation (K-Fold)

```
DADOS: 1000 amostras, K=5

FOLD 1: Treino [2-5], Teste [1]
FOLD 2: Treino [1,3-5], Teste [2]
FOLD 3: Treino [1-2,4-5], Teste [3]
FOLD 4: Treino [1-3,5], Teste [4]
FOLD 5: Treino [1-4], Teste [5]

RESULTADO: Media dos 5 folds

PRO: Mais robusto
CONTRA: Mais lento
```

## Relacao com Deep Learning

```
SUPERVISED LEARNING (classico):
- Features manuais
- Modelos simples
- Dados pequenos

DEEP LEARNING:
- Features aprendidas automaticamente
- Redes neurais profundas
- Dados grandes

QUANDO USAR QUAL:
- Dados < 10K: Supervised classico
- Dados > 100K: Deep Learning
- Dados > 1M: Deep Learning sempre
```

## Aplicacoes Reais

| Aplicacao | Tipo | Algoritmo |
|-----------|------|-----------|
| Filtro de spam | Classificacao | XGBoost |
| Previsao de vendas | Regressao | Random Forest |
| Diagnostico medico | Classificacao | Neural Network |
| Preco de acoes | Regressao | LSTM |
| Aprovacao de credito | Classificacao | Gradient Boosting |
| Deteccao de fraudes | Classificacao | Isolation Forest |

## Conexoes

- [[ia]] — Campo geral
- [[machine-learning]] — Paradigma
- [[deep-learning]] — Extensao com redes neurais
- [[unsupervised-learning]] — Sem rotulos
- [[reinforcement-learning]] — Com recompensa
- [[fine-tuning]] — Fine-tuning e supervised learning

---

**Status:** Documento explorado — supervised learning completo
**Ultima atualizacao:** Setembro 2026
