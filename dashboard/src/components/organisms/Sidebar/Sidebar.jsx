import { NavLink } from 'react-router'; // enlace que marca con la clase "active" la ruta actual
import './Sidebar.css'; // estilos propios del componente

// Menú lateral (organismo del modelo atómico).
// Recibe por props si está abierto (solo se usa en pantallas chicas) y cómo cerrarse
function Sidebar({ isOpen, onClose }) {
  return (
    // La clase "sidebar--open" lo muestra cuando se abre en pantallas de 1024px o menos
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <h2 className="sidebar__logo">Mi Ecommerce</h2>

      {/* Al hacer clic en un enlace se cierra el Sidebar (útil en pantallas chicas) */}
      <nav className="sidebar__nav">
        {/* "end" evita que "/" quede activo en todas las rutas */}
        <NavLink to="/" end className="sidebar__link" onClick={onClose}>Inicio</NavLink>
        <NavLink to="/products" className="sidebar__link" onClick={onClose}>Productos</NavLink>
        <NavLink to="/categories" className="sidebar__link" onClick={onClose}>Categorías</NavLink>
        <NavLink to="/users" className="sidebar__link" onClick={onClose}>Usuarios</NavLink>
      </nav>

      {/* Acceso al perfil, abajo del todo como en el diseño de referencia */}
      <NavLink to="/profile" className="sidebar__link sidebar__profile" onClick={onClose}>
        Perfil
      </NavLink>
    </aside>
  );
}

export default Sidebar; // se exporta para usarlo en MainLayout
