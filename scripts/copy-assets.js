#!/usr/bin/env node

/**
 * Script para copiar assets estáticos (imagens) para o diretório público antes do build
 * Normaliza nomes de arquivos para evitar problemas com espaços e case sensitivity
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ncp from 'ncp';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ncpCopy = promisify(ncp);

// Configurações
const SOURCE_DIR = path.resolve(__dirname, '../attached_assets');
const DEST_DIR = path.resolve(__dirname, '../client/public/images');

// Mapeamento de nomes de arquivos para normalização
const FILE_MAPPING = {
  'Desporto1 .jpg': 'desporto1.jpg',
  'Desporto1.jpg': 'desporto1.jpg',
  'Desporto2.jpg': 'desporto2.jpg',
  'Jornada1.jpg': 'jornada1.jpg',
  'Jornada2.jpg': 'jornada2.jpg',
  'Jornada5.jpg': 'jornada5.jpg',
  'Acampamento 2.jpg': 'acampamento2.jpg',
  'Acampamento 3.jpg': 'acampamento3.jpg',
  'Acampamento 6.jpg': 'acampamento6.jpg',
  'Solida.jpg': 'solida.jpg',
  'TV.jpg': 'tv.jpg',
  'Infa3.jpg': 'infa3.jpg',
  'DG2.jpg': 'dg2.jpg',
  'estu.jpg': 'estu.jpg',
  'estu 3.jpg': 'estu3.jpg',
  'Instalações.jpg': 'instalacoes.jpg',
  'instalacoes.jpg': 'instalacoes.jpg',
  'instalacoes-virtual-tour.jpg': 'instalacoes-virtual-tour.jpg'
};

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

// Função para log com cor
function log(color, ...args) {
  console.log(colors[color] || '', ...args, colors.reset);
}

// Função para garantir que um diretório existe
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    log('green', `✓ Diretório criado/verificado: ${dir}`);
    return true;
  } catch (error) {
    log('red', `✗ Erro ao criar diretório ${dir}:`, error.message);
    return false;
  }
}

// Função para verificar se um arquivo ou diretório existe
async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

// Função para normalizar nome do arquivo
function normalizeFilename(filename) {
  // Remover espaços extras e converter para minúsculas
  const normalized = filename
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  // Usar mapeamento personalizado se existir
  return FILE_MAPPING[filename] || normalized;
}

// Função para copiar arquivos
async function copyFiles() {
  try {
    log('blue', '\n🚀 Iniciando cópia de assets...');
    
    // Verificar se o diretório de origem existe
    if (!await pathExists(SOURCE_DIR)) {
      log('yellow', `⚠️  Diretório de origem não encontrado: ${SOURCE_DIR}`);
      log('yellow', '  Pulando cópia de assets...');
      return true;
    }

    // Garantir que o diretório de destino existe
    if (!(await ensureDir(DEST_DIR))) {
      return false;
    }
    
    // Limpar diretório de destino
    log('yellow', '🔄 Limpando diretório de destino...');
    try {
      const files = await fs.readdir(DEST_DIR);
      for (const file of files) {
        await fs.unlink(path.join(DEST_DIR, file));
      }
    } catch (error) {
      log('yellow', '  Nenhum arquivo para limpar no diretório de destino.');
    }
    
    // Ler arquivos de origem
    const sourceFiles = await fs.readdir(SOURCE_DIR);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    let filesCopied = 0;
    
    log('blue', `📁 Encontrados ${sourceFiles.length} arquivos na origem...`);
    
    // Copiar cada arquivo com nome normalizado
    for (const file of sourceFiles) {
      try {
        const sourcePath = path.join(SOURCE_DIR, file);
        const stats = await fs.stat(sourcePath);
        
        if (stats.isFile()) {
          const ext = path.extname(file).toLowerCase();
          
          // Verificar se é uma imagem
          if (imageExtensions.includes(ext)) {
            const normalizedName = normalizeFilename(file);
            const destPath = path.join(DEST_DIR, normalizedName);
            
            log('dim', `   Copiando: ${file} -> ${normalizedName}`);
            await fs.copyFile(sourcePath, destPath);
            filesCopied++;
          } else {
            log('yellow', `   Pulando arquivo não suportado: ${file}`);
          }
        }
      } catch (error) {
        log('red', `❌ Erro ao processar ${file}:`, error.message);
      }
    }
    
    log('green', `✅ ${filesCopied} arquivos copiados com sucesso!`);
    return true;
  } catch (error) {
    log('red', '❌ Erro ao copiar assets:', error.message);
    return false;
  }
}

// Executar
(async () => {
  try {
    const success = await copyFiles();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('❌ Erro inesperado:', error);
    process.exit(1);
  }
})();
