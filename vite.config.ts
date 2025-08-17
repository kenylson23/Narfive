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
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: path.resolve(import.meta.dirname, "client/index.html"),
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (['png', 'jpe?g', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
            return `images/[name][extname]`;
          }
          
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
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
