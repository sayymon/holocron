#!/usr/bin/env node

/**
 * Gerador de Mindmap Dinâmico
 * Lê todos os .md do knowledge-graph e gera um HTML interativo
 */

const fs = require('fs');
const path = require('path');

const KG_DIR = path.join(__dirname, 'docs/knowledge-graph');
const OUTPUT = path.join(__dirname, 'docs/knowledge-graph/mindmap-dynamic.html');

// Mapear categorias para cores
const CATEGORY_COLORS = {
  'fundamentos': '#3b82f6',
  'generative-ai': '#10b981',
  'llms': '#f59e0b',
  'paradigmas': '#8b5cf6',
  'padroes': '#ec4899',
  'providers-llm': '#ef4444',
  'frameworks': '#06b6d4',
  'codificacao': '#84cc16',
  'infraestrutura': '#f97316',
  'observabilidade': '#6366f1',
  'modelos': '#14b8a6',
  'aplicacoes': '#a855f7',
  'benchmarks': '#eab308'
};

// Ler front matter de um .md
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const yaml = match[1];
  const data = {};
  yaml.split('\n').forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value.length) {
      data[key.trim()] = value.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return data;
}

// Extrair headings de um .md
function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];
  
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].replace(/[*_`]/g, '').trim()
      });
    }
  }
  return headings;
}

// Extrair wikilinks
function extractWikilinks(content) {
  const links = [];
  const regex = /\[\[([^\]]+)\]\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

// Mapear caminho para categoria
function getPathCategory(filePath) {
  const relative = path.relative(KG_DIR, filePath);
  const parts = relative.split(path.sep);
  
  if (parts[0] === 'conceitos') {
    if (parts[1] === 'generative-ai') {
      if (parts[2] === 'aplicacoes') return 'aplicacoes';
      if (parts[2] === 'benchmarks') return 'benchmarks';
      if (parts[2] === 'modelos') return 'modelos';
      return 'generative-ai';
    }
    return parts[1] || 'fundamentos';
  }
  if (parts[0] === 'ferramentas') {
    return parts[1] || 'providers-llm';
  }
  return 'fundamentos';
}

// Construir arvore hierarquica
function buildTree(files) {
  const tree = {
    name: '🧠 Holocron AI Engineer',
    children: []
  };

  // Mapear pastas
  const folders = {
    'fundamentos': { name: '📚 Fundamentos', children: [] },
    'generative-ai': { name: '✨ Generative AI', children: [] },
    'llms': { name: '🤖 LLMs', children: [] },
    'paradigmas': { name: '🎯 Paradigmas', children: [] },
    'padroes': { name: '📏 Padrões', children: [] },
    'providers-llm': { name: '🏢 Providers', children: [] },
    'frameworks': { name: '⚙️ Frameworks', children: [] },
    'codificacao': { name: '💻 Coding', children: [] },
    'infraestrutura': { name: '🔧 Infraestrutura', children: [] },
    'observabilidade': { name: '📊 Observabilidade', children: [] },
    'modelos': { name: '🏆 Modelos Flagship', children: [] },
    'aplicacoes': { name: '📱 Aplicações', children: [] },
    'benchmarks': { name: '📈 Benchmarks', children: [] }
  };

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const frontMatter = parseFrontMatter(content);
    const headings = extractHeadings(content);
    const category = getPathCategory(file);
    const fileName = path.basename(file, '.md');
    
    // Criar no do arquivo
    const fileNode = {
      name: frontMatter.titulo || fileName,
      children: []
    };

    // Adicionar headings como filhos (max nivel 2)
    const mainHeadings = headings.filter(h => h.level <= 2);
    for (const heading of mainHeadings.slice(0, 5)) {
      fileNode.children.push({ name: heading.text });
    }

    // Adicionar ao folder correto
    if (folders[category]) {
      folders[category].children.push(fileNode);
    }
  }

  // Adicionar folders com conteudo
  for (const [key, folder] of Object.entries(folders)) {
    if (folder.children.length > 0) {
      tree.children.push(folder);
    }
  }

  return tree;
}

// Converter tree para formato Markmap
function treeToMarkmap(node, depth = 0) {
  let md = '';
  const indent = '  '.repeat(depth);
  
  if (depth === 0) {
    md = `# ${node.name}\n\n`;
  } else {
    md = `${indent}- ${node.name}\n`;
  }
  
  if (node.children) {
    for (const child of node.children) {
      md += treeToMarkmap(child, depth + 1);
    }
  }
  
  return md;
}

