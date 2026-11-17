import './Header.css'; // estilos propios del componente

// Encabezado del Main Area (organismo del modelo atómico).
// Muestra el título de la página actual y, en pantallas chicas, el botón que abre el Sidebar
function Header({ title, onMenuClick, menuOpen }) {
  return (
    <header className="header">
      {/* Botón de menú: solo se ve en pantallas de 1024px o menos (ver Header.css) */}
      <button
        className="menu-button"
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
        onClick={onMenuClick}
      >
        ☰
      </button>

      <h1 className="header__title">{title}</h1>
    </header>
  );
}

export default Header; // se exporta para usarlo en MainLayout
