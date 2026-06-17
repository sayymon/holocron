---
titulo: "Editores Agênticos — Panorama Completo 2026"
modulo: 7
unidade: 1
tags: [ide, cursor, windsurf, kiro, copilot, claude-code, codex, zed, trae, devin, augment, vscode, sdd, vibe-coding, agentes]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada — Módulo 07 + Pesquisa complementar"
atualizado_em: 2026-06-16
confiabilidade: alta
---

# Editores Agênticos — Panorama Completo 2026

## O que mudou: de Autocomplete a Agentes Autônomos

```
2022: Autocomplete (Copilot v1 — sugestão linha a linha)
2023: Chat inline (Copilot Chat, Cursor Chat — conversa sobre código)
2024: Composer/Cascade (edição multi-arquivo com contexto)
2025: Agent Mode (planejamento, execução, testes, iteração autônoma)
2026: Cloud Agents (VMs isoladas, parallelismo, async, spec-driven)
```

A evolução não é incremental — é uma mudança de paradigma: de "ferramenta que completa código" para "engenheiro júnior que executa tasks".

---

## Mapa Geral — Categorias

| Categoria | Ferramentas | Modelo de Uso |
|-----------|-------------|---------------|
| **IDE-native** | Cursor, Windsurf, Kiro, Trae, Zed | Abrem como editor principal |
| **CLI-first** | Claude Code, Codex CLI | Terminal, headless, CI/CD |
| **Agente autônomo** | Devin, Codex (cloud) | Executa em sandbox isolada |
| **Plugin/Extension** | GitHub Copilot, Augment Code | Plugam em editores existentes |
| **Base editor** | VS Code | Plataforma que outros forkeiam |

---

## Comparativo Detalhado

### 1. Cursor

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Fork do VS Code (Electron) |
| **Empresa** | Anysphere (YC) |
| **Diferencial** | Multi-model routing, Cloud Agents, Composer |
| **Modelos** | Claude Sonnet 4.5, GPT-4o, Gemini, DeepSeek, custom (Composer 2.5) |
| **Agent Mode** | Composer — planeja, edita multi-arquivo, roda terminal, itera |
| **Cloud Agents** | VMs isoladas, execução async, múltiplos repos em paralelo |
| **Indexação** | Codebase inteiro (embeddings locais) |
| **MCP** | ✅ Suporta |
| **SDD** | ❌ Não nativo (usa .cursorrules como workaround) |
| **Preço** | Free limitado · Pro $20/mo · Teams $32-40/seat · Premium $96-120/seat |

**Vantagens:**
- Ecossistema VS Code completo (extensões, keybindings)
- Melhor multi-model routing (escolhe modelo por tarefa)
- Cloud Agents para tasks longas sem travar a máquina
- Comunidade enorme, muita doc não-oficial

**Desvantagens:**
- Electron = pesado (RAM, startup lento)
- Pricing mudou várias vezes (confusão credit/request)
- Sem workflow estruturado nativo (spec-driven)
- Vendor lock-in no codebase indexing

---

### 2. Windsurf (ex-Codeium, agora Cognition/Devin)

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Fork do VS Code |
| **Empresa** | Cognition (adquiriu Codeium) |
| **Diferencial** | Cascade (agente multi-step), SWE-1.5 model, Codemaps |
| **Modelos** | SWE-1.5 (proprietário, 13× mais rápido que Sonnet), Claude, GPT-4o |
| **Agent Mode** | Cascade — agente que lê, escreve, debuga, refatora com contexto total |
| **Codemaps** | Navegação visual do codebase via AI |
| **MCP** | ✅ Suporta |
| **SDD** | ❌ Não nativo |
| **Preço** | Free (quota diária) · Pro $15-20/mo · Teams $30-40/seat · Max $200/mo |

**Vantagens:**
- SWE-1.5 é absurdamente rápido para tarefas comuns
- Fast Context (busca no codebase muito rápida)
- Integração com Devin Cloud para tasks autônomas
- Custo menor que Cursor no tier Pro

