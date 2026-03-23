# 📦 Guía de Deployment

Esta guía te ayudará a desplegar la aplicación en producción usando Railway (backend) y Firebase Hosting (frontend).

## 🚀 Deployment del Backend (Railway)

Railway es una plataforma moderna para desplegar aplicaciones Node.js.

### Pasos:

1. **Crear una cuenta en Railway**
   - Visita https://railway.app
   - Registrate con GitHub o email

2. **Instalar Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login en Railway**
   ```bash
   railway login
   ```

4. **Inicializar proyecto**
   ```bash
   cd backend
   railway init
   ```

5. **Configurar variables de entorno en Railway**
   ```bash
   railway variables set ANTHROPIC_API_KEY=tu_clave_aqui
   railway variables set NODE_ENV=production
   railway variables set CORS_ORIGIN=https://tu-frontend-domain.com
   ```

6. **Desplegar**
   ```bash
   railway up
   ```

7. **Obtener URL de producción**
   La URL estará disponible en el dashboard de Railway y la necesitarás para el frontend.

## 🌐 Deployment del Frontend (Firebase Hosting)

Firebase Hosting proporciona alojamiento rápido y seguro para aplicaciones web.

### Pasos:

1. **Crear un proyecto en Firebase**
   - Visita https://console.firebase.google.com
   - Click en "Crear proyecto"
   - Sigue los pasos

2. **Instalar Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login en Firebase**
   ```bash
   firebase login
   ```

4. **Inicializar Hosting**
   ```bash
   cd frontend
   firebase init hosting
   ```
   
   Cuando se pregunte:
   - **What do you want to use as your public directory?** → `dist`
   - **Configure as a single-page app?** → `Yes`

5. **Actualizar VITE_API_URL**
   Edita `frontend/.env` y reemplaza:
   ```
   VITE_API_URL=https://tu-backend-railway-url.railway.app
   ```

6. **Build y Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

7. **La URL será**
   Disponible en el output de `firebase deploy`

## 🔒 Variables de Entorno de Producción

### Backend (Railway)
```
PORT=3001
NODE_ENV=production
ANTHROPIC_API_KEY=sk-ant-... (tu clave)
CORS_ORIGIN=https://tu-frontend-domain.com
```

### Frontend (.env)
```
VITE_API_URL=https://tu-backend-railway-url.railway.app
```

## ✅ Checklist de Deployment

- [ ] Clave API de Anthropic configurada en Railway
- [ ] CORS_ORIGIN correcto en backend
- [ ] VITE_API_URL correcto en frontend
- [ ] Testing de endpoint `/analyze` en producción
- [ ] Testing de endpoint `/health` en producción
- [ ] Verificar logs en Railway dashboard
- [ ] Verificar errores en Firebase console

## 🐛 Troubleshooting

### "CORS Error"
- Verifica CORS_ORIGIN en Railway
- Asegúrate que coincida con la URL del frontend

### "API Key not found"
- Verifica que `ANTHROPIC_API_KEY` está en Railway variables
- Reinicia el deployment

### "Build failed in Firebase"
- Asegúrate que `npm run build` funciona localmente
- Revisa que todos los imports son correctos en TypeScript

### "Blank page in Firebase"
- Verifica que `dist` es el public directory
- Revisa que `_redirects` apunta a `index.html`

## 📊 Monitoreo en Producción

### Railway
- Dashboard: https://railway.app/dashboard
- Ver logs: `railway logs`
- Ver variables: `railway variables`

### Firebase
- Console: https://console.firebase.google.com
- Analytics: Puedes habilitar en Hosting settings
- Error tracking: Disponible en el dashboard

## 🔄 Actualizar Después del Deployment

### Actualizar Backend
```bash
cd backend
git push
# Railway detectará cambios automáticamente en GitHub
```

### Actualizar Frontend
```bash
cd frontend
npm run build
firebase deploy
```

## 💡 Mejores Prácticas

1. **Usar variables de entorno** para todos los valores sensibles
2. **Monitorear logs** regularmente
3. **Usar HTTPS** (Firebase y Railway lo incluyen)
4. **Implementar rate limiting** para proteger API
5. **Validar inputs** en el servidor (ya implementado)
6. **Cachear respuestas** si es necesario
7. **Configurar alertas** en Railway para errores

## 🚨 Consideraciones de Seguridad

- ✅ CORS configurado
- ✅ Validación de inputs en server
- ✅ API Key de Anthropic no expuesta
- ⚠️ Considera agregar autenticación si es necesario
- ⚠️ Considera agregar rate limiting
- ⚠️ Considera agregar logging más detallado

---

¡Tu aplicación está lista para producción! 🎉
