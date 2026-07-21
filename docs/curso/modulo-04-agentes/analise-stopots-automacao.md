---
titulo: "Análise StopOts — Aplicando ML para Automação de Jogos baseados em DOM"
modulo: 04
unidade: "Como Vencer Qualquer Jogo — Aplicação Prática"
tags: [stopots, automacao, dom, next-js, nlp, llm, playwright, web-scraping]
fonte: "Análise técnica via Playwright MCP"
confiabilidade: alta
data: 2026-06-04
---

# Análise StopOts — Automatizando um Jogo Baseado em DOM

## Contexto

O StopOts (stopots.com) é um jogo de Stop/Adedanha online. Diferente do DuckHunt (canvas + detecção visual), este é um jogo **baseado em texto e DOM** — o que muda completamente a abordagem de automação.

## Análise Técnica do Site

### Resultado da inspeção via Playwright:

| Característica | Valor | Implicação |
|---------------|-------|------------|
| **Canvas** | 0 | ❌ Não usa canvas — YOLO é inútil aqui |
| **WebGL** | Não | ❌ Sem renderização 3D/GPU |
| **Iframes** | 11 | ⚠️ Muitos iframes (ads + consent) |
| **Framework** | Next.js | React server-side rendered |
| **Input fields** | 1 (nome) | Campos de texto são dinâmicos (aparecem no jogo) |
| **Scripts** | `_next/static/chunks/...` | App React com code splitting |

### Conclusão da Análise

```
┌────────────────────────────────────────────────┐
│  StopOts = DOM puro (Next.js/React)            │
│  NÃO usa canvas, NÃO usa WebGL                │
│  Interface é texto + inputs + botões           │
│  Jogo de PALAVRAS, não de reflexo visual       │
└────────────────────────────────────────────────┘
```

**Veredicto:** YOLO (Computer Vision) NÃO se aplica aqui. A automação ideal usa **NLP/LLM + DOM manipulation**.

## Comparação: DuckHunt vs StopOts

| Aspecto | DuckHunt | StopOts |
|---------|----------|---------|
| Renderização | Canvas (PixiJS) | DOM (Next.js/React) |
| Tipo de desafio | Reflexo visual | Conhecimento verbal |
| Detecção do alvo | YOLO (Computer Vision) | DOM selectors (ler letra + categorias) |
| Ação | Simular clique (x,y) | Preencher texto + clicar STOP |
| IA necessária | Object Detection | NLP/LLM (gerar palavras) |
| Velocidade | 200ms por frame | Segundos (pensar + digitar) |

## Como Automatizar o StopOts

### Arquitetura Proposta

```
┌─────────────────────────────────────────────────────┐
│                  GAME LOOP (StopOts)                 │
│                                                     │
│  1. Playwright observa o DOM do jogo                │
│  2. Detecta: letra sorteada + categorias ativas     │
│  3. Envia para LLM: "Palavra com [X] na categoria  │
│     [Y]"                                            │
│  4. LLM retorna palavras válidas                    │
│  5. Playwright preenche os inputs                   │
│  6. Clica "STOP" quando todas preenchidas           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Passo 1: Observar o Estado do Jogo (DOM)

```javascript
// Não precisa de YOLO — lê direto do DOM
const letra = document.querySelector('.letter-display')?.textContent; // ex: "M"
const categorias = document.querySelectorAll('.category-input');
// Resultado: { letra: "M", categorias: ["Nome", "CEP", "Animal", ...] }
```

### Passo 2: Gerar Respostas (LLM ou Banco Local)

**Opção A — LLM (mais flexível):**
```javascript
const response = await fetch('https://api.openrouter.ai/...', {
    body: JSON.stringify({
        prompt: `Palavra que começa com "${letra}" para a categoria "${categoria}". 
                 Responda APENAS a palavra, sem explicação.`
    })
});
```

**Opção B — Banco de palavras local (mais rápido):**
```javascript
const banco = {
    "Nome": { "A": "Ana", "B": "Bruno", "C": "Carlos", ... },
    "Animal": { "A": "Águia", "B": "Baleia", "C": "Cachorro", ... },
    // ...
};
const resposta = banco[categoria][letra];
```

**Opção C — Híbrido (melhor):**
- Banco local para respostas instantâneas
- LLM como fallback para categorias incomuns

### Passo 3: Preencher e Submeter (Playwright)

```javascript
// Preenche cada campo
for (const [index, input] of categorias.entries()) {
    const palavra = respostas[index];
    await input.fill(palavra);
}
// Clica STOP
await page.click('button.stop-button');
```

### Passo 4: Validação (fase de votação)

Na fase de votação, pode-se automatizar a análise:
- Verificar se respostas dos outros são válidas
- Votar automaticamente (aceitar/rejeitar)

## Stack Recomendada para Automação do StopOts

| Componente | Tecnologia | Por quê |
|-----------|-----------|---------|
| Browser automation | Playwright | Controle total do DOM, handles iframes |
| Geração de palavras | LLM (Claude/GPT) + cache local | Flexibilidade + velocidade |
| Banco de palavras | JSON/SQLite | Respostas instantâneas para categorias comuns |
| Orquestração | Node.js/TypeScript | Mesmo ecossistema do MCP |

## Desafios Específicos do StopOts

| Desafio | Solução |
|---------|---------|
| 11 iframes (ads) | Filtrar pelo iframe principal do jogo |
| React re-renders | Usar `MutationObserver` ou polling |
| Tempo limitado | Banco local > LLM (latência) |
| Categorias variáveis | LLM como fallback |
| Anti-bot | Simular typing delay humanizado |
| Fase de votação | Analisar respostas com NLP |

## Conceitos de ML Aplicáveis (mesmo sem YOLO)

| Conceito | Aplicação no StopOts |
|----------|---------------------|
| **NLP/LLM** | Gerar palavras válidas por categoria |
| **Classification** | Validar se uma resposta é correta na votação |
| **Retrieval** | Buscar palavras em banco vetorial por similaridade |
| **Reinforcement Learning** | Aprender quais palavras dão mais pontos (únicas > repetidas) |
| **OCR** (se necessário) | Ler categorias de imagem (improvável no StopOts) |

## Quando Usar Cada Abordagem

```
┌──────────────────────────────────────────────────┐
│ JOGO VISUAL (Canvas/WebGL)                       │
│ → YOLO / Computer Vision / TensorFlow.js         │
│ Ex: DuckHunt, Fruit Ninja, Space Invaders        │
├──────────────────────────────────────────────────┤
│ JOGO DE TEXTO (DOM/Forms)                        │
│ → NLP / LLM / DOM Manipulation / Playwright      │
│ Ex: StopOts, Wordle, Quiz games                  │
├──────────────────────────────────────────────────┤
│ JOGO MISTO (Canvas + inputs de texto)            │
│ → Combinar ambas abordagens                      │
│ Ex: Pictionary online, Gartic                    │
└──────────────────────────────────────────────────┘
```

## Referências

- [StopOts](https://stopots.com/pt)
- [Playwright MCP](https://github.com/anthropics/playwright-mcp)
- [[yolo-browser-game-automation]] — abordagem visual (DuckHunt)
