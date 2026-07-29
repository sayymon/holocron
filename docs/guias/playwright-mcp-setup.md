---
titulo: "Playwright MCP — Instalação, Configuração e Casos de Uso"
tags: [playwright, mcp, browser, automação, vscode, kiro]
fonte: "Experiência prática + documentação oficial"
confiabilidade: alta
---

# Playwright MCP — Browser Automation para Agentes

## O que é

O **Playwright MCP** (`@playwright/mcp`) é um MCP server que permite que agentes de IA (Claude, Kiro, etc.) controlem um browser real — navegar, clicar, preencher formulários, extrair dados, tirar screenshots. Funciona via accessibility snapshots (não screenshots), tornando a interação eficiente em tokens.

## Componentes

| Componente | Função |
|-----------|--------|
| `@playwright/mcp` | MCP server (Node.js) — expõe tools de browser |
| Playwright Extension (Chrome/Chromium) | Extensão no browser que permite conexão via CDP |
| IDE (Kiro/VSCode) | Client MCP que invoca as tools |

## Modos de Operação

### 1. Extension Mode (recomendado para dev)
Conecta a um browser **já aberto** com suas sessões, cookies e extensões. Você interage com o browser normalmente e o agente também.

### 2. Headless Mode
Abre um browser controlado (sem UI). Útil para CI/CD e scraping automatizado.

### 3. CDP Endpoint
Conecta a uma instância remota via Chrome DevTools Protocol.

---

## Instalação

### Pré-requisitos
- Node.js 20+
- Browser Chromium-based (Chrome, Comet, Edge, Brave)
- Extensão Playwright instalada no browser

### Passo 1 — Instalar a Extensão no Browser

Acesse no seu browser Chromium:
```
https://chromewebstore.google.com/detail/playwright-extension/mmlmfjhmonkocbjadbfplnigmagldckm
```

Clique em "Adicionar ao Chrome/Comet". A extensão fica invisível (sem ícone) — ela só abre uma porta de comunicação.

### Passo 2 — Configurar no Kiro (mcp.json)

Edite `~/.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser", "chrome",
        "--executable-path", "/Applications/Comet.app/Contents/MacOS/Comet",
        "--user-data-dir", "/Users/SEU_USER/Library/Application Support/Comet",
        "--extension"
      ],
      "env": {
        "NPM_CONFIG_REGISTRY": "https://registry.npmjs.org"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

#### Paths por Browser (macOS)

| Browser | executable-path | user-data-dir |
|---------|----------------|---------------|
| Chrome | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` | `~/Library/Application Support/Google/Chrome` |
| Comet | `/Applications/Comet.app/Contents/MacOS/Comet` | `~/Library/Application Support/Comet` |
| Edge | `/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge` | `~/Library/Application Support/Microsoft Edge` |
| Brave | `/Applications/Brave Browser.app/Contents/MacOS/Brave Browser` | `~/Library/Application Support/BraveSoftware/Brave-Browser` |

#### Se usar Chrome padrão (sem customização)
```json
"args": [
  "@playwright/mcp@latest",
  "--browser", "chrome",
  "--extension"
]
```
Nesse caso ele detecta automaticamente o Chrome e user-data-dir padrão.

### Passo 3 — Reconectar o MCP

No Kiro: Command Palette (⌘+Shift+P) → "MCP: Reconnect Server"

---

## Extensão Playwright para VSCode

A **extensão Playwright Test for VSCode** (diferente do MCP!) é complementar:

| Recurso | Descrição |
|---------|-----------|
| Test Runner | Roda testes Playwright direto do editor |
| Codegen | Grava ações no browser e gera código |
| Trace Viewer | Visualiza traces com timeline, screenshots, network |
| Pick Locator | Aponta para um elemento e pega o seletor |
| Watch Mode | Re-executa testes ao salvar |

### Instalação
```
ext install ms-playwright.playwright
```

### Diferença entre Extensão VSCode e MCP

| Aspecto | Extensão VSCode | Playwright MCP |
|---------|----------------|----------------|
| Propósito | Escrever/rodar testes E2E | Agente AI controla browser |
| Quem usa | Desenvolvedor | Modelo de linguagem |
| Interação | UI do VSCode (botões, panels) | Tools MCP (navigate, click, snapshot) |
| Output | Test results, traces | Accessibility snapshots, dados |
| Codegen | Gera código .spec.ts | Não gera código (executa direto) |

Ambos usam Playwright por baixo, mas com propósitos diferentes. O MCP é para **agentes agirem**, a extensão é para **devs escreverem testes**.

---

## Como Funciona (Extension Mode)

```
┌─────────┐     MCP/stdio      ┌──────────────┐      CDP       ┌─────────┐
│  Kiro   │ ◄──────────────► │ @playwright/  │ ◄────────────► │ Browser │
│ (Client)│                   │     mcp       │                │ (Comet) │
└─────────┘                   └──────────────┘                └─────────┘
                                     │
                              Accessibility
                                Snapshot
                                (YAML tree)
```

