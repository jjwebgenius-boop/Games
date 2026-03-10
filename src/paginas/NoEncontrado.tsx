/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home } from 'lucide-react';

/**
 * Componente para manejar rutas no encontradas (Error 404).
 * Presenta una interfaz amigable cuando el usuario intenta acceder a una URL inexistente.
 */
export default function NoEncontrado() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        <Ghost size={120} className="text-zinc-800" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-emerald-500">404</span>
      </div>
      <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">PÁGINA NO ENCONTRADA</h1>
      <p className="text-zinc-500 mb-12 max-w-md text-lg">
        Parece que el nivel que buscas no existe o ha sido eliminado. ¡Vuelve al inicio para seguir explorando!
      </p>
      <Link 
        to="/" 
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
      >
        <Home size={20} />
        VOLVER AL INICIO
      </Link>
    </div>
  );
}
