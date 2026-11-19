import { useEffect, useState } from 'react'; // estado local y efecto para cargar las categorías
import { Navigate, useNavigate, useParams } from 'react-router'; // Navigate: redirige; useNavigate: ir a otra ruta por código; useParams: parámetros de la URL
import './ProductForm.css'; // estilos propios de la página
import ProductEditForm from '../../../components/organisms/ProductEditForm/ProductEditForm'; // el mismo formulario de la US#9
import { createProduct } from '../../../utils/productsApi'; // POST /api/products
import { getCategories } from '../../../utils/categoriesApi'; // categorías para la lista desplegable
import { describeError } from '../../../utils/errors'; // mensajes de error de la API

// Producto vacío: son los valores iniciales del formulario (precio y stock en 0 por defecto, sin imagen ni categoría)
const emptyProduct = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  image: null,
  category: null,
  isMostOrdered: false,
};

// Página ProductForm: alta de un nuevo producto (ruta /products/new)
function ProductForm() {
  const { id } = useParams(); // solo existe en /products/:id/edit; en /products/new es undefined
  const navigate = useNavigate(); // para ir al detalle del producto una vez creado

  const [categories, setCategories] = useState(null); // null mientras carga; después, el array de categorías
  const [loadError, setLoadError] = useState(null); // mensaje si no se pudieron cargar las categorías
  const [saving, setSaving] = useState(false); // true mientras se envía el POST
  const [saveStatus, setSaveStatus] = useState(null); // { type, text } del último intento de guardar

  // Al abrir la página se piden las categorías a la API
  useEffect(() => {
    let cancelled = false; // evita actualizar el estado si la página ya se cerró

    getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(describeError(error));
      });

    return () => {
      cancelled = true; // limpieza al desmontar
    };
  }, []);

  // Guardar: POST con todos los atributos; si sale bien, se abre la página del producto creado
  const handleSave = async (payload) => {
    setSaving(true);
    setSaveStatus(null);
    try {
      const created = await createProduct(payload); // la API devuelve el producto con su id
      navigate(`/products/${created.id}`);
    } catch (error) {
      setSaveStatus({ type: 'error', text: describeError(error) });
      setSaving(false); // solo se reactiva el botón si falló (si salió bien, la página se cierra)
    }
  };

  // Editar un producto existente se hace en su propia página (/products/:id), no acá:
  // /products/:id/edit redirige para no mostrar un formulario de alta por error
  if (id) return <Navigate to={`/products/${id}`} replace />;

  return (
    <section className="productform">
      {loadError && <p role="alert" className="productform__error">{loadError}</p>}
      {!categories && !loadError && <p>Cargando…</p>}

      {/* El formulario se muestra cuando ya están las categorías de la lista desplegable */}
      {categories && (
        <ProductEditForm
          product={emptyProduct}
          categories={categories}
          saving={saving}
          status={saveStatus}
          onSubmit={handleSave}
        />
      )}
    </section>
  );
}

export default ProductForm; // se exporta para poder importarlo desde App