1. **Kiro** envia comando MCP (ex: `browser_navigate`)
2. **@playwright/mcp** traduz para ação Playwright via CDP
3. **Browser** executa a ação
4. **@playwright/mcp** captura accessibility snapshot (árvore do DOM acessível)
5. **Kiro** recebe o snapshot como texto (não imagem!) → eficiente em tokens

### Por que Accessibility Snapshots?

- São **texto estruturado** (YAML), não pixels — muito mais barato em tokens
- Contêm **refs** (identificadores) para cada elemento interativo
- O agente "vê" a página como uma árvore de elementos com roles, labels e refs
- Para clicar, basta referenciar o `ref` do elemento

---

## Tools Disponíveis

### Navegação
| Tool | Descrição |
|------|-----------|
| `browser_navigate` | Navega para uma URL |
| `browser_navigate_back` | Volta na história |
| `browser_tabs` | Lista/cria/fecha abas |

### Interação
| Tool | Descrição |
|------|-----------|
| `browser_click` | Clica em elemento (por ref) |
| `browser_type` | Digita texto em input |
| `browser_fill_form` | Preenche múltiplos campos |
| `browser_select_option` | Seleciona opção em dropdown |
| `browser_hover` | Hover em elemento |
| `browser_press_key` | Pressiona tecla |
| `browser_drag` | Drag and drop |
| `browser_file_upload` | Upload de arquivos |

### Observação
| Tool | Descrição |
|------|-----------|
| `browser_snapshot` | Captura accessibility tree (principal) |
| `browser_find` | Busca texto na página |
| `browser_take_screenshot` | Screenshot visual (PNG/JPEG) |
| `browser_console_messages` | Logs do console |
| `browser_network_requests` | Lista requests de rede |

### Execução
| Tool | Descrição |
|------|-----------|
| `browser_evaluate` | Executa JavaScript na página |
| `browser_wait_for` | Espera texto aparecer/sumir |

---

## Casos de Uso

### 1. Scraping Inteligente
O agente navega, interpreta o conteúdo via snapshot, e extrai dados estruturados sem precisar de seletores CSS frágeis.

```
"Navegue em theresanaiforthat.com, busque tools de 'code review', 
 e me dê uma tabela com nome, preço e descrição das 10 primeiras."
```

### 2. Automação de Tarefas Repetitivas
Login em painéis, preencher formulários, exportar relatórios.

```
"Entre no Jira, filtre tickets do sprint atual, 
 e me dê um resumo do status de cada um."
```

### 3. Testes Exploratórios Assistidos
O agente navega pelo app, identifica problemas de UX, botões quebrados, etc.

```
"Navegue pelo fluxo de checkout do nosso app e me diga 
 se todos os botões estão acessíveis e funcionais."
```

### 4. Monitoramento de Concorrentes
Acompanhar mudanças em sites de concorrentes, pricing, features novas.

```
"Acesse a página de pricing do competitor X e compare 
 com o que tínhamos semana passada."
```

### 5. Preenchimento de Formulários Complexos
Multi-step forms, wizards, configurações com muitos campos.

```
"Preencha o formulário de cadastro de produto na plataforma 
 com os dados que te passei."
```

### 6. Documentação Visual
Capturar screenshots de fluxos para documentação.

```
"Navegue pelo onboarding e tire screenshots de cada etapa 
 para documentar o fluxo."
```

---

## Dicas Práticas

1. **Prefira `browser_snapshot` a `browser_take_screenshot`** — snapshots são texto (baratos), screenshots são imagens (caros em tokens)

2. **Use `browser_find` para localizar elementos** antes de interagir — evita snapshot completo da página

3. **Extension mode mantém seus cookies** — se você está logado no browser, o agente também está

4. **Cuidado com dados sensíveis** — o agente vê tudo que está na página (inclusive dados pessoais, tokens, etc.)

5. **Timeout padrão de ações: 5s** — configure `--timeout-action` se precisar de mais

6. **Use `--viewport-size`** para simular mobile: `--viewport-size 390x844`

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| "Extension not found" | Instale a extensão Playwright no browser correto |
| Abre Chrome ao invés do Comet | Use `--executable-path` apontando pro browser desejado |
| MCP não reconecta | Cmd+Shift+P → "MCP: Reconnect Server" |
| Página não carrega | Verifique `--user-data-dir` correto pro seu browser |
| Erro "target closed" | O browser foi fechado manualmente — reabra e reconecte |

---

## Referências

- [Playwright MCP — GitHub](https://github.com/microsoft/playwright-mcp)
- [Playwright Extension (Chrome Web Store)](https://chromewebstore.google.com/detail/playwright-extension/mmlmfjhmonkocbjadbfplnigmagldckm)
- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [[playwright-mcp-browser-automation]] — Conceito no Holocron
