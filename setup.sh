#!/bin/bash

# 🚀 Script de Setup - Colégio Narfive
# Este script configura o projeto para produção local

echo "🎓 Configurando Colégio Narfive para produção local..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Node.js está instalado
print_status "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js não está instalado. Por favor, instale Node.js 18+ primeiro."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) detectado"

# Verificar se npm está instalado
print_status "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm não está instalado."
    exit 1
fi

print_success "npm $(npm -v) detectado"

# Instalar dependências
print_status "Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependências instaladas com sucesso"
else
    print_error "Erro ao instalar dependências"
    exit 1
fi

# Criar diretório de logs
print_status "Criando diretório de logs..."
mkdir -p logs

# Verificar se arquivo .env existe
if [ ! -f .env ]; then
    print_warning "Arquivo .env não encontrado. Criando exemplo..."
    cat > .env << EOF
# Configurações do Banco de Dados
DATABASE_URL="postgresql://username:password@localhost:5432/narfive_db"

# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações de Sessão (para produção, use uma chave secreta forte)
SESSION_SECRET="your-session-secret-key"

# Configurações de Autenticação (opcional)
JWT_SECRET="your-jwt-secret-key"
EOF
    print_warning "Arquivo .env criado. Por favor, configure as variáveis de ambiente."
else
    print_success "Arquivo .env encontrado"
fi

# Verificar TypeScript
print_status "Verificando TypeScript..."
npm run type-check

if [ $? -eq 0 ]; then
    print_success "TypeScript configurado corretamente"
else
    print_warning "Alguns erros de TypeScript encontrados. Verifique o código."
fi

# Build de teste
print_status "Testando build..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build realizado com sucesso"
else
    print_error "Erro no build. Verifique os logs acima."
    exit 1
fi

# Verificar se PM2 está instalado
print_status "Verificando PM2..."
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 não está instalado. Instalando..."
    npm install -g pm2
    if [ $? -eq 0 ]; then
        print_success "PM2 instalado com sucesso"
    else
        print_warning "Erro ao instalar PM2. Você pode instalá-lo manualmente com: npm install -g pm2"
    fi
else
    print_success "PM2 já está instalado"
fi

# Criar script de inicialização
print_status "Criando script de inicialização..."
cat > start.sh << 'EOF'
#!/bin/bash

# Script de inicialização do Colégio Narfive

echo "🎓 Iniciando Colégio Narfive..."

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado. Execute setup.sh primeiro."
    exit 1
fi

# Verificar se build existe
if [ ! -f dist/index.js ]; then
    echo "🔨 Realizando build..."
    npm run build
fi

# Verificar se PM2 está disponível
if command -v pm2 &> /dev/null; then
    echo "🚀 Iniciando com PM2..."
    pm2 start ecosystem.config.js --env production
    echo "✅ Aplicação iniciada com PM2"
    echo "📊 Para ver logs: pm2 logs narfive-app"
    echo "🛑 Para parar: pm2 stop narfive-app"
else
    echo "🚀 Iniciando com Node.js..."
    npm run start
fi
EOF

chmod +x start.sh

# Criar script de parada
cat > stop.sh << 'EOF'
#!/bin/bash

echo "🛑 Parando Colégio Narfive..."

if command -v pm2 &> /dev/null; then
    pm2 stop narfive-app
    echo "✅ Aplicação parada"
else
    echo "❌ PM2 não encontrado. Pare o processo manualmente."
fi
EOF

chmod +x stop.sh

# Criar script de restart
cat > restart.sh << 'EOF'
#!/bin/bash

echo "🔄 Reiniciando Colégio Narfive..."

if command -v pm2 &> /dev/null; then
    pm2 restart narfive-app
    echo "✅ Aplicação reiniciada"
else
    echo "❌ PM2 não encontrado. Reinicie manualmente."
fi
EOF

chmod +x restart.sh

print_success "✅ Setup concluído com sucesso!"

echo ""
echo "🎯 Próximos passos:"
echo "1. Configure o arquivo .env com suas variáveis de ambiente"
echo "2. Configure o banco de dados PostgreSQL"
echo "3. Execute: ./start.sh para iniciar a aplicação"
echo "4. Acesse: http://localhost:3000"
echo ""
echo "📚 Documentação completa: production-setup.md"
echo ""
echo "🛠️  Scripts disponíveis:"
echo "  ./start.sh    - Iniciar aplicação"
echo "  ./stop.sh     - Parar aplicação"
echo "  ./restart.sh  - Reiniciar aplicação"
echo "  npm run dev   - Modo desenvolvimento"
echo "  npm run build - Build para produção" 