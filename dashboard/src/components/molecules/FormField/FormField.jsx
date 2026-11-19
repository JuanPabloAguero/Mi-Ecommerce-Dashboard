import './FormField.css'; // estilos propios del componente

// Campo de formulario (molécula del modelo atómico): etiqueta + control + mensaje de error.
// "children" es el control (input, textarea, select...); "htmlFor" debe coincidir con su id
function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="form-field__label">{label}</label>
      {children}
      {/* Mensaje de validación, solo si hay error */}
      {error && <p className="form-field__error" role="alert">{error}</p>}
    </div>
  );
}

export default FormField; // se exporta para usarlo en los formularios
