/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { obtenerJuegos, Juego } from '../servicios/juegosApi';
import TarjetaJuego from '../componentes/TarjetaJuego';
import Filtros from '../componentes/Filtros';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Gamepad2, AlertCircle } from 'lucide-react';

/**
 * Componente de la página de Inicio.
 * Gestiona el catálogo completo de juegos, permitiendo filtrar por plataforma, categoría,
 * orden y realizar búsquedas por texto.
 */
export default function Inicio() {
  // Estado para almacenar la lista de juegos obtenida de la API
  const [juegos, setJuegos] = useState<Juego[]>([]);
  // Estado para controlar el indicador de carga
  const [cargando, setCargando] = useState(true);
  // Estado para gestionar mensajes de error
  const [error, setError] = useState<string | null>(null);
  // Estado para los criterios de filtrado y búsqueda
  const [filtros, setFiltros] = useState({
    platform: 'all',
    category: '',
    sortBy: 'relevance',
    search: ''
  });

  /**
   * Efecto para cargar los juegos cada vez que cambian los filtros de la API.
   * Se dispara al montar el componente y cuando cambian platform, category o sortBy.
   */
  useEffect(() => {
    const cargarJuegos = async () => {
      setCargando(true);
      setError(null);
      try {
        const data = await obtenerJuegos({
          platform: filtros.platform,
          category: filtros.category,
          sortBy: filtros.sortBy
        });
        setJuegos(data);
      } catch (err) {
        setError('No se pudieron cargar los juegos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarJuegos();
  }, [filtros.platform, filtros.category, filtros.sortBy]);

  /**
   * Memoización de la lista filtrada por búsqueda de texto.
   * Esto optimiza el rendimiento al evitar filtrar la lista completa en cada renderizado
   * si los juegos o el término de búsqueda no han cambiado.
   */
  const juegosFiltrados = useMemo(() => {
    if (!filtros.search) return juegos;
    return juegos.filter(j => 
      j.title.toLowerCase().includes(filtros.search.toLowerCase()) ||
      j.genre.toLowerCase().includes(filtros.search.toLowerCase())
    );
  }, [juegos, filtros.search]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-20">
      {/* Hero Section */}
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

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <Gamepad2 size={16} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Explora el Catálogo</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              MUNDO FREE GAMES
            </h1>
            <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Descubre los mejores títulos gratuitos de PC y Navegador. Filtrados, ordenados y listos para jugar.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <Filtros filtros={filtros} setFiltros={setFiltros} />

        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Ups! Algo salió mal</h2>
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
            <p className="text-zinc-500 font-medium animate-pulse">Cargando catálogo de juegos...</p>
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
                <p className="text-zinc-600">Intenta ajustar tus filtros de búsqueda.</p>
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
