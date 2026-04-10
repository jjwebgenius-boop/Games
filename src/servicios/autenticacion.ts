export interface CredencialesLogin {
  email: string;
  password: string;
}

export interface SesionUsuario {
  nombre: string;
  email: string;
  inicioSesion: string;
}

const USUARIOS_VALIDOS = [
  {
    email: 'estudiante@mundofreegames.com',
    password: '123456',
    nombre: 'Estudiante',
  },
  {
    email: 'profesor@mundofreegames.com',
    password: '123456',
    nombre: 'Profesor',
  },
];

const LATENCIA_SIMULADA_MS = 900;

function crearToken(email: string) {
  return btoa(`${email}:${Date.now()}:${crypto.randomUUID()}`);
}

/**
 * Simula una autenticacion contra servidor.
 * Valida credenciales locales y devuelve token + sesion.
 */
export async function simularAutenticacion(credenciales: CredencialesLogin) {
  await new Promise((resolve) => setTimeout(resolve, LATENCIA_SIMULADA_MS));

  const usuario = USUARIOS_VALIDOS.find(
    (u) =>
      u.email.toLowerCase() === credenciales.email.trim().toLowerCase() &&
      u.password === credenciales.password,
  );

  if (!usuario) {
    throw new Error('Credenciales invalidas. Verifica tu correo y contrasena.');
  }

  return {
    token: crearToken(usuario.email),
    sesion: {
      nombre: usuario.nombre,
      email: usuario.email,
      inicioSesion: new Date().toISOString(),
    } satisfies SesionUsuario,
  };
}
