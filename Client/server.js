// server.js (ESM)
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const distPath = path.join(__dirname, 'dist');

// simple logger for debugging on Render
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url, 'Origin:', req.headers.origin || 'none');
  next();
});

app.use(express.json());

// CORS: reflect origin (good default) — backend should still allow this frontend origin
app.use(cors({
  origin: true, // reflect the request origin; switch to whitelist when you know exact domains
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

// Serve static assets from Vite `dist`
app.use(express.static(distPath));

// If you have local API endpoints inside the same service, mount them here BEFORE fallback
// e.g. app.use('/api', apiRoutes);

// SPA fallback — only for GET requests that accept HTML (prevents intercepting asset requests)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const accept = req.headers.accept || '';
  if (!accept.includes('text/html')) return next();
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next(err);
  });
});

// Error handler so process doesn't crash
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err && err.stack ? err.stack : err);
  if (err && err.message && err.message.includes('CORS')) return res.status(403).send('CORS Forbidden');
  res.status(500).send('Server error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Client service running, serving ${distPath} on port ${PORT}`);
});
