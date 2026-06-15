# Requirements Document

## Introduction

O AI Knowledge Graph é um mapa mental completo do mundo de IA, estruturado como um grafo navegável no Obsidian dentro do projeto Holocron. O nó central "IA" irradia para áreas principais (ML, Deep Learning, NLP, Computer Vision, etc.), que por sua vez conectam a ferramentas, implementações e tecnologias específicas.

O diferencial crítico: o grafo NÃO é gerado de uma vez. É construído iterativamente através de diálogos socráticos, onde cada nó é "conquistado" pelo usuário ao demonstrar compreensão do tema. O sistema apresenta, questiona, ouve e só então cristaliza o conhecimento em documento atômico.

## Glossary

- **Knowledge_Graph**: Estrutura de documentos Markdown interconectados via wikilinks `[[conceito]]`, formando um grafo navegável no Obsidian
- **Node**: Documento Markdown atômico representando um conceito, ferramenta ou área de IA no grafo
- **Central_Node**: Documento raiz "IA" que serve como ponto de entrada e índice do grafo completo
- **Ring**: Nível de profundidade no grafo — Ring 1 são áreas principais, Ring 2 são ferramentas/tecnologias específicas
- **Socratic_Session**: Interação iterativa entre o sistema e o usuário onde um tópico é apresentado, discutido e refinado antes de ser cristalizado em Node
- **Crystallization**: Ato de transformar o entendimento construído numa sessão socrática em um documento atômico permanente no grafo
- **Graph_Navigator**: Componente do sistema que determina qual próximo tópico apresentar ao usuário baseado no estado atual do grafo e no histórico de sessões
- **Exploration_State**: Registro de quais Nodes já foram explorados, quais estão pendentes e qual o nível de compreensão demonstrado pelo usuário
- **Holocron_MCP**: MCP Server do Holocron que expõe tools de busca semântica e tutor socrático

## Requirements

### Requirement 1: Estrutura do Grafo Central

**User Story:** Como estudante de IA, quero um documento central "IA" que sirva como ponto de entrada do grafo, para que eu possa navegar por todas as áreas e subáreas de Inteligência Artificial de forma estruturada.

#### Acceptance Criteria

1. THE Knowledge_Graph SHALL contain a Central_Node document at `docs/knowledge-graph/ia.md` with YAML front matter including titulo, tags, data, and ring fields
2. WHEN the Central_Node is created, THE Knowledge_Graph SHALL include wikilinks to all Ring 1 Nodes representing major AI areas
3. THE Central_Node SHALL organize Ring 1 links into categorized sections (Foundations, Learning Paradigms, Application Domains, Tools & Infrastructure)
4. WHEN a new Ring 1 Node is crystallized, THE Knowledge_Graph SHALL update the Central_Node to include a wikilink to the new Node

### Requirement 2: Estrutura de Nodes Atômicos

**User Story:** Como estudante de IA, quero que cada nó do grafo seja um documento completo e autocontido, para que eu possa entender qualquer conceito isoladamente e também ver suas conexões.

#### Acceptance Criteria

1. THE Knowledge_Graph SHALL store each Node as a Markdown file in `docs/knowledge-graph/` with kebab-case naming
2. EACH Node SHALL contain YAML front matter with: titulo, tags, fonte, confiabilidade, data, ring (1 or 2), area (parent area), and status (explored, pending, stub)
3. EACH Node SHALL include the following sections: O que é (explanation), Por que importa (relevance), Conceitos-chave (key concepts), Conexões (wikilinks to related Nodes), and Fontes (references)
4. WHEN a Node represents a tool or technology (Ring 2), THE Node SHALL additionally include sections: Casos de uso, Como começar, and Alternativas
5. THE Knowledge_Graph SHALL use wikilinks `[[node-name]]` for all cross-references between Nodes

### Requirement 3: Processo Socrático Iterativo

**User Story:** Como estudante de IA, quero que os tópicos do grafo sejam construídos através de diálogo socrático comigo, para que eu realmente internalize cada conceito antes de seguir adiante.

#### Acceptance Criteria

1. WHEN a new topic is initiated, THE Graph_Navigator SHALL present the topic with a contextual explanation followed by 2-3 guiding questions to probe the user's existing understanding
2. WHEN the user responds with their perspective, THE Graph_Navigator SHALL provide clarifying feedback, correct misconceptions, and introduce deeper aspects of the topic
3. WHEN the user demonstrates understanding of the core concept (through coherent responses), THE Graph_Navigator SHALL propose crystallizing the discussion into a Node document
4. THE Graph_Navigator SHALL NOT crystallize a Node until the user explicitly confirms readiness or demonstrates sufficient understanding through dialogue
5. IF the user expresses confusion or incorrect understanding, THEN THE Graph_Navigator SHALL rephrase the explanation using analogies and practical examples before proceeding

