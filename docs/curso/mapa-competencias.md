---
titulo: Mapa de Competências — Engenharia de IA Aplicada
modulo: meta
tags: [competencias, skills, objetivos-aprendizado, avaliacao]
fonte: Construído a partir da ementa e objetivos do curso
confiabilidade: derivado
---

# Mapa de Competências — Engenharia de IA Aplicada

> **Competências técnicas e comportamentais que o aluno deve internalizar ao longo dos 12 módulos do curso**

## 🎯 Objetivo Geral

Capacitar o aluno a **projetar, implementar, operar e evoluir sistemas de IA aplicada** em ambientes corporativos, com foco em:

- **Resolução de problemas reais** (não apenas teoria)
- **Deploy em produção** (não apenas POCs)
- **Arquitetura escalável** (não apenas scripts)
- **Governança e segurança** (não apenas features)

---

## 🧭 Estrutura do Mapa

Cada módulo do curso desenvolve competências específicas, organizadas em 4 dimensões:

| Dimensão | O que é |
| -------- | ------- |
| 🧠 **Técnica** | Conhecimento de ferramentas, frameworks, algoritmos |
| 🏗️ **Arquitetural** | Capacidade de projetar sistemas escaláveis e sustentáveis |
| 🚀 **Operacional** | Habilidade de colocar sistemas em produção e manter |
| 🧑‍💼 **Comportamental** | Soft skills, comunicação, gestão de projetos |

---

## 📚 Competências por Módulo

### Módulo 1: Fundamentos de IA

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Compreender os conceitos de ML, DL, NLP | Intermediário | Explica diferenças entre supervisionado/não-supervisionado/reforço |
| Identificar casos de uso viáveis para IA | Avançado | Propõe soluções de IA para problemas reais e justifica escolhas |
| Usar bibliotecas básicas (TensorFlow.js, scikit-learn) | Básico | Treina um modelo simples e avalia métricas |
| Entender embeddings e representações vetoriais | Intermediário | Explica como embeddings funcionam e quando usar |

#### 🏗️ Competências Arquiteturais

- Diferenciar modelos locais vs. APIs de IA
- Entender trade-offs entre custo, latência e qualidade

#### 🧑‍💼 Competências Comportamentais

- Comunicar valor de IA para stakeholders não-técnicos
- Identificar problemas que NÃO devem ser resolvidos com IA

---

### Módulo 2: APIs de IA & Prompt Engineering

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Integrar múltiplos provedores de LLM (OpenAI, Anthropic, Google) | Avançado | Implementa fallback e roteamento entre providers |
| Criar prompts estruturados e eficazes | Avançado | Aplica técnicas de few-shot, chain-of-thought |
| Usar prompt templates e variáveis | Intermediário | Cria templates reutilizáveis para casos comuns |
| Implementar caching de prompts | Intermediário | Reduz custos com caching inteligente |
| Avaliar qualidade de respostas de LLMs | Avançado | Define métricas e testes para outputs |

#### 🏗️ Competências Arquiteturais

- Projetar arquitetura multi-provider (vendor lock-in)
- Implementar rate limiting e retry strategies
- Gerenciar custos de APIs de IA

#### 🚀 Competências Operacionais

- Monitorar uso de tokens e custos
- Configurar alertas para falhas de API

---

### Módulo 3: Model Context Protocol (MCP)

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Criar MCP servers em TypeScript/JavaScript | Avançado | Implementa server customizado com recursos e prompts |
| Integrar MCP servers em IDEs (Claude Code, Cursor) | Intermediário | Configura e usa MCPs em fluxo de desenvolvimento |
| Expor APIs internas como contexto para LLMs | Avançado | Cria MCP que conecta LLM a sistemas internos |
| Entender segurança e governança em MCPs | Intermediário | Implementa autenticação e rate limiting |

#### 🏗️ Competências Arquiteturais

- Projetar MCPs modulares e reutilizáveis
- Decidir quando usar MCP vs. Tools vs. RAG

