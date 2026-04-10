# MundoFreeGames - Catalogo de Juegos Gratuitos

Aplicacion web construida con **React + Vite** que consume la API de **FreeToGame** para mostrar un catalogo de videojuegos free-to-play.

## Requisitos Previos

- Node.js (version 18 o superior)
- npm

## Instalacion y Ejecucion

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Levanta el proyecto en desarrollo:
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:3000`.

## Produccion local (con proxy activo)

1. Construye frontend:
   ```bash
   npm run build
   ```
2. Ejecuta servidor Express de produccion:
   ```bash
   npm run preview
   ```

## Login, Token y Estado Global Persistente

Se agrego autenticacion simulada con validacion de credenciales, generacion de token y persistencia de sesion:

- Pantalla de login en `/login`.
- Validacion de credenciales demo contra servicio simulado.
- Creacion de token de sesion (simulando respuesta del servidor).
- Estado global con `AuthContext` y persistencia en `localStorage`.
- Redireccion automatica al catalogo al iniciar sesion.
- Cierre de sesion desde el catalogo.
- Ajustes responsive en login y botones de cierre de sesion.

### Credenciales demo

- `estudiante@mundofreegames.com` / `123456`
- `profesor@mundofreegames.com` / `123456`

## Proteccion de Rutas

Las rutas del catalogo quedaron privadas y protegidas:

- `/` (catalogo) -> requiere sesion.
- `/juego/:id` (detalle) -> requiere sesion.
- Si no hay token/sesion, redirige a `/login`.

## Responsive de la Implementacion Nueva

Se ajusto la parte nueva para correcta visualizacion en moviles y tablets:

- `Login`: padding adaptable (`p-6` a `sm:p-8`) y titulo escalable.
- `Inicio`: boton `Cerrar sesion` centrado en movil y alineado a la derecha en pantallas grandes.
- `Detalles`: boton `Cerrar sesion` en layout vertical para movil (`w-full`) y horizontal para escritorio (`sm:w-auto`).

## Deploy en Netlify

Este repo ya incluye:

- `netlify.toml` con `publish = "dist"` y redirects.
- `netlify/functions/proxy.cjs` para manejar `/api/proxy/*` en produccion.

## Tecnologias Utilizadas

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Context API (estado global)
- Lucide React
- Motion
- API FreeToGame
