---
titulo: "Fundamentos de Arquitetura AI-First"
modulo: 8
unidade: 1
tags: [arquitetura, ai-first, design-patterns, trade-offs, decision-framework]
dificuldade: intermediário
fonte: "Curso Engenharia de IA Aplicada + Building LLM Apps (Chip Huyen)"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Fundamentos de Arquitetura AI-First

## O que muda com IA no centro?

Arquitetura tradicional assume **determinismo** — mesma entrada, mesma saída. Arquitetura AI-First assume **probabilismo** — mesma entrada pode gerar saídas diferentes. Isso muda tudo.

### Arquitetura Tradicional vs AI-First

| Dimensão | Tradicional | AI-First |
|----------|-------------|----------|
| Comportamento | Determinístico | Probabilístico |
| Testes | Assert exato | Assert semântico + [[avaliação-llm]] |
| Latência | Previsível (ms) | Variável (100ms–30s) |
| Custo | Por request (fixo) | Por token (variável) |
| Falhas | Crash ou timeout | Alucinação, drift, recusa |
| Versionamento | Código | Código + prompt + modelo |
| Observabilidade | Logs + métricas | + traces de raciocínio |

### Implicações Arquiteturais

1. **Caching muda** — não é só key-value, precisa de [[semantic-cache]]
2. **Retry muda** — retry pode dar resposta diferente (feature, não bug)
3. **Testing muda** — precisa de [[avaliação-llm]] com juízes
4. **Monitoring muda** — precisa rastrear qualidade semântica, não só uptime

## 5 Padrões Fundamentais de Arquitetura com IA

### 1. AI como Feature (Bolt-on)

```
[App Existente] → [API LLM] → [Resposta]
```

- IA é um endpoint a mais no sistema existente
- Menor risco, menor transformação
- Ex: botão "resumir" em um dashboard

### 2. AI como Copiloto

```
[Usuário] ↔ [App] ↔ [AI Assistant]
                         ↕
                    [Contexto/Tools]
```

- IA sugere, humano decide
- [[human-in-the-loop]] obrigatório
- Ex: GitHub Copilot, [[ai-companion]]

### 3. AI como Motor (AI-Native)

```
[Input] → [AI Pipeline] → [Output]
              ↕
         [Guardrails]
```

- IA É o produto, não feature do produto
- Qualidade da IA = qualidade do produto
- Ex: ChatGPT, Midjourney

### 4. AI como Agente Autônomo

```
[Goal] → [Agent] → [Plan] → [Execute] → [Observe] → [Loop]
              ↕            ↕
         [Memory]     [Tools]
```

- IA toma decisões e executa ações
- Precisa de [[guardrails]] robustos
- Ex: [[support-agent]], Devin, AutoGPT

### 5. AI como Infraestrutura (Platform)

```
[App 1] ↘
[App 2] → [AI Platform/Gateway] → [Models]
[App 3] ↗         ↕
              [Governance]
```

- IA é camada de plataforma consumida por N apps
- Centraliza governança, custos, observabilidade
- Ex: [[ai-gateway]], AWS Bedrock

## Decision Framework

```
1. Qual o nível de autonomia necessário?
   Baixo → Bolt-on | Alto → Agente

2. Qual a tolerância a erro?
   Zero → Copiloto (HITL) | Alta → Autônomo

3. Quantos consumidores?
   Um → Feature | Muitos → Platform

4. Qual o core do produto?
   IA é auxiliar → Bolt-on/Copiloto
   IA é o produto → AI-Native/Agente
```

### Matriz de Decisão

| Critério | Bolt-on | Copiloto | AI-Native | Agente | Platform |
|----------|---------|----------|-----------|--------|----------|
| Complexidade | Baixa | Média | Alta | Muito Alta | Alta |
| Time-to-market | Rápido | Médio | Lento | Lento | Lento |
| Risco | Baixo | Baixo | Médio | Alto | Médio |
| Custo operacional | Baixo | Médio | Alto | Alto | Alto (amortizado) |
| Controle | Total | Alto | Médio | Baixo | Alto |

## Trade-offs Fundamentais

### Latência vs Qualidade
- Mais etapas de raciocínio = melhor resposta = mais lento
- [[chain-of-thought]] melhora qualidade mas adiciona latência
- Solução: [[model-router]] — modelo leve para simples, pesado para complexas

### Custo vs Performance
- GPT-4 class: ~$15/1M tokens output
- GPT-3.5 class: ~$0.50/1M tokens output
- 30x diferença de custo, ~20% diferença de qualidade em tasks simples
- Solução: [[model-tiering]] + [[semantic-cache]]

### Autonomia vs Controle
- Mais autonomia = mais valor potencial = mais risco
- Menos autonomia = mais previsível = menos transformador
- Solução: autonomia progressiva com [[guardrails]] e [[human-in-the-loop]]

### Generalidade vs Especialização
- Modelo genérico: funciona para tudo, excelente em nada
- Modelo especializado: excelente no domínio, inútil fora
- Solução: [[model-router]] + modelos especializados por domínio

## Checklist Arquitetural AI-First

- [ ] Definir padrão (Bolt-on → Platform)
- [ ] Mapear pontos de não-determinismo
- [ ] Estratégia de [[avaliação-llm]] definida
- [ ] [[guardrails]] de input e output
- [ ] Fallback para quando IA falha
- [ ] Estratégia de custo (tiering, cache)
- [ ] Observabilidade semântica ([[langfuse]])
- [ ] Versionamento de prompts

## Conexões

- [[prompt-engineering]] — qualidade do prompt afeta toda a arquitetura
- [[langfuse]] — observabilidade para sistemas AI-First
- [[guardrails]] — controle de qualidade e segurança
- [[avaliação-llm]] — como testar sistemas não-determinísticos