#### 🧑‍💼 Competências Comportamentais

- Documentar MCPs para outros desenvolvedores
- Evangelizar uso de MCPs na empresa

---

### Módulo 4: Agentes de IA

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Implementar agentes ReAct | Avançado | Cria agente que planeja, age e observa iterativamente |
| Criar sistemas multi-agent | Avançado | Orquestra múltiplos agentes especializados |
| Implementar memória de curto e longo prazo | Avançado | Usa buffers, vetores e bancos para memória |
| Usar LangGraph para workflows agentic | Avançado | Cria grafos complexos com branching e loops |
| Implementar tool use e function calling | Avançado | Conecta agentes a APIs externas e ferramentas |

#### 🏗️ Competências Arquiteturais

- Projetar arquitetura de agentes escalável
- Decidir quando usar single-agent vs. multi-agent
- Implementar fallbacks e error handling em agentes

#### 🚀 Competências Operacionais

- Monitorar comportamento de agentes em produção
- Debugar loops infinitos e falhas de raciocínio

---

### Módulo 5: UX/UI para Aplicações de IA

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Criar interfaces conversacionais | Intermediário | Implementa chat UI com React/Next.js |
| Implementar streaming de respostas | Avançado | UI atualiza em tempo real conforme LLM gera texto |
| Gerenciar estado de conversas | Intermediário | Usa context e state management para histórico |
| Feedback visual para ações de IA | Intermediário | Loading states, skeletons, progress indicators |

#### 🏗️ Competências Arquiteturais

- Projetar fluxos conversacionais complexos
- Decidir entre chat, formulários e interfaces híbridas

#### 🧑‍💼 Competências Comportamentais

- Testar UX com usuários reais
- Iterar com base em feedback

---

### Módulo 6: DevOps para IA

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Containerizar aplicações de IA (Docker) | Avançado | Cria Dockerfiles otimizados para modelos |
| Orquestrar containers (Kubernetes) | Intermediário | Deploya aplicação de IA em cluster K8s |
| Implementar CI/CD para IA | Avançado | Pipeline automatizado com testes e deploy |
| Usar IaC (Terraform, Pulumi) | Intermediário | Provisiona infra com código |
| Monitorar aplicações (Prometheus, Grafana) | Intermediário | Configura dashboards e alertas |

#### 🏗️ Competências Arquiteturais

- Projetar pipelines de deploy resilientes
- Implementar blue-green deployment e canary releases

#### 🚀 Competências Operacionais

- Troubleshooting em produção
- Gerenciar secrets e configurações sensíveis

---

### Módulo 7: Gestão de Projetos de IA

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Definir métricas de sucesso para projetos de IA | Avançado | Estabelece KPIs técnicos e de negócio |
| Estimar esforço e complexidade | Intermediário | Usa story points e planning poker |
| Gerenciar backlog de features de IA | Intermediário | Prioriza com base em valor vs. esforço |

#### 🧑‍💼 Competências Comportamentais

- Comunicar status para stakeholders
- Negociar prazos e escopo
- Gerenciar expectativas sobre IA ("não é mágica")

---

### Módulo 8: Arquitetura de Sistemas de IA

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Projetar arquitetura RAG escalável | Avançado | Define chunking, embeddings, retrieval, reranking |
| Implementar vector databases (pgvector, Pinecone) | Avançado | Otimiza queries vetoriais e indexação |
| Projetar pipelines de dados para IA | Avançado | ETL/ELT para alimentar modelos |
| Decidir trade-offs arquiteturais | Avançado | Latência vs. custo, acurácia vs. throughput |

#### 🏗️ Competências Arquiteturais

- Criar ADRs (Architecture Decision Records)
- Projetar para falhas (circuit breakers, retries)
- Implementar observability (traces, logs, metrics)

---