**Desvantagens:**
- Instabilidade (crashes relatados)
- Pricing mudou de créditos para quotas (confuso)
- Adquirido pela Cognition — futuro incerto da marca
- Modelo proprietário = menos transparência

---

### 3. Kiro (AWS/Amazon)

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Fork do VS Code (substitui Amazon Q Developer) |
| **Empresa** | Amazon Web Services |
| **Diferencial** | Spec-Driven Development nativo, Agent Hooks, Steering |
| **Modelos** | Claude (família completa via Bedrock), modelos AWS |
| **Agent Mode** | Autopilot (executa tasks end-to-end) + Supervised (yield por edit) |
| **Specs** | Requirements → Design → Tasks (workflow estruturado) |
| **Hooks** | Automações em eventos (fileEdited, preToolUse, etc.) |
| **MCP** | ✅ Nativo (config em .kiro/settings/mcp.json) |
| **SDD** | ✅✅✅ É O diferencial — Spec-Driven Development nativo |
| **Preço** | Free (50 interactions) · Pro $19/mo (1000) · Pro+ $39/mo (3000) |

**Vantagens:**
- Único IDE com SDD nativo (specs → tasks → implementação)
- Hooks system (automações pré/pós tool use, eventos)
- Steering files (regras de contexto por projeto)
- Integração AWS nativa (mas não requer conta AWS)
- Workflow mais previsível e auditável

**Desvantagens:**
- Mais novo, ecossistema menor
- Depende fortemente de Claude/Bedrock
- Menos modelos disponíveis vs Cursor
- Comunidade ainda nascente

---

### 4. GitHub Copilot

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Extension para VS Code, JetBrains, Neovim |
| **Empresa** | GitHub/Microsoft |
| **Diferencial** | Integração GitHub nativa, Agent Mode, Cloud Agent |
| **Modelos** | GPT-4o, Claude, Gemini (multi-model selection) |
| **Agent Mode** | Planeja, edita, roda testes, itera até build green |
| **Cloud Agent** | Executa em GitHub (PR review, fix, implementation) |
| **MCP** | ✅ Suporta (VS Code) |
| **SDD** | ❌ Não nativo |
| **Preço** | Free (50 premium req) · Pro $10/mo · Pro+ $39/mo · Max $100/mo |

**Vantagens:**
- Integração perfeita com GitHub (issues, PRs, reviews)
- Mais barato no tier Pro ($10)
- Multi-IDE (não prende a um editor)
- Cloud Agent roda no GitHub — CI/CD integrado

**Desvantagens:**
- Premium requests como moeda (difícil prever custo)
- Agent mode menos autônomo que Cursor/Claude Code
- Mudou para usage-based billing (custo imprevisível)
- Contexto de codebase inferior ao Cursor

---

### 5. Claude Code (Anthropic)

| Aspecto | Detalhe |
|---------|---------|
| **Base** | CLI (terminal) — nenhum editor visual |
| **Empresa** | Anthropic |
| **Diferencial** | Qualidade do agente, contexto gigante (200K tokens), terminal-native |
| **Modelos** | Claude Sonnet 4.5, Claude Opus 4.7 |
| **Agent Mode** | Sempre agêntico — planeja, executa, testa, itera |
| **Headless** | Roda em CI/CD, scripts, automações |
| **MCP** | ✅ Suporta |
| **SDD** | ❌ Não nativo (mas pode usar com CLAUDE.md + conventions) |
| **Preço** | Pro $20/mo · Max 5x $100/mo · Max 20x $200/mo · API pay-per-token |

**Vantagens:**
- Melhor qualidade de agente (benchmarks SWE-bench)
- Contexto de 200K tokens (codebase inteiro na janela)
- Terminal-native = composável com qualquer workflow
- Pricing flat (previsível vs credit-based)
- Funciona em CI/CD (headless)

