# Implementation Plan: AI Knowledge Graph

## Overview

Implementação incremental do Knowledge Graph para o Holocron, adicionando um grafo de conhecimento navegável sobre IA construído via diálogo socrático. A implementação segue a arquitetura existente (MCP tools + LangGraph agents + file-based content) e adiciona novos módulos em `src/knowledge-graph/`, um novo agente em `src/agents/graph-navigator.ts`, e novas MCP tools em `src/mcp/graph-tools.ts`.

## Tasks

- [x] 1. Definir tipos e interfaces do Knowledge Graph
  - [x] 1.1 Criar `src/knowledge-graph/types.ts` com todas as interfaces
    - Implementar `GraphNode`, `ExplorationState`, `SessionEntry`, `SuggestionEntry`, `GraphArea`, `CreateNodeInput`
    - Incluir tipos para front matter YAML dos nodes
    - Definir constantes para áreas e taxonomia Ring 1
    - _Requirements: 2.2, 2.3, 5.1, 7.3, 7.4_

  - [x] 1.2 Criar `src/knowledge-graph/index.ts` com re-exports
    - Barrel file exportando todas as interfaces e funções públicas dos submódulos
    - _Requirements: 2.1_

- [x] 2. Implementar Graph Reader
  - [x] 2.1 Criar `src/knowledge-graph/graph-reader.ts`
    - Implementar `getAllNodes()` — glob `docs/knowledge-graph/*.md`, exclui `_` prefixed, parseia front matter com gray-matter
    - Implementar `getNodeBySlug(slug)` — busca nó específico por slug
    - Implementar `getNodesByArea(area)` — filtra por campo `area` do front matter
    - Implementar `getNodesByStatus(status)` — filtra por campo `status`
    - Tratar front matter inválido com log de warning (skip nó, não crash)
    - _Requirements: 2.1, 2.2, 7.3, 7.4, 7.5_

  - [ ]* 2.2 Escrever testes unitários para graph-reader
    - Testar parsing de front matter válido e inválido
    - Testar filtragem por ring, area, status
    - Testar exclusão de arquivos com prefixo `_`
    - Usar fixtures de Markdown com gray-matter
    - _Requirements: 2.1, 2.2_

- [x] 3. Implementar Graph Writer
  - [x] 3.1 Criar `src/knowledge-graph/graph-writer.ts`
    - Implementar `createNode(data: CreateNodeInput)` — gera Markdown com front matter YAML + seções estruturadas (Ring 1 vs Ring 2)
    - Implementar `updateCentralNode(newNodeSlug, area)` — adiciona wikilink a `ia.md` na seção correta
    - Implementar `updateIndex()` — regenera `_index.md` organizando nós por Ring e Area
    - Garantir idempotência: criar mesmo nó 2x sobrescreve (não duplica)
    - Criar diretório `docs/knowledge-graph/` se não existir (auto-bootstrap)
    - _Requirements: 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 7.5, 8.1, 8.2, 8.3, 8.4_

  - [ ]* 3.2 Escrever property test para createNode
    - **Property 4: Front matter compliance**
    - Todo nó criado via `createNode` garante todos os campos obrigatórios (titulo, tags, ring, area, status, data)
    - **Validates: Requirements 2.2, 6.4**

  - [ ]* 3.3 Escrever property test para idempotência
    - **Property 1: Idempotência de crystallize**
    - Cristalizar o mesmo tópico 2x resulta em exatamente 1 arquivo no filesystem
    - **Validates: Requirements 2.1, 5.2**

  - [ ]* 3.4 Escrever testes unitários para graph-writer
    - Testar geração de Markdown para Ring 1 e Ring 2 (seções diferentes)
    - Testar atualização de `ia.md` com novo wikilink
    - Testar regeneração de `_index.md`
    - _Requirements: 1.2, 2.3, 2.4_

