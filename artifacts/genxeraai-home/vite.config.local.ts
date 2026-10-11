import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Local dev config — no Replit plugins, uses sensible defaults
const port = Number(process.env.PORT) || 3000;
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'internships-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const match = req.url && req.url.match(/^\/internships\/([a-zA-Z0-9_-]+)\/?(?:\?(.*))?$/);
          if (match) {
            const slug = match[1];
            const query = match[2] ? `&${match[2]}` : '';
            req.url = `/internship.html?track=${slug}${query}`;
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const match = req.url && req.url.match(/^\/internships\/([a-zA-Z0-9_-]+)\/?(?:\?(.*))?$/);
          if (match) {
            const slug = match[1];
            const query = match[2] ? `&${match[2]}` : '';
            req.url = `/internship.html?track=${slug}${query}`;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        internship: path.resolve(import.meta.dirname, 'internship.html'),
      },
    },
  },
  server: {
    port,
    strictPort: false,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
