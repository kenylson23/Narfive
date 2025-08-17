# 🚀 Script de Setup - Colégio Narfive (PowerShell)
# Este script configura o projeto para produção local no Windows

Write-Host "🎓 Configurando Colégio Narfive para produção local..." -ForegroundColor Blue

# Função para imprimir mensagens coloridas
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar se Node.js está instalado
Write-Status "Verificando Node.js..."
try {
    $nodeVersion = node --version
    Write-Success "Node.js $nodeVersion detectado"
} catch {
    Write-Error "Node.js não está instalado. Por favor, instale Node.js 18+ primeiro."
    exit 1
}

# Verificar se npm está instalado
Write-Status "Verificando npm..."
try {
    $npmVersion = npm --version
    Write-Success "npm $npmVersion detectado"
} catch {
    Write-Error "npm não está instalado."
    exit 1
}

# Instalar dependências
Write-Status "Instalando dependências..."
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Success "Dependências instaladas com sucesso"
} else {
    Write-Error "Erro ao instalar dependências"
    exit 1
}

# Criar diretório de logs
Write-Status "Criando diretório de logs..."
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs"
}

# Verificar se arquivo .env existe
if (!(Test-Path ".env")) {
    Write-Warning "Arquivo .env não encontrado. Criando exemplo..."
    @"
# Configurações do Banco de Dados
DATABASE_URL="postgresql://username:password@localhost:5432/narfive_db"

# Configurações do Servidor
PORT=8080
NODE_ENV=development

# Configurações de Sessão (para produção, use uma chave secreta forte)
SESSION_SECRET="your-session-secret-key"

# Configurações de Autenticação (opcional)
JWT_SECRET="your-jwt-secret-key"
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Warning "Arquivo .env criado. Por favor, configure as variáveis de ambiente."
} else {
    Write-Success "Arquivo .env encontrado"
}

# Verificar TypeScript
Write-Status "Verificando TypeScript..."
npm run type-check

if ($LASTEXITCODE -eq 0) {
    Write-Success "TypeScript configurado corretamente"
} else {
    Write-Warning "Alguns erros de TypeScript encontrados. Verifique o código."
}

# Build de teste
Write-Status "Testando build..."
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Success "Build realizado com sucesso"
} else {
    Write-Error "Erro no build. Verifique os logs acima."
    exit 1
}

# Verificar se PM2 está instalado
Write-Status "Verificando PM2..."
try {
    $pm2Version = pm2 --version
    Write-Success "PM2 já está instalado"
} catch {
    Write-Warning "PM2 não está instalado. Instalando..."
    npm install -g pm2
    if ($LASTEXITCODE -eq 0) {
        Write-Success "PM2 instalado com sucesso"
    } else {
        Write-Warning "Erro ao instalar PM2. Você pode instalá-lo manualmente com: npm install -g pm2"
    }
}

# Criar script de inicialização (PowerShell)
Write-Status "Criando script de inicialização..."
@"
# Script de inicialização do Colégio Narfive (PowerShell)

Write-Host "🎓 Iniciando Colégio Narfive..." -ForegroundColor Green

# Verificar se .env existe
if (!(Test-Path ".env")) {
    Write-Host "❌ Arquivo .env não encontrado. Execute setup.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se build existe
if (!(Test-Path "dist/index.js")) {
    Write-Host "🔨 Realizando build..." -ForegroundColor Yellow
    npm run build
}

# Verificar se PM2 está disponível
try {
    pm2 --version | Out-Null
    Write-Host "🚀 Iniciando com PM2..." -ForegroundColor Green
    pm2 start ecosystem.config.js --env production
    Write-Host "✅ Aplicação iniciada com PM2" -ForegroundColor Green
    Write-Host "📊 Para ver logs: pm2 logs narfive-app" -ForegroundColor Cyan
    Write-Host "🛑 Para parar: pm2 stop narfive-app" -ForegroundColor Cyan
} catch {
    Write-Host "🚀 Iniciando com Node.js..." -ForegroundColor Green
    npm run start
}
"@ | Out-File -FilePath "start.ps1" -Encoding UTF8

# Criar script de parada
@"
Write-Host "🛑 Parando Colégio Narfive..." -ForegroundColor Yellow

try {
    pm2 stop narfive-app
    Write-Host "✅ Aplicação parada" -ForegroundColor Green
} catch {
    Write-Host "❌ PM2 não encontrado. Pare o processo manualmente." -ForegroundColor Red
}
"@ | Out-File -FilePath "stop.ps1" -Encoding UTF8

# Criar script de restart
@"
Write-Host "🔄 Reiniciando Colégio Narfive..." -ForegroundColor Yellow

try {
    pm2 restart narfive-app
    Write-Host "✅ Aplicação reiniciada" -ForegroundColor Green
} catch {
    Write-Host "❌ PM2 não encontrado. Reinicie manualmente." -ForegroundColor Red
}
"@ | Out-File -FilePath "restart.ps1" -Encoding UTF8

Write-Success "✅ Setup concluído com sucesso!"

Write-Host ""
Write-Host "🎯 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure o arquivo .env com suas variáveis de ambiente"
Write-Host "2. Configure o banco de dados PostgreSQL"
Write-Host "3. Execute: .\start.ps1 para iniciar a aplicação"
Write-Host "4. Acesse: http://localhost:8080"
Write-Host ""
Write-Host "📚 Documentação completa: production-setup.md"
Write-Host ""
Write-Host "🛠️  Scripts disponíveis:" -ForegroundColor Cyan
Write-Host "  .\start.ps1     - Iniciar aplicação"
Write-Host "  .\stop.ps1      - Parar aplicação"
Write-Host "  .\restart.ps1   - Reiniciar aplicação"
Write-Host "  npm run dev     - Modo desenvolvimento"
Write-Host "  npm run build   - Build para produção" 