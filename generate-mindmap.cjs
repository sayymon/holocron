#!/usr/bin/env node

/**
 * Gerador de Mindmap Dinâmico
 * Lê todos os .md do knowledge-graph e gera um HTML interativo
 */

const fs = require('fs');
const path = require('path');

const KG_DIR = path.join(__dirname, 'docs/knowledge-graph');
const OUTPUT = path.join(__dirname, 'docs/knowledge-graph/mindmap.html');

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

// Limpar formatação markdown inline, mantendo o texto legível
function cleanInline(s) {
  return String(s)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/[*_~=`#]+/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/^\[[ xX]\]\s*/, '')
    .replace(/^[\d]+[.)]\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(s, max = 90) {
  s = cleanInline(s);
  if (s.length > max) s = s.slice(0, max - 1).trimEnd() + '…';
  return s;
}

// Limites para manter o mapa navegável (seções h2 entram sempre)
const MAX_SECTIONS = 12;
const MAX_SUBS = 5;
const MAX_LEAVES = 5;
const DETAIL_BUDGET = 24;

// Construir nó de um arquivo com profundidade real:
// título (link p/ o doc) > definição > seções h2 > subseções h3+ > bullets/tabelas > Relações (sempre por último)
function buildFileNode(content, fileName, relPath, slugMap, docTitles) {
  const frontMatter = parseFrontMatter(content);
  const rawTitle = cleanInline(frontMatter.titulo || fileName) || fileName;
  const label = rawTitle.replace(/[\[\]()]/g, '');
  const node = { name: `[${label}](#doc=${relPath})`, children: [] };
  let budget = DETAIL_BUDGET;
  const spend = () => { budget--; return budget >= 0; };

  // Relações: todo [[wikilink]] explícito entra SEMPRE (com link se o doc
  // existe, como texto se ainda não existe); detalhes que são só o nome
  // de outro doc são absorvidos aqui em vez de duplicar. Nó vai por último.
  const REL_MAX = 8;
  const normKey = (s) => cleanInline(s).toLowerCase().trim().replace(/\s+/g, '-').replace(/^[-:;.,!?()]+|[-:;.,!?()]+$/g, '');
  const resolveDoc = (text) => {
    const key = normKey(text);
    if (!key) return null;
    return slugMap[key] || null;
  };
  const seen = new Set();
  const relations = [];
  const relationsPending = [];

  // 1) tags: entram só se resolverem para um doc existente
  const rawTags = String(frontMatter.tags || '').replace(/^\[|\]$/g, '');
  rawTags.split(',').map(t => cleanInline(t)).filter(Boolean).forEach(t => {
    const target = resolveDoc(t);
    if (target && target !== relPath && !seen.has(target)) { seen.add(target); relations.push(target); }
  });

  // 2) [[wikilinks]] explícitos (fora de blocos de código e código inline): entram sempre
  const noCode = content.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const wikiSeen = new Set();
  const pendingSet = new Set();
  extractWikilinks(noCode).forEach(w => {
    const label = cleanInline(String(w).split('|')[0]);
    if (!label || wikiSeen.has(label.toLowerCase())) return;
    wikiSeen.add(label.toLowerCase());
    const target = resolveDoc(label);
    if (target && target !== relPath) {
      if (!seen.has(target)) { seen.add(target); relations.push(target); }
    } else if (!target && label.toLowerCase() !== fileName.toLowerCase()) {
      if (relationsPending.indexOf(label) === -1) relationsPending.push(label);
      pendingSet.add(normKey(label));
    }
  });

  // 3) detalhes que são só o nome de um doc (existente ou wikilink pendente):
  // absorvidos (suprime sempre para não duplicar com Relações)
  const absorb = (text) => {
    const key = normKey(text);
    if (!key) return false;
    const target = slugMap[key];
    if (target) {
      if (target !== relPath && !seen.has(target) && relations.length < REL_MAX) {
        seen.add(target);
        relations.push(target);
      }
      return true;
    }
    if (pendingSet.has(key)) return true;
    return false;
  };

  const addLeaf = (parent, text, max) => {
    if (absorb(text)) return;
    text = truncate(text, max || 90);
    if (!text || text.length < 3) return;
    parent._leaves = parent._leaves || 0;
    if (parent._leaves >= MAX_LEAVES || !spend()) return;
    parent._leaves++;
    parent.children.push({ name: text });
  };

  const addSub = (parent, text) => {
    if (absorb(text)) return null;
    text = truncate(text, 80);
    if (!text) return null;
    parent._subs = parent._subs || 0;
    if (parent._subs >= MAX_SUBS) return null;
    parent._subs++;
    const sub = { name: text, children: [] };
    parent.children.push(sub);
    return sub;
  };

  const addTable = (parent, rows) => {
    const isSep = (r) => /^\|[\s:\-|]+\|\s*$/.test(r);
    const data = rows.filter(r => !isSep(r));
    if (!data.length) return;
    const start = data.length > 1 && rows.length > 1 && isSep(rows[1]) ? 1 : 0;
    data.slice(start, start + 3).forEach(r => {
      const cells = r.split('|').slice(1, -1).map(cleanInline).filter(Boolean);
      if (cells.length) addLeaf(parent, cells.join(' • '), 100);
    });
  };

  const lines = content.split('\n');
  let inCode = false;
  let tableBuf = [];
  let currentSection = null;
  let currentSub = null;
  let sections = 0;
  let quotes = 0;

  const flushTable = () => {
    if (tableBuf.length >= 2) addTable(currentSub || currentSection || node, tableBuf);
    tableBuf = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (/^```/.test(line)) { inCode = !inCode; continue; }
    if (inCode || !line) continue;
    if (/^(---|\*\*\*|___)\s*$/.test(line)) continue;

    if (/^\|.*\|\s*$/.test(line)) { tableBuf.push(line); continue; }
    flushTable();

    const h = line.match(/^(#{1,6})\s+(.+)/);
    if (h) {
      const level = h[1].length;
      if (level <= 1) { currentSection = null; currentSub = null; continue; }
      if (level === 2) {
        currentSub = null;
        // Seção que é só o nome de outro doc: vira relação, filhos sobem p/ o arquivo
        if (absorb(h[2])) { currentSection = null; continue; }
        if (sections >= MAX_SECTIONS) { currentSection = null; continue; }
        const text = truncate(h[2], 80);
        if (!text) { currentSection = null; continue; }
        sections++;
        currentSection = { name: text, children: [] };
        node.children.push(currentSection);
        continue;
      }
      const parent = level === 3 ? (currentSection || node) : (currentSub || currentSection || node);
      const sub = addSub(parent, h[2]);
      if (level === 3) currentSub = sub;
      continue;
    }

    const q = line.match(/^>\s?(.*)/);
    if (q && quotes < 2) {
      if (absorb(q[1])) continue;
      const text = truncate(q[1], 120);
      if (text.length > 10 && spend()) { node.children.push({ name: text }); quotes++; }
      continue;
    }

    const b = line.match(/^([-*+]|\d+[.)])\s+(.+)/);
    if (b) {
      addLeaf(currentSub || currentSection || node, b[2]);
      continue;
    }
  }
  flushTable();

  // Nó único de Relações sempre por último (só se houver relações)
  if (relations.length || relationsPending.length) {
    const relNode = { name: 'Relações', children: [] };
    for (const target of relations) {
      const tLabel = String(docTitles[target] || target).replace(/[\[\]()]/g, '').slice(0, 60);
      relNode.children.push({ name: `[${tLabel}](#doc=${target})` });
    }
    for (const slug of relationsPending) relNode.children.push({ name: slug });
    node.children.push(relNode);
  }

  const clean = (n) => { delete n._leaves; delete n._subs; (n.children || []).forEach(clean); };
  clean(node);
  return node;
}

// Construir arvore hierarquica
function buildTree(entries, slugMap, docTitles) {
  const tree = {
    name: 'Holocron AI Engineer',
    children: []
  };

  // Pastas por categoria (sem emojis)
  const folders = {
    'fundamentos': { name: 'Fundamentos', children: [] },
    'generative-ai': { name: 'Generative AI', children: [] },
    'modelos': { name: 'Modelos Flagship', children: [] },
    'llms': { name: 'LLMs', children: [] },
    'paradigmas': { name: 'Paradigmas', children: [] },
    'padroes': { name: 'Padrões', children: [] },
    'providers-llm': { name: 'Providers', children: [] },
    'frameworks': { name: 'Frameworks', children: [] },
    'codificacao': { name: 'Codificação', children: [] },
    'infraestrutura': { name: 'Infraestrutura', children: [] },
    'observabilidade': { name: 'Observabilidade', children: [] },
    'mcp-servers': { name: 'MCP Servers', children: [] },
    'aplicacoes': { name: 'Aplicações', children: [] },
    'benchmarks': { name: 'Benchmarks', children: [] }
  };

  for (const e of entries) {
    const category = getPathCategory(e.file);
    const fileName = path.basename(e.file, '.md');

    // Nó do arquivo com profundidade real extraída do documento
    const fileNode = buildFileNode(e.content, fileName, e.rel, slugMap, docTitles);

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

// Escapar HTML (o markdown vai inline dentro da div.markmap)
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Converter tree para formato Markmap
function treeToMarkmap(node, depth = 0) {
  let md = '';
  const indent = '  '.repeat(depth);

  if (depth === 0) {
    md = `# ${escapeHtml(node.name)}\n\n`;
  } else {
    md = `${indent}- ${escapeHtml(node.name)}\n`;
  }
  
  if (node.children) {
    for (const child of node.children) {
      md += treeToMarkmap(child, depth + 1);
    }
  }
  
  return md;
}

// Gerar HTML (mindmap.html é o arquivo principal)
function generateHTML(markdown, stats, docsJson, slugsJson) {
  const frontmatter = `---
markmap:
  maxWidth: 300
  colorFreezeLevel: 2
  initialExpandLevel: 2
  spacingVertical: 8
  spacingHorizontal: 80
  duration: 500
  autoFit: true
  color:
    - '#38bdf8'
    - '#34d399'
    - '#fbbf24'
    - '#f472b6'
    - '#a78bfa'
    - '#fb923c'
---

`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mindmap — Holocron AI Engineer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #0f172a; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .markmap { width: 100%; height: 100%; color-scheme: dark; }
    .markmap > svg { width: 100%; height: 100%; background: transparent; }
    /* Dark theme padrão desde o primeiro render (!important vence o CSS global injetado pelo autoloader) */
    .markmap svg text { fill: #e2e8f0 !important; }
    .markmap svg foreignObject div { color: #e2e8f0 !important; }
    .markmap svg a { color: #7dd3fc !important; }
    .markmap svg code { color: #f9a8d4 !important; background: rgba(255,255,255,.08) !important; }
    #header {
      position: fixed; top: 16px; left: 16px; z-index: 10;
      background: rgba(15,23,42,0.95); padding: 12px 20px;
      border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
      color: #fff; pointer-events: none;
    }
    #header h1 { font-size: 16px; font-weight: 600; }
    #header p { font-size: 12px; color: #94a3b8; margin-top: 4px; }
    #stats {
      position: fixed; bottom: 16px; left: 16px; z-index: 10;
      background: rgba(15,23,42,0.95); padding: 12px 16px;
      border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
      color: #fff; font-size: 12px; pointer-events: none;
    }
    #stats .number { font-size: 24px; font-weight: 700; color: #3b82f6; }
    #hint {
      position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 10;
      background: rgba(15,23,42,0.9); padding: 8px 16px; border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
      color: #94a3b8; font-size: 12px; white-space: nowrap; pointer-events: none;
    }
    /* Leitor de docs (overlay sobre o mapa; o mapa preserva zoom/expansão) */
    #viewer { position: fixed; inset: 0; z-index: 50; display: none; background: #0f172a; }
    #viewer.open { display: flex; flex-direction: column; }
    #viewer-topbar {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
      background: rgba(15,23,42,0.98);
    }
    #btn-back {
      background: #3b82f6; border: none; color: #fff; font-size: 14px;
      padding: 8px 16px; border-radius: 8px; cursor: pointer; white-space: nowrap;
    }
    #btn-back:hover { background: #2563eb; }
    #viewer-title { color: #fff; font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    #viewer-path { color: #64748b; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    #viewer-scroll { flex: 1; overflow-y: auto; }
    .prose { max-width: 860px; margin: 0 auto; padding: 32px 24px 96px; color: #e2e8f0; line-height: 1.7; font-size: 15px; }
    .prose h1, .prose h2, .prose h3, .prose h4 { color: #fff; margin: 1.4em 0 0.6em; line-height: 1.3; }
    .prose h1 { font-size: 1.7em; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 0.4em; }
    .prose h2 { font-size: 1.35em; }
    .prose p, .prose ul, .prose ol, .prose blockquote, .prose pre, .prose table { margin: 0.9em 0; }
    .prose ul, .prose ol { padding-left: 1.6em; }
    .prose li { margin: 0.3em 0; }
    .prose a { color: #7dd3fc; }
    .prose code { color: #f9a8d4; background: rgba(255,255,255,0.08); padding: 0.1em 0.35em; border-radius: 5px; font-size: 0.9em; }
    .prose pre { background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px 16px; overflow-x: auto; }
    .prose pre code { color: #e2e8f0; background: none; padding: 0; }
    .prose blockquote { border-left: 3px solid #3b82f6; padding-left: 14px; color: #cbd5e1; }
    .prose table { border-collapse: collapse; width: 100%; font-size: 0.92em; }
    .prose th, .prose td { border: 1px solid rgba(255,255,255,0.15); padding: 8px 12px; text-align: left; }
    .prose th { background: rgba(255,255,255,0.06); color: #fff; }
    .prose img { max-width: 100%; }
    .prose hr { border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 1.6em 0; }
  </style>
</head>
<body>
  <div id="header">
    <h1>Holocron AI Engineer</h1>
    <p>${stats.total} docs atômicos — gerado automaticamente</p>
  </div>
  <div id="stats">
    <div class="number">${stats.total}</div>
    <div>docs atômicos</div>
  </div>
  <div id="hint">Clique no título para ler o doc &nbsp;•&nbsp; Arraste para mover &nbsp;•&nbsp; Scroll = zoom &nbsp;•&nbsp; Clique nos nós para expandir</div>
<div class="markmap">
${frontmatter}${markdown}</div>
  <div id="viewer">
    <div id="viewer-topbar">
      <button id="btn-back">← Voltar ao mapa</button>
      <div style="min-width:0">
        <div id="viewer-title"></div>
        <div id="viewer-path"></div>
      </div>
    </div>
    <div id="viewer-scroll"><div id="viewer-body" class="prose"></div></div>
  </div>
<script>
window.markmap = { autoLoader: { toolbar: true } };
</script>
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18.12"></script>
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
<script>
window.HOLOCRON_DOCS = ${docsJson};
window.HOLOCRON_SLUGS = ${slugsJson};
</script>
<script>
(function () {
  var DOCS = window.HOLOCRON_DOCS || {};
  var SLUGS = window.HOLOCRON_SLUGS || {};
  var viewer = document.getElementById('viewer');
  var vTitle = document.getElementById('viewer-title');
  var vPath = document.getElementById('viewer-path');
  var vBody = document.getElementById('viewer-body');
  var vScroll = document.getElementById('viewer-scroll');

  function linkify(md) {
    var parts = md.split('[[');
    var out = parts[0];
    for (var i = 1; i < parts.length; i++) {
      var j = parts[i].indexOf(']]');
      if (j < 0) { out += '[[' + parts[i]; continue; }
      var slug = parts[i].slice(0, j).split('|')[0].trim();
      var rest = parts[i].slice(j + 2);
      var target = SLUGS[slug.toLowerCase()];
      out += (target && DOCS[target]) ? '[' + slug + '](#doc=' + target + ')' : '**' + slug + '**';
      out += rest;
    }
    return out;
  }

  function renderDoc(rel) {
    var d = DOCS[rel];
    if (!d) return false;
    vTitle.textContent = d.title;
    vPath.textContent = rel;
    var md = linkify(d.body);
    if (window.marked) vBody.innerHTML = window.marked.parse(md);
    else { vBody.innerHTML = ''; var pre = document.createElement('pre'); pre.textContent = md; vBody.appendChild(pre); }
    return true;
  }

  function openDoc(rel) {
    if (!renderDoc(rel)) return;
    viewer.classList.add('open');
    vScroll.scrollTop = 0;
    var h = '#doc=' + rel;
    if (location.hash !== h) location.hash = h;
  }

  function closeDoc() {
    if (!viewer.classList.contains('open')) return;
    viewer.classList.remove('open');
    if (location.hash.indexOf('#doc=') === 0) history.pushState(null, '', location.pathname + location.search);
  }

  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var a = e.target.closest('a[href^="#doc="]');
    if (a) { e.preventDefault(); openDoc(decodeURIComponent(a.getAttribute('href').slice(5))); }
  });
  document.getElementById('btn-back').addEventListener('click', closeDoc);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDoc(); });
  window.addEventListener('hashchange', function () {
    var m = location.hash.match(/^#doc=(.+)/);
    if (m) openDoc(decodeURIComponent(m[1]));
    else closeDoc();
  });
  var m0 = location.hash.match(/^#doc=(.+)/);
  if (m0) openDoc(decodeURIComponent(m0[1]));
})();
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
      } else if (item.endsWith('.md') && !item.startsWith('_') && !item.startsWith('MAPA') && !item.startsWith('MINDMAP') && !item.startsWith('PROMPT') && item !== 'mindmap.html') {
        files.push(fullPath);
      }
    }
  }
  
  walkDir(KG_DIR);
  console.log(`📁 Encontrados ${files.length} arquivos .md`);
  
  // Índice de docs: slug -> caminho (resolve Relações e links) + conteúdo p/ o leitor
  const entries = files.map(file => {
    const rel = path.relative(KG_DIR, file).split(path.sep).join('/');
    const content = fs.readFileSync(file, 'utf-8');
    return { file, rel, content };
  });
  const slugMap = {};
  const docTitles = {};
  const docsIndex = {};
  for (const e of entries) {
    const slug = path.basename(e.file, '.md').toLowerCase();
    if (!slugMap[slug]) slugMap[slug] = e.rel;
    const fm = parseFrontMatter(e.content);
    docTitles[e.rel] = cleanInline(fm.titulo || path.basename(e.file, '.md')) || path.basename(e.file, '.md');
    docsIndex[e.rel] = { title: docTitles[e.rel], raw: e.content, body: e.content.replace(/^---\n[\s\S]*?\n---\n?/, '') };
  }

  // Construir arvore
  const tree = buildTree(entries, slugMap, docTitles);
  
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
  
  // Gerar HTML (docs embutidos para o leitor interno)
  const docsJson = JSON.stringify(docsIndex).replace(/<\/script/gi, '<\\/script');
  const slugsJson = JSON.stringify(slugMap);
  const html = generateHTML(markdown, stats, docsJson, slugsJson);
  fs.writeFileSync(OUTPUT, html);
  
  console.log(`\n✅ Mindmap gerado: ${OUTPUT}`);
  console.log(`\n🚀 Para visualizar:`);
  console.log(`   open ${OUTPUT}`);
  console.log(`   ou`);
  console.log(`   npx serve docs/knowledge-graph`);
}

main();
