import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const port = Number(process.env.PORT) || 3000;
const basePath = process.env.BASE_PATH || '/';

const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function handleEnrollRequest(req: any, res: any) {
  let buffers: any[] = [];
  req.on('data', (chunk: any) => buffers.push(chunk));
  req.on('end', () => {
    try {
      const raw = Buffer.concat(buffers).toString();
      const body = raw ? JSON.parse(raw) : {};
      const { fullName, email, phone, program } = body;

      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Please enter your full name (minimum 2 characters).' }));
        return;
      }

      if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Please enter a valid email address.' }));
        return;
      }

      const cleanPhone = String(phone || '').replace(/[\s-]/g, '');
      if (!cleanPhone || !INDIAN_PHONE_REGEX.test(cleanPhone)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Please enter a valid 10-digit Indian phone number.' }));
        return;
      }

      if (!program || typeof program !== 'string' || program.trim().length < 2) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Please select a program.' }));
        return;
      }

      const dataDir = path.resolve(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const dataFile = path.join(dataDir, 'enrollments.json');
      let list = [];
      if (fs.existsSync(dataFile)) {
        try {
          list = JSON.parse(fs.readFileSync(dataFile, 'utf-8') || '[]');
        } catch (e) {
          list = [];
        }
      }

      const record = {
        id: Date.now(),
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        program: program.trim(),
        createdAt: new Date().toISOString(),
      };

      list.push(record);
      fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), 'utf-8');

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        message: 'Enrollment received successfully! Our academic admissions team will contact you shortly.',
        data: record
      }));
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Internal server error processing enrollment.' }));
    }
  });
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    {
      name: 'genxera-routes-and-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/enroll' && req.method === 'POST') {
            return handleEnrollRequest(req, res);
          }
          if (req.url === '/courses' || req.url === '/courses/') {
            req.url = '/courses.html';
            return next();
          }
          if (req.url === '/workshops' || req.url === '/workshops/') {
            req.url = '/workshops.html';
            return next();
          }
          if (req.url === '/platform' || req.url === '/platform/') {
            req.url = '/platform.html';
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
          if (req.url === '/api/enroll' && req.method === 'POST') {
            return handleEnrollRequest(req, res);
          }
          if (req.url === '/courses' || req.url === '/courses/') {
            req.url = '/courses.html';
            return next();
          }
          if (req.url === '/workshops' || req.url === '/workshops/') {
            req.url = '/workshops.html';
            return next();
          }
          if (req.url === '/platform' || req.url === '/platform/') {
            req.url = '/platform.html';
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
        platform: path.resolve(import.meta.dirname, 'platform.html'),
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
