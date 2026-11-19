import LoadingImage from '../../atoms/LoadingImage/LoadingImage'; // imagen con aviso de carga
import { getImageUrl } from '../../../utils/api'; // URL utilizable de la imagen
import './ProductSummary.css'; // estilos propios del componente

// Resumen rápido de un producto (molécula del modelo atómico): imagen, nombre, identificador, precio, stock y categoría.
// Muestra los datos guardados en la API, no lo que se está escribiendo en el formulario
function ProductSummary({ product }) {
  return (
    <div className="product-summary">
      {/* "key" reinicia el aviso de carga si cambia la imagen */}
      <LoadingImage key={product.image} src={getImageUrl(product.image)} size={96} />

      <div className="product-summary__info">
        <h2 className="product-summary__name">{product.name}</h2>

        <div className="product-summary__data">
          <span><strong>#{product.id}</strong> identificador</span>
          <span><strong>{Number(product.price).toLocaleString('es-AR')}</strong> precio</span>
          <span><strong>{product.stock}</strong> stock disponible</span>
          {/* La categoría es opcional: solo se muestra si el producto tiene una */}
          {product.category && <span className="product-summary__category">{product.category}</span>}
        </div>
      </div>
    </div>
  );
}

export default ProductSummary; // se exporta para usarlo en ProductView
