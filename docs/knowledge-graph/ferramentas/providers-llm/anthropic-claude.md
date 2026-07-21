---
titulo: "Anthropic Claude — Líder em Código e Segurança"
tags: [anthropic, claude, sonnet, opus, haiku, provider, coding]
fonte: Pesquisa consolidada Junho 2026
confiabilidade: alta
data: '2026-06-28'
ring: 2
area: tools-providers
status: explored
connections:
  - llms
  - ai-gateway
  - mcp
  - prompt-engineering
---
# Anthropic Claude — Líder em Código e Segurança

## O que é

Anthropic é a empresa fundada por ex-pesquisadores da OpenAI (Dario e Daniela Amodei). Foco em AI Safety. A família Claude é conhecida por excelência em coding, contexto longo (200K), e por ter criado o [[mcp]] (Model Context Protocol) — o padrão universal de integração ferramenta↔modelo.

## Modelos (Junho 2026)

| Modelo | Input $/MTok | Output $/MTok | Contexto | Uso |
|--------|:------------:|:-------------:|:--------:|-----|
| **Claude Opus 4** | $15.00 | $75.00 | 200K | Ultra-complexo, pesquisa profunda |
| **Claude Sonnet 4** | $3.00 | $15.00 | 200K | **Coding líder**, análise, agentes |
| **Claude Haiku 3.5** | $0.80 | $4.00 | 200K | Velocidade, classificação, custo |

## Diferenciais

| Feature | Descrição |
|---------|-----------|
| **Coding** | #1 em SWE-Bench Verified (resolução de bugs reais) |
| **200K contexto** | Nativo em todos os modelos, sem degradação significativa |
| **Prompt Caching** | Até 90% desconto em prefixos repetidos |
| **Extended Thinking** | Reasoning explícito (chain-of-thought visível) |
| **MCP** | Criador do protocolo — integração nativa |
| **Computer Use** | Controlar desktop (screenshots + clicks) |
| **Claude Code** | Agente terminal autônomo para coding |
| **Artifacts** | Geração de UI/código executável no chat |

## Modelo de Cobrança

- **Pay-per-token** via API
- **Claude Pro**: $20/mês (consumer)
- **Claude Max**: $100/mês (inclui Claude Code ilimitado)
- **API**: Via console.anthropic.com ou AWS Bedrock
- **Prompt Caching**: Input cacheado custa 10% do normal

## Quando Usar

✅ **Use Claude quando:**
- Tarefa principal é **código** (geração, review, refactoring)
- Precisa de contexto longo (200K) bem utilizado
- Quer integrar com [[mcp]] nativamente
- Segurança/safety é prioridade (menos jailbreaks)
- Coding assistant (Claude Code no terminal)

❌ **Evite quando:**
- Precisa de contexto > 200K (Gemini tem 1M+)
- Budget mínimo + alto volume (mais caro que Gemini Flash)
- Precisa de multimodal heavy (imagem/vídeo generation)
- Real-time voice/audio (OpenAI é melhor aqui)

## Casos de Uso na Hotmart

- **Kiro** usa Claude como modelo default
- **Hotmart AI Gateway** acessa Claude via AWS Bedrock
- **SARA** (agente de suporte) usa Claude para geração de respostas
- **Code review** automatizado com Claude Sonnet

## Conceitos Relacionados

- [[llms]] — Categoria
- [[mcp]] — Protocolo criado pela Anthropic
- [[ai-gateway]] — Acesso via Bedrock
- [[prompt-engineering]] — Extended Thinking
- [[coding-assistants]] — Claude Code

## Conexões

- [[openai-gpt]] — Competidor (ecossistema maior)
- [[google-gemini]] — Competidor (mais barato)
- [[langchain]] — Framework que integra
- [[kiro]] — IDE que usa Claude
