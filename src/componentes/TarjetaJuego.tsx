/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Juego } from '../servicios/juegosApi';
import { Monitor, Globe, ChevronRight } from 'lucide-react';

interface TarjetaJuegoProps {
  juego: Juego;
}

/**
 * Componente TarjetaJuego.
 * Representa visualmente un juego en el catálogo con animaciones y detalles básicos.
 * @param juego - Objeto con la información del juego a mostrar.
 */
const TarjetaJuego: React.FC<TarjetaJuegoProps> = ({ juego }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full group transition-all hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={juego.thumbnail}
          alt={juego.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <span className="bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-emerald-500/30">
            {juego.genre}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
            {juego.title}
          </h3>
          <div className="text-zinc-500">
            {juego.platform.includes('PC') ? (
              <Monitor size={16} />
            ) : (
              <Globe size={16} />
            )}
          </div>
        </div>

        <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">
          {juego.short_description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
          <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest">
            {juego.publisher}
          </span>
          <Link
            to={`/juego/${juego.id}`}
            className="flex items-center gap-1 text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors group/btn"
          >
            Ver más
            <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TarjetaJuego;
