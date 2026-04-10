/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import DetallesJuego from './paginas/DetallesJuego';
import NoEncontrado from './paginas/NoEncontrado';
import Login from './paginas/Login';
import RutaProtegida from './componentes/RutaProtegida';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RutaProtegida />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/juego/:id" element={<DetallesJuego />} />
        </Route>
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </Router>
  );
}
