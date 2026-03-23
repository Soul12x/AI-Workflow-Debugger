# 🏗️ Arquitectura de la Aplicación

## 📊 Diagrama General

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cliente (Frontend)                        │
│                     React 18 + TypeScript                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │  InputPanel  │   │  ResultsPanel│   │HistoryPanel │        │
│  │  (textarea)  │   │  (análisis)  │   │  (historial)│        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
│         │                  ▲                                      │
│         └──────────────────┼──────────────┬────────────┘         │
│                            │              │                      │
│                      ┌─────▼──────────────▼─────┐               │
│                      │   Zustand Store          │               │
│                      │  (Estado Global)         │               │
│                      └─────┬──────────────┬─────┘               │
│                            │              │                      │
│                    ┌───────▼──┐   ┌──────▼────────┐             │
│                    │ setInput  │   │   setOutput    │             │
│                    │setLoading │   │  addToHistory  │             │
│                    │ setError  │   │   setError     │             │
│                    └───────┬──┘   └──────┬────────┘             │
│                            │              │                      │
│                    ┌───────▼──────────────▼─────┐               │
│                    │   API Client (axios)       │               │
│                    │  POST /analyze             │               │
│                    │  GET /health               │               │
│                    └───────┬──────────────────┘               │
└────────────────────────────┼────────────────────────────────────┘
                             │ HTTP JSON
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    Servidor (Backend)                            │
│                 Express + TypeScript + Node.js                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐      ┌──────────────────┐     ┌────────────┐  │
│  │     GET      │      │    POST /analyze │     │GET /health │  │
│  │  /health     │──┐   │                  │     │            │  │
│  └──────────────┘  │   │  • Validar input │     └────────────┘  │
│                    │   │  • Construir      │                     │
│                    │   │    prompt         │                     │
│                    │   │  • Llamar IA      │                     │
│                    │   │  • Parsear JSON   │                     │
│                    │   │  • Retornar resp  │                     │
│                    │   └────────┬──────────┘                     │
│                    │            │                                │
│                    └────────────┼────────────┐                  │
│                                 │            │                   │
│                         ┌───────▼──────┐    │                   │
│                         │  Tipos y      │    │                   │
│                         │  Config       │    │                   │
│                         │  Validación   │    │                   │
│                         └───────────────┘    │                   │
│                                              │                   │
│                                      ┌───────▼──────┐            │
│                                      │ AI Service   │            │
│                                      │ Anthropic    │            │
│                                      │ Claude API   │            │
│                                      └──────────────┘            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ API KEY
                             │
                   ┌─────────▼────────┐
                   │  Anthropic Cloud │
                   │   Claude 3.5     │
                   │   Sonnet API     │
                   └──────────────────┘
```

## 📂 Estructura de Carpetas

```
AI Workflow Debugger/
│
├── backend/                          # Express Server
│   ├── src/
│   │   ├── index.ts                 # Servidor main
│   │   ├── config.ts                # Variables de entorno
│   │   ├── types.ts                 # Interfaces TypeScript
│   │   ├── ai-service.ts            # Integración Anthropic
│   │   └── ...
│   ├── dist/                        # Compilado (generado)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                         # React App
│   ├── src/
│   │   ├── components/              # Componentes React
│   │   │   ├── InputPanel.tsx
│   │   │   ├── AnalyzeButton.tsx
│   │   │   ├── ResultsPanel.tsx
│   │   │   ├── HistoryPanel.tsx
│   │   │   └── index.ts
│   │   ├── App.tsx                  # Componente root
│   │   ├── main.tsx                 # Entry point
│   │   ├── index.css                # Estilos globales
│   │   ├── store.ts                 # Zustand store
│   │   ├── api.ts                   # HTTP client
│   │   ├── types.ts                 # Interfaces
│   │   └── validation.ts            # Validación de datos
│   ├── public/
│   ├── index.html                   # HTML entry point
│   ├── vite.config.ts               # Config Vite
│   ├── tsconfig.json
│   ├── tailwind.config.js           # Config Tailwind
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
├── README.md                         # Documentación principal
├── DEPLOYMENT.md                     # Guía de deployment
├── .gitignore
├── setup.bat                         # Script instalación (Windows)
├── setup.ps1                         # Script instalación (PowerShell)
└── ARCHITECTURE.md                   # Este archivo
```

## 🔄 Flujo de Datos

### 1️⃣ Usuario Ingresa Datos

```
Usuario escribe/pega JSON
    ↓
InputPanel onChange
    ↓
setInput en Zustand Store
    ↓