**Desvantagens:**
- Sem interface visual (curva de aprendizado)
- Não tem GUI para diff review (precisa de editor externo)
- Apenas modelos Claude (sem multi-model)
- Custo alto para uso intenso ($150-250/dev/mês real)

---

### 6. OpenAI Codex

| Aspecto | Detalhe |
|---------|---------|
| **Base** | CLI + App Desktop (macOS) + Cloud |
| **Empresa** | OpenAI |
| **Diferencial** | Multi-agent parallel, sandbox por task, GPT-5.3-Codex |
| **Modelos** | GPT-5.3-Codex, GPT-4o |
| **Agent Mode** | Cloud agents em VMs isoladas, background execution |
| **App Desktop** | "Command center for agents" — gerencia workflows paralelos |
| **MCP** | ✅ Suporta (MCP Tunnel, Connectors) |
| **SDD** | ❌ Não nativo (profiles + config.toml como workaround) |
| **Preço** | Incluído no ChatGPT Pro/Plus/Team · API pay-per-token |

**Vantagens:**
- GPT-5.3-Codex é frontier em coding benchmarks
- Multi-agent (múltiplos agentes em paralelo)
- Sandbox OS-level (segurança)
- Config.toml extremamente flexível (profiles por workload)
- Codex Security para vulnerabilidades

**Desvantagens:**
- macOS only no app desktop
- Pricing confuso (atrelado ao ChatGPT vs API)
- Ecossistema fechado OpenAI
- CLI menos maduro que Claude Code em usabilidade

---

### 7. Zed

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Editor nativo (Rust, GPUI — não é Electron!) |
| **Empresa** | Zed Industries (criadores do Atom + Tree-sitter) |
| **Diferencial** | Performance absurda, multiplayer nativo, agentes paralelos |
| **Modelos** | Claude, GPT-4o, DeepSeek-V4, modelos locais (Ollama) |
| **Agent Mode** | Múltiplos agentes em paralelo no mesmo buffer |
| **Colaboração** | Multiplayer real-time (humanos + agentes no mesmo arquivo) |
| **MCP** | ✅ Suporta |
| **SDD** | ❌ Não nativo |
| **Preço** | Free (editor) · Zed Pro $20/mo (AI features) · Business custom |

**Vantagens:**
- Startup <500ms, latência <2ms (Rust nativo, GPU rendering)
- 16× menos memória que VS Code
- Multiplayer nativo (pair programming com AI e humanos)
- Agentes paralelos (múltiplos agentes simultâneos)
- Open source (editor core)
- Suporta modelos locais

**Desvantagens:**
- Ecossistema de extensões limitado vs VS Code
- Agent mode menos maduro que Cursor
- Menor comunidade
- Sem Windows por muito tempo (agora tem, mas menos testado)

---

### 8. Trae (ByteDance)

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Fork do VS Code + versão browser |
| **Empresa** | ByteDance (TikTok) |
| **Diferencial** | Gratuito com modelos premium, Builder Mode, SOLO agent |
| **Modelos** | Claude 4, GPT-4o, DeepSeek R1 (incluídos no free!) |
| **Agent Mode** | SOLO — agente totalmente autônomo (planeja, executa, shipa) |
| **Builder Mode** | Scaffold completo de projetos via linguagem natural |
| **MCP** | ⚠️ Parcial |
| **SDD** | ❌ Não nativo |
| **Preço** | Free (5000 completions/mo + modelos premium) · Pro $10/mo |

**Vantagens:**
- Grátis com modelos premium (Claude 4, GPT-4o)
- SOLO mode é impressionante para projetos do zero
- VS Code compatible (extensões, keybindings)
- Builder mode para scaffolding rápido
- Preço imbatível

**Desvantagens:**
- ByteDance (questões de privacidade/dados)
- Comunidade majoritariamente chinesa
- Menos transparência sobre uso de dados
- Agent mode menos refinado para codebases grandes
- Dependência de modelo: sujeito a mudanças de acesso

---

