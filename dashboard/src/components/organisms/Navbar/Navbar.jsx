import { NavLink } from 'react-router'; // como Link, pero marca con la clase "active" el enlace de la ruta actual
import './Navbar.css'; // estilos propios del componente

// Barra de navegación principal (organismo del modelo atómico)
function Navbar() {
  return (
    <nav className="navbar">
      {/* "end" evita que "/" quede activo en todas las rutas */}
      <NavLink to="/" end>Inicio</NavLink>
      <NavLink to="/products">Productos</NavLink>
      <NavLink to="/categories">Categorías</NavLink>
      <NavLink to="/users">Usuarios</NavLink>
      <NavLink to="/profile">Perfil</NavLink>
    </nav>
  );
}

export default Navbar; // se exporta para usarlo en App
