import { Link } from 'react-router'; // navega a otra ruta sin recargar la página
import './LinkButton.css'; // estilos propios del componente

// Botón que navega a una ruta (átomo del modelo atómico).
// Es un <Link> con aspecto de botón: así funciona el clic derecho, "abrir en pestaña nueva", etc.
// Si recibe "icon", en pantallas chicas se muestra solo el ícono (la etiqueta sigue disponible para lectores de pantalla)
function LinkButton({ to, icon, children }) {
  return (
    <Link to={to} className={`link-button ${icon ? 'link-button--has-icon' : ''}`}>
      {icon && <span className="link-button__icon" aria-hidden="true">{icon}</span>}
      <span className="link-button__label">{children}</span>
    </Link>
  );
}

export default LinkButton; // se exporta para usarlo desde otros componentes
