/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { obtenerJuegos, Juego } from '../servicios/juegosApi';
import TarjetaJuego from '../componentes/TarjetaJuego';
import Filtros from '../componentes/Filtros';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Gamepad2, AlertCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexto/AuthContexto';

/**
 * Componente de la pagina de inicio.
 * Gestiona el catalogo completo de juegos, permitiendo filtrar por plataforma,
 * categoria, orden y busquedas por texto.
 */
export default function Inicio() {
  const { sesion, cerrarSesion } = useAuth();
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState({
    platform: 'all',
    category: '',
    sortBy: 'relevance',
    search: '',
  });

  useEffect(() => {
    const cargarJuegos = async () => {
      setCargando(true);
      setError(null);
      try {
        const data = await obtenerJuegos({
          platform: filtros.platform,
          category: filtros.category,
          sortBy: filtros.sortBy,
        });
        setJuegos(data);
      } catch {
        setError('No se pudieron cargar los juegos. Intenta de nuevo mas tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarJuegos();
  }, [filtros.platform, filtros.category, filtros.sortBy]);

  const juegosFiltrados = useMemo(() => {
    if (!filtros.search) return juegos;
    return juegos.filter(
      (juego) =>
        juego.title.toLowerCase().includes(filtros.search.toLowerCase()) ||
        juego.genre.toLowerCase().includes(filtros.search.toLowerCase()),
    );
  }, [juegos, filtros.search]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-20">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />
          <img
            src="https://picsum.photos/seed/gaming/1920/1080?blur=4"
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Hero background"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl w-full">
          <div className="flex justify-center sm:justify-end mb-8 sm:mb-10">
            <button
              onClick={cerrarSesion}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-zinc-900/80 border border-zinc-700 text-zinc-200 hover:text-white hover:border-zinc-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              <LogOut size={14} />
              Cerrar sesion
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <Gamepad2 size={16} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Explora el catalogo
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              MUNDO FREE GAMES
            </h1>
            <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Descubre los mejores titulos gratuitos de PC y Navegador. Filtrados, ordenados y listos para jugar.
            </p>
            {sesion && (
              <p className="mt-6 text-sm text-zinc-400">
                Sesion activa: <span className="text-emerald-400 font-semibold">{sesion.nombre}</span>
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <Filtros filtros={filtros} setFiltros={setFiltros} />

        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ups! Algo salio mal</h2>
            <p className="text-zinc-500 max-w-md">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all"
            >
              Reintentar
            </button>
          </div>
        )}

        {cargando ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 size={48} className="text-emerald-500 animate-spin mb-4" />
            <p className="text-zinc-500 font-medium animate-pulse">Cargando catalogo de juegos...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Resultados</h2>
                <p className="text-zinc-500">Mostrando {juegosFiltrados.length} juegos encontrados</p>
              </div>
            </div>

            {juegosFiltrados.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl">
                <Gamepad2 size={64} className="text-zinc-800 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-400">No se encontraron juegos</h3>
                <p className="text-zinc-600">Intenta ajustar tus filtros de busqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                  {juegosFiltrados.map((juego) => (
                    <TarjetaJuego key={juego.id} juego={juego} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
