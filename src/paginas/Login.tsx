import React, { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexto/AuthContexto';

interface EstadoRedireccion {
  from?: string;
}

export default function Login() {
  const { estaAutenticado, iniciarSesion, iniciandoSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as EstadoRedireccion | null)?.from || '/';

  if (estaAutenticado) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Completa todos los campos para iniciar sesion.');
      return;
    }

    try {
      await iniciarSesion({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      const mensaje =
        err instanceof Error ? err.message : 'No se pudo iniciar sesion. Intenta nuevamente.';
      setError(mensaje);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-4">
            <LogIn size={16} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Acceso seguro
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Iniciar sesion</h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Ingresa para acceder al catalogo de Mundo Free Games.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="estudiante@mundofreegames.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Contrasena
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={iniciandoSesion}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700/60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            {iniciandoSesion ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Validando...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Entrar al catalogo
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-xs text-zinc-500 border-t border-zinc-800 pt-4 space-y-1">
          <p>Usuario demo: estudiante@mundofreegames.com</p>
          <p>Contrasena demo: 123456</p>
        </div>
      </motion.div>
    </div>
  );
}
