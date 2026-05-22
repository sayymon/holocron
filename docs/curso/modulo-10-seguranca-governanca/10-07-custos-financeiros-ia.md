---
titulo: "Custos Financeiros em IA"
modulo: 10
unidade: 7
tags: [custos, finops, tokens, inferencia, treinamento, otimizacao]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Custos Financeiros em IA

## Anatomia de Custos

### Treinamento / Fine-tuning

| Componente | Custo Típico | Otimização |
|------------|-------------|------------|
| GPU/TPU hours | $1-100K+ por run | Spot instances, scheduling |
| Dados | Coleta + limpeza + rotulagem | Active learning, synthetic data |
| Experimentação | Múltiplos runs para hyperparams | Bayesian optimization, early stopping |
| Armazenamento | Checkpoints, datasets | Lifecycle policies, compressão |

### Inferência (Produção)

| Componente | Driver de Custo | Otimização |
|------------|----------------|------------|
| Tokens (LLM) | Input + Output tokens | Prompt compression, caching |
| Compute | Requests/segundo | Batching, auto-scaling |
| Latência | GPU idle time | Right-sizing, serverless |
| Rede | Data transfer | Edge deployment, CDN |

## Modelos de Pricing de LLMs

| Provider | Input (1M tokens) | Output (1M tokens) |
|----------|-------------------|---------------------|
| GPT-4o | ~$2.50 | ~$10.00 |
| Claude Sonnet | ~$3.00 | ~$15.00 |
| Gemini Pro | ~$1.25 | ~$5.00 |
| Open-source (self-hosted) | Custo de infra | Custo de infra |

> Preços aproximados e sujeitos a mudança. Consultar pricing pages atuais.

## Estratégias de Otimização

### Redução de Tokens
- **Prompt engineering** — prompts concisos ([[prompt-engineering]])
- **Caching** — respostas para queries frequentes
- **Routing** — modelo barato para queries simples, caro para complexas
- **Summarization** — comprimir contexto antes de enviar

### Infraestrutura
- **Spot/Preemptible instances** — até 90% desconto para treino
- **Auto-scaling** — escalar com demanda real
- **Model distillation** — modelo menor que imita o grande
- **Quantização** — reduzir precisão (FP16, INT8, INT4)

### Arquitetura
- **RAG vs Fine-tuning** — RAG geralmente mais barato para domínios específicos
- **Tiered models** — cascata de modelos por complexidade
- **Edge inference** — reduzir latência e custo de rede

## FinOps para IA

```
1. Visibilidade — dashboards de custo por modelo/feature/time
2. Alocação — cost centers por squad/produto
3. Otimização — alertas de anomalia, right-sizing
4. Governança — budgets, approval workflows
5. Previsão — forecast baseado em crescimento de uso
```

## Métricas-Chave

- **Custo por inferência** — quanto custa cada request
- **Custo por usuário** — unit economics de IA
- **ROI do modelo** — valor gerado vs custo de operação
- **Token efficiency** — output útil / tokens consumidos

## Conexões

- [[10-01-governanca-ia]] — governança inclui gestão financeira
- [[prompt-engineering]] — prompts eficientes reduzem custos
- [[rag]] — RAG como alternativa cost-effective a fine-tuning
- [[mlops]] — observabilidade de custos em produção
