import { useEffect, useState } from 'react'; // estado local y efecto para cargar el producto
import { useParams, useNavigate } from 'react-router'; // useParams: parámetros de la URL; useNavigate: ir a otra ruta por código
import './ProductView.css'; // estilos propios de la página
import HeaderActions from '../../../components/atoms/HeaderActions/HeaderActions'; // coloca controles en el Header
import Button from '../../../components/atoms/Button/Button'; // botón de acción
import ProductSummary from '../../../components/molecules/ProductSummary/ProductSummary'; // resumen del producto
import ProductEditForm from '../../../components/organisms/ProductEditForm/ProductEditForm'; // formulario de edición
import { getProduct, updateProduct, deleteProduct } from '../../../utils/productsApi'; // peticiones de productos
import { getCategories } from '../../../utils/categoriesApi'; // categorías para la lista desplegable

// Traduce un error de la API (o de red) en un mensaje para la persona usuaria
function describeError(error) {
  if (error instanceof TypeError) return 'No se pudo conectar con el servidor.'; // fetch falló (servidor apagado)
  if (error.status === 401) return 'No autorizado: falta el token o venció. Revisa VITE_API_TOKEN en dashboard/.env.';
  if (error.status === 403) return 'Acceso denegado: se requieren permisos de administrador.';
  if (error.details?.length) return `${error.message}: ${error.details.join('. ')}`; // ej: validaciones de la API
  return error.message || 'Ocurrió un error inesperado.';
}

// Página ProductView: resumen del producto y formulario para editarlo
function ProductView() {
  const { id } = useParams(); // id tomado de la ruta /products/:id
  const navigate = useNavigate(); // para volver al listado después de eliminar

  // Resultado de la carga: { id, product, categories } o { id, error }; se guarda junto con el id al que pertenece
  const [loaded, setLoaded] = useState(null);
  const [formVersion, setFormVersion] = useState(0); // al subir, el formulario se reinicia con los datos guardados
  const [saving, setSaving] = useState(false); // true mientras se envía el PUT
  const [saveStatus, setSaveStatus] = useState(null); // { type, text } del último intento de guardar
  const [deleting, setDeleting] = useState(false); // true mientras se envía el DELETE
  const [deleteError, setDeleteError] = useState(null); // mensaje si falló la eliminación

  // Al abrir la página (o cambiar el id) se piden el producto y las categorías a la API
  useEffect(() => {
    let cancelled = false; // evita actualizar el estado si la página ya se cerró

    Promise.all([getProduct(id), getCategories()])
      .then(([product, categories]) => {
        if (!cancelled) setLoaded({ id, product, categories });
      })
      .catch((error) => {
        if (!cancelled) setLoaded({ id, error });
      });

    return () => {
      cancelled = true; // limpieza al desmontar
    };
  }, [id]);

  // Datos de ESTE producto, o null mientras carga (evita mostrar por un instante el producto anterior)
  const current = loaded?.id === id ? loaded : null;
  const product = current?.product;

  // Guardar: PUT con todos los atributos; si sale bien, el resumen y el formulario muestran los datos nuevos
  const handleSave = async (payload) => {
    setSaving(true);
    setSaveStatus(null);
    try {
      const updated = await updateProduct(product.id, payload);
      setLoaded({ ...current, product: updated });
      setFormVersion((version) => version + 1);
      setSaveStatus({ type: 'success', text: 'Cambios guardados.' });
    } catch (error) {
      setSaveStatus({ type: 'error', text: describeError(error) });
    } finally {
      setSaving(false);
    }
  };

  // Eliminar: pide confirmación, envía el DELETE y vuelve al listado
  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteProduct(product.id);
      navigate('/products');
    } catch (error) {
      setDeleteError(describeError(error)); // ej: 409 si el producto está asociado a órdenes
      setDeleting(false);
    }
  };

  return (
    <section className="productview">
      {/* Botón Eliminar en el margen derecho del Header; deshabilitado hasta que el producto cargue */}
      <HeaderActions>
        <Button onClick={handleDelete} disabled={!product || deleting}>Eliminar</Button>
      </HeaderActions>

      {/* Estados de carga y de error */}
      {!current && <p>Cargando…</p>}
      {current?.error && (
        <p role="alert" className="productview__error">
          {current.error.status === 404
            ? 'Producto no encontrado.'
            : current.error.status === 400
              ? 'El identificador del producto no es válido.'
              : describeError(current.error)}
        </p>
      )}
      {deleteError && <p role="alert" className="productview__error">{deleteError}</p>}

      {product && (
        <>
          <ProductSummary product={product} />
          {/* "key" reinicia el formulario cuando cambia el producto o después de guardar */}
          <ProductEditForm
            key={`${product.id}-${formVersion}`}
            product={product}
            categories={current.categories}
            saving={saving}
            status={saveStatus}
            onSubmit={handleSave}
          />
        </>
      )}
    </section>
  );
}

export default ProductView; // se exporta para poder importarlo desde App
