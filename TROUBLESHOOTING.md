# 🔧 Troubleshooting

Soluciones a problemas comunes.

---

## ❌ "API no disponible" (Error rojo en UI)

### Causa: El backend no está corriendo

**Solución:**
```bash
cd backend
npm run dev
```

Deberías ver: ✅ Server ejecutándose en puerto 3001

### Causa: Frontend intenta conectar a URL incorrecta

**Solución:**
1. Verifica `frontend/.env`
2. Debe tener: `VITE_API_URL=http://localhost:3001`
3. Recarga la página en el navegador

### Causa: CORS bloqueado

**Error en consola del navegador:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solución:**
1. Verifica `backend/.env`
2. `CORS_ORIGIN` debe ser: `http://localhost:5173`
3. Reinicia backend: `npm run dev`

---

## ❌ "Error al analizar: No se pudo parsear..."

### Causa: Respuesta de IA no es JSON válido

**Solución:**
1. Verifica tu ANTHROPIC_API_KEY en `backend/.env`
2. Intenta nuevamente
3. Si persiste, contacta soporte de Anthropic

### Causa: API rate limit

Espera 1 minuto y vuelve a intentar.

---

## ❌ "No se encontró ANTHROPIC_API_KEY"

### Solución rápida:

```bash
# 1. Copiar template
cp backend/.env.example backend/.env

# 2. Editar el archivo
# Windows: notepad backend\.env
# Mac/Linux: nano backend/.env

# 3. Reemplazar esta línea:
# ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui

# 4. Guardar y reiniciar backend
cd backend && npm run dev
```

**Verificar que funciona:**
1. Backend debería mostrar: ✅ Server ejecutándose en puerto 3001
2. Sin errores de "API key"

---

## ❌ "npm: command not found"

Node.js no está instalado.

**Solución:**
1. Descarga Node.js: https://nodejs.org/ (versión LTS recomendada)
2. Instala (next, next, next...)
3. Reinicia terminal
4. Intenta `npm --version`

---

## ❌ "Port 3001 already in use" en backend

Otro proceso está usando ese puerto.

**Opción 1: Cambiar puerto**
```bash
# Edita backend/.env
# Cambia: PORT=3001
# A: PORT=3002

# Edita frontend/.env
# Cambia: VITE_API_URL=http://localhost:3001
# A: VITE_API_URL=http://localhost:3002
```

**Opción 2: Matar proceso (Windows)**
```powershell
# Encuentra qué usa puerto 3001
netstat -ano | findstr :3001

# Mata el proceso (ej: PID 1234)
taskkill /PID 1234 /F
```

**Opción 3: Matar proceso (Mac/Linux)**
```bash
lsof -i :3001
kill -9 <PID>
```

---

## ❌ "Cannot find module 'express'"

Las dependencias no se instalaron.

**Solución:**
```bash
cd backend
rm -rf node_modules
npm install

# Si aún falla:
npm cache clean --force
npm install
```

---

## ❌ Página en blanco en http://localhost:5173

**Causa 1: Frontend no compiló**
```bash
# En terminal del frontend deberías ver:
# ✓ XXX modules transformed in XXX ms
# VITE v4.X.X ready in XXX ms
```

Si no ves esto, intenta:
```bash
cd frontend
npm run dev
```

**Causa 2: Errores de TypeScript**
```bash
cd frontend
npm run type-check
# Verifica qué errores hay y corrígelos
```

**Causa 3: Browser cache**
- Presiona `Ctrl+Shift+Delete` o `Cmd+Shift+Delete`
- Limpia "Cookies y datos del sitio"
- Recarga

---

## ❌ JSON input no es válido

**Error en UI:** "El input debe ser un objeto JSON"

**Solución:**
1. Verifica que el JSON está correctamente formateado
2. Usa: https://jsonlint.com/ para validar
3. Asegúrate que incluye:
   - `workflow` (objeto)
   - `logs` (array de strings)
   - `attributes` (objeto)

**Ejemplo mínimo válido:**
```json
{
  "workflow": {
    "name": "Test"
  },
  "logs": ["log 1", "log 2"],
  "attributes": {
    "test": true
  }
}
```

---

## ❌ "logs debe ser un array"

El JSON tiene `logs` que no es array.

**Incorrecto:**
```json
{
  "logs": "this is a string"
}
```

**Correcto:**
```json
{
  "logs": ["log 1", "log 2"]
}
```

---

## ❌ Botón "Analizar" está deshabilitado (gris)

Falta alguno de estos campos:
- `workflow` (no puede estar vacío)
- `logs` (debe ser array no vacío)
- `attributes` (no puede estar vacío)

**Solución:** Completa todos los campos y presiona Tab para validar.

---

## ❌ Los estilos se ven feos / sin Tailwind CSS

**Causa:** Tailwind CSS no compiló

**Solución:**
```bash
cd frontend
npm run build
# Debería generar archivo CSS compilado

# O si estás en desarrollo:
npm run dev
```

---

## ❌ Historial no persiste después de recargar

Esto es normal. El historial está en memoria (se pierde al recargar).

**Para persistir:**
Archivo futura Feature / usar localStorage / o base de datos.

Actualmente, máximo 20 análisis en la sesión.

---

## ❌ "Cannot GET /" en http://localhost:5173

Frontend no está corriendo.

**Solución:**
```bash
cd frontend
npm run dev
```

Espera el mensaje: `VITE vX.X.X ready in XXX ms`

---

## ✅ Verificar que todo funciona

### Checklist:

- [ ] Backend running: `npm run dev` en carpeta `backend/`
- [ ] Frontend running: `npm run dev` en carpeta `frontend/`
- [ ] Puede acceder a: http://localhost:5173
- [ ] Vea botón "Usar Ejemplo"
- [ ] Backend .env tiene ANTHROPIC_API_KEY válida
- [ ] Browser console sin errores rojo

Si pasa todo: ✅ Sistema funcional

---

## 📞 Si nada funciona

1. Lee [README.md](README.md) completo
2. Verifica [ARCHITECTURE.md](ARCHITECTURE.md) para entender flow
3. Mira [EXAMPLES.md](EXAMPLES.md) para ejemplos válidos

### Debug steps:

**Terminal Backend:**
```bash
cd backend
npm run dev 2>&1 | tee backend.log
```

**Terminal Frontend:**
```bash
cd frontend
npm run dev 2>&1 | tee frontend.log
```

**Browser Console:**
- Abre DevTools: F12 o Cmd+Option+I
- Tab "Console"
- Busca errores rojo
- Ej: `Uncaught TypeError: Cannot read property 'x' of undefined`

---

## 🚀 Últimas opciones (Nuclear)

Si nada más funciona:

```bash
# En cada carpeta (backend y frontend)
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```

Luego vuelve a ejecutar `npm run dev`.

---

¿Necesitas más ayuda? Lee el README.md o abre un issue en GitHub.