### Requirement 4: Navegação Inteligente do Grafo

**User Story:** Como estudante de IA, quero que o sistema sugira o próximo tópico a explorar baseado no que já aprendi, para que minha jornada de aprendizado siga uma progressão lógica.

#### Acceptance Criteria

1. WHEN a Socratic_Session concludes, THE Graph_Navigator SHALL suggest 2-3 next topics based on prerequisites and adjacency to the explored Node
2. THE Graph_Navigator SHALL prioritize Ring 1 Nodes before Ring 2 Nodes to ensure foundational understanding precedes tool-specific knowledge
3. WHEN suggesting next topics, THE Graph_Navigator SHALL explain why each suggestion is relevant given the user's current exploration path
4. THE Graph_Navigator SHALL allow the user to choose any suggested topic or request a different one entirely
5. WHILE the user has unexplored prerequisite Nodes, THE Graph_Navigator SHALL flag the dependency and recommend completing prerequisites first

### Requirement 5: Estado de Exploração Persistente

**User Story:** Como estudante de IA, quero que o sistema lembre quais tópicos já explorei e meu nível de compreensão, para que eu possa retomar de onde parei em sessões futuras.

#### Acceptance Criteria

1. THE Knowledge_Graph SHALL maintain an Exploration_State document at `docs/knowledge-graph/_estado-exploracao.md` tracking all Nodes and their status (explored, in-progress, pending, stub)
2. WHEN a Node is crystallized, THE Exploration_State SHALL update the Node's status to "explored" with the session date
3. WHEN a Socratic_Session is interrupted before crystallization, THE Exploration_State SHALL mark the Node as "in-progress" preserving context for resumption
4. THE Exploration_State SHALL include a progress summary showing percentage of Ring 1 and Ring 2 Nodes explored
5. WHEN the user starts a new session, THE Graph_Navigator SHALL consult the Exploration_State to determine the current position in the learning journey

### Requirement 6: Integração com Holocron Existente

**User Story:** Como estudante de IA, quero que o Knowledge Graph se integre com o conteúdo já existente no Holocron (curso, conceitos), para que eu não duplique informação e aproveite o que já estudei.

#### Acceptance Criteria

1. WHEN a Knowledge_Graph Node covers a topic already documented in `docs/conceitos/` or `docs/curso/`, THE Node SHALL include a wikilink to the existing document instead of duplicating content
2. THE Knowledge_Graph SHALL use the Holocron_MCP search_content tool to find existing related content before creating a new Node
3. WHEN existing Holocron content is found for a topic, THE Graph_Navigator SHALL present it during the Socratic_Session as prior context
4. THE Knowledge_Graph Nodes SHALL follow the same YAML front matter conventions as existing Holocron documents (titulo, tags, fonte, confiabilidade, data)
5. WHEN a Node references external sources, THE Node SHALL list them in the Fontes section with URLs and reliability classification

### Requirement 7: Geração do Mapa Visual

**User Story:** Como estudante de IA, quero visualizar o grafo como um mapa no Obsidian, para que eu tenha uma visão panorâmica de todo o ecossistema de IA e meu progresso nele.

#### Acceptance Criteria

1. THE Knowledge_Graph SHALL structure all Nodes with consistent wikilinks enabling Obsidian's native Graph View to render the knowledge map
2. THE Central_Node SHALL use tags and links that create a radial pattern visible in Obsidian Graph View with "IA" at the center
3. EACH Node SHALL include a `ring` field in front matter enabling filtering by depth level in the graph view
4. EACH Node SHALL include an `area` field in front matter enabling color-coding by AI domain in the graph view
5. THE Knowledge_Graph SHALL include a `docs/knowledge-graph/_index.md` document listing all Nodes organized by Ring and Area for quick reference

### Requirement 8: Conteúdo Rico por Nó

**User Story:** Como futuro AI Engineer, quero que cada nó contenha não só a explicação teórica mas também informações práticas (ferramentas, fontes, procedimentos), para que eu possa atuar em qualquer perspectiva de IA.

#### Acceptance Criteria

1. EACH Ring 1 Node SHALL include a section "Landscape de Ferramentas" listing the main tools and frameworks associated with that AI area
2. EACH Ring 1 Node SHALL include a section "Fontes para Aprofundamento" with curated links to papers, courses, documentation, and videos
3. EACH Ring 2 Node SHALL include a section "Quick Start" with a minimal practical example or setup instructions
4. EACH Node SHALL include a section "Conexões com o Mundo Real" describing real-world applications and industry use cases
5. WHEN a Node is crystallized, THE Graph_Navigator SHALL enrich it with information gathered during the Socratic_Session including the user's own insights and analogies

