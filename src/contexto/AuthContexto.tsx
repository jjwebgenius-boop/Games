import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CredencialesLogin, SesionUsuario, simularAutenticacion } from '../servicios/autenticacion';

interface EstadoAuth {
  token: string | null;
  sesion: SesionUsuario | null;
}

interface AuthContextoValor extends EstadoAuth {
  estaAutenticado: boolean;
  iniciandoSesion: boolean;
  iniciarSesion: (credenciales: CredencialesLogin) => Promise<void>;
  cerrarSesion: () => void;
}

const LLAVE_STORAGE = 'mundofreegames.auth';

const AuthContexto = createContext<AuthContextoValor | undefined>(undefined);

function obtenerEstadoPersistido(): EstadoAuth {
  try {
    const guardado = localStorage.getItem(LLAVE_STORAGE);
    if (!guardado) {
      return { token: null, sesion: null };
    }
    const parseado = JSON.parse(guardado) as EstadoAuth;
    if (!parseado?.token || !parseado?.sesion) {
      return { token: null, sesion: null };
    }
    return parseado;
  } catch {
    return { token: null, sesion: null };
  }
}

export function AuthProveedor({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<EstadoAuth>(obtenerEstadoPersistido);
  const [iniciandoSesion, setIniciandoSesion] = useState(false);

  useEffect(() => {
    if (!estado.token || !estado.sesion) {
      localStorage.removeItem(LLAVE_STORAGE);
      return;
    }
    localStorage.setItem(LLAVE_STORAGE, JSON.stringify(estado));
  }, [estado]);

  const iniciarSesion = async (credenciales: CredencialesLogin) => {
    setIniciandoSesion(true);
    try {
      const respuesta = await simularAutenticacion(credenciales);
      setEstado(respuesta);
    } finally {
      setIniciandoSesion(false);
    }
  };

  const cerrarSesion = () => {
    setEstado({ token: null, sesion: null });
  };

  const valor = useMemo<AuthContextoValor>(
    () => ({
      ...estado,
      estaAutenticado: Boolean(estado.token && estado.sesion),
      iniciandoSesion,
      iniciarSesion,
      cerrarSesion,
    }),
    [estado, iniciandoSesion],
  );

  return <AuthContexto.Provider value={valor}>{children}</AuthContexto.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContexto);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProveedor.');
  }
  return contexto;
}