- [x] 4. Implementar State Manager
  - [x] 4.1 Criar `src/knowledge-graph/state-manager.ts`
    - Implementar `readExplorationState()` — lê e parseia `_estado-exploracao.md`, bootstrap se não existir
    - Implementar `markNodeExplored(slug)` — atualiza status + data da sessão
    - Implementar `markNodeInProgress(slug)` — marca sessão interrompida
    - Implementar `addSessionEntry(entry)` — registra sessão no histórico
    - Implementar `updateSuggestions(suggestions)` — atualiza próximos sugeridos
    - Recalcular progresso (Ring 1 %, Ring 2 %, Total) a partir do glob real
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 4.2 Escrever property test para consistência de estado
    - **Property 2: Consistência de estado**
    - Estado recalculado a partir dos arquivos reais no glob é sempre consistente com o filesystem
    - **Validates: Requirements 5.1, 5.4**

  - [ ]* 4.3 Escrever testes unitários para state-manager
    - Testar bootstrap (cria arquivo vazio quando não existe)
    - Testar markNodeExplored atualiza status e data
    - Testar recálculo de progresso
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 5. Checkpoint - Validar camada de dados
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implementar Topology
  - [x] 6.1 Criar `src/knowledge-graph/topology.ts`
    - Implementar `getAdjacentNodes(slug, allNodes)` — usa campo `connections` e `area` para determinar adjacência
    - Implementar `checkPrerequisites(slug, allNodes)` — verifica se prerequisitos estão "explored"
    - Implementar `suggestNextTopics(currentSlug, state, allNodes)` — heurística: in-progress > pending, Ring 1 > Ring 2, adjacentes ao último, sem prerequisites pendentes
    - _Requirements: 4.1, 4.2, 4.3, 4.5_

  - [ ]* 6.2 Escrever property test para Ring hierarchy
    - **Property 5: Ring hierarchy**
    - Ring 2 nodes SEMPRE têm um parent Ring 1 no campo `area` que existe no grafo
    - **Validates: Requirements 1.3, 7.3, 7.4**

  - [ ]* 6.3 Escrever testes unitários para topology
    - Testar heurística de sugestões (prioridade Ring 1 > Ring 2)
    - Testar detecção de prerequisites não satisfeitos
    - Testar adjacência baseada em connections
    - _Requirements: 4.1, 4.2, 4.5_

- [x] 7. Implementar Graph Navigator Agent
  - [x] 7.1 Criar `src/agents/graph-navigator.ts` com StateGraph LangGraph
    - Definir `GraphNavigatorState` com Annotation.Root (topic, userMessage, explorationState, existingContent, relatedNodes, explanation, questions, suggestions, readyToCrystallize)
    - Implementar nó `loadState` — lê exploration state via state-manager
    - Implementar nó `findContext` — busca conteúdo existente via `hybridSearch` do RAG pipeline
    - Implementar nó `presentTopic` — gera explicação socrática + 2-3 perguntas guia via LLM
    - Implementar nó `suggestNext` — analisa topologia e sugere próximos tópicos
    - Montar grafo: START → loadState → findContext → presentTopic → suggestNext → END
    - Exportar `runGraphNavigator(topic, userContext?)` seguindo padrão do `runTutor`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.3, 5.5, 6.1, 6.2, 6.3_

  - [ ]* 7.2 Escrever testes unitários para graph-navigator
    - Testar que loadState retorna estado válido (ou bootstrap)
    - Testar que presentTopic gera explicação + perguntas
    - Mock de LLM e hybridSearch
    - _Requirements: 3.1, 5.5_

