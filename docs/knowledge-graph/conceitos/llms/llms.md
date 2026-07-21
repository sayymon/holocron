---
titulo: "LLMs — Large Language Models"
tags: [llm, gpt, claude, gemini, modelos, foundation-models]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 1
area: foundations
status: explored
connections:
  - transformers
  - embeddings
  - prompt-engineering
  - fine-tuning
  - rag
  - ai-gateway
  - tokenizacao
---
# LLMs — Large Language Models

## O que é

Large Language Models são redes neurais baseadas em [[transformers]] treinadas em trilhões de tokens de texto. Recebem uma sequência de tokens como input e predizem o próximo token de forma autoregressiva. O "Large" refere-se tanto ao número de parâmetros (bilhões) quanto ao volume de dados de treinamento.

A capacidade emergente de LLMs é que, em escala suficiente, eles desenvolvem habilidades não explicitamente treinadas: raciocínio, código, tradução, análise — tudo via next-token prediction.

## Por que importa

LLMs são a peça central de todo o ecossistema de IA generativa. Um AI Engineer precisa entender:
- Qual modelo escolher para cada tarefa (custo vs qualidade)
- Como interfacear via API (providers, tokens, pricing)
- Limitações (hallucination, context window, stale knowledge)
- Como complementar com [[rag]] e [[fine-tuning]]

## Taxonomia dos Modelos

### Por acesso
- **Proprietários (closed-source)**: [[openai-gpt]], [[anthropic-claude]], [[google-gemini]]
- **Open-weights**: [[meta-llama]], [[deepseek]], [[qwen]], [[mistral]]

### Por arquitetura
- **Dense**: Todos os parâmetros ativos em cada token (ex: GPT-4, Claude)
- **MoE (Mixture of Experts)**: Só parte dos parâmetros ativa por token (ex: [[meta-llama]] 4, [[deepseek]] V3)

### Por capacidade
- **Frontier** (máxima qualidade): GPT-5.2, Claude Opus 4, Gemini 2.5 Pro
- **Mid-tier** (custo-benefício): GPT-5 mini, Claude Sonnet 4, Gemini Flash
- **Budget** (alto volume): GPT-5 nano, Haiku 3.5, Flash-Lite
- **Small/Edge** (local): Phi-4, Gemma 4, Qwen 3.5 7B

## Conceitos-chave

- [[transformers]] — Arquitetura base
- [[tokenizacao]] — Como texto vira números
- [[embeddings]] — Representação vetorial
- [[prompt-engineering]] — Arte de instruir LLMs
- [[fine-tuning]] — Customização de modelos
- [[rag]] — Augmentar com conhecimento externo
- [[ai-gateway]] — Como acessar em produção
- [[observabilidade-llm]] — Como monitorar

## Métricas Importantes

| Métrica | O que mede | Onde ver |
|---------|-----------|---------|
| **MMLU** | Conhecimento geral | Benchmarks oficiais |
| **HumanEval** | Geração de código | Papers do modelo |
| **SWE-Bench** | Resolver bugs reais | swe-bench.com |
| **Arena ELO** | Preferência humana | chat.lmsys.org |
| **MTEB** | Qualidade de embeddings | HuggingFace leaderboard |

## Landscape de Ferramentas

| Ferramenta | Uso | Categoria |
|------------|-----|-----------|
| [[openai-gpt]] | API proprietária, ecossistema amplo | Provider |
| [[anthropic-claude]] | Código, análise, segurança | Provider |
| [[google-gemini]] | Multimodal, contexto longo, custo baixo | Provider |
| [[meta-llama]] | Open-weights líder, self-host | Open-source |
| [[deepseek]] | Coding/reasoning open-source | Open-source |
| [[openrouter]] | Acesso multi-provider | Gateway |
| [[ollama]] | Rodar modelos locais | Runtime local |

## Conexões com o Mundo Real

- Chatbots de atendimento (CAIO na Hotmart) = LLM gerando respostas
- Copilots de código (Kiro, Cursor) = LLM completando código
- Sumarização de documentos = LLM processando texto longo
- Agents autônomos = LLM decidindo próximas ações + tool-use

## Meus Insights

- "Modelo caro" ≠ "modelo melhor pra sua tarefa". GPT-5 nano resolve classificação tão bem quanto o frontier
- Context window grande não significa que o modelo usa bem todo o contexto. "Lost in the middle" é real
- O custo real é Output tokens × preço. Modelo verboso pode custar 3x mais
- MoE é a arquitetura dominante em 2026 — parâmetros totais enormes, mas só uma fração ativa por token

## Fontes

- [LMSYS Chatbot Arena](https://chat.lmsys.org) — confiabilidade: alta
- [Artificial Analysis](https://artificialanalysis.ai) — confiabilidade: alta
- [OpenAI Docs](https://platform.openai.com/docs) — confiabilidade: alta
- [Anthropic Docs](https://docs.anthropic.com) — confiabilidade: alta

## Conexões

- Pai: [[ia]]
- [[transformers]]
- [[embeddings]]
- [[prompt-engineering]]
- [[fine-tuning]]
- [[rag]]
- [[ai-gateway]]
- [[openai-gpt]]
- [[anthropic-claude]]
- [[google-gemini]]
- [[meta-llama]]
- [[deepseek]]
