---
titulo: "Reinforcement Learning — Aprendizado por Reforco"
tags: [reinforcement-learning, rl, agentes, recompensa, policy, q-learning]
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
  - unsupervised-learning
  - agentes-ia
---

# Reinforcement Learning

> Reinforcement Learning e o paradigma de machine learning onde um AGENTE aprende a tomar decisoes atraves de TENTATIVA E ERRO, maximizando uma RECOMPENSA acumulada ao longo do tempo.

## O Problema que Resolve

```
PROBLEMA: Como um robo aprende a andar?

SUPERVISED: Impossivel - nao temos "dados rotulados" de movimentos
UNSUPERVISED: Nao resolve - queremos uma ACAO, nao um padrao

SOLUCAO:
  ROBO (agente) tenta andar
    - ANDOU FRENTE: +10 pontos (recompensa)
    - CAIU: -5 pontos (penalidade)
    - REPEAT: Aprende o que da mais pontos
```

## Como Funciona

```
AGENTE: Quem toma decisoes
AMBIENTE: Onde o agente interage
ACAO: O que o agente faz
ESTADO: Situacao atual
RECOMPENSA: Feedback numerico
POLITICA: Estrategia do agente

LOOP:
  1. Agente observa ESTADO
  2. Agente escolhe ACAO (baseado na POLITICA)
  3. Ambiente retorna NOVO ESTADO + RECOMPENSA
  4. Agente atualiza POLITICA
  5. Repete
```

## Componentes

### 1. Agente

```
O "aprendiz" que toma decisoes

EXEMPLOS:
- Robo andando
- LLM escolhendo proxima palavra
- IA jogando xadrez
- Carro autonomo dirigindo
```

### 2. Ambiente

```
Onde o agente interage

EXEMPLOS:
- Mundo real (robos)
- Simulacao (jogos)
- Interface (LLMs)
- Mercado (trading)
```

### 3. Acoes

```
Opcoes disponiveis ao agente

EXEMPLOS:
- Andar: frente, tras, esquerda, direita
- Xadrez: mover peca X para Y
- LLM: gerar proximo token
- Trading: comprar, vender, manter
```

### 4. Estados

```
Situacao atual do ambiente

EXEMPLOS:
- Robo: posicao, velocidade, angulo
- Xadrez: posicao das pecas
- LLM: historico da conversa
- Trading: preco atual, portfolio
```

### 5. Recompensa

```
Feedback numerico

EXEMPLOS:
- Robo: +10 (andou), -100 (caiu)
- Xadrez: +100 (xequemate), -100 (perdeu)
- LLM: +1 (resposta boa), -1 (resposta ruim)
- Trading: +R$ (lucro), -R$ (prejuizo)
```

### 6. Politica

```
Estrategia do agente: "Dado este estado, qual acao escolher?"

POLITICA DETERMINISTICA:
  Estado A -> Acao X (sempre)

POLITICA PROBABILISTICA:
  Estado A -> 70% Acao X, 30% Acao Y
```

## Algoritmos Principais

### 1. Q-Learning

```
OBJETIVO: Aprender valor de cada (estado, acao)

TABELA Q[estado][acao] = valor esperado

EXEMPLO:
         Andar  Pular  Atirar
Estado A [  5    10      3  ]
Estado B [  8     2      7  ]
Estado C [ -1     3      9  ]

DECISAO: No Estado A, escolher PULAR (valor 10)

ATUALIZACAO:
Q(s,a) = Q(s,a) + alpha * (recompensa + gamma * max(Q(s',a')) - Q(s,a))
```

### 2. Deep Q-Network (DQN)

```
PROBLEMA: Tabela Q gigante (estado = video 4K)

SOLUCAO: Rede neural approxima Tabela Q

ESTADO (video) -> REDE NEURAL -> Q[acao1], Q[acao2], Q[acao3]

VANTAGEM: Funciona com estados complexos
EXEMPLO: AlphaGo, Atari games
```

### 3. Policy Gradient

```
OBJETIVO: Aprender POLITICA diretamente

ENTRADA: Estado
SAIDA: Probabilidade de cada acao

PRO = log(probabilidade da acao escolhida) * recompensa

EXEMPLO:
Estado A -> [40% esquerda, 60% direita]
Acao: direita (60%)
Recompensa: +10

ATUALIZACAO: Aumentar probabilidade de "direita"
```

### 4. Actor-Critic

```
COMBINACAO:
- ACTOR: Decide acao (politica)
- CRITIC: Avalia acao (valor)

VANTAJEM: Mais estavel que policy gradient
EXEMPLO: A2C, A3C, PPO
```

### 5. Proximal Policy Optimization (PPO)

```
O MAIS USADO EM PRODUCAO

IDEIA: Atualizar politica de forma CONSERVADORA

VANTAGENS:
- Estavel
- Simples de implementar
- Funciona bem na pratica

USADO POR:
- ChatGPT (RLHF)
- Claude (RLHF)
- Robos
- Jogos
```

## RLHF (Reinforcement Learning from Human Feedback)

```
PROCESSO:
1. LLM gera respostas
2. HUMANO classifica respostas (bom/ruim)
3. MODELO de recompensa aprende preferencias
4. LLM otimiza usando RL

EXEMPLO:
P: "O que e IA?"

Geracao 1: "IA e quando maquina faz coisa" -> Humano: RUIM
Geracao 2: "IA e campo da ciencia..." -> Humano: BOM

MODELO aprende: Respostas informativas = +recompensa
```

## Exploracao vs Exploracao

```
DILEMA:
- EXPLORACAO: Tentar coisas novas (descobrir)
- EXPLOITACAO: Fazer o que ja sabe (maximizar)

SOLUCAO: epsilon-greedy
  - 90% do tempo: EXPLOITACAO (melhor acao conhecida)
  - 10% do tempo: EXPLORACAO (acao aleatoria)
```

## Recompensa vs Penalidade

```
RECOMPENSA (+):
- +10: Tarefa completada
- +5: Progresso
- +1: Acao correta

PENALIDADE (-):
- -1: Erro pequeno
- -10: Erro medio
- -100: Falha catastrofica

DESIGN DE RECOMPENSA:
  DIFIL: Bons resultados, ruins eventos
  CUIDADO: Modelo pode "engar" o sistema
```

## Aplicacoes Reais

| Aplicacao | Agente | Ambiente | Recompensa |
|-----------|--------|----------|------------|
| **ChatGPT/Claude** | LLM | Usuario | Resposta util |
| **AlphaGo** | IA | Tabuleiro | Vitoria |
| **Robos** | Robo | Mundo real | Tarefa |
| **Carro autonomo** | Software | Rua | Seguranca |
| **Trading** | Algoritmo | Mercado | Lucro |
| **Jogos** | IA | Game | Pontuacao |

## Relacao com Outros Paradigmas

```
SUPERVISED: Dados -> Previsao
UNSUPERVISED: Dados -> Padrao
REINFORCEMENT: Tentativa -> Recompensa

COMBINACOES:
- Pre-treino: Unsupervised (aprende representacoes)
- Fine-tuning: Supervised (aprende tarefa)
- RLHF: Reinforcement (alinha com humanos)

LLM = Unsupervised + Supervised + Reinforcement
```

## Conexoes

- [[ia]] — Campo geral
- [[machine-learning]] — Paradigma
- [[deep-learning]] — Redes neurais
- [[supervised-learning]] — Com rotulos
- [[unsupervised-learning]] — Sem rotulos
- [[agentes-ia]] — Agentes usam RL

---

**Status:** Documento explorado — reinforcement learning completo
**Ultima atualizacao:** Setembro 2026
