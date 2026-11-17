import { useState, useEffect, useRef } from 'react'; // estado de apertura, efectos y referencia al Content
import { Outlet, useLocation } from 'react-router'; // Outlet: lugar donde se renderiza la página de la ruta actual; useLocation: URL actual
import Sidebar from '../../organisms/Sidebar/Sidebar';
import Header from '../../organisms/Header/Header'; // encabezado del Main Area
import { getRouteTitle } from '../../../utils/routeTitles'; // título del Header según la ruta
import { useCurrentUser } from '../../../utils/useCurrentUser'; // usuario actual (para el saludo del Home)
import './MainLayout.css'; // estilos propios del layout

// Estructura general de la UI (template): Sidebar + Main Area.
// Las páginas de todas las rutas se cargan dentro del Main Area (en su sección Content)
function MainLayout() {
  // Indica si el Sidebar está abierto; solo tiene efecto visual en pantallas de 1024px o menos
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation(); // ruta actual (ej: "/products/7")
  const contentRef = useRef(null); // acceso al div de Content para controlar su scroll
  const user = useCurrentUser(); // usuario actual (por ahora de ejemplo, hasta que haya sesiones)

  // Cierra el Sidebar al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown); // limpieza al desmontar
  }, []);

  // Al cambiar de página, el Content vuelve arriba (si no, conservaría el scroll de la página anterior)
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Fondo oscuro detrás del Sidebar abierto; al hacer clic se cierra */}
      {sidebarOpen && (
        <div className="layout__backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main-area">
        {/* Header: fijo arriba, 72px; el botón de menú ahora vive acá adentro */}
        <Header
          title={getRouteTitle(pathname, user)}
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content: ocupa el resto de la altura y es lo único que scrollea */}
        <div className="content" ref={contentRef}>
          <Outlet /> {/* acá aparece Home, ProductsList, etc., según la URL */}
        </div>
      </main>
    </div>
  );
}

export default MainLayout; // se exporta para usarlo en App
