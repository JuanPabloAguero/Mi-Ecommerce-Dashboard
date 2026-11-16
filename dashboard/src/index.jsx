import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router' // proveedor de rutas basado en la URL del navegador
import './index.css'
import App from './App.jsx'

// Se monta la app en el <div id="root"> de index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter habilita el ruteo en toda la app (Routes, NavLink, useParams, etc.) */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
