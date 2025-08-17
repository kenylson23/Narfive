// Configuração específica para build no Netlify
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando build no Netlify...');

// Garante que o diretório de saída existe
const outputDir = path.join(__dirname, 'dist', 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Diretório ${outputDir} criado com sucesso.`);
}

// Instala as dependências
console.log('Instalando dependências...');
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  // Executa o build do cliente
  console.log('Executando build do cliente...');
  execSync('npm run build:client', { stdio: 'inherit' });
  
  // Cria um arquivo _redirects para o SPA
  const redirectsPath = path.join(outputDir, '_redirects');
  fs.writeFileSync(redirectsPath, '/* /index.html 200');
  
  console.log('Build concluído com sucesso!');
  process.exit(0);
} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
}
