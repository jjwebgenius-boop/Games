import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AuthProveedor } from './contexto/AuthContexto.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProveedor>
      <App />
    </AuthProveedor>
  </StrictMode>,
);
