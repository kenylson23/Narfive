# Script de inicialização do Colégio Narfive (PowerShell)

Write-Host "Iniciando Colégio Narfive..." -ForegroundColor Green

# Verificar se .env existe
if (!(Test-Path ".env")) {
    Write-Host "Arquivo .env não encontrado. Execute setup.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se build existe
if (!(Test-Path "dist/index.js")) {
    Write-Host "Realizando build..." -ForegroundColor Yellow
    npm run build
}

# Verificar se PM2 está disponível
try {
    pm2 --version | Out-Null
    Write-Host "Iniciando com PM2..." -ForegroundColor Green
    pm2 start ecosystem.config.js --env production
    Write-Host "Aplicação iniciada com PM2" -ForegroundColor Green
    Write-Host "Para ver logs: pm2 logs narfive-app" -ForegroundColor Cyan
    Write-Host "Para parar: pm2 stop narfive-app" -ForegroundColor Cyan
    Write-Host "Acesse: http://localhost:8080" -ForegroundColor Green
} catch {
    Write-Host "Iniciando com Node.js..." -ForegroundColor Green
    npm run start
    Write-Host "Acesse: http://localhost:8080" -ForegroundColor Green
} 