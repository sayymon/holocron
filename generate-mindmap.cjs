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
  <title>Mindmap — Holocron AI Engineer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #0f172a; }
    .markmap { width: 100%; height: 100%; }
  </style>
</head>
<body>
<div class="markmap">
${markdown}
</div>
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18.12"></script>
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
