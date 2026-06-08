---
titulo: "Algoritmos Genéticos e Computação Evolutiva — Libs, Ambientes e Aplicabilidades"
tags: [algoritmos-geneticos, computacao-evolutiva, neuroevolucao, otimizacao, machine-learning, NEAT, DEAP]
fonte: "Estudo pessoal + projeto exemplo-02-vencendo-qualquer-jogo"
confiabilidade: alta
data: 2026-06-04
---

# Algoritmos Genéticos e Computação Evolutiva

## O que é

Algoritmos genéticos (GA) são metaheurísticas de otimização inspiradas na seleção natural de Darwin. A ideia central: uma **população** de soluções candidatas evolui ao longo de **gerações** através de operadores de **seleção**, **crossover** (recombinação) e **mutação** — sobrevivem os mais aptos.

É uma forma de Machine Learning que **não usa gradientes** (gradient-free optimization), o que a torna útil em problemas onde:
- A função objetivo não é diferenciável
- O espaço de busca é discreto, combinatório ou multimodal
- Queremos explorar soluções não-óbvias

## Conceitos Fundamentais

| Conceito | Analogia Biológica | Na prática |
|----------|-------------------|------------|
| **Genoma/Cromossomo** | DNA | Representação da solução (vetor de pesos, sequência, etc.) |
| **Gene** | Segmento do DNA | Cada parâmetro individual |
| **População** | Espécie | Conjunto de soluções candidatas |
| **Fitness** | Adaptação ao ambiente | Quão boa é a solução (score, distância, reward) |
| **Seleção** | Seleção natural | Escolher os melhores para reproduzir (torneio, roleta, elitismo) |
| **Crossover** | Reprodução sexuada | Combinar genes de dois pais |
| **Mutação** | Mutação genética | Alterar aleatoriamente genes (exploração) |
| **Geração** | Uma geração biológica | Um ciclo completo de avaliação + reprodução |

## Workflow Padrão

```
1. INICIALIZAR população aleatória
2. AVALIAR fitness de cada indivíduo
3. SELECIONAR os mais aptos
4. CROSSOVER (recombinar pais → filhos)
5. MUTAR (perturbação aleatória)
6. REPETIR até convergência ou N gerações
```

## Variantes de Computação Evolutiva

| Variante | Diferença do GA clássico | Quando usar |
|----------|--------------------------|-------------|
| **Evolution Strategies (ES)** | Sem crossover, foco em mutação + adaptação | Otimização contínua, paralelismo massivo |
| **Genetic Programming (GP)** | Evolui programas/árvores, não vetores | Regressão simbólica, regras |
| **Differential Evolution (DE)** | Mutação por diferença de vetores | Otimização contínua com poucos hiperparâmetros |
| **CMA-ES** | Adapta matriz de covariância da distribuição | Estado da arte para otimização contínua |
| **NEAT** | Evolui topologia + pesos de redes neurais | Neuroevolução, agentes de jogo |
| **Multi-objetivo (NSGA-II)** | Otimiza N objetivos simultâneos (Pareto) | Trade-offs (custo vs qualidade) |

## Libs Principais

### Python (ecossistema mais maduro)

| Lib | Foco | Instalação | Destaque |
|-----|------|------------|----------|
| **DEAP** | GA, GP, ES, multi-objetivo | `pip install deap` | Mais completa e flexível, suporta NSGA-II |
| **PyGAD** | GA simples + integração DL | `pip install pygad` | Fácil de usar, integra com Keras/PyTorch |
| **neat-python** | NEAT/HyperNEAT | `pip install neat-python` | Neuroevolução com complexificação |
| **pycma** | CMA-ES | `pip install cma` | Estado da arte para otimização contínua |
| **evosax** | ES em JAX (GPU) | `pip install evosax` | Ultra-rápido, paralelismo em GPU |
| **geneticalgorithm** | GA numérico básico | `pip install geneticalgorithm` | Minimalista, bom para começar |
| **pymoo** | Multi-objetivo | `pip install pymoo` | NSGA-II, NSGA-III, referência acadêmica |

### JavaScript/TypeScript

| Lib | Foco | Instalação |
|-----|------|------------|
| **geneticalgorithm2** | GA básico para Node.js | `npm install geneticalgorithm2` |
| **neataptic** | NEAT em JS | `npm install neataptic` |
| Implementação manual | Máximo controle didático | — |

> **Nota:** Para projetos sérios de GA, Python domina. JS é bom para demos e aprendizado.

## Ambientes Simulados (para avaliar fitness)

