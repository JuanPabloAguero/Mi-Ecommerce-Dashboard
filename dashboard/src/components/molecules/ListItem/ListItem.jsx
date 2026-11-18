import { Link } from 'react-router'; // toda la fila es un enlace
import LoadingImage from '../../atoms/LoadingImage/LoadingImage'; // imagen con aviso de carga
import './ListItem.css'; // estilos propios del componente

// Fila de un listado (molécula del modelo atómico): imagen opcional + título + subtítulo + flecha.
// Al hacer clic en cualquier parte de la fila se navega a "to"
function ListItem({ to, image, title, subtitle }) {
  return (
    <Link to={to} className="list-item">
      {/* La imagen es opcional; "key" reinicia el aviso de carga si cambia la URL */}
      {image && <LoadingImage key={image} src={image} />}

      <div className="list-item__text">
        <p className="list-item__title">{title}</p>
        <p className="list-item__subtitle">{subtitle}</p>
      </div>

      <span className="list-item__arrow" aria-hidden="true">›</span> {/* indica que lleva al detalle */}
    </Link>
  );
}

export default ListItem; // se exporta para usarlo en las páginas de listado
