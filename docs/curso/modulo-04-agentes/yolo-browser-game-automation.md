---
titulo: "YOLO no Browser — Automatizando Jogos com Computer Vision"
modulo: 04
unidade: "Como Vencer Qualquer Jogo PT01"
tags: [yolo, tensorflow-js, computer-vision, web-worker, canvas, pixi-js, pytorch, coco-dataset]
fonte: "Aula Erick Wendel — Engenharia de IA Aplicada"
confiabilidade: alta
professor: Erick Wendel
contribuicao: Hugo Zarini
projeto: "https://github.com/ErickWendel/DuckHunt-JS/tree/ml-self-play-template"
data: 2026-06-04
---

# YOLO no Browser — Automatizando Jogos com Computer Vision

## Contexto

O modelo **YOLO (You Only Look Once)** é uma arquitetura de detecção de objetos em tempo real que faz predição em um único passo pela rede neural. Originalmente implementado em **Python + PyTorch**, pode ser convertido e executado diretamente no navegador via **TensorFlow.js**.

Hugo Zarini contribuiu com o Erick Wendel no trabalho com esse modelo para automação de jogos no browser.

## O que é o YOLO

Modelos anteriores (R-CNN, Fast R-CNN) faziam detecção em múltiplos passos:
1. Propor regiões de interesse na imagem
2. Classificar cada região individualmente

O YOLO revolucionou isso:
- Divide a imagem em uma **grid**
- Em **um único forward pass** prediz bounding boxes + classes para todas as células
- Resultado: velocidade de tempo real (45+ FPS na versão original)

### Trade-offs
| Vantagem | Desvantagem |
|----------|-------------|
| Velocidade absurda (real-time) | Menos preciso em objetos muito pequenos |
| Single-shot (um passo) | Objetos muito próximos podem se confundir |
| Leve (nano = ~4MB) | Precisa de GPU (WebGL) para performance ideal |

### Evolução
- YOLOv1 (2015, Joseph Redmon) → conceito original
- YOLOv2/v3 → melhorias em multi-scale detection
- YOLOv4-v8 → comunidade open-source (Ultralytics)
- YOLOv5n (nano) → versão usada neste projeto, otimizada para edge/browser

## Arquitetura do Projeto DuckHunt-JS + YOLO

```
┌─────────────────────────────────────────────────────┐
│                    GAME LOOP                         │
│                                                     │
│  1. Canvas do jogo (PixiJS) renderiza os patos      │
│  2. A cada 200ms, captura screenshot do canvas      │
│  3. Envia a imagem pro Web Worker                   │
│  4. Worker roda YOLO → detecta "kite" (pato)        │
│  5. Retorna coordenadas (x, y) do centro do alvo   │
│  6. Simula um clique nessa posição                  │
│  7. Jogo registra o "tiro" → pato morre             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Estrutura de Arquivos

```
machine-learning/
├── main.js              ← Orquestrador (captura canvas + simula clique)
├── worker.js            ← Web Worker (YOLO inference em thread separada)
├── layout.js            ← HUD de debug (mostra score e coordenadas)
└── yolov5n_web_model/
    ├── model.json       ← Arquitetura do modelo (GraphModel format)
    ├── group1-shard1of2.bin  ← Pesos (parte 1)
    ├── group1-shard2of2.bin  ← Pesos (parte 2)
    └── labels.json      ← 80 classes do dataset COCO
```

## Os 3 Arquivos Explicados

### `main.js` — O Orquestrador

```javascript
// Esconde mira humana — a IA joga sozinha
game.stage.aim.visible = false;

// Cria Web Worker (thread separada para não travar o jogo)
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

// A cada 200ms captura o canvas e envia pro worker
setInterval(async () => {
    const canvas = game.app.renderer.extract.canvas(game.stage);
    const bitmap = await createImageBitmap(canvas);
    worker.postMessage({ type: 'predict', image: bitmap }, [bitmap]);
}, 200);

// Quando worker retorna predição, simula clique na coordenada
worker.onmessage = ({ data }) => {
    if (data.type === 'prediction') {
        game.stage.aim.setPosition(data.x, data.y);
        game.handleClick({ global: game.stage.aim.getGlobalPosition() });
    }
};
```

### `worker.js` — O Cérebro (Pipeline YOLO)

Pipeline de inference completo:

1. **Carrega modelo** → `tf.loadGraphModel('model.json')`
2. **Warmup** → executa inferência fake para compilar kernels WebGL
3. **Pré-processamento** → resize 640x640, normaliza [0,1], adiciona batch dim
4. **Inference** → `model.executeAsync(tensor)` → boxes + scores + classes
5. **Pós-processamento** → filtra score > 0.4, filtra label = "kite"
6. **Retorna** centro (x, y) do bounding box

Conceitos importantes no worker:
- **`tf.tidy()`** — evita memory leak de tensores temporários
- **`tf.dispose()`** — libera tensores manualmente após uso
- **`function*` (generator)** — processa predições em streaming
- **`CLASS_THRESHOLD = 0.4`** — aceita 40%+ de confiança

### `labels.json` — O Dicionário

As **80 classes do dataset COCO** que o YOLOv5n pré-treinado reconhece. O modelo usa a classe **"kite"** (pipa) para detectar patos do DuckHunt — transfer learning implícito sem retreinar.

## Como o Webpack Funciona Aqui

```
npm start
  → webpack-dev-server (definido em package.json scripts)
    → lê webpack.config.js
      → resolve entry point (main.js)
        → empacota todo o grafo de dependências
          → transpila com babel (ES2015+ → compatível)
            → serve via localhost com hot-reload
