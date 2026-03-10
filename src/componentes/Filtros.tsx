/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';

interface FiltrosProps {
  filtros: {
    platform: string;
    category: string;
    sortBy: string;
    search: string;
  };
  setFiltros: (filtros: any) => void;
}

const CATEGORIAS = [
  'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'
];

const PLATAFORMAS = [
  { id: 'all', label: 'Todas' },
  { id: 'pc', label: 'PC (Windows)' },
  { id: 'browser', label: 'Navegador (Web)' }
];

const ORDENAR_POR = [
  { id: 'relevance', label: 'Relevancia' },
  { id: 'popularity', label: 'Popularidad' },
  { id: 'release-date', label: 'Fecha de lanzamiento' },
  { id: 'alphabetical', label: 'Alfabético' }
];

/**
 * Componente Filtros.
 * Proporciona una interfaz para buscar y filtrar juegos por plataforma, categoría y orden.
 * @param filtros - Estado actual de los filtros.
 * @param setFiltros - Función para actualizar el estado de los filtros.
 */
export default function Filtros({ filtros, setFiltros }: FiltrosProps) {
  /**
   * Maneja los cambios en los inputs y selects de filtrado.
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 mb-12 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Búsqueda */}
        <div className="relative group">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Buscar Juego
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
            <input
              type="text"
              name="search"
              value={filtros.search}
              onChange={handleChange}
              placeholder="Ej: Overwatch..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Plataforma */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Plataforma
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <select
              name="platform"
              value={filtros.platform}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all"
            >
              {PLATAFORMAS.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Categoría */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Categoría / Género
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <select
              name="category"
              value={filtros.category}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all capitalize"
            >
              <option value="">Todas las categorías</option>
              {CATEGORIAS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Ordenar */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
            Ordenar Por
          </label>
          <div className="relative">
            <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <select
              name="sortBy"
              value={filtros.sortBy}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all"
            >
              {ORDENAR_POR.map(o => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