| Lib/Framework | Tipo | Linguagem | Quando usar |
|---------------|------|-----------|-------------|
| **Gymnasium** (ex-OpenAI Gym) | Ambientes RL padronizados | Python | CartPole, Atari, robótica — padrão da indústria |
| **MuJoCo** | Física 3D de alta fidelidade | Python/C | Robótica, locomoção (agora open-source) |
| **PyBullet** | Física 3D (alternativa MuJoCo) | Python | Robótica, manipulação |
| **Box2D** | Física 2D | Python | Bipedal walker, racing, jogos 2D |
| **Pygame** | Ambientes 2D custom | Python | Grid worlds, jogos simples |
| **Unity ML-Agents** | Ambientes 3D complexos | Python + Unity | Visualização rica, 3D |
| **Godot** | Game engine + RL | GDScript/Python | Alternativa open-source ao Unity |

### Gymnasium — Ambientes Populares para GA

```python
import gymnasium as gym

# Clássicos
env = gym.make("CartPole-v1")       # Balancear bastão
env = gym.make("MountainCar-v0")    # Subir montanha
env = gym.make("LunarLander-v3")    # Pousar nave
env = gym.make("BipedalWalker-v3")  # Locomoção 2D

# Atari (visual)
env = gym.make("ALE/Breakout-v5")   # Breakout clássico
```

## Neuroevolução (GA + Redes Neurais)

A interseção mais poderosa: **evoluir** redes neurais ao invés de treiná-las com backpropagation.

### NEAT (NeuroEvolution of Augmenting Topologies)

Evolui **topologia E pesos** simultaneamente:
- Começa com redes mínimas (sem hidden layers)
- Complexifica progressivamente (adiciona nós e conexões)
- Usa **speciation** para proteger inovação (espécies competem entre si)
- Perfeito para: agentes de jogos, controladores, tarefas onde a arquitetura ótima é desconhecida

### Evolution Strategies (ES) para Redes

Alternativa ao gradient descent:
- Perturba pesos com ruído gaussiano
- Avalia fitness de cada perturbação
- Atualiza na direção das melhores perturbações
- Vantagem: paraleliza trivialmente (cada worker testa uma perturbação)

**Paper relevante:** "Evolution Strategies as a Scalable Alternative to Reinforcement Learning" (OpenAI, 2017)

## Quando usar GA vs outras abordagens

| Cenário | GA é bom? | Alternativa melhor |
|---------|-----------|-------------------|
| Função objetivo não-diferenciável | ✅ Sim | — |
| Espaço discreto/combinatório (TSP, scheduling) | ✅ Sim | — |
| Busca de hiperparâmetros | ✅ Sim | Bayesian Optimization (se budget pequeno) |
| Otimização contínua com gradientes disponíveis | ⚠️ Pode | SGD/Adam (mais eficiente) |
| Treinar rede neural supervisionada | ❌ Não | Backpropagation |
| Evoluir arquitetura de rede | ✅ Sim (NEAT) | NAS (Neural Architecture Search) |
| Agente em ambiente com reward esparso | ✅ Sim (ES) | RL + curiosity |
| Multi-objetivo com trade-offs | ✅ Sim (NSGA-II) | — |

## Aplicabilidades Reais

### Em jogos (como no projeto `exemplo-02-vencendo-qualquer-jogo`)
- Evoluir estratégias de jogo (pesos de rede que controla o agente)
- Encontrar sequências ótimas de ações
- Gerar conteúdo procedural (levels, personagens)

### Em engenharia
- Otimização de rotas (TSP, logística)
- Design de antenas, circuitos, estruturas
- Scheduling (alocação de recursos)

### Em IA/ML
- Busca de hiperparâmetros
- Feature selection
- Neuroevolução (NEAT, ES)
- Treinar agentes em ambientes sem gradientes

### Em negócios
- Otimização de portfólio
- Precificação dinâmica
- A/B testing automatizado (multi-armed bandit evolutivo)

## Dicas Práticas

1. **Population size** — geralmente 50-200 é suficiente. Maior = mais exploração mas mais lento
2. **Mutation rate** — 1-5% por gene é um bom início. Alto demais = busca aleatória
3. **Elitismo** — sempre preserve os top 1-5% sem modificação (garante não-degradação)
4. **Diversidade** — se a população convergir rápido demais, aumente mutação ou use speciation
5. **Fitness shaping** — normalizar/rankear fitness ao invés de usar valor bruto melhora convergência
6. **Paralelismo** — avaliação de fitness é embaraçosamente paralela (cada indivíduo é independente)

## Conexões com outros conceitos

- [[rag-embeddings-busca]] — embeddings podem ser otimizados via ES
- [[arquitetura-agents]] — agentes podem usar GA para auto-otimização de parâmetros
- Reinforcement Learning — GA/ES é alternativa gradient-free ao policy gradient

## Referências

- [DEAP Docs](https://deap.readthedocs.io/)
- [NEAT-Python Docs](https://neat-python.readthedocs.io/)
- [Gymnasium](https://gymnasium.farama.org/)
- [OpenAI ES Paper (2017)](https://arxiv.org/abs/1703.03864)
- [PyGAD Docs](https://pygad.readthedocs.io/)
- [pymoo — Multi-Objective](https://pymoo.org/)
- Livro: "Introduction to Evolutionary Computing" (Eiben & Smith)
