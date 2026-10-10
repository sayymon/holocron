# Plano de Estudos — Engenharia de IA Aplicada (retomada set/2026)

> Norte: **o Holocron é o projeto-fio-condutor**. Cada módulo do curso vira uma
> feature real nele. No Capstone, não se começa nada do zero — consolida-se.
> Ritmo: **6–8h/semana** (1h/dia útil + bloco 2–3h no FDS). Uma disciplina por vez.

## Regras do jogo

1. **Fechar o aberto antes de abrir novo.** Exceção: desbloqueios (Fine-tuning 25/09,
   Segurança 19/10, Capstone 13/11) só entram na fila — não dispersam o foco atual.
2. **Toda semana entrega 1 build commitado.** Aula assistida sem build não conta.
3. **Tudo instrumentado no LangSmith** a partir de Agentes (e retroativo no `ask`).
4. **Cada aula nova atualiza 1 doc atômico** no knowledge-graph (caderno ativo).
5. **DoD da disciplina**: 100% no site + build rodando + README curto da feature.

## S0 — FDS 12–13/set: fechar APIs de IA Generativa + Prompt Eng. (27% → 100%)

### Sábado (~5h)
- [ ] **Teoria (2h):** zerar aulas/quizzes pendentes do módulo no site.
      Checklist mínimo: chat completions e parâmetros (temp/top_p), structured
      outputs, function calling, streaming, embeddings, limites/custos.
- [ ] **Build A (2–3h):** `ask` com **streaming** (CLI + `POST /ask`) e resposta
      estruturada com **Zod** (`answer`, `sources[]`, `confidence`).

### Domingo (~5h)
- [ ] **Build B (2h):** `src/prompts/` com 3 templates versionados
      (`tutor`, `quiz`, `resumo`), cada um com system + few-shot. Trocar os
      prompts hardcoded pelo loader versionado.
- [ ] **Build C (2h):** `eval/golden.json` (10 pares pergunta/resposta) +
      `npm run eval` (acurácia + latência + custo estimado). Bater 100% no site.

DoD S0: site 100% · streaming funcionando · 3 prompts versionados · eval ≥ 8/10.

## S1–S3 — MCP (14/set–04/out)

> Kickoff segunda (2h): expor `search_docs` como tool MCP com o SDK já instalado
> e ver a chamada verde no `npx @modelcontextprotocol/inspector`.

- [ ] **S1 — Server básico:** tools `search_docs`, `get_doc`, `ask_tutor`;
      testar no inspector; conectar no Kiro e usar de verdade.
- [ ] **S2 — Resources + client:** docs expostos como resources; client no Holocron
      consumindo server externo (filesystem ou github) para ingerir conteúdo.
- [ ] **S3 — Transports + polish:** stdio → Streamable HTTP; auth mínima; README
      com `mcp:inspect` + exemplo de sessão real.

DoD: chamar o Holocron como tool de fora do repo (Kiro/Claude Desktop).

## S4–S6 — Agentes Autônomos (05–25/out)

- [ ] **S4 — ReAct + obs:** agente com tools do Holocron; **tudo tracejado no
      LangSmith** (é o que o Erick demonstrou — latência, tokens, erros).
- [ ] **S5 — LangGraph + memória:** grafo tutor
      (router → retriever → synth → quiz); memória de conversa no Postgres.
- [ ] **S6 — HITL + multi:** aprovação humana na ingestão de doc novo;
      comparativo ReAct vs plan-and-execute no mesmo task set (micro arena).

DoD: conversa multi-turno com memória + 1 trace LangSmith linkado no README.

## S7 — UX/UI (26/out–01/nov, modo acelerado)

- [ ] **Build:** página web mínima do Holocron (chat + leitor de docs + embed do
      `mindmap.html`). Pode gerar o esqueleto com ferramenta de IA e integrar.

## S8 — DevOps (02–08/nov)

- [ ] **Build:** `docker compose` (api + pgvector) subindo do zero; CI com
      lint + build + eval smoke; deploy (Railway/Fly); logs estruturados.

## S9 — Gestão + início Arquitetura (09–15/nov)

- [ ] **Build:** changelog e roadmap do Holocron **gerados por IA** a partir de
      `git log` (dogfooding do módulo). Abrir Arquitetura em paralelo leve.

## S10–S11 — Arquitetura de Sistemas com IA (16–29/nov)

- [ ] **Build:** gateway interno — cache de embeddings/respostas, fallback de
      provider, budget de custo por query; eval no CI; relatório custo × latência.

## S12 — Fine-tuning + Segurança (30/nov–06/dez)

- [ ] **Fine-tuning:** dataset Q&A curado do próprio Holocron; LoRA pequeno
      (Colab/Unsloth, ex. Qwen 1–3B); comparativo base vs tunado + nota de
      quando **não** tunar.
- [ ] **Segurança:** PII redaction na ingestão, detector simples de prompt
      injection no agente, allowlist de tools, secrets fora do repo. Red-team
      com 10 prompts adversariais documentados.

## S13–S14 — Capstone + Carreira (07–20/dez)

- [ ] **Capstone:** hardening — README demo, vídeo 3–5 min, métricas
      (latência/custo/eval), fechar gaps. Nada novo, só consolidar.
- [ ] **Carreira:** 1-pager do Holocron; system design desenhado de cabeça;
      simulados usando teu histórico de builds como repertório.

## Jan–fev/27 — Contextuais + buffer

4ªRI, Foresight, Ecossistema como leitura intercalada (1 doc-síntese cada no KG)
+ margem para entrevistas e eventuais atrasos.

## Micro-projetos (encaixe rápido, alto aprendizado)

1. **Prompt Lab** (S0): mesmo input, 2 prompts → diff de output/custo/latência.
2. **MCP turista** (S2): conectar 3 servers públicos e documentar 1 achado útil.
3. **Arena de agentes** (S6): placar ReAct vs plan-and-execute.
4. **Golden set vivo** (S0→S11): o `eval/` cresce a cada módulo; vira gate do CI.
5. **Custo-tracker** (S10): log de tokens/R$ por query no `ask`.
6. **Red-team 10** (S12): 10 ataques documentados + mitigação de cada um.

## Riscos e antídotos

| Risco | Antídoto |
|---|---|
| Abrir módulo novo com anterior incompleto | Regra 1; semana só vira com DoD cumprida |
| FDS engolido, 0h na semana | Mínimo não-negociável: 3× 1h (ter/qui/sáb) |
| Tutorial hell (só assistir) | Regra 2: sem build, a semana não fecha |
| Escopo do Holocron explode | Feature por módulo é fatia vertical mínima, não rewrite |
