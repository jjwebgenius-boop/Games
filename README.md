# MundoFreeGames - CatÃ¡logo de Juegos Gratuitos

Este proyecto es una aplicaciÃ³n web moderna construida con **React** y **Vite**, que consume la API de **FreeToGame** para mostrar un catÃ¡logo completo de juegos gratuitos.

## Requisitos Previos

- Node.js (versiÃ³n 18 o superior)
- npm o yarn

## InstalaciÃ³n y EjecuciÃ³n

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre tu navegador en `http://localhost:3000`.

## Produccion local (con proxy API activo)

1. Construye el frontend:
   ```bash
   npm run build
   ```
2. Levanta el servidor Express en modo produccion:
   ```bash
   npm run preview
   ```

Esto sirve `dist` y mantiene disponible el proxy en `/api/proxy/*`.

## Deploy en Netlify

Este repo ya incluye:
- `netlify.toml` con `publish = "dist"` y redirects.
- `netlify/functions/proxy.cjs` para manejar `/api/proxy/*` en produccion.

En Netlify solo necesitas conectar el repo. La API no se guarda en `dist`; se ejecuta como funcion serverless.

### Que hace cada cambio

- `netlify.toml`:
  - Define build (`npm run build`) y salida (`dist`).
  - Activa funciones en `netlify/functions`.
  - Redirige `/api/proxy/*` a `/.netlify/functions/proxy/:splat`.
  - Mantiene fallback SPA (`/* -> /index.html`).

- `netlify/functions/proxy.cjs`:
  - Recibe rutas como `/api/proxy/games?platform=pc`.
  - Reenvia a `https://www.freetogame.com/api/games?platform=pc`.
  - Devuelve el `status` y `content-type` originales.
  - Si falla, responde `500` con JSON de error.

- `server.ts` y `package.json` (local):
  - `npm run preview` / `npm run start` ejecutan Express en modo produccion.
  - Sirve `dist` y tambien habilita `/api/proxy/*` en pruebas locales.

## TecnologÃ­as Utilizadas

- **React 19**: Biblioteca principal para la interfaz.
- **Vite**: Herramienta de construcciÃ³n rÃ¡pida.
- **Tailwind CSS**: Estilizado mediante utilidades.
- **React Router Dom**: GestiÃ³n de navegaciÃ³n y rutas dinÃ¡micas.
- **Lucide React**: Set de iconos consistentes.
- **Motion**: Animaciones fluidas y transiciones.
- **API FreeToGame**: Fuente de datos de juegos.
# Games