### 9. Devin (Cognition)

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Agente autônomo em sandbox (não é IDE local) |
| **Empresa** | Cognition AI |
| **Diferencial** | Totalmente autônomo — tem editor, terminal e browser próprios |
| **Modelos** | Proprietários + Claude |
| **Agent Mode** | Sempre autônomo — recebe task, executa end-to-end |
| **Sandbox** | Ambiente isolado completo (editor + terminal + browser) |
| **Integração** | Jira, Linear, GitHub, Slack |
| **SDD** | ❌ (aceita specs como input, mas não é workflow nativo) |
| **Preço** | Free limitado · Pro $20/mo · Max $200/mo · Teams $80/mo + $40/seat |

**Vantagens:**
- Verdadeiramente autônomo (não precisa supervisão constante)
- Ideal para tasks repetitivas (migrações, refactors em massa)
- Sandbox seguro (não toca seu ambiente local)
- Integra com gestão de projetos (Jira, Linear)

**Desvantagens:**
- Pricing ACU confuso e caro para tasks complexas
- Não substitui IDE (complemento)
- Resultados inconsistentes em projetos complexos
- Feedback loop lento (task → review → iterate)

---

### 10. Augment Code

| Aspecto | Detalhe |
|---------|---------|
| **Base** | Extension para VS Code, JetBrains, Neovim |
| **Empresa** | Augment Code |
| **Diferencial** | Context Engine (entende codebase inteiro), otimizado para times grandes |
| **Modelos** | Claude Opus 4.7, GPT-4o, Prism (routing proprietário) |
| **Agent Mode** | Intent — agente que planeja e executa com contexto cross-repo |
| **Context Engine** | Mapeia arquitetura, dependências, histórico, padrões |
| **MCP** | ✅ Suporta |
| **SDD** | ❌ Não nativo |
| **Preço** | Indie $20/mo · Standard $60/seat · Max $200/seat |

**Vantagens:**
- Context Engine é superior para codebases >500K LOC
- Prism routing economiza 33-50% vs Claude Code direto
- Feito para times (onboarding, consistência, cross-repo)
- Multi-IDE (não prende a um editor)

**Desvantagens:**
- Caro para indivíduos ($60/seat no plano standard)
- Menos conhecido (comunidade menor)
- Pricing mudou várias vezes
- Não é IDE próprio (depende de host editor)

---

## Tabela Comparativa — Resumo

| IDE/Tool | Preço entry | SDD | Cloud Agent | Multi-model | MCP | Base |
|----------|-------------|-----|-------------|-------------|-----|------|
| **Cursor** | $20/mo | ❌ | ✅ | ✅✅ | ✅ | VS Code fork |
| **Windsurf** | $15-20/mo | ❌ | ✅ (Devin) | ✅ | ✅ | VS Code fork |
| **Kiro** | $19/mo | ✅✅✅ | ❌ | ⚠️ (Claude) | ✅✅ | VS Code fork |
| **Copilot** | $10/mo | ❌ | ✅ | ✅✅ | ✅ | Extension |
| **Claude Code** | $20/mo | ❌ | ❌ (local) | ❌ (Claude) | ✅ | CLI |
| **Codex** | ~$20/mo* | ❌ | ✅✅ | ❌ (GPT) | ✅ | CLI + App |
| **Zed** | $20/mo | ❌ | ❌ | ✅ | ✅ | Nativo Rust |
| **Trae** | Free! | ❌ | ❌ | ✅ | ⚠️ | VS Code fork |
| **Devin** | $20/mo | ❌ | ✅✅✅ | ✅ | ❌ | Sandbox web |
| **Augment** | $20/mo | ❌ | ❌ | ✅ | ✅ | Extension |

*Codex incluso no ChatGPT Plus/Pro

---

## Spec-Driven Development (SDD) — Quem Suporta

O SDD é a prática de definir **especificações formais antes da implementação**, permitindo que o agente trabalhe de forma previsível e auditável.

