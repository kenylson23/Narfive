# 🚀 Configuração para Produção Local - Colégio Narfive

## 📋 Pré-requisitos

- **Node.js** 18+ instalado
- **PostgreSQL** configurado localmente ou Neon Database
- **Git** para controle de versão

## 🔧 Configuração Inicial

### 1. **Instalar Dependências**
```bash
npm install
```

### 2. **Configurar Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Banco de Dados
DATABASE_URL="postgresql://username:password@localhost:5432/narfive_db"

# Configurações do Servidor
PORT=8080
NODE_ENV=production

# Configurações de Sessão (para produção, use uma chave secreta forte)
SESSION_SECRET="your-session-secret-key"

# Configurações de Autenticação (opcional)
JWT_SECRET="your-jwt-secret-key"
```

### 3. **Configurar Banco de Dados**

#### Opção A: PostgreSQL Local
```bash
# Instalar PostgreSQL
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Windows
# Baixar do site oficial: https://www.postgresql.org/download/windows/

# Criar banco de dados
createdb narfive_db

# Aplicar schema
npm run db:push
```

#### Opção B: Neon Database (Recomendado)
1. Acesse https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a URL de conexão
5. Atualize o `DATABASE_URL` no `.env`

### 4. **Build para Produção**
```bash
# Build completo
npm run build

# Ou build separado
npm run build:client  # Frontend
npm run build:server  # Backend
```

## 🚀 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run dev:client   # Apenas frontend
npm run dev:server   # Apenas backend
```

### Produção
```bash
npm run build        # Build completo
npm run start        # Servidor de produção
npm run check        # Verificação TypeScript
```

### Banco de Dados
```bash
npm run db:push      # Aplicar schema
npm run db:studio    # Abrir Drizzle Studio
```

## 🔧 Configurações Adicionais

### 1. **Process Manager (PM2) - Recomendado**
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Criar arquivo ecosystem.config.js
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'narfive-app',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    }
  }]
}
```

### 2. **Nginx (Opcional)**
```nginx
# /etc/nginx/sites-available/narfive
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. **SSL com Let's Encrypt**
```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot --nginx -d seu-dominio.com
```

## 📊 Monitoramento

### 1. **Logs**
```bash
# Com PM2
pm2 logs narfive-app

# Sem PM2
npm run start > app.log 2>&1
```

### 2. **Health Check**
```bash
# Verificar se o servidor está rodando
curl http://localhost:8080/api/health
```

## 🔒 Segurança

### 1. **Firewall**
```bash
# Ubuntu/Debian
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. **Variáveis de Ambiente Seguras**
- Nunca commite o arquivo `.env`
- Use chaves secretas fortes para `SESSION_SECRET`
- Rotacione as chaves regularmente

### 3. **Backup do Banco**
```bash
# Backup PostgreSQL
pg_dump narfive_db > backup_$(date +%Y%m%d).sql

# Restaurar
psql narfive_db < backup_20240101.sql
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Porta já em uso**
```bash
# Verificar processos na porta 3000
lsof -i :8080

# Matar processo
kill -9 <PID>
```

2. **Erro de conexão com banco**
```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Reiniciar PostgreSQL
sudo systemctl restart postgresql
```

3. **Erro de permissão**
```bash
# Dar permissão de escrita na pasta dist
chmod -R 755 dist/
```

## 📈 Performance

### 1. **Otimizações Recomendadas**
- Use PM2 para gerenciar processos
- Configure Nginx como proxy reverso
- Ative compressão gzip
- Use CDN para assets estáticos

### 2. **Monitoramento**
- Configure alertas de uptime
- Monitore uso de CPU e memória
- Configure logs rotativos

## 🎯 Deploy Automático

### 1. **Git Hooks**
```bash
# .git/hooks/post-receive
#!/bin/bash
cd /path/to/your/app
git pull origin main
npm install
npm run build
pm2 restart narfive-app
```

### 2. **CI/CD com GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      # Adicione seus passos de deploy aqui
```

---

**✅ Projeto configurado para produção local!**

Agora você pode executar:
```bash
npm install
npm run build
npm run start
```

O site estará disponível em `http://localhost:8080` 