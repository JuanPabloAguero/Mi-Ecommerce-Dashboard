import { useEffect, useState } from 'react'; // estado local y efecto para cargar los productos al abrir la página
import './ProductsList.css'; // estilos propios de la página
import HeaderActions from '../../../components/atoms/HeaderActions/HeaderActions'; // coloca controles en el Header
import LinkButton from '../../../components/atoms/LinkButton/LinkButton'; // botón que navega
import SearchBox from '../../../components/molecules/SearchBox/SearchBox'; // campo de búsqueda
import ListItem from '../../../components/molecules/ListItem/ListItem'; // fila de la lista
import { getProducts } from '../../../utils/productsApi'; // GET /api/products
import { getImageUrl } from '../../../utils/api'; // URL utilizable de la imagen de un producto

// Página ProductsList: listado de productos con enlace al detalle de cada uno
function ProductsList() {
  const [products, setProducts] = useState(null); // null mientras carga; después, el array de productos
  const [error, setError] = useState(false); // true si la API no respondió
  const [search, setSearch] = useState(''); // texto del buscador (el filtrado se implementa en la US#8)

  // Al abrir la página se piden los productos a la API
  useEffect(() => {
    let cancelled = false; // evita actualizar el estado si la página ya se cerró

    getProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true; // limpieza al desmontar
    };
  }, []);

  const loading = products === null && !error; // esperando respuesta de la API

  return (
    <section className="productslist">
      {/* Controles del Header: buscador + botón Agregar Producto (solo ícono en pantallas chicas) */}
      <HeaderActions>
        <SearchBox value={search} onChange={setSearch} placeholder="Buscar productos" />
        <LinkButton to="/products/new" icon="+">Agregar Producto</LinkButton>
      </HeaderActions>

      {/* Estados de la lista: cargando, error o vacía */}
      {loading && <p>Cargando…</p>}
      {error && (
        <p role="alert">No se pudieron cargar los productos. Verifica que el servidor esté en marcha.</p>
      )}
      {products && products.length === 0 && <p>No hay productos para mostrar.</p>}

      {/* Lista de productos: cada fila lleva a /products/:id */}
      {products && (
        <ul className="productslist__list">
          {products.map((product) => (
            <li key={product.id}>
              <ListItem
                to={`/products/${product.id}`}
                image={getImageUrl(product.image)}
                title={product.name}
                subtitle={`#${product.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProductsList; // se exporta para poder importarlo desde App
