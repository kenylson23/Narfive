# Guia de Deploy - Colégio Narfive

Este documento fornece instruções detalhadas para implantar o site do Colégio Narfive no Netlify.

## 📋 Pré-requisitos

- Conta no [Netlify](https://www.netlify.com/)
- Acesso ao repositório do projeto
- Node.js 18+ instalado localmente
- Netlify CLI instalado globalmente (`npm install -g netlify-cli`)

## 🚀 Processo de Deploy

### 1. Configuração Inicial

1. Faça login no painel do Netlify
2. Clique em "Add new site" > "Import an existing project"
3. Conecte-se ao seu provedor de repositório (GitHub, GitLab, Bitbucket)
4. Selecione o repositório do projeto

### 2. Configurações de Build

- **Diretório base**: `/`
- **Comando de build**: `npm run build:netlify`
- **Diretório de publicação**: `dist/public`

### 3. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Netlify:

```
NODE_ENV=production
VITE_API_URL=https://api.colegionarfive.ao
DATABASE_URL=sua_url_de_producao
```

### 4. Domínios e HTTPS

1. Vá para "Domain settings"
2. Adicione seu domínio personalizado (opcional)
3. O Netlify fornecerá automaticamente um certificado SSL

## 🔄 Deploy Contínuo

O Netlify configurará automaticamente webhooks para:
- Fazer deploy sempre que houver push para a branch `main`
- Criar Previews de Deploy para Pull Requests

## 🛠️ Comandos Úteis

```bash
# Fazer login no Netlify CLI
netlify login

# Iniciar servidor local com as configurações do Netlify
netlify dev

# Fazer deploy manual
netlify deploy --prod

# Ver logs de deploy
netlify logs
```

## 🔍 Solução de Problemas

### Build Falhando
1. Verifique os logs de build no painel do Netlify
2. Execute `npm run build:netlify` localmente para testar
3. Verifique se todas as variáveis de ambiente estão configuradas

### Páginas não encontradas (404)
1. Verifique se o arquivo `_redirects` está configurado corretamente
2. Confirme se o diretório de publicação está correto

## 📞 Suporte

Para problemas com o deploy, entre em contato com a equipe de desenvolvimento ou consulte a [documentação do Netlify](https://docs.netlify.com/).
