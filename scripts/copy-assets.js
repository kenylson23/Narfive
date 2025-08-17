#!/usr/bin/env node

/**
 * Script para copiar assets estáticos (imagens) para o diretório público antes do build
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

    // Copiar arquivos
    log('cyan', `📁 Copiando arquivos de ${SOURCE_DIR} para ${DEST_DIR}...`);
    
    // Usar ncp para copiar recursivamente
    await ncpCopy(SOURCE_DIR, DEST_DIR, {
      stopOnErr: true,
      filter: async (source) => {
        try {
          const stats = await fs.stat(source);
          
          // Se for diretório, incluir
          if (stats.isDirectory()) {
            return true;
          }
          
          // Verificar extensão do arquivo
          const ext = path.extname(source).toLowerCase();
          const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
          
          // Se for arquivo de imagem, copiar
          if (isImage) {
            const relativePath = path.relative(process.cwd(), source);
            log('dim', `  Copiando: ${relativePath}`);
            return true;
          }
          
          return false;
        } catch (error) {
          log('red', `❌ Erro ao processar ${source}:`, error.message);
          return false;
        }
      }
    });

    log('green', '✅ Assets copiados com sucesso!');
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
