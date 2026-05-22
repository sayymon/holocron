---
titulo: "Apresentação e Defesa Técnica"
modulo: 11
unidade: 5
tags: [capstone, apresentacao, defesa-tecnica, storytelling, demo]
dificuldade: avancado
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Apresentação e Defesa Técnica

## Estrutura da Apresentação (15-20 min)

| Bloco | Tempo | Conteúdo |
|-------|-------|----------|
| Problema | 2 min | Dor real, quem sofre, por que importa |
| Solução | 3 min | Como IA resolve, diferencial |
| Demo | 5 min | Fluxo principal funcionando ao vivo |
| Arquitetura | 3 min | Diagrama C4, decisões-chave |
| Resultados | 2 min | Métricas, aprendizados |
| Próximos passos | 2 min | Roadmap, limitações conhecidas |

## Demo Eficaz

### Preparação

- **Happy path** roteirizado e testado 3x
- **Fallback** gravado em vídeo (caso algo falhe ao vivo)
- **Dados seed** preparados para demonstrar valor
- **Cenário realista** (não "Hello World")

### Anti-padrões

- ❌ Mostrar código scrollando (ninguém lê)
- ❌ Demo sem narrativa ("e aqui eu clico...")
- ❌ Ignorar erros ao vivo (reconheça e siga)
- ❌ Exceder o tempo (respeite o cronômetro)

## Defesa Técnica

### Perguntas Esperadas

| Categoria | Exemplos |
|-----------|----------|
| Arquitetura | "Por que X e não Y?" "Como escala?" |
| IA/ML | "Como avalia qualidade do RAG?" "E hallucinations?" |
| Trade-offs | "O que sacrificou para entregar no prazo?" |
| Produção | "Como monitora?" "E se o LLM cair?" |
| Custos | "Quanto custa por usuário?" |

### Como Responder

1. **Reconheça** a pergunta ("Boa pergunta sobre...")
2. **Contextualize** a decisão ("Dado o escopo de MVP...")
3. **Justifique** com dados ("Escolhi X porque...")
4. **Admita** limitações ("Se tivesse mais tempo, faria...")

## Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Funcionalidade (funciona?) | 30% |
| Qualidade técnica (código, arquitetura) | 25% |
| Uso de IA (não-trivial, bem integrado) | 20% |
| Apresentação (clareza, demo, defesa) | 15% |
| Documentação (README, ADRs, API docs) | 10% |

## Conexões

- [[11-01-ideacao-arquitetura]] — arquitetura apresentada aqui
- [[11-04-frontend-implantacao]] — demo roda no deploy
- [[12-10-explicar-decisoes-tecnicas]] — skill de explicar decisões
- [[12-09-system-design-ia]] — system design na defesa
