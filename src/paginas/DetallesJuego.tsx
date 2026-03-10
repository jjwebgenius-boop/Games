/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerDetallesJuego, DetallesJuego } from '../servicios/juegosApi';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Monitor, 
  Cpu, 
  Database, 
  Layers, 
  Calendar, 
  Building2,
  Loader2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

/**
 * Componente de la página de Detalles del Juego.
 * Muestra información exhaustiva sobre un juego específico, incluyendo descripción,
 * requisitos del sistema y capturas de pantalla.
 */
export default function DetallesJuegoPagina() {
  // Obtiene el ID del juego de los parámetros de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Estado para la información detallada del juego
  const [juego, setJuego] = useState<DetallesJuego | null>(null);
  // Estado de carga
  const [cargando, setCargando] = useState(true);
  // Estado de error
  const [error, setError] = useState<string | null>(null);

  /**
   * Efecto para cargar los detalles del juego al montar el componente o cambiar el ID.
   */
  useEffect(() => {
    const cargarDetalles = async () => {
      if (!id) return;
      setCargando(true);
      setError(null);
      try {
        const data = await obtenerDetallesJuego(id);
        setJuego(data);
      } catch (err) {
        setError('No se pudo cargar la información del juego.');
      } finally {
        setCargando(false);
      }
    };

    cargarDetalles();
  }, [id]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Loader2 size={48} className="text-emerald-500 animate-spin mb-4" />
        <p className="text-zinc-500 font-medium">Cargando detalles del juego...</p>
      </div>
    );
  }

  if (error || !juego) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
        <AlertCircle size={64} className="text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2">¡Error al cargar!</h1>
        <p className="text-zinc-500 mb-8 max-w-md">{error || 'El juego no existe o no se pudo encontrar.'}</p>
        <Link to="/" className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
          <ArrowLeft size={20} />
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-20">
      {/* Hero Header */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/20 to-transparent" />
        <img 
          src={juego.screenshots[0]?.image || juego.thumbnail} 
          alt={juego.title}
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute bottom-0 left-0 w-full z-20 pb-8 md:pb-12">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 md:mb-8 transition-colors group">
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
              Volver al catálogo
            </Link>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
              <img 
                src={juego.thumbnail} 
                alt={juego.title} 
                className="w-48 md:w-64 rounded-2xl shadow-2xl border-4 border-zinc-900"
                referrerPolicy="no-referrer"
              />
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-emerald-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {juego.genre}
                  </span>
                  <span className="bg-zinc-800 text-zinc-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {juego.platform}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                  {juego.title}
                </h1>
                <div className="flex flex-wrap gap-4 md:gap-6 text-zinc-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-emerald-500" />
                    {juego.publisher}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-emerald-500" />
                    {juego.release_date}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto pb-2">
                <a 
                  href={juego.game_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white w-full md:w-auto px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
                >
                  JUGAR AHORA
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                Sobre el juego
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed text-lg">
                {juego.description.split('\r\n\r\n').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                Capturas de pantalla
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {juego.screenshots.map((shot) => (
                  <motion.div 
                    key={shot.id}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl overflow-hidden border border-zinc-800"
                  >
                    <img 
                      src={shot.image} 
                      alt={`Screenshot ${shot.id}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {juego.minimum_system_requirements && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 sticky top-8">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                  <Monitor size={20} className="text-emerald-500" />
                  Requisitos Mínimos
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <Layers size={18} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sistema Operativo</p>
                      <p className="text-zinc-200 font-medium">{juego.minimum_system_requirements.os}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <Cpu size={18} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Procesador</p>
                      <p className="text-zinc-200 font-medium">{juego.minimum_system_requirements.processor}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <Database size={18} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Memoria RAM</p>
                      <p className="text-zinc-200 font-medium">{juego.minimum_system_requirements.memory}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <Monitor size={18} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Gráficos</p>
                      <p className="text-zinc-200 font-medium">{juego.minimum_system_requirements.graphics}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <Database size={18} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Almacenamiento</p>
                      <p className="text-zinc-200 font-medium">{juego.minimum_system_requirements.storage}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-4">Información Adicional</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 text-sm">Desarrollador</span>
                  <span className="text-zinc-300 text-sm font-medium">{juego.developer}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 text-sm">Editor</span>
                  <span className="text-zinc-300 text-sm font-medium">{juego.publisher}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 text-sm">Estado</span>
                  <span className="text-emerald-500 text-sm font-bold uppercase">{juego.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
