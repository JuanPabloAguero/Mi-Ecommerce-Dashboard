import { useParams } from 'react-router'; // hook para leer los parámetros de la URL
import './ProductView.css'; // estilos propios de la página

// Página ProductView (esqueleto)
function ProductView() {
  const { id } = useParams(); // id tomado de la ruta /products/:id

  return (
    <section className="productview">
      <h1>ProductView</h1>
      <p>Producto id: {id}</p> {/* temporal: confirma que el parámetro llega */}
    </section>
  );
}

export default ProductView; // se exporta para poder importarlo desde App
