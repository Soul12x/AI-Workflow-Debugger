# 🤖 Workflow Debugger - AI-Powered Automation Analysis

Una aplicación web que utiliza inteligencia artificial (Claude) para analizar y depurar workflows de automatización de soporte al cliente en tiempo real.

## 🎯 Características

- **Análisis de Workflows**: Identifica por qué un workflow no se ejecutó o se detuvo
- **Detección de Conflictos**: Detecta conflictos entre workflows o condiciones
- **Explicación Step-by-Step**: Explica qué ocurrió en el flujo de ejecución
- **Sugerencias Inteligentes**: Proporciona posibles soluciones basadas en IA
- **Historial en Memoria**: Mantiene registro de los últimos análisis
- **Interfaz Moderna**: UI responsive con Tailwind CSS

## 🧱 Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Vite
- Zustand (estado global)
- Axios (HTTP client)
- Tailwind CSS (UI)

### Backend
- Node.js + Express + TypeScript
- Anthropic Claude API
- CORS habilitado

## 📋 Requisitos Previos

- Node.js >= 18
- npm o yarn
- Clave API de Anthropic: https://console.anthropic.com/

## 🚀 Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
git clone <tu-repo>
cd "AI Workflow Debugger"
```

### 2. Configurar Backend

```bash
cd backend

# Copiar variables de entorno
cp .env.example .env

# Editar .env y agregar tu ANTHROPIC_API_KEY
# ANTHROPIC_API_KEY=sk-ant-...

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El backend estará disponible en `http://localhost:3001`

### 3. Configurar Frontend

En otra terminal:

```bash
cd frontend

# Copiar variables de entorno
cp .env.example .env

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🧪 Ejemplo de Uso

### Input

```json
{
  "workflow": {
    "name": "CSAT Rappi - Sender",
    "conditions": [
      {
        "field": "Encuesta - MiTienda",
        "operator": "equals",
        "value": false
      }
    ]
  },
  "attributes": {
    "Encuesta - MiTienda": true
  },
  "logs": [
    "Workflow Set External ID - Treble executed",
    "Attribute Encuesta - MiTienda set to true",
    "Workflow CSAT Rappi - Sender evaluated",
    "Workflow condition failed: Encuesta - MiTienda equals false (current: true)"
  ]
}
```

### Output

```json
{
  "root_cause": "El workflow no se ejecutó porque el atributo 'Encuesta - MiTienda' tiene un valor verdadero (true), pero la condición espera un valor falso (false).",
  "explanation": "El workflow fue evaluado pero falló en la condición. El atributo cambió a true antes de que el workflow se evaluara, causando que la condición de igualdad falle.",
  "conflicts": [
    "Atributo 'Encuesta - MiTienda' conflictúa con la condición esperada",
    "El flujo Set External ID - Treble cambió el estado antes de que otro workflow se ejecutara"
  ],
  "suggestions": [
    "Revisa el orden de ejecución de los workflows",
    "Considera agregar una condición adicional o un paso de reinicio",
    "Evalúa si el atributo debe ser actualizado después del step final"
  ]
}
```

## 🔧 API Endpoints

### POST /analyze

Analiza un workflow con sus logs y atributos.

**Request:**
```json
{
  "workflow": {},
  "logs": [],
  "attributes": {}
}
```

**Response:**
```json
{
  "root_cause": "",
  "explanation": "",
  "conflicts": [],
  "suggestions": []
}
```

### GET /health

Verifica que el servidor está disponible.

## 📦 Build para Producción

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
# Los archivos estáticos estarán en dist/
```

## 🌐 Deployment

### Backend en Railway

```bash
npm install -g railway
railway login
railway link
railway up
```

Configura las variables de entorno en el dashboard de Railway.

### Frontend en Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Asegúrate de actualizar `VITE_API_URL` en el `.env` de producción.

## 📝 Variables de Entorno

### Backend (.env)
- `PORT` - Puerto del servidor (default: 3001)
- `ANTHROPIC_API_KEY` - Clave API de Anthropic (requerido)
- `CORS_ORIGIN` - Origen CORS permitido (default: http://localhost:5173)
- `NODE_ENV` - Entorno (development/production)

### Frontend (.env)
- `VITE_API_URL` - URL base de la API (default: http://localhost:3001)

## 🎨 Estructura del Proyecto

```
AI Workflow Debugger/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Servidor Express
│   │   ├── config.ts         # Configuración
│   │   ├── types.ts          # Tipos TypeScript
│   │   └── ai-service.ts     # Integración Anthropic
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/       # Componentes React
    │   ├── App.tsx          # Componente principal
    │   ├── store.ts         # Estado Zustand
    │   ├── api.ts           # Cliente HTTP
    │   ├── types.ts         # Tipos TypeScript
    │   └── main.tsx         # Entrada React
    ├── index.html
    ├── package.json
    └── tsconfig.json
```

## 🐛 Troubleshooting

### "API no disponible"
- Verifica que el backend está corriendo en puerto 3001
- Revisa que `ANTHROPIC_API_KEY` está configurada
- Comprueba CORS en backend

### "Error al parsear JSON"
- Asegúrate de que el JSON es válido
- Incluye todos los campos requeridos: workflow, logs, attributes

### "ANTHROPIC_API_KEY not found"
- Copia `.env.example` a `.env`
- Reemplaza con tu clave API real
- Reinicia el servidor

## 📚 Documentación Adicional

- [Anthropic API Docs](https://docs.anthropic.com/)
- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 Licencia

MIT

## 👨‍💻 Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue o pull request.

---

**Hecho con ❤️ usando React, Express y Claude AI**