JSON se valida en tiempo real (UI feedback)
```

### 2️⃣ Usuario Presiona "Analizar"

```
AnalyzeButton onClick
    ↓
validateInput(input)
    ├─→ Errores → setError, mostrar en UI
    └─→ Válido → continuar
    ↓
setLoading(true)
    ↓
HTTP POST /analyze con axios
```

### 3️⃣ Backend Procesa Solicitud

```
Express recibe POST /analyze
    ↓
Validar request body
    ├─→ Inválido → res 400 + error
    └─→ Válido → continuar
    ↓
buildAnalysisPrompt()
    ├─→ Estructura el prompt
    ├─→ Incluye workflow, logs, attributes
    └─→ Instruye a IA qué hacer
    ↓
client.messages.create (Anthropic)
    ├─→ Envía a Claude
    ├─→ Espera respuesta
    └─→ Obtiene JSON de análisis
    ↓
Parsear JSON de respuesta
    ├─→ Error → manejar excepción
    └─→ Éxito → retornar análisis
```

### 4️⃣ Frontend Recibe Respuesta

```
HTTP Response /analyze
    ↓
setLoading(false)
    ↓
setOutput(análisis) → actualizar Zustand
    ↓
addToHistory() → guardar en historial
    ↓
ResultsPanel se actualiza
    ├─→ Mostrar root_cause
    ├─→ Mostrar explanation
    ├─→ Listar conflicts
    └─→ Listar suggestions
```

## 🧠 Sistema de Estado (Zustand)

```typescript
AnalysisStore {
  // Estado
  input: WorkflowAnalysisRequest
  output: AIAnalysisResponse | null
  loading: boolean
  error: string | null
  history: AnalysisHistory[]

  // Acciones
  setInput(input)
  setOutput(output)
  setLoading(loading)
  setError(error)
  addToHistory(analysis)
  clearError()
  reset()
}
```

### Flujo de Estado

```
┌─────────────────────────────────────────┐
│         Estado Inicial                  │
│  input: {} | loading: false | error:null│
└────────────┬────────────────────────────┘
             ↓
    Usuario escribe JSON
             ↓
  setInput(parsedJSON)
       ↓ actualiza
  Zustand trigger re-render
             ↓
    Componentes se actualizan
```

## 🤖 Integración con Anthropic

### Prompt Engineering

1. **System Role**: Experto en workflows
2. **Context**: Workflow, logs, attributes
3. **Instructions**: Qué analizar y cómo responder
4. **Output Format**: JSON estructurado

### Ejemplo de Prompt

```
Eres un experto en workflows de automatización...
Analiza: workflow, logs, attributes
Responde en JSON: {root_cause, explanation, conflicts, suggestions}
```

## ✅ Validación en Capas

```
Frontend (client-side)
    ↓
InputPanel valida JSON mientras escribe
    ↓
AnalyzeButton:
  └─→ validateInput() antes de enviar
    ↓
Backend (server-side)
    ↓
POST /analyze:
  ├─→ Validar presence de campos
  ├─→ Validar tipos
  └─→ Validar estructura mínima
```

## 🚀 Rendimiento

### Optimizaciones Implementadas

1. **State Management**: Zustand (ligero, rápido)
2. **Build Tool**: Vite (compilación ultra-rápida)
3. **Styling**: Tailwind CSS (CSS generado automático)
4. **HTTP Client**: Axios (minimalista)
5. **TypeScript**: Type safety sin runtime overhead

### Potenciales Mejoras

- Caché de respuestas frecuentes
- Debounce de requests
- Lazy loading de componentes
- Compresión de responses
- CDN para assets

## 🔒 Seguridad

### Implementado

- ✅ CORS configurado
- ✅ Input validation en server
- ✅ API Key de Anthropic en backend only
- ✅ Tipos TypeScript (previene errores)
- ✅ Límite de tamaño en requests (10MB)

### Recomendaciones

- Agregar autenticación (JWT)
- Agregar rate limiting
- Agregar logging más detallado
- Monitorear abuso de API
- Encriptar datos sensibles en tránsito (HTTPS)

## 📈 Escalabilidad

### Cambios para Mayor Escala

1. **Database**: PostgreSQL para historial
2. **Cache**: Redis para responses frecuentes
3. **Queue**: Bull/RabbitMQ para requests largas
4. **Load Balancing**: PM2 o Kubernetes
5. **Monitoring**: Sentry, DataDog
6. **Auth**: Okta, Auth0, Firebase Auth

---

Última actualización: Marzo 2026
Versión: 1.0.0 MVP
