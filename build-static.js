#!/usr/bin/env node

// Build script for static deployment
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Building static files for deployment...');

try {
  // Use the static configuration
  await build({
    configFile: resolve(__dirname, 'vite.config.static.ts'),
    mode: 'production',
    build: {
      outDir: resolve(__dirname, 'dist/public'),
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'client/index.static.html'),
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-select'],
            animation: ['framer-motion'],
            query: ['@tanstack/react-query'],
            icons: ['lucide-react'],
            form: ['react-hook-form', '@hookform/resolvers'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
          }
        }
      }
    }
  });
  
  // Create favicon files
  const distPublic = resolve(__dirname, 'dist/public');
  if (!existsSync(distPublic)) {
    mkdirSync(distPublic, { recursive: true });
  }
  
  // Create basic favicon files
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#6A5ACD"/>
    <text x="50" y="65" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">N</text>
  </svg>`;
  
  // Write favicon files
  writeFileSync(resolve(distPublic, 'favicon.svg'), faviconSvg);
  
  console.log('✅ Static build completed successfully!');
  console.log('📁 Files generated in: dist/public');
  console.log('🎯 Ready for deployment!');
  
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}