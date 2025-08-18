import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => ({
  plugins: [react()],
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
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: false,
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: path.resolve(import.meta.dirname, "client/index.html"),
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-select'],
          animation: ['framer-motion'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react'],
          form: ['react-hook-form', '@hookform/resolvers'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@tanstack/react-query']
  },
  server: {
    fs: {
      strict: false,
    },
  },
}));