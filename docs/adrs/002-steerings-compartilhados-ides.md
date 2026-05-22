---
titulo: "ADR-002 — Steerings Compartilhados para IDEs e CLIs Agênticas"
status: aceita
data: 2026-05-22
decisores: Saymon Silva
tags:
  - steerings
  - ide
  - agentes
  - dx
  - arquitetura
---

# ADR-002 — Steerings Compartilhados para IDEs e CLIs Agênticas

## Contexto

O projeto é desenvolvido com múltiplas IDEs e CLIs agênticas simultaneamente (Kiro, Claude Code, Cursor, Antigravity, entre outras que surgirão). Cada uma tem seu formato proprietário para receber contexto:

| IDE/CLI | Formato esperado | Lê de fora? |
|---------|-----------------|-------------|
| Kiro | `.kiro/steering/*.md` com front matter `inclusion: always` | Não |
| Claude Code | `CLAUDE.md` na raiz | Não |
| Cursor | `.cursorrules` na raiz ou `.cursor/rules/*.md` | Não |
| Antigravity | `.antigravity/instructions.md` | Não |

Nenhuma delas segue referências, symlinks ou ponteiros para outros arquivos automaticamente. Isso cria um problema: **como manter contexto consistente sem duplicar tudo N vezes?**

## Decisão

Adotar uma estratégia de **fonte de verdade única + adaptadores mínimos**:

### 1. `steerings/` = Fonte de Verdade

Diretório com documentação completa e detalhada do projeto, legível por humanos e agentes:

```
steerings/
├── project-context.md    # Visão geral, arquitetura, domínios
├── coding-standards.md   # Convenções, stack, testes
├── knowledge-base.md     # Como criar/manter docs atômicos
└── architecture.md       # Patterns, constraints, decisões
```

### 2. Arquivos IDE-específicos = Adaptadores Compactos

Cada IDE recebe o mínimo necessário no formato que ela exige:

- **`CLAUDE.md`** — Resumo autocontido (~50 linhas) + "leia steerings/ para mais"
- **`.cursorrules`** — Ponteiro compacto (~5 linhas) direcionando para steerings/
- **`.kiro/steering/*.md`** — Cópia compacta com front matter obrigatório (duplicação inevitável)

### 3. Duplicação aceita apenas onde inevitável

Apenas `.kiro/steering/` duplica conteúdo de `steerings/` porque o Kiro exige formato próprio e não lê de fora. As demais IDEs apontam para a fonte de verdade.

## Alternativas Consideradas

### A) Tudo duplicado em cada pasta IDE
- ❌ Manutenção impossível — 4+ cópias divergem rapidamente
- ❌ Não escala com novas IDEs

### B) Symlinks
- ❌ IDEs não seguem symlinks para contexto
- ❌ Quebra em Windows
- ❌ Git trata symlinks de forma inconsistente

### C) Script de sincronização automática
- ✅ Possível como evolução futura
- ⚠️ Complexidade prematura para o momento atual
- Pode ser implementado quando a duplicação se tornar um problema real

### D) Apenas steerings/ sem configs IDE (escolhida parcialmente)
- ✅ Fonte única
- ❌ IDEs não leem automaticamente — precisa de adaptadores mínimos

## Consequências

### Positivas
- Uma fonte de verdade (`steerings/`) para manter
- Adaptadores IDE são pequenos e raramente mudam
- Qualquer nova IDE/CLI pode ser suportada adicionando 1 arquivo
- Humanos leem `steerings/` diretamente (não dependem de IDE)

### Negativas
- `.kiro/steering/` duplica parte do conteúdo (aceito como trade-off)
- Ao atualizar `steerings/`, lembrar de atualizar `.kiro/steering/` se relevante

### Evolução Futura
- Script `scripts/sync-steerings.sh` para gerar `.kiro/steering/` automaticamente
- Hook de pre-commit para validar consistência
- Template para onboarding de novas IDEs

## Estrutura Final

```
steerings/                  ← FONTE DE VERDADE (completa, detalhada)
├── project-context.md
├── coding-standards.md
├── knowledge-base.md
└── architecture.md

CLAUDE.md                   ← Claude Code (resumo + ponteiro)
.cursorrules                ← Cursor (ponteiro compacto)
.kiro/steering/             ← Kiro (cópia compacta, formato obrigatório)
├── project-context.md
└── coding-standards.md
```

## Referências

- ADR-000 (Gênese do projeto)
- [Kiro Docs — Steering](https://kiro.dev/docs/steering)
- [Cursor Docs — Rules](https://docs.cursor.com/context/rules)
- [Claude Code — CLAUDE.md](https://docs.anthropic.com/claude-code)
