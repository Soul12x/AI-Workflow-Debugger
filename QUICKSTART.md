# ⚡ Quickstart (5 minutos)

## 1️⃣ Preparativos (1 min)

### Obtén tu API Key
1. Ve a https://console.anthropic.com/
2. Crea una cuenta (o login)
3. Copia tu API key

## 2️⃣ Instalación (2 min)

### Opción A: Windows Batch
```bash
cd "AI Workflow Debugger"
setup.bat
```

### Opción B: PowerShell
```powershell
cd "AI Workflow Debugger"
.\setup.ps1
```

### Opción C: Manual
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edita .env y agrega tu ANTHROPIC_API_KEY

# Frontend
cd frontend
npm install
cp .env.example .env
```

## 3️⃣ Configurar API Key (1 min)

Edita `backend/.env`:
```
ANTHROPIC_API_KEY=sk-ant-... (tu clave aquí)
```

## 4️⃣ Ejecutar (1 min)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Verás: ✅ Server ejecutándose en puerto 3001

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Abre automáticamente: http://localhost:5173

## 5️⃣ Probar

1. Click en "Usar Ejemplo" para cargar un workflow de prueba
2. Click en "Analizar Workflow"
3. ¡Listo! Verás el análisis de la IA

---

## 🐛 Si algo no funciona

### "API no disponible"
```bash
# Verifica que backend está corriendo
cd backend && npm run dev
```

### "No se puede encontrar modelos"
```bash
# Reinstala dependencias
cd backend && rm -rf node_modules && npm install
cd frontend && rm -rf node_modules && npm install
```

### "ANTHROPIC_API_KEY not found"
```bash
# 1. Copia el .env.example
cp backend/.env.example backend/.env

# 2. Edita backend/.env y agrega tu API key
# ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui

# 3. Reinicia el backend (npm run dev)
```

---

## 📚 Documentación Completa

- [README](README.md) - Guía completa
- [ARCHITECTURE](ARCHITECTURE.md) - Cómo funciona internamente
- [DEPLOYMENT](DEPLOYMENT.md) - Cómo publicar en producción

---

**¡Necesitas ayuda?** Lee el README.md para problemas más específicos.
