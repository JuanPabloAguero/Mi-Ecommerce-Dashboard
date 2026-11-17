import { NavLink } from 'react-router'; // enlace que marca con la clase "active" la ruta actual
import { useCurrentUser } from '../../../utils/useCurrentUser'; // usuario actual (centralizado en utils)
import './Sidebar.css'; // estilos propios del componente

// Menú lateral (organismo del modelo atómico).
// Recibe por props si está abierto (solo se usa en pantallas chicas) y cómo cerrarse
function Sidebar({ isOpen, onClose }) {
  const currentUser = useCurrentUser();

  return (
    // La clase "sidebar--open" lo muestra cuando se abre en pantallas de 1024px o menos
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <h2 className="sidebar__logo">Mi Ecommerce</h2>

      {/* Al hacer clic en un enlace se cierra el Sidebar (útil en pantallas chicas) */}
      <nav className="sidebar__nav">
        {/* Inicio apunta a /home (antes "/"); ya no necesita "end" porque /home no tiene rutas hijas */}
        <NavLink to="/home" className="sidebar__link" onClick={onClose}>
          <span className="sidebar__icon" aria-hidden="true">🏠</span> {/* ícono decorativo */}
          Inicio
        </NavLink>
        {/* NavLink queda activo también en rutas hijas (/products/7), así se sigue marcando la sección actual */}
        <NavLink to="/products" className="sidebar__link" onClick={onClose}>
          <span className="sidebar__icon" aria-hidden="true">📦</span>
          Productos
        </NavLink>
        <NavLink to="/categories" className="sidebar__link" onClick={onClose}>
          <span className="sidebar__icon" aria-hidden="true">🏷️</span>
          Categorías
        </NavLink>
        <NavLink to="/users" className="sidebar__link" onClick={onClose}>
          <span className="sidebar__icon" aria-hidden="true">👥</span>
          Usuarios
        </NavLink>
      </nav>

      {/* Enlace al perfil del usuario actual: avatar + nombre, siempre abajo del todo */}
      <NavLink to="/profile" className="sidebar__link sidebar__profile" onClick={onClose}>
        {/* Avatar provisorio con la inicial del nombre */}
        <span className="sidebar__avatar" aria-hidden="true">
          {currentUser.name.charAt(0).toUpperCase()}
        </span>
        {currentUser.name}
      </NavLink>
    </aside>
  );
}

export default Sidebar; // se exporta para usarlo en MainLayout
