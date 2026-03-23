@echo off
REM Script para instalar dependencias en backend y frontend

echo.
echo ==========================================
echo  Workflow Debugger - Setup Script
echo ==========================================
echo.

REM Instalar backend
echo [1/3] Instalando dependencias del backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar dependencias del backend
    exit /b 1
)
cd ..

REM Copiar .env si no existe
if not exist "backend\.env" (
    echo [2/3] Creando archivo .env en backend...
    copy backend\.env.example backend\.env
    echo IMPORTANTE: Edita backend\.env y agrega tu ANTHROPIC_API_KEY
)

REM Instalar frontend
echo [3/3] Instalando dependencias del frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar dependencias del frontend
    exit /b 1
)
cd ..

REM Copiar .env si no existe
if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env
)

echo.
echo ==========================================
echo  Setup completado!
echo ==========================================
echo.
echo Para ejecutar la aplicacion:
echo   Terminal 1: cd backend && npm run dev
echo   Terminal 2: cd frontend && npm run dev
echo.
echo Luego abre: http://localhost:5173
echo.
