// server.js
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS (adjust origins as needed)
// Allow whatever origin the browser sends (reflect)
app.use(cors({
  origin: true,                // echo the request Origin back
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));


app.use(express.json());

// Serve static assets from Vite build output
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// --- Mount API routes here if this project includes any ---
// e.g. if admin has no api routes, skip this.
// import someRoutes from './routes/someRoute.js';
// app.use('/api/some', someRoutes);

// SPA fallback middleware (safe catch-all that doesn't use path-to-regexp)
app.use((req, res, next) => {
  // Only handle GET requests that accept HTML. This avoids intercepting asset requests.
  if (req.method !== 'GET') return next();
  const accept = req.headers.accept || '';
  if (!accept.includes('text/html')) return next();

  // Send index.html so React Router can handle the route
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next(err);
  });
});

// Error handler (optional friendly logging)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Server error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