### Módulo 9: Fine-tuning e Modelos Customizados

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Preparar datasets para fine-tuning | Avançado | Curadoria, limpeza, formatação (JSONL) |
| Fazer fine-tuning de LLMs (OpenAI, Anthropic) | Intermediário | Treina modelo customizado via API |
| Avaliar qualidade de modelo fine-tuned | Avançado | Compara baseline vs. fine-tuned com métricas |
| Decidir quando fazer fine-tuning vs. RAG | Avançado | Trade-offs entre custo, tempo, acurácia |

#### 🏗️ Competências Arquiteturais

- Versionamento de modelos e datasets
- Pipeline de retreinamento contínuo

---

### Módulo 10: Segurança e Governança

#### 🧠 Competências Técnicas

| Competência | Nível Esperado | Como avaliar |
| ----------- | -------------- | ------------ |
| Implementar guardrails para LLMs | Avançado | Valida inputs e outputs, filtra conteúdo sensível |
| Prevenir prompt injection | Avançado | Testes de segurança e sanitização |
| Implementar rate limiting e quotas | Intermediário | Proteção contra abuso |
| Auditar uso de IA (logs, traces) | Intermediário | Rastreabilidade de decisões |

#### 🏗️ Competências Arquiteturais

- Projetar para compliance (LGPD, GDPR)
- Implementar controle de acesso granular

#### 🧑‍💼 Competências Comportamentais

- Comunicar riscos de IA para líderes
- Criar políticas de uso ético de IA

---

### Módulo 11: Capstone Project

#### 🎯 Objetivo

Aplicar **TODAS** as competências dos módulos anteriores em um projeto completo.

#### 🏆 Entregáveis esperados

- Sistema de IA completo (backend + frontend)
- Deploy em produção (cloud)
- Documentação técnica e ADRs
- Apresentação para stakeholders

---

### Módulo 12: Carreira e Mercado

#### 🧑‍💼 Competências Comportamentais

- Construir portfolio técnico
- Networking em comunidades de IA
- Preparação para entrevistas técnicas
- Negociação salarial
- Personal branding (LinkedIn, GitHub)

---

## 🎓 Níveis de Proficiência

### Básico (Iniciante)

- Conhece conceitos fundamentais
- Executa tarefas com supervisão
- Reproduz exemplos e tutoriais

### Intermediário

- Aplica conceitos em problemas novos
- Trabalha de forma autônoma
- Adapta soluções existentes

### Avançado (Profissional)

- Projeta soluções do zero
- Toma decisões arquiteturais
- Ensina e mentora outros
- Contribui para comunidades e open source

---

## 📊 Matriz de Avaliação de Competências

### Como o Holocron avalia seu progresso

| Método | Descrição |
| ------ | --------- |
| 🧪 **Quizzes adaptativos** | Perguntas ajustadas ao seu nível detectado |
| 💬 **Conversas socráticas** | Holocron questiona seu raciocínio, não apenas respostas |
| 🛠️ **Projetos práticos** | Implementações avaliadas por critérios técnicos |
| 🔍 **Code review** | Feedback sobre código submetido |
| 📊 **Auto-avaliação** | Reflexão guiada sobre gaps de conhecimento |

---

## 🎯 Golden-Sets de Respostas

### O que são?

Conjuntos de **respostas esperadas** para perguntas-chave de cada módulo, usados para:

- ✅ Testar o Holocron (RAG retrieval quality)
- ✅ Avaliar compreensão do aluno
- ✅ Calibrar dificuldade de quizzes

Veja [[golden-sets]] para exemplos completos.

---

## 🔗 Relação com o Holocron

O mapa de competências guia:

1. **Geração de conteúdo** — docs atômicos para cada competência
2. **Avaliação do aluno** — quizzes e simulações baseadas no mapa
3. **Recomendações** — próximos passos baseados em gaps detectados
4. **RAG retrieval** — buscas contextualizadas pelo nível do aluno

---

## 📚 Referências

- Ementa do curso: https://unipds.com.br/org-pos-ia/
- Bloom's Taxonomy (níveis de aprendizado)
- Framework de competências ACM/IEEE para Computer Science
