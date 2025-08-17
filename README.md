# 🎓 Colégio Narfive - Site Institucional

Site institucional moderno e responsivo para o Colégio Narfive, desenvolvido com React, TypeScript e Node.js.

## 🚀 Características

- **Frontend Moderno**: React 18 + TypeScript + Vite
- **Backend Robusto**: Express.js + PostgreSQL + Drizzle ORM
- **Design Responsivo**: Tailwind CSS + Radix UI
- **Animações Suaves**: Framer Motion
- **SEO Otimizado**: Meta tags, OpenGraph, Schema.org
- **Performance**: Code splitting, lazy loading, cache otimizado

## 📋 Pré-requisitos

- **Node.js** 18+ 
- **PostgreSQL** (local ou Neon Database)
- **npm** ou **yarn**

## 🛠️ Instalação Rápida

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd narfive
```

### 2. Setup automático
```bash
# Dar permissão de execução
chmod +x setup.sh

# Executar setup
./setup.sh
```

### 3. Configurar variáveis de ambiente
Edite o arquivo `.env` criado:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/narfive_db"
PORT=8080
NODE_ENV=production
SESSION_SECRET="sua-chave-secreta-forte"
```

### 4. Configurar banco de dados
```bash
# Aplicar schema
npm run db:push
```

### 5. Iniciar aplicação
```bash
./start.sh
```

Acesse: http://localhost:8080

## 📚 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor completo
npm run dev:client   # Apenas frontend
npm run dev:server   # Apenas backend
```

### Produção
```bash
npm run build        # Build completo
npm run start        # Servidor de produção
./start.sh          # Iniciar com PM2
./stop.sh           # Parar aplicação
./restart.sh        # Reiniciar aplicação
```

### Banco de Dados
```bash
npm run db:push      # Aplicar schema
npm run db:studio    # Abrir Drizzle Studio
```

### Utilitários
```bash
npm run check        # Verificação TypeScript
npm run clean        # Limpar cache
npm run type-check   # Verificação de tipos
```

## 🏗️ Arquitetura

```
├── client/          # Frontend React
│   ├── src/         # Código fonte
│   └── public/      # Assets estáticos
├── server/          # Backend Express
│   ├── index.ts     # Servidor principal
│   ├── routes.ts    # Rotas da API
│   └── storage.ts   # Camada de dados
├── shared/          # Código compartilhado
│   └── schema.ts    # Schema do banco
└── dist/            # Build de produção
```

## 🎨 Funcionalidades

### Frontend
- ✅ Navegação responsiva
- ✅ Formulário de contato
- ✅ Galeria de fotos
- ✅ Tour virtual 360°
- ✅ Calculadora de mensalidades
- ✅ Agendamento de visitas
- ✅ Animações suaves
- ✅ SEO otimizado

### Backend
- ✅ API RESTful
- ✅ Autenticação
- ✅ Sistema de sessões
- ✅ Validação de dados
- ✅ Logs estruturados
- ✅ Tratamento de erros

### Banco de Dados
- ✅ PostgreSQL
- ✅ Drizzle ORM
- ✅ Migrações automáticas
- ✅ Validação com Zod

## 🔧 Configuração Avançada

### PM2 (Process Manager)
```bash
# Instalar PM2
npm install -g pm2

# Iniciar com PM2
pm2 start ecosystem.config.js --env production

# Ver logs
pm2 logs narfive-app

# Parar
pm2 stop narfive-app
```

### Nginx (Proxy Reverso)
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL com Let's Encrypt
```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot --nginx -d seu-dominio.com
```

## 📊 Monitoramento

### Logs
```bash
# Ver logs em tempo real
pm2 logs narfive-app

# Ver logs de erro
pm2 logs narfive-app --err

# Ver logs de output
pm2 logs narfive-app --out
```

### Health Check
```bash
# Verificar se está rodando
curl http://localhost:8080/api/health
```

### Performance
```bash
# Ver uso de recursos
pm2 monit

# Ver estatísticas
pm2 show narfive-app
```

## 🔒 Segurança

### Variáveis de Ambiente
- ✅ Nunca commite o arquivo `.env`
- ✅ Use chaves secretas fortes
- ✅ Rotacione chaves regularmente

### Firewall
```bash
# Ubuntu/Debian
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Backup
```bash
# Backup do banco
pg_dump narfive_db > backup_$(date +%Y%m%d).sql

# Restaurar
psql narfive_db < backup_20240101.sql
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Porta já em uso**
```bash
lsof -i :3000
kill -9 <PID>
```

2. **Erro de conexão com banco**
```bash
# Verificar PostgreSQL
sudo systemctl status postgresql
sudo systemctl restart postgresql
```

3. **Erro de permissão**
```bash
chmod -R 755 dist/
```

4. **Build falha**
```bash
npm run clean
rm -rf node_modules
npm install
npm run build
```

## 📈 Performance

### Otimizações Implementadas
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Cache otimizado
- ✅ Compressão gzip
- ✅ Minificação de assets
- ✅ Tree shaking

### Lighthouse Score
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas:
- 📧 Email: suporte@colegionarfive.ao
- 📱 WhatsApp: +244-923-456-789
- 🌐 Website: https://colegionarfive.ao

---

**🎓 Desenvolvido com ❤️ para o Colégio Narfive** 