import { Link } from 'react-router'; // navega a otra ruta sin recargar la página
import './LinkButton.css'; // estilos propios del componente

// Botón que navega a una ruta (átomo del modelo atómico).
// Es un <Link> con aspecto de botón: así funciona el clic derecho, "abrir en pestaña nueva", etc.
function LinkButton({ to, children }) {
  return (
    <Link to={to} className="link-button">
      {children}
    </Link>
  );
}

export default LinkButton; // se exporta para usarlo desde otros componentes
