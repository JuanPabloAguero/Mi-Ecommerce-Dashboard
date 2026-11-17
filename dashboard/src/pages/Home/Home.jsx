import { useEffect, useState } from 'react'; // estado local y efecto para cargar los datos al abrir la página
import './Home.css'; // estilos propios de la página
import SummaryCard from '../../components/molecules/SummaryCard/SummaryCard'; // bloque de resumen
import LinkButton from '../../components/atoms/LinkButton/LinkButton'; // botón que navega
import { getSummary } from '../../utils/summaryApi'; // totales de productos y categorías

// Página Home: resumen de la tienda con accesos directos a las funciones principales
// (el saludo "¡Hola <nombre>!" lo muestra el Header, ver routeTitles.js)
function Home() {
  const [summary, setSummary] = useState(null); // { totalProducts, totalCategories } o null mientras carga
  const [error, setError] = useState(false); // true si la API no respondió

  // Al abrir la página se piden los totales a la API
  useEffect(() => {
    let cancelled = false; // evita actualizar el estado si la página ya se cerró

    getSummary()
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true; // limpieza al desmontar
    };
  }, []);

  return (
    <section className="home">
      {/* Aviso si la API no está disponible; los botones siguen funcionando */}
      {error && (
        <p role="alert">No se pudieron cargar los datos. Verifica que el servidor esté en marcha.</p>
      )}

      {/* Bloque de productos */}
      <SummaryCard icon="📦" count={summary?.totalProducts} label="Productos">
        <LinkButton to="/products">Ver Listado</LinkButton>
        <LinkButton to="/products/new">Agregar Producto</LinkButton>
      </SummaryCard>

      {/* Bloque de categorías */}
      <SummaryCard icon="🏷️" count={summary?.totalCategories} label="Categorías">
        <LinkButton to="/categories">Ver Listado</LinkButton>
        <LinkButton to="/categories/new">Agregar Categoría</LinkButton>
      </SummaryCard>
    </section>
  );
}

export default Home; // se exporta para poder importarlo desde App