// Gerar HTML
function generateHTML(markdown, stats) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mindmap Dinâmico — Holocron AI Engineer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #mindmap { width: 100%; height: 100%; overflow: hidden; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f172a;
    }
    #mindmap svg { width: 100%; height: 100%; }
    
    /* Toolbar */
    #toolbar {
      position: fixed; top: 16px; right: 16px; z-index: 100;
      display: flex; gap: 8px; background: rgba(15,23,42,0.95);
      padding: 8px 12px; border-radius: 12px; backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.1);
    }
    #toolbar button {
      background: rgba(255,255,255,0.1); border: none; color: #fff;
      padding: 8px 12px; border-radius: 8px; cursor: pointer;
      font-size: 14px; transition: all 0.2s;
    }
    #toolbar button:hover { background: rgba(255,255,255,0.2); }
    #toolbar button.active { background: #3b82f6; }
    
    /* Header */
    #header {
      position: fixed; top: 16px; left: 16px; z-index: 100;
      background: rgba(15,23,42,0.95); padding: 12px 20px;
      border-radius: 12px; backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff;
    }
    #header h1 { font-size: 16px; font-weight: 600; }
    #header p { font-size: 12px; color: #94a3b8; margin-top: 4px; }
    
    /* Stats */
    #stats {
      position: fixed; bottom: 16px; right: 16px; z-index: 100;
      background: rgba(15,23,42,0.95); padding: 12px 16px;
      border-radius: 12px; backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff; font-size: 12px; text-align: right;
    }
    #stats .number { font-size: 24px; font-weight: 700; color: #3b82f6; }
    
    /* Loading */
    #loading {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      color: #fff; font-size: 18px; z-index: 200;
    }
    .spinner {
      width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1);
      border-top-color: #3b82f6; border-radius: 50%;
      animation: spin 1s linear infinite; margin: 0 auto 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div id="loading">
    <div class="spinner"></div>
    Carregando mindmap...
  </div>
  <div id="mindmap"></div>
  
  <div id="header">
    <h1>🧠 Holocron AI Engineer</h1>
    <p>Mindmap dinâmico — Gerado automaticamente</p>
  </div>
  
  <div id="toolbar">
    <button onclick="zoomIn()" title="Zoom In">+</button>
    <button onclick="zoomOut()" title="Zoom Out">-</button>
    <button onclick="resetView()" title="Reset">Reset</button>
    <button onclick="expandAll()" title="Expandir Tudo">Expandir</button>
    <button onclick="collapseAll()" title="Recolher Tudo">Recolher</button>
    <button onclick="regenerate()" title="Regenerar">🔄</button>
  </div>
  
  <div id="stats">
    <div class="number">${stats.total}</div>
    <div>docs atomicos</div>
    <div style="margin-top: 8px; font-size: 10px; color: #64748b;">
      Última geração: ${new Date().toLocaleString('pt-BR')}
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/markmap-view@0.17.2/dist/browser/index.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/markmap-lib@0.17.2/dist/browser/index.js"></script>
  <script>
    const markdown = \`${markdown.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
    
    let mm;
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
    
    function waitForLibs(callback) {
      if (window.markmap && window.markmap.Transformer && window.markmap.Markmap) {
        callback();
      } else {
        setTimeout(() => waitForLibs(callback), 100);
      }
    }
    
    function init() {
      document.getElementById('loading').style.display = 'none';
      
      waitForLibs(() => {
        try {
          const transformer = new markmap.Transformer();
          const { root } = transformer.transform(markdown);
          
          mm = markmap.Markmap.create('#mindmap', {
            colorFreezeLevel: 2,
            duration: 300,
            maxWidth: 280,
            paddingX: 16,
            spacingVertical: 6,
            spacingHorizontal: 60,
            autoFit: true,
            fitRatio: 0.92,
            zoom: true,
            pan: true,
            color: (node) => {
              const depth = node.state?.depth ?? 0;
              return colors[Math.min(depth, colors.length - 1)];
            }
          }, root);
        } catch (e) {
          console.error('Erro ao criar mindmap:', e);
          document.getElementById('loading').textContent = 'Erro: ' + e.message;
          document.getElementById('loading').style.display = 'block';
        }
      });
    }

    function zoomIn() { mm?.rescale(1.3); }
    function zoomOut() { mm?.rescale(0.7); }
    function resetView() { mm?.fit(); }
    
    function expandAll() {
      function expand(node) {
        if (node.children) {
          node.payload = { ...node.payload, fold: 0 };
          node.children.forEach(expand);
        }
      }
      expand(mm.state.data);
      mm.renderData();
      mm.fit();
    }
    
    function collapseAll() {
      function collapse(node, depth = 0) {
        if (node.children && depth > 0) {
          node.payload = { ...node.payload, fold: 1 };
        }
        if (node.children) {
          node.children.forEach((c) => collapse(c, depth + 1));
        }
      }
      collapse(mm.state.data);
      mm.renderData();
      mm.fit();
    }
    
    function regenerate() {
      location.reload();
    }

    document.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>`;
}

// Main
function main() {
  console.log('🧠 Gerando mindmap dinâmico...\n');
  
  // Encontrar todos os .md
  const files = [];
  function walkDir(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (item.endsWith('.md') && !item.startsWith('_') && !item.startsWith('MAPA') && !item.startsWith('MINDMAP') && !item.startsWith('PROMPT')) {
        files.push(fullPath);
      }
    }
  }
  
  walkDir(KG_DIR);
  console.log(`📁 Encontrados ${files.length} arquivos .md`);
  
  // Construir arvore
  const tree = buildTree(files);
  
  // Converter para markdown
  const markdown = treeToMarkmap(tree);
  
  // Estatisticas
  const stats = {
    total: files.length,
    categories: {}
  };
  
  for (const file of files) {
    const cat = getPathCategory(file);
    stats.categories[cat] = (stats.categories[cat] || 0) + 1;
  }
  
  console.log('\n📊 Estatísticas:');
  for (const [cat, count] of Object.entries(stats.categories)) {
    console.log(`   ${cat}: ${count}`);
  }
  
  // Gerar HTML
  const html = generateHTML(markdown, stats);
  fs.writeFileSync(OUTPUT, html);
  
  console.log(`\n✅ Mindmap gerado: ${OUTPUT}`);
  console.log(`\n🚀 Para visualizar:`);
  console.log(`   open ${OUTPUT}`);
  console.log(`   ou`);
  console.log(`   npx serve docs/knowledge-graph`);
}

main();
