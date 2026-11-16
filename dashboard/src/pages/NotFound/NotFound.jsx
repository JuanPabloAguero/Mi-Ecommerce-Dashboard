import { Link } from 'react-router'; // enlace interno sin recargar la página
import './NotFound.css'; // estilos propios de la página

// Página NotFound: se muestra en rutas inexistentes o aún no implementadas (Error 404)
function NotFound() {
  return (
    <section className="notfound">
      <h1>Error 404</h1>
      <p>La página que buscas no existe o todavía no está implementada.</p>
      <Link to="/">Volver al inicio</Link> {/* lleva a la ruta "/" (Home) */}
    </section>
  );
}

export default NotFound; // se exporta para poder importarlo desde App