- [x] 8. Implementar MCP Graph Tools
  - [x] 8.1 Criar `src/mcp/graph-tools.ts` com `registerGraphTools(server)`
    - Implementar `explore_topic` — async (createTask + runGraphNavigator), retorna task_id
    - Implementar `crystallize_node` — sync, chama createNode + markNodeExplored + updateCentralNode + updateIndex
    - Implementar `get_exploration_state` — sync, chama readExplorationState
    - Implementar `suggest_next_topics` — sync, chama getAllNodes + suggestNextTopics
    - Implementar `list_graph_nodes` — sync, chama getAllNodes com filtro por status/area
    - Validação de input com Zod para cada tool
    - _Requirements: 1.4, 2.1, 3.1, 4.1, 5.1, 5.2, 5.4, 6.2, 8.5_

  - [x] 8.2 Registrar graph tools no MCP server principal
    - Importar `registerGraphTools` em `src/mcp/tools.ts` (ou no entrypoint do server)
    - Chamar `registerGraphTools(server)` após as tools existentes
    - _Requirements: 6.1_

  - [ ]* 8.3 Escrever testes unitários para graph-tools
    - Testar que explore_topic retorna task_id
    - Testar que crystallize_node cria arquivo + atualiza estado
    - Testar que list_graph_nodes filtra corretamente
    - _Requirements: 2.1, 5.2_

- [ ] 9. Checkpoint - Validar integração MCP + Agent
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Criar conteúdo base do Knowledge Graph
  - [x] 10.1 Criar `docs/knowledge-graph/ia.md` (Central Node)
    - Front matter: titulo, tags, data, ring: 0, area: central, status: explored
    - Estrutura com seções categorizadas (Foundations, Learning Paradigms, Application Domains, Architecture & Models, Engineering & Infrastructure, Agents & Orchestration, Safety & Ethics, Tools & Platforms)
    - Wikilinks para todos os Ring 1 nodes planejados (como stubs)
    - _Requirements: 1.1, 1.2, 1.3, 7.1, 7.2_

  - [x] 10.2 Criar `docs/knowledge-graph/_estado-exploracao.md` (bootstrap)
    - Front matter com contadores iniciais (explored: 0, in_progress: 0, pending: N)
    - Tabela de progresso Ring 1 / Ring 2
    - Seção "Últimas Sessões" vazia
    - Seção "Próximos Sugeridos" com primeiros 3 tópicos recomendados
    - _Requirements: 5.1, 5.4_

  - [x] 10.3 Criar `docs/knowledge-graph/_index.md` (índice por Ring/Area)
    - Listar todos os nodes planejados organizados por Ring e Area
    - Status de cada node (pending para todos inicialmente)
    - _Requirements: 7.5_

- [x] 11. Wiring final e validação end-to-end
  - [x] 11.1 Atualizar `src/knowledge-graph/index.ts` com todos os exports finais
    - Garantir que todas as funções públicas estão exportadas corretamente
    - Validar que imports entre módulos usam paths ESM com `.js` extension
    - _Requirements: 2.1, 6.1_

  - [ ]* 11.2 Escrever testes de integração end-to-end
    - Testar fluxo completo: explore_topic → crystallize_node → get_exploration_state (estado atualizado)
    - Testar que crystallize cria arquivo + atualiza ia.md + atualiza _index.md + atualiza _estado
    - Testar bootstrap: primeiro acesso cria `_estado-exploracao.md` válido
    - **Property 6: No orphan nodes** — todo nó criado aparece em `_index.md` e é referenciado por pelo menos 1 outro nó
    - **Validates: Requirements 1.4, 7.5**
    - _Requirements: 1.4, 5.2, 7.5_

- [ ] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- O projeto usa ESM — todos os imports devem usar extensão `.js` (ex: `import { foo } from './bar.js'`)
- Seguir padrão existente do `src/agents/tutor.ts` para o Graph Navigator Agent
- Seguir padrão existente do `src/mcp/tools.ts` para registration das novas tools
- Seguir padrão async do `src/mcp/task-store.ts` para `explore_topic`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "4.1", "10.1", "10.2", "10.3"] },
    { "id": 2, "tasks": ["2.2", "3.1", "4.2", "4.3"] },
    { "id": 3, "tasks": ["3.2", "3.3", "3.4", "6.1"] },
    { "id": 4, "tasks": ["6.2", "6.3", "7.1"] },
    { "id": 5, "tasks": ["7.2", "8.1"] },
    { "id": 6, "tasks": ["8.2", "8.3"] },
    { "id": 7, "tasks": ["11.1", "11.2"] }
  ]
}
```