```

O webpack é apenas o **bundler** — empacota o código JS do jogo. O TensorFlow.js é carregado via CDN diretamente no worker (`importScripts`), não passa pelo webpack.

## Portabilidade: PyTorch → Browser

| Etapa | Ferramenta | Formato |
|-------|-----------|---------|
| Treino | Python + PyTorch | `.pt` (pesos PyTorch) |
| Conversão | Ultralytics export | ONNX → SavedModel → TF.js |
| Inference | TensorFlow.js | `model.json` + `.bin` shards |
| Backend runtime | WebGL / WebGPU | GPU do usuário |

Comando de export:
```bash
yolo export model=yolov5n.pt format=tfjs
```

## Como Reproduzir para Qualquer Jogo

### Passo 1: Identifique o alvo nas labels COCO

| Jogo | Alvo | Label COCO provável |
|------|------|---------------------|
| DuckHunt | Patos | `kite` |
| Fruit Ninja | Frutas | `banana`, `apple`, `orange` |
| Space Invaders | Naves | `airplane` |
| Jogos com bola | Bola | `sports ball` |

### Passo 2: Se não tem label compatível → Treine custom

1. Colete screenshots do jogo (automatize com canvas capture)
2. Anote com [Roboflow](https://roboflow.com) ou LabelImg
3. Treine: `python train.py --data custom.yaml`
4. Exporte: `yolo export model=best.pt format=tfjs`

### Passo 3: Adapte o filtro no worker

```javascript
// Mude o label filtrado:
if (label !== 'SEU_ALVO') continue;
```

### Passo 4: Para jogos que NÃO são seus

```javascript
// Captura canvas de qualquer jogo no browser
const canvas = document.querySelector('canvas');
const bitmap = await createImageBitmap(canvas);

// Simula input (click, move, keypress)
canvas.dispatchEvent(new MouseEvent('click', {
    clientX: rect.left + predictedX,
    clientY: rect.top + predictedY,
    bubbles: true
}));
```

### Limitações por cenário

| Cenário | Funciona? | Como |
|---------|-----------|------|
| Jogo em canvas com código-fonte | ✅ Direto | Injeta ML no mesmo processo |
| Jogo em canvas sem código-fonte | ✅ Com extensão | Captura canvas + dispatchEvent |
| Jogo em DOM (não canvas) | ⚠️ Parcial | Melhor usar DOM selectors direto |
| Jogo em iframe cross-origin | ❌ Difícil | Bloqueio de segurança do browser |
| Jogo nativo (não web) | ❌ Outra abordagem | Precisa captura de tela do SO |

## Conceitos-Chave

| Conceito | Aplicação no Projeto |
|----------|---------------------|
| **Web Worker** | Inference em thread separada (não trava UI/jogo) |
| **tf.tidy()** | Garbage collection de tensores (evita memory leak) |
| **Warmup** | Primeira inference é lenta (compila kernels WebGL) |
| **COCO dataset** | 80 classes genéricas — bom baseline |
| **Threshold** | Confiança mínima para aceitar detecção |
| **Generator** | Processa predições em streaming |
| **Transfer learning** | Reaproveitar modelo sem retreinar |
| **ImageBitmap** | Formato eficiente para transferir imagem entre threads |
| **Transferable objects** | `[bitmap]` no postMessage — zero-copy transfer |

## Alternativas ao YOLO para Detecção em Jogos

Nem sempre precisa de um modelo pesado:

| Técnica | Quando usar |
|---------|-------------|
| YOLO (ML) | Alvo complexo, varia de forma/posição |
| Template matching | Sprite fixo, posição variável |
| Detecção por cor (HSV) | Alvo tem cor única e distinta |
| `getImageData` + filtro | Cenários muito simples |

## Referências

- [DuckHunt-JS template](https://github.com/ErickWendel/DuckHunt-JS/tree/ml-self-play-template)
- [DuckHunt-JS solução](https://github.com/ErickWendel/DuckHunt-JS/tree/ml-self-play)
- [Hugo Zarini — LinkedIn](https://www.linkedin.com/in/hugozanini/)
- [Real-time SKU Detection in Browser (TF Blog)](https://blog.tensorflow.org/2022/05/real-time-sku-detection-in-browser.html)
- [Training YOLOv7 + Running in Browser (Medium)](https://medium.com/data-science/training-a-custom-yolov7-in-pytorch-and-running-it-directly-in-the-browser-with-tensorflow-js-96a5ecd7a530)
- [COCO Pretrained Models (Ultralytics)](https://docs.ultralytics.com/datasets/detect/coco/#coco-pretrained-models)
- [YOLOv5 (GitHub)](https://github.com/ultralytics/yolov5)
- [Ultralytics TF.js Integration](https://docs.ultralytics.com/integrations/tfjs/)
- [DuckHunt-JS Original (MattSurabian)](https://github.com/MattSurabian/DuckHunt-JS)
- [PixiJS](https://pixijs.com/)
- [Keyword `using` — Explicit Resource Management](https://dev.to/zacharylee/explicit-resource-management-in-js-the-using-keyword-d9f)
- [Can I Use — `using`](https://caniuse.com/?search=using)
