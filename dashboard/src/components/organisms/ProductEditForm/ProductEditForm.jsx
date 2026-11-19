import { useState } from 'react'; // valores del formulario, errores y campo de nueva imagen
import './ProductEditForm.css'; // estilos propios del componente
import Button from '../../atoms/Button/Button'; // botones de acción
import LoadingImage from '../../atoms/LoadingImage/LoadingImage'; // vista previa de la imagen
import FormField from '../../molecules/FormField/FormField'; // etiqueta + control + error
import NumberStepper from '../../molecules/NumberStepper/NumberStepper'; // input numérico con ➖ y ➕
import { getImageUrl } from '../../../utils/api'; // URL utilizable de la imagen

// Convierte un producto de la API en los valores del formulario (todo como texto para poder editarlo libremente)
function toFormValues(product) {
  return {
    name: product.name ?? '',
    price: String(product.price ?? 0),
    stock: String(product.stock ?? 0),
    description: product.description ?? '',
    category: product.category ?? '', // '' = sin categoría
    image: product.image ?? '',       // '' = sin imagen
    isMostOrdered: Boolean(product.isMostOrdered),
  };
}

// Un campo numérico vacío cuenta como 0 (valor por defecto)
function toInteger(text) {
  const trimmed = String(text).trim();
  return trimmed === '' ? 0 : Number(trimmed);
}

// Entero mayor o igual a 0 (si prefieres permitir decimales en el precio, usa Number.isFinite en lugar de Number.isInteger)
function isNonNegativeInteger(text) {
  const number = toInteger(text);
  return Number.isInteger(number) && number >= 0;
}

// Controles previos al envío: devuelve un objeto { campo: mensaje } (vacío si todo está bien).
// La descripción puede quedar vacía, por eso no se valida
function validate(values) {
  const errors = {};
  if (values.name.trim() === '') errors.name = 'El nombre es obligatorio.';
  if (!isNonNegativeInteger(values.price)) errors.price = 'El valor debe ser un número entero mayor o igual a 0.';
  if (!isNonNegativeInteger(values.stock)) errors.stock = 'El stock debe ser un número entero mayor o igual a 0.';
  return errors;
}

// Arma el body del PUT con todos los atributos del producto (modificados y no modificados)
function toPayload(values) {
  const image = values.image.trim();
  return {
    name: values.name.trim(),
    description: values.description,
    price: toInteger(values.price),
    image: image === '' ? null : image, // sin imagen se envía null
    stock: toInteger(values.stock),
    isMostOrdered: values.isMostOrdered,
    category: values.category === '' ? null : values.category, // la API identifica la categoría por su nombre
  };
}

// Formulario de edición de un producto (organismo del modelo atómico).
// "onSubmit" recibe el body ya validado; "status" es { type: 'error' | 'success', text } o null
function ProductEditForm({ product, categories, saving, status, onSubmit }) {
  const [values, setValues] = useState(() => toFormValues(product)); // valores que se están editando
  const [newImage, setNewImage] = useState(''); // URL escrita en "Nueva imagen", todavía sin agregar
  const [errors, setErrors] = useState({}); // mensajes de validación por campo

  // Actualiza un solo campo; el resto queda igual
  const setField = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  // Pasa la URL escrita al producto (la imagen anterior, si había, se reemplaza)
  const handleAddImage = () => {
    if (newImage.trim() === '') return;
    setField('image', newImage.trim());
    setNewImage('');
  };

  // Cancelar: los datos vuelven a su estado original
  const handleCancel = () => {
    setValues(toFormValues(product));
    setNewImage('');
    setErrors({});
  };

  // Guardar: valida y, si todo está bien, envía los datos
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el navegador recargue la página
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // hay errores: no se envía nada
    await onSubmit(toPayload(values));
  };

  return (
    <form className="product-edit-form" onSubmit={handleSubmit} noValidate>
      <h2>Información</h2>

      <FormField label="Nombre" htmlFor="product-name" error={errors.name}>
        <input
          id="product-name"
          className="form-input"
          type="text"
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
        />
      </FormField>

      <FormField label="Valor" htmlFor="product-price" error={errors.price}>
        <input
          id="product-price"
          className="form-input"
          type="number"
          min="0"
          step="1"
          value={values.price}
          onChange={(e) => setField('price', e.target.value)}
        />
      </FormField>

      <FormField label="Stock" htmlFor="product-stock" error={errors.stock}>
        <NumberStepper
          id="product-stock"
          value={values.stock}
          onChange={(value) => setField('stock', value)}
        />
      </FormField>

      <FormField label="Descripción" htmlFor="product-description">
        <textarea
          id="product-description"
          className="form-input"
          value={values.description}
          onChange={(e) => setField('description', e.target.value)}
        />
      </FormField>

      {/* Lista desplegable con las categorías existentes en la API */}
      <FormField label="Categoría" htmlFor="product-category">
        <select
          id="product-category"
          className="form-input"
          value={values.category}
          onChange={(e) => setField('category', e.target.value)}
        >
          <option value="">Sin categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </FormField>

      {/* Casilla para el atributo isMostOrdered */}
      <label className="product-edit-form__checkbox">
        <input
          type="checkbox"
          checked={values.isMostOrdered}
          onChange={(e) => setField('isMostOrdered', e.target.checked)}
        />
        Destacado
      </label>

      <h2>Imagen</h2>

      {/* Imagen actual con botón para quitarla */}
      {values.image ? (
        <div className="product-edit-form__image">
          <LoadingImage key={values.image} src={getImageUrl(values.image)} size={96} />
          <Button variant="secondary" onClick={() => setField('image', '')}>Quitar imagen</Button>
        </div>
      ) : (
        <p>Este producto no tiene imagen.</p>
      )}

      {/* Nueva imagen: se escribe la URL y se agrega con el botón (o con Enter) */}
      <FormField label="Nueva imagen (URL)" htmlFor="product-new-image">
        <div className="product-edit-form__row">
          <input
            id="product-new-image"
            className="form-input"
            type="url"
            placeholder="https://..."
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Enter no debe guardar todo el formulario
                handleAddImage();
              }
            }}
          />
          <Button onClick={handleAddImage} disabled={newImage.trim() === ''}>Agregar</Button>
        </div>
      </FormField>

      {/* Resultado del último intento de guardar */}
      {status && (
        <p
          role={status.type === 'error' ? 'alert' : 'status'}
          className={`product-edit-form__status product-edit-form__status--${status.type}`}
        >
          {status.text}
        </p>
      )}

      {/* Cancelar vuelve a los datos originales; Guardar envía los cambios */}
      <div className="product-edit-form__buttons">
        <Button variant="secondary" onClick={handleCancel} disabled={saving}>Cancelar</Button>
        <Button type="submit" disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</Button>
      </div>
    </form>
  );
}

export default ProductEditForm; // se exporta para usarlo en ProductView
