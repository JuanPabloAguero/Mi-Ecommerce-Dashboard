import { useState, useEffect } from 'react'; // estado de apertura y efecto para la tecla Escape
import { Outlet } from 'react-router'; // lugar donde se renderiza la página de la ruta actual
import Sidebar from '../../organisms/Sidebar/Sidebar';
import './MainLayout.css'; // estilos propios del layout

// Estructura general de la UI (template): Sidebar + Main Area.
// Las páginas de todas las rutas se cargan dentro del Main Area
function MainLayout() {
  // Indica si el Sidebar está abierto; solo tiene efecto visual en pantallas de 1024px o menos
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cierra el Sidebar al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown); // limpieza al desmontar
  }, []);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Fondo oscuro detrás del Sidebar abierto; al hacer clic se cierra */}
      {sidebarOpen && (
        <div className="layout__backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main-area">
        {/* Botón de menú: solo se ve en pantallas de 1024px o menos */}
        <button
          className="menu-button"
          aria-label="Abrir menú"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <Outlet /> {/* acá aparece Home, ProductsList, etc., según la URL */}
      </main>
    </div>
  );
}

export default MainLayout; // se exporta para usarlo en App
