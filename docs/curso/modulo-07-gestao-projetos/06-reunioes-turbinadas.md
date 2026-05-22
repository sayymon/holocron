---
titulo: "Reuniões Turbinadas"
modulo: 7
unidade: 6
tags: [gestao-projetos, reunioes, transcricao, resumo, action-items, integracao]
dificuldade: basico
fonte: "Curso AI Engineer — Módulo 07"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Reuniões Turbinadas

## Conceito Central

IA transforma reuniões de overhead em ativos de conhecimento — transcrevendo, resumindo, extraindo ações e integrando decisões diretamente nos boards de projeto.

## Pipeline de Reunião Inteligente

```
Reunião (áudio/vídeo)
    ↓
[Transcrição] — Speech-to-Text (Whisper, Google, Otter)
    ↓
[Diarização] — Identifica quem falou o quê
    ↓
[Sumarização] — Resumo estruturado por tópico
    ↓
[Extração] — Decisões, action items, blockers
    ↓
[Integração] — Cria tasks no Jira/Linear, atualiza Confluence
```

## Extração de Action Items

IA identifica padrões linguísticos de compromisso:

| Padrão | Exemplo | Extração |
|--------|---------|----------|
| "Eu vou..." | "Eu vou revisar o PR até sexta" | Action: Revisar PR, Owner: speaker, Due: sexta |
| "Precisamos..." | "Precisamos alinhar com o time de dados" | Action: Alinhar com dados, Owner: TBD |
| "Ficou decidido..." | "Ficou decidido usar DocumentDB" | Decisão: Usar DocumentDB |
| "Bloqueado por..." | "Bloqueado pela API do parceiro" | Blocker: API parceiro |

## Resumo Estruturado

```markdown
## Meeting Summary — Sprint Planning (22/05/2026)

### Decisões
- Usar DocumentDB para o novo serviço (consenso)
- Sprint goal: entregar MVP do cockpit

### Action Items
| Ação | Owner | Prazo |
|------|-------|-------|
| Criar spike de DocumentDB | @dev1 | 26/05 |
| Validar mockup com stakeholder | @designer | 24/05 |

### Blockers
- API do parceiro sem documentação atualizada

### Próximos Passos
- Review do spike na daily de quarta
```

## Ferramentas

| Ferramenta | Capacidade |
|------------|-----------|
| Otter.ai | Transcrição + resumo + action items |
| Fireflies.ai | Transcrição + integração CRM/PM |
| tl;dv | Gravação + highlights + clips |
| Google Meet + Gemini | Resumo nativo + notas |
| Grain | Highlights compartilháveis |

## Integração com Boards

Fluxo automatizado:
1. Reunião termina → transcrição gerada
2. IA extrai action items com owners
3. Tasks criadas automaticamente no Jira/Linear
4. Resumo postado no canal do Slack
5. Decisões registradas na Confluence

## Exercício Prático

1. Grave sua próxima reunião de planning
2. Use IA para gerar transcrição + resumo
3. Compare action items extraídos vs. anotados manualmente
4. Configure integração automática com seu board

## Armadilhas Comuns

- ❌ Depender 100% da IA sem revisão humana
- ❌ Gravar sem consentimento dos participantes
- ❌ Resumos muito longos (perde o propósito)
- ❌ Não fechar o loop (action items sem follow-up)

## Conexões

- [[07-status-reports]] — Resumos alimentam reports
- [[09-automacao-ferramentas]] — Integração com boards
