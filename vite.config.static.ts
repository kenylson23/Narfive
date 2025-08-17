import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  base: '/',
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: 'assets',
    assetsInlineLimit: 0, // Garante que as imagens não sejam convertidas para base64
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client/index.html"),
      },
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
          const ext = assetInfo.name?.split('.').pop()?.toLowerCase();
          if (!ext) return 'assets/[name][extname]';
          
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return 'assets/images/[name][extname]';
          }
          
          if (['css'].includes(ext)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          
          return 'assets/[name][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000, // Aumentado para evitar avisos em builds grandes
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@tanstack/react-query'],
    esbuildOptions: {
      target: 'es2020',
      supported: { 
        bigint: true 
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});