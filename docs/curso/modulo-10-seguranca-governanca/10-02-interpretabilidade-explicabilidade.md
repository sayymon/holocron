---
titulo: "Interpretabilidade e Explicabilidade"
modulo: 10
unidade: 2
tags: [xai, interpretabilidade, explicabilidade, shap, lime]
dificuldade: intermediario
fonte: "Curso Engenharia de IA Aplicada"
atualizado_em: 2026-05-22
confiabilidade: alta
---

# Interpretabilidade e Explicabilidade

## Definições

| Conceito | Significado |
|----------|-------------|
| **Interpretabilidade** | Capacidade humana de entender *como* o modelo funciona internamente |
| **Explicabilidade** | Capacidade de gerar explicações *post-hoc* sobre decisões específicas |

Modelos lineares são interpretáveis por natureza. [[llm]] e deep learning exigem técnicas de explicabilidade.

## Técnicas Principais

### Modelo-agnósticas

- **SHAP** (SHapley Additive exPlanations) — atribui contribuição de cada feature
- **LIME** (Local Interpretable Model-agnostic Explanations) — aproximação local linear
- **Anchors** — regras if-then que "ancoram" a predição

### Específicas para Deep Learning

- **Attention Visualization** — mapas de atenção em [[transformers]]
- **Grad-CAM** — gradientes para localização em imagens
- **Probing** — camadas intermediárias de LLMs

### Para LLMs e Agentes

- **Chain-of-Thought** — raciocínio explícito no output
- **Tool-use logging** — registrar quais ferramentas o agente usou e por quê
- **Confidence scores** — calibração de certeza

## Trade-offs

```
Interpretabilidade ←→ Performance
   (modelo simples)      (modelo complexo)
```

- Modelos mais interpretáveis tendem a ser menos performáticos
- A solução: usar modelos complexos + explicabilidade post-hoc
- Contexto define o equilíbrio (saúde exige mais explicabilidade que recomendação de filmes)

## Aplicação em Produção

1. **Model Cards** — documentar limitações e comportamento esperado
2. **Explanation API** — endpoint que retorna explicação junto com predição
3. **Dashboard de explicabilidade** — visualização para stakeholders não-técnicos
4. **Testes de sanidade** — validar que explicações fazem sentido semântico

## Conexões

- [[10-01-governanca-ia]] — explicabilidade é requisito de governança
- [[10-03-vieses-responsabilidade]] — explicabilidade revela vieses ocultos
- [[10-06-riscos-legal-regulatorio]] — GDPR exige "direito à explicação"
