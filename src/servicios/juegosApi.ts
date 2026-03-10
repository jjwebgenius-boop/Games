/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const BASE_URL = '/api/proxy';

export interface Juego {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface DetallesJuego extends Juego {
  status: string;
  description: string;
  minimum_system_requirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: {
    id: number;
    image: string;
  }[];
}

/**
 * Obtiene la lista de juegos desde la API, aplicando filtros opcionales.
 * @param filtros - Criterios de filtrado (plataforma, categoría, orden).
 * @returns Promesa con el array de juegos.
 */
export const obtenerJuegos = async (filtros?: {
  platform?: string;
  category?: string;
  sortBy?: string;
}): Promise<Juego[]> => {
  const params = new URLSearchParams();
  if (filtros?.platform) params.append('platform', filtros.platform);
  if (filtros?.category) params.append('category', filtros.category);
  if (filtros?.sortBy) params.append('sort-by', filtros.sortBy);

  const url = `${BASE_URL}/games${params.toString() ? `?${params.toString()}` : ''}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    throw error;
  }
};

/**
 * Obtiene los detalles completos de un juego específico por su ID.
 * @param id - Identificador único del juego.
 * @returns Promesa con los detalles del juego.
 */
export const obtenerDetallesJuego = async (id: string): Promise<DetallesJuego> => {
  try {
    const response = await fetch(`${BASE_URL}/game?id=${id}`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener detalles del juego ${id}:`, error);
    throw error;
  }
};
