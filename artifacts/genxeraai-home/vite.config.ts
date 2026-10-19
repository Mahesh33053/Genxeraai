import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const port = Number(process.env.PORT) || 3000;
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    {
      name: 'internships-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/courses' || req.url === '/courses/') {
            req.url = '/courses.html';
            return next();
          }
          if (req.url === '/workshops' || req.url === '/workshops/') {
            req.url = '/workshops.html';
            return next();
          }
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
          if (req.url === '/courses' || req.url === '/courses/') {
            req.url = '/courses.html';
            return next();
          }
          if (req.url === '/workshops' || req.url === '/workshops/') {
            req.url = '/workshops.html';
            return next();
          }
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
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
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
        courses: path.resolve(import.meta.dirname, 'courses.html'),
        workshops: path.resolve(import.meta.dirname, 'workshops.html'),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
