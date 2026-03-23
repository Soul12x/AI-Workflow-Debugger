#!/usr/bin/env powershell

# Script para instalar dependencias en backend y frontend

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Workflow Debugger - Setup Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Instalar backend
Write-Host "[1/3] Instalando dependencias del backend..." -ForegroundColor Yellow
Push-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo al instalar dependencias del backend" -ForegroundColor Red
    exit 1
}
Pop-Location

# Copiar .env si no existe
if (-not (Test-Path "backend\.env")) {
    Write-Host "[2/3] Creando archivo .env en backend..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "IMPORTANTE: Edita backend\.env y agrega tu ANTHROPIC_API_KEY" -ForegroundColor Red
}

# Instalar frontend
Write-Host "[3/3] Instalando dependencias del frontend..." -ForegroundColor Yellow
Push-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo al instalar dependencias del frontend" -ForegroundColor Red
    exit 1
}
Pop-Location

# Copiar .env si no existe
if (-not (Test-Path "frontend\.env")) {
    Copy-Item "frontend\.env.example" "frontend\.env"
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  Setup completado!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para ejecutar la aplicacion:" -ForegroundColor Cyan
Write-Host "   Terminal 1: cd backend && npm run dev" -ForegroundColor White
Write-Host "   Terminal 2: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Luego abre: http://localhost:5173" -ForegroundColor Green
Write-Host ""
