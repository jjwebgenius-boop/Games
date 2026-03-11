import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Servidor Express para MundoFreeGames.
 * Implementa un proxy para la API de FreeToGame para evitar problemas de CORS
 * y sirve la aplicación en modo producción.
 */
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT ?? 3000);
  const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');
  const distPath = fs.existsSync(path.join(__dirname, 'dist'))
    ? path.join(__dirname, 'dist')
    : path.join(process.cwd(), 'dist');

  // Proxy para la API de FreeToGame para evitar problemas de CORS
  app.get('/api/proxy/*', async (req, res) => {
    const apiPath = req.params[0];
    const query = new URLSearchParams(req.query as any).toString();
    const targetUrl = `https://www.freetogame.com/api/${apiPath}${query ? `?${query}` : ''}`;

    try {
      const response = await fetch(targetUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error in proxy:', error);
      res.status(500).json({ error: 'Error al conectar con la API externa' });
    }
  });

  // Configuración de Vite como middleware
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Servidor corriendo en http://localhost:${PORT} (${isProduction ? 'production' : 'development'})`
    );
  });
}

startServer();