| Ferramenta | SDD Nativo | Workaround |
|-----------|-----------|------------|
| **Kiro** | ✅ Specs → Design → Tasks | — |
| **Cursor** | ❌ | .cursorrules, docs/, prompts explícitos |
| **Claude Code** | ❌ | CLAUDE.md, conventions, task files |
| **Copilot** | ❌ | .github/copilot-instructions.md |
| **Codex** | ❌ | config.toml profiles, AGENTS.md |
| **Zed** | ❌ | Agent instructions em chat |
| **Windsurf** | ❌ | Rules files |

**Conclusão:** Kiro é o único com workflow SDD de primeira classe. Todos os outros precisam de configuração manual para simular specs.

---

## Como Trabalhar com Agentes — Padrões por Ferramenta

### Cursor: .cursorrules + Composer

```markdown
# .cursorrules
Você é um engenheiro sênior trabalhando em {projeto}.
Stack: TypeScript, React, Fastify.
Regras: ...
```
- Composer para tasks multi-arquivo
- Agent mode para implementação autônoma
- `@codebase` para contexto completo

### Kiro: Specs + Steering + Hooks

```
.kiro/
├── specs/feature-x/
│   ├── requirements.md
│   ├── design.md  
│   └── tasks.md
├── steering/
│   └── coding-standards.md
└── hooks/
    └── lint-on-save.json
```
- Specs definem O QUE fazer
- Steering define COMO fazer
- Hooks automatizam verificações

### Claude Code: CLAUDE.md + Conventions

```markdown
# CLAUDE.md
## Sobre o projeto
{contexto}

## Comandos úteis
- `npm test` — roda testes
- `npm run build` — builda

## Regras
- Sempre rodar testes antes de commitar
```
- `/init` para bootstrap
- Headless para CI/CD
- Composes com qualquer editor

### Codex CLI: config.toml + Profiles

```toml
[profile.backend]
model = "gpt-5.3-codex"
sandbox = "network-restricted"
instructions = "Focus on API implementation..."

[profile.frontend]
model = "gpt-4o"
sandbox = "relaxed"
instructions = "Use React + Tailwind..."
```
- Profiles por tipo de work
- Sandbox configurável por segurança
- MCP Tunnel para integrações

---

## Decisão — Quando Usar Qual

| Cenário | Recomendação | Por quê |
|---------|--------------|---------|
| Projeto greenfield com specs | **Kiro** | SDD nativo, workflow estruturado |
| Codebase grande existente | **Cursor** ou **Augment** | Indexação profunda, multi-model |
| Tasks repetitivas em massa | **Devin** | Autonomia total, sandbox |
| CI/CD e automação | **Claude Code** ou **Codex CLI** | Headless, scriptável |
| Time com orçamento zero | **Trae** | Grátis com modelos premium |
| Performance máxima do editor | **Zed** | Rust nativo, <2ms latência |
| Ecossistema GitHub integrado | **Copilot** | PR review, issues, agent nativo |
| Pair programming real-time | **Zed** | Multiplayer humano+AI nativo |

---

## Tendências para 2H 2026

1. **Convergência CLI + IDE** — Claude Code e Codex ganhando UIs, IDEs ganhando CLIs
2. **Cloud Agents como padrão** — Execução assíncrona em VMs (Cursor, Copilot, Codex)
3. **Spec-Driven vai se espalhar** — Cursor e Windsurf devem adicionar workflows similares
4. **Pricing usage-based** — Todos migrando de seat fixo para créditos/tokens
5. **Multi-agent** — Múltiplos agentes trabalhando em paralelo no mesmo projeto
6. **ACP (Agent Communication Protocol)** — Agentes de diferentes vendors colaborando

---

## Conexões

- → [[03-mcps-vs-tools|MCP vs Tools]] — Como MCPs se integram aos editores
- → [[09-estrutura-operacional-prompts|Estrutura de Prompts]] — Como configurar o comportamento do agente
- → [[golden-sets|Golden Sets]] — Como testar qualidade de respostas dos agentes
