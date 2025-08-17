import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: '/',
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: '.', // Mantém a estrutura de pastas original
    rollupOptions: {
      output: {
        // Mantém a estrutura de pastas original para os assets
        assetFileNames: (assetInfo) => {
          // Extrai o caminho relativo a partir da pasta public
          const relativePath = path.relative(
            path.resolve(import.meta.dirname, "client", "public"),
            assetInfo.name
          );
          // Remove o hash para manter os nomes originais
          const dirName = path.dirname(relativePath);
          const extName = path.extname(relativePath);
          const baseName = path.basename(relativePath, extName);
          
          // Se estiver na pasta images, mantém a estrutura
          if (dirName.startsWith('images') || dirName === 'images') {
            return `images/${baseName}${extName}`;
          }
          
          return `${baseName}${extName}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
