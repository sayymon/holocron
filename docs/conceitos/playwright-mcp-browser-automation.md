---
titulo: "Playwright MCP — Automação de Browser para Análise e Testes"
tags: [playwright, mcp, browser-automation, chrome, devtools, testing]
fonte: "Experiência prática — configuração e troubleshooting"
confiabilidade: alta
data: 2026-06-04
---

# Playwright MCP — Automação de Browser

## O que é

O Playwright MCP expõe o controle de um browser (Chrome, Firefox, WebKit) como ferramentas MCP. Permite que agentes naveguem, inspecionem DOM, tirem screenshots, preencham formulários e executem JavaScript — tudo via protocolo MCP.

## Configuração no Kiro

```json
{
  "playwright": {
    "command": "npx",
    "args": [
      "@playwright/mcp@latest",
      "--browser", "chrome",
      "--user-data-dir", "/path/to/isolated/profile"
    ]
  }
}
```

## Problema Comum: user-data-dir

### Sintoma
```
DevTools remote debugging requires a non-default data directory.
```
Browser abre em `about:blank` e não navega. Timeout de 180s.

### Causa Raiz

O Playwright precisa de **remote debugging** via DevTools Protocol. Quando `--user-data-dir` aponta para o diretório padrão do Chrome (`~/Library/Application Support/Google/Chrome`), conflita porque:

1. O perfil principal pode já estar em uso (lock file)
2. Extensões interferem no debugging
3. Múltiplos perfis criam conflito de inicialização
4. O Google Updater e processos auxiliares disputam o processo

### Solução

Usar um **diretório isolado** exclusivo para automação:

```json
"--user-data-dir", "~/.playwright-chrome-profile"
```

### Opções de Configuração

| Cenário | user-data-dir | Resultado |
|---------|---------------|-----------|
| Perfil padrão do Chrome | `~/Library/Application Support/Google/Chrome` | ❌ Conflita |
| Perfil específico | `~/Library/.../Chrome/Profile 2` | ⚠️ Pode funcionar se não está em uso |
| Diretório isolado (novo) | `~/.playwright-chrome-profile` | ✅ Recomendado |
| Sem user-data-dir | (omitir o argumento) | ✅ Usa perfil temporário (não persiste) |

### Trade-offs

| Abordagem | Prós | Contras |
|-----------|------|---------|
| Perfil isolado persistente | Mantém cookies/login entre sessões | Precisa logar manualmente 1x |
| Perfil temporário | Zero conflito, sempre limpo | Perde login a cada reinício |
| Perfil real do Chrome | Tem todos os cookies/sessões | Conflita, instável |

## Capacidades do Playwright MCP

### Inspeção (leitura)
- `browser_snapshot` — árvore de acessibilidade (melhor que screenshot para entender estrutura)
- `browser_evaluate` — executa JS arbitrário na página
- `browser_take_screenshot` — captura visual
- `browser_network_requests` — intercepta requests
- `browser_console_messages` — lê console do browser

### Ação (escrita)
- `browser_navigate` — navegar para URL
- `browser_click` — clicar em elemento
- `browser_type` — digitar texto
- `browser_fill_form` — preencher formulários
- `browser_select_option` — selecionar dropdowns
- `browser_press_key` — teclas especiais
- `browser_file_upload` — upload de arquivos

### Controle
- `browser_tabs` — gerenciar abas
- `browser_wait_for` — aguardar condições
- `browser_handle_dialog` — lidar com alerts/confirms

## Padrão de Análise de Jogos Web

Ao analisar um jogo para automação, execute:

```javascript
// Script de análise — cola no browser_evaluate
() => ({
    // Tipo de renderização
    canvases: document.querySelectorAll('canvas').length,
    hasWebGL: !!document.querySelector('canvas')?.getContext('webgl'),
    iframes: document.querySelectorAll('iframe').length,
    
    // Framework
    framework: window.React ? 'React' :
               window.Vue ? 'Vue' :
               window.__NEXT_DATA__ ? 'Next.js' : 'Unknown',
    
    // Interatividade
    inputs: document.querySelectorAll('input, textarea').length,
    buttons: document.querySelectorAll('button').length,
    
    // Scripts carregados
    scripts: [...document.querySelectorAll('script[src]')]
        .slice(0, 10).map(s => s.src)
})
```

### Decisão de abordagem baseada no resultado:

| Resultado | Abordagem |
|-----------|-----------|
| Canvas > 0, WebGL = true | YOLO / Computer Vision |
| Canvas > 0, WebGL = false | Canvas 2D — pode usar getImageData ou YOLO |
| Canvas = 0, inputs > 0 | DOM manipulation + NLP/LLM |
| Iframes > 0 | Identificar iframe do jogo, ignorar ads |

## Dicas Práticas

1. **Snapshot > Screenshot** — Para entender estrutura, use `browser_snapshot` (árvore de acessibilidade). Para ver visualmente, screenshot.

2. **Iframes de ads** — Jogos web geralmente têm 5-15 iframes de publicidade. O conteúdo real fica no `<main>` ou em um iframe específico.

3. **React/Next.js re-renders** — Elementos podem mudar de referência entre renders. Use seletores estáveis (data-testid, roles, text content).

4. **Anti-bot** — Adicione delays humanizados:
   ```javascript
   await page.waitForTimeout(Math.random() * 500 + 200);
   ```

5. **MutationObserver** — Para detectar mudanças de estado no jogo:
   ```javascript
   new MutationObserver((mutations) => {
       // Reagir a mudanças no DOM
   }).observe(gameContainer, { childList: true, subtree: true });
   ```

## Referências

- [Playwright MCP](https://github.com/anthropics/playwright-mcp)
- [Playwright Docs](https://playwright.dev)
- [[yolo-browser-game-automation]] — automação visual
- [[analise-stopots-automacao]] — automação textual
