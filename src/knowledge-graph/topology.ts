import type { GraphNode, ExplorationState, SuggestionEntry } from './types.js';

/**
 * Retorna nós adjacentes a um nó dado.
 * Adjacência é determinada por: mesma área, connections declaradas, ou prerequisitos compartilhados.
 */
export function getAdjacentNodes(slug: string, allNodes: GraphNode[]): GraphNode[] {
  const current = allNodes.find(n => n.slug === slug);
  if (!current) return [];

  const adjacentSlugs = new Set<string>();

  // 1. Connections declaradas no nó
  for (const conn of current.connections) {
    adjacentSlugs.add(conn);
  }

  // 2. Nós da mesma área (exceto o próprio)
  for (const node of allNodes) {
    if (node.slug !== slug && node.area === current.area) {
      adjacentSlugs.add(node.slug);
    }
  }

  // 3. Nós que listam este como connection
  for (const node of allNodes) {
    if (node.connections.includes(slug)) {
      adjacentSlugs.add(node.slug);
    }
  }

  adjacentSlugs.delete(slug);
  return allNodes.filter(n => adjacentSlugs.has(n.slug));
}

/**
 * Verifica se os prerequisitos de um nó estão satisfeitos (status = explored).
 */
export function checkPrerequisites(
  slug: string,
  allNodes: GraphNode[]
): { satisfied: boolean; missing: string[] } {
  const node = allNodes.find(n => n.slug === slug);
  if (!node) return { satisfied: true, missing: [] };
  if (node.prerequisitos.length === 0) return { satisfied: true, missing: [] };

  const missing: string[] = [];
  for (const prereq of node.prerequisitos) {
    const prereqNode = allNodes.find(n => n.slug === prereq);
    if (!prereqNode || prereqNode.status !== 'explored') {
      missing.push(prereq);
    }
  }

  return { satisfied: missing.length === 0, missing };
}


/**
 * Sugere próximos tópicos baseado na heurística:
 * 1. In-progress > pending (continuidade)
 * 2. Ring 1 > Ring 2 (fundamentos primeiro)
 * 3. Adjacentes ao último explorado (coerência)
 * 4. Sem prerequisites pendentes (viabilidade)
 */
export function suggestNextTopics(
  currentSlug: string | undefined,
  state: ExplorationState,
  allNodes: GraphNode[]
): SuggestionEntry[] {
  const suggestions: SuggestionEntry[] = [];
  const seen = new Set<string>();

  // 1. Prioridade máxima: nós in-progress (retomar)
  const inProgress = allNodes.filter(n => n.status === 'in-progress');
  for (const node of inProgress) {
    if (suggestions.length >= 3) break;
    suggestions.push({
      topic: node.slug,
      reason: `Continuar sessão interrompida sobre ${node.titulo}`,
      ring: node.ring,
      area: node.area,
    });
    seen.add(node.slug);
  }

  if (suggestions.length >= 3) return suggestions;

  // 2. Adjacentes ao nó atual (se fornecido)
  if (currentSlug) {
    const adjacent = getAdjacentNodes(currentSlug, allNodes);
    const pendingAdjacent = adjacent
      .filter(n => n.status === 'pending' && !seen.has(n.slug))
      .sort((a, b) => a.ring - b.ring); // Ring 1 primeiro

    for (const node of pendingAdjacent) {
      if (suggestions.length >= 3) break;
      const { satisfied, missing } = checkPrerequisites(node.slug, allNodes);
      if (!satisfied) continue; // pula se tem prerequisitos não satisfeitos

      suggestions.push({
        topic: node.slug,
        reason: `Adjacente a ${currentSlug} — ${node.titulo}`,
        ring: node.ring,
        area: node.area,
      });
      seen.add(node.slug);
    }
  }

  if (suggestions.length >= 3) return suggestions;

  // 3. Ring 1 pendentes sem prerequisites (fundamentos primeiro)
  const ring1Pending = allNodes
    .filter(n => n.ring === 1 && n.status === 'pending' && !seen.has(n.slug))
    .sort((a, b) => {
      // Prioriza áreas na ordem natural da taxonomia
      const areaOrder = ['foundations', 'learning-paradigms', 'application-domains',
        'architecture-models', 'engineering-infrastructure', 'agents-orchestration',
        'safety-ethics', 'tools-platforms'];
      return areaOrder.indexOf(a.area) - areaOrder.indexOf(b.area);
    });

  for (const node of ring1Pending) {
    if (suggestions.length >= 3) break;
    const { satisfied } = checkPrerequisites(node.slug, allNodes);
    if (!satisfied) continue;

    suggestions.push({
      topic: node.slug,
      reason: `Fundamento Ring 1 — ${node.titulo}`,
      ring: node.ring,
      area: node.area,
    });
    seen.add(node.slug);
  }

  if (suggestions.length >= 3) return suggestions;

  // 4. Ring 2 pendentes (se Ring 1 já está bem coberto)
  const ring2Pending = allNodes
    .filter(n => n.ring === 2 && n.status === 'pending' && !seen.has(n.slug));

  for (const node of ring2Pending) {
    if (suggestions.length >= 3) break;
    const { satisfied } = checkPrerequisites(node.slug, allNodes);
    if (!satisfied) continue;

    suggestions.push({
      topic: node.slug,
      reason: `Ferramenta/tecnologia — ${node.titulo}`,
      ring: node.ring,
      area: node.area,
    });
    seen.add(node.slug);
  }

  return suggestions;
}
